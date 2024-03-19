const Pages = require('../../models/Pages/Pages.js');
const Post = require('../../models/posts/Post.js');
const UserPageSetting = require('../../models/Pages/UserPageSetting.js');
const PageFollower = require('../../models/Pages/PageFollower.js');
const PageSocialMedia = require('../../models/Pages/PageSocialMedia.js');
const SocialMedia = require('../../models/settings/SocialMedia.js');
const PageInvitation = require('../../models/Pages/PageInvitation.js');
const PostMedia = require('../../models/posts/PostMedia');

const { validationResult } = require('express-validator')
const multer = require('multer');
const fs = require('fs');
const PageAdmin = require('../../models/Pages/PageAdmin.js');
const { allocateDirectory } = require('../../utils/utility.js');


const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const folderName = 'uploads/pages/'
        await allocateDirectory(folderName)
        cb(null, folderName);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const uploadPagesMedia = multer({ storage: storage });

const createPages = async (req, res) => {
    const profilePic = req.files.profilePic;
    const coverPic = req.files.coverPic;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }
        const name = req.body.name.toLowerCase();
        const currentTimestampMilliseconds = Date.now();
        const currentTimestampSeconds = Math.floor(currentTimestampMilliseconds / 1000);

        const pages = new Pages({
            page_name: req.body.name,
            category: req.body.category,
            bio: req.body.bio,
            website: req.body.website,
            page_user_name: name.replace(/\s/g, '.') + '.' + currentTimestampSeconds,
            user_id: req.userId,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            city: req.body.city,
            zip_code: req.body.zip_code,
            address: req.body.address,
            privacy: req.body.privacy,
            page_rule: req.body.page_rule,
            page_message: req.body.page_message,
            page_reaction: req.body.page_reaction,
            profile_pic: profilePic[0].filename,
            cover_pic: coverPic[0].filename
        });
        await pages.save();


        return res.status(200).json({ message: 'Pages created successfully', status: 200 });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};


const getAllPages = async (req, res) => {

    const followedPage = await PageFollower.find({ "user_id": req.userId });
    let followedPageArr = [];
    followedPage.forEach((result) => {
        followedPageArr.push(result.page_id);

    });

    console.log(followedPage, req.userId, "followedPageArr___")


    const pages = await Pages.aggregate([
        {
            $match: {
                _id: { $nin: followedPageArr },
            },
        },
        {
            $lookup: {
                from: 'pagefollowers',
                localField: '_id',
                foreignField: 'page_id',
                as: 'followers',
            },
        },
        {
            $project: {
                _id: 1,
                page_name: 1,
                category: 1,
                bio: 1,
                profile_pic: 1,
                cover_pic: 1,
                page_user_name: 1,
                followerCount: { $size: '$followers' },
            },
        },
    ]);

    res.status(200).json({
        message: 'Pages created successfully',
        status: 200,
        data: pages
    });
}


const followPage = async (req, res) => {
    try {
        const pageFollower = new PageFollower({
            page_id: req.body.page_id,
            follow_unfollow_status: req.body.follow_unfollow_status,
            like_unlike_status: req.body.like_unlike_status,
            user_id: req.userId,
        });
        await pageFollower.save();
        res.status(200).json({
            message: 'Follow Status Changed successfully',
            status: 200,
        });
    } catch (error) {
        return res.status(500).json({
            errors: error.message,
            message: 'Something went wrong',
        });
    }

}

const updateFollowStatus = async (req, res) => {
    try {
        const pageFollower = await PageFollower.findOne({ page_id: req.body.page_id, user_id: req.userId });
        if (pageFollower != null) {
            await PageFollower.updateOne({ _id: pageFollower._id }, { follow_unfollow_status: req.body.follow_unfollow_status })
        }

        res.status(200).json({
            message: 'Follow Status Changed successfully',
            status: 200,
        });
    } catch (error) {
        return res.status(500).json({
            errors: error.message,
            message: 'Something went wrong',
        });
    }

}

const getFollowedPages = async (req, res) => {
    const followedPage = await PageFollower.find({ "user_id": req.userId });
    let followedPageArr = [];
    followedPage.forEach((result) => {
        followedPageArr.push(result.page_id);

    });
    const user_id = req.userId;
    const pages = await Pages.aggregate([
        {
            $match: {
                _id: { $in: followedPageArr },
            },
        },
        {
            $lookup: {
                from: 'joinedgroups',
                localField: '_id',
                foreignField: 'page_id',
                as: 'followers',
            },
        },
        {
            $lookup: {
                from: 'userpagesettings',
                localField: '_id',
                foreignField: 'page_id',
                as: 'userPageSettings',
            },
        },
        {
            $lookup: {
                from: 'pagefollowers',
                localField: '_id',
                foreignField: 'page_id',
                as: 'followers',
            },
        },
        {
            $project: {
                _id: 1,
                page_name: 1,
                category: 1,
                bio: 1,
                profile_pic: 1,
                cover_pic: 1,
                page_user_name: 1,
                followerCount: { $size: '$followers' },
                userPageSettings: 1
            },
        },
    ]);

    res.status(200).json({
        message: 'Pages created successfully',
        status: 200,
        data: pages
    });
}

