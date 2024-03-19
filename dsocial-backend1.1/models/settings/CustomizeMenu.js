const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomizeMenuSchema = new Schema({

    type: {
        type: String,
        enum: ['leftMenu', 'rightMenu'],
        require: false,
        default: null
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',
    },
    content: {
        type: Array,
        require: false,
        default: []
    },
    ip_address: {
        type: String,
        require: false,
        default: null
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',
    },
    update_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'User',
    },
}, { timestamps: true });



const CustomizeMenu = mongoose.model('CustomizeMenu', CustomizeMenuSchema);
//to use blog habe exports
module.exports = CustomizeMenu;