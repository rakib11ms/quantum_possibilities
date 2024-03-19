import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  addProductFormData: {
    product_name: "",
    category_name: "",
    brand_name: "",
    unit: "",
    weight: "",
    description: "",
    image_path: "",
    price: "",
    discount_type: "",
    discount: "",
    tax: "",
    vat: "",
    product_store: "",
    status: "",
    product_condition: "",
    shipping_method: "",
    is_physical_product: "",
    shipping_weight: "",
    shipping_height: "",
    length: "",
    width: "",
  },
  errors: {},
};

const addProductSlice = createSlice({
  name: "add-product",
  initialState,
  reducers: {
    insertFormData: (state, action) => {
      state.addProductFormData = {...state.addProductFormData, ...action.payload};
    },

    setErrors: (state, action) => {
      console.log(action.payload);
      state.errors = action.payload;
    },
    resetForm: (state) => {
      state.addProductFormData = initialState.addProductFormData;
      state.errors = initialState.errors;
    },
  },
});

export const {insertFormData, setErrors, resetForm} = addProductSlice.actions;

export const addProductData = (state) => state.addFormData.addProductFormData;
export const AddProductFormErrors = (state) => state.addFormData.errors;

export default addProductSlice.reducer;
