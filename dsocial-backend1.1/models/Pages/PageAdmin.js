const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageAdminSchema = new Schema({
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
    user_role: {
        type: String,
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

const PageAdmin = mongoose.model('PageAdmin', pageAdminSchema);
module.exports = PageAdmin;