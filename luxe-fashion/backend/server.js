const express   = require('express');
const cors      = require('cors');
const dotenv    = require('dotenv');
const connectDB = require('./config/db');  // ← ADD THIS

dotenv.config();

connectDB();  // ← ADD THIS

const app = express();

// ── MIDDLEWARE ──────────────────────────────
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── ROUTES ──────────────────────────────────
// ── ROUTES ──────────────────────────────────
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/upload',   require('./routes/upload'));

// ── HEALTH CHECK ────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'LUXE API is running ✓', status: 'ok' });
});

// ── ERROR HANDLER ────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server error' });
});

// ── START SERVER ─────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ LUXE server running on http://localhost:${PORT}`);
});