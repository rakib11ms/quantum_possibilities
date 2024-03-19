const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({

    category_name: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',
    },
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Pages'
    },


    name: {
        type: String,
        required: false,
        default: null
    },


    description: {
        type: String,
        required: false,
        default: null
    },


    image_path: {
        type: String,
        required: false,
        default: null
    },


    status: {
        type: String,
        required: false,
        default: null
    },
    ip_address: {
        type: String,
        required: false,
        default: null
    },
    created_by: {
        type: String,
        required: false,
        default: null
    },
    updated_by: {
        type: String,
        required: false,
        default: null
    },
}, { timestamps: true });


const Store = mongoose.model('Store', storeSchema);
//to use blog habe exports
module.exports = Store;