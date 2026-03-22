const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:   { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text:   { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['Suits', 'Shirts', 'T-Shirts', 'Trousers', 'Jeans', 'Loafers'],
    required: true,
  },
  price:    { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, default: null },
  emoji:    { type: String, default: '👔' },
  desc:     { type: String, required: true },
  sizes:    [{ type: String }],
  colors:   [{ type: String }],
  stock:    { type: Number, required: true, default: 0 },
  badge:    { type: String, enum: ['New', 'Bestseller', 'Sale', null], default: null },
  images:    [{ type: String }],
  mainImage: { type: String, default: null }, // image URLs when you add real photos
  reviews:  [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    // auto-calculated from reviews
  },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

// ── Auto-recalculate rating when reviews change ──
productSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    this.numReviews = this.reviews.length;
    this.rating = this.reviews.reduce((acc, r) => acc + r.rating, 0) / this.reviews.length;
  }
};

module.exports = mongoose.model('Product', productSchema);