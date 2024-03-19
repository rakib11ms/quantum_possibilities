const Post = require("../../models/posts/Post");
const Notification = require("../../models/Notification/Notification");
const Comment = require("../../models/Comments/Comment");
const ReplyComment = require("../../models/Comments/ReplyComment");
const CommentReaction = require("../../models/Comments/CommentReaction");
const PostMedia = require("../../models/posts/PostMedia");
const User = require("../../models/User");
const {validationResult} = require("express-validator");

const saveMainPostCommentReaction = async (req, res) => {
  try {
    const post_id = req.body.post_id;
    const comment_id = req.body.comment_id;
    const comment_replies_id = req.body.comment_replies_id == "" ? null : req.body.comment_replies_id;
    const reaction_type = req.body.reaction_type;
    const user_id = req.userId;

    // Check if the user has already reacted to the comment
    const existingReaction = await CommentReaction.findOne({
      user_id: user_id,
      post_id: post_id,
      $or: [{comment_id: comment_id, comment_replies_id: comment_replies_id}],
    });

    if (existingReaction) {
      // User has already reacted to this comment, check if the reaction_type is the same
      if (existingReaction.reaction_type === reaction_type) {
        // The user is trying to react with the same reaction_type, remove the reaction
        await CommentReaction.findByIdAndRemove(existingReaction._id);
        res.json({
          status: 200,
          message: "Comment reaction removed successfully",
        });
      } else {
        // The user is changing their reaction_type
        existingReaction.reaction_type = reaction_type;
        await existingReaction.save();
        res.json({
          status: 200,
          message: "Comment reaction updated successfully",
        });
      }
    } else {
      // User has not reacted to this comment, create a new reaction
      const newReaction = new CommentReaction({
        reaction_type: reaction_type,
        user_id: user_id,
        post_id: post_id,
        comment_id: comment_id,
        comment_replies_id: comment_replies_id,
      });
      await newReaction.save();

      // After adding the comment reaction, send a notification to the post owner
      const post = await Post.findById(req.body.post_id);

      if (post && post.user_id.toString() !== req.userId) {
        // Create a notification
        const notification = new Notification({
          notification_type: "comment_reaction",
          notification_data: {
            notification_type: "comment_reaction",
            post_id: req.body.post_id,
            user_id: req.userId,
            post_single_item_id: null,
            comment_id: comment_id,
            comment_replies_id: comment_replies_id,
          },
          notification_sender_id: req.userId,
          notification_receiver_id: post.user_id,
        });

        await notification.save();
      }

      res.json({status: 200, message: "Comment reaction added successfully"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Internal Server Error"});
  }
};

const reactionUserListsOfCommentsDirectPost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const commentId = req.body.commentId;
    const commentRepliesId = req.body.commentRepliesId;

    // Construct the query based on whether commentRepliesId is null or not
    let query;
    if (commentRepliesId === "null") {
      query = {post_id: postId, $or: [{comment_id: commentId, comment_replies_id: null}]};
    } else {
      query = {post_id: postId, $or: [{comment_id: commentId, comment_replies_id: commentRepliesId}]};
    }
    // Find comment reactions by query and populate the 'user_id' field to get user details
    const reactions = await CommentReaction.find(query).populate("user_id");

    res.json({status: 200, reactions: reactions});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Internal server error"});
  }
};

module.exports = {
  saveMainPostCommentReaction,
  reactionUserListsOfCommentsDirectPost,
};
