const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {
        type: String,
        require: false,
        default: null
    },
    description: {
        type: String,
        require: false,
        default: null
    },


    content: {
        type: String,
        require: false,
        default: null
    },

    url: {
        type: String,
        require: false,
        default: null
    },

    image: {
        type: String,
        require: false,
        default: null
    },
    publishedAt: {
        type: String,
        require: false,
        default: null
    },

    ip_address: {
        type: String,
        require: false,
        default: null
    },
    createdAt: {
        type: Date,
        required: false,
        default: null,
    },
    updatedAt: {
        type: Date,
        required: false,
        default: null,
    },
}, { timestamps: true });


const News = mongoose.model('News', newsSchema);

module.exports = News;