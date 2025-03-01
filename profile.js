/*const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 'uploads' is the directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save files with a unique name
    }
});

const upload = multer({ storage: storage });

// Route to handle profile picture upload
router.post('/upload', upload.single('profilePic'), async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.profilePic = req.file.filename;
        await user.save();

        res.json({ profilePic: user.profilePic });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
*/