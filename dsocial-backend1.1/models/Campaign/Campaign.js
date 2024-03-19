const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
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
        ref: 'Post',

    },
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    },
    campaign_name: {
        type: String,
        required: false,
        default: null,
    },
    campaign_category: {
        type: String,
        required: false,
        default: null,
    },
    page_name: {
        type: String,
        required: false,
        default: null,
    },
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Pages',
    },
    start_date: {
        type: Date,
        required: false,
        default: null,
    },
    end_date: {
        type: Date,
        required: false,
        default: null,
    },
    call_to_action: {
        type: String,
        required: false,
        default: null,
    },
    website_url: {
        type: String,
        required: false,
        default: null,
    },
    total_budget: {
        type: Number,
        required: false,
        default: null,
    },
    daily_budget: {
        type: Number,
        required: false,
        default: null,
    },
    gender: {
        type: String,
        required: false,
        default: null,
    },
    headline: {
        type: String,
        required: false,
        default: null,
    },
    description: {
        type: String,
        required: false,
        default: null,
    },
    phone_number: {
        type: String,
        required: false,
        default: null,
    },
    campaign_cover_pic: {
        type: Array,
        required: false,
        default: null,
    },
    ads_placement: {
        type: String,
        required: false,
        default: null,
    },
    destination: {
        type: String,
        required: false,
        default: null,
    },
    age_group: {
        type: String,
        enum: ['allAges', 'ageRange'],
        required: false,
        default: null,
    },
    from_age: {
        type: Number,
        required: false,
        default: null,
    },
    to_age: {
        type: Number,
        required: false,
        default: null,
    },
    locations: {
        type: Array,
        required: true,
        default: null,

    },
    keywords: {
        type: Array,
        required: false,
        default: null,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'draft', 'compleated'],
        required: false,
        default: false,
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
    created_by: {
        type: String,
        required: false,
        default: null,
    },
    updated_by: {
        type: String,
        required: false,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('Campaigns', campaignSchema);


