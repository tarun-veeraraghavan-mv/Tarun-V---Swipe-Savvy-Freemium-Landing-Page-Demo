const stripe = require("stripe")(`${process.env.STRIPE_TEST_SECRET_KEY}`);
const prisma = require("../lib/db/prisma");
const { sendProSubscriptionEmail } = require("../lib/emails/mailer");

exports.createCheckoutSession = async (req, res) => {
  const { email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1Rj2OYQstHEFf5KP1j78Ywgj",
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 30,
      },
      success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    console.log(session);

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const sessionId = req.params.sessionId;
  console.log("Session id: +" + sessionId);
  if (!sessionId) return res.status(400).json({ error: "Session ID missing" });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("SESSION: " + session);

    if (!session.subscription) {
      return res.json({
        status: "waiting",
        message: "Subscription not ready yet",
      });
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    console.log("Subscription: " + subscription);

    const customerId = subscription.customer;
    const subscriptionId = subscription.id;
    const trialEndsAt = subscription.trial_end
      ? new Date(subscription.trial_end * 1000)
      : null;

    const user = await prisma.user.findUnique({
      where: { email: session.customer_email },
    });

    console.log("user: " + user);

    if (!user) return res.status(404).json({ error: "User not found" });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        plan: "pro",
        stripeCustomerId: customerId,
        stripeSubId: subscriptionId,
        trialEndsAt: trialEndsAt,
        upgradedAt: new Date(),
      },
    });

    const existingPayment = await prisma.payments.findUnique({
      where: { sessionId: session.id },
    });

    if (!existingPayment) {
      await prisma.payments.create({
        data: {
          userId: user.id,
          sessionId: session.id,
          subscriptionId,
          customerId,
          amount: session.amount_total,
          currency: session.currency,
          status: subscription.status,
          trialEndsAt: trialEndsAt,
        },
      });
    }

    const sentEmail = await sendProSubscriptionEmail(
      updatedUser.id,
      updatedUser.email,
      updatedUser.name
    );

    res.json({ status: "success", userPlan: "pro" });
  } catch (err) {
    console.error("Stripe verify error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
