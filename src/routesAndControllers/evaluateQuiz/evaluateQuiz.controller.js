const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";
const GEMINI_API_KEY = "AIzaSyBsm7086P-LUdJ61s07sIR-v7PApUAJqjI ";
const axios = require('axios');
// const API_KEY = process.env.GEMINI_API_KEY;

async function evaluateAnswers(req, res){
    const userResponses  = req.body;
    console.log(userResponses)
    try {

        const response = await axios.post(
                `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
                {
                    contents: [
                    {
                        parts: [
                        {
                            text: `Evaluate these answers and return a score:
                             ${JSON.stringify(userResponses)}.User answers is the ones indexed from 0 to 9.The matching 
                             question to a givn answer is as per index.Note that you should just return the score only
                             as score="score",don't add many texts please.And kindly maintain this format for the 
                             evaluation I need from you.Please!`
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

               const responseData = response.data.candidates[0]?.content
                const responseText = responseData?.parts?.[0]?.text || "";

                const scoreMatch = responseText.match(/score="(\d+)"/);

                if (scoreMatch) {
                const score = scoreMatch[1]; // Extracted score as a string
                console.log(`Score: ${score}`);
                } else {
                console.log("Score not found.");
                }
       

                console.log(response.data.candidates[0]?.content)

                
                return res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    console.log(userResponses)
}

module.exports = {
    evaluateAnswers
}