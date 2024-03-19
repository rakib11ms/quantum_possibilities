const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hobbiesSchema = new Schema({

    hobbies_name: {
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



const Hobbies = mongoose.model('Hobbies', hobbiesSchema);
//to use blog habe exports
module.exports = Hobbies;