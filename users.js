/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/hdoop/Pictures'); // Directory to save the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save files with a unique name
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000 
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(null, true);
    }
});

// Update or create user profile
router.post('/profile', auth, upload.single('displayPic'), async (req, res) => {
    try {
        const updates = { name: req.body.name, bio: req.body.bio };
        if (req.file) updates.profilePicture = `/uploads/${req.file.filename}`; // Store relative path for easy access

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


module.exports = router;
*/