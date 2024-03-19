const User = require('../models/User')
const Friends = require('../models/Friends');
const Chat = require("../models/Messenger/Chat");
const Post = require('../models/posts/Post');
const Followers = require('../models/Followers');
const Website = require('../models/settings/Websites');
const Websites = require('../models/settings/Websites');
const { validationResult } = require('express-validator');
const UserPrivacySettings = require('../models/UserPrivacySettings');

const getUserInfoByUsername = async (req, res) => {
    try {
        // const results = await User.find({ "username": req.body.username }).populate("gender");
        const results = await User.aggregate([
            { $match: { username: req.body.username } },
            {
                $lookup: {
                    from: "websites",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "websites"
                }
            },
            {
                $lookup: {
                    from: "genders",
                    localField: "gender",
                    foreignField: "_id",
                    as: "gender"
                }
            },
            { $unwind: "$gender" },
            {
                $lookup: {
                    from: "socialmedias",
                    localField: "websites.social_media_id",
                    foreignField: "_id",
                    as: "socialMedia"
                }
            },
            {
                $addFields: {
                    "websites": {
                        $map: {
                            input: "$websites",
                            as: "website",
                            in: {
                                $mergeObjects: [
                                    "$$website",
                                    {
                                        socialMedia: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$socialMedia",
                                                        as: "socialMediaItem",
                                                        cond: {
                                                            $eq: [
                                                                "$$socialMediaItem._id",
                                                                "$$website.social_media_id"
                                                            ]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $unset: "socialMedia" // Remove the socialMedia field from the top level
            }
        ]);



        if (!results) {
            return res.status(404).json({ error: 'User not found' });
        }

        //modified for follower count 

        const userId = results[0]._id;
        const postsCount = await Post.countDocuments({ user_id: userId });
        const followersCount = await Followers.countDocuments({ user_id: userId, follow_unfollow_status: 1 });
        const followingCount = await Followers.countDocuments({ follower_user_id: userId, follow_unfollow_status: 1 });

        const userPrivacy = await UserPrivacySettings.find({ user_id: userId });
        console.log(userPrivacy.length);
        let userPrivacyArr = {};
        for (var i = 0; i < userPrivacy.length; i++) {
            userPrivacyArr[userPrivacy[i].field_name] = userPrivacy[i].privacy;
        }

        const userInfo = {
            ...results[0], // Extract the user data from Mongoose document
            postsCount: postsCount,
            followersCount: followersCount,
            followingCount: followingCount,
            privacy: userPrivacyArr
        };

        return res.json({
            status: 200,
            userInfo: [userInfo],
        });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getUserInfo = async (req, res) => {
    const user_id = req.params.id;

    try {
        const results = await User.find({ "_id": user_id });
        return res.json({
            status: 200,
            userInfo: results,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }
}

const getAllUsers = async (req, res) => {
    try {
        const all_users = await User.find().select("_id first_name last_name username email profile_pic");
        return res.json({
            status: 200,
            all_users: all_users,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const upsertUserWebsite = async (req, res) => {
    try {
        const data = req.body;
        data.user_id = req.userId;

        const errors = validationResult(data);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }

        const website = await Websites.findOne({ _id: data.website_id });
        if (website) {
            await Websites.updateOne({ _id: data.website_id }, {
                $set: {
                    social_media_id: data.social_media_id,
                    website_url: data.website_url,
                    privacy: data.privacy,
                    updated_by: req.userId
                }
            });
        } else {
            await Websites.create(data);
        }
        return res.status(200).json({ message: 'Website upsert successfully', status: 200, data: website });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};

const updateUserBirthDate = async (req, res) => {
    try {
        const { birth_date, birth_place } = req.body
        if (!birth_date) {
            return res.status(400).json({ errors: "Birth date is required" });
        }
        else {
            const results = await User.findOneAndUpdate(
                { _id: req.userId },
                {
                    $set: {
                        date_of_birth: new Date(birth_date),
                        birth_place: birth_place
                    }
                },
                {
                    new: true,
                    useFindAndModify: false,
                }
            )
            return res.json({
                status: 200,
                message: "Birth info updated successfully"
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const updateUserNickName = async (req, res) => {
    try {
        if (!req.body.nick_name) {
            return res.status(400).json({ errors: "Nick name is required" });
        }
        await updatePrivacy('nickname', req.body.privacy, req.userId);

        const results = await User.updateOne({ _id: req.userId }, { $set: { user_nickname: req.body.nick_name } });
        return res.json({
            status: 200,
            message: "Nick name updated successfully"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const updateUserAbout = async (req, res) => {
    try {
        const { user_about, privacy } = req.body
        if (!user_about) {
            return res.status(400).json({ errors: "Bio is required" });
        }
        await updatePrivacy('about', privacy, req.userId);
        const results = await User.updateOne({ _id: req.userId }, { $set: { user_about: user_about } });
        return res.json({
            status: 200,
            message: "Bio updated successfully"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const updateUserRelationStatus = async (req, res) => {
    try {
        const { relation_status, privacy } = req.body
        if (!relation_status) {
            return res.status(400).json({ errors: "Relation status is required" });
        }

        await updatePrivacy('relationship', privacy, req.userId)
        const results = await User.updateOne({ _id: req.userId }, { $set: { relation_status: relation_status } });
        return res.json({
            status: 200,
            message: "Relation status updated successfully"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const userUserLocation = async (req, res) => {
    try {
        const { home_town, present_town, privacy } = req.body

        //Privacy FUnction



        if (home_town && present_town) {
            await updatePrivacy('home_town', privacy, req.userId)
            await updatePrivacy('present_town', privacy, req.userId)
            const results = await User.updateOne({ _id: req.userId }, { $set: { home_town: home_town, present_town: present_town } });
            return res.json({
                status: 200,
                message: "Address updated successfully"
            })
        }
        else if (home_town) {
            await updatePrivacy('home_town', privacy, req.userId)
            const results = await User.updateOne({ _id: req.userId }, { $set: { home_town: home_town } });
            return res.json({
                status: 200,
                message: "Home town updated successfully"
            })
        } else if (present_town) {
            await updatePrivacy('present_town', privacy, req.userId)
            const results = await User.updateOne({ _id: req.userId }, { $set: { present_town: present_town } });
            return res.json({
                status: 200,
                message: "Present town updated successfully"
            })
        } else {
            return res.status(400).json({ errors: "Address is required" });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const deleteUserAbout = async (req, res) => {
    try {
        const results = await User.updateOne({ _id: req.userId }, { $set: { user_about: null } });
        return res.json({
            status: 200,
            message: "Bio deleted successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const deleteUserRelationStatus = async (req, res) => {
    try {
        const results = await User.updateOne({ _id: req.userId }, { $set: { relation_status: null } });
        return res.json({
            status: 200,
            message: "Relation status deleted successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }

}

const deleteUserLocation = async (req, res) => {
    try {
        let address = req.params.address
        if (address == 'home_town') {
            const results = await User.updateOne({ _id: req.userId }, { $set: { home_town: null } });
            return res.json({
                status: 200,
                message: "Home town deleted successfully"
            })
        } else if (address == 'present_town') {
            const results = await User.updateOne({ _id: req.userId }, { $set: { present_town: null } });
            return res.json({
                status: 200,
                message: "Present town deleted successfully"
            })
        }
        const results = await User.updateOne({ _id: req.userId }, { $set: { home_town: null, present_town: null } });
        return res.json({
            status: 200,
            message: "Address deleted successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const deleteNickName = async (req, res) => {
    try {
        const results = await User.updateOne({ _id: req.userId }, { $set: { user_nickname: null } });
        return res.json({
            status: 200,
            message: "Nick name deleted successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const deleteUserWebsite = async (req, res) => {
    try {
        const website_id = req.params.id
        if (!website_id) {
            return res.status(400).json({ errors: "Social media id is required" });
        }
        const results = await Websites.deleteOne({ _id: website_id });
        return res.json({
            status: 200,
            message: "Website deleted successfully"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const updatePrivacy = async (field_name, privacy, userId) => {
    let userPrivacySettingData = await UserPrivacySettings.findOne({
        $and: [
            { field_name: field_name },
            { user_id: userId }
        ]
    });

    if (userPrivacySettingData?.length > 0) {

        userPrivacySettingData.privacy = privacy;
        await userPrivacySettingData.save();
    }
    else {
        userPrivacySettingData = new UserPrivacySettings({
            field_name: field_name,
            privacy: privacy,
            user_id: userId,
        });
        await userPrivacySettingData.save();

    }

    return true;
}

module.exports = { getUserInfoByUsername, getUserInfo, getAllUsers, updateUserBirthDate, updateUserNickName, updateUserAbout, updateUserRelationStatus, userUserLocation, upsertUserWebsite, deleteUserAbout, deleteUserRelationStatus, deleteUserLocation, deleteNickName, deleteUserWebsite }