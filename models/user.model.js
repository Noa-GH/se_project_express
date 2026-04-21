const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: [true, 'Name is required'],
        trim: true
    },
    avatar: {
        type: String,
        required: [true, 'Avatar URL is required'],
        validate: {
            validator(value) {
                return validator.isURL(value);
            },
            message: 'You must enter valid URL'
        }
        // default: 'default-avatar.png' Fallback image is needed
    }
});

module.exports = mongoose.model('user', userSchema);