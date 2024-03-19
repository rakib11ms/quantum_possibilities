import {apiSlice} from "@/redux/apiSlice";

export const addProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    marketplaceProduct: builder.query({
      query: () => ({
        url: "/get-all-product",
        method: "GET",
      }),
      providesTags: ["seller-product"],
    }),
  }),
});

export const {useMarketplaceProductQuery} = addProductApi;
