const express = require("express");
const userScoreSchema = require("../../models/userScore.model");

const viewResultsRouter = express.Router();

viewResultsRouter.get("/student-scores/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const userScores = await userScoreSchema.findOne({ studentId });

    if (!userScores) {  
      return res.status(404).json({ error: "No scores found for this student" });
    }

    res.status(200).json({ scores: userScores.scores });
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ error: "Failed to retrieve scores" });
  }
});

module.exports = viewResultsRouter;
