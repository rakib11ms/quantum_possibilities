const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupPostReplyCommentSchema = new Schema({
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'GroupPostComment',

    },

    replies_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,     
        ref: 'User',

    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'GroupPost',
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


const GroupPostReplyComment = mongoose.model('GroupPostReplyComment', GroupPostReplyCommentSchema);
//to use blog habe exports
module.exports = GroupPostReplyComment;