const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockTypeSchema = new Schema({
    name: {
        type: String,
        require: false,
        default: null
    },
    status: {
        type: Number,
        require: false,
        default: null
    },
    ip_address: {
        type: String,
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


const BlockType = mongoose.model('BlockType', blockTypeSchema);

module.exports = BlockType;