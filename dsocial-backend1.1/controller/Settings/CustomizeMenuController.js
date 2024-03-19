const BlockList = require("../../models/BlockList/BlockList");
const User = require("../../models/User");
const Privacy = require("../../models/privacy/privacy");
const CustomizeMenu = require("../../models/settings/CustomizeMenu")
const bcrypt = require('bcrypt');

const gettingCustomizeMenu = async (req, res) => {
    try {


        const validTypeField = ['leftMenu', 'rightMenu']

        const data = await CustomizeMenu.find({
            user_id: req.userId,
            type: {
                $in: validTypeField
            },

        })

        res.status(200).json({
            status: 200,
            menu: data
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" + error });
    }
}
const saveCustomizeMenu = async (req, res) => {
    try {
        console.log("req.body____", req.body);
        const { leftMenuContent, rightMenuContent } = req.body;
        const user_id = req.userId

        if (!Array.isArray(leftMenuContent) || !Array.isArray(rightMenuContent)) throw new Error('Invalid content !')

        const prev = await CustomizeMenu.find({
            user_id: user_id,
            type: {
                $in: ['leftMenu', 'rightMenu']
            }
        })
        const prevLeftMenu = prev.find(i => i.type == 'leftMenu')
        const prevRightMenu = prev.find(i => i.type == 'rightMenu')

        if (prevLeftMenu) {
            await CustomizeMenu.findOneAndUpdate(
                { _id: prevLeftMenu._id },
                {
                    $set: {
                        content: leftMenuContent
                    }
                },
                {
                    new: true,
                    useFindAndModify: false,
                }
            )
        }
        else {
            const newCustomizeMenu = new CustomizeMenu({
                type: 'leftMenu',
                content: leftMenuContent,
                user_id: user_id,
                created_by: req.userId,
                update_by: req.userId
            })
            await newCustomizeMenu.save()
        }

        if (prevRightMenu) {
            await CustomizeMenu.findOneAndUpdate(
                { _id: prevRightMenu._id },
                {
                    $set: {
                        content: rightMenuContent
                    }
                },
                {
                    new: true,
                    useFindAndModify: false,
                }
            )
        }
        else {
            const newCustomizeMenu = new CustomizeMenu({
                type: 'rightMenu',
                content: rightMenuContent,
                user_id: user_id,
                created_by: req.userId,
                update_by: req.userId
            })
            await newCustomizeMenu.save()
        }

        res.status(200).json({
            status: 200,
            message: 'Customize Menu Updated successfully'
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" + error });
    }
}


const updatePersonalDetails = async (req, res) => {
    try {
        const user_id = req.userId;
        const body = req.body
        console.log("body__", body);
        const validFields = ['first_name', 'last_name', 'email', 'phone', 'date_of_birth',];
        const data = {}
        for (const i in body) {
            if (validFields.includes(i)) {
                data[i] = body[i]
            }
        }


        await User.findByIdAndUpdate(
            {
                _id: user_id
            },
            {
                $set: data
            },
            {
                new: true,
                useFindAndModify: false,
            })

        res.status(200).json({
            status: 200,
            message: 'Information Updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" + error });
    }
}


const updatePassword = async (req, res) => {
    try {
        const user_id = req.userId;
        const { password, newPassword, confirmPassword } = req.body

        if (!password || !newPassword || !confirmPassword) {
            throw new Error('Parameter missing ')
        }
        if (newPassword !== confirmPassword) {
            throw new Error('New password and  Confirm Password not matched')
        }
        const user = await User.findById(user_id);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Incorrect current password');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(
            {
                _id: user_id
            },
            {
                $set: {
                    password: hashedPassword
                }
            },
            {
                new: true,
                useFindAndModify: false,
            })

        res.status(200).json({
            status: 200,
            message: 'Password Updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const updatePostPrivacy = async (req, res) => {
    try {
        const user_id = req.userId;
        const { who_can_see, who_can_share, who_can_comment, post_type } = req.body;
        console.log("req.body__", req.body);
        const prevPrivacy = await Privacy.findOne({
            user_id,
            post_type
        })

        if (prevPrivacy) {
            await Privacy.findByIdAndUpdate(
                {
                    _id: prevPrivacy._id
                },
                {
                    $set: {
                        who_can_see,
                        who_can_share,
                        who_can_comment
                    }
                },
                {
                    new: true,
                    useFindAndModify: false,
                })
        }
        else {
            const newPrivecy = new Privacy({
                who_can_see, who_can_share, who_can_comment, post_type, user_id
            })
            await newPrivecy.save()
        }


        res.status(200).json({
            status: 200,
            message: 'Password Updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const getPostPrivacy = async (req, res) => {
    try {
        const user_id = req.userId;
        const { post_type } = req.query;

        const prevPrivacy = await Privacy.findOne({
            user_id,
            post_type
        })

        res.status(200).json({
            status: 200,
            privacy: prevPrivacy
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const getBlocklist = async (req, res) => {
    try {
        const user_id = req.userId;

        const blocklist = await BlockList.find({
            blocked_from: user_id,
        }).populate('blocked_to')

        res.status(200).json({
            status: 200,
            blocklist
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const addPhoneOrEmail = async (req, res) => {
    try {
        const user_id = req.userId;
        const body = req.body
        console.log("body__", body);
        const validFields = ['email', 'phone'];

        const data = {}
        const query = {}
        for (const i in body) {
            if (validFields.includes(i)) {
                if (i == 'phone') {
                    data['phone_list'] = body[i]
                    query['phone_list'] = {
                        $in: [body[i]]
                    }
                }
                else if (i == 'email') {
                    data['email_list'] = body[i]
                    query['email_list'] = {
                        $in: [body[i]]
                    }
                }
            }
        }
        if (!Object.keys(data).length || !Object.keys(query).length) {
            throw new Error('Invalid fields')
        }
        const isExist = await User.findOne({
            _id: user_id,
            ...query
        }).select('_id')

        console.log(data, "temp__", isExist);

        if (isExist) {
            throw new Error(`Data Already exists`)
        }
        await User.findByIdAndUpdate(
            {
                _id: user_id
            },
            {
                $push: data
            },
            {
                new: true,
                useFindAndModify: false,
            })


        res.status(200).json({
            status: 200,
            message: 'Information Updated successfully',
            temp: isExist
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error?.message });
    }
}

const blockUser = async (req, res) => {
    try {
        const user_id = req.userId;
        const block_user_id = req.params.block_user_id;

        const isBlocked = await BlockList.findOne({
            blocked_from: user_id,
            blocked_to: block_user_id
        }).select('_id')

        if (!isBlocked) {
            const newBlockUser = new BlockList({
                blocked_from: user_id,
                blocked_to: block_user_id
            })
            await newBlockUser.save()
        }

        res.status(200).json({
            status: 200,
            message: 'Blocked user successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error?.message });
    }
}
const unBlockUser = async (req, res) => {
    try {
        const user_id = req.userId;
        const unblock_user_id = req.params.unblock_user_id;

        if (user_id?.toString() === unblock_user_id?.toString()) {
            throw new Error('Cannot Block Self !!')
        }
        await BlockList.deleteOne({
            blocked_from: user_id,
            blocked_to: unblock_user_id
        })

        res.status(200).json({
            status: 200,
            message: 'Unblocked user successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error?.message });
    }
}


module.exports = {
    saveCustomizeMenu,
    gettingCustomizeMenu,
    updatePersonalDetails,
    updatePassword,
    updatePostPrivacy,
    getPostPrivacy,
    getBlocklist,
    addPhoneOrEmail,
    blockUser,
    unBlockUser
}