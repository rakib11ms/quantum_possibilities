const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupChatInfoSchema = new Schema({
    group_name: {
        type: String,
        required: false,
        default: null,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        default: [],
        ref: 'User',
    },
    group_image: {
        type: String,
        required: false,
        default: null
    }
    ,
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
const GroupChatInfo = mongoose.model('GroupChatInfo', GroupChatInfoSchema);
module.exports = GroupChatInfo;



