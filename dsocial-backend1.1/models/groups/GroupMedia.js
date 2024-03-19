const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupMediaSchema = new Schema({
    caption: {
        type: String,
        required: false,
        default: null
    },
    
    media: {
        type: String,
        required: false,
        default: null
    },
    group_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,     
        ref: 'GroupPost',
    },
    status: {
        type: String,
        required: false,
        default: null
    },
    ip_address: {
        type: String,
        required: false,
        default: null
    },
    created_by: {
        type: String,
        required: false,
        default: null
    },
    update_by: {
        type: String,
        required: false,
        default: null
    },
}, { timestamps: true });


const GroupMedia = mongoose.model('GroupMedia', groupMediaSchema);
//to use blog habe exports
module.exports = GroupMedia;