const express = require('express');
const { evaluateAnsw } = require('./evaluateAnswers');

const evaluateQuizRouter = express.Router();

evaluateQuizRouter.post("/evaluate-answers", evaluateAnsw)

module.exports = evaluateQuizRouter;