const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationWorkPlace = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    username: {
        type: String,
        required: false,
        default: null
    },
    institute_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InstituteType',
        default: null
    },
    institute_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Institute',
        default: null
    },
    institute_name: {
        type: String,
        required: false,
        default: null
    },
    is_Stuyding: {
        type: Boolean,     // 0: Not studying, 1: Studying
        required: false,
        default: 0        // Default to "Not studying"
    }
    ,
    startDate: {
        type: Date,
        require: false,
        default: null
    },

    endDate: {
        type: Date,
        require: false,
        default: null
    },

    description: {
        type: String,
        require: false,
        default: null
    },

    privacy: {
        type: String,
        require: false,
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


const EducationWorkPlace = mongoose.model('EducationWorkPlace', educationWorkPlace);

module.exports = EducationWorkPlace;