const getFollowersById = async (req, res) => {
    const followedPage = await PageFollower.find({ user_id: req.userId, page_id: req.body.page_id });
    if (followedPage && followedPage.length > 0) {
        return res.status(200).json({
            message: 'Following or liked found for this page',
            status: 200,
            data: followedPage[0]
        });
    } else {
        return res.status(200).json({
            message: 'No following or like found for this page',
            status: 200,
            data: {}
        });
    }
}

const unFollowedPages = async (req, res) => {

    const pageFollower = await PageFollower.deleteOne({ page_id: req.body.page_id, user_id: req.userId });


    res.status(200).json({
        message: 'Unfollowed this pages successfully',
        status: 200,
    });
}

const unLikePages = async (req, res) => {
    const pageFollower = await PageFollower.findOne({ page_id: req.body.page_id, user_id: req.userId });
    if (pageFollower != null) {
        await PageFollower.updateOne({ _id: pageFollower._id }, { like_unlike_status: req.body.like_unlike_status })
    }
    res.status(200).json({
        message: 'Unliked this pages successfully',
        status: 200,
    });
}

const getMyPages = async (req, res) => {
    const myPages = await Pages.find({ user_id: req.userId });
    res.status(200).json({
        message: 'My Page List',
        status: 200,
        myPages: myPages
    });
}

const getPagesDetails = async (req, res) => {
    const pageDetails = await Pages.aggregate([
        {
            $match: {
                page_user_name: req.body.page_user_name
            },
        },
        {
            $lookup: {
                from: 'pagefollowers',
                localField: '_id',
                foreignField: 'page_id',
                as: 'followers',
            },
        },
        {
            $lookup: {
                from: 'pagesocialmedias',
                localField: '_id',
                foreignField: 'page_id',
                as: 'pagesmedia',
            },
        },
        {
            $project: {
                _id: 1,
                page_name: 1,
                category: 1,
                bio: 1,
                profile_pic: 1,
                cover_pic: 1,
                page_user_name: 1,
                website: 1,
                email: 1,
                address: 1,
                city: 1,
                zip_code: 1,
                user_id: 1,
                service_area: 1,
                pagesmedia: 1,
                language: 1,
                offer: 1,
                phone_number: 1,
                privacy: 1,
                page_rule: 1,
                page_message: 1,
                page_reaction: 1,
                followerCount: { $size: '$followers' },
                likedCount: { $size: '$followers' },
            },
        },
    ]);
    let pagesMedaiaArr = [];
    if (pageDetails.length > 0) {
        pagesMedaiaArr = await PageSocialMedia.find({ page_id: pageDetails[0]._id }).populate('social_media_id')
    }

    res.status(200).json({
        message: 'My Page List',
        status: 200,
        pageDetails: pageDetails.length > 0 ? pageDetails[0] : {},
        pagesMedaiaArr: pagesMedaiaArr
    });
}


const updateSettings = async (req, res) => {
    const pageDetails = await Pages.findOne({ _id: req.body.page_id });
    if (req.body.setting_type == "instagram") {
        pageDetails.instagram = req.body.setting_type;
    }

    if (req.body.setting_type == "website") {
        pageDetails.website = req.body.setting_type;
    }

    if (req.body.setting_type == "whatsapp") {
        pageDetails.whatsapp = req.body.setting_type;
    }

    await pageDetails.save();
    return res.json({ status: 200, message: 'page Info succcessfully' });
}



const sendPageInvitation = async (req, res) => {
    const requestObj = req.body.user_id_arr;
    for (const checkboxId in requestObj) {
        if (requestObj[checkboxId] === true) {
            const pgeInvitation = PageInvitation({
                page_id: req.body.page_id,
                user_id: checkboxId,
                created_by: req.userId
            })
            await pgeInvitation.save();
        }
    }

    return res.json({ status: 200, message: 'page Invitation Send succcessfully' });
}

const invitedPages = async (req, res) => {
    return res.json({
        status: 200,
        message: 'page Invitation Send succcessfully',
        result: await PageInvitation.find({ user_id: req.userId, accept_invitation: { $ne: 1 } }).populate('page_id user_id created_by')
    });
}


