const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const moduleRoleManagementSchema = new Schema({
    role_id: {
        type: String,
        require: false,
        default: null
    },
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'RoleManagement',
        default: null
    },

    hashed_key: {
        type: String,
        require: false,
        default: null
    },
    public_key: {
        type: String,
        require: false,
        default: null
    },

    private_key: {
        type: String,
        require: false,
        default: null
    },

    is_enabled: {
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


const ModuleRoleManagement = mongoose.model('ModuleRoleManagement', moduleRoleManagementSchema);

module.exports = ModuleRoleManagement;