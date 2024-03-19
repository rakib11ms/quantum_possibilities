const JoinedGroup = require('../../models/groups/JoinedGroups.js');
const { validationResult } = require('express-validator')
const multer = require('multer');
const fs = require('fs');
const Group = require('../../models/groups/Group.js');
const GroupPost = require('../../models/groups/GroupPost.js');
const GroupMedia = require('../../models/groups/GroupMedia.js');
const GroupPostComment = require('../../models/groups/GroupPostComment.js');
const GroupPostReplyComment = require('../../models/groups/GroupPostReplyComment.js');
const GroupPostReaction = require('../../models/groups/GroupPostReaction.js');
const mongoose = require('mongoose');
const GroupPostCommentReaction = require('../../models/groups/GroupPostCommentReaction.js');
const GroupMember = require('../../models/groups/GroupMember.js');
const Pages = require('../../models/Pages/Pages.js');
const { getUserId } = require('../../middleware/AuthMiddleware.js');
const GroupInvitation = require('../../models/groups/GroupInvitation.js');
const ObjectID = require("mongodb").BSON.ObjectId

const uploadDirectory = 'uploads/groupPost/';

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const UploadGroupPostMedia = multer({ storage: storage });

const SaveGroupPost = async (req, res) => {
    try {
        const files = req.files;
        const body = req.body

        console.log("aaaaaa_____", { group_id: req.body.groupId });
        console.log("req.body__", req.body, files);
        const data = {
            user_id: req.userId,
            created_by: req.userId,
            updated_by: req.userId,
        }
        const validFields = ['description', 'post_type', 'post_background_color', 'link', 'link_title', 'link_description']
        const validIdFields = ['feeling_id', 'activity_id', 'sub_activity_id', 'sub_activity_id', 'group_id', 'location_id', 'group_id']

        if (ObjectID.isValid(body?.groupId)) data['group_id'] = body?.groupId

        for (const index in body) {
            if (validIdFields.includes(index) && ObjectID.isValid(body[index])) {
                data[index] = body[index]
            }
            else {
                if (validFields.includes(index) && body[index]) {
                    data[index] = body[index]
                }
            }
        }

        if (files[0]?.filename) {
            data['group_post_media'] = uploadDirectory + files[0].filename
            data['post_background_color'] = null
        }

        const groupNewPost = new GroupPost(data);
        const groupPost = await groupNewPost.save();
        console.log("groupPost__", groupPost);
        const mediaArray = files.map((file, i) => ({
            group_post_id: groupPost._id,
            media: file.filename,
            caption: '',
            created_by: req.userId,
            update_by: req.userId
        }));

        const PostedmediaArray = await GroupMedia.insertMany(mediaArray)
        console.log("PostedmediaArray__", PostedmediaArray);
        res.status(200).json({ message: 'Group Post Uploaded successfully', status: 200 });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
}
const saveShareGroupPost = async (req, res) => {
    try {
        const { share_post_id } = req.body;

        const post = await GroupPost.findById({
            _id: share_post_id
        });

        const groupPostObj = new GroupPost({
            user_id: req.userId,
            post_type: "Shared",
            group_id: post.group_id,
            share_post_id: post._id,
            created_by: req.userId,
            updated_by: req.userId
        });
        await groupPostObj.save();



        if (post && post.user_id.toString() !== req.userId) {

            const notification = new Notification({
                notification_type: "shared_group_post",
                notification_data: {
                    notification_type: "shared_group_post",
                    post_id: share_post_id,
                    user_id: req.userId,
                    post_single_item_id: null,
                },
                notification_sender_id: req.userId,
                notification_receiver_id: post.user_id,
            });

            await notification.save();

        }
        res.status(200).json({
            message: 'Group Post Shared successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};
const saveShareGroupPostCaptionPost = async (req, res) => {
    try {
        const { share_post_id, description } = req.body

        const post = await GroupPost.findById(share_post_id);

        const postObj = new GroupPost({
            description: description,
            user_id: req.userId,
            post_type: "Shared",
            group_id: post.group_id,
            share_post_id: post._id,
            created_by: req.userId,
            updated_by: req.userId
        });
        await postObj.save();


        if (post && post.user_id.toString() !== req.userId) {

            const notification = new Notification({
                notification_type: "shared_group_post",
                notification_data: {
                    notification_type: "shared_group_post",
                    post_id: share_post_id,
                    user_id: req.userId,
                    post_single_item_id: null,
                },
                notification_sender_id: req.userId,
                notification_receiver_id: post.user_id,
            });

            await notification.save();

        }
        res.status(200).json({
            message: 'Group Post Shared successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};
const deleteGroupPostByID = async (req, res) => {
    const { postId } = req.body
    await GroupPost.findOneAndUpdate(
        { _id: postId },
        {
            $set: {
                status: "2"
            }
        },
        {
            new: true,
            useFindAndModify: false,
        }
    );

    res.json({
        status: 200,
        message: "Group Post Deleted"
    })
}
const viewSingleMainGroupPostWithComments = async (req, res) => {
    try {
        const postId = req.params.groupPostId;


        const post = await GroupPost.findOne({ _id: postId })
            .populate('user_id location_id feeling_id activity_id sub_activity_id')
            .populate({
                path: 'share_post_id',
                model: 'GroupPost', // Assuming 'Post' is the model for posts
                populate: {
                    path: 'user_id',
                    model: 'User', // Assuming 'User' is the model for user information
                },
            })
            .sort({ createdAt: -1 })
            .exec();

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Fetch associated media for the post
        const withPostMedia = await GroupMedia.find({ group_post_id: postId });

        const withSharePostMedia = await GroupMedia.find({ group_post_id: { $in: post.share_post_id?._id } });

        // Fetch comments for the post
        const postComments = await GroupPostComment.find({ post_id: postId })
            .populate('user_id').sort({ createdAt: -1 })
            .exec();

        // Fetch reply comments for all comments in the post
        const replyComments = await GroupPostReplyComment.find({
            comment_id: { $in: postComments.map(comment => comment._id) }
        })
            .populate('replies_user_id') // Populate the replies_user_id field
            .exec();

        // Fetch comment reactions for main comments
        const mainCommentReactions = await GroupPostCommentReaction.find({
            comment_id: { $in: postComments.map(comment => comment._id) },
            comment_replies_id: null // Main comments have null comment_replies_id
        }).exec();

        // Fetch comment reactions for reply comments
        const replyCommentReactions = await GroupPostCommentReaction.find({
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
        const postReactionCount = await GroupPostReaction.countDocuments({ post_id: postId });

        // Calculate total comments and replies for this post
        const totalComments = postComments.length;
        const totalReplies = replyComments.length;
        const postShareCount = await GroupPost.find({ share_post_id: post._id }).count();
        // console.log("withSharePostMedia__", withSharePostMedia);
        // Combine post, media, comments, and reply comments
        const postWithMediaAndComments = {
            ...post.toObject(),
            totalComments: totalComments + totalReplies,
            reactionCount: postReactionCount,
            media: withPostMedia.filter(media => media.group_post_id.equals(post._id)),
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
            shareMedia: withSharePostMedia.filter(media => media.group_post_id.equals(post.share_post_id?._id)),
            postShareCount: postShareCount,

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
const getAllGroupMainPostReactions = async (req, res) => {
    try {
        // Get the user ID from the request
        const userId = req.userId;

        // Find all reactions associated with the user
        const userPostsReactions = await GroupPostReaction.find({
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

const saveMainGroupPostReaction = async (req, res) => {
    try {
        const { reaction_type, post_id, post_single_item_id } = req.body;
        const user_id = req.userId;

        // Check if the user has already reacted to the post
        const existingReaction = await GroupPostReaction.findOne({
            user_id,
            post_id,
        });
        console.log("existingReaction__", existingReaction);
        if (existingReaction) {
            // User has already reacted to this post, check if the reaction_type is the same
            if (existingReaction.reaction_type === reaction_type) {
                // The user is trying to react with the same reaction_type, remove the reaction
                await GroupPostReaction.findByIdAndRemove(existingReaction._id);
                res.json({
                    status: 200,
                    message: "Group Post reaction removed successfully",
                });
            } else {
                // The user is changing their reaction_type
                existingReaction.reaction_type = reaction_type;
                existingReaction.post_single_item_id = post_single_item_id;
                await existingReaction.save();
                res.json({
                    status: 200,
                    message: "Group Post reaction updated successfully",
                });
            }
        } else {
            // User has not reacted to this post, create a new reaction
            const newReaction = new GroupPostReaction({
                reaction_type,
                user_id,
                post_id,
                post_single_item_id,
            });
            await newReaction.save();

            // After adding the reaction, send a notification to the post owner
            const post = await GroupPost.findById(post_id);

            if (post && post.user_id.toString() !== user_id) {
                // Create a notification
                const notification = new Notification({
                    notification_type: "Group_post_reaction",
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

            res.json({ status: 200, message: "Group Post reaction added successfully" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const reactionUserListsOfDirectGroupPost = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find post reactions by postId and populate the 'user_id' field to get user details
        const reactions = await GroupPostReaction.find({ post_id: postId }).populate(
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

const EditGroupPost = async (req, res) => {
    try {
        const { description, feeling_id, activity_id, sub_activity_id, status } = req.body;
        const data = {
            updated_by: req.userId,
        }
        if (description) data['description'] = description
        if (status) data['status'] = status
        if (activity_id) data['activity_id'] = activity_id
        if (sub_activity_id) data['sub_activity_id'] = sub_activity_id
        if (feeling_id) data['feeling_id'] = feeling_id


        await GroupPost.updateOne({
            _id: req.params.group_post_id
        },
            {
                $set: data
            },
            {
                new: true,
                useFindAndModify: false,
            })

        res.status(200).json({ message: 'group Post updated successfully', status: 200 });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
}

// const getGroupPosts = async (req, res) => {

//     try {
//         const group_id = new mongoose.Types.ObjectId(req.body.group_id);
//         const groupPost = await GroupPost.find({ group_id: group_id, status: { $eq: "active" } })
//             .populate('user_id location_id feeling_id activity_id sub_activity_id')
//             .populate({
//                 path: 'share_post_id',
//                 model: 'GroupPost',
//                 populate: {
//                     path: 'user_id',
//                     model: 'User',
//                 },
//             })
//             .sort({ createdAt: -1 })
//             .exec();

//         const groupPostIds = groupPost.map(groupPost => groupPost._id);

//         const withPostMedia = await GroupMedia.find({ group_post_id: { $in: groupPostIds } });

//         const allComments = await GroupPostComment.find({ post_id: { $in: groupPostIds } })
//             .populate('user_id')
//             .sort({ createdAt: -1 })
//             .exec();

//         const allReplyComments = await GroupPostReplyComment.find({ comment_id: { $in: allComments.map(comment => comment._id) } })
//             .populate('replies_user_id')
//             .exec();

//         const commentsWithReplies = allComments.map(comment => {
//             const replies = allReplyComments.filter(reply => reply.comment_id.equals(comment._id));
//             return {
//                 ...comment.toObject(),
//                 replies: replies,
//             };
//         });

//         const postsWithCommentsAndMedia = [];

//         for (const post of groupPost) {
//             const postCommentsWithReplies = commentsWithReplies.filter(comment => comment.post_id.equals(post._id));
//             const totalComments = postCommentsWithReplies.length;
//             const totalReplies = postCommentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
//             const combinedTotal = totalComments + totalReplies;

//             // Fetch post reactions and calculate the reaction count for this post
//             const postReactionCount = await GroupPostReaction.countDocuments({ post_id: post._id });

//             postsWithCommentsAndMedia.push({
//                 ...post.toObject(),
//                 media: withPostMedia.filter(media => media.group_post_id.equals(post._id)),
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
// }
const gettingGroupPost = async ({ group_id, isAll, group_list = null }) => new Promise(async (resolve, reject) => {
    try {
        const query = {};
        if (isAll == true && !group_id && group_list) {
            query['group_id'] = {
                $in: group_list
            }
            console.log(query, "all", group_list);

        }
        else if (group_id && isAll == false) {
            query['group_id'] = group_id
        }
        const posts = await GroupPost.find({ ...query, status: { $eq: "active" } })
            .populate('user_id location_id feeling_id activity_id sub_activity_id')
            .populate({
                path: 'share_post_id',
                model: 'GroupPost',
                populate: {
                    path: 'user_id',
                    model: 'User',
                },
            })
            .sort({ createdAt: -1 })
            .exec();


        const postIds = posts.map(post => post._id);
        const postShareIds = posts.map(post => post.share_post_id?._id);
        const withPostMedia = await GroupMedia.find({ group_post_id: { $in: postIds } });
        const withSharePostMedia = await GroupMedia.find({ group_post_id: { $in: postShareIds } });

        // Fetch all comments for the posts
        const allComments = await GroupPostComment.find({ post_id: { $in: postIds } })
            .populate('user_id')
            .sort({ createdAt: -1 })
            .exec();

        // Fetch replies for the comments
        const allReplyComments = await GroupPostReplyComment.find({ comment_id: { $in: allComments.map(comment => comment._id) } })
            .populate('replies_user_id')
            .exec();

        // Fetch comment reactions for main comments
        const mainCommentReactions = await GroupPostCommentReaction.find({
            comment_id: { $in: allComments.map(comment => comment._id) },
            comment_replies_id: null // Main comments have null comment_replies_id
        }).exec();

        // Fetch comment reactions for reply comments
        const replyCommentReactions = await GroupPostCommentReaction.find({
            comment_replies_id: { $in: allReplyComments.map(replyComment => replyComment._id) }
        }).exec();

        // Organize comments and replies into a nested format with reactions
        const commentsWithReplies = allComments.map(comment => {
            const replies = allReplyComments.filter(reply => reply.comment_id.equals(comment._id));

            // Fetch reactions for the main comment
            const mainCommentReactionsFiltered = mainCommentReactions.filter(reaction => reaction.comment_id.equals(comment._id));

            // Include reactions in the main comment object
            const commentWithReactions = {
                ...comment.toObject(),
                comment_reactions: mainCommentReactionsFiltered,
                replies: replies.map(replyComment => {
                    // Fetch reactions for the reply comment
                    const replyCommentReactionsFiltered = replyCommentReactions.filter(reaction => reaction.comment_replies_id.equals(replyComment._id));

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

        const postIdArray = posts.map(post => post._id);


        const reactionTypeCounts = await GroupPostReaction.aggregate([
            {
                $match: { post_id: { $in: postIdArray } }
            },
            {
                $group: {
                    _id: {
                        post_id: '$post_id',
                        reaction_type: '$reaction_type'
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    post_id: '$_id.post_id',
                    reaction_type: '$_id.reaction_type',
                    count: 1
                }
            }
        ]).exec();


        for (const post of posts) {
            const postCommentsWithReplies = commentsWithReplies.filter(comment => comment.post_id.equals(post._id));
            const totalComments = postCommentsWithReplies.length;
            const totalReplies = postCommentsWithReplies.reduce((total, comment) => total + comment.replies.length, 0);
            const combinedTotal = totalComments + totalReplies;

            // Fetch post reactions and calculate the reaction count for this post
            const postReactionCount = await GroupPostReaction.countDocuments({ post_id: post._id });
            const postShareCount = await GroupPost.find({ share_post_id: post._id }).count();
            const reactionTypeCountsByPost = reactionTypeCounts.filter(reaction => reaction.post_id.equals(post._id));

            postsWithCommentsAndMedia.push({
                ...post.toObject(),
                media: withPostMedia.filter(media => media.group_post_id?.equals(post._id)),
                shareMedia: withSharePostMedia.filter(media => media.group_post_id?.equals(post.share_post_id?._id)),
                comments: postCommentsWithReplies,
                totalComments: combinedTotal,
                reactionCount: postReactionCount,
                postShareCount: postShareCount,
                reactionTypeCountsByPost: reactionTypeCountsByPost
            });
        }

        resolve({
            status: 200,
            posts: postsWithCommentsAndMedia,
        });
    }
    catch (err) {
        console.error('Error:', err);
        reject({ error: 'An error occurred' });
    }
})



const getGroupResource = async (req, res) => {
    try {
        const { group_id } = req.params;
        const { type, limit, variety, isAll } = req.query;
        console.log(req.params, '______', req.query);
        if (!group_id || !type) throw new Error('parameter missing !!')
        switch (type) {
            case 'member':
                const flag = Boolean(isAll)
                const groupMembers = await GroupMember.find({
                    group_id: group_id,
                    is_accepted: true,
                    status: 'active',
                    // role: {
                    //     $nin: ['admin', 'moderator']
                    // }
                })
                    .populate('group_member_user_id', '_id first_name last_name profile_pic').populate('group_id', 'group_created_user_id')

                res.status(200).json({
                    message: "Group members",
                    status: 200,
                    groupMembers: {
                        count: groupMembers.length,
                        data: groupMembers
                    },
                });
                break;
            case 'media':
                // const groupMedia = await GroupMedia.find({
                //     group_post_id: {
                //         group_id: group_id
                //     }
                // }).sort({ createdAt: -1 })

                // const groupMedia = await GroupPost.aggregate([
                //     {
                //         $lookup: {
                //             from: 'groupMedias',
                //             localField: '_id',
                //             foreignField: 'group_post_id',
                //             as: 'GGroup_Media'
                //         }
                //     },
                //     // {
                //     //     $match: {
                //     //         $expr: {
                //     //             $eq: ['$Group_Post.group_id', group_id]
                //     //         }
                //     //     }
                //     // }
                // ])

                const GroupPostList = await GroupPost.find({
                    group_id: group_id
                }).select('_id');

                console.log("GroupPostList__", GroupPostList);

                const groupMedia = await GroupMedia.find({
                    group_post_id: {
                        $in: GroupPostList.map(i => i._id)
                    }
                }).select({
                    media: 1,
                    createdAt: 1
                })
                const groupPhotos = await Group.find({
                    _id: group_id
                }).select({ group_cover_pic: 1, createdAt: 1 })
                console.log("groupMedia__", groupMedia, "groupPhotos__", groupPhotos);
                for (const i of groupPhotos) {
                    i.group_cover_pic = '/uploads/group/' + i.group_cover_pic
                }
                for (const i of groupMedia) {
                    i.media = '/uploads/groupPost/' + i.media
                }
                const margedContainer = [...groupPhotos, ...groupMedia]

                // console.log("margedContainer__", margedContainer);
                const allImgageType = ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'gif', 'png', 'svg', 'bmp']
                const allVideoType = ['ogg', 'webm', 'mp4', 'avi', 'mov', 'wmv', 'mkv']

                const mainMediaContainer = [];

                for (const i of margedContainer) {
                    const src = i?.media || i?.group_cover_pic
                    const exten = src?.split('.')[1]
                    // console.log(variety,' ',exten);
                    if (variety === 'photo' && allImgageType.includes(exten?.toLowerCase())) {
                        mainMediaContainer.push({ src, createdAt: i.createdAt })
                    }
                    else if (variety === 'video' && allVideoType.includes(exten?.toLowerCase())) {
                        mainMediaContainer.push({ src, createdAt: i.createdAt })
                    }
                }
                // console.log("mainMediaContainer__", mainMediaContainer);
                mainMediaContainer.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                return res.status(200).json({
                    message: "Group media",
                    status: 200,
                    groupMedia: mainMediaContainer
                });
                break;
            case 'admin':
                const groupAdmins = await GroupMember.find({
                    group_id: group_id,
                    is_accepted: true,
                    status: 'active',
                    role: 'admin'
                })
                    .populate('group_member_user_id', '_id first_name last_name profile_pic').populate('group_id', 'group_created_user_id')

                res.status(200).json({
                    message: "Group Admins",
                    status: 200,
                    groupAdmins: {
                        count: groupAdmins.length,
                        data: groupAdmins
                    },
                });
                break;
            case 'moderator':
                const groupModerator = await GroupMember.find({
                    group_id: group_id,
                    is_accepted: true,
                    status: 'active',
                    role: 'moderator'
                })
                    .populate('group_member_user_id', '_id first_name last_name profile_pic').populate('group_id', 'group_created_user_id')

                res.status(200).json({
                    message: "Group moderator",
                    status: 200,
                    groupModerator: {
                        count: groupModerator.length,
                        data: groupModerator
                    },
                });
                break;
            default:
                res.status(400).json({
                    message: `Invalid ${type}`,
                    status: 400,
                });
        }

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: err.message,
            status: 401,
        });
    }
}
const getGroupPosts = async (req, res) => {
    try {
        const group_id = req.body.group_id;
        const user_id = await getUserId(req, res)

        const group = await Group.findById({ _id: group_id })
        if (!group) throw new Error('Group not found !')

        if (group.group_privacy === 'private') {
            if (!user_id) throw new Error('Unauthenticated !')
            else {
                const isMember = await GroupMember.findOne({
                    group_id: group._id,
                    group_member_user_id: user_id,
                    is_accepted: true,
                    status: 'active'
                }).select({ _id: 1, status: 1 })
                // console.log("isMember__", isMember);
                if (isMember) {
                    const allPosts = await gettingGroupPost({ group_id, isAll: false })
                    return res.json(allPosts)
                }
                else {
                    throw new Error('Its a Private group,you are not the member of this group !!')
                }
            }
        }
        else if (group.group_privacy === 'public') {
            const allPosts = await gettingGroupPost({ group_id, isAll: false })
            return res.json(allPosts)
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: error.message });
    }

}
const getAllGroupsPosts = async (req, res) => {

    try {
        console.log("hitted!!");
        const groupList = await GroupMember.find({
            group_member_user_id: req.userId,
            is_accepted: true,
            status: 'active'
        }).select({ group_id: 1, status: 1 })

        console.log("groupList__", groupList);
        const allPosts = await gettingGroupPost({
            group_id: null, isAll: true,
            group_list: groupList.map(i => i.group_id)
        })

        res.json(allPosts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
const getEditCommentByDirectGroupPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        const comment_type = req.params.commentType;

        switch (comment_type) {
            case 'main_comment':
                const edit_main_comment = await GroupPostComment.findOne({ _id: commentId, post_id: postId, comment_type: 'main_comment' });
                return res.json({
                    status: 200,
                    data: edit_main_comment
                });
                break;

            case 'reply_comment':
                const edit_reply_comment = await GroupPostReplyComment.findOne({ _id: commentId, comment_type: 'reply_comment', $or: [{ post_id: postId }, { post_id: null }] });
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
const reactionUserListsOfCommentsDirectGroupPost = async (req, res) => {
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
        const reactions = await GroupPostCommentReaction.find(query).populate("user_id");

        res.json({ status: 200, reactions: reactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
const deleteSingleGroupPostComment = async (req, res) => {
    try {
        const result = await GroupPostComment.deleteOne({ _id: req.body.comment_id });
        const result1 = await GroupPostComment.deleteMany({ comment_id: req.body.comment_id });

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

const deleteSingleReplyGroupPostComment = async (req, res) => {
    try {
        const result = await GroupPostReplyComment.deleteOne({ _id: req.body.comment_id });

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
const saveUserCommentByGroupPost = async (req, res) => {
    try {
        const commentObj = {
            user_id: req.userId,
            post_id: req.body.post_id,
            comment_name: req.body.comment_name,
            image_or_video: req.file ? req.file.path : null,

        }
        const save_comment = new GroupPostComment(commentObj);

        await save_comment.save();


        // After adding the comment, send a notification to the post owner
        const post = await GroupPost.findById(req.body.post_id);

        if (post && post.user_id.toString() !== req.userId) {
            // Create a notification
            const notification = new Notification({
                notification_type: "group_post_commented",
                notification_data: {
                    notification_type: "group_post_commented",
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

const replyCommentByDirectGroupPost = async (req, res) => {
    try {
        const replyCommentObj = {
            comment_id: req.body.comment_id,
            replies_user_id: req.userId,
            replies_comment_name: req.body.replies_comment_name,
            post_id: req.body.post_id,
            image_or_video: req.file ? req.file.path : null,

        }
        const save_reply_comment = new GroupPostReplyComment(replyCommentObj);

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
const updateCommentsByDirectGroupPost = async (req, res) => {
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

                const checkOldImageOrVideoFile = await GroupPostComment.findOne({ _id: commentId, post_id: postId, comment_type: "main_comment" });
                // console.log('check',checkOldImageOrVideoFile)
                if (image_or_video === null) {
                    const updated_main_comment = await GroupPostComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "main_comment" }, updateMainCommentData, { new: true });
                    return res.json({
                        status: 200,
                        data: updated_main_comment,
                    });
                }
                else if (image_or_video !== checkOldImageOrVideoFile.image_or_video) {
                    // if (checkOldImageOrVideoFile.image_or_video) {
                    //   fs.unlinkSync(checkOldImageOrVideoFile.image_or_video);
                    // }
                    const updated_main_comment = await GroupPostComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "main_comment" }, updateMainCommentDataWithNewImageOrVideo, { new: true })
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
                const checkOldImageOrVideoFileReply = await GroupPostReplyComment.findOne({ _id: commentId, post_id: postId, comment_type: "reply_comment" });
                // console.log('check',checkOldImageOrVideoFile)
                if (image_or_video === null) {
                    const updated_reply_comment = await GroupPostReplyComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "reply_comment" }, updateMainCommentReplyData, { new: true });
                    return res.json({
                        status: 200,
                        data: updated_reply_comment,
                    });
                }
                else if (image_or_video !== checkOldImageOrVideoFileReply.image_or_video) {
                    // if (checkOldImageOrVideoFile.image_or_video) {
                    //   fs.unlinkSync(checkOldImageOrVideoFile.image_or_video);
                    // }
                    const updated_reply_comment = await GroupPostReplyComment.findOneAndUpdate({ _id: commentId, post_id: postId, comment_type: "reply_comment" }, updateMainCommentReplyDataWithNewImageOrVideo, { new: true })
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

const saveMainGroupPostCommentReaction = async (req, res) => {
    try {
        const post_id = req.body.post_id;
        const comment_id = req.body.comment_id;
        const comment_replies_id = req.body.comment_replies_id == "" ? null : req.body.comment_replies_id;
        const reaction_type = req.body.reaction_type;
        const user_id = req.userId;



        // Check if the user has already reacted to the comment
        const existingReaction = await GroupPostCommentReaction.findOne({
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
            const newReaction = new GroupPostCommentReaction({
                reaction_type: reaction_type,
                user_id: user_id,
                post_id: post_id,
                comment_id: comment_id,
                comment_replies_id: comment_replies_id,

            });
            await newReaction.save();

            // After adding the comment reaction, send a notification to the post owner
            const post = await GroupPost.findById(req.body.post_id);

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
const groupMemberRemove = async (req, res) => {
    try {
        const reqStatus = req.query?.status;
        const group_id = req.query?.group_id;
        const user_id = req.query?.user_id

        if (!reqStatus || !group_id) throw new Error('Parameter missing!')

        const query = {}
        if (reqStatus?.toLowerCase() === 'delete') {
            const isOwner = await Group.findById(group_id).select('group_created_user_id')
            if (isOwner?.group_created_user_id?.toString() === user_id?.toString()) {
                throw new Error('Can not remove group creator')
            }
            query['status'] = 'delete'
        }
        else if (reqStatus?.toLowerCase() === 'left') query['status'] = 'left'

        // const groupMember = await GroupMember.findOne({
        //     group_member_user_id: user_id,
        //     group_id: group_id,
        //     status: 'active'
        // })
        await GroupMember.findOneAndUpdate(
            {
                group_member_user_id: user_id,
                group_id: group_id,
                status: 'active'
            },
            {
                $set: query
            },
            {
                new: true,
                useFindAndModify: false,
            }
        );
        await GroupInvitation.findOneAndUpdate(
            {
                group_id: group_id,
                user_id: user_id,
                accept_invitation: true

            },
            {
                $set: {
                    accept_invitation: false
                }
            },
            {
                new: true,
                useFindAndModify: false,
            }
        )

        res.status(200).json({ status: 200, message: `Group member ${reqStatus} successfully` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const editGroupMember = async (req, res) => {
    try {
        const group_member_id = req.params?.group_member_id;
        const { role, group_id, group_member_user_id } = req.body;

        const user_id = req.userId


        const query = {}
        if (role) {
            const reqMember = await GroupMember.findOne({
                group_id: group_id,
                group_member_user_id: user_id,
                status: 'active',
            }).populate('group_id', 'group_created_user_id')

            if (reqMember) {
                if (reqMember?.role === 'member' ||
                    reqMember?.role === 'moderator' && role === 'admin' ||
                    group_member_user_id?.toString() === reqMember?.group_id?.group_created_user_id?.toString()
                ) throw new Error('No permission to update !')
                else query['role'] = role
            }
        }

        await GroupMember.findOneAndUpdate(
            {
                _id: group_member_id,
                group_id: group_id,
                status: 'active',
                is_accepted: true
            },
            {
                $set: query
            },
            {
                new: true,
                useFindAndModify: false,
            }
        );


        res.status(200).json({ status: 200, message: `Group member updated successfully successfully` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err?.message });
    }
}

const queryTestingController = async (req, res) => {
    try {

        const pageDetails = await GroupMedia.aggregate([
            {
                $group: {
                    _id: {
                        post_id: '$group_post_id',
                    },
                    count: {
                        $sum: 1
                    },
                    allmedieas: {
                        $push: '$media'
                    }
                }
            },
            {
                $lookup: {
                    // from: "GroupPost",  // Assuming your posts collection is named "Posts"
                    // localField: "_id.post_id",
                    // foreignField: "post_id",

                    from: 'groupposts',
                    localField: '_id.post_id',
                    foreignField: '_id',
                    as: "post"
                }
            },
            // {
            //     from: 'users',
            //     localField: '$post.created_by',
            //     foreignField: '_id',
            //     as: "user_info"
            // },
            {
                $project: {
                    _id: 0,
                    bbbb_post_id: "$_id.post_id",
                    allmedieas: 1,
                    count: 1,
                    created_by: "$post.created_by",
                    post:'$post',
                    creator_info: "$user_info"
                }
            }
        ]);
        // const pageDetails = await GroupMedia.aggregate([
        //     // {
        //     //     $unwind: '$group_post_id'
        //     // },

        //     // {
        //     //     $lookup: {
        //     //         from: 'groupposts',
        //     //         localField: 'group_post_id',
        //     //         foreignField: '_id',
        //     //         as: 'group___post',
        //     //     },
        //     // },

        //     {
        //         $group: {
        //             _id: {
        //                 post_id: '$group_post_id',
        //                 // g_media: '$media'
        //                 created_by:'$created_by'

        //             },
        //             count:{
        //                 $sum: 1
        //             },
        //             allmedieas:{
        //                 $push:'$media'
        //             }
        //         }
        //     },
        //     {
        //         $project:{
        //             _id:0,
        //             bbbb_post_id:"$_id.post_id",
        //             allmedieas: 1,
        //             count:1,
        //             created_by:'$_id.created_by'
        //             // created_by:1
        //         }
        //     }

        // ])
        res.json(pageDetails);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });

    }
}
module.exports = {
    SaveGroupPost, UploadGroupPostMedia,
    getGroupPosts, getAllGroupsPosts, EditGroupPost,
    saveShareGroupPost, saveShareGroupPostCaptionPost,
    deleteGroupPostByID, viewSingleMainGroupPostWithComments,
    getAllGroupMainPostReactions, saveMainGroupPostReaction,
    reactionUserListsOfDirectGroupPost, getEditCommentByDirectGroupPost,
    reactionUserListsOfCommentsDirectGroupPost, deleteSingleGroupPostComment,
    deleteSingleReplyGroupPostComment, saveUserCommentByGroupPost,
    replyCommentByDirectGroupPost, updateCommentsByDirectGroupPost,
    saveMainGroupPostCommentReaction, getGroupResource, queryTestingController,
    groupMemberRemove, editGroupMember
}