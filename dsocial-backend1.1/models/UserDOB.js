const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userDOBSchema = new Schema({
    user_id: {
        type: Number,
        require: false,
        default: null
    },
    user_purpose: {
        type: String,
        require: false,
        default: null
    },
    dob: {
        type: Date,
        require: false,
        default: null
    },

    status: {
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


const UserDOB = mongoose.model('UserDOB', userDOBSchema);
//to use blog habe exports
module.exports = UserDOB;