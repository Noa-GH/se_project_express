const mongoose = require('mongoose');
const validator = require('validator');

const clothingSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: [true, 'Name is required'],
        trim: true
    },
    weather: {
        type: String,
        required: true,
        enum: ['hot', 'warm', 'cold']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return validator.isURL(value);
            },
            message: 'You must enter valid URL'
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    likes: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        default: [],
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('clothingItem', clothingSchema);
