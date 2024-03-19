const { validationResult } = require('express-validator')
const Campaign = require('../../models/Campaign/Campaign');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs')
const Post = require("../../models/posts/Post");
const PostMedia = require("../../models/posts/PostMedia");
const CampaignTransaction = require('../../models/Campaign/CampaignTransaction');
const path = require('path');
const { deleteFile, copyFile, allocateDirectory } = require('../../utils/utility');
const campaignPerformance = require('../../models/Campaign/campaignPerformance');
// const currentTIme = Date.now();
const adsStorage = multer.diskStorage({

    destination: async (req, file, cb) => {
        // const uploadDirs = ['uploads/adsStorage', 'uploads/posts'];
        // uploadDirs.forEach((dir) => {
        //     const destinationPath = dir;
        //     cb(null, destinationPath);
        // });
        const folderPath = 'uploads/adsStorage'
        await allocateDirectory(folderPath)
        cb(null, folderPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.split(' ').join('-'));
    },
});

const uploadAdsPhoto = multer({ storage: adsStorage });

const saveCampaign = async (req, res) => {
    try {
        const {

            page_id,
            call_to_action,
            description,
            website_url
        } = req.body;
        console.log("req.body__", req.body, req.files);
        // uploads/posts

        const files = req.files.map(i => i?.filename);

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ status: 400, errors: errors.array() });
        // }

        const validField = [
            'page_id',

            'start_date',
            'end_date',

            'total_budget',
            'daily_budget',
            'from_age',
            'to_age',


            'campaign_name',
            'campaign_category',
            'page_name',
            'gender',
            'status',
            'age_group',
            'locations',
            'keywords',
            'call_to_action',
            'website_url',
            'headline',
            'description',
            'destination',
            'ads_placement'

        ]
        const data = {
            user_id: req.userId,
            created_by: req.userId,
            updatedAt: new Date(),
            updated_by: req.userId,
            createdAt: new Date()
        }
        // console.log("req.body___", req.body, req.files);

        const reqData = req.body

        for (const i in reqData) {
            if (validField.includes(i)) {
                if (i == 'page_id') {
                    data[i] = new mongoose.Types.ObjectId(reqData[i])
                }
                else if (i == 'start_date' || i == 'end_date') {
                    data[i] = new Date(reqData[i])
                }
                else if (i == 'total_budget' || i == 'daily_budget' || i == 'from_age' || i == 'to_age') {
                    data[i] = Number(reqData[i])
                }
                else {
                    data[i] = reqData[i]


                }
            }
        }
        if (reqData?.age_group) {
            if (['allAges', 'ageRange'].includes(reqData?.age_group)) data['age_group'] = reqData?.age_group
            else data['age_group'] = 'allAges'
        }
        else data['age_group'] = 'allAges'

        if (files) {
            data['campaign_cover_pic'] = files
        }

        // Campaign Post as NewsFeedPost
        const PagePostData = {
            description: description || '',
            user_id: req.userId,
            page_id: page_id,
            post_type: "campaign",
            post_privacy: "public",
            link: website_url,
            link_title: call_to_action,
            link_description: description || '',
        };

        const post = new Post(PagePostData);

        await post.save();

        if (!post) {
            return res.status(400).json({ message: 'Post not uploaded successfully', status: 400 });
        }

        data['post_id'] = post._id

        const newCampaign = new Campaign(data);
        const campaign = await newCampaign.save();

        await Post.findOneAndUpdate(
            {
                _id: post._id

            },
            {
                $set: {
                    campaign_id: campaign._id
                }
            },
        )



        if (data?.total_budget) {
            const newCampaignTransaction = new CampaignTransaction({
                campaign_id: campaign._id,
                paid_amount: data?.total_budget,
                user_id: req.userId,
            })
            await newCampaignTransaction.save()
        }

        if (files) {
            const mediaItem = files.map(i => ({
                post_id: post._id,
                media: i,
                caption: "",
            }))

            await PostMedia.insertMany(mediaItem);

        }
        // Copy file from ads to post folder
        for (const i of req?.files) {
            if (i.path) {
                copyFile(i.path, path.join('uploads', 'posts', i.filename))
            }
        }

        return res.status(200).json({ message: 'Campaign saved successfully', status: 200, data: newCampaign });

    } catch (error) {
        if (req?.files) {
            for (i of req?.files) {
                if (i?.path) {
                    deleteFile(i.path)
                }
            }
        }
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    };
}

