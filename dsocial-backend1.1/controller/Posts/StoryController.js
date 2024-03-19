
const Story = require('../../models/posts/Story')
const User = require('../../models/User')
const { validationResult } = require('express-validator')
const multer = require('multer');
const fs = require('fs');
const StoryView = require('../../models/posts/StoryView');
const StoryReaction = require('../../models/posts/StoryReaction');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/story/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const uploadSaveMedia = multer({ storage: storage });

const saveStory = async (req, res) => {
    // try {
    const errors = validationResult(req);
    const files = req.files;

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, errors: errors.array() });
    }


    if (files != undefined) {
        let filenames = files.map((file) => file.filename);
        const story = new Story({
            title: req.body.title,
            color: req.body.color,
            text_color: req.body.text_color,
            font_family: req.body.fontFamily,
            font_size: req.body.fontSize,
            text_position: req.body.position,
            text_alignment: req.body.alignment,
            media: filenames[0],
            user_id: req.userId
        });
        await story.save();
    } else {
        const story = new Story({
            title: req.body.title,
            color: req.body.color,
            user_id: req.userId,
            font_size: req.body.fontSize,
            text_position: req.body.position,
            text_alignment: req.body.alignment,
        });
        await story.save();
    }






    res.status(200).json({ message: 'Story Uploaded successfully', status: 200 });

    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({
    //         errors: error.message
    //     });
    // }
};

const getStory = async (req, res) => {
    try {
        const now = new Date();  // Get the current date and time
        const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);  // Subtract 24 hours in milliseconds

        const stories = await Story.aggregate([
            {
                $match: {
                    $and: [
                        {
                            createdAt: {
                                $gte: twentyFourHoursAgo,
                                $lt: now,
                            },
                        },
                        {
                            user_id: { $ne: req.body.user_id }
                        }
                    ]
                }
            },
            {
                $sort: { user_id: 1, createdAt: -1 }
            },
            {
                $group: {
                    _id: "$user_id",
                    latestStory: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestStory" }
            }
        ]).exec();

        const populatedStories = await Story.populate(stories, { path: 'user_id' });



        res.status(200).json({
            message: 'Story Uploaded successfully',
            status: 200,
            results: populatedStories
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};

const getMergeStory = async (req, res) => {
    try {
        const result = await Story.findOne({
            _id: req.body.story_id,
        }).populate('user_id');

        // console.log("boom",result)


        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const now = new Date();

        const users = await User.find({
            _id: { $ne: result.user_id._id }
        }); // Assuming you have a User model

        const allUserStories = [];
        const userId = req.userId;

        for (const user of users) {
            const userStories = await Story.find({
                user_id: user._id,
                createdAt: { $gte: twentyFourHoursAgo, $lt: now },
                // _id: { $ne: req.body.story_id },
            }).sort({ createdAt: -1 });

            // console.log("story viewers",userStories)

            if (userStories.length > 0) {
                const storiesWithViewsAndReactions = await Promise.all(userStories.map(async (story) => {
                    // Find story views associated with the current story
                    // const storyViews = await StoryView.find({ story_id: story._id ,user_id:{$ne:req.userId}}).populate('user_id').exec();
                    const storyViews = await StoryView.find({ story_id: story._id, user_id: { $ne: userId } }).populate('user_id').exec();
                    // console.log("story viewers",storyViews)
                    // Extract viewers count and list
                    const viewersCount = storyViews.length;

                    const viewersList = await Promise.all(storyViews.map(async (view) => {
                        // Assuming 'StoryReaction' is the model or data structure for reactions
                        const reactions = await StoryReaction.find({
                            user_id: view.user_id,
                            story_id: view.story_id
                        });

                        console.log(reactions);

                        return {
                            user_id: view.user_id,
                            username: view.user_id.username,
                            first_name: view.user_id.first_name,
                            last_name: view.user_id.last_name,
                            profile_pic: view.user_id.profile_pic,
                            status: view.status,
                            reactions: reactions.map(reaction => ({
                                // Include relevant fields from the StoryReaction schema
                                // For example:
                                reaction_type: reaction.reaction_type,
                                timestamp: reaction.timestamp,
                                // Add other fields as needed
                            })),
                            // Include other relevant fields from the StoryView schema
                        };
                    }));

                    // Include viewersCount and viewersList in the story object
                    return {
                        ...story.toObject({ getters: true, virtuals: true }),
                        viewersCount,
                        viewersList,
                    };
                }));

                allUserStories.push({ ...user.toObject(), stories: storiesWithViewsAndReactions });
            }
        }


        res.status(200).json({
            message: 'Story Uploaded successfully',
            status: 200,
            results: allUserStories
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};

const saveStoryView = async (req, res) => {
    try {
        const { story_id } = req.body;
        const user_id = req.userId;

        const userStory = await Story.find({
            user_id,
            _id: story_id
        })

        if (userStory) {
            return res.status(200).json({
                status: 200,
                message: "Story allready viewed"
            });
        }

        const existingView = await StoryView.findOne({
            user_id,
            story_id,
        });
        if (existingView) {
            return res.status(200).json({
                status: 200,
                message: "Story allready viewed"
            });
        } else {
            const newViewCount = new StoryView({
                story_id,
                user_id
            })
            await newViewCount.save();
        }
        return res.json({ status: 200, message: "Story View added successfully" });

    } catch (error) {
        return res.status(500).json({
            errors: error.message
        });
    }
}

const showSingleStory = async (req, res) => {
    // try {
    const { story_id } = req.body;

    // Check if the user has already reacted to the post
    const result = await Story.findOne({
        _id: story_id,
    }).populate('user_id');

    try {

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const now = new Date();

        const users = await User.find({
            _id: result.user_id?._id
        }); // Assuming you have a User model


        const allUserStories = [];

        for (const user of users) {
            const userStories = await Story.find({
                user_id: user._id,
                createdAt: { $gte: twentyFourHoursAgo, $lt: now }
            }).sort({ createdAt: -1 });

            if (userStories.length > 0) {
                const storiesWithViewsAndReactions = await Promise.all(userStories.map(async (story) => {
                    // Find story views associated with the current story
                    const storyViews = await StoryView.find({ story_id: story._id }).populate('user_id').exec();

                    // Extract viewers count and list
                    const viewersCount = storyViews.length;

                    const viewersList = await Promise.all(storyViews.map(async (view) => {
                        // Assuming 'StoryReaction' is the model or data structure for reactions
                        const reactions = await StoryReaction.find({
                            user_id: view.user_id,
                            story_id: view.story_id
                        });

                        console.log(reactions);

                        return {
                            user_id: view.user_id,
                            username: view.user_id.username,
                            first_name: view.user_id.first_name,
                            last_name: view.user_id.last_name,
                            profile_pic: view.user_id.profile_pic,
                            status: view.status,
                            reactions: reactions.map(reaction => ({
                                // Include relevant fields from the StoryReaction schema
                                // For example:
                                reaction_type: reaction.reaction_type,
                                timestamp: reaction.timestamp,
                                // Add other fields as needed
                            })),
                            // Include other relevant fields from the StoryView schema
                        };
                    }));

                    // Include viewersCount and viewersList in the story object
                    return {
                        ...story.toObject({ getters: true, virtuals: true }),
                        viewersCount,
                        viewersList,
                    };
                }));

                allUserStories.push({ ...user.toObject(), stories: storiesWithViewsAndReactions });
            }
        }


        return res.status(200).json({
            message: 'Story Uploaded successfully',
            status: 200,
            results: allUserStories
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }




    let viewercount = 0;
    let viewerList = [];
    if (req.userId == result.user_id?._id) {
        viewercount = await StoryView.count({
            $and: [
                { story_id: story_id }
            ]
        });

        viewerList = await StoryView.find({ story_id: story_id })
            .populate('user_id');


    }


    res.json({
        status: 200,
        message: "Story found successfully",
        result: result,
        viewercounts: viewercount,
        viewer_list: viewerList

    });


    // } catch (error) {
    //     return res.status(500).json({
    //         errors: error.message
    //     });
    // }
}

const getAllUserStory = async (req, res) => {
    try {
        const { story_id } = req.body;

        // Check if the user has already reacted to the post
        const result = await Story.findOne({
            _id: story_id,
        }).populate('user_id');

        // Check if the story exists
        if (!result) {
            return res.status(404).json({
                message: 'Story not found',
                status: 404,
            });
        }

        const userId = result.user_id?._id;

        const users = await User.find({
            _id: userId,
        });

        const allUserStories = [];

        for (const user of users) {
            const userStories = await Story.find({
                user_id: user._id,
            }).sort({ createdAt: -1 });

            const storiesWithViewsAndReactions = await Promise.all(userStories.map(async (story) => {
                const storyViews = await StoryView.find({ story_id: story._id }).populate('user_id').exec();
                const viewersCount = storyViews.length;

                const viewersList = await Promise.all(storyViews.map(async (view) => {
                    const reactions = await StoryReaction.find({
                        user_id: view.user_id,
                        story_id: view.story_id,
                    });

                    return {
                        user_id: view.user_id,
                        username: view.user_id.username,
                        first_name: view.user_id.first_name,
                        last_name: view.user_id.last_name,
                        profile_pic: view.user_id.profile_pic,
                        status: view.status,
                        reactions: reactions.map((reaction) => ({
                            reaction_type: reaction.reaction_type,
                            timestamp: reaction.timestamp,
                        })),
                    };
                }));

                return {
                    ...story.toObject({ getters: true, virtuals: true }),
                    viewersCount,
                    viewersList,
                };
            }));

            const userWithStory = { ...user.toObject(), stories: storiesWithViewsAndReactions };

            // Find the index of the story with the specified story_id
            const index = userWithStory.stories.findIndex((story) => story._id.equals(story_id));

            if (index !== -1) {
                // If the story is found, move it to the beginning of the array
                const [story] = userWithStory.stories.splice(index, 1);
                userWithStory.stories.unshift(story);
            }

            allUserStories.push(userWithStory);
        }

        return res.status(200).json({
            message: 'Story and associated data fetched successfully',
            status: 200,
            results: allUserStories,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message,
        });
    }
};

const getUserStory = async (req, res) => {
    try {
        const { user_id } = req.body;

        // Check if the user has already reacted to the post
        const result = await Story.find({
            user_id: user_id,
        }).populate("user_id");

        // Check if the story exists
        if (!result) {
            return res.status(404).json({
                message: "Story not found",
                status: 404,
            });
        }

        return res.status(200).json({
            message: "Story and associated data fetched successfully",
            status: 200,
            results: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message,
        });
    }
};

const saveStoryReaction = async (req, res) => {
    try {
        const storyReaction = new StoryReaction({
            reaction_type: req.body.reactionType,
            story_id: req.body.storyId,
            user_id: req.userId
        });
        await storyReaction.save();
        res.json({
            status: 200,
            message: "Story reaction saved successfully",
        });


    } catch (error) {
        return res.status(500).json({
            errors: error.message
        });
    }
}

const deleteStory = async (req, res) => {
    try {
        const result = await Story.deleteOne({ _id: req.body.storyId });
        const result1 = await StoryReaction.deleteMany({ story_id: req.body.storyId });
        const result2 = await StoryView.deleteMany({ story_id: req.body.storyId });

        res.json({
            status: 200,
            message: 'Story Deleted deleted'
        });
    }


    catch (error) {
        res.json({
            status: 400,
            message: 'Faile to Comment deleted'
        });
    }
}

module.exports = { saveStory, getStory, uploadSaveMedia, saveStoryView, showSingleStory, saveStoryReaction, deleteStory, getMergeStory, getAllUserStory, getUserStory }    