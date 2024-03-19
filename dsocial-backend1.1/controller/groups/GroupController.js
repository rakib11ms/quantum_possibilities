const mongoose = require('mongoose');
const JoinedGroup = require('../../models/groups/JoinedGroups.js');
const GroupMember = require("../../models/groups/GroupMember.js");
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
const multer = require("multer");
const fs = require("fs");
const Group = require("../../models/groups/Group.js");
// const GroupsJoined = require("../../models/groups/GroupJoined.js");
const { StringHelper } = require("../../models/Common/StringHelper.js");
const GroupInvitation = require("../../models/groups/GroupInvitation.js");
const GroupMedia = require('../../models/groups/GroupMedia.js');
const GroupPost = require('../../models/groups/GroupPost.js');
const Notification = require('../../models/Notification/Notification.js');
const Friends = require('../../models/Friends.js');
const { default: axios } = require('axios');
const GroupEvent = require('../../models/groups/GroupEvent.js');
// Define the destination directory
const uploadDirectory = "uploads/group/";

const stringHelper = new StringHelper();
// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// upload group cover pic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/group");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadGroupCoverPicMedia = multer({ storage: storage });

const groupEventStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/groupEvent");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadGroupPhoto = multer({ storage: groupEventStorage });

const handleSendInvitation = async (req, res) => new Promise(async (resove, reject) => {
  try {
    const { user_id_arr, group_id, type } = req.body;
    // console.log("req.body__", req.body);
    if (!group_id || !type) throw new Error('Parameter missing !!')

    const group = await Group.findById(group_id);

    if (!group) throw new Error('Group not found !!')

    if (type?.toString() === 'join') {

      if (group.group_privacy === 'public') {
        const isMember = await GroupMember.findOne({
          group_member_user_id: req.userId,
          group_id: group._id
        });
        if (isMember) {
          return res.json({ status: 200, message: 'You already member of this group' });
        }
        const newGroupMember = new GroupMember({
          group_id: group._id,
          group_member_user_id: req.userId,
          status: 'active',
          created_by: req.userId,
          is_accepted: true,
          role: 'member'
        })
        await newGroupMember.save()
      }
      else {
        const alreadySeandedInvitation = await GroupInvitation.findOne({
          group_id: group._id,
          user_id: req.userId
        }).select({ user_id: 1, _id: 0 })

        if (alreadySeandedInvitation?.accept_invitation && alreadySeandedInvitation.accept_invitation == 1) throw new Error('Join request already sended !')

        const newJoin = new GroupInvitation({
          group_id: group._id,
          user_id: new mongoose.Types.ObjectId(req.userId),
          created_by: new mongoose.Types.ObjectId(req.userId),
          type: 'join'
        })
        const newJoinRes = await newJoin.save()
        const newNotfication = new Notification({
          notification_type: "group_joining",
          resource_title: 'GroupInvitation',
          resource_id: newJoinRes._id,
          resource_object: {
            group: {
              _id: group._id,
              group_name: group.group_name
            }
          },
          notification_sender_id: req.userId,
          notification_receiver_id: group.group_created_user_id,
        })
        await newNotfication.save()
      }
    }
    else if (type?.toString() === 'invite') {

      const requestObj = user_id_arr;
      const GroupInvitationContainer = []

      for (const checkboxId in requestObj) {
        if (requestObj[checkboxId] === true) {

          GroupInvitationContainer.push({
            group_id: group._id,
            user_id: new mongoose.Types.ObjectId(checkboxId),
            created_by: new mongoose.Types.ObjectId(req.userId),
            type: 'invite'
          })
        }
      }
      const alreadySeandedInvitation = await GroupInvitation.find({
        group_id: group._id,

        user_id: {
          $in: GroupInvitationContainer.map(i => i.user_id)
        },
        accept_invitation: { $in: [null] },
      }).select({ user_id: 1, _id: 0 })
      console.log("GroupInvitationContainer__", GroupInvitationContainer);
      console.log("alreadySeandedInvitation__", alreadySeandedInvitation);


      const mainGroupInvitationContainer = []

      for (const i of GroupInvitationContainer) {
        const temp = alreadySeandedInvitation.find(j => j?.user_id?.toString() == i?.user_id?.toString())

        if (!temp) {
          mainGroupInvitationContainer.push(i)
        }
      }

      console.log("mainGroupInvitationContainer__", mainGroupInvitationContainer);


      const groupSendedInvitation = await GroupInvitation.insertMany(mainGroupInvitationContainer)
      console.log("groupSendedInvitation__", groupSendedInvitation);
      const invitedMemberId = groupSendedInvitation.map(i => ({
        notification_type: "group_invitation",
        resource_title: 'GroupInvitation',
        resource_id: i._id,
        resource_object: {
          group: {
            _id: group._id,
            group_name: group.group_name
          }
        },
        notification_sender_id: req.userId,
        notification_receiver_id: i.user_id,
      }))
      const noti = await Notification.insertMany(invitedMemberId)
      console.log("noti__", noti);
    }
    else {
      throw new Error('Invalid Request Type !!')
    }
    resove({ status: 200, message: 'Group Invitation Send succcessfully' });

  }
  catch (err) {
    console.log(err);
    reject({
      message: err.message,
      status: 500,
    });
  }
})
const createGroups = async (req, res) => {
  try {
    const { group_name, group_privacy, location, zip_code, group_description, address } = req.body

    console.log("req.body__", req.body);
    // return;
    const data = {
      group_name: group_name,
      group_privacy: group_privacy,
      group_cover_pic: req.file.filename,
      location: location,
      zip_code: zip_code,
      group_description: group_description,
      group_created_user_id: req.userId,
      created_by: req.userId,
      participant_approve_by: null,
      post_approve_by: null
    }
    const validFields = ['group_hide', 'status', 'ip_address', 'created_date', 'address']

    const body = req.body
    for (const index in body) {

      if (validFields.includes(index) && body[index]) {
        data[index] = body[index]
      }

    }

    console.log("data__", data);
    const groups = new Group(data);

    const group = await groups.save();

    const invited_users = req.body.invited_users;
    console.log("invited_users__", invited_users);
    // Check if invited_users is an array before using map
    const newGroupMem = new GroupMember();
    newGroupMem.group_member_user_id = req.userId;
    newGroupMem.group_id = group._id;
    newGroupMem.is_accepted = true;
    newGroupMem.status = 'active';
    newGroupMem.role = 'admin';
    await newGroupMem.save();

    if (Array.isArray(invited_users)) {

      const temp = {}
      for (const i of invited_users) {
        temp[i] = true
      }
      req.body.user_id_arr = temp
      req.body.group_id = group._id
      req.body.type = "invite"
      await handleSendInvitation(req, res)

    }

    res.status(200).json({ message: "Group created successfully", status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: error.message,
    });
  }
};
const editGroup = async (req, res) => {
  try {
    const body = req.body;
    const { group_id } = req.params

    const validFields = ['group_name', 'group_description', 'location', 'visibility', 'group_privacy', 'participant_approve_by', 'custom_link', 'post_approve_by', 'is_post_approve']
    const data = {}

    for (const i in body) {
      if (validFields.includes(i)) {
        if (i == 'visibility') {
          if (['visible', 'invisible'].includes(body[i])) data[i] = body[i]
        }
        else if (i == 'group_privacy') {
          if (['private', 'public'].includes(body[i])) data[i] = body[i]
        }
        else if (i == 'participant_approve_by') {
          if (['admin&monderator', 'admin', 'monderator'].includes(body[i])) data[i] = body[i]
        }
        else {
          data[i] = body[i]
        }
      }
    }
    // console.log(req.body,"data__",data);
    const dd = await Group.findOneAndUpdate(
      { _id: group_id },
      {
        $set: data
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    // console.log("dd__",dd);
    res.status(200).json({ status: 200, message: 'Group information updated succcessfully' });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}
const deleteGroup = async (req, res) => {
  try {

    const { group_id } = req.params
    await Group.findOneAndUpdate(
      { _id: group_id },
      {
        $set: {
          deleted_at: new Date()
        }
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    // console.log("dd__",dd);
    res.status(200).json({ status: 200, message: 'Group deleted succcessfully' });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}
const sendGroupInvitation = async (req, res) => {
  try {
    await handleSendInvitation(req, res)

    res.json({ status: 200, message: 'Group Invitation Send succcessfully' });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}
const changeOnlyProfilePic = async (req, res) => {
  try {
    const target_user = await User.findById(req.userId);
    // console.log('target user',target_user)
    if (!target_user) {
      return res.json({ status: 400, message: "User not found" });
    }
    if (!req.file || !req.file.filename) {
      return res.json({ status: 400, message: "Invalid file upload" });
    }
    console.log("Before user update");

    const fileName = req.file.filename;
    console.log(fileName);
    target_user.profile_pic = fileName;
    await target_user.save();
    console.log("Before after update");
    const user_info = await User.findById(req.userId)
      .populate("gender religion")
      .exec();
    console.log("Before post update");
    const post = new Post({
      // description: 'Profile Pic change',
      user_id: req.userId,
      post_type: "profile_picture",
      post_privacy: "public",
    });
    await post.save();

    console.log("after post update");

    console.log("Before post media update");
    const postMedia = new PostMedia({
      post_id: post._id,
      media: fileName,
      caption: "Profile Pic change",
    });
    await postMedia.save();

    console.log("after Media update");

    return res.json({
      status: 200,
      user_info: [user_info],
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({
        message: "An error occurred while updating the profile picture",
      });
  }
};

// const getAllGroups = async (req, res) => {

//     const JoinedGroups = await JoinedGroup.find({ "user_id": req.userId });
//     let JoinedGroupsArr = [];
//     JoinedGroups.forEach((result) => {
//         JoinedGroupsArr.push(result.group_id);
//     });

//     const groups = await Group.aggregate([
//         {
//             $match: {
//                 _id: { $nin: JoinedGroupsArr },
//             },
//         },
//         {
//             $lookup: {
//                 from: 'JoinedGroups',
//                 localField: '_id',
//                 foreignField: 'group_id',
//                 as: 'groups',
//             },
//         },
//         {
//             $project: {
//                 _id: 1,
//                 group_name: 1,
//                 group_privacy: 1,
//                 group_cover_pic: 1,
//                 group_description: 1,
//                 joinedGroupsCount: { $size: '$groups' },
//             },
//         },
//     ]);

//     res.status(200).json({
//         message: 'All Group List',
//         status: 200,
//         data: groups
//     });
// }

const changeGroupCoverPic = async (req, res) => {
  try {
    const target_group = await Group.findById(req.body.groupId);

    if (!target_group) {
      return res.json({ status: 400, message: "Group not found" });
    }
    if (!req.file || !req.file.filename) {
      return res.json({ status: 400, message: "Invalid file upload" });
    }
    target_group.cover_pic = req.file.filename;
    await target_group.save();
    const user_info = await Group.findById({ _id: req.body.groupId }).exec();

    return res.json({
      status: 200,
      user_info: [user_info],
      message: "Cover picture updated successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({
        message: "An error occurred while updating the profile picture",
      });
  }
};

const GroupJoin = async (req, res) => {
  //const stringHelper = new StringHelper();
  try {
    const groupJoined = new GroupsJoined({
      group_id: req.body.groupId,
      status: stringHelper.join,
      user_id: req.body.userId,
    });
    await groupJoined.save();
    res.status(200).json({
      message: stringHelper.groupJoinSuccess,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      errors: error.message,
      message: stringHelper.errorMsg,
    });
  }
};

const LeaveGroup = async (req, res) => {
  try {
    const groupJoined = new GroupsJoined({
      group_id: req.body.groupId,
      status: stringHelper.leave,
      user_id: req.body.userId,
    });
    await groupJoined.save();
    res.status(200).json({
      message: stringHelper.groupLeaveSuccess,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      errors: error.message,
      message: stringHelper.errorMsg,
    });
  }
};

const getAllJoinedGroup = async (req, res) => {
  const groupsJoined = await GroupsJoined.find({ user_id: req.userId });
  let groupJoinedArr = [];
  groupsJoined.forEach((result) => {
    groupJoinedArr.push(result.group_id);
  });

  const groups = await Group.aggregate([
    {
      $match: {
        _id: { $in: groupJoinedArr },
      },
    },
    {
      $lookup: {
        from: "joinedgroups",
        localField: "_id",
        foreignField: "group_id",
        as: "groupMembers",
      },
    },
    {
      $project: {
        _id: 1,
        group_name: 1,
        group_cover_pic: 1,
        group_description: 1,
        groupMembersCount: { $size: "$groupMembers" },
      },
    },
  ]);

  res.status(200).json({
    message: "All Joined Group List",
    status: 200,
    data: groups,
  });
};

const getMyGroups = async (req, res) => {
  try {
    const myGroups = await GroupMember.find({
      group_member_user_id: req.userId,
      is_accepted: true,
      status: 'active'
    })
      .populate('group_id')
      // .populate({
      //   path:'group_id',
      //   model:'Group',
      //   options:{ as : 'Groupssssssss'}
      // })
      .populate('group_member_user_id', 'username')
      .select('group_id');
    // const myGroups = await GroupMember.aggregate([
    //   {
    //     $match: {
    //       group_member_user_id: new mongoose.Types.ObjectId(req.userId),
    //       is_accepted: true,
    //       status: 'active'
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: 'groups',
    //       localField: 'group_id',
    //       foreignField: '_id',
    //       as: 'Group'
    //     }
    //   },
    //   {
    //     $project: {
    //       Group: 1
    //     }
    //   }
    // ]
    // )
    // .populate('group_id')
    // .populate('group_member_user_id', 'username')
    // .select('group_id');


    res.status(200).json({
      message: "My group List",
      status: 200,
      myGroups: myGroups.filter((value, index, self) =>
        self.findIndex(v => v?.group_id === value?.group_id) === index
      ),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getGroupsDetailsById = async (req, res) => {
  // const groupDetails2 = await Group.findOne({
  //   _id: req.body.group_id,
  // });
  try {
    const { group_id } = req.body;
    const user_id = req.userId;

    // console.log("req.body__", req.body);

    const groupDetails = await GroupMember.findOne({
      group_id: group_id,
      group_member_user_id: user_id,
      status: 'active'

    }).select({ _id: 1, group_id: 1 }).populate('group_id');

    // console.log("groupDetails__", groupDetails);

    const groupMembersCount = await GroupMember.count({
      group_id: group_id,
      is_accepted: true
    })

    const temp = await Group.findById({
      _id: group_id,
    });
    // console.log("temp__", temp);

    if (!groupDetails) {
      if (!temp) {
        throw new Error('Group details not found')
      }
      else {

        return res.status(200).json({
          message: "Group details",
          status: 200,
          groupMembers: {
            count: groupMembersCount,
            // data: groupMembers
          },
          isMember: false,
          groupOwner_id: temp.group_created_user_id,
          groupDetails: { group_id: temp },
          groupMedia: []
        });
      }
    }

    const LastSixGroupPost = await GroupPost.find({ group_id: groupDetails?.group_id?._id }).select({ _id: 1 })

    const groupMedia = await GroupMedia.find({
      group_post_id: { $in: LastSixGroupPost.map(i => i._id) }
    }).sort({ createdAt: -1 })
      .limit(6)

    res.status(200).json({
      message: "Group details",
      status: 200,
      groupMembers: {
        count: groupMembersCount,
        // data: groupMembers
      },
      isMember: true,
      groupOwner_id: temp.group_created_user_id,
      groupDetails: groupDetails,
      groupMedia
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
};

const getAllGroups = async (req, res) => {

  try {
    let userId;
    if (req?.headers?.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token, process.env.SECRET);
        userId = verify.userId;
      } catch (e) {
        userId = undefined
      }
    }
    let JoinedGroups;
    if (userId) {
      const queryArr = await GroupMember.find({
        group_member_user_id: new mongoose.Types.ObjectId(userId),
        status: 'active',
        is_accepted: true
      });
      JoinedGroups = queryArr.map(i => i.group_id)
      console.log(userId, "JoinedGroups__", JoinedGroups);

      const alreadySeandedInvitation = await GroupInvitation.find({
        user_id: new mongoose.Types.ObjectId(userId),
        accept_invitation: { $in: [null] },
      })
      console.log("alreadySeandedInvitation__", alreadySeandedInvitation);
      for (const i of alreadySeandedInvitation) {
        if (i?.group_id) JoinedGroups.push(i.group_id)
      }
    }

    const groups = await Group.aggregate([
      {
        $match: {
          _id: { $nin: JoinedGroups },
        },
      },
      {
        $lookup: {
          from: "groupmembers",
          localField: "_id",
          foreignField: "group_id",
          as: "groups",
        },
      },
      {
        $project: {
          _id: 1,
          group_name: 1,
          group_privacy: 1,
          group_cover_pic: 1,
          group_description: 1,
          joinedGroupsCount: { $size: "$groups" },
        },
      },
    ]);

    res.status(200).json({
      message: "All Group List",
      status: 200,
      data: groups,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
};
const sendGroupInvitationtoMultipleUser = async (req, res) => {
  const requestObj = req.body.user_id_arr;
  if (requestObj.length < 1)
    return res.json({
      status: 404,
      message: "There is no user to send invitation.",
    });

  try {
    for (const checkboxId in requestObj) {
      const groupInvitation = GroupInvitation({
        group_id: req.body.groupId,
        user_id: requestObj[checkboxId],
        created_by: req.body.userId,
      });
      await groupInvitation.save();
    }
  } catch (error) {
    return res.status(500).json({
      errors: error.message,
      message: stringHelper.errorMsg,
    });
  }

  return res.json({
    status: 200,
    message: "page Invitation Send succcessfully",
  });
};

const GroupInvitationStatusChange = async (req, res) => {
  try {
    const { invitationId, status, notification_id, type } = req.body
    console.log("req.body__", req.body);

    const validType = ['invite', 'join']

    if (!invitationId || !status || !notification_id || !type) throw new Error('Parameter missing !!')

    if (!validType.includes(type)) throw new Error('Invalid Type !')

    const query = {}
    if (status === 'accept') query['accept_invitation'] = 1

    if (status === 'decline') {
      query['accept_invitation'] = 0;
    }

    const groupInvitation = await GroupInvitation.findOneAndUpdate(
      { _id: invitationId },
      {
        $set: query
      },
      {
        new: true,
        useFindAndModify: false,
      }
    ).populate('group_id');
    console.log("groupInvitation__", groupInvitation)

    const group_member_user_id = (type == 'invite') ? req.userId : groupInvitation.user_id

    if (status === 'accept') {
      const newGroupMember = new GroupMember()
      newGroupMember.group_member_user_id = group_member_user_id;
      newGroupMember.group_id = groupInvitation.group_id;
      newGroupMember.is_accepted = true;
      newGroupMember.status = 'active';
      newGroupMember.role = 'member'
      await newGroupMember.save();
    }
    const group_info = groupInvitation?.group_id

    console.log("group_info__", group_info);

    const newNotification = new Notification({
      notification_type: "group_invitation_status",
      message: status === 'accept' ? "accepted" : "declined",
      notification_sender_id: req.userId,
      notification_receiver_id: type == 'invite' ? groupInvitation.created_by : groupInvitation.user_id,
      resource_object: {
        group: JSON.parse(JSON.stringify(group_info)),
      }
    })

    await newNotification.save();

    await Notification.deleteOne({ _id: notification_id })

    res.status(200).json({
      message: `Group Invitation ${status} successfully`,
      status: 200,
    });
  }
  catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.message,
      status: 400,
    });
  }
};

const updateGroupInfo = async (req, res) => {
  try {
    let groups = await Group.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          group_name: req.body.groupName,
          group_privacy: req.body.groupPrivacy,
          group_description: req.body.description,
        }
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    groups = await Group.findById({ _id: req.body._id });
    res.status(200).json({
      message: "group Info Updated Successfully",
      status: 200,
      pageDetails: groups,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" + error });
  }
};

const changeGroupStatus = async (req, res) => {
  try {
    const group = await Group.findById(req.body.groupId);
    if (!group) {
      res.status(404).json({ error: "An error occurred" });
    }
    const newStatus = group.status.toLocaleLowerCase() === "active" ? "inactive" : "active";

    let groups = await Group.findOneAndUpdate(
      { _id: req.body.groupId },
      {
        status: newStatus,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    groups = await Group.findById({ _id: req.body.groupId });
    res.status(200).json({
      message: "group Info Updated Successfully",
      status: 200,
      pageDetails: groups,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" + error });
  }
};

const groupInvitationFriendList = async (req, res) => {
  try {
    const { group_id } = req.body;
    const userId = req.userId;
    console.log("req.body__", req.body);

    const friendlist = await Friends.find({
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


    let concatenatedValue = [];
    concatenatedValue.push(new mongoose.Types.ObjectId(userId));
    friendlist.forEach((result) => {
      if (result.connected_user_id._id.toString() == userId.toString()) {
        console.log();
        concatenatedValue.push(result.user_id._id);
      } else {
        concatenatedValue.push(result.connected_user_id._id);
      }

    });

    console.log("concatenatedValue ", concatenatedValue);

    const groupOwner = await Group.findById(group_id).select('group_created_user_id')

    const alreadySeandedInvitation = await GroupInvitation.find({
      $and: [
        { group_id: group_id },
        { accept_invitation: { $in: [null] } },
        { user_id: { $in: concatenatedValue } },
      ]
    });
    // select({ user_id: 1 })


    console.log('alreadySeandedInvitation___', alreadySeandedInvitation);

    const sendedInvitationFriendsUserIdList = alreadySeandedInvitation.map(i => i?.user_id?.toString())

    sendedInvitationFriendsUserIdList.push(groupOwner.group_created_user_id.toString())

    const filteredFrientList = friendlist.filter(i => !sendedInvitationFriendsUserIdList.includes(i.user_id._id.toString() === userId.toString() ? i.connected_user_id._id.toString() : i.user_id._id.toString()))
    // console.log("filteredFrientList__", filteredFrientList);
    res.json({
      status: 200,
      message: "Friend List Found",
      results: filteredFrientList,
      friendCount: filteredFrientList.length
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      message: err.message
    });
  }
}

const saveEvent = async (req, res) => {
  try {

    const { title,
      start_date,
      start_time,
      end_date,
      end_time,
      type,
      meeting_url,
      location,
      co_host_user_id,
      details, inviteAllMember, group_id } = req.body;

    console.log("req.body__", req.body, req.file)

    const data = {
      title,
      host_user_id: new mongoose.Types.ObjectId(req.userId),
      group_id: new mongoose.Types.ObjectId(group_id),
      start_date,
      start_time,
      end_date,
      end_time,
      type,
      meeting_url,
      location,
      co_host_user_id: new mongoose.Types.ObjectId(co_host_user_id),
      details,
      inviteAllMember,
      created_by: new mongoose.Types.ObjectId(req.userId)

    }
    if (req?.file?.filename) data['photo'] = req.file.filename

    const newGroupEvent = new GroupEvent(data)

    await newGroupEvent.save()

    res.status(200).json({
      message: "Group Event saved success",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" + error });
  }
}
const editEvent = async (req, res) => {
  try {

    const { title,
      start_date,
      start_time,
      end_date,
      end_time,
      type,
      meeting_url,
      location,
      co_host_user_id,
      details, inviteAllMember, group_id } = req.body;

    console.log("req.body__", req.body, req.file)

    const data = {
      title,
      host_user_id: new mongoose.Types.ObjectId(req.userId),
      group_id: new mongoose.Types.ObjectId(group_id),
      start_date,
      start_time,
      end_date,
      end_time,
      type,
      meeting_url,
      location,
      co_host_user_id: new mongoose.Types.ObjectId(co_host_user_id),
      details,
      inviteAllMember,
      created_by: new mongoose.Types.ObjectId(req.userId)

    }
    if (req?.file?.filename) data['photo'] = req.file.filename

    await GroupEvent.findOneAndUpdate(
      { _id: req.params.event_id },
      {
        $set: data
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )

    res.status(200).json({
      message: "Group Event edited success",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" + error });
  }
}
const getEventList = async (req, res) => {
  try {

    const EventList = await GroupEvent.find({
      group_id: req.params.group_id,
      deleted_at: null
    })
      .populate('host_user_id', '_id first_name last_name profile_pic')
      .populate('co_host_user_id', '_id first_name last_name profile_pic')
      .populate('created_by', '_id first_name last_name profile_pic')

    res.status(200).json({
      message: "Group Event List",
      status: 200,
      EventList: EventList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" + error });
  }
}
const deleteEvent = async (req, res) => {
  try {
    // req.params.event_id

    await GroupEvent.findOneAndUpdate(
      { _id: req.params.event_id },
      {
        $set: {
          deleted_at: new Date(),
          update_by: new mongoose.Types.ObjectId(req.userId)
        }
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )

    res.status(200).json({
      message: "Group Event deleted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" + error });
  }
}

module.exports = {
  createGroups,
  editGroup,
  deleteGroup,
  // uploadGroupsMedia,
  getAllGroups,
  changeGroupCoverPic,
  GroupJoin,
  LeaveGroup,
  getAllJoinedGroup,
  getMyGroups,
  getGroupsDetailsById,
  sendGroupInvitationtoMultipleUser,
  GroupInvitationStatusChange,
  updateGroupInfo,
  changeGroupStatus,
  uploadGroupCoverPicMedia,
  groupInvitationFriendList,
  sendGroupInvitation,
  uploadGroupPhoto,
  saveEvent,
  editEvent,
  getEventList,
  deleteEvent
};
