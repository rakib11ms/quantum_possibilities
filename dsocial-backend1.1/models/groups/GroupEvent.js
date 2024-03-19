const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const groupEventSchema = new Schema({
    title: {
        type: String,
        required: false,
        default: null,
    },
    host_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Group'
    },
    photo: {
        type: String,
        required: false,
        default: null,
    },
    start_date: {
        type: Date,
        required: false,
        default: null,
    },
    start_time: {
        type: Date,
        required: false,
        default: null,
    },

    end_date: {
        type: Date,
        required: false,
        default: null,
    },
    end_time: {
        type: Date,
        required: false,
        default: null,
    },

    type: {
        type: String,
        enum: ['Virtual', 'Real'],
        required: false,
        default: null,
    },
    meeting_url: {
        type: String,
        required: false,
        default: null,
    },
    location: {
        type: String,
        required: false,
        default: null,
    },
    co_host_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    details: {
        type: String,
        required: false,
        default: null,
    },
    inviteAllMember: {
        type: Boolean,
        required: false,
        default: false,
    },

    ip_address: {
        type: String,
        required: false,
        default: null
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    created_date: {
        type: String,
        required: false,
        default: null
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    },
    update_by: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    update_Date: {
        type: String,
        required: false,
        default: null
    }
},
    { timestamps: true }
);
const GroupEvent = mongoose.model('GroupEvent', groupEventSchema);
module.exports = GroupEvent;