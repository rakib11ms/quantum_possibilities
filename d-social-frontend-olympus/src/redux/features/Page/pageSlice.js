import { createSlice } from "@reduxjs/toolkit";

export const addPagePostDataInfo = {
    page_id: "",
    user_id: "",
    page_name: "",
    description: "",
    coverPhoto: "",
    profile: "",
    phone_number: "",
    post_type: "page_post",
    post_privacy: "public",
    post_background_color: "",
    files: [],
    followerCount: 0,
    likedCount: 0,
};

export const localPostInfo = {
    location: "",
    feelings: "",
    feelings_icon: "",
    tagsPeople: [],
};

const initialState = {
    addPagePostData: { ...addPagePostDataInfo },
    errors: {},
    localPostInfo: { ...localPostInfo },
    posts: null,
};

const pageSlice = createSlice({
    name: "page-feed",
    initialState,
    reducers: {
        insertPostData: (state, action) => {
            state.addPagePostData = { ...state.addPagePostData, ...action.payload };
        },

        setAllPostData: (state, action) => {
            state.pagePosts = action.payload;
        },
        setPageInfo: (state, action) => {
            console.log("__action__page__payload"),
                state.pageInfo = {
                    ...state.pageInfo,
                    ...action.payload
                };
            // savePageDataToStorage(state);
        },
        setLocalPostInfo: (state, action) => {
            state.localPostInfo = { ...state.localPostInfo, ...action.payload };
        },
    },
});

//Exporting Reducer function  to use in Front end
export const { insertPostData, setAllPostData, setPageInfo, setLocalPostInfo } = pageSlice.actions;

//Exporting State function  to use in Front end
export const addPagePostData = (state) => state.page.addPagePostData;
export const pagePosts = (state) => state.page.posts;
export const pageInfo = (state) => state.page.pageInfo;
export const localPostInfos = (state) => state.page.localPostInfo;

export default pageSlice.reducer;
