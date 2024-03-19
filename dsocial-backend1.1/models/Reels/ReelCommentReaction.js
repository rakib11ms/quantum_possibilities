const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ReelCommentReactionSchema=new Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null,
        ref: 'Reels'

    },
    
    post_single_item_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'PostMedia'
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        required: false,
        default: null,
        ref: 'User'
    },
    comment_id:{
        type:mongoose.Schema.ObjectId,
        required: false,
        default: null,
        ref: 'ReelComment'
    },
    comment_replies_id:{
        type:mongoose.Schema.ObjectId,
        required: false,
        default: null,
        ref: 'ReelReplyComment'
    },
 
    reaction_type:{
        type:String,
        required:false,
        default:null
    }


});
const ReelCommentReaction= mongoose.model('ReelCommentReaction', ReelCommentReactionSchema);

module.exports=ReelCommentReaction;