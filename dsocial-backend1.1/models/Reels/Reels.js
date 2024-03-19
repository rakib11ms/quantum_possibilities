const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReelsSchema = new Schema({
    description: {
        type: String,
        required: false,
        default: null
    },

  
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,     
        ref: 'User',

    },
    video: {
        type: String,
        required: false,
        default: null
    },

    reels_privacy: {
        type: String,
        required: false,
        default: null,   

    }
,
 
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
    updated_by: {
        type: String,
        required: false,
        default: null
    },
}, { timestamps: true });


const Reels = mongoose.model('Reels', ReelsSchema);
//to use blog habe exports
module.exports = Reels;