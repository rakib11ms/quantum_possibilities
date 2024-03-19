const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { auth } = require("../../middleware/AuthMiddleware");
const User = require("../../models/User");
const {
    saveOrder,
    getOrder, getOrderById
} = require("../../controller/Order/OrderController");

router.post("/saveOrder", saveOrder);
router.post("/orderList", getOrder);
router.post("/orderById", getOrderById);

module.exports = router;