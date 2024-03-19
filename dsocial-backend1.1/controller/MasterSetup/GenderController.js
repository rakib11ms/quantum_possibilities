const { validationResult } = require('express-validator');
const Gender = require('../../models/settings/Gender')

const createGender = async (req, res) => {
    const { gender_name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const gender = new Gender({ gender_name });
        await gender.save();
        return res.json({
            status: 200,
            gender: gender
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllGenderName = async (req, res) => {
    const allGender = await Gender.find({});
    return res.json({
        status: 200,
        allGender: allGender
    })
}
const editGenderName = async (req, res) => {
    const editData = req.params.id;
    const gender = await Gender.find({ _id: editData });
    return res.json({
        status: 200,
        gender: gender
    })
}
const updateGender = async (req, res) => {
    const updateData = req.body
    const gender = await Gender.findOneAndUpdate({ _id: req.params.id }, updateData, { new: true });
    return res.json({
        status: 200,
        gender: gender
    })
}

const deleteGender = async (req, res) => {
    const Gender = await Gender.findOneAndDelete({ _id: req.params.id }, { new: true });
    const allGenders = await Gender.find({});

    return res.json({
        status: 200,
        allGenders: allGenders
    })
}

module.exports = { createGender, getAllGenderName, editGenderName, updateGender, deleteGender }