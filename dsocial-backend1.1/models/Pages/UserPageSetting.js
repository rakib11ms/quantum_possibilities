const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPageSettingSchema = new Schema({
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Pages',
        default: null,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    block_status: {
        type: Number,
        require: false,
        default: null
    },
    report_status: {
        type: Number,
        require: false,
        default: null
    },
    bookmark_status: {
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

const UserPageSetting = mongoose.model('UserPageSetting', userPageSettingSchema);
module.exports = UserPageSetting;