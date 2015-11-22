var bcrypt = require('bcrypt');
var User = require('../models/User');
var passport = require('./PassportService');

exports.register = function(email, password, callback) {
	var salt = bcrypt.genSaltSync(10);
	var hashedPassword = bcrypt.hashSync(password, salt);
	new User({
		email: email,
		password: hashedPassword
	})
	.save()
	.then(model => {
		callback(null, model);
	})
	.catch(error => {
		callback(error);
	});
};

exports.update = function(body) {
	
};