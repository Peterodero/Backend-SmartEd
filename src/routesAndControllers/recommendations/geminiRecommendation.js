const axios = require("axios");
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY 
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";


async function getGeminiRecommendation(studentData) {

  console.log(studentData)

  const prompt = `
    Based on the following student scores in various topics, suggest the best IT-related course for them.

    Student Scores:
   ${JSON.stringify(studentData)} 

    Recommend a course in IT that fits his strengths and weaknesses.Do not return no recommendation available.
    Return only a single recommendation as a short response
  `;

  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("generated");
    
    return generatedText || "No recommendation generated.";
  } catch (error) {
    console.error("Error fetching recommendations from Gemini:", error);
    return "Error generating recommendation.";
  }
}

module.exports = { getGeminiRecommendation };
