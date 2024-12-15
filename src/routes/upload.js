const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const router = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path);
		res.status(200).json({ url: result.secure_url });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;