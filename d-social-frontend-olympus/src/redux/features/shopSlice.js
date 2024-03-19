import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  shopList: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShopList.fulfilled, (state, action) => {
      state.shopList = action.payload?.status == 200 ? action.payload.data : [];
    });

    builder.addCase(deleteShop.fulfilled, (state, action) => {
      state.shopList = state.shopList.filter(
        (shop) => shop._id !== action.payload.shopId
      );
    });

    builder.addCase(addShop.fulfilled, (state, action) => {
      state.shopList.push(action.payload.data);
    });

    builder.addCase(updateShop.fulfilled, (state, action) => {      
      state.shopList = state.shopList.map( 
        (item) => {
        const shopUpdate = action.payload.data;
        if (item?._id == shopUpdate?._id) {
          return shopUpdate;
        }
        return item
      })
    });
  },
});

export const fetchShopList = createAsyncThunk(
  "shop/fetchShopList",
  async () => {
    const shopList = await axiosInstance.get(`/api/get-all-store/`);
    return await shopList.data;
  }
);

export const deleteShop = createAsyncThunk(
  "shop/deleteShop",
  async (shopId) => {
    const response = await axiosInstance.post(`/api/delete-store/`, {
      store_id: shopId,
    });
    let resData = response.data;
    resData.shopId = shopId;
    return await resData;
  }
);

export const addShop = createAsyncThunk("shop/addShop", async (formData) => {
  const response = await axiosInstance.post(`/api/save-store/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return await response.data;
});

export const updateShop = createAsyncThunk("shop/updateShop", async (formData) => {
  const response = await axiosInstance.post(`/api/update-store/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return await response.data;
});

export default shopSlice.reducer;
