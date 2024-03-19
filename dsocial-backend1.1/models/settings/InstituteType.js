const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instituteTypeSchema = new Schema({

    institute_type: {
        type: String,
        require: false,
        default: null
    },


    logo: {
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



const InstituteType = mongoose.model('InstituteType', instituteTypeSchema);
//to use blog habe exports
module.exports = InstituteType;       