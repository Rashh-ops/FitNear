const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET);

// Payment route
router.post("/pay", async (req, res) => {
  const { amount } = req.body; // amount in INR rupees

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100 * 0.9), // convert to paise & apply 10% discount
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
