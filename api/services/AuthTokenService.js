var AuthToken = require('../models/AuthToken');
var TokenService = require('./utilities/TokenService');

exports.add = function(userId, callback) {
	var token = TokenService.sign({ userId: userId });
	new AuthToken({
		userId: userId,
		token: token
	})
	.save()
	.done(authToken => {
		callback(null, token);
	})
	.catch(error => {
		callback(error);
	});
};