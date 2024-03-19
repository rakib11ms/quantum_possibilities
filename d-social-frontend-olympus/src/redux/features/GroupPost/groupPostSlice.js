import { createSlice } from "@reduxjs/toolkit";

export const addPostDataInfo = {
  description: "",
  feeling_id: "",
  activity_id: "",
  sub_activity_id: "",
  user_id: "",
  post_type: "",
  location_id: "",
  post_privacy: "public",
  post_background_color: "",
  files: [],
};

export const localPostInfo = {
  location: "",
  feelings: "",
  feelings_icon: "",
  tagsPeople: [],
};

const initialState = {
  addPostData: { ...addPostDataInfo },
  errors: {},
  localPostInfo: { ...localPostInfo },
  posts: null,
};

const groupPostSlice = createSlice({
  name: "group-post",
  initialState,
  reducers: {
    insertPostData: (state, action) => {
      console.log("action: " + action);
      state.addPostData = { ...state.addPostData, ...action.payload };
    },
    setLocalPostInfo: (state, action) => {
      state.localPostInfo = { ...state.localPostInfo, ...action.payload };
    },

    setAllPostData: (state, action) => {
      state.posts = action.payload;
    },
  },
});

//Exporting Reducer function  to use in Front end
export const { insertPostData, setAllPostData, setLocalPostInfo } = groupPostSlice.actions;


//Exporting State function  to use in Front end
export const addPostData = (state) => state.groupFeed.addPostData;
export const localPostInfos = (state) => state.groupFeed.localPostInfo;
export const allPosts = (state) => state.groupFeed.posts;
export default groupPostSlice.reducer;
