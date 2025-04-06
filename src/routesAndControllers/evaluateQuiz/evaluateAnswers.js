const userScoreSchema = require('../../models/userScore.model');

function calculateScore(data, questions) {  
  let correctCount = 0;
  const userAnswers = data;
  const totalQuestions = questions.length;

  questions.forEach((q, index) => {
    const userAnswer = userAnswers[index.toString()];
    if (userAnswer && userAnswer === q.answer) {
      correctCount++;
    }
  });

  return Math.round((correctCount / totalQuestions) * 100);  
}

async function evaluateAnsw(req, res) {
  try {
    const { answers, questions, studentId, selectedTopic } = req.body;  

    if (!answers || !questions || !studentId || !selectedTopic) {
      return res.status(400).json({ error: "Missing required fields" }); 
    }

    const score = calculateScore(answers, questions);
    console.log(`Score: ${score}`);

    // let userscore = await userScoreSchema.findOneAndUpdate(
    //   { studentId, topic: selectedTopic },  // Find by studentId & topic
    //   { score: Number(score) },
    //   { new: true } 
    // );

    // if (!userscore) {
    //   userscore = new userScoreSchema({
    //     studentId,
    //     topic: selectedTopic,
    //     score: Number(score)
    //   });

    //   await userscore.save();
    // }
    let userscore = await userScoreSchema.findOne({ studentId });

    if (!userscore) {
      userscore = new userScoreSchema({
        studentId,
        scores: { [selectedTopic]: score }
      });

      await userscore.save();
    } else {
      userscore.scores.set(selectedTopic, score); // Update or insert topic score
      await userscore.save();
    }
    console.log(userscore)

    // res.status(200).json({
    //   message: 'Score saved successfully',
    //   userscore
    // });

   return res.status(200).json({score})


  } catch (error) {
    console.error("Error evaluating answers:", error);
    res.status(500).json({       
      error: 'Failed to save score',
      details: error.message
    });
  }
}

module.exports = { evaluateAnsw };
