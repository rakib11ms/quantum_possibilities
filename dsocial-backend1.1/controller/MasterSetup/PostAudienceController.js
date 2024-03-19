const { validationResult } = require('express-validator');
const PostAudience = require('../../models/settings/PostAudience')

const createPostAudience = async (req, res) => {
    const { audience_name, logo } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const postAudience = new PostAudience({ audience_name, logo });
        await postAudience.save();
        return res.json({
            status: 200,
            postAudience: postAudience,
            message: 'Save Successfully'
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllPostAudience = async (req, res) => {
    const postAudience = await PostAudience.find({});
    return res.json({
        status: 200,
        postAudience: postAudience
    })
}

module.exports = { createPostAudience, getAllPostAudience }