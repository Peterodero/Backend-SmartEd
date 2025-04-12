
const express = require('express');
const adminGetUsersRouter = express.Router();
const { verifyToken, isAdmin } = require('../../middlewares/authMiddlewares'); 
const User = require('../../models/user.model');  

// Route to get all users (students and lecturers)
adminGetUsersRouter.get('/admin/getAllUsers', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find();  
    res.status(200).json(users);  // Send the data back as JSON

  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

module.exports = adminGetUsersRouter;
