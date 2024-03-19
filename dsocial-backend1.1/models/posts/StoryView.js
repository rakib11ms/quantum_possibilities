const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storyViewSchema = new Schema({

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


const StoryView = mongoose.model('StoryView', storyViewSchema);
//to use blog habe exports
module.exports = StoryView;