const Organization = require("../models/Organization");
const UserWorkPlace = require("../models/UserWorkPlace");

const saveOrUpdateWorkPlaceService = async (org_name, userId, start_date, end_date, username) => {
    console.log("workdata", org_name);
    try {

        let organization_id;
        let organization = await Organization.findOne({ "org_name": org_name });

        if (!organization) {
            organization = new Organization({
                org_name: org_name,
                owner_id: userId,
                status: 1
            });
            await organization.save();
            organization_id = organization._id;
        } else {
            organization_id = organization._id;
        }

        const userWorkPlace = await UserWorkPlace.findOneAndUpdate(
            { "org_id": organization_id, "user_id": userId },
            {
                $set: {
                    username: username,
                    org_name: org_name,
                    status: 1,
                    from_date: start_date,
                    to_date: end_date,
                    is_working: 0,
                    privacy: "public",
                }
            },
            { new: true, upsert: true }
        );
        return userWorkPlace;
    } catch (error) {
        console.log(error);
    }
};



const saveEducation = async (org_name, userId, start_date, end_date, username) => {
    // let { institute_name, institute_id, startDay, startMonth, startYear, endDay, endMonth, endYear, description } = req.body;
    try {

        const instituteWorkPlace = new EducationWorkPlace();
        instituteWorkPlace.user_id = userId;
        instituteWorkPlace.institute_name = org_name;
        instituteWorkPlace.username = username;
        // instituteWorkPlace.institute_type_id = instituteType._id;
        instituteWorkPlace.startDate = start_date;

        instituteWorkPlace.endDate = end_date

        instituteWorkPlace.is_Stuyding = 0;
        instituteWorkPlace.privacy = "public";
        // instituteWorkPlace.edu_or_ins = 1;
        // instituteWorkPlace.status = 1;
        await instituteWorkPlace.save();

        return instituteWorkPlace;
    }
    catch (error) {

        return res.status(500).json({ status: 500, message: error });
    }

}



module.exports = {
    saveOrUpdateWorkPlaceService, saveEducation
}