const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userloginActivity = new Schema({
    user_id: {
        type:  mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    location: {
        type: String,
        require: false,
        default: null
    },

    device_id: {
        type: String,
        require: false,
        default: null
    },

    is_login_info_saved: {
        type: String,
        require: false,
        default: null
    },


    total_login_attempt_count: {
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


const AddressBook = mongoose.model('AddressBook', addressBookSchema);
//to use blog habe exports
module.exports = AddressBook;