const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { auth } = require("../../middleware/AuthMiddleware");
const User = require("../../models/User");
const { saveEvent, uploadGroupPhoto, getEventList, deleteEvent,editEvent, editGroup,deleteGroup } = require("../../controller/groups/GroupController");
const { editGroupMember } = require("../../controller/groups/GroupPostController");

// Group events
router.post("/save-event", auth, uploadGroupPhoto.single('photo'), saveEvent);
router.patch("/edit-event/:event_id", auth, uploadGroupPhoto.single('photo'), editEvent);
router.get("/get-my-event-list/:group_id", auth, getEventList);
router.patch("/delete-event/:event_id", auth, deleteEvent);

// Group
router.patch("/edit-group/:group_id", auth, editGroup);
router.patch("/delete-group/:group_id", auth, deleteGroup);

//Group member
router.patch("/edit-group-member/:group_member_id", auth, editGroupMember);


module.exports = router;