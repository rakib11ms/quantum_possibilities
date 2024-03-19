
const StoryReaction = require('../../models/posts/StoryReaction')



const saveStoryReaction = async (req, res) => {
    try {
        const { reaction_type, story_id } = req.body;
        const user_id = req.userId;

        // Check if the user has already reacted to the post
        const existingReaction = await StoryReaction.findOne({
            user_id,
            post_id,
        });

        if (existingReaction) {
            // User has already reacted to this post, check if the reaction_type is the same
            if (existingReaction.reaction_type === reaction_type) {
                await StoryReaction.findByIdAndRemove(existingReaction._id);
                res.json({ status: 200, message: "Story reaction removed successfully" });
            } else {
                // The user is changing their reaction_type
                existingReaction.reaction_type = reaction_type;
                existingReaction.post_single_item_id = post_single_item_id;
                await existingReaction.save();
                res.json({ status: 200, message: "Story reaction updated successfully" });
            }
        } else {
            // User has not reacted to this post, create a new reaction
            const newReaction = new StoryReaction({
                reaction_type,
                user_id,
                post_id,
                post_single_item_id,
            });
            await newReaction.save();
            res.json({ status: 200, message: "Story reaction added successfully" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStoryReactions = async (req, res) => {
    try {
        // Get the user ID from the request
        const userId = req.userId;

        // Find all posts
        const posts = await Post.find();

        const userPostsReactions = [];

        for (const post of posts) {
            // Find all reactions associated with each post and the specific user
            const reactions = await PostReaction.find({ post_id: post._id, user_id: userId })
                .select('post_id reaction_type _id')
                .exec();

            reactions.forEach((reaction) => {
                userPostsReactions.push({
                    post_id: post._id,
                    reaction_type: reaction.reaction_type,
                    reaction_id: reaction._id,
                });
            });
        }

        res.json({
            status: 200,
            userPostsReactions: userPostsReactions,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { saveStoryReaction, getStoryReactions }



