const mongoose = require('mongoose');

const Chat = require("../../models/Messenger/Chat")
const User = require("../../models/User")
const io = require("../../index");
const chatNotification = require('../../models/Messenger/ChatNotification');
const GroupChatInfo = require('../../models/Messenger/GroupChatInfo');
const multer = require("multer");
const GroupChat = require('../../models/Messenger/GroupChat');



// change messenger group pic codes functionality
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/messenger");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },

    // filename: function (req, file, cb) {
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    //   },
});

const uploadMessengerGroupMedia = multer({ storage: storage })


const saveUserPrivateMessageOnetoOne = async (req, res) => {
    console.log("message", req.body.message);

    try {
        // console.log("io",io);

        // Create a new Chat instance with the message details
        const chat = new Chat({
            message: req.body.message,
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id
        });

        await chat.save();





        // Respond to the client with the saved message data
        return res.json({
            status: 200,
            data: chat
        });
    } catch (err) {
        // Handle errors during the process
        console.error("Error saving private message:", err);

        // Respond with an error status and details
        return res.json({
            status: 500,
            error: err.message // Sending only the error message for security reasons
        });
    }


};

const replyUserPrivateMessageOnetoOne = async (req, res) => {
    try {
        const message_iD = req.params.messageId;
        const chat = new Chat({
            message: req.body.message,
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            replied_message_reference: {
                message_id: message_iD
            }
        });

        await chat.save();
        return res.json({
            status: 200,
            message: "Message Replied succesfull"
        })
    } catch (error) {
        console.log("error", error)
    }
}


const getUserPrivateMessageOnetoOne = async (req, res) => {
    const sender_id = req.params.sender_id;
    const receiver_id = req.params.receiver_id;
    try {
        const senderToReceiver = await Chat.find({ sender_id: sender_id, receiver_id: receiver_id })
            .populate('sender_id', 'first_name last_name email username profile_pic')
            .populate('receiver_id', 'first_name last_name email username profile_pic');

        const receiverToSender = await Chat.find({ sender_id: receiver_id, receiver_id: sender_id })
            .populate('sender_id', 'first_name last_name email username profile_pic')
            .populate('receiver_id', 'first_name last_name email username profile_pic');

        const allMessages = [...senderToReceiver, ...receiverToSender];

        return res.json({
            status: 200,
            messages: allMessages,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ errors: err });
    }
};


// const getIncludingMeAllChatUsers = async (req, res) => {
//     const userId = req.userId;

//     try {
//         // Step 1: Get distinct user ids from both sender_id and receiver_id
//         const senderDistinct = await Chat.distinct('sender_id', {
//             $or: [
//                 { sender_id: userId },
//                 { receiver_id: userId }
//             ]
//         });

//         const receiverDistinct = await Chat.distinct('receiver_id', {
//             $or: [
//                 { sender_id: userId },
//                 { receiver_id: userId }
//             ]
//         });

//         const distinctUserIds = Array.from(new Set([...senderDistinct, ...receiverDistinct]));

//         // Step 2: Find user documents based on the distinct ids
//         const users = await User.find({ _id: { $in: distinctUserIds } })
//             .select('_id first_name last_name email username profile_pic');

//         // Step 3: Get the last message for each user
//         const lastMessages = await Promise.all(users.map(async (user) => {
//             const lastMessage = await Chat.findOne({
//                 $or: [
//                     { sender_id: userId, receiver_id: user._id },
//                     { sender_id: user._id, receiver_id: userId }
//                 ]
//             }).sort({ createdAt: -1 }); // Sorting in descending order

//             return {
//                 user,
//                 lastMessage
//             };
//         }));

//         // // Sort the result array based on the createdAt timestamp in descending order
//         // const sortedLastMessages = lastMessages.sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);
//         // Remove elements with null lastMessage property
//         const validLastMessages = lastMessages.filter(item => item.lastMessage !== null);

//         // Sort the validLastMessages array based on the createdAt timestamp in descending order
//         const sortedLastMessages = validLastMessages.sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);


//         return res.json({
//             status: 200,
//             data: sortedLastMessages
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ errors: 'Internal Server Error' });
//     }
// };





// const getIncludingMeAllChatUsers = async (req, res) => {
//     const userId = req.userId;

//     try {
//         const userGroups = await GroupChatInfo.find({ members: userId }, '_id');
//         const groupIds = userGroups.map(group => group._id);

