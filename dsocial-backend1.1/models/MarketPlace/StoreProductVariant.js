const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({

    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Store',
    },


    color: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },
    attributes: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },

    size: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },

    price: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
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


const StoreProductVariant = mongoose.model('StoreProductVariant', storeSchema);
//to use blog habe exports
module.exports = StoreProductVariant;