const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressBookSchema = new Schema({
    user_id: {
        type: Number,
        require: false,
        default: null
    },
    institude_id: {
        type: String,
        require: false,
        default: null
    },

    address_type: {
        type: String,
        require: false,
        default: null
    },

    address: {
        type: String,
        require: false,
        default: null
    },


    street_no: {
        type: String,
        require: false,
        default: null
    },

    institude_id: {
        type: String,
        require: false,
        default: null
    },

    city: {
        type: String,
        require: false,
        default: null
    },
    postal_code: {
        type: String,
        require: false,
        default: null
    },
    country: {
        type: String,
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


const AddressBook = mongoose.model('AddressBook', addressBookSchema);
//to use blog habe exports
module.exports = AddressBook;