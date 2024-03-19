const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const followersSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },

    follower_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },

    follow_unfollow_status: {
        type: String,
        require: false,
        default: null
    },

    data_status: {
        type: Number,
        require: false,
        default: null
    },
    ip_address: {
        type: String,
        require: false,
        default: null
    },
    created_by: {
        type: Number,
        require: false,
        default: null
    },
    update_by: {
        type: Number,
        require: false,
        default: null
    },
}, { timestamps: true });


const Followers = mongoose.model('Followers', followersSchema);
//to use blog habe exports
module.exports = Followers;