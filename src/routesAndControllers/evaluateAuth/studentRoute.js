const express = require("express");
const { verifyToken } = require( "../../middlewares/authMiddlewares");

const router = express.Router();

router.get("/student", verifyToken, (req, res) => {
    res.json({ message: "Welcome to Student Dashboard", user: req.user });
});

module.exports = router; 
