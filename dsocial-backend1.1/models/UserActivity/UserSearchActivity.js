const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSearchAcitivtySchema = new Schema({
    user_id: {
        type:  mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    keyword_id: {
        type:  mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Keywords',
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


const UserSearchAcitivity = mongoose.model('UserSearchAcitivity', userSearchAcitivtySchema);
//to use blog habe exports
module.exports = UserSearchAcitivity;