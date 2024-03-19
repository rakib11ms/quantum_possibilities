const Pages = require('../../models/Pages/Pages.js');
const PageFollower = require('../../models/Pages/PageFollower.js');
const Post = require('../../models/posts/Post.js');
const PostMedia = require('../../models/posts/PostMedia');
const PostReaction = require('../../models/posts/PostReaction');
const Comment = require('../../models/Comments/Comment');
const ReplyComment = require('../../models/Comments/ReplyComment');
const CommentReaction = require('../../models/Comments/CommentReaction');

const multer = require('multer');

const axios = require('axios');
const cheerio = require('cheerio');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/posts');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },

    // filename: function (req, file, cb) {
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    //   },
});


const uploadPagePostMedia = multer({ storage: storage });


const savePagesPost = async (req, res) => {
    const files = req.files;
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ status: 400, errors: errors.array() });
        // }    
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

            title = $('head title').text().trim();

            description = $('meta[name="description"]').attr('content') || '';


            thumbnail = $('meta[property="og:image"]').attr('content');
            if (!thumbnail) {
                thumbnail = $('img').attr('src') || '';
            }

        }

        const post = new Post({
            description: req.body.description,
            feeling_id: req.body.feeling_id ? req.body.feeling_id : null,
            activity_id: req.body.activity_id,
            sub_activity_id: req.body.sub_activity_id,
            user_id: req.userId,
            post_type: req.body.post_type,
            page_id: req.body.page_id,
            location_id: req.body.location_id,
            post_privacy: req.body.post_privacy,
            link: link,
            link_title: title,
            link_description: description,
            link_image: thumbnail,
            post_background_color: req.body?.post_background_color,
        });
        await post.save();

        const mediaArray = files.map((file, i) => ({
            post_id: post._id,
            media: file.filename,
            caption: ''
        }));

        for (const mediaItem of mediaArray) {
            const postMedia = new PostMedia(mediaItem);
            await postMedia.save();
        }

        res.status(200).json({ message: 'Post Uploaded successfully', status: 200 });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
}


const getPagesPosts = async (req, res) => {


    try {
        const page_id = req.body.page_id;

        const posts = await Post.find({
            page_id: page_id,
            status: { $ne: "2" },
            post_type: "page_post"
        })
            .populate('user_id location_id feeling_id activity_id sub_activity_id page_id')
            .populate({
                path: 'share_post_id',
                model: 'Post', // Assuming 'Post' is the model for posts
                populate: {
                    path: 'user_id',
                    model: 'User', // Assuming 'User' is the model for user information
                },
            })
            .sort({ createdAt: -1 })
            .lean();





        const postIds = posts.map(post => post._id);
        const postShareIds = posts.map(post => post.share_post_id?._id);
        const withPostMedia = await PostMedia.find({ post_id: { $in: postIds } });
        const withSharePostMedia = await PostMedia.find({ post_id: { $in: postShareIds } });

        // Fetch all comments for the posts
        const allComments = await Comment.find({ post_id: { $in: postIds } })
            .populate('user_id')
            .sort({ createdAt: -1 })
            .lean();

        // Fetch replies for the comments
        const allReplyComments = await ReplyComment.find({ comment_id: { $in: allComments.map(comment => comment._id) } })
            .populate('replies_user_id')
            .lean();

        // Fetch comment reactions for main comments
        const mainCommentReactions = await CommentReaction.find({
            comment_id: { $in: allComments.map(comment => comment._id) },
            comment_replies_id: null // Main comments have null comment_replies_id
        }).lean();

        // Fetch comment reactions for reply comments
        const replyCommentReactions = await CommentReaction.find({
            comment_replies_id: { $in: allReplyComments.map(replyComment => replyComment._id) }
        }).lean();

        // Organize comments and replies into a nested format with reactions
        const commentsWithReplies = allComments.map(comment => {
            const replies = allReplyComments.filter(reply => reply.comment_id.equals(comment._id));

            // Fetch reactions for the main comment
            const mainCommentReactionsFiltered = mainCommentReactions.filter(reaction => reaction.comment_id.equals(comment._id));

            // Include reactions in the main comment object
            const commentWithReactions = {
                ...comment,
                comment_reactions: mainCommentReactionsFiltered,
                replies: replies.map(replyComment => {
                    // Fetch reactions for the reply comment
                    const replyCommentReactionsFiltered = replyCommentReactions.filter(reaction => reaction.comment_replies_id.equals(replyComment._id));

                    // Include reactions in the reply comment object
                    return {
                        ...replyComment,
                        replies_comment_reactions: replyCommentReactionsFiltered,
                    };
                }),
            };

            return commentWithReactions;
        });

        // Calculate total comments and replies for each post and add a totalComments field
        const postsWithCommentsAndMedia = [];

        for (const post of posts) {
            const postCommentsWithReplies = commentsWithReplies.filter(comment => comment.post_id.equals(post._id));
            const totalComments = postCommentsWithReplies.length;
            const totalReplies = postCommentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
            const combinedTotal = totalComments + totalReplies;

            // Fetch post reactions and calculate the reaction count for this post
            const postReactionCount = await PostReaction.countDocuments({ post_id: post._id });
            const postShareCount = await Post.find({ share_post_id: post._id }).count();

            postsWithCommentsAndMedia.push({
                ...post,
                media: withPostMedia.filter(media => media.post_id.equals(post._id)),
                shareMedia: withSharePostMedia.filter(media => media.post_id.equals(post.share_post_id?._id)),
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
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }

}


const changePagesProfilePic = async (req, res) => {
    try {
        const target_page = await Pages.findById(req.body.page_id);

        if (!target_page) {
            return res.json({ status: 400, message: 'Page not found' });
        }
        if (!req.file || !req.file.filename) {
            return res.json({ status: 400, message: 'Invalid file upload' });
        }
        target_page.profile_pic = req.file.filename;
        await target_page.save();
        const page_info = await Pages.findById({ _id: req.body.page_id });

        return res.json({ status: 200, page_info: [page_info], message: 'Profile picture updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while updating the profile picture' });
    }
};


const changePagesCoverPic = async (req, res) => {
    try {
        const target_page = await Pages.findById(req.body.page_id);

        if (!target_page) {
            return res.json({ status: 400, message: 'Pages not found' });
        }
        if (!req.file || !req.file.filename) {
            return res.json({ status: 400, message: 'Invalid file upload' });
        }
        target_page.cover_pic = req.file.filename;
        await target_page.save();
        const user_info = await Pages.findById({ _id: req.body.page_id }).exec();




        return res.json({ status: 200, user_info: [user_info], message: 'Cover picture updated successfully' });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ message: 'An error occurred while updating the profile picture' });
    }
};



module.exports = { savePagesPost, uploadPagePostMedia, getPagesPosts, changePagesCoverPic, changePagesProfilePic };
