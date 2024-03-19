const { validationResult } = require('express-validator');
const PostSubActivity = require('../../models/settings/PostSubActivity')

const createPostSubActivity = async (req, res) => {
    const { sub_activity_name, logo, activity_id } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const postSubActivity = new PostSubActivity({ sub_activity_name, logo, activity_id });
        await postSubActivity.save();
        return res.json({
            status: 200,
            postSubActivity: postSubActivity,
            message: 'Save Successfully'
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllPostSubActivity = async (req, res) => {
    const postSubActivity = await PostSubActivity.find({});
    return res.json({
        status: 200,
        postSubActivity: postSubActivity
    })
}
const getAllPostSubActivityById = async (req, res) => {
    const postSubActivity = await PostSubActivity.find({ activity_id: req.params.id }).populate('activity_id');

    return res.json({
        status: 200,
        postSubActivity: postSubActivity
    })
}

module.exports = { createPostSubActivity, getAllPostSubActivity, getAllPostSubActivityById }