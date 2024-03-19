const Post = require('../../models/posts/Post');
const Notification = require('../../models/Notification/Notification');
const Comment = require('../../models/Comments/Comment');
const ReplyComment = require('../../models/Comments/ReplyComment');
const PostMedia = require('../../models/posts/PostMedia');
const User = require('../../models/User')
const Location = require('../../models/settings/Location')
const { validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');





// upload images or videos with comments
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/posts/comments');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },

});


const uploadCommentMedia = multer({ storage: storage });


const saveUserCommentByPost = async (req, res) => {
  try {
    //For THumbnaild
    const urlRegex = /(https?:\/\/[^\s]+)/;
    const match = req.body.comment_name.match(urlRegex);
    const link = match && match[0];
    let title = "";
    let description = "";
    let thumbnail = "";

    if (link) {
        const url = link;
        const response = await axios.get(url);
        
        const html = response.data;
        const $ = cheerio.load(html);

        title = $('head title').text().trim();

        description = $('meta[name="description"]').attr('content') || '';

    
         thumbnail = $('meta[property="og:image"]').attr('content');
        if (!thumbnail) {
            thumbnail = $('img').attr('src') || '';
        }
       
    } 


    const commentObj = {
      user_id: req.userId,
      post_id: req.body.post_id,
      comment_name: req.body.comment_name,
      image_or_video: req.file ? req.file.path : null,
      link: link,
      link_title: title,
      link_description: description,
      link_image: thumbnail,


    }
    const save_comment = new Comment(commentObj);

    await save_comment.save();


    // After adding the comment, send a notification to the post owner
    const post = await Post.findById(req.body.post_id);

    if (post && post.user_id.toString() !== req.userId) {
      // Create a notification
      const notification = new Notification({
        notification_type: "post_commented",
        notification_data: {
          notification_type: "post_commented",
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
      message: 'Comment added successful'
    })


  }
  catch (error) {
    console.log("error", error)
  }
}

const replyCommentByDirectPost = async (req, res) => {
  try {

    const urlRegex = /(https?:\/\/[^\s]+)/;
    const match = req.body.replies_comment_name.match(urlRegex);
    const link = match && match[0];
    let title = "";
    let description = "";
    let thumbnail = "";

    if (link) {
        const url = link;
        const response = await axios.get(url);
        
        const html = response.data;
        const $ = cheerio.load(html);

        title = $('head title').text().trim();

        description = $('meta[name="description"]').attr('content') || '';

    
         thumbnail = $('meta[property="og:image"]').attr('content');
        if (!thumbnail) {
            thumbnail = $('img').attr('src') || '';
        }
       
    } 


    const replyCommentObj = {
      comment_id: req.body.comment_id,
      replies_user_id: req.userId,
      replies_comment_name: req.body.replies_comment_name,
      post_id: req.body.post_id,
      image_or_video: req.file ? req.file.path : null,

      link: link,
      link_title: title,
      link_description: description,
      link_image: thumbnail

    }
    const save_reply_comment = new ReplyComment(replyCommentObj);

    await save_reply_comment.save();
    res.json({
      status: 200,
      message: 'Comment Replied successful'
    })


  }
  catch (error) {
    console.log("error", error)
  }
}




// const updateCommentsByDirectPost = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const commentId = req.params.commentId;

//     const comment_type = req.body.comment_type;
//     image_or_video:req.file ? req.file.path : null,


//     switch (comment_type) {
//       case 'main_comment':
//         const updated_main_comment = await Comment.findOneAndUpdate({ _id: commentId, post_id: postId }, { comment_name: req.body.comment_name,comment_edited:true,image_or_video:req.file},{ new: true });
//         return res.json({
//           status: 200,
//           data: updated_main_comment
//         });
//         break;

//       case 'reply_comment':
//         image_or_video:req.file ? req.file.path : null,

//         const updated_reply_comment = await ReplyComment.findOneAndUpdate({ _id: commentId, $or:[{post_id: postId,post_id:null}] }, { replies_comment_name: req.body.replies_comment_name ,comment_edited:true,image_or_video:req.file}, { new: true });
//         return res.json({
//           status: 200,
//           data: updated_reply_comment
//         });
//         break;



//       default:
//         ''
//     }

//   }
//   catch (error) {
//     console.log('error', error)
//   }
// }

const updateCommentsByDirectPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const comment_type = req.body.comment_type;
    const comment_name = req.body.comment_name;
    const replies_comment_name = req.body.replies_comment_name;
    const image_or_video = req.file ? req.file.path : null;

    console.log('goda1',req.body.comment_name)

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

        const checkOldImageOrVideoFile = await Comment.findOne({ _id: commentId, post_id: postId, comment_type: "main_comment" });
        // console.log('check',checkOldImageOrVideoFile)
        if (image_or_video === null) {
          const updated_main_comment = await Comment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "main_comment" }, updateMainCommentData, { new: true });
          return res.json({
            status: 200,
            data: updated_main_comment,
          });
        }
        else if (image_or_video !== checkOldImageOrVideoFile.image_or_video) {
          // if (checkOldImageOrVideoFile.image_or_video) {
          //   fs.unlinkSync(checkOldImageOrVideoFile.image_or_video);
          // }
          const updated_main_comment = await Comment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "main_comment" }, updateMainCommentDataWithNewImageOrVideo, { new: true })
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
        console.log("goda",updateMainCommentReplyData)
        const updateMainCommentReplyDataWithNewImageOrVideo = {
          replies_comment_name: replies_comment_name,
          comment_edited: true,
          image_or_video: image_or_video,
        };
        const checkOldImageOrVideoFileReply = await ReplyComment.findOne({ _id: commentId, post_id: postId, comment_type: "reply_comment" });
        // console.log('check',checkOldImageOrVideoFile)
        if (image_or_video === null) {
          const updated_reply_comment = await ReplyComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "reply_comment" }, updateMainCommentReplyData, { new: true });
          return res.json({
            status: 200,
            data: updated_reply_comment,
          });
        }
        else if (image_or_video !== checkOldImageOrVideoFileReply.image_or_video) {
          // if (checkOldImageOrVideoFile.image_or_video) {
          //   fs.unlinkSync(checkOldImageOrVideoFile.image_or_video);
          // }
          const updated_reply_comment = await ReplyComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "reply_comment" }, updateMainCommentReplyDataWithNewImageOrVideo, { new: true })
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


const getEditCommentByDirectPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const comment_type = req.params.commentType;

    switch (comment_type) {
      case 'main_comment':
        const edit_main_comment = await Comment.findOne({ _id: commentId, post_id: postId, comment_type: 'main_comment' });
        return res.json({
          status: 200,
          data: edit_main_comment
        });
        break;

      case 'reply_comment':
        const edit_reply_comment = await ReplyComment.findOne({ _id: commentId, comment_type: 'reply_comment', $or: [{ post_id: postId }, { post_id: null }] });
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


const removeImageOrVideoFileCommentByDirectPost = async (req, res) => {
  const user_id = req.userId;
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const commentType = req.params.commentType;
  try {

    switch (commentType) {
      case "main_comment":
        const fetch_main_comment = await Comment.findOne({ post_id: postId, _id: commentId, comment_type: commentType });
        if (fetch_main_comment.image_or_video !== null) {
          fs.unlinkSync(fetch_main_comment.image_or_video);
        }

        const update_main_comment = await Comment.findOneAndUpdate({ post_id: postId, _id: commentId, comment_type: commentType }, { image_or_video: null }, { new: true });
        return res.json({
          status: 200,
          update_main_comment: update_main_comment
        })

        break;
      case "reply_comment":
        const fetch_reply_comment = await ReplyComment.findOne({ post_id: postId, _id: commentId, comment_type: commentType });
        if (fetch_reply_comment.image_or_video !== null) {
          fs.unlinkSync(fetch_reply_comment.image_or_video);
        }

        const update_reply_comment = await ReplyComment.findOneAndUpdate({ post_id: postId, _id: commentId, comment_type: commentType }, { image_or_video: null }, { new: true });
        return res.json({
          status: 200,
          update_reply_comment: update_reply_comment
        })
        break;
      default:
        return res.json({ status: 500, message: "Something Error" })
    }
  } catch (error) {
    console.log(error);
  }
}

const getAllCommentsDirectPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find all comments with the specified post_id
    const comments = await Comment.find({ post_id: postId }).populate('user_id').exec();

    if (!comments) {
      return res.status(404).json({ error: 'Comments not found' });
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


const getCommentAndReplyCountForPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Use Mongoose to count the comments for the specified post_id
    const commentCount = await Comment.countDocuments({ post_id: postId });
    const comments = await Comment.find({ post_id: postId });

    // Count the total number of reply comments for all comments
    const replyCommentCount = await ReplyComment.countDocuments({
      comment_id: { $in: comments.map(comment => comment._id) }
    });

    res.json({
      status: 200,
      commentCount,
      replyCommentCount,
      totalCount: commentCount + replyCommentCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  saveUserCommentByPost, getAllCommentsDirectPost, replyCommentByDirectPost, getCommentAndReplyCountForPost, updateCommentsByDirectPost, getEditCommentByDirectPost, uploadCommentMedia, removeImageOrVideoFileCommentByDirectPost
}


