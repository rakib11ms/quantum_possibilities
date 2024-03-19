const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websitesSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    social_media_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SocialMedia',
    },
    website_url: {
        type: String,
        required: false,
        default: null
    },

    privacy: {
        type: String,
        require: false,
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



const Websites = mongoose.model('Websites', websitesSchema);
module.exports = Websites;