const editCampaign = async (req, res) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ status: 400, errors: errors.array() });
        // }

        const validField = [
            'page_id',

            'start_date',
            'end_date',

            'total_budget',
            'daily_budget',
            'from_age',
            'to_age',


            'campaign_name',
            'campaign_category',
            'page_name',
            'gender',
            'status',
            'age_group',
            'locations',
            'keywords',
            'call_to_action',
            'website_url',
            'headline',
            'description',
            'destination',
            'ads_placement'

        ]
        const data = {

            updatedAt: new Date(),
            updated_by: req.userId,
        }
        console.log("req.body___", req.body, req.files);
        const reqData = req.body

        const files = req.files.map(i => i?.filename);

        for (const i in reqData) {
            if (validField.includes(i)) {
                if (i == 'page_id') {
                    data[i] = new mongoose.Types.ObjectId(reqData[i])
                }
                else if (i == 'start_date' || i == 'end_date') {
                    data[i] = new Date(reqData[i])
                }
                else if (i == 'total_budget' || i == 'daily_budget' || i == 'from_age' || i == 'to_age') {
                    data[i] = Number(reqData[i])
                }
                else {
                    if (i !== 'removable_file') {
                        data[i] = reqData[i]
                    }
                }
            }
        }

        const prevData = await Campaign.findById(req.params?.id);

        const prevPhoto = prevData.campaign_cover_pic;

        const newPhoto = [];
        const removable_file_length = req.body.removable_file?.length

        for (const i of prevPhoto) {
            if (removable_file_length) {
                if (!req.body.removable_file.find(j => j == i)) {
                    newPhoto.push(i)
                }
            }
            else {
                newPhoto.push(i)
            }
        }


        if (files) {
            data['campaign_cover_pic'] = [...files, ...newPhoto]
        } else {
            data['campaign_cover_pic'] = newPhoto
        }


        await Campaign.findOneAndUpdate(
            {
                _id: req.params?.id
            },
            {
                $set: data
            },
            {
                new: true,
                useFindAndModify: false,
            }
        );

        // **{ This block used for active inactive newsfeed presence missing additional campaign changes condition at this stage } 
        if (reqData.status !== 'active' && prevData.ads_placement == "Newsfeed Ads") {
            await Post.findOneAndUpdate(
                {
                    _id: prevData.post_id
                }, {
                $set: {
                    post_privacy: 'only_me'
                }
            }
            )
        } else if (reqData.status === 'active' && prevData.ads_placement == "Newsfeed Ads") {
            await Post.findOneAndUpdate(
                {
                    _id: prevData.post_id
                }, {
                $set: {
                    post_privacy: 'public'
                }
            }
            )
        }

        if (removable_file_length) {
            await PostMedia.deleteMany({
                media: {
                    $in: req.body.removable_file
                }
            })
            for (const i of req.body.removable_file) {
                const post_path = path.join('uploads', 'posts', i)
                const ads_path = path.join('uploads', 'adsStorage', i)
                deleteFile(post_path)
                deleteFile(ads_path)
            }
        }

        if (files && prevData?.post_id) {
            const mediaItem = files.map(i => ({
                post_id: prevData?.post_id,
                media: i,
                caption: "",
            }))

            await PostMedia.insertMany(mediaItem);

        }

        for (const i of req?.files) {
            if (i.path) {
                copyFile(i.path, path.join('uploads', 'posts', i.filename))
            }
        }


        res.status(200).json({ message: 'Campaign updated successfully', status: 200 });

    } catch (error) {
        console.log(error);
        if (req?.files) {
            for (i of req?.files) {
                if (i?.path) {
                    deleteFile(i.path);
                }
            }
        }

        return res.status(500).json({
            errors: error.message
        });
    }
};

