const express = require("express");
const {getUser,updateUser} = require('./lecturerProfile')
const lecturerProfileRouter = express.Router();

lecturerProfileRouter.get("/users/:id", getUser);
lecturerProfileRouter.put("/users/:id", updateUser);

module.exports = lecturerProfileRouter;
 