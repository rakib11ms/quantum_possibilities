import { apiSlice } from "@/redux/apiSlice";
import axiosInstance from "../../../../utils/axios";
import { createFormData } from "@/redux/utils";

export const ProfileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getUserInfo: builder.mutation({
            query: (body) => ({
                url: "/get-user-info",
                method: "post",
                body: body
            }),
            invalidatesTags: ["get-user-info"],
        }),

        getUserPost: builder.mutation({
            query: (body) => ({
                url: "/get-all-users-post-individual",
                method: "post",
                body: body
            }),
            // invalidatesTags: ["get-user-info"],
        }),
    }),
});

export const { useGetUserInfoMutation, useGetUserPostMutation } = ProfileApi;
