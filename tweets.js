/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Tweet = require('../models/Tweet');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save the uploaded files in this directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save files with a unique name
    }
});

const upload = multer({ storage: storage });

// Create a tweet
router.post('/', upload.single('image'), async (req, res) => {
    const { content, userId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const tweet = new Tweet({ content, user: userId, imageUrl });
        await tweet.save();
        res.json(tweet);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get tweets
router.get('/', async (req, res) => {
    try {
        const tweets = await Tweet.find().populate('user').sort({ createdAt: -1 }).limit(5);
        res.json(tweets);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Increment likes for a tweet
router.post('/:id/like', async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) {
            return res.status(404).json({ msg: 'Tweet not found' });
        }
        tweet.likes += 1;
        await tweet.save();
        res.json(tweet);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
*/