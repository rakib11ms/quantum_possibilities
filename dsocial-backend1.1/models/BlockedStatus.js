const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockedStatusSchema = new Schema({
    user_id: {
        type: Number,
        require: false,
        default: null
    },


    to_user_id: {
        type: Number,
        require: false,
        default: null
    },

    start_date: {
        type: Date,
        require: false,
        default: null
    },


    end_date: {
        type: Date,
        require: false,
        default: null
    },


    blocked_id: {
        type: Number,
        require: false,
        default: null
    },

    reason: {
        type: String,
        require: false,
        default: null
    },


    status: {
        type: Number,
        require: false,
        default: null
    },
    ip_address: {
        type: String,
        require: false,
        default: null
    },
    created_by: {
        type: Number,
        require: false,
        default: null
    },
    update_by: {
        type: Number,
        require: false,
        default: null
    },
}, { timestamps: true });


const BlockedStatus = mongoose.model('BlockedStatus', blockedStatusSchema);

module.exports = BlockedStatus;