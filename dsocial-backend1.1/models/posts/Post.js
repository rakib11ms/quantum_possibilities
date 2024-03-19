const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    description: {
        type: String,
        required: false,
        default: null
    },

    // media: {
    //     type: String,
    //     required: false,
    //     default: null
    // },
    // media: [{
    //     type: String,
    //     required: false,
    //     default: null
    //   }],



    // media: [{
    //     caption: {
    //       type: String,
    //       required: false,
    //       default: null
    //     },
    //     image: {
    //       type: String,
    //       required: false,
    //       default: null
    //     }
    //   }],


    post_type: {
        type: String, //birthday
        required: false,
        default: null,
    },
    to_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },
    event_type: {
        type: String,
        required: false,
        default: null,
    },

    event_sub_type: {
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

    post_privacy: {
        type: String,
        default: null,
        required: false
    }
    ,
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Pages'
    },
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Campaigns',
    },

    share_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Post'
    },
    share_reels_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Reels'
    },

    workplace_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'UserWorkPlace'
    },


    institute_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'EducationWorkPlace'
    },

    link: {
        type: String,
        default: null,
        required: false
    },

    link_title: {
        type: String,
        default: null,
        required: false
    },

    link_description: {
        type: String,
        default: null,
        required: false
    },


    link_image: {
        type: String,
        default: null,
        required: false
    },

    post_background_color: {
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
    is_hidden: {
        type: Boolean,
        default: false,
        required: false
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


const Post = mongoose.model('Post', postSchema);
//to use blog habe exports
module.exports = Post;