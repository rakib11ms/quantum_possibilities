const { validationResult } = require('express-validator');
const Hobbies = require('../../models/settings/Hobbies')

const createHobbies = async (req, res) => {
    const { hobbies_name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const hobbies = new Hobbies({ hobbies_name });
        await hobbies.save();
        return res.json({
            status: 200,
            hobbies: hobbies
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllHobbiesName = async (req, res) => {
    const allHobbies = await Hobbies.find({});
    return res.json({
        status: 200,
        allHobbies: allHobbies
    })
}

module.exports = { createHobbies, getAllHobbiesName }