const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleManagementSchema = new Schema({
    name: {
        type: String,
        require: false,
        default: null
    },
    permission: {
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


const RoleManagement = mongoose.model('RoleManagement', roleManagementSchema);

module.exports = RoleManagement;