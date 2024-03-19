const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSubActivitySchema = new Schema({

    sub_activity_name: {
        type: String,
        require: false,
        default: null
    },

    logo: {
        type: String,
        require: false,
        default: null
    },

    activity_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'PostActivity',
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



const PostSubActivity = mongoose.model('PostSubActivity', postSubActivitySchema);
//to use blog habe exports
module.exports = PostSubActivity;