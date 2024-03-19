const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({

    department_name: {
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



const Department = mongoose.model('Department', departmentSchema);
//to use blog habe exports
module.exports = Department;       