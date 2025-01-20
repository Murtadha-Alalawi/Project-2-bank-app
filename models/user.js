const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 100
    },
    status: {
        type: String,
        required: ['student', 'employed', 'unemployed', 'self-employed']
    },
    applicationStatus: {
        type: Boolean,
        default: false,
        required: true 
    },
    applicationDate: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    application: [applicationSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

