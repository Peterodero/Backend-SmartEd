const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to generate section-based questions for a subject
const generateSubjectQuestions = async (subject, sectionAQuestions = 6, sectionBQuestions = 4) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    Generate a ${subject} exam paper with:
    - Section A: ${sectionAQuestions} questions worth 5 marks each (total 30 marks)
    - Section B: ${sectionBQuestions} questions worth 20 marks each (total 80 marks)
    - Format each question clearly with question number, marks, and content
    - Ensure questions cover key ${subject} concepts
    - Return as a numbered list with sections clearly marked
    
    Example format:
    1. [Section A] Explain the concept of... (5 marks)
    2. [Section A] Differentiate between... (5 marks)
    ...
    7. [Section B] Analyze and compare... (20 marks)
    8. [Section B] Design a system that... (20 marks)
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

exports.generateQuestions = async (req, res) => {
  try {
    const { subjects } = req.query;
    const subjectList = Array.isArray(subjects) ? subjects : [subjects].filter(Boolean);

    if (!subjectList || subjectList.length === 0) {
      return res.status(400).json({ error: "Please provide at least one subject" });
    }

    // Generate questions for each selected subject
    const questionsBySubject = {};
    
    for (const subject of subjectList) {
      const subjectQuestions = await generateSubjectQuestions(subject);
      questionsBySubject[subject] = subjectQuestions.split('\n')
        .filter(q => q.trim() !== '' && q.match(/^\d+\./));
    }

    res.json({
      subjects: subjectList,
      questions: questionsBySubject,
      generatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ 
      error: "Failed to generate questions",
      details: error.message 
    });
  }
};