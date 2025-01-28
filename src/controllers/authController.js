const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateOtp = require("../utils/generateOtp");
const transporter = require("../utils/emailTransporter");
const emailTemplate = require("../utils/emailTemplate");
require("dotenv").config();

const userRegistration = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(403).send("Invalid credentials");

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json(err);
    }
};

const emailVerification = async (req, res) => {
    const { email } = req.body;
    try {
        const expireAt = new Date().getTime() / 1000;
        const otp = generateOtp();
        res.session.otp = otp;
        try {
            transporter.sendMail({
                from: '"Chat Bot 👻" <services@chatbot.com>', // sender address
                to: email, // list of receivers
                subject: "Email Verification", // Subject line
                html: emailTemplate(otp), // html body
            });
            req.session.expireAt = expireAt;
            res.status(201).json({ message: "Email Sent" });
        } catch (error) {
            res.status(403).json({ message: "Email Not sent" });
        }
    } catch (error) {
        res.status(404).json({ message: "Verification failed" });
    }
};

const otpVerification = async (req, res) => {
    const { otp } = req.body;
    const sessionotp = req.session.otp;
    const sessiontimeout = req.session.expireAt;
    const timestamp = new Date.getTime() / 1000;

    try {
        if (sessiontimeout < timestamp) {
            return res.status(403).json({ message: "Otp expired" });
        }
        if (sessionotp !== otp) {
            return res.status(403).json({ message: "Otp incorrect" });
        }
        res.status(201).json({ message: "Otp verification successful" });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Otp verification failed" });
    }
};

module.exports = {
    userRegistration,
    userLogin,
    emailVerification,
    otpVerification,
};
