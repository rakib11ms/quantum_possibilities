const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageReviewsReactionSchema = new Schema({

    reaction_type: {
        type: String,
        required: false,
        default: null,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },


    review_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PagesReviews'

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


const PageReviewsReaction = mongoose.model('PageReviewsReaction', pageReviewsReactionSchema);
//to use blog habe exports
module.exports = PageReviewsReaction;