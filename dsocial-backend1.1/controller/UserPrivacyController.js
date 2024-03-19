const UserPrivacySettings = require('../models/UserPrivacySettings')
const { validationResult } = require('express-validator')



const saveUserPrivacy = async (req, res) => {

    const data = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }


        let userPrivacySettingData = await UserPrivacySettings.findOne({
            $and: [
                { field_name: req.body.field_name },
                { user_id: req.userId }
            ]
        });

        if (userPrivacySettingData?.length > 0) {

            userPrivacySettingData.privacy = data.privacy;
            await userPrivacySettingData.save();
        }
        else {
            userPrivacySettingData = new UserPrivacySettings({
                field_name: data.field_name,
                privacy: data.privacy,
                user_id: req.userId,
            });
            await userPrivacySettingData.save();

        }

        res.status(200).json({
            message: 'User Privacy changed successfully',
            status: 200,
            data: userPrivacySettingData
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
}

module.exports = {
    saveUserPrivacy
}