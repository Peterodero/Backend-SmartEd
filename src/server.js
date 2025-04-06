const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app)

mongoose.connection.once('open', ()=>{
	console.log('MongoDB connection is ready')
})

mongoose.connection.on('error', (err)=>{
	console.error(err);
})

async function startServer(){
	await mongoose.connect(MONGO_URL)
	console.log(`MongoDB connected to ${MONGO_URL}`)

	server.listen(PORT, ()=>{
		console.log(`Listening to port ${PORT}...`)
	});
}

startServer();

