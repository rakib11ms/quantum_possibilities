const { validationResult } = require('express-validator')
const Organization = require('../../models/Organization');
const UserWorkPlace = require('../../models/UserWorkPlace');

const getOrSaveOrganization = async (req, res) => {
    const data = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }

        let organization = await Organization.findOne({ "org_name": req.body.org_name });
        if (organization.length > 0) {
            return res.status(200).json({ message: 'Organization already exists.', status: 200, data: organization });
        }
        else {
            organization = new Organization({
                org_name: data.org_name,
                location: data.location,
                rating: data.rating,
                phone: data.phone,
                email: data.email,
                profile_pic: data.profile_pic,
                organization_id: data.organization_id,
                description: data.description,
                is_ownership_claimed: data.is_ownership_claimed,
                owner_id: data.owner_id,
                status: data.status,
                created_by: data.created_by,
                updated_by: data.updated_by,
            });
            await organization.save();
            res.status(200).json({ message: 'Organization Saved successfully', status: 200, data: organization });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};


const saveWorkPlace = async (req, res) => {
    const data = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }
        let organization_id;
        let organization = await Organization.findOne({ "org_name": req.body.org_name });
        if (!organization) {
            organization = new Organization({
                org_name: data.org_name,
                location: data.location,
                rating: data.rating,
                phone: data.phone,
                email: data.email,
                profile_pic: data.profile_pic,
                organization_id: data.organization_id,
                description: data.description,
                is_ownership_claimed: data.is_ownership_claimed,
                owner_id: data.owner_id,
                status: data.status,
                created_by: data.created_by,
                updated_by: data.updated_by,
            });
            await organization.save();
            if (res.status(200)) {
                organization_id = organization._id;
            } else {
                return res.status(500).json({
                    errors: error.message
                });
            }
        }

        if (organization_id) {
            const userWorkPlace = new UserWorkPlace({
                org_id: organization_id,
                org_name: data.org_name,
                user_id: data.user_id,
                username: data.username,
                status: data.status,
                from_date: data.from_date,
                to_date: data.to_date,
                is_Working: data.is_Working,
                created_by: data.created_by,
                updated_by: data.updated_by,
            });
            await userWorkPlace.save();
            return res.status(200).json({ message: 'WorkPlace Saved successfully', status: 200, userWorkPlace: userWorkPlace });
        }
        else {
            return res.status(500).json({
                errors: error.message
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });

    }
}

const saveOrUpdateWorkPlace = async (req, res) => {
    const data = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }

        let organization_id;
        let organization = await Organization.findOne({ "org_name": req.body.org_name });

        if (!organization) {
            organization = new Organization({
                org_name: data.org_name,
                location: data.location,
                rating: data.rating,
                phone: data.phone,
                email: data.email,
                profile_pic: data.profile_pic,
                organization_id: data.organization_id,
                description: data.description,
                is_ownership_claimed: data.is_ownership_claimed,
                owner_id: data.owner_id,
                status: data.status,
                created_by: data.created_by,
                updated_by: data.updated_by,
            });
            await organization.save();
            organization_id = organization._id;
        } else {
            organization_id = organization._id;
        }

        const userWorkPlace = await UserWorkPlace.findOneAndUpdate(
            { "org_id": organization_id, "user_id": data.user_id },
            {
                $set: {
                    username: data.username,
                    org_name: data.org_name,
                    status: data.status,
                    from_date: data.from_date,
                    to_date: data.to_date,
                    is_working: data.is_working,
                    privacy: data.privacy,
                    created_by: data.created_by,
                    updated_by: data.updated_by,
                }
            },
            { new: true, upsert: true }
        );
        res.status(200).json({ message: 'WorkPlace Saved or Updated successfully', status: 200, userWorkPlace: userWorkPlace });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};

const getWorkplaceByUserId = async (req, res) => {
    const data = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }
        let userWorkPlace = await UserWorkPlace.find({ "username": data.username }).sort({ "is_working": -1 });
        if (userWorkPlace.length > 0) {
            return res.status(200).json({ message: 'WorkPlace already exists.', status: 200, data: userWorkPlace });
        }
        else {
            return res.status(200).json({ message: 'WorkPlace not found.', status: 200, data: userWorkPlace });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
};

const deleteWorkplace = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }
        let userWorkPlace = await UserWorkPlace.findOneAndDelete({ "_id": req.body._id });
        if (userWorkPlace) {
            return res.status(200).json({ message: 'WorkPlace deleted successfully.', status: 200, data: userWorkPlace });
        }
        else {
            return res.status(200).json({ message: 'WorkPlace not found.', status: 200, data: userWorkPlace });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
}

const updateWorkplace = async (req, res) => {
    try {
        const data = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, errors: errors.array() });
        }

        const updatedUserWorkPlace = await UserWorkPlace.findOneAndUpdate(
            { "_id": req.body._id },
            {
                $set: {
                    "org_name": data.org_name,
                    "user_id": data.user_id,
                    "username": data.username,
                    "status": data.status,
                    "from_date": data.from_date,
                    "to_date": data.to_date,
                    "is_Working": data.is_Working,
                    "created_by": data.created_by,
                    "updated_by": data.updated_by,
                }
            },
            { new: true } // to return the updated document
        );

        if (updatedUserWorkPlace) {
            return res.status(200).json({ message: 'WorkPlace updated successfully.', status: 200, data: updatedUserWorkPlace });
        } else {
            return res.status(200).json({ message: 'WorkPlace not found.', status: 200, data: null });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: error.message
        });
    }
}


module.exports = { getOrSaveOrganization, saveWorkPlace, getWorkplaceByUserId, deleteWorkplace, updateWorkplace, saveOrUpdateWorkPlace }