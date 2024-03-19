const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlockListSchema = new Schema({
    blocked_from: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    blocked_to: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
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


const BlockList = mongoose.model('BlockList', BlockListSchema);

module.exports = BlockList;