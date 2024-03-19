import {apiSlice} from "@/redux/apiSlice";

export const addProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductStore: builder.query({
      query: () => ({
        url: "/get-all-store",
        method: "GET",
      }),
    }),

    // add product
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/save-product",
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["seller-product"],
    }),

    productFileUpload: builder.mutation({
      query: (body) => {
        return {
          url: "/product-file-upload",
          method: "POST",
          body: body,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: [],
    }),
  }),
});

export const {useGetProductStoreQuery, useAddProductMutation, useProductFileUploadMutation} = addProductApi;
