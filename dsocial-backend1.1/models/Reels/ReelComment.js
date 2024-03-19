const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReelcommentSchema = new Schema({
    comment_name: {
        type: String,
        required: false,
        default: null
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Reels',

    },
    post_single_item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PostMedia'
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


const ReelComment = mongoose.model('ReelComment', ReelcommentSchema);
//to use blog habe exports
module.exports = ReelComment;