const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storyReactionSchema = new Schema({

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
 
 
    story_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Story'

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


const StoryReaction = mongoose.model('StoryReaction', storyReactionSchema);
//to use blog habe exports
module.exports = StoryReaction;