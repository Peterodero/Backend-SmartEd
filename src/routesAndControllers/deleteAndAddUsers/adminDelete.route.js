
const express = require('express');
const adminDeleteUserRouter = express.Router();
const User = require('../../models/user.model');  
const { verifyToken, isAdmin } = require('../../middlewares/authMiddlewares');

// Admin delete user
adminDeleteUserRouter.delete('/admin/deleteUser/:userId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', details: err.message });
  }
});

module.exports = adminDeleteUserRouter;
