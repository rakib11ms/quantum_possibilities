import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  commentFormData: {
    user_id: "" || null,
    post_id: "" || null,
    comment_name: "" || null,
    image_or_video: "" || null,
    link: "" || null,
    link_title: "" || null,
    link_description: "" || null,
    link_image: "" || null,
  },

  replyCommentFormData: {
    comment_id: "",
    replies_user_id: "",
    replies_comment_name: "",
    post_id: "",
    image_or_video: "",

    link: "",
    link_title: "",
    link_description: "",
    link_image: "",
  },

  commentReaction: {
    reaction_type: "",
    user_id: "",
    post_id: "",
    comment_id: "",
    comment_replies_id: "",
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setCommentFormData: (state, action) => {
      state.commentFormData = {...state.commentFormData, ...action.payload};
    },
    setReplyCommentFormData: (state, action) => {
      state.replyCommentFormData = {...state.replyCommentFormData, ...action.payload};
    },
    setCommentReactionFormData: (state, action) => {
      state.commentReaction = {...state.commentReaction, ...action.payload};
    },
  },
});

export const {setCommentFormData, setReplyCommentFormData, setCommentReactionFormData} = commentSlice.actions;

// export commentFormData = state=>
export const commentFormData = (state) => state.comment.commentFormData;
export const replyCommentFormData = (state) => state.comment.replyCommentFormData;
export const commentReactionFormData = (state) => state.comment.commentReaction;

export default commentSlice.reducer;
