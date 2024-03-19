const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageInvitationSchema = new Schema({
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Pages',
        default: null,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    accept_invitation: {
        type: Number,
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

const PageInvitation = mongoose.model('PageInvitation', pageInvitationSchema);
module.exports = PageInvitation;