const acceptInvitation = async (req, res) => {
    let acceptInvtation = await PageInvitation.findOneAndUpdate
        ({ _id: req.body.invitation_id },
            { accept_invitation: 1 }
        );



    await acceptInvtation.save();



    const pageFollower = new PageFollower({
        page_id: req.body.page_id,
        follow_unfollow_status: req.body.follow_unfollow_status,
        user_id: req.userId,
    });
    await pageFollower.save();




    res.status(200).json({
        message: 'Pages Accepted successfully',
        status: 200,
    });




}

const getPagesLatestImage = async (req, res) => {

    try {
        const username = req.body.username;
        const limit = req.body.limit;
        const pageInfo = await Pages.find({ page_user_name: username });


        const posts = await Post.find({ page_id: pageInfo[0]._id })
            .populate('user_id location_id feeling_id activity_id sub_activity_id')
            .sort({ createdAt: -1 })
            .exec();

        const postIds = posts.map(post => post._id);

        const allowedExtensions = ['.jpg', '.png', '.webp'];

        const allowedVideoExtensions = ['.mp4', '.webm', '.flv', 'avi'];
        let withPostMedia = [];
        let withVideoMedia = [];
        if (limit > 0) {
            withPostMedia = await PostMedia.find({
                post_id: { $in: postIds },
                media: { $in: allowedExtensions.map(ext => new RegExp(ext, 'i')) }
            }).sort({ _id: -1 })
                .limit(9);
            withVideoMedia = await PostMedia.find({
                post_id: { $in: postIds },
                media: { $in: allowedVideoExtensions.map(ext => new RegExp(ext, 'i')) }
            }).sort({ _id: -1 })
                .limit(9);
        } else {
            withPostMedia = await PostMedia.find({
                post_id: { $in: postIds },
                media: { $in: allowedExtensions.map(ext => new RegExp(ext, 'i')) }
            }).sort({ _id: -1 });
            withVideoMedia = await PostMedia.find({
                post_id: { $in: postIds },
                media: { $in: allowedVideoExtensions.map(ext => new RegExp(ext, 'i')) }
            }).sort({ _id: -1 });
        }



        res.json({
            status: 200,
            posts: withPostMedia,
            videos: withVideoMedia,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' + error });
    }
}

const bookmarkPage = async (req, res) => {
    try {
        let pageSettingExits = await UserPageSetting.findOne({ page_id: req.body.page_id, user_id: req.userId });
        if (pageSettingExits != null) {

            let updatePageSettings = await UserPageSetting.findOneAndUpdate
                ({ _id: pageSettingExits._id },
                    { bookmark_status: req.body.bookmark_status }
                );
        } else {
            const userPagesSettings = new UserPageSetting({
                page_id: req.body.page_id,
                user_id: req.userId,
                bookmark_status: req.body.bookmark_status
            });
            await userPagesSettings.save();
        }
        res.status(200).json({
            message: 'Page ' + ((req.body.bookmark_status == 1) ? 'added' : 'removed') + ' Bookmarked successfully',
            status: 200,
        });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' + error });
    }
}


const updatePageInfo = async (req, res) => {
    console.log(req.body);
    try {
        let pages = await Pages.findOneAndUpdate
            ({ _id: req.body._id },
                {
                    page_name: req.body.pageName,
                    page_user_name: req.body.pageUserName,
                    email: req.body.email,
                    website: req.body.website,
                    service_area: req.body.service_area,
                    offer: req.body.offer,
                    language: req.body.language,
                    bio: req.body.page_description,
                    privacy: req.body.page_privacy,
                    location: req.body.location,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    page_rule: req.body.page_rule,
                    page_message: req.body.page_message,
                    page_reaction: req.body.page_reaction,
                }
            );
        pages = await Pages.findById({ _id: req.body._id })
        res.status(200).json({
            message: 'Page Info Updated Successfully',
            status: 200,
            pageDetails: pages
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' + error });
    }
}
const updateAddressInfo = async (req, res) => {
    console.log(req.body);
    try {
        let pages = await Pages.findOneAndUpdate
            ({ _id: req.body._id },
                {
                    address: req.body.address,
                    city: req.body.city,
                    zip_code: req.body.zip_code
                }
            );
        pages = await Pages.findById({ _id: req.body._id })
        res.status(200).json({
            message: 'Page Info Updated Successfully',
            status: 200,
            pageDetails: pages
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' + error });
    }
}



const saveSocialMediaLink = async (req, res) => {


    const requestObj = req.body.additionalAddresses;

    const result = await PageSocialMedia.deleteMany({ _id: req.body.page_id });

    console.log(req.body);
    try {
        for (const index in requestObj) {
            await PageSocialMedia({
                page_id: req.body.page_id,
                url: requestObj[index].url,
                social_media_id: requestObj[index].media,
            }).save();
        }
        return res.status(200).json({
            message: 'Page Link Updated Successfully',
            status: 200,
            pageSocialMedia: await PageSocialMedia.find({})
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' + error });
    }

    // let pages = new SocialMedia({
    //     media_name: "Facebook",
    //     base_url: "https://www.facebook.com/",
    //     data_status: 1
    // });
    // await pages.save();


    // pages = new SocialMedia({
    //     media_name: "Youtube",
    //     base_url: "https://www.youtube.com/",
    //     data_status: 1
    // });
    // await pages.save();



    // pages = new SocialMedia({
    //     media_name: "Github",
    //     base_url: "https://www.github.com/",
    //     data_status: 1
    // });
    // await pages.save();



    // pages = new SocialMedia({
    //     media_name: "Webite",
    //     base_url: "#",
    //     data_status: 1
    // });
    // await pages.save();



    // pages = new SocialMedia({
    //     media_name: "Linkedin",
    //     base_url: "https://www.linkedin.com/",
    //     data_status: 1
    // });
    // await pages.save();




    // pages = new SocialMedia({
    //     media_name: "Twitter",
    //     base_url: "https://www.twitter.com/",
    //     data_status: 1
    // });
    // await pages.save();

}


const getSocialMedia = async (req, res) => {
    try {
        const socialMediaList = await SocialMedia.find({});


        return res.status(200).json({
            message: 'Page Info Updated Successfully',
            status: 200,
            socialMedia: socialMediaList
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' + error });
    }
}


const getAllFollowers = async (req, res) => {
    try {
        const followerList = await PageFollower.find({
            page_id: req.body.page_id
        }).populate('user_id page_id');
        return res.status(200).json({
            message: 'Page Info Updated Successfully',
            status: 200,
            data: followerList
        });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' + error });
    }
}

const getPageAdmins = async (req, res) => {
    try {
        // const pageAdmins = await PageAdmin.find({});
        const pageAdmins = await PageAdmin.find({ page_id: req.body.page_id }).populate('user_id');
        // const pageAdmins = await PageAdmin.aggregate([
        //     {
        //         $match: {
        //             page_id: req.body.page_id
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'users',
        //             localField: 'user_id',
        //             foreignField: '_id',
        //             as: 'user'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'pages',
        //             localField: 'page_id',
        //             foreignField: '_id',
        //             as: 'page'
        //         }
        //     }
        // ]).exec();

        console.log(pageAdmins);

        return res.status(200).json({
            message: 'Page Info Updated Successfully',
            status: 200,
            data: pageAdmins
        });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' + error });
    }
}

const saveOrUpdatePageAdmin = async (req, res) => {
    try {
        let pageAdmin = await PageAdmin.findOne({ page_id: req.body.page_id, user_id: req.body.user_id });
        if (pageAdmin != null) {
            pageAdmin.user_role = req.body.user_role;
            await pageAdmin.save();
        } else {
            pageAdmin = new PageAdmin({
                page_id: req.body.page_id,
                user_id: req.body.user_id,
                user_role: req.body.user_role,
                created_by: req.userId
            });
            await pageAdmin.save();
        }
        return res.status(200).json({
            message: 'Page Admin Updated Successfully',
            status: 200,
            data: pageAdmin
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' + error });
    }
}

const removePageAdmin = async (req, res) => {
    try {
        let pageAdmin = await PageAdmin.deleteOne({ _id: req.body._id });
        return res.status(200).json({
            message: 'Page Admin Removed Successfully',
            status: 200,
            data: pageAdmin
        });

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' + error });
    }
}

const deletePage = async (req, res) => {
    try {
        let page = await Pages.deleteOne({ _id: req.body._id });
        return res.status(200).json({
            message: 'Page Removed Successfully',
            status: 200,
            data: page
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' + error });
    }
}

module.exports = { createPages, uploadPagesMedia, getAllPages, followPage, getFollowedPages, unFollowedPages, getMyPages, getPagesDetails, updateSettings, sendPageInvitation, invitedPages, acceptInvitation, getPagesLatestImage, bookmarkPage, updatePageInfo, updateAddressInfo, saveSocialMediaLink, getSocialMedia, getAllFollowers, getPageAdmins, saveOrUpdatePageAdmin, removePageAdmin, deletePage, unLikePages, getFollowersById, updateFollowStatus }