const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const auth = require('../middleware/auth');
const { sendEmail } = require('../services/send-email');

// Sign up
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // generate verification token
        const verificationToken = jwt.sign({ userId: user.id }, 'yourVerificationSecretKey', { expiresIn: '1d' });

        // send verification link to user
        const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${verificationToken}`;
        const message = `
            <p>Please verify your account by clicking the following link:</p>
            <a href="${verificationLink}">${verificationLink}</a>
        `;
        await sendEmail({ to: user.email, subject: 'Email Verification', html: message });

        res.status(200).json({ msg: 'Verification email sent. Please check your inbox.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Verify email
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, 'yourVerificationSecretKey');
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({ msg: 'Invalid token or user does not exist' });
        }

        user.is_verified = true;
        await user.save();

        res.redirect('http://localhost:3000/email-verified?success=true');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Sign in
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if (!user.is_verified) {
            return res.status(403).json({ msg: 'Access denied. Please verify your account first.' });
        }

        // generate otp
        const otp = Math.floor(100000 + Math.random() * 900000);

        // upsert OTP record
        await OTP.findOneAndUpdate(
            { email: user.email },
            { otp },
            { upsert: true, new: true }
        );

        // send otp to user
        const message = `Your OTP is ${otp}`;
        await sendEmail({ to: user.email, subject: 'OTP', text: message });

        // sign the token and send it to the user
        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'yourSecretKey', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/verify-otp', auth, async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const otpRecord = await OTP.findOne({ otp, email: user.email });
        if (!otpRecord) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: 3600 });

        res.json({ msg: 'OTP verified successfully', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get authenticated user's details
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
