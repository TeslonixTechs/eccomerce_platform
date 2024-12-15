const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
	const token = req.headers['authorization'];
	if(!token) return res.status(403).send('Access Denied');

	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err) return res.status(403).send('Invalid Token');
		req.user = user;
		next()
	});
};

module.exports = { authenticateToken };