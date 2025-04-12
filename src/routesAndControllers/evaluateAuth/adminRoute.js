const express = require('express');
const adminRouter = express.Router();
const { verifyToken, isAdmin } = require('../../middlewares/authMiddlewares');
const {getAdminDashboard} = require('./adminController');

adminRouter.get("/admin/dashboard", verifyToken, isAdmin, getAdminDashboard);

module.exports = adminRouter;
