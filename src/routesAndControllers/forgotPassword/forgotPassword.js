const express = require('express')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/user.model');

const forgotPasswordRouter = express.Router();
const resetPasswordRouter = express.Router();


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { 
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,  
    },
  });
  
  // Route: Forgot Password
  forgotPasswordRouter.post('/forgot-password', async (req, res) => {
    const email = req.body;
    console.log(req.body)
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  
    const resetLink = `${process.env.RESET_APP_URL}/reset-password/${token}`;

  
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  
    res.json({ message: 'Password reset email sent' });
  });
  
  // Route: Reset Password
  resetPasswordRouter.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;  
    const { password } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hashed = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(decoded.userId, { password: hashed });
  
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  });

  module.exports = {
    forgotPasswordRouter,
    resetPasswordRouter
  }

