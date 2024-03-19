const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postalCodeSchema = new Schema({

    postal_code_name: {
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



const PostalCode = mongoose.model('PostalCode', postalCodeSchema);
//to use blog habe exports
module.exports = PostalCode;