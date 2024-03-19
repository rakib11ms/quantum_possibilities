const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    notification_type: {
        type: String,
        required: false,
        default: null
    },
    // notification_data:{
    //     type: Object,
    //     required: false,
    //     default: null
    // },
    notification_data: {
        type: {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
                required: false,
                default: null
            },
            comment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
                required: false,
                default: null
            },
            comment_replies_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ReplyComment',
                required: false,
                default: null
            },

        },
        required: false,
        default: null
    },
    message: {
        type: String,
        required: false,
        default: ''
    },
    resource_title: {
        type: String,
        required: false,
        default: null
    },
    resource_id: {
        type: String,
        required: false,
        default: null
    },
    resource_object:{
        type: Object,
        required: false,
        default: null
    },
    notification_sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',
    },

    notification_receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },
    notification_seen: {
        type: Boolean,
        required: false,
        default: false
    },
    status: {
        type: String,
        required: false,
        default: null
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
    update_by: {
        type: String,
        required: false,
        default: null
    },
}, { timestamps: true });


const Notification = mongoose.model('Notification', notificationSchema);
//to use blog habe exports
module.exports = Notification;