const Post = require('../../models/posts/Post');
const Friends = require('../../models/Friends')
const PostMedia = require('../../models/posts/PostMedia');
const PostReaction = require('../../models/posts/PostReaction');
const Comment = require('../../models/Comments/Comment');
const CommentReaction = require('../../models/Comments/CommentReaction');
const ReplyComment = require('../../models/Comments/ReplyComment');
const User = require('../../models/User')
const Location = require('../../models/settings/Location')
const { validationResult } = require('express-validator')
const multer = require('multer');
const fs = require('fs');
const Story = require('../../models/posts/Story');
const axios = require('axios');
const cheerio = require('cheerio');

const Order = require('../../models/Orders/Order');
const StoreProduct = require('../../models/MarketPlace/StoreProduct');

const saveOrder = async (req, res) => {
    const data = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }
        let orderItems;
        if (data.order_items && data.order_items.length > 0) {
            orderItems = data.order_items.map(item => ({
                order_id: item.order_id,
                product_id: item.product_id,
                store_id: item.store_id,
                oi_quantity: item.product_qty,
                oi_costPrice: item.unitCostPrice,
                oi_sellingPrice: item.unitSellingPrice,
                oi_tax: item.unitTax,
                oi_discount: item.unitDiscount,
                oi_total: item.totalPrice,
                oi_type: item.order_type,
                oi_status: item.status,
            }));
        }
        const order = new Order({
            user_id: data.user_id,
            customer_name: data.customer_name,
            order_id: data.order_id,
            order_type: data.order_type,
            order_status: data.order_status,
            order_date: data.order_date,
            order_address: data.order_address,
            order_cpTotal: data.order_cpTotal,
            order_spTotal: data.order_spTotal,
            order_taxTotal: data.order_taxTotal,
            order_discountTotal: data.order_discountTotal,
            order_redeemedCoupon: data.order_redeemedCoupon,
            order_items: data.order_items,
            order_transactionId: data.order_transactionId,
            order_total: data.order_total,
            order_paymentStatus: data.order_paymentStatus,
            order_storeNames: data.order_storeNames,
            order_shippingAddress: data.order_shippingAddress,
            order_billingAddress: data.order_billingAddress,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: data.createdBy,
            updatedBy: data.updatedBy,
        });
        await order.save();

        res.status(200).json({ message: 'Order Uploaded successfully', status: 200, data: order });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await Order.find({ "user_id": req.body.user_id });
        // const stores = await StoreProduct.find({ "_id": { $in: storeIds } });
        // order.orderItems.map(item => {
        //     const store = StoreProduct.find(store => store._id === item.store_id);
        //     item.store_name += store.store_name;
        // });
        return res.json({
            status: 200,
            order: order,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.find({ "_id": req.body.order_id });
        return res.json({
            status: 200,
            order: order,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const updateOrder = async (req, res) => {
    try {
        const { user_id } = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { "user_id": user_id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: 404,
                message: 'Order not found for the provided user_id.',
            });
        }

        return res.json({
            status: 200,
            message: 'Order updated successfully.',
            order: updatedOrder,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            errors: err.message,
        });
    }
};


module.exports = { saveOrder, getOrder, getOrderById }