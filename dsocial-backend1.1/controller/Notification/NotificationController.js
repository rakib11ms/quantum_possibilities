const Post = require("../../models/posts/Post");
const PostMedia = require("../../models/posts/PostMedia");
const Comment = require("../../models/Comments/Comment");
const ReplyComment = require("../../models/Comments/ReplyComment");
const Notification = require("../../models/Notification/Notification");
const User = require("../../models/User");
const PostReaction = require("../../models/posts/PostReaction");



const getAllUsersSpecificNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query to find all notifications for the user where notification_seen is false
    const notifications = await Notification.find({
      notification_receiver_id: userId,
      // notification_seen: false,
    })
      .populate({ path: 'notification_receiver_id', select: 'first_name last_name profile_pic' }) // Populate the receiver's username
      .populate({ path: 'notification_sender_id', select: 'first_name last_name profile_pic' }) // Populate the sender's username
      .populate({
        path: 'notification_data.post_id', select: 'description post_type user_id'
      })
      .populate({
        path: 'notification_data.comment_id', select: 'comment_name comment_type user_id'
      })
      .populate({
        path: 'notification_data.comment_replies_id', select: '_id replies_comment_name comment_type replies_user_id'
      })
      .sort({ createdAt: -1 })
    res.json({ status: 200, notifications: notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const seenAllUsersSpecificNotifications = async (req, res) => {
  try {

    const notifications = await Notification.updateMany({ notification_receiver_id: req.params.userId }, { $set: { notification_seen: true } });
    if (notifications.acknowledged == true) {
      const all_notifications = await Notification.find({
        notification_receiver_id: req.params.userId,
        // notification_seen: false,
      })
        .populate({ path: 'notification_receiver_id', select: 'first_name last_name profile_pic' }) // Populate the receiver's username
        .populate({ path: 'notification_sender_id', select: 'first_name last_name profile_pic' }) // Populate the sender's username
        .populate({
          path: 'notification_data.post_id', select: 'description post_type user_id'
        })
        .populate({
          path: 'notification_data.comment_id', select: 'comment_name comment_type user_id'
        })
        .populate({
          path: 'notification_data.comment_replies_id', select: '_id replies_comment_name comment_type replies_user_id'
        })
        .sort({ createdAt: -1 })

      return res.json({
        status: 200,
        notifications: all_notifications
      })
    }


  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

const unSeenAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ notification_receiver_id: req.params.userId, notification_seen: false })
      .populate({ path: 'notification_receiver_id', select: 'first_name last_name profile_pic' }) // Populate the receiver's username
      .populate({ path: 'notification_sender_id', select: 'first_name last_name profile_pic' }) // Populate the sender's username
      .populate({
        path: 'notification_data.post_id',
        select: 'description post_type user_id'
      })
      .populate({
        path: 'notification_data.comment_id',
        select: 'comment_name comment_type user_id'
      })
      .populate({
        path: 'notification_data.comment_replies_id',
        select: '_id replies_comment_name comment_type replies_user_id'
      })
      .sort({ createdAt: -1 });

    return res.json({
      status: 200,
      notifications: notifications // Fix the variable name here (all_notifications -> notifications)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateNotificationSeenStatus = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId },
      { $set: { notification_seen: true } },
      { new: true }
    )
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    return res.json({
      status: 200,
      notification: notification
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllUsersSpecificNotifications, seenAllUsersSpecificNotifications, unSeenAllNotifications, updateNotificationSeenStatus
}
