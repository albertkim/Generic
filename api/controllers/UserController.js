var Router = require('restify-router').Router;
var UserService = require('../services/UserService');
var AuthTokenService = require('../services/AuthTokenService');
var PermissionService = require('../services/PermissionService');
var passport = require('../services/PassportService');
var TokenService = require('../services/utilities/TokenService');

var router = new Router();

router.get('users/all', 
	passport.authenticate('bearer', { session: false }), 
	function (req, res) {
		PermissionService.isAdmin(req)
		.then(function() {
			
		});
	}
);

router.post('/login/email', 
	passport.authenticate('local', { session: false }), 
	function (req, res) {
		var user = req.user;
		AuthTokenService.add(user.get('id'), (error, token) => {
			if (error) {
				res.send(500, error);
			} else {
				res.send({ token: token });
			}
		});
	}
);

router.post('/login/facebook', function (req, res) {
	passport.authenticate('google-oauth', { 
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});;
});

router.post('/login/google', function (req, res) {
	passport.authenticate('google-oauth', { 
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});
});

router.post('/register', function (req, res) {
	var email = req.params.email;
	var password = req.params.password;
	UserService.register(email, password, (error, user) => {
		if (error) {
			res.send(500, error);
		} else {
			res.send(user);
		}
	});
});

module.exports = {
	router: router
};