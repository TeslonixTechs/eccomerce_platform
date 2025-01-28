const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(token);
    if (!token) return res.status(403).send("Access Denied");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid Token");
        console.log(user);
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
