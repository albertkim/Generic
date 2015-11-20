module.exports.ping = function (req, res, next) {
	res.send({
		message: "ping"
	});
};

module.exports.echo = function (req, res, next) {
	res.send(req.params);
	return next();
};

module.exports.throw = function(req, res, next) {
	throw 'This was manually thrown';
};