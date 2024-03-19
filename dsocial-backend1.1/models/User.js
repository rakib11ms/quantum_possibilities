const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    first_name: {
        type: String,
        required: false,
        default: null
    },
    last_name: {
        type: String,
        required: false,
        default: null
    },
    username: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: false,
        default: null
    },
    email_list:{
        type: Array,
        required: false,
        default: []
    },
    phone: {
        type: String,
        required: false,
        default: null
    },
    phone_list: {
        type: Array,
        required: false,
        default: []
    },
    password: {
        type: String,
        required: false,
        default: null
    },

    profile_pic: {
        type: String,
        required: false,
        default: null
    },
    cover_pic: {
        type: String,
        required: false,
        default: null
    },

    user_status: {
        type: String,
        required: false,
        default: null
    },

    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender',
        default: null

    },

    religion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Religion',
        default: null

    },
    date_of_birth: {
        type: Date,
        required: false,
        default: null
    }
    ,
    user_bio: {
        type: String,
        required: false,
        default: null
    },
    language: {
        type: String,
        required: false,
        default: null
    },
    passport: {
        type: String,
        required: false,
        default: null
    },
    last_login: {
        type: String,
        required: false,
        default: null
    },
    user_2fa_status: {
        type: String,
        required: false,
        default: null
    },
    secondary_email: {
        type: String,
        required: false,
        default: null
    },
    recovery_email: {
        type: String,
        required: false,
        default: null
    },
    relation_status: {
        type: String,
        required: false,
        default: null
    },
    home_town: {
        type: String,
        required: false,
        default: null
    },
    birth_place: {
        type: String,
        required: false,
        default: null
    },
    blood_group: {
        type: String,
        required: false,
        default: null
    },
    reset_password_token: {
        type: String,
        required: false,
        default: null
    },
    websites: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Websites',
        required: false,
        default: null
    },
    user_nickname: {
        type: String,
        required: false,
        default: null
    },
    user_about: {
        type: String,
        required: false,
        default: null
    },
    present_town: {
        type: String,
        required: false,
        default: null
    },
    reset_password_token_expires: {
        type: String,
        required: false,
        default: null
    },
    user_role: {
        type: String,
        required: false,
        default: null
    },
  
    lock_profile: {
        type: String,
        required: false,
        default: null
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
    update_by: {
        type: String,
        required: false,
        default: null
    },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
//to use blog habe exports
module.exports = User;