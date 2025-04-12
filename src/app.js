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
const { forgotPasswordRouter } = require('./routesAndControllers/forgotPassword/forgotPassword');
const setQuestionRouter = require('./routesAndControllers/generateQuiz/questionsRouter');
const lecturerRecommendationRouter = require('./routesAndControllers/recommendations/lecRecommendation.route');
const adminRouter = require('./routesAndControllers/evaluateAuth/adminRoute');
const adminDeleteUserRouter = require('./routesAndControllers/deleteAndAddUsers/adminDelete.route');
const adminGetUsersRouter = require('./routesAndControllers/deleteAndAddUsers/adminGetUsers.route');
const registerLecRouter = require('./routesAndControllers/registerLecturers/adminRegLec.router');


const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use(adminRouter);
app.use(adminGetUsersRouter);
app.use(adminDeleteUserRouter);
app.use(registerLecRouter);
app.use(studentRoute);
app.use(genQuizRouter);
app.use(evaluateQuizRouter);
app.use(learnRouter);
app.use(viewResultsRouter);
app.use(studentProfileRouter);
app.use(recommendationRouter);
app.use(lecturerRecommendationRouter);
app.use(studentNumberRouter);
app.use(lecturerProfileRouter);
app.use(allStudentResultsRouter);
app.use(forgotPasswordRouter);
app.use("/api/questions", setQuestionRouter);

module.exports = app;

// GEMINI_API_KEY = AIzaSyBsm7086P - LUdJ61s07sIR - v7PApUAJqjI
// MONGO_URL = mongodb + srv: //peterodero450:j3MCnkxCAQk8BtZN@edcluster.t5egyrg.mongodb.net/?retryWrites=true&w=majority&appName=EdCluster 
//     PORT = 3000
// JWT_SECRET = aea376b019ebe5a87a122f805b0a2874b5c30c267e10c0a4e3df5ff4468929021c6b965d887659fe341eb9b007b2491faed0758238573e616bb542907f3d9653
// GEMINI_API_URL = https: //generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent
//     EMAIL_USER =
//     EMAIL_PASS =
//     RESET_APP_URL = https: //password-reset-smart-ed.vercel.app