const stripe = require("stripe")(`${process.env.STRIPE_TEST_SECRET_KEY}`);
const prisma = require("../lib/db/prisma");
const { sendProSubscriptionEmail } = require("../lib/emails/mailer");

// FUNCTION: createCheckoutSession()

// DESCRIPTION: creates a Stripe checkout session for the "PRO" subscription
// sets up a 30-day free trial subscription
// It uses hosted stripe checkout page
// Redirects client to success URL on sucess and cancel URL on cancel

// POST /create-checkout-session

// PARAM: email (string) - customer emailt for stripe billing and subscription

// RETURNS: url (string) - the hosted Stripe checkout session URL to redirect the user
exports.createCheckoutSession = async (req, res) => {
  const { email } = req.body;

  try {
    // create the checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: `${process.env.STRIPE_PRO_PLAN_PRICE_ID}`, // Your PRO plan price id
          quantity: 1,
        },
      ],
      subscription_data: {
        // trial_period_days: 30, 30 day free trial for new user
      },
      success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    console.log(session);

    // Return session URL to redirect user to Stripe Checkout
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// FUNCTION: verifyPayment

// DESCRIPTION: Verifies the status of the stripe checkout session.
// It retrieves the session and subscription data from stripe.
// Validates and upgrades user plan to "pro"
// Modifies payment details in user model and adds the payment record if not already stored
// Sends confirmation "PRO" email

// ROUTE: GET //verify-payment-session/:sessionId

// PARAM: sessionId (string) - stripe checkout session ID passes as a URL param

// RETURNS: user (object) - basic user info after upgrade to update the user status on client

exports.verifyPayment = async (req, res) => {
  const sessionId = req.params.sessionId;

  if (!sessionId) return res.status(400).json({ error: "Session ID missing" });

  try {
    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Wait if subscription not attached yet
    if (!session.subscription) {
      return res.json({
        status: "waiting",
        message: "Subscription not ready yet",
      });
    }

    // Get full subscription data
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    const customerId = subscription.customer;
    const subscriptionId = subscription.id;

    // Convert trial end to JS Date
    const trialEndsAt = subscription.trial_end
      ? new Date(subscription.trial_end * 1000)
      : null;

    // Find user by email (from Stripe session)
    const user = await prisma.user.findUnique({
      where: { email: session.customer_email },
    });

    console.log("user: " + user);

    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user record to PRO
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

    // Store payment if it hasn't been stored already
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

    // Send confirmation email
    const sentEmail = await sendProSubscriptionEmail(
      updatedUser.id,
      updatedUser.email,
      updatedUser.name
    );

    // Return filtered user info. We filter out important details such as password, trailEndsAt and
    // and other details before sendin it to clinet
    const filteredResponseUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      plan: user.plan,
    };

    res.status(200).json(filteredResponseUser);
  } catch (err) {
    console.error("Stripe verify error:", err.message);
    res.status(400).json({ error: err.message });
  }
};
