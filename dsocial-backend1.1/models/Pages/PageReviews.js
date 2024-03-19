const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagesReviewsSchema = new Schema({
    recommendation: {
        type: String,
        required: false,
        default: null
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },

    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Pages'
    },

    type: {
        type: String,
        required: false,
        default: null
    },

    privacy_type: {
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
    updated_by: {
        type: String,
        required: false,
        default: null
    },
}, { timestamps: true });


const PagesReviews = mongoose.model('PagesReviews', pagesReviewsSchema);
//to use blog habe exports
module.exports = PagesReviews;