import {createSlice} from "@reduxjs/toolkit";
import {cartApi} from "./cartSliceApi";

const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {items: []};
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return {items: []};
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCartFn: (state, action) => {
      state.items.push(action.payload);
      saveCartToStorage(state);
    },
    removeFromCartFn: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
      saveCartToStorage(state);
    },
    clearCartFn: (state) => {
      state.items = [];
      console.log("state", state.items);
      saveCartToStorage(state);
    },
  },
});

export const {addToCartFn, removeFromCartFn, clearCartFn} = cartSlice.actions;
export default cartSlice.reducer;
