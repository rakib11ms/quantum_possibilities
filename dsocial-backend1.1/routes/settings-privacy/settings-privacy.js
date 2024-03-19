const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { auth } = require("../../middleware/AuthMiddleware");
const { updatePersonalDetails, updatePassword, updatePostPrivacy, getPostPrivacy, getBlocklist, addPhoneOrEmail,blockUser, unBlockUser } = require("../../controller/Settings/CustomizeMenuController");


// Personal details
router.patch("/personal-details", auth, updatePersonalDetails);
router.post("/add-phone-email", auth, addPhoneOrEmail);

// Password update
router.post("/password-change", auth, updatePassword);


// who can see or share or comment
router.post("/update-post-privacy", auth, updatePostPrivacy);
router.get("/get-post-privacy", auth, getPostPrivacy);

// Block list

router.get('/get-blocklist',auth, getBlocklist);
router.post('/block-user/:block_user_id',auth, blockUser);
router.post('/unblock-user/:unblock_user_id',auth, unBlockUser);

module.exports = router;