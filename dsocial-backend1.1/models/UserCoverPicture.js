const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userCoverPictureSchema = new Schema({
    user_id: {
        type: Number,
        require: false,
        default: null
    },
    caption: {
        type: String,
        require: false,
        default: null
    },


    cover_image: {
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


const UserCoverPictureSchema = mongoose.model('UserCoverPictureSchema', userCoverPictureSchema);
//to use blog habe exports
module.exports = UserCoverPictureSchema;