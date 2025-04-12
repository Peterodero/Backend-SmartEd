const UserScore = require("../../models/userScore.model");

exports.getAllStudentResults = async (req, res) => {
  try {
    const results = await UserScore.find()
      .populate("studentId", "name email")
      .exec();

    // Convert each score map to a plain object
    const convertedResults = results.map(result => ({
      ...result.toObject(),
      scores: Object.fromEntries(result.scores) // Convert Map to Object
    }));

    console.log(convertedResults)
    res.status(200).json(convertedResults);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch student results" });
  }
};
