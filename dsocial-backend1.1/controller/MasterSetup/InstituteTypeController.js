const InstituteType = require('../../models/settings/InstituteType');
const { validationResult } = require('express-validator');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/institute_type/logo');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});


const uploadLogo = multer({ storage: storage });

const createInstituteType = async (req, res) => {
    const { institute_type } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const instituteType = new InstituteType({ institute_type, data_status: 1 });
        await instituteType.save();
        return res.json({
            status: 200,
            instituteType: instituteType
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

const getAllInstituteType = async (req, res) => {
    const allInstituteType = await InstituteType.find({data_status:1});
    return res.json({
        status: 200,
        allInstituteType: allInstituteType
    })
}

module.exports = { createInstituteType, getAllInstituteType }