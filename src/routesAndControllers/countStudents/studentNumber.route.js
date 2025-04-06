
const express = require('express');
const studentNumberRouter = express.Router();
const User = require('../../models/user.model');

studentNumberRouter.get('/students/count', async (req, res) => {
  try {
    const studentCount = await User.countDocuments({ role: 'student' }); 
    res.json({ count: studentCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student count' });
  }
});

module.exports = studentNumberRouter;
