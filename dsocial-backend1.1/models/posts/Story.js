const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({


    title: {
        type: String,
        required: false,
        default: null
    },


    color: {
        type: String,
        required: false,
        default: null
    },

    text_color: {
        type: String,
        required: false,
        default: null
    },

    font_family: {
        type: String,
        required: false,
        default: null
    },
    font_size: {
        type: String,
        required: false,
        default: null
    },

    media: {
        type: String,
        required: false,
        default: null
    },

    text_position: {
        type: String,
        required: false,
        default: null
    },

    text_alignment: {
        type: String,
        required: false,
        default: null
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },


    privacy_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PostAudience',

    },

    status: {
        type: String,
        required: false,
        default: null
    },

    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Location',

    },
    feeling_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PostFeelings'
    },

    activity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PostActivity'

    },
    sub_activity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PostSubActivity'

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


const Story = mongoose.model('Story', storySchema);
//to use blog habe exports
module.exports = Story;