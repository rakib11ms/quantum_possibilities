const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupMemberSchema = new Schema({
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: "Group",

    },
    group_member_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned', 'blocked', 'delete', 'left'],
        required: false,
        default: null
    },
    role: {
        type: String,
        enum: ['admin', 'moderator','member'],
        required: false,
        default: 'member'
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
    },
    is_accepted: {
        type: Boolean,
        require: true,
        default: false
    },
},
    { timestamps: true }
);

const GroupMember = mongoose.model('GroupMember', groupMemberSchema);
module.exports = GroupMember;