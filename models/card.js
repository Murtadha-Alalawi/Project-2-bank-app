const mongoose = require('mongoose')


const cardSchema = new mongoose.Schema({
    cardType: {
        type: String,
        required: ['Visa', 'Mastercard', 'Discover', 'American Express']
    },
    phoneNumber: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }   
})

module.exports = mongoose.model('Card', cardSchema)
