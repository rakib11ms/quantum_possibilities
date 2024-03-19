const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const groupSchema = new Schema({
    group_name: {
        type: String,
        required: false,
        default: null
    },
    group_privacy: {
        type: String,
        enum: ['private', 'public'],
        required: false,
        default: 'public'
    },
    visibility: {
        type: String,
        enum: ['visible', 'invisible'],
        required: false,
        default: 'visible'
    },
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    },
    is_post_approve: {
        type: Boolean,
        required: false,
        default: false
    },
    participant_approve_by: {
        type: String,
        enum: ['admin&monderator', 'admin','monderator',null],
        required: false,
        default: null,
    },
    post_approve_by: {
        type: String,
        enum: ['admin','monderator',null],
        required: false,
        default: null
    },
    group_cover_pic: {
        type: String,
        required: false,
        default: null
    },
    group_description: {
        type: String,
        required: false,
        default: null
    },
    location: {
        type: String,
        required: false,
        default: null
    },
    custom_link: {
        type: String,
        required: false,
        default: null
    },
    address: {
        type: String,
        required: false,
        default: null
    },
    zip_code: {
        type: String,
        required: false,
        default: null
    },

    group_created_user_id: {
        type: String,
        required: false,
        default: null
    },

    status: {
        type: String,
        required: false,
        default: null,

    },
    ip_address: {
        type: String,
        required: false,
        default: null
    },
    created_by: {
        type: String,
        required: false,
        default: null
    },
    created_date: {
        type: String,
        required: false,
        default: null
    },
    update_by: {
        type: String,
        required: false,
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
const Group = mongoose.model('Group', groupSchema);
module.exports = Group;