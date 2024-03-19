const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const penaltyTypeSchema = new Schema({

    type_name: {
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



const PenaltyType = mongoose.model('PenaltyType', penaltyTypeSchema);
//to use blog habe exports
module.exports = PenaltyType;