const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postActivitySchema = new Schema({

    activity_name: {
        type: String,
        require: false,
        default: null
    },

    logo: {
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



const PostActivity = mongoose.model('PostActivity', postActivitySchema);
//to use blog habe exports
module.exports = PostActivity;