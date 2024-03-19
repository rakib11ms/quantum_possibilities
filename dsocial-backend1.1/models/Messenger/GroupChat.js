const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupChatSchema = new Schema({
    message: {
        type: String,
        required: false,
        default: null
    },
    group_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'GroupChatInfo',
    },
    forward_message: {
        type: Number, //forward 0 means false 1 means true
        required: false,
        default: 0
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },
    // receiver_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    //     default: null,
    //     ref: 'User',
    // },

    file: {
        type: String,
        required: false,
        default: null
    },
    replied_message_reference: {
        message_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            default: null,
            ref: "Chat"
        },

    },
    reaction: [
        {
            reaction_type: {
                type: String,
                default: null,
                required: false
            },
            user_id: {
                type: mongoose.Schema.ObjectId,
                required: false,
                default: null
            }
        }
    ],
    message_delete_status: {
        type: Number,
        required: false,
        default: 0,
    },
    // file: {
    //     base64Data: String,
    //     fileName: String,
    // },
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
const GroupChat = mongoose.model('GroupChat', GroupChatSchema);
module.exports = GroupChat;