const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewReplyCommentSchema = new Schema({
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'ReviewComment',

    },

    replies_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },
    replies_comment_name: {
        type: String,
        required: false,
        default: null,

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


const ReviewReplyComment = mongoose.model('ReviewReplyComment', reviewReplyCommentSchema);
//to use blog habe exports
module.exports = ReviewReplyComment;