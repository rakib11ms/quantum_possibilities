const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postTagsSchema = new Schema({
    
    user_id: {
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


const PostTags = mongoose.model('PostTags', postTagsSchema);
//to use blog habe exports
module.exports = PostTags;