// controller
const Recommendation = require("../../models/userRecommendation.model");

async function getAllRecommendations(req, res) {
  try {
    const all = await Recommendation.find().populate("studentId", "name email");
    console.log(all)
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
}

module.exports = { getAllRecommendations };
