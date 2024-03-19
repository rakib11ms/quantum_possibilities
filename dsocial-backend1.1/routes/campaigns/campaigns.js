const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { auth } = require("../../middleware/AuthMiddleware");
const {
    saveCampaign, getCampaigns, getCampaignById, uploadAdsPhoto, getLeftSideAds, getRightSideAds, editCampaign,
    getNewsFeedAds,
    saveCampaignPerformance,
    getCampaignPerformanceSummary,
    getCampaignPerformanceList, deleteCampaign
} = require("../../controller/Campaign/CampaignController");

router.post("/save", auth, uploadAdsPhoto.array('campaign_cover_pic'), saveCampaign);
router.patch("/edit/:id", auth, uploadAdsPhoto.array('campaign_cover_pic'), editCampaign);
router.post("/list", auth, getCampaigns);
router.get("/show/:id", getCampaignById);
router.patch("/delete/:id", deleteCampaign);
router.get('/get-left-side-ads',auth, getLeftSideAds);
router.get('/get-right-side-ads',auth, getRightSideAds);
router.get('/get-center-side-ads', getNewsFeedAds);
router.post('/save-campaign-performance', auth, saveCampaignPerformance);
router.get('/get-campaign-performance/:campaign_id', getCampaignPerformanceSummary);
router.get('/get-campaign-performance-list/:campaign_id', getCampaignPerformanceList);

module.exports = router;