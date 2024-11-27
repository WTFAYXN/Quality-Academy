const express = require('express');
const { register, login, editUser } = require('../user/auth.js'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js'); // Adjust based on your user model
const { sendEmail } = require('../user/auth.js'); // Implement this function based on your email sending method
const crypto = require('crypto');
const bcrypt = require('bcrypt');
//const Contact = require('../model/contactModel.js'); // Adjust based on your contact model
const router = express.Router();


//----------------------------------------------
router.post('/register', async (req, res) => {
    const { name, email, password, profession } = req.body;
    const result = await register(name, email, password, profession);
    res.status(result.status).json({ message: result.message, token: result.token });
  });
  
  //----------------------------------------------
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(result.status).json({ message: result.message, token: result.token });
  });
  
  //----------------------------------------------
  router.put('/edit/:userId', async (req, res) => {
    const { userId } = req.params;
    const updates = req.body; // Contains the fields to update
    const result = await editUser(userId, updates);
    res.status(result.status).json({ message: result.message });
  });
  
  //----------------------------------------------
router.post('/contactus', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const newContact = new Contact({ name, email, message });
      await newContact.save();
      res.status(201).send('Contact saved');
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).send('Error saving contact');
    }
  });
  
  //----------------------------------------------
  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
  
  
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hash = await bcrypt.hash(resetToken, 10);
    user.resetPasswordToken = hash;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
  
    const resetUrl = `${url}/reset-password/${user._id}/${resetToken}`;
    await sendEmail(user.email, 'Password Reset', `Please reset your password by clicking: ${resetUrl}`);
  
    res.send('Password reset email sent.');
  });
  
  //----------------------------------------------
  router.post('/reset-password/:id/:token', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Hash new password
      const hash = await bcrypt.hash(password, 10);
  
      // Update user password
      user.password = hash;
      user.resetPasswordToken = undefined; // Clear the reset token
      user.resetPasswordExpires = undefined; // Clear the token expiry
      await user.save();
  
      // Respond with success
      res.send({ Status: "Success" });
    } catch (err) {
      console.error(err); // Log the error for server-side debugging
      res.status(500).json({ Status: "An error occurred on the server" });
    }
  });
  
  module.exports = router;