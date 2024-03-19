const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignPerformanceSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',
    },
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Campaigns',
    },
    campaign_name: {
        type: String,
        required: false,
        default: null,
    },
    campaign_location: {
        type: String,
        required: false,
        default: null,
    },
    is_reached: {
        type: Boolean,
        required: false,
        default: null,
    },
    is_impression: {
        type: Boolean,
        required: false,
        default: null,
    },
    is_clicked: {
        type: Boolean,
        required: false,
        default: null,
    },
    createdAt: {
        type: Date,
        required: false,
        default: null,
    },
    created_by: {
        type: String,
        required: false,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('campaign_performance', campaignPerformanceSchema);


