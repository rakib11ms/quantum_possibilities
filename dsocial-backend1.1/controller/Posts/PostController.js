const Post = require("../../models/posts/Post");
const Friends = require("../../models/Friends");
const PostMedia = require("../../models/posts/PostMedia");
const PostReaction = require("../../models/posts/PostReaction");
const Comment = require("../../models/Comments/Comment");
const CommentReaction = require("../../models/Comments/CommentReaction");
const ReplyComment = require("../../models/Comments/ReplyComment");
const User = require("../../models/User");
const Location = require("../../models/settings/Location");
const { validationResult } = require("express-validator");
const multer = require("multer");
const fs = require("fs");
const Story = require("../../models/posts/Story");
const axios = require("axios");
const cheerio = require("cheerio");
const PostTags = require("../../models/posts/PostTags");
const { saveOrUpdateWorkPlaceService } = require("../../services/PostServices");
const mongoose = require('mongoose');

// change pro pic codes functionality
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },

  // filename: function (req, file, cb) {
  //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  //   },
});

const uploadPostMedia = multer({ storage: storage });

// const savePost = async (req, res) => {
//     const files = req.files;
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.json({ status: 404, errors: errors.array() });
//         }

//         const post = new Post({
//             description: req.body.description,
//             feeling_id: req.body.feeling_id,
//             activity_id: req.body.activity_id,
//             sub_activity_id: req.body.sub_activity_id,
//             user_id: req.userId,
//             post_type:req.body.post_type,
//             location_id: req.body.location_id,
//             // media: files.map((file) => file.filename),
//             // media:mediaArray

//         })
//         await post.save();

//         // const mediaArray = files.map((file) => ({
//         //     caption: '',
//         //     image: file.filename,
//         //   }));

//         const mediaArray = files.map((file,i)=>{
//             post_id:post._id;
//             media:file.filename;
//             caption:''
//         });

//           await PostMedia.save();

//         res.json({ message: 'Post Uploaded successful',status:200 });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             errors: error
//         });
//     }
// }

const savePost = async (req, res) => {
  const files = req.files;
  console.log(req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }

    const urlRegex = /(https?:\/\/[^\s]+)/;
    const match = req.body.description.match(urlRegex);
    const link = match && match[0];
    let title = "";
    let description = "";
    let thumbnail = "";

    if (link) {
      const url = link;
      const response = await axios.get(url);

      const html = response.data;
      const $ = cheerio.load(html);

      title = $("head title").text().trim();

      description = $('meta[name="description"]').attr("content") || "";

      thumbnail = $('meta[property="og:image"]').attr("content");
      if (!thumbnail) {
        thumbnail = $("img").attr("src") || "";
      }
    }

    const result = await User.findOne({ _id: req.userId });
    let workData = null;
    let instituteWorkPlace = null;

    if (req.body.post_type == "event") {
      if (req.body.event_type == "work") {
        workData = await saveOrUpdateWorkPlaceService(
          req.body.org_name,
          req.userId,
          req.body.start_date,
          req.body.end_date,
          result.username
        );
        console.log("workdata", workData);
      }

      if (req.body.event_type == "education") {
        instituteWorkPlace = await saveOrUpdateWorkPlaceService(
          req.body.org_name,
          req.userId,
          req.body.start_date,
          req.body.end_date,
          result.username
        );
        console.log("instituteWorkPlace", workData);
      }
    }

    const data = {
      description: req.body.description,
      feeling_id: req.body.feeling_id ? req.body.feeling_id : null,
      activity_id: req.body.activity_id ? req.body.activity_id : null,
      sub_activity_id: req.body.sub_activity_id
        ? req.body.sub_activity_id
        : null,
      user_id: req.userId,
      post_type: req.body?.post_type,
      event_type: req.body?.event_type,
      event_sub_type: req.body?.event_sub_type,
      workplace_id: workData?._id,
      institute_id: instituteWorkPlace?._id,
      location_id: req.body.location_id ? req.body.location_id : null,
      post_privacy: req.body?.post_privacy,
      link: link,
      link_title: title,
      link_description: description,
      link_image: thumbnail,
      post_background_color: req.body?.post_background_color,
    };
    if (req.body.post_type == "birthday") {
      data["to_user_id"] = req.body.to_user_id;
    }
    const post = new Post(data);

    await post.save();
    if (files != null && files.length > 0) {
      const mediaArray = files.map((file, i) => ({
        post_id: post._id,
        media: file.filename,
        caption: "",
      }));

      for (const mediaItem of mediaArray) {
        const postMedia = new PostMedia(mediaItem);
        await postMedia.save();
      }
    }

    if (
      req.body.tags != undefined &&
      req.body.tags != "null" &&
      req.body.tags.length > 0
    ) {
      for (let i = 0; i < req.body.tags.length; i++) {
        console.log("Taggs", req.body.tags.length);
        const tagsArray = {
          post_id: post._id,
          user_id: req.body.tags[i].toString(),
          status: "1",
        };
        const postTags = new PostTags(tagsArray);
        await postTags.save();
      }
    }

    res
      .status(200)
      .json({ message: "Post Uploaded successfully", status: 200, data: post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: error.message,
    });
  }
};

