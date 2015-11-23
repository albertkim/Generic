exports.isAdmin = function(req, res, next) {
	if (req.user.get('isAdmin')) {
		next();
	} else {
		res.send(401, { message: 'You are not an admin' });
	}
};