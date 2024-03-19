const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPrivacySettingsSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },


    field_name: {
        type: String,
        require: false,
        default: 0
    },


    privacy: {
        type: String,
        require: false,
        default: 0
    },



    is_profile_locked: {
        type: Number,
        require: false,
        default: 0
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


const UserPrivacySettings = mongoose.model('UserPrivacySettings', userPrivacySettingsSchema);

module.exports = UserPrivacySettings;