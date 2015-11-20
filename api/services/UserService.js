var User = require('../models/User');

exports.login = function(email, password) {
	
};

exports.register = function(email, password) {
	var user = new User({
		email: email,
		password: password
	});
	user.save();
};

exports.update = function(body) {
	
};