const mongoose = require('mongoose')
const applicationSchema = require('./application.js')
const transactionSchema = require('./transactions.js')
const depositSchema = require('./deposit.js')
const withdrawSchema = require('./withdraw.js')
const transferSchema = require('./transfer.js')

const balanceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    }
})

const depositSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const transferSchema = new mongoose.Schema({
    amount: {
        type: Number, 
        required: true},
    from: {
        type: applicationSchema,
        required: true},
    to: {
        type: applicationSchema,
        required: true},
    date: {
        type: Date, 
        required: true},
    description: {
        type: String, 
        required: true}

})

const withdrawSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Transaction', transactionSchema)