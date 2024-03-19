const Followers = require('../models/Followers');
const User = require('../models/User');
const Notification = require('../models/Notification/Notification');

const followerUnfollowerRequest = async (req, res) => {
    const { follower_user_id, follow_unfollow_status } = req.body;
    try {
        const isFollowExit = await Followers.find({
            $and: [
                { follower_user_id: req.body.follower_user_id },
                { user_id: req.userId }
            ]
        });

        if (isFollowExit.length > 0) {

            const follower = await Followers.findById({ _id: isFollowExit[0]._id });
            follower.follow_unfollow_status = req.body.follow_unfollow_status;
            await follower.save();
        } else {
            const followerReqest = new Followers({
                user_id: req.userId, follower_user_id, follow_unfollow_status, data_status: 1, user_id: req.userId
            });

            await followerReqest.save();
        }

        if (req.body.follow_unfollow_status == 1) {
            const notification = new Notification({
                notification_type: "follow_request",
                notification_data: {
                    notification_type: "follow_request",
                    user_id: req.userId,
                    follow_user_id: req.body.follower_user_id,
                },
                notification_sender_id: req.userId,
                notification_receiver_id: req.body.follower_user_id,
            });

            await notification.save();
        }



        return res.json({
            status: 200,
            message: "Successfully Follower."
        });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }
}

const isFollower = async (req, res) => {
    const results = await Followers.find({
        $and: [
            { follower_user_id: req.body.id },
            { user_id: req.userId },
            { follow_unfollow_status: 1 },
        ]
    });
    //0 == No , 1 = Acceppt
    return res.json({
        status: 200,
        message: "Follower Request",
        results: results.length > 0 ? 1 : 0
    });
}






const userfollowerCount = async (req, res) => {
    const results = await Followers.count({ "follower_user_id": req.body.userId, "follow_unfollow_status": 1 });
    //0 == No , 1 = Acceppt
    return res.json({
        status: 200,
        message: "Follower Count",
        results: results
    });
}

const followerList = async (req, res) => {

    const userResults = await User.find({ "username": req.body.username });

    const userId = userResults[0]._id;
    const results = await Followers.find({
        "follower_user_id": userId,
        "follow_unfollow_status": 1
    }).populate('user_id');
    //0 == No , 1 = Acceppt
    return res.json({
        status: 200,
        message: "Follower list",
        results: results
    });
}


const followingList = async (req, res) => {
    const userResults = await User.find({ "username": req.body.username });

    const userId = userResults[0]._id;
    const results = await Followers.find({
        "user_id": userId,
        "follow_unfollow_status": 1
    }).populate('follower_user_id');

    return res.json({
        status: 200,
        message: "Following list",
        results: results
    });
}
const unfollowUser = async (req, res) => {
    try {
        const unFriend = await Followers.deleteOne({ _id: req.body.requestId })
        return res.json({
            status: 200,
            message: "UnFollowing successfully"
        });
    } catch (error) {

        return res.json({
            status: 201,
            message: "Something went wromg"
        });

    }
}

module.exports = {
    followerUnfollowerRequest, isFollower, userfollowerCount, followingList, followerList, unfollowUser
}