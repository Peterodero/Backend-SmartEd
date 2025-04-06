
const mongoose = require('mongoose');

const userScoreSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  scores: { 
    type: Map,  // Stores key-value pairs (e.g., { "Programming": 80, "Networking": 90 })
    of: Number,
    default: {} 
  }
});

module.exports = mongoose.model('UserScore', userScoreSchema);






// const mongoose = require('mongoose');

// const userScoreSchema = new mongoose.Schema({
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
//   topic: { type: String, required: false },
//   score: { type: Number, required: true }
// })

// module.exports = mongoose.model('UserScore', userScoreSchema);