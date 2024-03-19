const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designationSchema = new Schema({

    designation_name: {
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



const Designation = mongoose.model('Designation', designationSchema);
//to use blog habe exports
module.exports = Designation;       