const UserScore = require("../../models/userScore.model");
const { getGeminiRecommendation } = require("./geminiRecommendation");

async function getRecommendations(req, res) {
  try {
    const { studentId } = req.params;

    console.log(studentId)

    // Fetch student's scores from DB (since each student has one document)
    const userScore = await UserScore.findOne({ studentId });

    if (!userScore) {
      return res.status(404).json({ error: "No scores found for this student" });
    }

    // Convert scores Map to an object for processing
    const studentScores = Object.fromEntries(userScore.scores);

    console.log(studentScores)

    // Call Gemini API Service with student scores
    const recommendation = await getGeminiRecommendation(studentScores);

    res.status(200).json({ recommendation });
  } catch (error) {
    res.status(500).json({ error: "Error generating recommendations", details: error.message });
  }
}

module.exports = { getRecommendations };
