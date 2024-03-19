const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderSchema = new Schema({

    gender_name: {
        type: String,
        required: false,
        default: null
    },

    data_status: {
        type: String,
        required: false,
        default: null
    },
    ip_address: {
        type: String,
        required: false,
        default: null
    },
    created_by: {
        type: String,
        required: false,
        default: null
    },
    update_by: {
        type: String,
        required: false,
        default: null
    },
}, { timestamps: true });



const Gender = mongoose.model('Gender', genderSchema);
//to use blog habe exports
module.exports = Gender;