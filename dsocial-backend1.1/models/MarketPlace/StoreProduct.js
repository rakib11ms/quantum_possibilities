const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    product_name: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },
    category_name: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },

    brand_name: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },


    unit: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },

    weight: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },



    description: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },


    image_path: {
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
    discount_type: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },
    discount: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },
    tax: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },

    vat: {
        type: "String",
        required: false,
        default: null,
        // ref: 'StoreCategory',
    },

    product_store: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Store',
    },

    status: {
        type: "String",
        required: false,
        default: null,
    },

    product_condition: {
        type: "String",
        required: false,
        default: null,
    },

    shipping_method: {
        type: "String",
        required: false,
        default: null,
    },
    is_physical_product: {
        type: "String",
        required: false,
        default: null,
    },

    shipping_weight: {
        type: "String",
        required: false,
        default: null,
    },

    shipping_height: {
        type: "String",
        required: false,
        default: null,
    },


    length: {
        type: "String",
        required: false,
        default: null,
    },

    width: {
        type: "String",
        required: false,
        default: null,
    },

    user_id: {
        type: "String",
        required: false,
        default: null,
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


const StoreProduct = mongoose.model('StoreProduct', storeSchema);
//to use blog habe exports
module.exports = StoreProduct;