const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({

    location_name: {
        type: String,
        require: false,
        default: null
    },

    image: {
        type: String,
        require: false,
        default: null
    },

    sub_address: {
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
    city: {
        type: String,
        require: false,
        default: null
    },
    lat: {
        type: String,
        require: false,
        default: null
    },
    lng: {
        type: String,
        require: false,
        default: null
    },
    country: {
        type: String,
        require: false,
        default: null
    },
    country_code: {
        type: String,
        require: false,
        default: null
    },
    
}, { timestamps: true });



const Location = mongoose.model('Location', locationSchema);
//to use blog habe exports
module.exports = Location;