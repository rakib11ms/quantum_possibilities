const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instituteSchema = new Schema({


    institute_name: {
        type: String,
        require: false,
        default: null
    },
   
    rating: {
        type: String,
        require: false,
        default: null
    },

    phone: {
        type: String,
        require: false,
        default: null
    },

    email: {
        type: String,
        require: false,
        default: null
    },
    logo: {
        type: String,
        require: false,
        default: null
    },
    estabilshed_at: {
        type: Number,
        require: false,
        default: null
    },
    description: {
        type: Number,
        require: false,
        default: null
    },
    institute_status: {
        type: Number,
        require: false,
        default: null
    },

    is_ownership_claimed: {
        type: Number,
        require: false,
        default: null
    },


    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },

    status: {
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


const Institute = mongoose.model('Institute', instituteSchema);

module.exports = Institute;