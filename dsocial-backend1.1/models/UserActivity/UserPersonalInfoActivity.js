const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPersonalInfoActivitySchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    field_name: {
        type: String,
        require: false,
        default: null
    },

    old_value: {
        type: String,
        require: false,
        default: null
    },

    new_value: {
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


const UserPersonalInfoActivity = mongoose.model('UserPersonalInfoActivity', userPersonalInfoActivitySchema);
//to use blog habe exports
module.exports = UserPersonalInfoActivity;