const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    /*Bio: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },*/
});

module.exports = mongoose.model('User', UserSchema);
