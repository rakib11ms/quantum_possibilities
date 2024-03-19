const express = require('express');
const router = express.Router();

const { getPostReports, getPostReportById } = require('../../controller/ReportPosts/ReportPostsController');

router.get('/get-post-report-list', getPostReports);
router.get('/post-report/:id', getPostReportById);


module.exports = router;
