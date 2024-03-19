const Post = require('../../models/posts/Post');
const PostMedia = require('../../models/posts/PostMedia');
const Comment = require('../../models/Comments/Comment');
const ReplyComment = require('../../models/Comments/ReplyComment');
const User = require('../../models/User')
const Location = require('../../models/settings/Location')
const { validationResult } = require('express-validator')
const multer = require('multer');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
require('fluent-ffmpeg').setFfmpegPath(ffmpegPath);

const ffmpeg = require('fluent-ffmpeg')
const Reels = require('../../models/Reels/Reels');

const fs = require('fs');
const ReelComment = require('../../models/Reels/ReelComment');
const Notification = require('../../models/Notification/Notification');
const ReelReplyComment = require('../../models/Reels/ReelReplyComment');
const ReelCommentReaction = require('../../models/Reels/ReelCommentReaction');
const ReelPostReaction = require('../../models/Reels/ReelPostReaction');


// Multer configuration to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination directory for uploaded files
    cb(null, 'uploads/reels/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});




const uploadReelsVideo = multer({ storage: storage });
const publishReels = async (req, res) => {
  try {
    const inputPath = req.file.path;
    const reelsObj = {
      description: req.body.description,
      user_id: req.userId,
      video: req.file.filename + "" + path.extname(inputPath),
      reels_privacy: req.body.reels_privacy,
      // startTime:req.body.startTime,
      // endTime:req.body.endTime
    };

    // console.log('reels obj', reelsObj);
    const save_reels = new Reels(reelsObj);

    // Save the document to the database
    const savedReels = await save_reels.save();


    const outputPath = `${inputPath}${path.extname(inputPath)}`;
    console.log(outputPath, "outputPath");
    // Convert start time and end time to HH:MM:SS format
    const startTimeInSeconds = req.body.startTime;
    const endTimeInSeconds = req.body.endTime;

    const formatTime = (timeInSeconds) => {
      return new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    };
    const ffmpegCommand = ffmpeg(inputPath)
      .output(outputPath)
      .setStartTime(formatTime(startTimeInSeconds))
      .setDuration(formatTime(endTimeInSeconds))
      .on('start', (commandLine) => {
        //   console.log('Processing started with command: ' + commandLine);
      })
      .on('error', (err) => {
        console.error('Error:', err);
        res.status(500).json({ error: 'Video processing failed' });
      })
      .on('end', async () => {
        // Video trimmed successfully
        //   console.log('Video trimmed successfully');

        // const filename = outputPath.split('/').pop(); 
        //   console.log('file name check',filename)

        // await Reels.updateOne({ _id: savedReels._id }, { $set: { video: outputPath } });

        // Delete the old video file
        fs.unlink(inputPath, (err) => {
          if (err) {
            console.error('Error deleting the old video file:', err);
          } else {
            //   console.log('Old video file deleted');
          }
        });

        // Send the response
        res.json({ status: 200, message: 'Reels published successfully' });
      });

    await ffmpegCommand.run(); // Execute the ffmpeg command
  } catch (error) {
    console.log('error', error);
  }
};
const saveShareReelsCaptionPost = async (req, res) => {
  try {
    const { share_reels_id, description, reels_privacy } = req.body
    console.log("req.body___", req.body);
    const reels = await Reels.findById(share_reels_id);

    const reelsObj = new Post({
      description: description,
      post_privacy: reels_privacy,
      post_type: 'shared_reels',

      user_id: req.userId,
      share_reels_id: reels._id,

      created_by: req.userId,
      updated_by: req.userId
    });
    await reelsObj.save();


    if (reels && reels.user_id.toString() !== req.userId) {

      const notification = new Notification({
        notification_type: "shared_reels_post",
        notification_data: {
          notification_type: "shared_reels_post",
          post_id: share_reels_id,
          user_id: req.userId,
          post_single_item_id: null,
        },
        notification_sender_id: req.userId,
        notification_receiver_id: reels.user_id,
      });

      await notification.save();

    }
    res.status(200).json({
      message: 'Reels Shared successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: error.message
    });
  }
};

const deleteOwnUserReel = async (req, res) => {
  try {
    const reelId = req.params.reelId;
    const reel = await Reels.findOne({ _id: reelId, user_id: req.userId });
    if (!reel) {
      return res.status(404).json({ error: 'Reel not found' });
    }

    const videoPath = reel.video;
    if (videoPath) {
      fs.unlink(videoPath, (err) => {
        if (err) {
          console.error('Error deleting video file:', err);
        } else {
          console.log('Video file deleted successfully');
        }
      });
    }

    await Reels.findByIdAndDelete(reelId);

    res.json({ status: 200, message: 'Reel and associated video deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllUserReels = async (req, res) => {
  try {
    // const all_reels = await Reels.find({});
    const all_reels = await Reels.find({})
      .populate({
        path: 'user_id',
        select: 'first_name last_name username profile_pic'
      }).sort({ "createdAt": -1 });

    res.json({
      status: 200,
      all_reels: all_reels
    });
  } catch (err) {
    console.log('error', err);
  }
};

const getAllIndividualUserReels = async (req, res) => {
  const userId = req.userId;
  try {
    // const all_reels = await Reels.find({});
    const all_reels = await Reels.find({ user_id: userId })
      .populate({
        path: 'user_id',
        select: 'first_name last_name username profile_pic'
      }).sort({ "createdAt": -1 });
    const videoFileNames = all_reels.map((reel) => {
      // Split the path by backslashes and get the last part
      const videoPathParts = reel.video.split("\\");
      const fileName = videoPathParts[videoPathParts.length - 1];
      return {
        _id: reel._id,
        description: reel.description,
        user_id: reel.user_id,
        video: fileName,
        reels_privacy: reel.reels_privacy,
        status: reel.status,
        ip_address: reel.ip_address,
        created_by: reel.created_by,
        updated_by: reel.updated_by,
        createdAt: reel.createdAt,
        updatedAt: reel.updatedAt,
        __v: reel.__v
      };
    });

    res.json({
      status: 200,
      all_reels: videoFileNames
    });
  } catch (err) {
    console.log('error', err);
  }
};
const deleteAllUserReels = async (req, res) => {
  try {
    const allReels = await Reels.find({});
    await Reels.deleteMany({});

    const fs = require('fs');
    const directoryPath = 'uploads/reels/';

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error reading directory' });
      }

      files.forEach((file) => {
        fs.unlinkSync(directoryPath + file);
      });

      res.json({ status: 200, message: 'All user reels and associated files deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting user reels' });
  }
};

const getUserReelById = async (req, res) => {
  const { id } = req.params;

  try {

    const userReel = await Reels.findById(id)
      .populate({
        path: 'user_id',
        select: 'first_name last_name username profile_pic'
      })
    if (!userReel) {
      return res.status(404).json({ error: 'User reel not found' });
    }

    // Convert the video path to use forward slashes
    const videoPathParts = userReel.video.split("\\");
    const videoPath = videoPathParts[videoPathParts.length - 1];
    // Update the userReel object with the converted video path
    userReel.video = videoPath;

    // If the user reel is found, return it in the response
    return res.json({ status: 200, user_reel: userReel });
  } catch (error) {
    // Handle any errors that occur during the database query
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//save reel comment
const saveUserCommentByReel = async (req, res) => {
  try {
    const commentObj = {
      user_id: req.userId,
      post_id: req.body.post_id,
      comment_name: req.body.comment_name,
      image_or_video: req.file ? req.file.path : null,



    }
    const save_comment = new ReelComment(commentObj);

    await save_comment.save();


    // After adding the comment, send a notification to the reel owner
    const post = await Reels.findById(req.body.post_id);

    if (post && post.user_id.toString() !== req.userId) {
      // Create a notification
      const notification = new Notification({
        notification_type: "reel_commented",
        notification_data: {
          notification_type: "reel_commented",
          post_id: req.body.post_id,
          user_id: req.userId,
          post_single_item_id: null,
        },
        notification_sender_id: req.userId,
        notification_receiver_id: post.user_id,
      });

      await notification.save();


      // res.json({ status: 200, message: "Post reaction added successfully" });
    }

    res.json({
      status: 200,
      message: 'Reel Comment added successful'
    })


  }
  catch (error) {
    console.log("error", error)
  }
}

const replyCommentByDirectReel = async (req, res) => {
  try {
    const replyCommentObj = {
      comment_id: req.body.comment_id,
      replies_user_id: req.userId,
      replies_comment_name: req.body.replies_comment_name,
      post_id: req.body.post_id,
      image_or_video: req.file ? req.file.path : null,

    }
    const save_reply_comment = new ReelReplyComment(replyCommentObj);

    await save_reply_comment.save();
    res.json({
      status: 200,
      message: 'Reel Comment Replied successful'
    })


  }
  catch (error) {
    console.log("error", error)
  }
}

const getAllCommentsDirectReel = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find all comments with the specified reel post_id
    const comments = await ReelComment.find({ post_id: postId }).populate('user_id').exec();

    if (!comments) {
      return res.status(404).json({ error: 'Reel Comments not found' });
    }

    res.json({
      status: 200,
      comments: comments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const viewSingleReelWithComments = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Reels.findOne({ _id: postId })
      .populate('user_id')
      // .populate({
      //     path: 'share_post_id',
      //     model: 'Post', // Assuming 'Post' is the model for posts
      //     populate: {
      //         path: 'user_id',
      //         model: 'User', // Assuming 'User' is the model for user information
      //     },
      // })
      .sort({ createdAt: -1 })
      .exec();

    if (!post) {
      return res.status(404).json({ error: 'Reel Post not found' });
    }

    const userId = req.userId;

    // Fetch the reel ID associated with the user from ReelsReaction model
    const userReelsReaction = await ReelPostReaction.findOne({ user_id: userId, post_id: postId });





    // Fetch associated media for the reel post
    // const withPostMedia = await PostMedia.find({ post_id: postId });

    // const withSharePostMedia = await PostMedia.find({ post_id: { $in: post.share_post_id?._id } });

    // Fetch comments for the post
    const postComments = await ReelComment.find({ post_id: postId })
      .populate('user_id').sort({ createdAt: -1 })
      .exec();

    // Fetch reply comments for all comments in the post
    const replyComments = await ReelReplyComment.find({
      comment_id: { $in: postComments.map(comment => comment._id) }
    })
      .populate('replies_user_id') // Populate the replies_user_id field
      .exec();

    // Fetch comment reactions for main comments
    const mainCommentReactions = await ReelCommentReaction.find({
      comment_id: { $in: postComments.map(comment => comment._id) },
      comment_replies_id: null // Main comments have null comment_replies_id
    }).exec();

    // Fetch comment reactions for reply comments
    const replyCommentReactions = await ReelCommentReaction.find({
      comment_replies_id: { $in: replyComments.map(replyComment => replyComment._id) }
    }).exec();

    // Create maps to group reactions by their parent comment or reply comment _id
    const mainCommentReactionsMap = new Map();
    mainCommentReactions.forEach(commentReaction => {
      const commentId = commentReaction.comment_id.toString();
      if (!mainCommentReactionsMap.has(commentId)) {
        mainCommentReactionsMap.set(commentId, []);
      }
      mainCommentReactionsMap.get(commentId).push(commentReaction);
    });

    const replyCommentReactionsMap = new Map();
    replyCommentReactions.forEach(replyCommentReaction => {
      const replyCommentId = replyCommentReaction.comment_replies_id.toString();
      if (!replyCommentReactionsMap.has(replyCommentId)) {
        replyCommentReactionsMap.set(replyCommentId, []);
      }
      replyCommentReactionsMap.get(replyCommentId).push(replyCommentReaction);
    });

    // Fetch post reactions and calculate the reaction count for this post
    const postReactionCount = await ReelPostReaction.countDocuments({ post_id: postId });

    // Calculate total comments and replies for this post
    const totalComments = postComments.length;
    const totalReplies = replyComments.length;
    // const postShareCount = await Post.find({ share_post_id: post._id }).count();

    // Combine post, media, comments, and reply comments
    const postWithMediaAndComments = {
      ...post.toObject(),
      totalComments: totalComments + totalReplies,
      reactionCount: postReactionCount,
      // media: withPostMedia.filter(media => media.post_id.equals(post._id)),
      userReelId: userReelsReaction,
      comments: postComments.map(comment => ({
        ...comment.toObject(),
        comment_reactions: mainCommentReactionsMap.get(comment._id.toString()) || [],
        replies: replyComments
          .filter(replyComment => replyComment.comment_id.equals(comment._id))
          .map(replyComment => ({
            ...replyComment.toObject(),
            replies_comment_reactions: replyCommentReactionsMap.get(replyComment._id.toString()) || []
          }))
      })),
      // shareMedia: withSharePostMedia.filter(media => media.post_id.equals(post.share_post_id?._id)),
      // postShareCount: postShareCount,

    };

    res.json({
      status: 200,
      post: [postWithMediaAndComments]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' + err });
  }
};



const deleteSingleReplyCommentReel = async (req, res) => {
  try {
    const result = await ReelReplyComment.deleteOne({ _id: req.body.comment_id });

    res.json({
      status: 200,
      message: 'Comment deleted'
    });
  }


  catch (error) {
    res.json({
      status: 400,
      message: 'Faile to Comment deleted'
    });
  }
};


const deleteSingleCommentReel = async (req, res) => {
  try {
    const result = await ReelComment.deleteOne({ _id: req.body.comment_id });
    const result1 = await ReelComment.deleteMany({ comment_id: req.body.comment_id });

    res.json({
      status: 200,
      message: 'Comment deleted'
    });
  }


  catch (error) {
    res.json({
      status: 400,
      message: 'Faile to Comment deleted'
    });
  }
};


const getEditCommentByReelPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const comment_type = req.params.commentType;

    switch (comment_type) {
      case 'main_comment':
        const edit_main_comment = await ReelComment.findOne({ _id: commentId, post_id: postId, comment_type: 'main_comment' });
        return res.json({
          status: 200,
          data: edit_main_comment
        });
        break;

      case 'reply_comment':
        const edit_reply_comment = await ReelReplyComment.findOne({ _id: commentId, comment_type: 'reply_comment', $or: [{ post_id: postId }, { post_id: null }] });
        return res.json({
          status: 200,
          data: edit_reply_comment
        });
        break;


      default:
        res.json({
          status: 400,
          message: "No data found"
        })
    }
  }
  catch (err) {
    console.log(err)
  }
}

const updateCommentsByReelPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const comment_type = req.body.comment_type;
    const comment_name = req.body.comment_name;
    const replies_comment_name = req.body.replies_comment_name;
    const image_or_video = req.file ? req.file.path : null;

    console.log('goda1', req.body.comment_name)

    switch (comment_type) {
      case 'main_comment':
        // const updateMainCommentQuery = { _id: commentId };
        const updateMainCommentData = {
          comment_name: comment_name,
          comment_edited: true,
          // image_or_video: null,
        };
        const updateMainCommentDataWithNewImageOrVideo = {
          comment_name: comment_name,
          comment_edited: true,
          image_or_video: image_or_video,
        };

        const checkOldImageOrVideoFile = await ReelComment.findOne({ _id: commentId, post_id: postId, comment_type: "main_comment" });
        // console.log('check',checkOldImageOrVideoFile)
        if (image_or_video === null) {
          const updated_main_comment = await ReelComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "main_comment" }, updateMainCommentData, { new: true });
          return res.json({
            status: 200,
            data: updated_main_comment,
          });
        }
        else if (image_or_video !== checkOldImageOrVideoFile.image_or_video) {
          // if (checkOldImageOrVideoFile.image_or_video) {
          //   fs.unlinkSync(checkOldImageOrVideoFile.image_or_video);
          // }
          const updated_main_comment = await ReelComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "main_comment" }, updateMainCommentDataWithNewImageOrVideo, { new: true })
          return res.json({
            status: 200,
            data: updated_main_comment,
          });
        }



      case 'reply_comment':
        const updateMainCommentReplyData = {
          replies_comment_name: replies_comment_name,
          comment_edited: true,
          // image_or_video: null,
        };
        console.log("goda", updateMainCommentReplyData)
        const updateMainCommentReplyDataWithNewImageOrVideo = {
          replies_comment_name: replies_comment_name,
          comment_edited: true,
          image_or_video: image_or_video,
        };
        const checkOldImageOrVideoFileReply = await ReelReplyComment.findOne({ _id: commentId, post_id: postId, comment_type: "reply_comment" });
        // console.log('check',checkOldImageOrVideoFile)
        if (image_or_video === null) {
          const updated_reply_comment = await ReelReplyComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "reply_comment" }, updateMainCommentReplyData, { new: true });
          return res.json({
            status: 200,
            data: updated_reply_comment,
          });
        }
        else if (image_or_video !== checkOldImageOrVideoFileReply.image_or_video) {
          // if (checkOldImageOrVideoFile.image_or_video) {
          //   fs.unlinkSync(checkOldImageOrVideoFile.image_or_video);
          // }
          const updated_reply_comment = await ReelReplyComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "reply_comment" }, updateMainCommentReplyDataWithNewImageOrVideo, { new: true })
          return res.json({
            status: 200,
            data: updated_reply_comment,
          });
        }


      default:
        return res.json({
          status: 400,
          message: 'Invalid comment_type',
        });
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });

  }
};

