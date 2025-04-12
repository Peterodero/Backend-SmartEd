// routes/recommendation.routes.js
const express = require("express");
const lecturerRecommendationRouter = express.Router();
// const { getRecommendations} = require("./courseRecommendation.controller")
const { getAllRecommendations } = require("./lecRecommendation.controller");

// lecturerRecommendationRouter.get("/:studentId", getRecommendations); // Generate and store
lecturerRecommendationRouter.get("/allRecommendations", getAllRecommendations); // Get all

module.exports = lecturerRecommendationRouter;
