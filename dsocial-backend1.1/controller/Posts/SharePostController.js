const Post = require('../../models/posts/Post');
const Notification = require('../../models/Notification/Notification');

const saveSharePost = async (req, res) => {
    try {
        const postObj = new Post({
            user_id: req.userId,
            post_type: "Shared",
            share_post_id: req.body.share_post_id,
            post_privacy: "public",
        });
        await postObj.save();


        const post = await Post.findById(req.body.share_post_id);

        if (post && post.user_id.toString() !== req.userId) {

            const notification = new Notification({
                notification_type: "shared_post",
                notification_data: {
                    notification_type: "shared_post",
                    post_id: req.body.share_post_id,
                    user_id: req.userId,
                    post_single_item_id: null,
                },
                notification_sender_id: req.userId,
                notification_receiver_id: post.user_id,
            });

            await notification.save();

        }
        res.status(200).json({
            message: 'Post Shared successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};
const saveShareCaptionPost = async (req, res) => {
    try {
        const postObj = new Post({
            user_id: req.userId,
            post_type: "Shared",
            share_post_id: req.body.share_post_id,
            description: req.body.description,
            post_privacy:  req.body.privacy,
        });
        await postObj.save();


        const post = await Post.findById(req.body.share_post_id);

        if (post && post.user_id.toString() !== req.userId) {

            const notification = new Notification({
                notification_type: "shared_post",
                notification_data: {
                    notification_type: "shared_post",
                    post_id: req.body.share_post_id,
                    user_id: req.userId,
                    post_single_item_id: null,
                },
                notification_sender_id: req.userId,
                notification_receiver_id: post.user_id,
            });

            await notification.save();

        }
        res.status(200).json({
            message: 'Post Shared successfully',
            status: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};



module.exports = { saveSharePost, saveShareCaptionPost }