const getAllUserPostsIndividual = async (req, res) => {
  try {
    const username = req.body.username;

    const userInfo = await User.findOne({ username: username });
    let posts = [];

    if (req.body.username == req.body.authusername) {
      posts = await Post.find({
        user_id: userInfo._id,
        status: { $ne: "2" },
        page_id: null,
      })
        .populate(
          "user_id location_id feeling_id activity_id sub_activity_id page_id"
        )
        .populate({
          path: "share_post_id",
          model: "Post", // Assuming 'Post' is the model for posts
          populate: {
            path: "user_id",
            model: "User", // Assuming 'User' is the model for user information
          },
        })
        .sort({ createdAt: -1 })
        .exec();
    } else {
      posts = await Post.find({
        $or: [
          {
            user_id: userInfo._id,
            status: { $ne: "2" },
            post_privacy: { $in: ["public", "friends"] },
            page_id: null,
          },
          {
            to_user_id: userInfo._id,
          },
        ],
      })
        .populate(
          "user_id location_id feeling_id activity_id sub_activity_id page_id to_user_id"
        )
        .populate({
          path: "share_post_id",
          model: "Post", // Assuming 'Post' is the model for posts
          populate: {
            path: "user_id",
            model: "User", // Assuming 'User' is the model for user information
          },
        })
        .sort({ createdAt: -1 })
        .exec();
    }

    const postIds = posts.map((post) => post._id);
    const postShareIds = posts.map((post) => post.share_post_id?._id);
    const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });
    const withSharePostMedia = await PostMedia.find({
      post_id: { $in: postShareIds },
    });

    // Fetch all comments for the posts
    const allComments = await Comment.find({ post_id: { $in: postIds } })
      .populate("user_id")
      .sort({ createdAt: -1 })
      .exec();

    // Fetch replies for the comments
    const allReplyComments = await ReplyComment.find({
      comment_id: { $in: allComments.map((comment) => comment._id) },
    })
      .populate("replies_user_id")
      .exec();

    // Fetch comment reactions for main comments
    const mainCommentReactions = await CommentReaction.find({
      comment_id: { $in: allComments.map((comment) => comment._id) },
      comment_replies_id: null, // Main comments have null comment_replies_id
    }).lean();

    // Fetch comment reactions for reply comments
    const replyCommentReactions = await CommentReaction.find({
      comment_replies_id: {
        $in: allReplyComments.map((replyComment) => replyComment._id),
      },
    }).exec();

    // Organize comments and replies into a nested format with reactions
    const commentsWithReplies = allComments.map((comment) => {
      const replies = allReplyComments.filter((reply) =>
        reply.comment_id.equals(comment._id)
      );

      // Fetch reactions for the main comment
      const mainCommentReactionsFiltered = mainCommentReactions.filter(
        (reaction) => reaction.comment_id.equals(comment._id)
      );

      // Include reactions in the main comment object
      const commentWithReactions = {
        ...comment.toObject(),
        comment_reactions: mainCommentReactionsFiltered,
        replies: replies.map((replyComment) => {
          // Fetch reactions for the reply comment
          const replyCommentReactionsFiltered = replyCommentReactions.filter(
            (reaction) => reaction.comment_replies_id.equals(replyComment._id)
          );

          // Include reactions in the reply comment object
          return {
            ...replyComment.toObject(),
            replies_comment_reactions: replyCommentReactionsFiltered,
          };
        }),
      };

      return commentWithReactions;
    });

    // Calculate total comments and replies for each post and add a totalComments field
    const postsWithCommentsAndMedia = [];

    const postIdArray = posts.map((post) => post._id);

    const reactionTypeCounts = await PostReaction.aggregate([
      {
        $match: { post_id: { $in: postIdArray } },
      },
      {
        $group: {
          _id: {
            post_id: "$post_id",
            reaction_type: "$reaction_type",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          post_id: "$_id.post_id",
          reaction_type: "$_id.reaction_type",
          count: 1,
        },
      },
    ]).exec();

    for (const post of posts) {
      const postCommentsWithReplies = commentsWithReplies.filter((comment) =>
        comment.post_id.equals(post._id)
      );
      const totalComments = postCommentsWithReplies.length;
      const totalReplies = postCommentsWithReplies.reduce(
        (total, comment) => total + comment.replies.length,
        0
      );
      const combinedTotal = totalComments + totalReplies;

      // Fetch post reactions and calculate the reaction count for this post
      const postReactionCount = await PostReaction.countDocuments({
        post_id: post._id,
      });
      const postShareCount = await Post.find({
        share_post_id: post._id,
      }).count();
      const reactionTypeCountsByPost = reactionTypeCounts.filter((reaction) =>
        reaction.post_id.equals(post._id)
      );

      postsWithCommentsAndMedia.push({
        ...post.toObject(),
        media: withPostMedia.filter((media) => media.post_id.equals(post._id)),
        shareMedia: withSharePostMedia.filter((media) =>
          media.post_id.equals(post.share_post_id?._id)
        ),
        comments: postCommentsWithReplies,
        totalComments: combinedTotal,
        reactionCount: postReactionCount,
        postShareCount: postShareCount,
        reactionTypeCountsByPost: reactionTypeCountsByPost,
      });
    }

    res.json({
      status: 200,
      posts: postsWithCommentsAndMedia,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// const getAllUserPosts=async (req,res)=>{
//     try{

//         const posts = await Post.find({})
//         .populate({
//             path: 'user_id location_id activity_id sub_activity_id',
//             populate: { path: 'media', model: 'PostMedia' } // Populate the media field of each post with PostMedia documents
//         })
//         .sort({ createdAt: -1 })
//         .exec();
//            res.json({
//                 status:200,
//                 posts:posts
//             })

//     }
//     catch(error){
//         console.log('error',error)

//     }
// }

// const getAllUserPosts=async (req,res)=>{
//     try{

//         const posts=await Post.find({}).populate('user_id location_id feeling_id activity_id sub_activity_id').sort({ createdAt: -1 }).exec();

//         const with_post_media=postMedia.find({post_id,posts._id});
//         postswith(with_post_media)
//            res.json({
//                 status:200,
//                 posts:posts
//             })

//     }
//     catch(error){
//         console.log('error',error)

//     }
// }

// const getAllUserPosts = async (req, res) => {
//     try {
//         // Find all posts and populate user-related fields
//         const posts = await Post.find({})
//             .populate('user_id location_id feeling_id activity_id sub_activity_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         // Fetch associated media for each post
//         const postIds = posts.map(post => post._id); // Extract post IDs
//         const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });

//         // Combine posts and their associated media
//         const postsWithMedia = posts.map(post => ({
//             ...post.toObject(), // Convert to plain JavaScript object
//             media: withPostMedia.filter(media => media.post_id.equals(post._id))
//         }));

//         res.json({
//             status: 200,
//             posts: postsWithMedia
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };

// const getAllUserPosts = async (req, res) => {
//     try {
//         // Find all posts and populate user-related fields
//         const posts = await Post.find({ status: { $ne: "2" } })
//             .populate('user_id location_id feeling_id activity_id sub_activity_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         // Fetch associated media for each post
//         const postIds = posts.map(post => post._id); // Extract post IDs
//         const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });

//         // Fetch associated comments for each post
//         const withComments = await Comment.find({ post_id: { $in: postIds } }).populate('user_id').exec();

//         // Combine posts, media, and comments
//         const postsWithMediaAndComments = posts.map(post => ({
//             ...post.toObject(), // Convert to plain JavaScript object
//             media: withPostMedia.filter(media => media.post_id.equals(post._id)),
//             comments: withComments.filter(comment => comment.post_id.equals(post._id))
//         }));

//         res.json({
//             status: 200,
//             posts: postsWithMediaAndComments
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };

// const getAllUserPosts = async (req, res) => {
//     try {
//         // Find all posts and populate user-related fields
//         const posts = await Post.find({ status: { $ne: "2" } }).populate('user_id location_id feeling_id activity_id sub_activity_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         // Fetch associated media for each post
//         const postIds = posts.map(post => post._id); // Extract post IDs
//         const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });

//         // Fetch associated comments for each post
//         const withComments = await Comment.find({ post_id: { $in: postIds } }).populate('user_id').exec();

//         // console.log('comments check',withComments)

//         return res.json({
//             withComments
//         })

//         // // Use Mongoose to count the comments and reply comments for each post
//         // const commentCounts = await Comment.aggregate([
//         //     { $match: { post_id: { $in: postIds } } },
//         //     {
//         //         $group: {
//         //             _id: '$post_id',
//         //             commentCount: { $sum: 1 },
//         //         },
//         //     },
//         // ]);

//         // const comments = await Comment.find({ post_id: { $in: postIds } });
//         // const replyCommentCounts = await ReplyComment.aggregate([
//         //     { $match: { comment_id: { $in: comments.map(comment => comment._id) } } },
//         //     {
//         //         $group: {
//         //             _id: '$comment_id',
//         //             replyCommentCount: { $sum: 1 },
//         //         },
//         //     },
//         // ]);

//         // const commentCountsMap = new Map(commentCounts.map(count => [count._id.toString(), count.commentCount]));
//         // const replyCommentCountsMap = new Map(replyCommentCounts.map(count => [count._id.toString(), count.replyCommentCount]));

//         // // Combine posts, media, comments, and counts
//         // const postsWithMediaAndComments = posts.map(post => ({
//         //     ...post.toObject(),
//         //     media: withPostMedia.filter(media => media.post_id.equals(post._id)),
//         //     comments: withComments.filter(comment => comment.post_id.equals(post._id)),
//         //     commentCount: commentCountsMap.get(post._id.toString()) || 0,
//         //     replyCommentCount: replyCommentCountsMap.get(post._id.toString()) || 0,
//         // }));

//         // // Calculate the total comment count and reply comment count
//         // const totalCommentCount = commentCounts.reduce((sum, count) => sum + count.commentCount, 0);
//         // const totalReplyCommentCount = replyCommentCounts.reduce((sum, count) => sum + count.replyCommentCount, 0);

//         // // Calculate the total count of comments and reply comments
//         // const totalCount = totalCommentCount + totalReplyCommentCount;

//         // res.json({
//         //     status: 200,
//         //     posts: postsWithMediaAndComments,
//         //     totalCommentCount,
//         //     totalReplyCommentCount,
//         //     totalCount,
//         // });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };

// old correct all users

// const getAllUserPosts = async (req, res) => {
//     try {
//         const posts = await Post.find({ status: { $ne: "2" } })
//             .populate('user_id location_id feeling_id activity_id sub_activity_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         const postIds = posts.map(post => post._id);
//         const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });

//         // Fetch all comments for the posts
//         const allComments = await Comment.find({ post_id: { $in: postIds } })
//             .populate('user_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         // Fetch all replies for the comments
//         const allReplyComments = await ReplyComment.find({ comment_id: { $in: allComments.map(comment => comment._id) }})
//             .populate('replies_user_id')
//             .exec();

//         // Organize comments and replies into a nested format
//         const commentsWithReplies = allComments.map(comment => {
//             const replies = allReplyComments.filter(reply => reply.comment_id.equals(comment._id));
//             return {
//                 ...comment.toObject(),
//                 replies: replies,
//             };
//         });

//         // Calculate total comments and replies for each post and add a totalComments field
//         const postsWithCommentsAndMedia = posts.map(post => {
//             const postCommentsWithReplies = commentsWithReplies.filter(comment => comment.post_id.equals(post._id));
//             const totalComments = postCommentsWithReplies.length;
//             const totalReplies = postCommentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
//             const combinedTotal = totalComments + totalReplies;

//             return {
//                 ...post.toObject(),
//                 media: withPostMedia.filter(media => media.post_id.equals(post._id)),
//                 comments: postCommentsWithReplies,
//                 totalComments: combinedTotal,
//             };
//         });

//         res.json({
//             status: 200,
//             posts: postsWithCommentsAndMedia,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };

// old todays 27-11-2023
// const getAllUserPosts = async (req, res) => {
//     try {
//         const posts = await Post.find({ status: { $ne: "2" } })
//             .populate('user_id location_id feeling_id activity_id sub_activity_id page_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         const postIds = posts.map(post => post._id);
//         const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });

//         // Fetch all comments for the posts
//         const allComments = await Comment.find({ post_id: { $in: postIds } })
//             .populate('user_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         // Fetch replies for the comments
//         const allReplyComments = await ReplyComment.find({ comment_id: { $in: allComments.map(comment => comment._id) } })
//             .populate('replies_user_id')
//             .exec();

//         // Organize comments and replies into a nested format
//         const commentsWithReplies = allComments.map(comment => {
//             const replies = allReplyComments.filter(reply => reply.comment_id.equals(comment._id));
//             return {
//                 ...comment.toObject(),
//                 replies: replies,
//             };
//         });

//         // Calculate total comments and replies for each post and add a totalComments field
//         const postsWithCommentsAndMedia = [];

//         for (const post of posts) {
//             const postCommentsWithReplies = commentsWithReplies.filter(comment => comment.post_id.equals(post._id));
//             const totalComments = postCommentsWithReplies.length;
//             const totalReplies = postCommentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
//             const combinedTotal = totalComments + totalReplies;

//             // Fetch post reactions and calculate the reaction count for this post
//             const postReactionCount = await PostReaction.countDocuments({ post_id: post._id });

//             postsWithCommentsAndMedia.push({
//                 ...post.toObject(),
//                 media: withPostMedia.filter(media => media.post_id.equals(post._id)),
//                 comments: postCommentsWithReplies,
//                 totalComments: combinedTotal,
//                 reactionCount: postReactionCount,
//             });
//         }

//         res.json({
//             status: 200,
//             posts: postsWithCommentsAndMedia,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };

// const getAllUserPosts = async (req, res) => {
//     try {
//         const posts = await Post.find({ status: { $ne: "2" } })
//             .populate('user_id location_id feeling_id activity_id sub_activity_id page_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         const postIds = posts.map(post => post._id);
//         const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });

//         // Fetch all comments for the posts
//         const allComments = await Comment.find({ post_id: { $in: postIds } })
//             .populate('user_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         // Fetch replies for the comments
//         const allReplyComments = await ReplyComment.find({ comment_id: { $in: allComments.map(comment => comment._id) } })
//             .populate('replies_user_id')
//             .exec();

//         // Fetch comment reactions for all comments
//         const allCommentReactions = await CommentReaction.find({ comment_id: { $in: allComments.map(comment => comment._id) } })
//             .exec();

//         // Fetch reply comment reactions for all reply comments
//         const allReplyCommentReactions = await CommentReaction.find({
//             comment_replies_id: { $in: allReplyComments.map(replyComment => replyComment._id) }
//         }).exec();

//         // Organize comments and replies into a nested format
//         const commentsWithReplies = allComments.map(comment => {
//             const replies = allReplyComments.filter(reply => reply.comment_id.equals(comment._id));

//             // Fetch reactions for the comment
//             const commentReactions = allCommentReactions.filter(reaction => reaction.comment_id.equals(comment._id));

//             // Include reactions in the comment object
//             const commentWithReactions = {
//                 ...comment.toObject(),
//                 comment_reactions: commentReactions,
//                 replies: replies.map(replyComment => {
//                     // Fetch reactions for the reply comment
//                     const replyCommentReactions = allReplyCommentReactions.filter(reaction => reaction.comment_replies_id.equals(replyComment._id));

//                     // Include reactions in the reply comment object
//                     return {
//                         ...replyComment.toObject(),
//                         replies_comment_reactions: replyCommentReactions,
//                     };
//                 }),
//             };

//             return commentWithReactions;
//         });

//         // Calculate total comments and replies for each post and add a totalComments field
//         const postsWithCommentsAndMedia = [];

//         for (const post of posts) {
//             const postCommentsWithReplies = commentsWithReplies.filter(comment => comment.post_id.equals(post._id));
//             const totalComments = postCommentsWithReplies.length;
//             const totalReplies = postCommentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
//             const combinedTotal = totalComments + totalReplies;

//             // Fetch post reactions and calculate the reaction count for this post
//             const postReactionCount = await PostReaction.countDocuments({ post_id: post._id });

//             postsWithCommentsAndMedia.push({
//                 ...post.toObject(),
//                 media: withPostMedia.filter(media => media.post_id.equals(post._id)),
//                 comments: postCommentsWithReplies,
//                 totalComments: combinedTotal,
//                 reactionCount: postReactionCount,
//             });
//         }

//         res.json({
//             status: 200,
//             posts: postsWithCommentsAndMedia,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };

//today old 10-12-23
// const getAllUserPosts = async (req, res) => {
//     try {
//         const posts = await Post.find({ status: { $ne: "2" } })
//             .populate('user_id location_id feeling_id activity_id sub_activity_id page_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         const postIds = posts.map(post => post._id);
//         const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });

//         // Fetch all comments for the posts
//         const allComments = await Comment.find({ post_id: { $in: postIds } })
//             .populate('user_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         // Fetch replies for the comments
//         const allReplyComments = await ReplyComment.find({ comment_id: { $in: allComments.map(comment => comment._id) } })
//             .populate('replies_user_id')
//             .exec();

//         // Fetch comment reactions for main comments
//         const mainCommentReactions = await CommentReaction.find({
//             comment_id: { $in: allComments.map(comment => comment._id) },
//             comment_replies_id: null // Main comments have null comment_replies_id
//         }).exec();

//         // Fetch comment reactions for reply comments
//         const replyCommentReactions = await CommentReaction.find({
//             comment_replies_id: { $in: allReplyComments.map(replyComment => replyComment._id) }
//         }).exec();

//         // Organize comments and replies into a nested format with reactions
//         const commentsWithReplies = allComments.map(comment => {
//             const replies = allReplyComments.filter(reply => reply.comment_id.equals(comment._id));

//             // Fetch reactions for the main comment
//             const mainCommentReactionsFiltered = mainCommentReactions.filter(reaction => reaction.comment_id.equals(comment._id));

//             // Include reactions in the main comment object
//             const commentWithReactions = {
//                 ...comment.toObject(),
//                 comment_reactions: mainCommentReactionsFiltered,
//                 replies: replies.map(replyComment => {
//                     // Fetch reactions for the reply comment
//                     const replyCommentReactionsFiltered = replyCommentReactions.filter(reaction => reaction.comment_replies_id.equals(replyComment._id));

//                     // Include reactions in the reply comment object
//                     return {
//                         ...replyComment.toObject(),
//                         replies_comment_reactions: replyCommentReactionsFiltered,
//                     };
//                 }),
//             };

//             return commentWithReactions;
//         });

//         // Calculate total comments and replies for each post and add a totalComments field
//         const postsWithCommentsAndMedia = [];

//         for (const post of posts) {
//             const postCommentsWithReplies = commentsWithReplies.filter(comment => comment.post_id.equals(post._id));
//             const totalComments = postCommentsWithReplies.length;
//             const totalReplies = postCommentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
//             const combinedTotal = totalComments + totalReplies;

//             // Fetch post reactions and calculate the reaction count for this post
//             const postReactionCount = await PostReaction.countDocuments({ post_id: post._id });

//             postsWithCommentsAndMedia.push({
//                 ...post.toObject(),
//                 media: withPostMedia.filter(media => media.post_id.equals(post._id)),
//                 comments: postCommentsWithReplies,
//                 totalComments: combinedTotal,
//                 reactionCount: postReactionCount,
//             });
//         }

//         res.json({
//             status: 200,
//             posts: postsWithCommentsAndMedia,
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };

const getAllUserPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const friendConnections = await Friends.find({
      $or: [{ user_id: userId }, { connected_user_id: userId }],
      accept_reject_status: "1",
    });

    const friendUserIds = friendConnections.map((friend) => {
      return friend.user_id.equals(userId)
        ? friend.connected_user_id
        : friend.user_id;
    });

    // --14/12/2023 share_post_id only ading this for get share post
    const publicPosts = await Post.find({
      status: { $ne: "2" },
      post_privacy: "public",
    })
      .populate(
        "user_id location_id feeling_id activity_id sub_activity_id page_id"
      )
      .populate({
        path: "share_post_id",
        model: "Post", // Assuming 'Post' is the model for posts
        populate: {
          path: "user_id",
          model: "User", // Assuming 'User' is the model for user information
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    const friendsPosts = await Post.find({
      $and: [
        { status: { $ne: "2" } },
        { post_privacy: "friends" },
        { $or: [{ user_id: userId }, { user_id: { $in: friendUserIds } }] },
      ],
    })
      .populate(
        "user_id location_id feeling_id activity_id sub_activity_id page_id"
      )
      .sort({ createdAt: -1 })
      .exec();

    const posts = publicPosts.concat(friendsPosts);

    posts.sort((a, b) => b.createdAt - a.createdAt);

    const postIds = posts.map((post) => post._id);
    const postShareIds = posts.map((post) => post.share_post_id?._id);
    const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });
    const withSharePostMedia = await PostMedia.find({
      post_id: { $in: postShareIds },
    });

    // Fetch all comments for the posts
    const allComments = await Comment.find({ post_id: { $in: postIds } })
      .populate("user_id")
      .sort({ createdAt: -1 })
      .exec();

    // Fetch replies for the comments
    const allReplyComments = await ReplyComment.find({
      comment_id: { $in: allComments.map((comment) => comment._id) },
    })
      .populate("replies_user_id")
      .exec();

    // Fetch comment reactions for main comments
    const mainCommentReactions = await CommentReaction.find({
      comment_id: { $in: allComments.map((comment) => comment._id) },
      comment_replies_id: null, // Main comments have null comment_replies_id
    }).exec();

    // Fetch comment reactions for reply comments
    const replyCommentReactions = await CommentReaction.find({
      comment_replies_id: {
        $in: allReplyComments.map((replyComment) => replyComment._id),
      },
    }).exec();

    // Organize comments and replies into a nested format with reactions
    const commentsWithReplies = allComments.map((comment) => {
      const replies = allReplyComments.filter((reply) =>
        reply.comment_id.equals(comment._id)
      );

      // Fetch reactions for the main comment
      const mainCommentReactionsFiltered = mainCommentReactions.filter(
        (reaction) => reaction.comment_id.equals(comment._id)
      );

      // Include reactions in the main comment object
      const commentWithReactions = {
        ...comment.toObject(),
        comment_reactions: mainCommentReactionsFiltered,
        replies: replies.map((replyComment) => {
          // Fetch reactions for the reply comment
          const replyCommentReactionsFiltered = replyCommentReactions.filter(
            (reaction) => reaction.comment_replies_id.equals(replyComment._id)
          );

          // Include reactions in the reply comment object
          return {
            ...replyComment.toObject(),
            replies_comment_reactions: replyCommentReactionsFiltered,
          };
        }),
      };

      return commentWithReactions;
    });

    // Calculate total comments and replies for each post and add a totalComments field
    const postsWithCommentsAndMedia = [];

    for (const post of posts) {
      const postCommentsWithReplies = commentsWithReplies.filter((comment) =>
        comment.post_id.equals(post._id)
      );
      const totalComments = postCommentsWithReplies.length;
      const totalReplies = postCommentsWithReplies.reduce(
        (total, comment) => total + comment.replies.length,
        0
      );
      const combinedTotal = totalComments + totalReplies;

      // Fetch post reactions and calculate the reaction count for this post
      const postReactionCount = await PostReaction.countDocuments({
        post_id: post._id,
      });
      const postShareCount = await Post.find({
        share_post_id: post._id,
      }).count();

      postsWithCommentsAndMedia.push({
        ...post.toObject(),
        media: withPostMedia.filter((media) => media.post_id.equals(post._id)),
        shareMedia: withSharePostMedia.filter((media) =>
          media.post_id.equals(post.share_post_id?._id)
        ),
        comments: postCommentsWithReplies,
        totalComments: combinedTotal,
        reactionCount: postReactionCount,
        postShareCount: postShareCount,
      });
    }

    res.json({
      status: 200,
      posts: postsWithCommentsAndMedia,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getAllUserPostsFnF = async (req, res) => {
  try {
    const userId = req.userId;
    let { pageNo = 1, pageSize = 20 } = req.query;

    //parsing query parameters
    pageNo = parseInt(pageNo);
    pageSize = parseInt(pageSize);

    const friendConnections = await Friends.find({
      $or: [{ user_id: userId }, { connected_user_id: userId }],
      accept_reject_status: "1",
    });

    let friendUserIds = friendConnections.map((friend) => {
      return friend.user_id.equals(userId)
        ? friend.connected_user_id
        : friend.user_id;
    });
    friendUserIds.push(userId);

    const posts = await Post.find({
      $and: [
        { status: { $ne: "2" } },
        {
          $or: [
            { post_privacy: "public" },
            { post_privacy: "friends", user_id: { $in: friendUserIds } },
          ],
        },
      ],
    })
      .populate(
        "user_id location_id feeling_id activity_id sub_activity_id page_id workplace_id to_user_id"
      )
      .populate({
        path: "share_post_id",
        model: "Post",
        populate: {
          path: "user_id",
          model: "User",
        },
      })
      .populate({
        path: "share_reels_id",
        model: "Reels",
        populate: {
          path: "user_id",
          model: "User",
        },
      })
      .sort({ createdAt: -1 })
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const postIds = posts.map((post) => post._id);
    const postShareIds = posts.map((post) => post.share_post_id?._id);

    // Test Exception By Ruhul
    // Combine PostMedia Queries
    const postMedia = await PostMedia.find({
      post_id: { $in: [...postIds, ...postShareIds] },
    }).lean();

    // Combine Comment Queries
    const allComments = await Comment.find({ post_id: { $in: postIds } })
      .populate("user_id")
      .sort({ createdAt: -1 })
      .lean();

    const allReplyComments = await ReplyComment.find({
      comment_id: { $in: allComments.map((comment) => comment._id) },
    })
      .populate("replies_user_id")
      .lean();

    // Combine Comment Reaction Queries
    const commentIds = allComments.map((comment) => comment._id);
    const mainCommentReactions = await CommentReaction.find({
      comment_id: { $in: commentIds },
      comment_replies_id: null,
    }).lean();
    const replyCommentReactions = await CommentReaction.find({
      comment_replies_id: {
        $in: allReplyComments.map((replyComment) => replyComment._id),
      },
    }).lean();

    // Organize comments and replies into a nested format with reactions
    const commentsWithReplies = allComments.map((comment) => {
      const replies = allReplyComments.filter((reply) =>
        reply.comment_id.equals(comment._id)
      );
      const mainCommentReactionsFiltered = mainCommentReactions.filter(
        (reaction) => reaction.comment_id.equals(comment._id)
      );

      const commentWithReactions = {
        ...comment,
        comment_reactions: mainCommentReactionsFiltered,
        replies: replies.map((replyComment) => {
          const replyCommentReactionsFiltered = replyCommentReactions.filter(
            (reaction) => reaction.comment_replies_id.equals(replyComment._id)
          );
          return {
            ...replyComment,
            replies_comment_reactions: replyCommentReactionsFiltered,
          };
        }),
      };

      return commentWithReactions;
    });
    const postIdArray = posts.map((post) => post._id);

    // Fetch post reactions and share counts in bulk
    const postReactions = await PostReaction.aggregate([
      { $match: { post_id: { $in: postIdArray } } },
      { $group: { _id: "$post_id", count: { $sum: 1 } } },
    ]).exec();

    const postShareCounts = await Post.aggregate([
      { $match: { share_post_id: { $in: postIdArray } } },
      { $group: { _id: "$share_post_id", count: { $sum: 1 } } },
    ]).exec();

    const reactionTypeCounts = await PostReaction.aggregate([
      {
        $match: { post_id: { $in: postIdArray } },
      },
      {
        $group: {
          _id: {
            post_id: "$post_id",
            reaction_type: "$reaction_type",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          post_id: "$_id.post_id",
          reaction_type: "$_id.reaction_type",
          count: 1,
        },
      },
    ]).exec();

    // Combine post reactions and share counts with posts
    const postsWithCommentsAndMedia = posts.map((post) => {
      const postCommentsWithReplies = commentsWithReplies.filter((comment) =>
        comment.post_id.equals(post._id)
      );
      const totalComments = postCommentsWithReplies.length;
      const totalReplies = postCommentsWithReplies.reduce(
        (total, comment) => total + comment.replies.length,
        0
      );
      const combinedTotal = totalComments + totalReplies;

      const postReactionCount =
        postReactions.find((reaction) => reaction._id.equals(post._id))
          ?.count || 0;
      const postShareCount =
        postShareCounts.find((shareCount) => shareCount._id.equals(post._id))
          ?.count || 0;
      const reactionTypeCountsByPost = reactionTypeCounts.filter((reaction) =>
        reaction.post_id.equals(post._id)
      );

      return {
        ...post,
        media: postMedia.filter((media) => media.post_id.equals(post._id)),
        shareMedia: postMedia.filter((media) =>
          media.post_id.equals(post.share_post_id?._id)
        ),
        comments: postCommentsWithReplies,
        totalComments: combinedTotal,
        reactionCount: postReactionCount,
        postShareCount: postShareCount,
        reactionTypeCountsByPost: reactionTypeCountsByPost,
      };
    });

    // const paginatedPosts = postsWithCommentsAndMedia.slice(
    //   (pageNo - 1) * pageSize,
    //   pageNo * pageSize
    // );
    // const totalPosts = postsWithCommentsAndMedia.length;

    // res.json({
    //     status: 200,
    //     posts: postsWithCommentsAndMedia,
    // });

    // Get the total count of posts
    const totalPosts = await Post.countDocuments({
      $and: [
        { status: { $ne: "2" } },
        {
          $or: [
            { post_privacy: "public" },
            { post_privacy: "friends", user_id: { $in: friendUserIds } },
          ],
        },
      ],
    });

    res.json({
      status: 200,
      posts: postsWithCommentsAndMedia,
      pageNo: pageNo,
      pageSize: pageSize,
      totalPosts: 67,
    });
  } catch (error) {
    // console.error('Error:', error);
    res.status(500).json({ error: "An error occurred" + error });
  }
};

const getAllUserPostsPaginated = async (req, res) => {
  try {
    const userId = req.userId;
    let { pageNo = 1, pageSize = 20 } = req.query;

    //parsing query parameters
    pageNo = parseInt(pageNo);
    pageSize = parseInt(pageSize);

    const friendConnections = await Friends.find({
      $or: [{ user_id: userId }, { connected_user_id: userId }],
      accept_reject_status: "1",
    });

    let friendUserIds = friendConnections.map((friend) => {
      return friend.user_id.equals(userId)
        ? friend.connected_user_id
        : friend.user_id;
    });
    friendUserIds.push(userId);

    const posts = await Post.find({
      $and: [
        { status: { $ne: "2" } },
        {
          $or: [
            { post_privacy: "public" },
            { post_privacy: "friends", user_id: { $in: friendUserIds } },
          ],
        },
      ],
    })
      .populate(
        "user_id location_id feeling_id activity_id sub_activity_id page_id workplace_id to_user_id campaign_id"
      )
      .populate({
        path: "share_post_id",
        model: "Post",
        populate: {
          path: "user_id",
          model: "User",
        },
      })
      .populate({
        path: "share_reels_id",
        model: "Reels",
        populate: {
          path: "user_id",
          model: "User",
        },
      })
      .sort({ createdAt: -1 })
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const postIds = posts.map((post) => post._id);
    const postShareIds = posts.map((post) => post.share_post_id?._id);

    // Combine PostMedia Queries
    const postMedia = await PostMedia.find({
      post_id: { $in: [...postIds, ...postShareIds] },
    }).lean();

    // Combine Comment Queries
    const allComments = await Comment.find({ post_id: { $in: postIds } })
      .populate("user_id")
      .sort({ createdAt: -1 })
      .lean();

    const allReplyComments = await ReplyComment.find({
      comment_id: { $in: allComments.map((comment) => comment._id) },
    })
      .populate("replies_user_id")
      .lean();

    // Combine Comment Reaction Queries
    const commentIds = allComments.map((comment) => comment._id);
    const mainCommentReactions = await CommentReaction.find({
      comment_id: { $in: commentIds },
      comment_replies_id: null,
    }).lean();
    const replyCommentReactions = await CommentReaction.find({
      comment_replies_id: {
        $in: allReplyComments.map((replyComment) => replyComment._id),
      },
    }).lean();

    // Organize comments and replies into a nested format with reactions
    const commentsWithReplies = allComments.map((comment) => {
      const replies = allReplyComments.filter((reply) =>
        reply.comment_id.equals(comment._id)
      );
      const mainCommentReactionsFiltered = mainCommentReactions.filter(
        (reaction) => reaction.comment_id.equals(comment._id)
      );

      const commentWithReactions = {
        ...comment,
        comment_reactions: mainCommentReactionsFiltered,
        replies: replies.map((replyComment) => {
          const replyCommentReactionsFiltered = replyCommentReactions.filter(
            (reaction) => reaction.comment_replies_id.equals(replyComment._id)
          );
          return {
            ...replyComment,
            replies_comment_reactions: replyCommentReactionsFiltered,
          };
        }),
      };

      return commentWithReactions;
    });
    const postIdArray = posts.map((post) => post._id);

    // Fetch post reactions and share counts in bulk
    const postReactions = await PostReaction.aggregate([
      { $match: { post_id: { $in: postIdArray } } },
      { $group: { _id: "$post_id", count: { $sum: 1 } } },
    ]).exec();

    const postShareCounts = await Post.aggregate([
      { $match: { share_post_id: { $in: postIdArray } } },
      { $group: { _id: "$share_post_id", count: { $sum: 1 } } },
    ]).exec();

    const reactionTypeCounts = await PostReaction.aggregate([
      {
        $match: { post_id: { $in: postIdArray } },
      },
      {
        $group: {
          _id: {
            post_id: "$post_id",
            reaction_type: "$reaction_type",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          post_id: "$_id.post_id",
          reaction_type: "$_id.reaction_type",
          count: 1,
        },
      },
    ]).exec();

    const currentDate = new Date();
    // Combine post reactions and share counts with posts
    const postsWithCommentsAndMedia = posts.map((post) => {
      if (post.campaign_id?.end_date < currentDate) {
        return false;
      } else {

        const postCommentsWithReplies = commentsWithReplies.filter((comment) =>
          comment.post_id.equals(post._id)
        );
        const totalComments = postCommentsWithReplies.length;
        const totalReplies = postCommentsWithReplies.reduce(
          (total, comment) => total + comment.replies.length,
          0
        );
        const combinedTotal = totalComments + totalReplies;

        const postReactionCount =
          postReactions.find((reaction) => reaction._id.equals(post._id))
            ?.count || 0;
        const postShareCount =
          postShareCounts.find((shareCount) => shareCount._id.equals(post._id))
            ?.count || 0;
        const reactionTypeCountsByPost = reactionTypeCounts.filter((reaction) =>
          reaction.post_id.equals(post._id)
        );

        return {
          ...post,
          media: postMedia.filter((media) => media.post_id.equals(post._id)),
          shareMedia: postMedia.filter((media) =>
            media.post_id.equals(post.share_post_id?._id)
          ),
          comments: postCommentsWithReplies,
          totalComments: combinedTotal,
          reactionCount: postReactionCount,
          postShareCount: postShareCount,
          reactionTypeCountsByPost: reactionTypeCountsByPost,
        };
      }
    });

    // Get the total count of posts
    const totalPosts = await Post.countDocuments({
      $and: [
        { status: { $ne: "2" } },
        {
          $or: [
            { post_privacy: "public" },
            { post_privacy: "friends", user_id: { $in: friendUserIds } },
          ],
        },
      ],
    });

    res.json({
      status: 200,
      posts: postsWithCommentsAndMedia.filter(post => post !== false),
      pageNo: pageNo,
      pageSize: pageSize,
      totalPosts: totalPosts,
    });
  } catch (error) {
    // console.error('Error:', error);
    res.status(500).json({ error: "An error occurred" + error });
  }
};

const getAllUserPostsPaginated2 = async (req, res) => {
  try {
    let { pageNo = 1, pageSize = 20 } = req.query;
    const userId = req.userId;
    pageSize = parseInt(pageSize);

    // Fetch friend connections in a single query
    const friendConnections = await Friends.find({
      $or: [{ user_id: userId }, { connected_user_id: userId }],
      accept_reject_status: "1",
    });

    // Extract friend user IDs
    const friendUserIds = friendConnections.map((friend) => {
      return friend.user_id.equals(userId)
        ? friend.connected_user_id
        : friend.user_id;
    });
    friendUserIds.push(userId);

    // MongoDB aggregation pipeline for pagination
    const aggregationPipeline = [
      {
        $match: {
          $and: [
            { status: { $ne: "2" } },
            {
              $or: [
                { post_privacy: "public" },
                { post_privacy: "friends", user_id: { $in: friendUserIds } },
              ],
            },
          ],
        },
      },
      {
        $lookup: {
          from: "postmedias",
          localField: "_id",
          foreignField: "post_id",
          as: "media",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post_id",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "post_id",
          as: "reactions",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "share_post_id",
          foreignField: "_id",
          as: "sharedPost",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (pageNo - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ];

    const postsWithCommentsAndMedia = await Post.aggregate(aggregationPipeline);

    // Get the total count of posts
    const totalPosts = await Post.countDocuments({
      $and: [
        { status: { $ne: "2" } },
        {
          $or: [
            { post_privacy: "public" },
            { post_privacy: "friends", user_id: { $in: friendUserIds } },
          ],
        },
      ],
    });

    res.json({
      status: 200,
      posts: postsWithCommentsAndMedia,
      pageNo: parseInt(pageNo),
      pageSize: parseInt(pageSize),
      totalPosts: totalPosts,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const deleteAllUserPosts = async (req, res) => {
  try {
    const result = await Post.deleteMany({});
    if (result.deletedCount > 0) {
      res.json({
        status: 200,
        message: "All user posts deleted",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

const getUsersLatestImageVideo = async (req, res) => {
  try {
    const username = req.body.username;
    const userInfo = await User.find({ username: username });

    const posts = await Post.find({
      user_id: userInfo[0]._id,
      status: { $ne: "2" },
    })
      .populate("user_id location_id feeling_id activity_id sub_activity_id")
      .sort({ createdAt: -1 })
      .exec();

    const postIds = posts.map((post) => post._id);

    const allowedExtensions = [".jpg", ".png", ".webp"];

    const allowedVideoExtensions = [".mp4", ".webm", ".flv", "avi"];

    const withPostMedia = await PostMedia.find({
      post_id: { $in: postIds },
      media: { $in: allowedExtensions.map((ext) => new RegExp(ext, "i")) },
    })
      .sort({ _id: -1 })
      .limit(9);
    const withVideoMedia = await PostMedia.find({
      post_id: { $in: postIds },
      media: { $in: allowedVideoExtensions.map((ext) => new RegExp(ext, "i")) },
    })
      .sort({ _id: -1 })
      .limit(9);

    res.json({
      status: 200,
      posts: withPostMedia,
      videos: withVideoMedia,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" + error });
  }
};

const getUsersLatestImage = async (req, res) => {
  try {
    const username = req.body.username;
    const userInfo = await User.find({ username: username });

    const posts = await Post.find({
      user_id: userInfo[0]._id,
      status: { $ne: "2" },
    })
      .populate("user_id location_id feeling_id activity_id sub_activity_id")
      .sort({ createdAt: -1 })
      .exec();

    const postIds = posts.map((post) => post._id);

    const allowedExtensions = [".jpg", ".png", ".webp"];

    const allowedVideoExtensions = [".mp4", ".webm", ".flv", "avi"];

    const withPostMedia = await PostMedia.find({
      post_id: { $in: postIds },
      media: { $in: allowedExtensions.map((ext) => new RegExp(ext, "i")) },
    }).sort({ _id: -1 });
    const withVideoMedia = await PostMedia.find({
      post_id: { $in: postIds },
      media: { $in: allowedVideoExtensions.map((ext) => new RegExp(ext, "i")) },
    }).sort({ _id: -1 });

    res.json({
      status: 200,
      posts: withPostMedia,
      videos: withVideoMedia,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" + error });
  }
};

const getUsersLatestStory = async (req, res) => {
  try {
    const username = req.body.username;
    const userInfo = await User.find({ username: username });

    const storyList = await Story.find({
      user_id: userInfo[0]._id,
      status: { $ne: "2" },
    })
      // .populate('user_id location_id feeling_id activity_id sub_activity_id')
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      status: 200,
      storylist: storyList,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" + error });
  }
};

const getViewPostSingleItem = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.post_id;
    const mediaId = req.params.media_id;

    const post = await PostMedia.find({ post_id: postId, media: mediaId });

    // console.log('postWithMedia', post);

    // Return the media item as a JSON response
    res.json({
      status: 200,
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePostPrivacy = async (req, res) => {
  const postId = req.params.postId;
  try {
    const fetchPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { post_privacy: req.body.post_privacy }
    );
    return res.json({
      status: 200,
      message: "Post privacy updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePostByID = async (req, res) => {
  let posts = await Post.findOneAndUpdate(
    { _id: req.body.postId },
    { status: 2 }
  );

  // console.log('user',user)
  await posts.save();

  res.json({
    status: 200,
    message: "Post Deleted",
  });
};

// const viewSingleMainPostWithComments=async (req,res)=>{
//     try {
//         const postId = req.params.postId;

//         const post = await Post.find({ _id: postId })
//         .populate('user_id location_id feeling_id activity_id sub_activity_id')
//         .sort({ createdAt: -1 })
//         .exec();

//         // console.log('single post',post)

//     // Fetch associated media for each post

//     // const postIds = posts.map(post => post._id); // Extract post IDs
//     const withPostMedia = await PostMedia.find({ post_id:postId });
//     // console.log('single post media',withPostMedia)

//     const post_comments=await Comment.find({post_id:postId});

//     console.log('post_comment',post_comments)

//     // Combine post, media, and comments
//     const postWithMediaAndComments = post.map(post => ({
//         ...post.toObject(), // Convert to plain JavaScript object
//         media: withPostMedia.filter(media => media.post_id.equals(post._id)),
//         comments: post_comments.filter(comment => comment.post_id.equals(post._id))
//     }));

//         if (!postWithMediaAndComments) {
//           return res.status(404).json({ error: 'Post not found' });
//         }

//         res.json({
//             status:200,
//             post:post,
//             media:postWithMediaAndComments
//         });
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
// }

// const viewSingleMainPostWithComments = async (req, res) => {
//     try {
//       const postId = req.params.postId;

//       const post = await Post.find({ _id: postId })
//         .populate('user_id location_id feeling_id activity_id sub_activity_id')
//         .sort({ createdAt: -1 })
//         .exec();

//       if (!post) {
//         return res.status(404).json({ error: 'Post not found' });
//       }

//       // Fetch associated media for the post
//       const withPostMedia = await PostMedia.find({ post_id: postId });
//       const postComments = await Comment.find({ post_id: postId }).populate('user_id').exec();

//       // Combine post, media, and comments
//       const postWithMediaAndComments = post.map(singlePost => ({
//         ...singlePost.toObject(),
//         media: withPostMedia.filter(media => media.post_id.equals(singlePost._id)),
//         comments: postComments.filter(comment => comment.post_id.equals(singlePost._id))
//       }));

//       res.json({
//         status: 200,
//         post: postWithMediaAndComments, // Return the corrected variable
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

// todays old 25-10-23
// const viewSingleMainPostWithComments = async (req, res) => {
//     try {
//         const postId = req.params.postId;

//         const post = await Post.findOne({ _id: postId })
//             .populate('user_id location_id feeling_id activity_id sub_activity_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         // Fetch associated media for the post
//         const withPostMedia = await PostMedia.find({ post_id: postId });

//         // Fetch comments for the post
//         const postComments = await Comment.find({ post_id: postId })
//             .populate('user_id').sort({ createdAt: -1 })
//             .exec();

//         // Fetch reply comments for all comments in the post
//         const replyComments = await ReplyComment.find({
//             comment_id: { $in: postComments.map(comment => comment._id) }
//         })
//             .populate('replies_user_id') // Populate the replies_user_id field
//             .exec();

//         // Fetch comment reactions for all comments in the post
//         const commentReactions = await CommentReaction.find({
//             comment_id: { $in: postComments.map(comment => comment._id) }
//         }).exec();

//         // Fetch reply comment reactions for all reply comments in the post
//         const replyCommentReactions = await CommentReaction.find({
//             comment_replies_id: { $in: replyComments.map(replyComment => replyComment._id) }
//         }).exec();

//         // Create maps to group reactions by their parent comment or reply comment _id
//         const commentReactionsMap = new Map();
//         commentReactions.forEach(commentReaction => {
//             const commentId = commentReaction.comment_id.toString();
//             if (!commentReactionsMap.has(commentId)) {
//                 commentReactionsMap.set(commentId, []);
//             }
//             commentReactionsMap.get(commentId).push(commentReaction);
//         });

//         const replyCommentReactionsMap = new Map();
//         replyCommentReactions.forEach(replyCommentReaction => {
//             const replyCommentId = replyCommentReaction.comment_replies_id.toString();
//             if (!replyCommentReactionsMap.has(replyCommentId)) {
//                 replyCommentReactionsMap.set(replyCommentId, []);
//             }
//             replyCommentReactionsMap.get(replyCommentId).push(replyCommentReaction);
//         });

//         // Fetch post reactions and calculate the reaction count for this post
//         const postReactionCount = await PostReaction.countDocuments({ post_id: postId });

//         // Calculate total comments and replies for this post
//         const totalComments = postComments.length;
//         const totalReplies = replyComments.length;

//         // Combine post, media, comments, and reply comments
//         const postWithMediaAndComments = {
//             ...post.toObject(),
//             totalComments: totalComments + totalReplies,
//             reactionCount: postReactionCount,
//             media: withPostMedia.filter(media => media.post_id.equals(post._id)),
//             comments: postComments.map(comment => ({
//                 ...comment.toObject(),
//                 comment_reactions: commentReactionsMap.get(comment._id.toString()) || [],
//                 replies: replyComments
//                     .filter(replyComment => replyComment.comment_id.equals(comment._id))
//                     .map(replyComment => ({
//                         ...replyComment.toObject(),
//                         replies_comment_reactions: replyCommentReactionsMap.get(replyComment._id.toString()) || []
//                     }))
//             }))
//         };

//         res.json({
//             status: 200,
//             post: [postWithMediaAndComments]
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
const viewSingleMainPostWithComments = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId })
      .populate("user_id location_id feeling_id activity_id sub_activity_id")
      .populate({
        path: "share_post_id",
        model: "Post", // Assuming 'Post' is the model for posts
        populate: {
          path: "user_id",
          model: "User", // Assuming 'User' is the model for user information
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Fetch associated media for the post
    const withPostMedia = await PostMedia.find({ post_id: postId });

    const withSharePostMedia = await PostMedia.find({
      post_id: { $in: post.share_post_id?._id },
    });

    // Fetch comments for the post
    const postComments = await Comment.find({ post_id: postId })
      .populate("user_id")
      .sort({ createdAt: -1 })
      .exec();

    // Fetch reply comments for all comments in the post
    const replyComments = await ReplyComment.find({
      comment_id: { $in: postComments.map((comment) => comment._id) },
    })
      .populate("replies_user_id") // Populate the replies_user_id field
      .exec();

    // Fetch comment reactions for main comments
    const mainCommentReactions = await CommentReaction.find({
      comment_id: { $in: postComments.map((comment) => comment._id) },
      comment_replies_id: null, // Main comments have null comment_replies_id
    }).exec();

    // Fetch comment reactions for reply comments
    const replyCommentReactions = await CommentReaction.find({
      comment_replies_id: {
        $in: replyComments.map((replyComment) => replyComment._id),
      },
    }).exec();

    // Create maps to group reactions by their parent comment or reply comment _id
    const mainCommentReactionsMap = new Map();
    mainCommentReactions.forEach((commentReaction) => {
      const commentId = commentReaction.comment_id.toString();
      if (!mainCommentReactionsMap.has(commentId)) {
        mainCommentReactionsMap.set(commentId, []);
      }
      mainCommentReactionsMap.get(commentId).push(commentReaction);
    });

    const replyCommentReactionsMap = new Map();
    replyCommentReactions.forEach((replyCommentReaction) => {
      const replyCommentId = replyCommentReaction.comment_replies_id.toString();
      if (!replyCommentReactionsMap.has(replyCommentId)) {
        replyCommentReactionsMap.set(replyCommentId, []);
      }
      replyCommentReactionsMap.get(replyCommentId).push(replyCommentReaction);
    });

    // Fetch post reactions and calculate the reaction count for this post
    const postReactionCount = await PostReaction.countDocuments({
      post_id: postId,
    });

    // Calculate total comments and replies for this post
    const totalComments = postComments.length;
    const totalReplies = replyComments.length;
    const postShareCount = await Post.find({ share_post_id: post._id }).count();

    const reactionTypeCounts = await PostReaction.aggregate([
      {
        $match: { post_id: new mongoose.Types.ObjectId(postId) },
      },
      {
        $group: {
          _id: {
            post_id: "$post_id",
            reaction_type: "$reaction_type",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          post_id: "$_id.post_id",
          reaction_type: "$_id.reaction_type",
          count: 1,
        },
      },
    ]).exec();

    const reactionTypeCountsByPost = reactionTypeCounts.filter((reaction) =>
      reaction.post_id.equals(postId)
    );

    // Combine post, media, comments, and reply comments
    const postWithMediaAndComments = {
      ...post.toObject(),
      totalComments: totalComments + totalReplies,
      reactionCount: postReactionCount,
      reactionTypeCountsByPost: reactionTypeCountsByPost,
      media: withPostMedia.filter((media) => media.post_id.equals(post._id)),
      comments: postComments.map((comment) => ({
        ...comment.toObject(),
        comment_reactions:
          mainCommentReactionsMap.get(comment._id.toString()) || [],
        replies: replyComments
          .filter((replyComment) => replyComment.comment_id.equals(comment._id))
          .map((replyComment) => ({
            ...replyComment.toObject(),
            replies_comment_reactions:
              replyCommentReactionsMap.get(replyComment._id.toString()) || [],
          })),
      })),
      shareMedia: withSharePostMedia.filter((media) =>
        media.post_id.equals(post.share_post_id?._id)
      ),
      postShareCount: postShareCount,
    };

    res.json({
      status: 200,
      post: [postWithMediaAndComments],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" + err });
  }
};

// const viewSingleMainPostWithComments = async (req, res) => {
//     try {
//         const postId = req.params.postId;

//         const post = await Post.find({ _id: postId })
//             .populate('user_id location_id feeling_id activity_id sub_activity_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         // Fetch associated media for the post
//         const withPostMedia = await PostMedia.find({ post_id: postId });

//         // Fetch comments for the post
//         const postComments = await Comment.find({ post_id: postId })
//             .populate('user_id').sort({createdAt:-1})
//             .exec();

//         // Fetch reply comments for all comments in the post
//         const replyComments = await ReplyComment.find({
//             comment_id: { $in: postComments.map(comment => comment._id) }
//         })
//             .populate('replies_user_id') // Populate the replies_user_id field
//             .exec();

//         // Create a map to group reply comments by their parent comment _id
//         const replyCommentsMap = new Map();
//         replyComments.forEach(replyComment => {
//             const commentId = replyComment.comment_id.toString();
//             if (!replyCommentsMap.has(commentId)) {
//                 replyCommentsMap.set(commentId, []);
//             }
//             replyCommentsMap.get(commentId).push(replyComment);
//         });

//         // Count the number of likes (reactions) for this post
//         const postReactionCount = await PostReaction.countDocuments({ post_id: postId });

//         // Organize comments and replies into a nested format
//         const commentsWithReplies = postComments.map(comment => ({
//             ...comment.toObject(),
//             replies: replyCommentsMap.get(comment._id.toString()) || []
//         }));

//         // Calculate total comments and replies for this post and add a totalComments field
//         const totalComments = commentsWithReplies.length;
//         const totalReplies = commentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
//         const combinedTotal = totalComments + totalReplies;

//         // Restructure the API response to match the desired format
//         const response = {
//             status: 200,
//             post: {
//                 ...post[0].toObject(),
//                 media: withPostMedia,
//                 comments: commentsWithReplies,
//                 totalComments: combinedTotal,
//                 reactionCount: postReactionCount,
//             },
//         };

//         res.json(response);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const deleteSingleReplyComment = async (req, res) => {
  try {
    const result = await ReplyComment.deleteOne({ _id: req.body.comment_id });

    res.json({
      status: 200,
      message: "Comment deleted",
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Faile to Comment deleted",
    });
  }
};

const deleteSingleComment = async (req, res) => {
  try {
    const result = await Comment.deleteOne({ _id: req.body.comment_id });
    const result1 = await Comment.deleteMany({
      comment_id: req.body.comment_id,
    });

    res.json({
      status: 200,
      message: "Comment deleted",
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Faile to Comment deleted",
    });
  }
};

const getPostDetailsById = async (req, res) => {
  try {
    const result = await Post.findById({ _id: req.body.postid }).populate(
      "user_id location_id feeling_id activity_id sub_activity_id"
    );
    const withPostMedia = await PostMedia.find({ post_id: req.body.postid });
    res.json({
      status: 200,
      message: "Post Details",
      result: result,
      media: withPostMedia,
    });
  } catch (error) {
    res.json({
      status: 200,
      message: "Post Details",
    });
  }
};
const deletePostMediaById = async (req, res) => {
  try {
    const filePath = "uploads/posts/" + req.body.media;
    // console.log(filePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });

    const withPostMedia = await PostMedia.deleteOne({ _id: req.body.media_id });

    res.json({
      status: 200,
      message: "Post Details",
    });
  } catch (error) { }
};

const editPost = async (req, res) => {
  const files = req.files;

  try {
    console.log("req.body__", req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const post = await Post.findOneAndUpdate(
      { _id: req.body.post_id },
      {
        description: req.body.description,
        feeling_id: req.body.feeling_id ? req.body.feeling_id : null,
        activity_id: req.body.activity_id ? req.body.activity_id : null,
        sub_activity_id: req.body.sub_activity_id ? req.body.sub_activity_id : null,
        user_id: req.userId,
        post_type: req.body.post_type,
        post_background_color: req.body.post_background_color || "",
        location_id: req.body.location_id ? req.body.location_id : null,
      }
    );

    const mediaArray = files.map((file, i) => ({
      post_id: post._id,
      media: file.filename,
      caption: "",
    }));

    for (const mediaItem of mediaArray) {
      const postMedia = new PostMedia(mediaItem);
      await postMedia.save();
    }

    if (req.body?.removable_file_ids?.length > 0) {
      await PostMedia.deleteMany({
        _id: req.body?.removable_file_ids
      })
    }

    res
      .status(200)
      .json({ message: "Post Uploaded successfully", status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: error.message,
    });
  }
};
const hideUnhidePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const post = await Post.findOneAndUpdate(
      { _id: req.body.post_id },
      {
        is_hidden: req.body.is_hidden,
      }
    );
    res
      .status(200)
      .json({ message: "Post Uploaded successfully", status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: error.message,
    });
  }
};
const updateAllPostPrivacy = async (req, res) => {
  try {
    // Update all posts to have post_privacy as "friends"
    const result = await Post.updateMany(
      {},
      {
        $set: { post_privacy: "friends" },
      },
      { multi: true }
    );

    res.json({
      status: 200,
      message: `${result.nModified} posts updated successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const singlePost = async (req, res) => {
  try {
    const posts = await Post.find({
      _id: req.body.post_id,
      status: { $ne: "2" },
    })
      .populate(
        "user_id location_id feeling_id activity_id sub_activity_id page_id"
      )
      .populate({
        path: "share_post_id",
        model: "Post", // Assuming 'Post' is the model for posts
        populate: {
          path: "user_id",
          model: "User", // Assuming 'User' is the model for user information
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    const postIds = posts.map((post) => post._id);
    const postShareIds = posts.map((post) => post.share_post_id?._id);
    const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });
    const withSharePostMedia = await PostMedia.find({
      post_id: { $in: postShareIds },
    });

    // Fetch all comments for the posts
    const allComments = await Comment.find({ post_id: { $in: postIds } })
      .populate("user_id")
      .sort({ createdAt: -1 })
      .exec();

    // Fetch replies for the comments
    const allReplyComments = await ReplyComment.find({
      comment_id: { $in: allComments.map((comment) => comment._id) },
    })
      .populate("replies_user_id")
      .exec();

    // Fetch comment reactions for main comments
    const mainCommentReactions = await CommentReaction.find({
      comment_id: { $in: allComments.map((comment) => comment._id) },
      comment_replies_id: null, // Main comments have null comment_replies_id
    }).exec();

    // Fetch comment reactions for reply comments
    const replyCommentReactions = await CommentReaction.find({
      comment_replies_id: {
        $in: allReplyComments.map((replyComment) => replyComment._id),
      },
    }).exec();

    // Organize comments and replies into a nested format with reactions
    const commentsWithReplies = allComments.map((comment) => {
      const replies = allReplyComments.filter((reply) =>
        reply.comment_id.equals(comment._id)
      );

      // Fetch reactions for the main comment
      const mainCommentReactionsFiltered = mainCommentReactions.filter(
        (reaction) => reaction.comment_id.equals(comment._id)
      );

      // Include reactions in the main comment object
      const commentWithReactions = {
        ...comment.toObject(),
        comment_reactions: mainCommentReactionsFiltered,
        replies: replies.map((replyComment) => {
          // Fetch reactions for the reply comment
          const replyCommentReactionsFiltered = replyCommentReactions.filter(
            (reaction) => reaction.comment_replies_id.equals(replyComment._id)
          );

          // Include reactions in the reply comment object
          return {
            ...replyComment.toObject(),
            replies_comment_reactions: replyCommentReactionsFiltered,
          };
        }),
      };

      return commentWithReactions;
    });

    // Calculate total comments and replies for each post and add a totalComments field
    const postsWithCommentsAndMedia = [];

    for (const post of posts) {
      const postCommentsWithReplies = commentsWithReplies.filter((comment) =>
        comment.post_id.equals(post._id)
      );
      const totalComments = postCommentsWithReplies.length;
      const totalReplies = postCommentsWithReplies.reduce(
        (total, comment) => total + comment.replies.length,
        0
      );
      const combinedTotal = totalComments + totalReplies;

      // Fetch post reactions and calculate the reaction count for this post
      const postReactionCount = await PostReaction.countDocuments({
        post_id: post._id,
      });
      const postShareCount = await Post.find({
        share_post_id: post._id,
      }).count();

      postsWithCommentsAndMedia.push({
        ...post.toObject(),
        media: withPostMedia.filter((media) => media.post_id.equals(post._id)),
        shareMedia: withSharePostMedia.filter((media) =>
          media.post_id.equals(post.share_post_id?._id)
        ),
        comments: postCommentsWithReplies,
        totalComments: combinedTotal,
        reactionCount: postReactionCount,
        postShareCount: postShareCount,
      });
    }

    res.json({
      status: 200,
      posts: postsWithCommentsAndMedia,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" + error });
  }
};

const getAllPostComment = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 2; // Number of documents per page

  const skip = (page - 1) * limit;

  const allComments = await Comment.find({ post_id: req.params.postId })
    .populate("user_id")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  const allReplyComments = await ReplyComment.find({
    comment_id: { $in: allComments.map((comment) => comment._id) },
  })
    .populate("replies_user_id")
    .exec();

  const mainCommentReactions = await CommentReaction.find({
    comment_id: { $in: allComments.map((comment) => comment._id) },
    comment_replies_id: null,
  }).exec();

  const replyCommentReactions = await CommentReaction.find({
    comment_replies_id: {
      $in: allReplyComments.map((replyComment) => replyComment._id),
    },
  }).exec();

  const commentsWithReplies = allComments.map((comment) => {
    const replies = allReplyComments.filter((reply) =>
      reply.comment_id.equals(comment._id)
    );

    // Fetch reactions for the main comment
    const mainCommentReactionsFiltered = mainCommentReactions.filter(
      (reaction) => reaction.comment_id.equals(comment._id)
    );

    // Include reactions in the main comment object
    const commentWithReactions = {
      ...comment.toObject(),
      comment_reactions: mainCommentReactionsFiltered,
      replies: replies.map((replyComment) => {
        // Fetch reactions for the reply comment
        const replyCommentReactionsFiltered = replyCommentReactions.filter(
          (reaction) => reaction.comment_replies_id.equals(replyComment._id)
        );

        // Include reactions in the reply comment object
        return {
          ...replyComment.toObject(),
          replies_comment_reactions: replyCommentReactionsFiltered,
        };
      }),
    };

    return commentWithReactions;
  });

  return res.json({
    status: 200,
    commentss: commentsWithReplies,
  });
};

module.exports = getViewPostSingleItem;

module.exports = {
  savePost,
  uploadPostMedia,
  deleteAllUserPosts,
  getAllUserPostsIndividual,
  getAllUserPosts,
  getUsersLatestImage,
  getViewPostSingleItem,
  deletePostByID,
  viewSingleMainPostWithComments,
  deleteSingleReplyComment,
  deleteSingleComment,
  getPostDetailsById,
  deletePostMediaById,
  editPost,
  updatePostPrivacy,
  updateAllPostPrivacy,
  singlePost,
  getUsersLatestImageVideo,
  getUsersLatestStory,
  getAllUserPostsFnF,
  hideUnhidePost,
  getAllPostComment,
  getAllUserPostsPaginated
};