//         const lastMessages = await Promise.all(groupIds.map(async (groupId) => {
//             const lastMessage = await GroupChat
//                 .findOne({ group_id: groupId, $or: [{ sender_id: userId }] })
//                 .sort({ createdAt: -1 })
//                 .limit(1)
//                 .lean();

//             return lastMessage;
//         }));

//         const filteredLastMessages = lastMessages.filter(message => message !== null);

//         const sortedLastMessages = filteredLastMessages.sort((a, b) => {
//             const timestampA = new Date(a.createdAt).getTime();
//             const timestampB = new Date(b.createdAt).getTime();
//             return timestampB - timestampA;
//         });

//         // Populate group information
//         const populatedMessages = await GroupChat.populate(sortedLastMessages, {
//             path: 'group_id',
//             model: 'GroupChatInfo',
//             select: 'group_name group_image'
//         });

//         // Populate user information
//         const finalMessages = await GroupChat.populate(populatedMessages, {
//             path: 'sender_id',
//             model: 'User',
//             select: 'first_name last_name profile_pic'
//         });

//         return res.json({
//             status: 200,
//             data: finalMessages
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ errors: 'Internal Server Error' });
//     }
// };


// const getIncludingMeAllChatUsers = async (req, res) => {
//     const userId = req.userId;

//     try {
//         // Step 1: Get distinct user ids from both sender_id and receiver_id in single messages
//         const senderDistinct = await Chat.distinct('sender_id', {
//             $or: [
//                 { sender_id: userId },
//                 { receiver_id: userId }
//             ]
//         });

//         const receiverDistinct = await Chat.distinct('receiver_id', {
//             $or: [
//                 { sender_id: userId },
//                 { receiver_id: userId }
//             ]
//         });

//         const distinctUserIdsSingleMessages = Array.from(new Set([...senderDistinct, ...receiverDistinct]));

//         // Step 2: Find user documents based on the distinct ids for single messages
//         const usersSingleMessages = await User.find({ _id: { $in: distinctUserIdsSingleMessages } })
//             .select('_id first_name last_name email username profile_pic');

//         // Step 3: Get the last message for each user in single messages
//         const lastMessagesSingleMessages = await Promise.all(usersSingleMessages.map(async (user) => {
//             const lastMessage = await Chat.findOne({
//                 $or: [
//                     { sender_id: userId, receiver_id: user._id },
//                     { sender_id: user._id, receiver_id: userId }
//                 ]
//             }).sort({ createdAt: -1 }); // Sorting in descending order

//             return {
//                 user,
//                 lastMessage
//             };
//         }));

//         // Step 4: Get group messages
//         const userGroups = await GroupChatInfo.find({ members: userId }, '_id');
//         const groupIds = userGroups.map(group => group._id);

//         const lastMessagesGroupMessages = await Promise.all(groupIds.map(async (groupId) => {
//             const lastMessage = await GroupChat
//                 .findOne({ group_id: groupId, $or: [{ sender_id: userId }] })
//                 .sort({ createdAt: -1 })
//                 .limit(1)
//                 .lean();

//             return lastMessage;
//         }));

//         // Step 5: Combine single and group messages
//         const allLastMessages = [...lastMessagesSingleMessages, ...lastMessagesGroupMessages];

//         // Step 6: Filter and sort the combined messages
//         const validLastMessages = allLastMessages.filter(item => item && item.lastMessage !== null);
//         const sortedLastMessages = validLastMessages.sort((a, b) => {
//             const timestampA = a && a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
//             const timestampB = b && b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
//             return timestampB - timestampA;
//         });
//         const descendingSortedLastMessages = sortedLastMessages.reverse();

//         // return res.json({
//         //     status: 200,
//         //     data: descendingSortedLastMessages
//         // });
//         // After sorting the messages, populate group and user information
// const populatedMessages = await GroupChat.populate(sortedLastMessages, {
//     path: 'group_id',  // Assuming the field is 'group_id' in your GroupChat schema
//     model: 'GroupChatInfo',
//     select: 'group_name group_image'
// });

// const finalMessages = await Chat.populate(populatedMessages, {
//     path: 'sender_id',  // Assuming the field is 'sender_id' in your GroupChat schema
//     model: 'User',
//     select: 'first_name last_name profile_pic'
// });

