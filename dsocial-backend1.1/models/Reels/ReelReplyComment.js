const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReelReplyCommentSchema = new Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Reels',
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'ReelComment',

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
    comment_type: {
        type: String,
        default: "reply_comment"
    },
    comment_edited: {
        type: Boolean,
        default: false,
    },
    image_or_video: {
        type: String,
        default: null,
        required:false
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


const ReelReplyComment = mongoose.model('ReelReplyComment', ReelReplyCommentSchema);
//to use blog habe exports
module.exports = ReelReplyComment;