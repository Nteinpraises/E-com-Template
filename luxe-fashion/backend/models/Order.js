const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  emoji:    { type: String },
  price:    { type: Number, required: true },
  size:     { type: String, required: true },
  color:    { type: String },
  qty:      { type: Number, required: true, default: 1 },
});

const shippingAddressSchema = new mongoose.Schema({
  firstName: String,
  lastName:  String,
  address:   String,
  city:      String,
  state:     String,
  zip:       String,
  country:   String,
  phone:     String,
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items:           [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'overnight'],
    default: 'standard',
  },
  shippingPrice:  { type: Number, default: 0 },
  subtotal:       { type: Number, required: true },
  totalPrice:     { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  paymentResult: {
    id:         String,
    status:     String,
    updateTime: String,
    email:      String,
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing',
  },
  trackingNumber: { type: String, default: null },
  deliveredAt:    { type: Date },
  paidAt:         { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);