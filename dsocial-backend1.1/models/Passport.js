const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const passportSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    
    passport_number: {
        type: String,
        require: false,
        default: null
    },


    issue_date: {
        type: Date,
        require: false,
        default: null
    },

    expire_date: {
        type: Date,
        require: false,
        default: null
    },

    authority: {
        type: String,
        require: false,
        default: null
    },

    country: {
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


const UserPassport = mongoose.model('UserPassport', passportSchema);
//to use blog habe exports
module.exports = UserPassport;