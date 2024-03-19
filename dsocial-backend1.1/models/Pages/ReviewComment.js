const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewCommentSchema = new Schema({
    comment_name: {
        type: String,
        required: false,
        default: null
    },
    review_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PagesReviews',

    },


    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

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


const ReviewComment = mongoose.model('ReviewComment', reviewCommentSchema);
//to use blog habe exports
module.exports = ReviewComment;