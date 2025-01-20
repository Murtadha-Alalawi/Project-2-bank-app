const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Transaction',
        default: []
    }
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard