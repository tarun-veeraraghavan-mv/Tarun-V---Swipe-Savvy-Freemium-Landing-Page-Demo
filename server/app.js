const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { searchGoogleApi } = require("./controllers/googleApi");
const { registerUser } = require("./controllers/auth");
const {
  createCheckoutSession,
  verifyPayment,
} = require("./controllers/payment");

const app = express();
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

app.post("/search", searchGoogleApi);

app.post("/create-user", registerUser);

app.post("/create-checkout-session", createCheckoutSession);

app.get("/verify-payment-session/:sessionId", verifyPayment);

app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});

// testcompany966@gmail.com
