const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReelpostReactionSchema = new Schema({

    reaction_type: {
        type: String,
        required: false,
        default: null,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',

    },
 
 
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Reels'

    },
    post_single_item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PostMedia'

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
    updated_by: {
        type: String,
        required: false,
        default: null
    },
}, { timestamps: true });


const ReelPostReaction = mongoose.model('ReelPostReaction', ReelpostReactionSchema);
//to use blog habe exports
module.exports = ReelPostReaction;