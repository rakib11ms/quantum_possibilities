const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postMediaSchema = new Schema({
    caption: {
        type: String,
        required: false,
        default: null
    },
    
    media: {
        type: String,
        required: false,
        default: null
    },

    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,     
        ref: 'Post',

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
}, { timestamps: true });


const PostMedia = mongoose.model('PostMedia', postMediaSchema);
//to use blog habe exports
module.exports = PostMedia;