import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "@/environment";

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({
      baseUrl: host + "/api",
      prepareHeaders: (headers, { getState }) => {
         let token = "";

         if (typeof window !== "undefined") {
            token = localStorage.getItem("refreshToken");
         }
         headers.set("Authorization", `Bearer ${token}`);

         return headers;
      },
   }),
   refetchOnReconnect: true,
   tagTypes: ["seller-product", "marketplace-product", "get-all-post", "comments"],

   endpoints: (builder) => ({}),
});

export const {} = apiSlice;
