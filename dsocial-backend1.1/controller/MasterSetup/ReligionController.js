const { validationResult } = require('express-validator');
const Religion = require('../../models/settings/Religion')

const createReligion = async (req, res) => {
    const { religion_name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const religion = new Religion({ religion_name });
        await religion.save();
        return res.json({
            status: 200,
            religion: religion
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllReligionName = async (req, res) => {
    const allReligion = await Religion.find({});
    return res.json({
        status: 200,
        allReligion: allReligion
    })
}

module.exports = { createReligion, getAllReligionName }