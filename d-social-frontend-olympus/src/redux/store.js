import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import modalSlice from "./features/modalSlice";
import shopSlice from "./features/shopSlice";
import addProductSlice from "./features/add-product/addProductSlice";
import SearchPeopleSlice from "./messenger/SearchPeople/SearchPeopleSlice";
import cartReducer from "./features/cartSlice";
import newsFeedSlice from "./features/NewsFeed/newsFeedSlice";
import groupPostSlice from "./features/GroupPost/groupPostSlice";
import commentSlice from "./features/NewsFeed/commentSlice";
import profileSlice from "./features/Profile/profileSlice";
import reactionSlice from "./features/Reaction/reactionSlice";
import pageSlice from "./features/Page/pageSlice";
import FetchAllPrivateOneToOneMessageSlice from "./messenger/LeftSideBarRefetch/LeftSideBarRefetchSlice"

const preloadedState = {};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    addFormData: addProductSlice,
    modal: modalSlice,
    shop: shopSlice,
    searchPeople: SearchPeopleSlice,
    cart: cartReducer,
    newFeed: newsFeedSlice,
    groupFeed: groupPostSlice,
    comment: commentSlice,
    profile: profileSlice,
    reaction: reactionSlice,
    page: pageSlice,
    fetchAllPrivateOneToOneMessage: FetchAllPrivateOneToOneMessageSlice
  },
  preloadedState,
  devTools: process.env.NODE_ENV === "production" ? false : true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});
