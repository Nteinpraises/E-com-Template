const express = require('express');
const router  = express.Router();
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/auth');

// ── POST /api/payments/stripe/create-intent ──
// Create a Stripe payment intent
router.post('/stripe/create-intent', protect, async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   Math.round(amount * 100), // Stripe uses cents
      currency,
      metadata: { userId: req.user._id.toString() },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── GET /api/payments/paypal/config ──────────
// Send PayPal client ID to frontend
router.get('/paypal/config', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// ── POST /api/payments/stripe/webhook ────────
// Stripe webhook — listens for payment events
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig     = req.headers['stripe-signature'];
  const secret  = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    return res.status(400).json({ message: `Webhook error: ${err.message}` });
  }

  // Handle payment success
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log(`✓ Payment succeeded: ${paymentIntent.id}`);
    // TODO: update order payment status here
  }

  res.json({ received: true });
});

module.exports = router;