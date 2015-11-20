var UserService = require('../services/UserService');

module.exports.login = function (req, res, next) {
	var email = req.params.email;
	var password = req.params.password;
	UserService.login(email, password);
};

module.exports.register = function (req, res, next) {
	var email = req.params.email;
	var password = req.params.password;
	UserService.register(email, password);
};