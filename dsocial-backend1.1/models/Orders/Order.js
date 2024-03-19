const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({

    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Order',

    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Product',

    },
    store_id: {
        type: String,
        required: false,
        default: null,

    },
    oi_quantity: {
        type: Number,
        required: false,
        default: null,
    },
    oi_costPrice: {
        type: Number,
        required: false,
        default: null,
    },
    oi_sellingPrice: {
        type: Number,
        required: false,
        default: null,
    },
    oi_discount: {
        type: Number,
        required: false,
        default: null,
    },
    oi_tax: {
        type: Number,
        required: false,
        default: null,
    },
    oi_total: {
        type: Number,
        required: false,
        default: null,
    },
    oi_status: {
        type: String,
        required: false,
        default: null,
    },
    oi_type: {
        type: String,
        required: false,
        default: null,
    }
});

const orderSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },
    customer_name: {
        type: String,
        required: false,
        default: null,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Order',

    },
    order_type: {
        type: String,
        required: false,
        default: null,
    },
    order_status: {
        type: String,
        required: false,
        default: null,
    },
    order_date: {
        type: Date,
        required: false,
        default: null,
    },
    order_address: {
        type: String,
        required: false,
        default: null,
    },
    order_cpTotal: {
        type: Number,
        required: false,
        default: null,
    },
    order_spTotal: {
        type: Number,
        required: false,
        default: null,
    },
    order_taxTotal: {
        type: Number,
        required: false,
        default: null,
    },
    order_discountTotal: {
        type: Number,
        required: false,
        default: null,
    },
    order_total: {
        type: Number,
        required: false,
        default: null,
    },
    order_redeemedCoupon: {
        type: String,
        required: false,
        default: null,
    },
    order_items: [orderItemSchema],
    order_transactionId: {
        type: String,
        required: false,
        default: null,
    },
    order_paymentStatus: {
        type: String,
        required: false,
        default: null,
    },
    order_billingAddress: {
        type: String,
        required: false,
        default: null,
    },
    order_shippingAddress: {
        type: String,
        required: false,
        default: null,
    },
    order_storeNames: [{
        type: String,
        required: false,
        default: null,
    }],
    createdAt: {
        type: Date,
        required: false,
        default: null,
    },
    updatedAt: {
        type: Date,
        required: false,
        default: null,
    },
    created_by: {
        type: String,
        required: false,
        default: null,
    },
    updated_by: {
        type: String,
        required: false,
        default: null,
    },
});

module.exports = mongoose.model('Order', orderSchema);


