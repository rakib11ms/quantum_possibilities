const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEmailSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    email_type: {
        type: String,
        require: false,
        default: null
    },

    email: {
        type: String,
        require: false,
        default: null
    },

    is_mail_verified: {
        type: Number,
        require: false,
        default: null
    },

    token: {
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


const UserEmail = mongoose.model('OrganizationClaimedDocs', userEmailSchema);

module.exports = UserEmail;