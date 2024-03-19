const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupInvitationSchema = new Schema({
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Group',
        default: null,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    type: {
        type: String,
        enum: ['invite','join'],
        require: false,
        default: null
    },
    accept_invitation: {
        type: Number, // if accepted 1, if no 0
        require: false,
        default: null
    },
    data_status: {
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
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    update_by: {
        type: Number,
        require: false,
        default: null
    },
}, { timestamps: true });

const GroupInvitation = mongoose.model('GroupInvitation', groupInvitationSchema);
module.exports = GroupInvitation;