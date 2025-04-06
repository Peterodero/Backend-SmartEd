const express = require('express');
const { learnOnline } = require('./learn.controller');

const learnRouter = express.Router();

learnRouter.post("/learn", learnOnline)

module.exports = learnRouter;       