// 3rd party packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Local imports
const { searchGoogleApi } = require("./controllers/googleApi");
const { registerUser } = require("./controllers/auth");
const {
  createCheckoutSession,
  verifyPayment,
} = require("./controllers/payment");

// Creating express app, allowing app to parse incoming JSON requests
// and enabling client to talk to the server
const app = express();
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

// API routes

// Used for searching the Google Places API by business name
app.post("/search", searchGoogleApi);

// Used to register the user and enable them for listing
app.post("/create-user", registerUser);

// Stripe payment to create a chenkout session
app.post("/create-checkout-session", createCheckoutSession);

// After checkout, we verify the payment to see if
// it was successfull or not
app.get("/verify-payment-session/:sessionId", verifyPayment);

// App runs on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});

// testcompany966@gmail.com
