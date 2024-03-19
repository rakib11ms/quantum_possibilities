const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostReportsSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'User',
        default: null
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Post',
    },
    status: {
        type: String,
        enum: ['approve', 'denied', 'pending'],
        require: false,
        default: 'pending'
    },
    report_type: {
        type: String,
        enum: ['spam', 'false_info', 'nudity', 'something_else'],
        require: false,
        default: null
    },
    description: {
        type: String,
        require: false,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

module.exports = PostReports = mongoose.model('post_reports', PostReportsSchema);