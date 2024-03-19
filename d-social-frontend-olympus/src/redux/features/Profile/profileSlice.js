import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    params: {
        username: "",
    },
    errors: {},

    userInfo: {
        _id:"",
        fullname: "",
        coverphoto: "",
        profile: "",
        bio: "",
        username: "",
        postsCount: "",
        followersCount: "",
        followingCount: "",
    },
};

const profileSlice = createSlice({
    name: "news-feed",
    initialState,
    reducers: {
        setGetUser: (state, action) => {

            console.log("__action__payload", action.payload)
            state.userInfo = { ...state.userInfo, ...action.payload };
        },

    },
});

//Exporting Reducer function  to use in Front end
export const { setGetUser } = profileSlice.actions;

//Exporting State function  to use in Front end

export const userInfo = state => state.profile.userInfo


export default profileSlice.reducer;
