const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keywordSchema = new Schema({

    keyword: {
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



const Keywords = mongoose.model('Keywords', keywordSchema);
//to use blog habe exports
module.exports = Keywords;