// return res.json({
//     status: 200,
//     data: finalMessages
// });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ errors: 'Internal Server Error' });
//     }
// };
const getIncludingMeAllChatUsers = async (req, res) => {
    const userId = req.userId;

    try {
        // Step 1: Get distinct user ids from both sender_id and receiver_id in single messages
        const senderDistinct = await Chat.distinct('sender_id', {
            $or: [
                { sender_id: userId },
                { receiver_id: userId }
            ]
        });

        const receiverDistinct = await Chat.distinct('receiver_id', {
            $or: [
                { sender_id: userId },
                { receiver_id: userId }
            ]
        });

        const distinctUserIdsSingleMessages = Array.from(new Set([...senderDistinct, ...receiverDistinct]));

        // Step 2: Find user documents based on the distinct ids for single messages
        const usersSingleMessages = await User.find({ _id: { $in: distinctUserIdsSingleMessages } })
            .select('_id first_name last_name email username profile_pic');

        // Step 3: Get the last message for each user in single messages
        const lastMessagesSingleMessages = await Promise.all(usersSingleMessages.map(async (user) => {
            const lastMessage = await Chat.findOne({
                $or: [
                    { sender_id: userId, receiver_id: user._id },
                    { sender_id: user._id, receiver_id: userId }
                ]
            }).sort({ createdAt: -1 }); // Sorting in descending order

            return {
                type: 'single',  // Indicate the type of message
                user,
                lastMessage
            };
        }));

        // Step 4: Get group messages
        const userGroups = await GroupChatInfo.find({ members: userId }, '_id');
        const groupIds = userGroups.map(group => group._id);

        const lastMessagesGroupMessages = await Promise.all(groupIds.map(async (groupId) => {
            const lastMessage = await GroupChat
                .findOne({ group_id: groupId })
                .sort({ createdAt: -1 })
                .populate({
                    path: 'group_id',  // Assuming 'group_id' is the field in your GroupChat schema
                    model: 'GroupChatInfo',
                    select: 'group_name group_image'
                })
                .populate({
                    path: 'sender_id',  // Assuming 'group_id' is the field in your GroupChat schema
                    model: 'User',
                    select: 'first_name last_name profile_pic'
                })
                .limit(1)
                .lean();

            return {
                type: 'group',  // Indicate the type of message
                lastMessage
            };
        }));

        // Step 5: Combine single and group messages
        const allLastMessages = [...lastMessagesSingleMessages, ...lastMessagesGroupMessages];

        // Step 6: Filter and sort the combined messages
        const validLastMessages = allLastMessages.filter(item => item && item.lastMessage !== null);
        const sortedLastMessages = validLastMessages.sort((a, b) => {
            const timestampA = a && a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
            const timestampB = b && b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
            return timestampB - timestampA;
        });

        return res.json({
            status: 200,
            data: sortedLastMessages
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
};



const deleteUserPrivateMessageOnetoOne = async (req, res) => {
    try {
        const message_id = req.params.messageId;

        const result = await Chat.findByIdAndUpdate(message_id, { $set: { message_delete_status: 1 } },
            { new: true });

        if (result) {
            return res.status(200).json({
                status: 200,
                message: "Chat deleted"
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "Chat not found"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: "Internal Server Error"
        });
    }
}

const updateUserPrivateMessageOnetoOne = async (req, res) => {
    try {
        const chat_id = req.params.messageId;
        const message_data = req.body.message;
        const result = await Chat.findByIdAndUpdate(chat_id, { $set: { message: message_data } }, { new: true })
        return res.json({
            status: 200,
            updated_data: result
        })
    }
    catch (error) {
        return res.json({
            status: 400,
            erorr: error
        })
    }
}


const allChat = async (req, res) => {
    try {
        const all_chat = await Chat.find();
        return res.json({
            status: 200,
            all_chats: all_chat
        })

    } catch (error) {
        console.log("eror", error)
    }
}
const deleteAllChat = async (req, res) => {
    // try{
    //     const delete_data= await Chat.deleteMany({});
    //     return res.json({
    //         status:200,
    //         message:"deleted all chats"
    //     })
    // }
    // catch(error){
    //     console.log(error)
    // }
    try {
        // Retrieve the total count of messages
        const totalMessagesCount = await Chat.countDocuments();

        // Calculate the starting index for the deletion
        const startIndex = Math.max(0, totalMessagesCount - 80);

        // Find and delete the last 80 messages
        const deleteData = await Chat.deleteMany({}, { sort: { timestamp: 1 }, skip: startIndex });

        return res.json({
            status: 200,
            message: "Deleted the last 80 messages",
            deletedCount: deleteData.deletedCount
        });
    } catch (error) {
        console.log("Deletion Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const getAllPrivateOneToOneMessageNotification = async (req, res) => {
    try {
        const auth_id = req.userId;
        const notifications = await chatNotification.find({ receiver_id: auth_id })

        res.json({
            status: 200,
            notifications: notifications
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteAllPrivateOneToOneMessageNotification = async (req, res) => {
    try {
        const auth_id = req.userId;

        await chatNotification.deleteMany({ receiver_id: auth_id });

        res.json({ status: 200, message: 'Notifications deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const saveGroupChatInfo = async (req, res) => {
    try {
        const authId = req.userId
        const data = {
            group_name: req.body.group_name,
            creatorId: authId,
            members: req.body.members
        }

        const group_chat_info = new GroupChatInfo(data);

        await group_chat_info.save();

        return res.json({
            status: 200,
            message: "Group chat info created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};
const getAllGroupChatInfo = async (req, res) => {
    try {
        const authUserId = req.userId;
        const groupsWithUser = await GroupChatInfo.find({ members: authUserId });
        return res.json({
            status: 200,
            message: "Group chat info retrieved successfully",
            all_group: groupsWithUser,
        });
    } catch (error) {
        console.log('error', error)
    }
}

const updateGroupChatInfo = async (req, res) => {
    try {
        const group = await GroupChatInfo.findById(req.params.groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        if (req.body.group_name) {
            group.group_name = req.body.group_name;
        }

        if (req.file) {
            group.group_image = req.file.filename;
        }

        await group.save();

        return res.json({ message: "Group information updated successfully", status: 200, data: group });
    } catch (error) {
        console.error("Error updating group information:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllGroupMessagesIncludingMe = async (req, res) => {
    try {
        const userId = req.userId;
        const userGroups = await GroupChatInfo.find({ members: userId }).select('_id');

        const groupMessages = await GroupChat.find({ group_id: { $in: userGroups } })
            .populate('group_id', 'group_name group_image')
            .populate('sender_id', 'username')
            .sort({ createdAt: 'desc' });

        res.json({
            status: 200,
            group_messages: groupMessages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

const getGroupChatMessages = async (req, res) => {
    try {
        // const userId = req.userId;
        const groupId = req.params.groupId;
        // const userGroups = await GroupChatInfo.find({ members: userId }).select('_id');

        const groupMessages = await GroupChat.find({ group_id: groupId })
            .populate('group_id', 'group_name group_image')
            .populate('sender_id', 'username')
            .sort({ createdAt: 'desc' });

        res.json({
            status: 200,
            group_messages: groupMessages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

const getGroupChatInformation = async (req, res) => {
    try {
        // const userId = req.userId;
        const groupId = req.params.groupId;
        // const userGroups = await GroupChatInfo.find({ members: userId }).select('_id');

        const groupMessages = await GroupChatInfo.findById(groupId)
            .populate("members", 'first_name last_name username profile_pic last_login')

        res.json({
            status: 200,
            group_messages: groupMessages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

const deleteGroupSingleMessageOneToOne = async (req, res) => {
    try {
        const message_id = req.params.messageId;

        const result = await GroupChat.findByIdAndUpdate(message_id, { $set: { message_delete_status: 1 } },
            { new: true });

        if (result) {
            return res.status(200).json({
                status: 200,
                message: "Chat deleted"
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: "Chat not found"
            });
        }
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = { saveUserPrivateMessageOnetoOne, getUserPrivateMessageOnetoOne, getIncludingMeAllChatUsers, allChat, deleteAllChat, deleteUserPrivateMessageOnetoOne, updateUserPrivateMessageOnetoOne, replyUserPrivateMessageOnetoOne, getAllPrivateOneToOneMessageNotification, deleteAllPrivateOneToOneMessageNotification, saveGroupChatInfo, getAllGroupChatInfo, uploadMessengerGroupMedia, updateGroupChatInfo, getAllGroupMessagesIncludingMe, getGroupChatMessages, getGroupChatInformation, deleteGroupSingleMessageOneToOne }
