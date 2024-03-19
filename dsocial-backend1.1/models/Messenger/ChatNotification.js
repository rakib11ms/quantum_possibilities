const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatNotificationSchema = new Schema({
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default:null,
        ref: 'Chat',

    },
    seen_notification:{
        type: Number,
        required: false,
        default:0,
 
    }
   ,
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
const chatNotification = mongoose.model('chatNotification', chatNotificationSchema);
module.exports = chatNotification;



