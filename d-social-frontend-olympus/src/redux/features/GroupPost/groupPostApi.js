import { apiSlice } from "@/redux/apiSlice";
import axiosInstance from "../../../../utils/axios";
import { createFormData, savePostFormData } from "@/redux/utils";

export const GroupPostApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Batpari korsi
    saveGroupPost: builder.mutation({
      query: async (body) => {
        const formData = savePostFormData(body);

        const response = await axiosInstance.post("api/save-group-post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      },
      invalidatesTags: ["get-all-post"],
    }),

    saveGroupComment: builder.mutation({
      query: async (body) => {
        const commentData = createFormData(body);

        const response = await axiosInstance.post(
          "api/save-user-comment-by-group-post",
          commentData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      },
      invalidatesTags: ["get-all-post"],
    }),

    replySaveGroupComment: builder.mutation({
      query: async (body) => {
        const replyCommentData = createFormData(body);

        const response = await axiosInstance.post(
          "api/reply-comment-by-direct-group-post",
          replyCommentData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      },
      invalidatesTags: ["get-all-post"],
    }),

    shareGroupPostWithCaption: builder.mutation({
      query: (body) => ({
        url: "/save-share-group-post-with-caption",
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["get-all-post"],
    }),

    getAllGroupPost: builder.query({
      
      query: (body) => ({
        url: "/get-group-posts",
        method: "POST",
        body: body
      }),
      providesTags: ["get-all-post"],
    }),

    getAllGroupPostReaction: builder.query({
      query: (postId) => ({
        url: `/reaction-user-lists-of-direct-group-post/${postId}`,
        method: "GET",
      }),
      providesTags: ["get-all-post"],
    }),
  }),
});

export const {
 useSaveGroupPostMutation,
  useGetAllGroupPostQuery,
  useSaveGroupCommentMutation,
  useReplySaveGroupCommentMutation,
  useShareGroupPostWithCaptionMutation,
  useGetAllGroupPostReactionQuery
} = GroupPostApi;

