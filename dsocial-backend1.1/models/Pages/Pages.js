const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    page_name: {
        type: String,
        required: false,
        default: null
    },
    category: {
        type: Array,
        required: false,
        default: null
    },
    friends: {
        type: Array,
        required: false,
        default: null
    },
    location: {
        type: Array,
        required: false,
        default: null
    },
    bio: {
        type: String,
        required: false,
        default: null
    },
    website: {
        type: String,
        required: false,
        default: null
    },
    pageNotification: {
        type: Boolean,
        required: false,
        default: null
    },
    mailNotification: {
        type: Boolean,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: false,
        default: null
    },
    address: {
        type: String,
        required: false,
        default: null
    },
    city: {
        type: String,
        required: false,
        default: null
    },
    zip_code: {
        type: String,
        required: false,
        default: null
    },

    profile_pic: {
        type: String,
        required: false,
        default: null
    },
    cover_pic: {
        type: String,
        required: false,
        default: null
    },

    page_user_name: {
        type: String,
        required: false,
        default: null
    },
    phone_number: {
        type: String,
        required: false,
        default: null
    },
    whatsapp: {
        type: String,
        required: false,
        default: null
    },
    instagram: {
        type: String,
        required: false,
        default: null
    },
    service_area: {
        type: String,
        required: false,
        default: null
    },
    offer: {
        type: String,
        required: false,
        default: null
    },
    language: {
        type: String,
        required: false,
        default: null
    },
    privacy: {
        type: String,
        required: false,
        default: null
    },
    invite_friends: {
        type: String,
        required: false,
        default: null
    },
    user_id: {
        type: String,
        required: false,
        default: null
    },
    status: {
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
    page_rule: {
        type: String,
        required: false,
        default: null
    },
    page_message: {
        type: String,
        required: false,
        default: null
    },
    page_reaction: {
        type: String,
        required: false,
        default: null
    }
},
    { timestamps: true }
);
const Pages = mongoose.model('Pages', pageSchema);
module.exports = Pages;