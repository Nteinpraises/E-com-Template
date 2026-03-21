const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const { protect, adminOnly } = require('../middleware/auth');

// ── POST /api/orders ─────────────────────────
// Logged in user — place new order
router.post('/', protect, async (req, res) => {
  try {
    const {
      items, shippingAddress, shippingMethod,
      shippingPrice, subtotal, totalPrice, paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      shippingMethod,
      shippingPrice,
      subtotal,
      totalPrice,
      paymentMethod,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ── GET /api/orders/my ───────────────────────
// Logged in user — get their own orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── GET /api/orders ──────────────────────────
// Admin only — get all orders
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── GET /api/orders/:id ──────────────────────
// Admin or order owner — get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── PUT /api/orders/:id/pay ──────────────────
// Mark order as paid (called after payment success)
router.put('/:id/pay', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.paymentStatus = 'paid';
    order.paidAt        = Date.now();
    order.paymentResult = {
      id:         req.body.id,
      status:     req.body.status,
      updateTime: req.body.update_time,
      email:      req.body.payer?.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── PUT /api/orders/:id/status ───────────────
// Admin only — update shipping status
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderStatus = req.body.orderStatus;

    if (req.body.trackingNumber) {
      order.trackingNumber = req.body.trackingNumber;
    }
    if (req.body.orderStatus === 'delivered') {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;