const jwt = require('jsonwebtoken');
require('dotenv').config();
// module.exports = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Access denied' });
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({ error: 'Invalid token' });
//     }
// };

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user to request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token. Access denied." });
    }
}

module.exports = {
    verifyToken
}