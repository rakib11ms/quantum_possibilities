const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupPostCommentSchema = new Schema({
    comment_name: {
        type: String,
        required: false,
        default: null
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,   
        ref: 'GroupPost',

    },
    post_single_item_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref:'GroupMedia'
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,     
        ref: 'User',

    },
    comment_type: {
        type: String,
        default: "main_comment"
    },
    comment_edited: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        required: false,
        default: null
    },
    image_or_video: {
        type: String,
        default: null,
        required:false
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


const GroupPostComment = mongoose.model('GroupPostComment', groupPostCommentSchema);
//to use blog habe exports
module.exports = GroupPostComment;