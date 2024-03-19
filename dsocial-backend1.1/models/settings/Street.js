const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streetSchema = new Schema({

    street_name: {
        type: String,
        require: false,
        default: null
    },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'City',
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



const Street = mongoose.model('Street', streetSchema);
//to use blog habe exports
module.exports = Street;