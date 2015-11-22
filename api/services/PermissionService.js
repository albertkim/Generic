exports.isAdmin = function(req, res) {
	return new Promise((resolve, reject) => {
		if (req.user.get('isAdmin')) {
			resolve();
		} else {
			res.send(401, { message: 'You are not an admin' });
		}
	});
};