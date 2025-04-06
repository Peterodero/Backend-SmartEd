const express = require("express");
const {getAllStudentResults} = require("./lecViewResultsController");
// const authMiddleware = require("../../middlewares/authMiddlewares");

const allStudentResultsRouter = express.Router();

allStudentResultsRouter.get("/students/results", getAllStudentResults);

module.exports = allStudentResultsRouter;
