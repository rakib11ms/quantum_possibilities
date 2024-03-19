const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({

    city_name: {
        type: String,
        require: false,
        default: null
    },
    division_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Division',
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



const City = mongoose.model('City', citySchema);
//to use blog habe exports
module.exports = City;