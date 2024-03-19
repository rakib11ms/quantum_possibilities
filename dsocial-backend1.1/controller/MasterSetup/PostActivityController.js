const { validationResult } = require('express-validator');
const PostActivity = require('../../models/settings/PostActivity')

const createPostActivity = async (req, res) => {
    const { activity_name, logo } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const postActivity = new PostActivity({ activity_name, logo });
        await postActivity.save();
        return res.json({
            status: 200,
            postActivity: postActivity,
            message: 'Save Successfully'
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllPostActivity = async (req, res) => {
    const postActivity = await PostActivity.find({});
    return res.json({
        status: 200,
        postActivity: postActivity
    })
}
const getSearchActivity = async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm;
        let postActivity = {}
        if (searchTerm == "") {
            postActivity = await PostActivity.find({});
        } else {
            console.log(searchTerm);
            postActivity = await PostActivity.find({ feeling_name: { $regex: searchTerm, $options: 'i' } });
        }

        return res.json({
            status: 200,
            postActivity: postActivity
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }
}



module.exports = { createPostActivity, getAllPostActivity, getSearchActivity }