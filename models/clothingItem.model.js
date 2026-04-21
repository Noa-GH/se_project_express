const mongoose = require('mongoose');

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
        ref: 'user',
        required: true,
        validator: {
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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        defualt: []
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports Clothing = mongoose.model('Clothing', userschema);
