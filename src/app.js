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

app.use(cors())
 
// const allowedOrigins = [
//   'https://password-reset-smart-ed.vercel.app', // Vercel frontend // Localhost development environment
//   'http://192.168.181.82:5173', // Another local machine's IP (replace with your machine's IP)
// ];


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
