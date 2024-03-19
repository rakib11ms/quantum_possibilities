const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userHobbiesSchema = new Schema({

    hobbies_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Hobbies',
        default: null
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
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



const UserHobbies = mongoose.model('UserHobbies', userHobbiesSchema);
//to use blog habe exports
module.exports = UserHobbies;