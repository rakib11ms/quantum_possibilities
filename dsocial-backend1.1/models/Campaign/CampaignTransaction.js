const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignTransaction = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',
    },
    paid_amount: {
        type: Number,
        required: false,
        default: null,
    },
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Campaigns',
    },
    payment_via: {
        type: String,
        required: false,
        default: null,
    },
    
    payment_received: {
        type: String,
        required: false,
        default: null,
    },

    reference: {
        type: String,
        required: false,
        default: null,
    },
    createdAt: {
        type: Date,
        required: false,
        default: null,
    },
    updatedAt: {
        type: Date,
        required: false,
        default: null,
    },
    created_by: {
        type: String,
        required: false,
        default: null,
    },
    updated_by: {
        type: String,
        required: false,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('Campaign_transaction', campaignTransaction);


