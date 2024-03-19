const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivacySchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    post_type: {
        type: String,
        required: false,
        default: null,
    },
    
    who_can_see: {
        type: String,
        enum: ['public', 'friends', 'only_me'],
        require: false,
        default: null
    },
    who_can_share: {
        type: String,
        enum: ['public', 'friends', 'only_me'],
        require: false,
        default: null
    },
    who_can_comment: {
        type: String,
        enum: ['public', 'friends', 'only_me'],
        require: false,
        default: null
    },

    created_by: {
        type: String,
        require: false,
        default: null
    },
    update_by: {
        type: String,
        require: false,
        default: null
    },
}, { timestamps: true });


const Privacy = mongoose.model('Privacy', PrivacySchema);

module.exports = Privacy;