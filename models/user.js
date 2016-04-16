var mongoose = require("mongoose");

module.exports = mongoose.model('User', {
	username: String, 
	password: String,
	user_type: String,
	email: String,
	first_name: String,
	last_name: String
});