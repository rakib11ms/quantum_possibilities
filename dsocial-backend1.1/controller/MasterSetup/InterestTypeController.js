const InterestType = require('../../models/settings/InterestType');
const { validationResult } = require('express-validator');


const createInterestType = async (req, res) => {
    const { type_name } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const interestType = new InterestType({ type_name });
        await interestType.save();
        return res.json({
            status: 200,
            interestType: interestType
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ errors: err });

    }

}

module.exports = { createInterestType }