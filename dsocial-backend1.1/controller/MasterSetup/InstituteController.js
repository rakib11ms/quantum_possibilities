const Institute = require('../../models/Institutes');
const { validationResult } = require('express-validator');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/institute/logo');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});


const uploadLogo = multer({ storage: storage });

const createInstitute = async (req, res) => {
    const { institute_name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const institute = new Institute({ institute_name, status: 1 });
        await institute.save();
        return res.json({
            status: 200,
            institute: institute
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllInstitute = async (req, res) => {
    const allInstitute = await Institute.find({ status: 1 });
    return res.json({
        status: 200,
        allInstitute: allInstitute
    })
}

const searchInstitute = async (req, res) => {
    const searchTerm =req.body.searchTerm;
    console.log(searchTerm);
    // try {
    const instituteList = await Institute.find({ institute_name: { $regex: searchTerm, $options: 'i' } });

    return res.json({
        status: 200,
        instituteList: instituteList
    })
    // } catch (err) {
    //     console.log(err)
    //     return res.status(400).json({ errors: err });

    // }
}
module.exports = { createInstitute, getAllInstitute, searchInstitute }