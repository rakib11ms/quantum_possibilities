const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialMediaSchema = new Schema({

    media_name: {
        type: String,
        required: false,
        default: null
    },
    icon: {
        type: String,
        required: false,
        default: null
    },
    base_url: {
        type: String,
        required: false,
        default: null
    },

    data_status: {
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



const SocialMedia = mongoose.model('SocialMedia', socialMediaSchema);
//to use blog habe exports
module.exports = SocialMedia;