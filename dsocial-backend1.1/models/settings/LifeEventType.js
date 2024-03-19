const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const lifeEventTypeSchema = new Schema({
    event_type: {
        type: String,
        require: false,
        default: null
    },
    logo: {
        type: String,
        require: false,
        default: null
    },

    data_status: {
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


const LifeEventType = mongoose.model('LifeEventType', lifeEventTypeSchema);

module.exports = LifeEventType;