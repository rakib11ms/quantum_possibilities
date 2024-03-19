const { validationResult } = require('express-validator');
const PostFeelings = require('../../models/settings/PostFeelings')

const createPostFeelings = async (req, res) => {
    const { feeling_name, logo } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const postFeelings = new PostFeelings({ feeling_name, logo });
        await postFeelings.save();
        return res.json({
            status: 200,
            postFeelings: postFeelings,
            message: 'Save Successfully'
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllPostFeelings = async (req, res) => {
    const postFeelings = await PostFeelings.find({});
    return res.json({
        status: 200,
        postFeelings: postFeelings
    })
}

const getSearchFeelings = async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm;
        let postFeelings = {}
        if (searchTerm == "") {
            postFeelings = await PostFeelings.find({});
        } else {
            console.log(searchTerm);
            postFeelings = await PostFeelings.find({ feeling_name: { $regex: searchTerm, $options: 'i' } });
        }

        return res.json({
            status: 200,
            postFeelings: postFeelings
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }
}

module.exports = { createPostFeelings, getAllPostFeelings, getSearchFeelings }