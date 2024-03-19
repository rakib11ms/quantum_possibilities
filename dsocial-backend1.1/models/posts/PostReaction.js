const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postReactionSchema = new Schema({

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
 
 
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Post'

    },
    post_single_item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PostMedia'

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


const PostReaction = mongoose.model('PostReaction', postReactionSchema);
//to use blog habe exports
module.exports = PostReaction;