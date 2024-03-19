const User = require('../models/User')
const Friends = require('../models/Friends');
const Notification = require('../models/Notification/Notification');

const suggestionList = async (req, res) => {

    // console.log(concatenatedValue);
    // console.log(req.userId);
    try {

        const results = await Friends.find({
            $or: [
                { "user_id": req.userId },
                { "connected_user_id": req.userId }
            ]
        });
        let concatenatedValue = [];
        concatenatedValue.push(req.userId);
        results.forEach((result) => {
            if (result.connected_user_id == req.userId) {
                concatenatedValue.push(result.user_id);
            } else {
                concatenatedValue.push(result.connected_user_id);
            }

        });
        let limit = undefined;
        if (Number(req.query.limit)) {
            limit = Number(req.query.limit)
        }
        const userlist = await User.find({ "_id": { $nin: concatenatedValue } }).limit(limit);

        return res.json({
            status: 200,
            userlist: userlist,
            results: concatenatedValue,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}



const sendFriendRequest = async (req, res) => {
    const { connected_user_id } = req.body;
    try {

        console.log({ user_id: req.userId });
        const friendReqest = new Friends({
            connected_user_id, accept_reject_status: 0, data_status: 0, user_id: req.userId
        });

        // const result = await Friends.deleteMany({});

        await friendReqest.save();

        const notification = new Notification({
            notification_type: "friend_request",
            notification_data: {
                notification_type: "friend_request",
                post_id: friendReqest._id,
                user_id: req.userId,
                post_single_item_id: null,
            },
            notification_sender_id: req.userId,
            notification_receiver_id: connected_user_id,
        });

        await notification.save();


        return res.json({
            status: 200,
            message: "Successfully Send Request"
        });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}


const isRequestOrFreind = async (req, res) => {
    const userId = req.userId;
    const friendId = req.body.id;
    const friendlist = await Friends.find({
        $and: [
            {
                $or: [
                    { connected_user_id: friendId, user_id: userId },
                    { connected_user_id: userId, user_id: friendId }
                ]
            }
        ]
    })
        .populate('user_id connected_user_id')
        .sort({ _id: -1 })

    return res.json({
        status: 200,
        message: "Successfully Send Request",
        results: friendlist.length > 0 ? friendlist[0]?.accept_reject_status : ''
    });
}


const friendList = async (req, res) => {
    try {
        const results = await User.findOne({ "username": req.body.username });
        // console.log("results__", results);
        if (!results?._id) throw new Error('User not found')
        const userId = results._id;

        const friendCount = await Friends.count({
            $and: [
                { accept_reject_status: 1 },
                {
                    $or: [
                        { connected_user_id: userId },
                        { user_id: userId }
                    ]
                }
            ]
        });
        let friendlist = {};
        if (req.body.limit > 0) {
            friendlist = await Friends.find({
                $and: [
                    { accept_reject_status: "1" },
                    {
                        $or: [
                            { connected_user_id: userId },
                            { user_id: userId }
                        ]
                    }
                ]
            })
                .populate('user_id', '_id first_name last_name username profile_pic gender')
                .populate('connected_user_id', '_id first_name last_name username profile_pic gender')
                .sort({ _id: -1 }).limit(req.body.limit);

        } else {
            friendlist = await Friends.find({
                $and: [
                    { accept_reject_status: "1" },
                    {
                        $or: [
                            { connected_user_id: userId },
                            { user_id: userId }
                        ]
                    }
                ]
            })
                .populate('user_id', '_id first_name last_name username profile_pic gender')
                .populate('connected_user_id', '_id first_name last_name username profile_pic gender')
                .sort({ _id: -1 });

        }

        res.json({
            status: 200,
            message: "Friend List Found",
            results: friendlist,
            friendCount: friendCount
        });
    } catch (err) {
        res.json({
            status: 400,
            message: err.message
        });
    }
}


const friendRequestList = async (req, res) => {
    const results = await User.find({ "username": req.body.username });

    const userId = req.userId;

    const friendCount = await Friends.count({
        $and: [
            { accept_reject_status: "0" },
            { connected_user_id: userId }
        ]
    });
    friendlist = await Friends.find({
        $and: [
            { accept_reject_status: "0" },
            { connected_user_id: userId }
        ]
    }).populate('user_id connected_user_id').sort({ _id: -1 });



    return res.json({
        status: 200,
        message: "Friend List Found",
        results: friendlist,
        friendCount: friendCount
    });
}


const acceptFriendRequest = async (req, res) => {

    if (req.body.accept_reject_ind == 0) {
        const unFriend = await Friends.deleteOne({ _id: req.body.request_id })
        return res.json({
            status: 200,
            message: "You decline friend request successfully"
        });
    } else {
        let acceptRejct = await Friends.findOneAndUpdate
            ({ _id: req.body.request_id },
                { accept_reject_status: req.body.accept_reject_ind }
            );


        // console.log('user',user)
        await acceptRejct.save();

        return res.json({
            status: 200,
            message: "You accept friend request successfully"
        });
    }

}


const unFriendUser = async (req, res) => {
    try {
        const unFriend = await Friends.deleteOne({ _id: req.body.requestId })
        return res.json({
            status: 200,
            message: "Unfriend successfully"
        });
    } catch (error) {

        return res.json({
            status: 201,
            message: "Something went wromg"
        });

    }
}

module.exports = { suggestionList, sendFriendRequest, isRequestOrFreind, friendList, friendRequestList, acceptFriendRequest, unFriendUser }