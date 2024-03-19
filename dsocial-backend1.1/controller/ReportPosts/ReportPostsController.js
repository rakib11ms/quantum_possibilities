const PostReports = require('../../models/PostReports/PostReports');
const { validationResult } = require('express-validator')


const savePostReport = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { post_id, report_type, description } = req.body
    try {
        const postReport = new PostReports({
            user_id: req.userId,
            post_id,
            report_type,
            description,
            date: new Date(),
            status: 'pending'
        })
        await postReport.save()
        res.status(200).json({ message: 'Post reported successfully' })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
}

const getPostReports = async (req, res) => {
    try {
        const postReports = await PostReports.find()
        res.status(200).json(postReports)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
}

const getPostReportById = async (req, res) => {
    try {
        const postReport = await PostReports.findById(req.params.id)
        if (!postReport) {
            return res.status(404).json({ message: 'Post report not found' })
        }
        res.status(200).json(postReport)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
}

module.exports = { savePostReport, getPostReports, getPostReportById }