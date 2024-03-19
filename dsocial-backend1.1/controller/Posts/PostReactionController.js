const Post = require("../../models/posts/Post");
const PostMedia = require("../../models/posts/PostMedia");
const Comment = require("../../models/Comments/Comment");
const ReplyComment = require("../../models/Comments/ReplyComment");
const Notification = require("../../models/Notification/Notification");
const User = require("../../models/User");
const PostReaction = require("../../models/posts/PostReaction");


// Modify the sendNotification function
// const sendNotification = async (
//   notificationType,
//   notificationData,
//   senderId,
//   receiverId
// ) => {
//   try {
//     const sender = await User.findById(senderId); // Fetch the sender's user information

//     if (!sender) {
//       console.error("Sender not found");
//       return;
//     }

//     // Gather the list of users who have reacted to the post
//     const reactedUsers = await PostReaction.find({
//       post_id: notificationData.post_id,
//     }).populate("user_id");

//     if (reactedUsers && reactedUsers.length > 0) {
//       // Construct the notification message with the list of reacted users
//       const reactedUsernames = reactedUsers.map((user) => user.user_id.username);
//       const notificationMessage = `${reactedUsernames.join(", ")} reacted to your post.`;



//     }
//   } catch (error) {
//     console.error("Error sending notification:", error);
//   }
// };


const saveMainPostReaction = async (req, res) => {
  try {
    const { reaction_type, post_id, post_single_item_id } = req.body;
    const user_id = req.userId;

    // Check if the user has already reacted to the post
    const existingReaction = await PostReaction.findOne({
      user_id,
      post_id,
    });

    if (existingReaction) {
      // User has already reacted to this post, check if the reaction_type is the same
      if (existingReaction.reaction_type === reaction_type) {
        // The user is trying to react with the same reaction_type, remove the reaction
        await PostReaction.findByIdAndRemove(existingReaction._id);
        res.json({
          status: 200,
          message: "Post reaction removed successfully",
        });
      } else {
        // The user is changing their reaction_type
        existingReaction.reaction_type = reaction_type;
        existingReaction.post_single_item_id = post_single_item_id;
        await existingReaction.save();
        res.json({
          status: 200,
          message: "Post reaction updated successfully",
        });
      }
    } else {
      // User has not reacted to this post, create a new reaction
      const newReaction = new PostReaction({
        reaction_type,
        user_id,
        post_id,
        post_single_item_id,
      });
      await newReaction.save();

      // After adding the reaction, send a notification to the post owner
      const post = await Post.findById(post_id);

      if (post && post.user_id.toString() !== user_id) {
        // Create a notification
        const notification = new Notification({
          notification_type: "post_reaction",
          notification_data: {
            reaction_type,
            post_id,
            user_id,
            post_single_item_id,
          },
          notification_sender_id: user_id,
          notification_receiver_id: post.user_id,
        });

        await notification.save();
      }

      res.json({ status: 200, message: "Post reaction added successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




// const getAllMainPostReactions = async (req, res) => {
//   try {
//     // Get the user ID from the request
//     const userId = req.userId;

//     // Find all posts
//     const posts = await Post.find();

//     const userPostsReactions = [];

//     for (const post of posts) {
//       // Find all reactions associated with each post and the specific user
//       const reactions = await PostReaction.find({
//         post_id: post._id,
//         user_id: userId,
//       })
//         .select("post_id reaction_type _id")
//         .exec();

//       reactions.forEach((reaction) => {
//         userPostsReactions.push({
//           post_id: post._id,
//           reaction_type: reaction.reaction_type,
//           reaction_id: reaction._id,
//         });
//       });
//     }

//     res.json({
//       status: 200,
//       userPostsReactions: userPostsReactions,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getAllMainPostReactions = async (req, res) => {
  try {
    // Get the user ID from the request
    const userId = req.userId;

    // Find all reactions associated with the user
    const userPostsReactions = await PostReaction.find({
      user_id: userId,
    })
    .lean()  // Use lean for plain JavaScript objects
    .select("post_id reaction_type _id")
    .exec();

    res.json({
      status: 200,
      userPostsReactions: userPostsReactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const reactionUserListsOfDirectPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find post reactions by postId and populate the 'user_id' field to get user details
    const reactions = await PostReaction.find({ post_id: postId }).populate(
      "user_id"
    );

    //   // Extract user information from populated 'user_id' field
    //   const userReactions = reactions.map((reaction) => ({
    //     userId: reaction.user_id._id,
    //     username: reaction.user_id.username,
    //     // Add other user properties as needed
    //   }));

    res.json({ status: 200, reactions: reactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = {
  saveMainPostReaction,
  getAllMainPostReactions,
  reactionUserListsOfDirectPost,
};
