const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const CommentReactionSchema=new Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    },
    
    post_single_item_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null,
        ref: 'GroupMedia'
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
        ref: 'GroupPostComment'
    },
    comment_replies_id:{
        type:mongoose.Schema.ObjectId,
        required: false,
        default: null,
        ref: 'GroupPostReplyComment'
    },
 
    reaction_type:{
        type:String,
        required:false,
        default:null
    }


});
const GroupPostCommentReaction= mongoose.model('GroupPostCommentReaction', CommentReactionSchema);

module.exports=GroupPostCommentReaction;