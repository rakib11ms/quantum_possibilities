import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "Create Store",
  img: "",
  name: "",
  category: "",
  description: "",
  shopId: null,
  pageId: null
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalToggle: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.title = action.payload?.title;
      state.img = action.payload?.img;
      state.name = action.payload?.name;
      state.category = action.payload?.category;
      state.description = action.payload?.description;
      state.shopId = action.payload?.shopId;
      state.pageId = action.payload?.pageId;
    },
  },
});

export const { modalToggle } = modalSlice.actions;

export default modalSlice.reducer;
