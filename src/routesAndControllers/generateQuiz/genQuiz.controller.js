const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY 

async function generateQuestions(req, res){

    const topic = req.body 
    const searchTopic = topic.selectedTopic
    console.log(searchTopic)
    try {
      
        console.log("Fetching")
        const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
            contents: [
            {
                parts: [
                {
                    text: `Generate 10 different questions on ${searchTopic}. Each question should have four options (A, B, C, D) with one correct answer. Format the response as JSON. Please be consistent every time I ask you to generate questions.`
                }
                ]
            }
            ]
        },
        {
            headers: { 
            'Content-Type': 'application/json'
            }
        }
        );

        console.log(response.data)


        return res.json(response.data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    generateQuestions
}