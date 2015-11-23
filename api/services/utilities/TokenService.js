var jwt = require('jsonwebtoken');
var secret = 'GoFetchSuperSecret!';

exports.sign = function(payload) {
	payload.createdAt = new Date();
	return jwt.sign(payload, secret);
};

exports.verify = function(token) {
	return jwt.verify(token, secret);
};