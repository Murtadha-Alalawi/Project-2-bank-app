const mongoose = require('mongoose')


const accountSchema = new mongoose.Schema({
    type: {
        type: String,
        required: ['Checking', 'Savings']
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Account', accountSchema)