var Router = require('restify-router').Router;
var router = new Router();

router.get('/ping', function (req, res, next) {
	res.send({
		message: "ping"
	});
});

router.get('/echo/:name', function (req, res, next) {
	res.send(req.params);
	return next();
});

router.get('/throw', function (req, res, next) {
	throw 'This was manually thrown';
});

module.exports = {
	router: router
};