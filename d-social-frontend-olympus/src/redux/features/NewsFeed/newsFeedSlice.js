import { createSlice } from "@reduxjs/toolkit";

export const addPostDataInfo = {
  description: "",
  feeling_id: "",
  activity_id: "",
  sub_activity_id: "",
  user_id: "",
  location_id: "",
  post_privacy: "public",
  post_background_color: "",
  removable_file_ids: [],
  files: [],

  tags: null,
  post_type: '',
  event_type: '',
  event_sub_type: '',
  org_name: '',
  start_date: null,
  end_date: null
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

const newsFeedSlice = createSlice({
  name: "news-feed",
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
export const { insertPostData, setAllPostData, setLocalPostInfo } = newsFeedSlice.actions;

//Exporting State function  to use in Front end
export const addPostData = (state) => state.newFeed.addPostData;
export const allPosts = (state) => state.newFeed.posts;
export const localPostInfos = (state) => state.newFeed.localPostInfo;

export default newsFeedSlice.reducer;
