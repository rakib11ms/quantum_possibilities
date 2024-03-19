const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const divisionSchema = new Schema({

    division_name: {
        type: String,
        require: false,
        default: null
    },
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Country',
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



const Division = mongoose.model('Division', divisionSchema);
//to use blog habe exports
module.exports = Division;