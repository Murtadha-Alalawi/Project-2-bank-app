const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    type: {
        type: String,
        required: ['Checking', 'Savings']
    },
    name: {
        type: String,
        required: true
    } 
})

module.exports = mongoose.model('Account', accountSchema)