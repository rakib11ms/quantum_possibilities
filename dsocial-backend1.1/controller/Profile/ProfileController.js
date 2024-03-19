
const User = require('../../models/User');
const UserHobbies = require('../../models/UserHobbies');
const Institute = require('../../models/Institutes');
// const EducationWorkplace = require('../../models/EducationWorkPlace');
const InstituteType = require('../../models/settings/InstituteType');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const EducationWorkPlace = require('../../models/EducationWorkPlace');
const Post = require('../../models/posts/Post');
const PostMedia = require('../../models/posts/PostMedia');
const UserPrivacySettings = require('../../models/UserPrivacySettings');

// change pro pic codes functionality
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });

const currentTIme = Date.now();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDirs = ['uploads', 'uploads/posts'];
        uploadDirs.forEach((dir) => {
            const destinationPath = dir;
            cb(null, destinationPath);
        });
    },
    filename: (req, file, cb) => {
        cb(null, currentTIme + '-' + file.originalname);
    },
});

const uploadProPic = multer({ storage: storage });


const updateProfile = async (req, res) => {
    //6502a61236a3a416c8acb5ae
    const { first_name, last_name, phone, user_bio, birth_place, home_town, username, gender, year, month, day, religion } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ status: 404, errors: errors.array() });
        }
        const date_of_birth = new Date(`${year}-${month}-${day}`);
        let user = await User.findOneAndUpdate
            ({ _id: req.userId },
                { first_name, last_name, phone, user_bio, date_of_birth, birth_place, home_town, username, gender, religion }
            );


        // console.log('user',user)
        await user.save();

        return res.json({
            status: 200,
            message: "Profile Update successfully",
            user: await User.find({ _id: req.userId }).populate('gender religion').exec()
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: [{ msg: 'Internal Server Error' }]
        });
    }
}
const changeOnlyProfilePic = async (req, res) => {
    try {
        const target_user = await User.findById(req.userId);
        // console.log('target user',target_user)
        if (!target_user) {
            return res.json({ status: 400, message: 'User not found' });
        }
        if (!req.file || !req.file.filename) {
            return res.json({ status: 400, message: 'Invalid file upload' });
        }
        console.log('Before user update');

        const fileName = req.file.filename;
        console.log(fileName);
        target_user.profile_pic = fileName;
        await target_user.save();
        console.log('Before after update');
        const user_info = await User.findById(req.userId).populate('gender religion').exec();
        console.log('Before post update');
        const post = new Post({
            // description: 'Profile Pic change',
            user_id: req.userId,
            post_type: "profile_picture",
            post_privacy: "public",
        });
        await post.save();

        console.log('after post update');

        console.log('Before post media update');
        const postMedia = new PostMedia({
            post_id: post._id,
            media: fileName,
            caption: 'Profile Pic change'
        });
        await postMedia.save();

        console.log('after Media update');

        return res.json({ status: 200, user_info: [user_info], message: 'Profile picture updated successfully' });

    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ message: 'An error occurred while updating the profile picture' });
    }
};


const changeOnlyCoverPic = async (req, res) => {
    try {
        const fileName = req.file.filename;

        const target_user = await User.findById(req.userId);
        // console.log('target user',target_user)
        if (!target_user) {
            return res.json({ status: 400, message: 'User not found' });
        }
        if (!req.file || !req.file.filename) {
            return res.json({ status: 400, message: 'Invalid file upload' });
        }
        target_user.cover_pic = fileName;
        await target_user.save();
        const post = new Post({
            // description: 'Cover Pic change',
            user_id: req.userId,
            post_privacy: "public",

            post_type: "cover_picture",
        });
        await post.save();
        const postMedia = new PostMedia({
            post_id: post._id,
            media: fileName,
            // caption: 'Coover Pic change'
        });
        await postMedia.save();
        const user_info = await User.findById(req.userId).populate('gender religion').exec();
        // console.log('user_info', user_info)
        return res.json({ status: 200, user_info: [user_info], message: 'Cover picture updated successfully' });
    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ message: 'An error occurred while updating the profile picture' });
    }
};


