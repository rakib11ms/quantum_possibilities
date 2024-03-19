const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWorkPlaceSchema = new Schema({

    org_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        default: null
    },
    org_name: {
        type: String,
        require: true,
        default: null
    },
    user_id: {
        type: String,
        require: true,
        default: null
    },
    username: {
        type: String,
        required: false,
        default: null
    },
    from_date: {
        type: Date,
        require: true,
        default: null
    },
    to_date: {
        type: Date,
        require: false,
        default: null
    },
    is_working: {
        type: Boolean,
        require: false,
        default: null
    },

    privacy: {
        type: String,
        require: false,
        default: null
    },
    status: {
        type: Number,
        require: false,
        default: null
    },
    created_by: {
        type: Number,
        require: false,
        default: null
    },
    update_by: {
        type: Number,
        require: false,
        default: null
    },
}, { timestamps: true });

const UserWorkPlace = mongoose.model('UserWorkPlace', userWorkPlaceSchema);
module.exports = UserWorkPlace;