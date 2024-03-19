const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplyCommentSchema = new Schema({
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Comment',

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
        ref: 'Post',
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

    
    link:{
        type: String,
        default: null,
        required: false
    },

    link_title:{
        type: String,
        default: null,
        required: false
    },

    link_description:{
        type: String,
        default: null,
        required: false
    },


    link_image:{
        type: String,
        default: null,
        required: false
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


const ReplyComment = mongoose.model('ReplyComment', ReplyCommentSchema);
//to use blog habe exports
module.exports = ReplyComment;