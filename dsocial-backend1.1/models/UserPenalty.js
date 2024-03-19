const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPenaltySchema = new Schema({

    penalty_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'PenaltyType',
        default: null
    },

    start_at: {
        type: Date,
        require: false,
        default: null
    },

    end_at: {
        type   : Date,
        require: false,
        default: null
    },


    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
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



const UserPenalty = mongoose.model('UserPenalty', userPenaltySchema);
//to use blog habe exports
module.exports = UserPenalty;