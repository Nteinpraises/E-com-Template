const express    = require('express');
const router     = express.Router();
const jwt        = require('jsonwebtoken');
const crypto     = require('crypto');
const nodemailer = require('nodemailer');
const User       = require('../models/User');

// ── Helper: generate JWT token ───────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ── POST /api/auth/register ──────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── POST /api/auth/login ─────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      role:  user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── POST /api/auth/forgot-password ───────────
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    console.log('Forgot password request for:', req.body.email);
    console.log('User found:', user ? 'YES' : 'NO');

    if (!user) {
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken  = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    console.log('Reset URL generated:', resetUrl);
    console.log('Attempting to send email to:', user.email);
    console.log('Using EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS set:', process.env.EMAIL_PASS ? 'YES' : 'NO');

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection first
    await transporter.verify();
    console.log('SMTP connection verified ✓');

    await transporter.sendMail({
      from:    `"LUXE Fashion" <${process.env.EMAIL_USER}>`,
      to:      user.email,
      subject: 'Password Reset Request — LUXE',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:32px">
          <h2 style="color:#2C2925">Reset Your Password</h2>
          <p>You requested a password reset for your LUXE account.</p>
          <p>Click the button below to set a new password:</p>
          <a href="${resetUrl}"
             style="display:inline-block;background:#2C2925;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;margin:16px 0">
            Reset My Password
          </a>
          <p style="color:#888;font-size:13px">This link expires in 30 minutes.</p>
          <p style="color:#888;font-size:13px">If you didn't request this, ignore this email.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
          <p style="color:#bbb;font-size:12px">LUXE Men's Fashion</p>
        </div>
      `,
    });

    console.log('Email sent successfully ✓');
    res.json({ message: 'If that email exists, a reset link has been sent.' });

  } catch (error) {
    console.error('Forgot password error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ message: 'Email could not be sent. Please try again.' });
  }
});


// ── PUT /api/auth/reset-password/:token ──────
router.put('/reset-password/:token', async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken:  hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password            = req.body.password;
    user.resetPasswordToken  = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful', token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;