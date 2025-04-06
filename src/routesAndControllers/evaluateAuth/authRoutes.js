const express = require('express');
const { signup, login, getProfile } = require('./authControllers');
const {verifyToken} = require('../../middlewares/authMiddlewares')

const router = express.Router();

router.post('/signUp', signup);
router.post('/signIn', login);
router.get('/profile', verifyToken, getProfile);

module.exports = router;