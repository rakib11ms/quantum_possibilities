const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationClaimedDocsSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    document_type: {
        type: String,
        require: false,
        default: null
    },

    document: {
        type: String,
        require: false,
        default: null
    },

    is_verified: {
        type: Number,
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


const OrganizationClaimedDocs = mongoose.model('OrganizationClaimedDocs', organizationClaimedDocsSchema);

module.exports = OrganizationClaimedDocs;