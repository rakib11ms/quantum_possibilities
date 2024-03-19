// likeSlice.js
import {createSlice} from "@reduxjs/toolkit";

const reactionSlice = createSlice({
  name: "like",
  initialState: {
    reactionState: {},

    reactionFormData: {
      reaction_type: "",
      user_id: "",
      post_id: "",
      post_single_item_id: null,
    },
  },
  reducers: {
    setHovered: (state, action) => {
      const {postId, isHovered} = action.payload;
      state.reactionState[postId] = {isHovered};
    },
    setReactionFormData: (state, action) => {
      state.reactionFormData = {...state.reactionFormData, ...action.payload};
    },
  },
});

export const {setHovered, setReactionFormData} = reactionSlice.actions;

// Assuming you want to get the isHovered state for a specific postId
export const selectIsHovered = (state) => state.reaction.reactionState;
export const reactionFormData = (state) => state.reaction.reactionFormData;

export default reactionSlice.reducer;
