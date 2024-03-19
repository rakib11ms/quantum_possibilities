const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nidSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    nid: {
        type: String,
        require: false,
        default: null
    },


    issue_date: {
        type: String,
        require: false,
        default: null
    },

    expire_date: {
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


const NID = mongoose.model('NID', nidSchema);

module.exports = NID;