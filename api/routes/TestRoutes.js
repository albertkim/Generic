var Router = require('restify-router').Router;
var TestController = require('../controllers/TestController');

var router = new Router();
router.get('/ping', TestController.ping);
router.get('/echo/:name', TestController.echo);
router.get('/throw', TestController.throw);

module.exports = {
	router: router
};