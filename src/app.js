const express = require('express');
const cors = require('cors');

const authRoutes = require('./routesAndControllers/evaluateAuth/authRoutes');
const studentRoute = require('./routesAndControllers/evaluateAuth/studentRoute');
const genQuizRouter = require('./routesAndControllers/generateQuiz/genQuiz.router');
const evaluateQuizRouter = require('./routesAndControllers/evaluateQuiz/evaluateQuiz.router');
const learnRouter = require('./routesAndControllers/learn/learn.router');
const viewResultsRouter = require('./routesAndControllers/viewResults/viewResults.route');
const studentProfileRouter = require('./routesAndControllers/profile/studentProfile.route');
const recommendationRouter = require('./routesAndControllers/recommendations/courseRecommendation.router')
const studentNumberRouter = require('./routesAndControllers/countStudents/studentNumber.route');
const lecturerProfileRouter = require('./routesAndControllers/profile/lecRoute');
const allStudentResultsRouter = require('./routesAndControllers/viewResults/lecViewResultsRoute');
const { forgotPasswordRouter, resetPasswordRouter } = require('./routesAndControllers/forgotPassword/forgotPassword');


const app = express();
 
const allowedOrigins = [
  'https://password-reset-smart-ed.vercel.app', // Vercel frontend // Localhost development environment
  'http://192.168.181.82:5173', // Another local machine's IP (replace with your machine's IP)
];

// Setup CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the incoming request's origin is in the allowedOrigins array
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow the request if it matches one of the origins, or if there is no origin (like Postman)
      callback(null, true);
    } else {
      // Reject the request if the origin is not in the allowedOrigins
      callback(new Error('CORS not allowed'), false);
    }
  },
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  credentials: true, // Allows cookies and other credentials to be sent
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
};

// const corsOptions = {
//   origin: 'https://password-reset-smart-ed.vercel.app',  
//   methods: 'GET,POST,PUT,DELETE',          
//   credentials: true,                        // Allows cookies (e.g., for authentication)
//   allowedHeaders: 'Content-Type,Authorization',  // Add any other headers you might need
// };

// Use CORS middleware
app.use(cors(corsOptions));

app.use('/auth', authRoutes);
app.use(studentRoute);
app.use(genQuizRouter);
app.use(evaluateQuizRouter);
app.use(learnRouter);
app.use(viewResultsRouter);
app.use(studentProfileRouter);
app.use(recommendationRouter);
app.use(studentNumberRouter);
app.use(lecturerProfileRouter);
app.use(allStudentResultsRouter);
app.use(forgotPasswordRouter);
app.use(resetPasswordRouter);

module.exports = app;


