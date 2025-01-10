const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
	const { name, email, password, role } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email , password:hashedPassword, role });
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
})

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ where: { email } });
		if(!user) return res.status(404).send('User not found');

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if(!isPasswordValid) return res.status(403).send('Invalid credentials');

		const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
		res.status(200).json({ token })
	} catch (err) {
		res.status(500).json(err);
	}
})

module.exports = router;