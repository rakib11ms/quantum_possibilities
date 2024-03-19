const PagesReviews = require('../../models/Pages/PageReviews.js');
const PageReviewsReaction = require('../../models/Pages/PageReviewsReaction.js');
const ReviewComment = require('../../models/Pages/ReviewComment.js');
const ReviewReplyComment = require('../../models/Pages/ReviewReplyComment.js');



const saveReviews = async (req, res) => {
    try {
        await new PagesReviews({
            page_id: req.body.page_id,
            recommendation: req.body.content,
            type: req.body.type,
            user_id: req.userId,
        }).save();


        return res.status(200).json({ message: 'Pages Reviews successfully', status: 200 });
    } catch (error) {
        return res.status(500).json({
            errors: error.message
        });
    }
}


const getPagesReviews = async (req, res) => {
    try {
        const reviews = await PagesReviews.find({ page_id: req.body.page_id }).populate('user_id page_id')

        const reviewId = reviews.map(review => review._id);

        const allComments = await ReviewComment.find({ review_id: { $in: reviewId } })
            .populate('user_id')
            .sort({ createdAt: -1 })
            .exec();

        const allReplyComments = await ReviewReplyComment.find({ comment_id: { $in: allComments.map(comment => comment._id) } })
            .populate('replies_user_id')
            .exec();

        const commentsWithReplies = allComments.map(comment => {
            const replies = allReplyComments.filter(reply => reply.comment_id.equals(comment._id));
            return {
                ...comment.toObject(),
                replies: replies,
            };
        });

        const reviewsWithCommentsAndMedia = [];

        for (const review of reviews) {
            const reviewCommentsWithReplies = commentsWithReplies.filter(comment => comment.review_id.equals(review._id));
            const totalComments = reviewCommentsWithReplies.length;
            const totalReplies = reviewCommentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
            const combinedTotal = totalComments + totalReplies;

            // Fetch post reactions and calculate the reaction count for this post
            const reviewReactionCount = await PageReviewsReaction.countDocuments({ review_id: review._id });

            reviewsWithCommentsAndMedia.push({
                ...review.toObject(),
                comments: reviewCommentsWithReplies,
                totalComments: combinedTotal,
                reactionCount: reviewReactionCount,
            });
        }

        return res.json({
            message: 'Pages Reviews successfully',
            status: 200,
            reviews: reviewsWithCommentsAndMedia,
        });

    } catch (error) {
        return res.status(500).json({
            errors: error.message
        });
    }
}


const saveReactionOnReviews = async (req, res) => {
    try {
        const { reaction_type, review_id, post_single_item_id } = req.body;
        const user_id = req.userId;

        const existingReaction = await PageReviewsReaction.findOne({
            user_id,
            review_id,
        });

        if (existingReaction) {
            if (existingReaction.reaction_type === reaction_type) {
                await PageReviewsReaction.findByIdAndRemove(existingReaction._id);
                res.json({
                    status: 200,
                    message: "Reviews Reaction reaction removed successfully",
                });
            } else {
                existingReaction.reaction_type = reaction_type;
                existingReaction.post_single_item_id = post_single_item_id;
                await existingReaction.save();
                res.json({
                    status: 200,
                    message: "Reviews Reaction updated successfully",
                });
            }
        } else {
            const newReaction = new PageReviewsReaction({
                reaction_type,
                user_id,
                review_id,
                post_single_item_id,
            });
            await newReaction.save();

            const post = await PagesReviews.findById(review_id);

            if (post && post.user_id.toString() !== user_id) {
                const notification = new Notification({
                    notification_type: "post_reaction",
                    notification_data: {
                        reaction_type,
                        review_id,
                    },
                    notification_sender_id: user_id,
                    notification_receiver_id: post.user_id,
                });

                await notification.save();
            }

            res.json({
                status: 200,
                message: "Page Reviews reaction added successfully"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }



}



const saveUserCommentByReview = async (req, res) => {
    try {
        const commentObj = {
            user_id: req.userId,
            review_id: req.body.review_id,
            comment_name: req.body.comment_name,

        }
        const save_comment = new ReviewComment(commentObj);

        await save_comment.save();
        res.json({
            status: 200,
            message: 'Comment added successful'
        })


    }
    catch (error) {
        console.log("error", error)
    }
}




const replyCommentByReviews = async (req, res) => {
    try {
        const replyCommentObj = {
            comment_id: req.body.comment_id,
            replies_user_id: req.userId,
            replies_comment_name: req.body.replies_comment_name,

        }
        const save_reply_comment = new ReviewReplyComment(replyCommentObj);

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


const viewReviewsWithComments = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        const post = await PagesReviews.find({ _id: reviewId })
            .populate('user_id page_id')
            .sort({ createdAt: -1 })
            .exec();

        if (!reviewId) {
            return res.status(404).json({ error: 'Post not found' });
        }
        // Fetch comments for the post
        const postComments = await ReviewComment.find({ review_id: reviewId })
            .populate('user_id').sort({ createdAt: -1 })
            .exec();

        // Fetch reply comments for all comments in the post
        const replyComments = await ReviewReplyComment.find({
            comment_id: { $in: postComments.map(comment => comment._id) }
        })
            .populate('replies_user_id') // Populate the replies_user_id field
            .exec();

        // Create a map to group reply comments by their parent comment _id
        const replyCommentsMap = new Map();
        replyComments.forEach(replyComment => {
            const commentId = replyComment.comment_id.toString();
            if (!replyCommentsMap.has(commentId)) {
                replyCommentsMap.set(commentId, []);
            }
            replyCommentsMap.get(commentId).push(replyComment);
        });

        // Fetch post reactions and calculate the reaction count for this post
        const postReactionCount = await PageReviewsReaction.countDocuments({ review_id: reviewId });

        // Calculate total comments and replies for this post
        const totalComments = postComments.length;
        const totalReplies = replyComments.length;

        // Combine post, media, comments, and reply comments
        const postWithMediaAndComments = post.map(singlePost => ({
            ...singlePost.toObject(),
            totalComments: totalComments + totalReplies,
            reactionCount: postReactionCount,
            comments: postComments
                .filter(comment => comment.review_id.equals(singlePost._id))
                .map(comment => ({
                    ...comment.toObject(),
                    replies: replyCommentsMap.get(comment._id.toString()) || []
                }))
        }));

        res.json({
            status: 200,
            post: postWithMediaAndComments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deletePageReview = async (req, res) => {
    try {
        const result = await PagesReviews.deleteOne({ _id: req.body.reviewId });
        const result1 = await ReviewComment.deleteMany({ review_id: req.body.reviewId });
        res.json({
            status: 200,
            message: "Delete Page Review"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const reactionUserListsOfReviews = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        // Find post reactions by postId and populate the 'user_id' field to get user details
        const reactions = await PageReviewsReaction.find({ review_id: reviewId }).populate(
            "user_id"
        );



        res.json({ status: 200, reactions: reactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { saveReviews, getPagesReviews, saveReactionOnReviews, saveUserCommentByReview, replyCommentByReviews, viewReviewsWithComments, deletePageReview, reactionUserListsOfReviews }
