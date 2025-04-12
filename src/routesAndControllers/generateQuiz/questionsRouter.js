const express = require('express');
const setQuestionRouter = express.Router();
const questionController = require("./questionsController")

// GET /api/questions - Generate exam questions
setQuestionRouter.get('/', questionController.generateQuestions);

module.exports = setQuestionRouter;