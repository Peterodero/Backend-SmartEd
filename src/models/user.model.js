const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: { type: String, unique: true },
	password: String,
	role: { type: String, enum: ['student', 'lecturer'], required: true },
	department: { type: String },
})

module.exports = mongoose.model('User', userSchema);