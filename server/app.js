const express = require("express");
const cors = require("cors");
const axios = require("axios");
const data = require("./lib/constants");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(`${process.env.STRIPE_TEST_SECRET_KEY}`);
const {
  sendWelcomeEmail,
  sendProSubscriptionEmail,
} = require("./lib/emails/mailer");
const prisma = require("./lib/db/prisma");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const API_KEY = "AIzaSyBiKuzKL7z9Be9ukgiGo0L_A5IGJf9RWr4";

app.post("/search", async (req, res) => {
  const { input } = req.body;

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&types=establishment&key=${API_KEY}`;

  const data = await axios.get(url);
  res.status(200).json(data.data);
});

app.get("/test-companies", (req, res) => {
  const testRes = data;

  res.status(200).json(testRes);
});

app.post("/create-user", async (req, res) => {
  try {
    const { name, email, phone, password, website, receiveSms } = req.body;

    const existingUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      res.status(400).json({
        error: "A user with this email already exists! Try again!",
      });
      return;
    }

    const existingUserByPhone = await prisma.user.findFirst({
      where: {
        phone,
      },
    });

    if (existingUserByPhone) {
      res.status(400).json({
        error: "A user with this phone number already exists! Try again!",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        receiveSms,
        website: website || "Not provided",
      },
    });

    const sentEmail = await sendWelcomeEmail(user.id, user.email, user.name);

    res.json(user);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(400).json({
        error: err.message,
      });
    } else {
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
});

app.post("/create-checkout-session", async (req, res) => {
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
      success_url: "http://localhost:5173/success/{CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    console.log(session);

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/verify-payment-session/:sessionId", async (req, res) => {
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
});

app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});
