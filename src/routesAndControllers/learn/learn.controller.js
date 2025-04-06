require('dotenv').config();
const axios = require('axios')

const GEMINI_API_KEY = process.env.GEMINI_API_KEY 
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

async function learnOnline(req,res){

    const topic = req.body


    try {
        const response = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`
        );
        console(response.data)
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
      }

    //  try {
         
    //         console.log("Fetching notes")
    //         const response = await axios.post(
    //         `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    //         {
    //             contents: [
    //             {
    //                 parts: [
    //                 {
    //                     text: `Generate notes on ${topic}. Format the response as JSON. Please be consistent every time I ask you to generate questions.`
    //                 }
    //                 ]
    //             }
    //             ]
    //         },
    //         {
    //             headers: { 
    //             'Content-Type': 'application/json'
    //             }
    //         }
    //         );
    
    //         let resData =  response.data
    //         resData = resData.candidates

    //         console.log(resData[0].content)
    
    //         return res.json(response.data);
    //     } catch (error) {
    //         return res.status(500).json({ error: error.message });
    //     }
}
module.exports = {
    learnOnline
}