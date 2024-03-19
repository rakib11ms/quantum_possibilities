const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSocialMediaSchema = new Schema({
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Pages',
        default: null,
    },

    social_media_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'SocialMedia',
        default: null,
    },


    url: {
        type: String,
        required: false,
        default: null,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    follow_unfollow_status: {
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

const PageSocialMedia = mongoose.model('PageSocialMedia', pageSocialMediaSchema);
module.exports = PageSocialMedia;