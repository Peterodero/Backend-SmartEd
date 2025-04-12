const express = require('express');
const registerLecRouter = express.Router();
const { registerLecturer } = require('./adminRegisterLec.controller');
const { verifyToken, isAdmin } = require('../../middlewares/authMiddlewares');

// Route to register a new lecturer
registerLecRouter.post('/admin/registerLecturer',verifyToken, isAdmin, registerLecturer);

module.exports = registerLecRouter;
