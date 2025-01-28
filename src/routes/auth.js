const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateOtp = require("../utils/generateOtp");
const transporter = require("../utils/emailTransporter");
require("dotenv").config();
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/register", authController.userRegistration);

router.post("/login", authController.userLogin);

router.post("/emailverification", authController.emailVerification);

router.post("/otpverification", authController.otpVerification);

module.exports = router;
