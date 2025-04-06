const UserScore = require("../../models/userScore.model");

exports.getAllStudentResults = async (req, res) => {
  try {
    const results = await UserScore.find()
      .populate("studentId", "name email")
      .exec();

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student results" });
  }
};
