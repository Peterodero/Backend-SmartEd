const express = require("express");
const {getRecommendations} = require('./courseRecommendation.controller.js');

const recommendationRouter = express.Router();

recommendationRouter.get("/recommendation/:studentId", getRecommendations);

module.exports = recommendationRouter;