const saveMainReelPostCommentReaction = async (req, res) => {
  try {
    const post_id = req.body.post_id;
    const comment_id = req.body.comment_id;
    const comment_replies_id = req.body.comment_replies_id == "" ? null : req.body.comment_replies_id;
    const reaction_type = req.body.reaction_type;
    const user_id = req.userId;



    // Check if the user has already reacted to the comment
    const existingReaction = await ReelCommentReaction.findOne({
      user_id: user_id, post_id: post_id, $or: [{ comment_id: comment_id, comment_replies_id: comment_replies_id }]
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
      const newReaction = new ReelCommentReaction({
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
          notification_type: "reel_comment_reaction",
          notification_data: {
            notification_type: "reel_comment_reaction",
            post_id: req.body.post_id,
            user_id: req.userId,
            post_single_item_id: null,
            comment_id: comment_id,
            comment_replies_id: comment_replies_id
          },
          notification_sender_id: req.userId,
          notification_receiver_id: post.user_id,
        });

        await notification.save();
      }


      res.json({ status: 200, message: "Comment reaction added successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const reactionUserListsOfCommentsReelPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const commentRepliesId = req.params.commentRepliesId;

    // Construct the query based on whether commentRepliesId is null or not
    let query;
    if (commentRepliesId === "null") {
      query = { post_id: postId, $or: [{ comment_id: commentId, comment_replies_id: null }] };
    } else {
      query = { post_id: postId, $or: [{ comment_id: commentId, comment_replies_id: commentRepliesId }] };
    }
    // Find comment reactions by query and populate the 'user_id' field to get user details
    const reactions = await ReelCommentReaction.find(query).populate("user_id");

    res.json({ status: 200, reactions: reactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const saveReelPostReaction = async (req, res) => {
  try {
    const { reaction_type, post_id, post_single_item_id } = req.body;
    const user_id = req.userId;

    // Check if the user has already reacted to the post
    const existingReaction = await ReelPostReaction.findOne({
      user_id,
      post_id,
    });

    if (existingReaction) {
      // User has already reacted to this post, check if the reaction_type is the same
      if (existingReaction.reaction_type === reaction_type) {
        // The user is trying to react with the same reaction_type, remove the reaction
        await ReelPostReaction.findByIdAndRemove(existingReaction._id);
        res.json({
          status: 200,
          message: "Reel Post reaction removed successfully",
        });
      } else {
        // The user is changing their reaction_type
        existingReaction.reaction_type = reaction_type;
        existingReaction.post_single_item_id = post_single_item_id;
        await existingReaction.save();
        res.json({
          status: 200,
          message: "Reel Post reaction updated successfully",
        });
      }
    } else {
      // User has not reacted to this post, create a new reaction
      const newReaction = new ReelPostReaction({
        reaction_type,
        user_id,
        post_id,
        post_single_item_id,
      });
      await newReaction.save();

      // After adding the reaction, send a notification to the reel post owner
      const post = await Reels.findById(post_id);

      if (post && post.user_id.toString() !== user_id) {
        // Create a notification
        const notification = new Notification({
          notification_type: "reel_post_reaction",
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

      res.json({ status: 200, message: "Reel Post reaction added successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  publishReels, uploadReelsVideo, getAllUserReels,
  deleteAllUserReels, getUserReelById, deleteOwnUserReel,
  saveUserCommentByReel, getAllCommentsDirectReel,
  replyCommentByDirectReel, viewSingleReelWithComments,
  deleteSingleReplyCommentReel, deleteSingleCommentReel,
  getEditCommentByReelPost, updateCommentsByReelPost,
  saveMainReelPostCommentReaction, reactionUserListsOfCommentsReelPost,
  saveReelPostReaction, getAllIndividualUserReels,
  saveShareReelsCaptionPost
}