const getCampaigns = async (req, res) => {
    try {
        const campaign = await Campaign.find({ user_id: req.userId, deleted_at: null }).sort({ createdAt: -1 });
        return res.json({
            status: 200,
            campaign: campaign,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getCampaignById = async (req, res) => {
    try {
        let campaign_id = req.params?.id;
        const campaign = await Campaign.findOne({ _id: campaign_id, deleted_at: null });
        return res.json({
            status: 200,
            data: campaign,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}
const deleteCampaign = async (req, res) => {
    try {
        let campaign_id = req.params?.id;
        await Campaign.findOneAndUpdate(
            {
                _id: campaign_id
            },
            {
                $set: {
                    deleted_at: new Date()
                }
            },
            {
                new: true,
                useFindAndModify: false,
            }
        );
        return res.json({
            status: 200,
            message: 'Campaign deleted successfully !',
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const updateCampaign = async (req, res) => {
    try {
        const { user_id } = req.body;

        const updatedCampaign = await Campaign.findOneAndUpdate(
            { "_id": req.body.campaign_id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedCampaign) {
            return res.status(404).json({
                status: 404,
                message: 'Campaign not found for the provided user_id.',
            });
        }

        return res.json({
            status: 200,
            message: 'Campaign updated successfully.',
            data: updatedCampaign,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            errors: err.message,
        });
    }
};

const getLeftSideAds = async (req, res) => {
    try {
        const currentDate = new Date();
        const user_id = req.userId
        const campaigns = await Campaign.find({
            ads_placement: 'Left Side',
            status: 'active',
            end_date: { $gt: currentDate }
        })
            .sort({ createdAt: -1 })
            .limit(2)
            .populate('page_id', '_id page_name page_user_name');

        
        await campaignPerformance.insertMany(campaigns.map(i => ({
            user_id,
            campaign_id: i._id,
            campaign_name: i?.campaign_name,
            campaign_location: i?.locations?.join(','),
            is_reached: true,
            is_impression: true,
            is_clicked: false,
            createdAt: currentDate,
            created_by: user_id
        })))

        return res.json({
            status: 200,
            campaign: campaigns,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }
}

const getRightSideAds = async (req, res) => {
    try {
        const user_id = req.userId
        const currentDate = new Date();
        const campaigns = await Campaign.find({
            ads_placement: 'Right Side',
            status: 'active',
            end_date: { $gt: currentDate }
        })
            .sort({ createdAt: -1 })
            .limit(2)
            .populate('page_id', '_id page_name page_user_name');

        await campaignPerformance.insertMany(campaigns.map(i => ({
            user_id,
            campaign_id: i._id,
            campaign_name: i?.campaign_name,
            campaign_location: i?.locations?.join(','),
            is_reached: true,
            is_impression: true,
            is_clicked: false,
            createdAt: currentDate,
            created_by: user_id
        })))

        return res.json({
            status: 200,
            campaign: campaigns,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }
}

const getNewsFeedAds = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            ads_placement: 'Newsfeed Ads', status: 'active'
        })
            .sort({ createdAt: -1 })
            .limit(2)
            .populate('page_id', '_id page_name page_user_name');

        return res.json({
            status: 200,
            campaign: campaigns,
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }
}

const saveCampaignPerformance = async (req, res) => {
    try {
        const { campaign_id, campaign_name, campaign_location, is_reached, is_impressed, is_clicked } = req.body;
        const user_id = req.userId;

        const data = new campaignPerformance();
        data.user_id = user_id;
        data.campaign_id = campaign_id;
        data.campaign_name = campaign_name;
        data.campaign_location = campaign_location;
        data.is_reached = is_reached;
        data.is_impression = is_impressed;
        data.is_clicked = is_clicked;
        data.createdAt = new Date();
        data.created_by = user_id;

        await data.save();
        if (!data) {
            return res.status(400).json({
                status: 400,
                message: 'Campaign performance not saved successfully.',
            });
        }
        return res.json({
            status: 200,
            message: 'Campaign performance saved successfully.',
        });

    } catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });
    }
}

const getCampaignPerformanceSummary = async (req, res) => {
    try {
        const { campaign_id } = req.params;

        const campaignPerformanceSummary = await campaignPerformance.aggregate([
            {
                $match: {
                    campaign_id: new mongoose.Types.ObjectId(campaign_id),
                },
            },
            {
                $lookup: {
                    from: "campaigns",
                    localField: "campaign_id",
                    foreignField: "_id",
                    as: "campaign"
                }
            },
            {
                $unwind: "$campaign" // Assuming each order matches exactly one product
            },

            {
                $group: {
                    _id: "$campaign_id",
                    // _id: "$campaign", // Grouping by the _id field of the campaign subdocument
                    // _id: "$campaign",
                    campaign: { $first: "$campaign" },
                    total_clicked: { $sum: { $cond: [{ $eq: ["$is_clicked", true] }, 1, 0] } },
                    total_impressed: { $sum: { $cond: [{ $eq: ["$is_impression", true] }, 1, 0] } },
                    total_reached: { $sum: { $cond: [{ $eq: ["$is_reached", true] }, 1, 0] } },

                }
            },
            {
                $addFields: {
                    // campaign: "$_id",
                    cpc: 0.5
                }

            },
            {
                $project: {

                    _id: 0,
                    total_clicked: 1,
                    total_impressed: 1,
                    total_reached: 1,
                    campaign: 1,
                    total_spend: { $multiply: ["$total_clicked", 0.5] }, // Calculate total_cpc
                    cpc: 1
                }
            }
        ]);

        return res.json({
            status: 200,
            campaignPerformanceSummary: campaignPerformanceSummary
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: err.message
        });
    }
};
const getCampaignPerformanceList = async (req, res) => {
    try {
        const { campaign_id } = req.params;
        const list = await campaignPerformance.aggregate([
            {
                $match: {
                    campaign_id: new mongoose.Types.ObjectId(campaign_id),
                },
            },
            {
                $lookup: {
                    from: "campaigns",
                    localField: "campaign_id",
                    foreignField: "_id",
                    as: "campaign"
                }
            },
            {
                $unwind: "$campaign" // Assuming each order matches exactly one product
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    // list: { $push: "$$ROOT._id" },
                    // count: { $sum: 1 },
                    campaign: { $first: "$campaign" },
                    total_clicked: { $sum: { $cond: [{ $eq: ["$is_clicked", true] }, 1, 0] } },
                    total_impressed: { $sum: { $cond: [{ $eq: ["$is_impression", true] }, 1, 0] } },
                    total_reached: { $sum: { $cond: [{ $eq: ["$is_reached", true] }, 1, 0] } },

                }
            },
            {
                $addFields: {
                    creation_date: "$_id",
                    cpc: 0.5,
                }

            },
            {
                $project: {

                    _id: 0,
                    // list: 1,
                    // count: 1,
                    campaign: 1,
                    total_clicked: 1,
                    total_impressed: 1,
                    total_reached: 1,
                    creation_date: 1,
                    total_spend: { $multiply: ["$total_clicked", 0.5] }, // Calculate total_cpc
                    cpc: 1
                }
            }
        ])


        return res.json({
            status: 200,
            campaignPerformanceList: list
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errors: err.message
        });
    }
};

module.exports = {
    uploadAdsPhoto, editCampaign, saveCampaign, getCampaigns, getCampaignById, updateCampaign,
    getLeftSideAds, getRightSideAds, getNewsFeedAds, saveCampaignPerformance, getCampaignPerformanceSummary,
    getCampaignPerformanceList, deleteCampaign
}