const changePassword = async (req, res) => {

    const { old_password, new_password, confirm_password } = req.body;
    try {
        const user = await User.findOne({ _id: req.userId });
        const isPasswordValid = await bcrypt.compare(old_password, user.password);


        if (!isPasswordValid) {
            return res.json({ status: 400, message: 'Invalid password' });
        }
        user.password = await bcrypt.hash(new_password, 10);
        await user.save();
        return res.json({ status: 200, message: 'Password changed succcessfully' });

    } catch (error) {

        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }

}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9+()-]+$/;
    return phoneRegex.test(phoneNumber);
}

const changeMobileNumber = async (req, res) => {

    const { new_number } = req.body;
    try {
        if (!new_number || !isValidPhoneNumber(new_number)) {
            return res.json({ status: 400, message: 'Invalid Mobile Number' });
        }

        const user = await User.findOne({ _id: req.userId });
        user.phone = new_number;
        await user.save();
        return res.json({ status: 200, message: 'Mobile changed successfully' });

    } catch (error) {

        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }

}

const saveHobbies = async (req, res) => {

    try {
        const userHobbies = new UserHobbies();
        userHobbies.hobbies_id = req.body.hobbies_id;
        userHobbies.user_id = req.body.user_id;
        userHobbies.data_status = 1;

        await userHobbies.save();

        return res.json({
            status: 200,
            userHobbies: userHobbies,
            message: "Hobbies Saved successfully",
        })
    }
    catch (error) {

        return res.status(500).json({ status: 500, message: error });
    }

}


const getUserHobbies = async (req, res) => {
    try {
        const userHobbies = await UserHobbies.find({ user_id: req.userId, data_status: 1 }).populate('hobbies_id');
        return res.json({
            status: 200,
            userHobbies: userHobbies
        });
    }
    catch (error) {

    }

}


const deleteHobbies = async (req, res) => {

    try {

        await UserHobbies.updateMany({ user_id: req.body.user_id }, { $set: { data_status: 2 } });


        return res.json({
            status: 200,
            message: "Hobbies Delete successfully",
        })
    }
    catch (error) {

        return res.status(500).json({ status: 500, message: error });
    }

}


const saveEducation = async (req, res) => {
    // let { institute_name, institute_id, startDay, startMonth, startYear, endDay, endMonth, endYear, description } = req.body;
    let { institute_name, startDate, endDate, is_Stuyding, username, privacy } = req.body;
    try {
        // const instituteType = await InstituteType.findOne({ institute_type: req.body.instituteType })

        // if (institute_id == '' && institute_name != "") {
        //     const institute = new Institute({ institute_name, status: 1 });
        //     await institute.save();
        //     institute_id = institute._id;


        // }
        // const start_at = new Date(`${startYear}-${startMonth}-${startDay}`);
        // const end_at = new Date(`${endYear}-${endMonth}-${endDay}`);
        const instituteWorkPlace = new EducationWorkPlace();
        instituteWorkPlace.user_id = req.userId;
        instituteWorkPlace.institute_name = institute_name;
        instituteWorkPlace.username = username;
        // instituteWorkPlace.institute_type_id = instituteType._id;
        instituteWorkPlace.startDate = startDate;

        instituteWorkPlace.endDate = endDate

        instituteWorkPlace.is_Stuyding = is_Stuyding;
        instituteWorkPlace.privacy = privacy;
        // instituteWorkPlace.edu_or_ins = 1;
        // instituteWorkPlace.status = 1;
        await instituteWorkPlace.save();

        return res.json({
            status: 200,
            message: "Institute added successfully",
        })




    }
    catch (error) {

        return res.status(500).json({ status: 500, message: error });
    }

}
const getEducationInfo = async (req, res) => {
    try {
        const username = req.body.username;
        // const user = await User.find({ username: req.body.username });

        const userEducation = await EducationWorkPlace.find({ username: username });
        return res.json({
            status: 200,
            userEducation: userEducation
        });
    } catch (error) {

        return res.status(500).json({ status: 500, message: error });
    }
}

