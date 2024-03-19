const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    org_name: {
        type: String,
        require: false,
        default: null
    },
    location: {
        type: String,
        require: false,
        default: null
    },

    rating: {
        type: String,
        require: false,
        default: null
    },

    phone: {
        type: String,
        require: false,
        default: null
    },


    email: {
        type: String,
        require: false,
        default: null
    },


    profile_pic: {
        type: String,
        require: false,
        default: null
    },

    organization_id: {
        type: String,
        require: false,
        default: null
    },



    description: {
        type: String,
        require: false,
        default: null
    },


    is_ownership_claimed: {
        type: String,
        require: false,
        default: null
    },


    owner_id: {
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


const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;