import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {host} from "@/environment";

export const cartApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: host + "/order",
    prepareHeaders: (headers, {getState}) => {
      let token = "";

      if (typeof window !== "undefined") {
        token = localStorage.getItem("refreshToken");
      }

      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  refetchOnReconnect: true,
  tagTypes: ["seller-product", "marketplace-product"],

  endpoints: (builder) => ({}),
});

export const {} = cartApiSlice;