const deleteEducation = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        // const userId = req.userId;
        const result = await EducationWorkPlace.findByIdAndDelete(educationId);

        return res.json({
            status: 200,
            message: 'Education Info deleted'
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error });
    }
};



const deleteUser = async (req, res) => {
    try {

        const result = await User.deleteMany({});

        return res.json({
            status: 200,
            message: 'User Info dleted'
        });
    } catch (error) {

        return res.status(500).json({ status: 500, message: error });
    }
}



const lockYourProfile = async (req, res) => {
    try {
        let user = await User.findOneAndUpdate
            ({ _id: req.userId },
                { lock_profile: 1 }
            );

        await user.save();

        user = await User.find({ _id: req.userId });
        return res.json({
            status: 200,
            message: 'Your Profile is Locked',
            user: user
        });

    } catch (error) {

        return res.status(500).json({ status: 500, message: error });
    }

}


const unlockYourProfile = async (req, res) => {
    try {
        let user = await User.findOneAndUpdate
            ({ _id: req.userId },
                { lock_profile: 0 }
            );

        await user.save();

        user = await User.find({ _id: req.userId });
        return res.json({
            status: 200,
            message: 'Your Profile is unlocked',
            user: user
        });

    } catch (error) {

        return res.status(500).json({ status: 500, message: error });
    }

}
const editUserGender = async (req, res) => {
    const userId = req.params.id;
    try {
        const find_user = await User.find({ _id: userId }).populate("gender");
        return res.json({
            status: 200,
            data: find_user

        })
    }
    catch (error) {
        return res.json({
            status: 400,
            error: error

        })
    }

}


const updateUserGender = async (req, res) => {
    const userId = req.userId;
    const update_gender_id = req.body.gender_id;
    // console.log("d",update_gender_id)
    await updatePrivacy('gender', req.body.privacy, req.userId);
    try {
        const find_user = await User.findByIdAndUpdate(userId, { gender: update_gender_id });
        return res.json({
            status: 200,
            data: find_user,
            message: "Gender has updated successfully"
        });
    } catch (error) {
        return res.json({
            status: 400,
            error: error.message
        });
    }
};


const editUserEducationInfo = async (req, res) => {
    const educataionId = req.params.educataionId
    const userId = req.userId;
    try {

        const find_education = await EducationWorkPlace.find({ _id: educataionId, user_id: userId });
        return res.json({
            status: 200,
            find_education: find_education

        })
    } catch (error) {
        console.log(error)
    }
}
const updateUserEducationInfo = async (req, res) => {
    const educationId = req.params.educationId;
    console.log("🚀 ~ updateUserEducationInfo ~ educationId:", educationId)
    const userId = req.userId;
    const { is_Stuyding, institute_name, startDate, endDate,privacy } = req.body;

    try {
        const find_education = await EducationWorkPlace.findByIdAndUpdate(
            { _id: educationId, user_id: userId },
            { is_Stuyding, institute_name, startDate, endDate, privacy },
            { new: true }
        );

        if (!find_education) {
            return res.status(404).json({
                status: 404,
                message: 'Education record not found for the specified user.',
            });
        }

        return res.json({
            status: 200,
            message: 'Education Info updated successfully',
            data: find_education,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};


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

module.exports = { updateProfile, uploadProPic, changeOnlyProfilePic, changePassword, saveHobbies, getUserHobbies, deleteHobbies, saveEducation, getEducationInfo, deleteEducation, changeOnlyCoverPic, deleteUser, lockYourProfile, unlockYourProfile, changeMobileNumber, editUserGender, updateUserGender, editUserEducationInfo, updateUserEducationInfo }
