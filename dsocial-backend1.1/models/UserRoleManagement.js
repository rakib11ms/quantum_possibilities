const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userRoleManagementSchema = new Schema({
    role_id: {
        type: String,
        require: false,
        default: null
    },
    role_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'RoleManagement',
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


const UserRoleManagement = mongoose.model('UserRoleManagement', userRoleManagementSchema);

module.exports = UserRoleManagement;