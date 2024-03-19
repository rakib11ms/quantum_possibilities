const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLifeEventSchema = new Schema({
    
    event_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'LifeEventType',
        default: null
    },

    description: {
        type: String,
        require: false,
        default: null
    },
    
    start_at: {
        type: Date,
        require: false,
        default: null
    },

    end_at: {
        type: Date,
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



const UserLifeEvent = mongoose.model('UserLifeEvent', userLifeEventSchema);
//to use blog habe exports
module.exports = UserLifeEvent;