const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const friendsSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    connected_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },


    relation_type: {
        type: String,
        require: false,
        default: null
    },

    
    accept_reject_status: {
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


const Friends = mongoose.model('Friends', friendsSchema);
//to use blog habe exports
module.exports = Friends;