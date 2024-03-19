const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInterestSchema = new Schema({

    interest_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'InterestType',
        default: null
    },

    page_id: {
        type: Number,
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



const UserInterest = mongoose.model('UserInterest', userInterestSchema);
//to use blog habe exports
module.exports = UserInterest;