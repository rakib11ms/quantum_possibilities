const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupPostSchema = new Schema({
    description: {
        type: String,
        required: false,
        default: null
    },

    post_type: {
        type: String,
        // enum: ['timeline', 'profilePic'],
        required: false,
        default: null,
    },
    group_post_media: {
        type: String,
        require: false,
        default: null
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

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

    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Group'
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: false,
        default: 'active'
    },
    ip_address: {
        type: String,
        required: false,
        default: null
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'User',
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'User',
    },
    share_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'GroupPost'
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

    post_background_color:{
        type: String,
        default: null,
        required: false
    },

}, { timestamps: true });


const GroupPost = mongoose.model('GroupPost', GroupPostSchema);
//to use blog habe exports
module.exports = GroupPost;