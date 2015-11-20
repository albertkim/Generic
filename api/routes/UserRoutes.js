var Router = require('restify-router').Router;
var UserController = require('../controllers/UserController');

var router = new Router();
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = {
	router: router
};