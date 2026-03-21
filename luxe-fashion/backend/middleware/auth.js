const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ── protect ──────────────────────────────────
// Blocks any request that doesn't have a valid token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorised — no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorised — invalid token' });
  }
};

// ── adminOnly ────────────────────────────────
// Blocks anyone who is not an admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied — admins only' });
  }
};

module.exports = { protect, adminOnly };