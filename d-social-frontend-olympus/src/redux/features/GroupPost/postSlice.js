import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  postData: {
    description: "",
    feeling_id: "",
    activity_id: "",
    sub_activity_id: "",
    user_id: "",
    post_type: "",
    location_id: "",
    post_privacy: "",
    post_background_color: "",
    files: [],
  },

  user: {
    user_id: "",
    user_name: "",
    user_email: "",
    user_password: "",
    user_phone: "",
    user_image: "",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    insertPostData: (state, action) => {
      state.postData = {...state.postData, ...action.payload};
    },

    insertUserData: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
