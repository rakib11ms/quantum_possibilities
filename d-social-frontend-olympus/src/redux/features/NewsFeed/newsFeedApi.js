import { apiSlice } from "@/redux/apiSlice";
import { createFormData, savePostFormData } from "@/redux/utils";
import axiosInstance from "../../../../utils/axios";

export const NewsFeedApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      // Batpari korsi
      savePost: builder.mutation({
         query: async (body) => {
            const formData = savePostFormData(body);
            console.log("body___", body);
            const response = await axiosInstance.post("api/save-post", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            return response.data;
         },
         invalidatesTags: ["get-all-post"],
      }),
      editPost: builder.mutation({
         query: async (body) => {
            if (!body.feeling_id) {
               body.feeling_id = "";
            };
            if (!body.location_id) {
               body.location_id = "";
            };
            const formData = savePostFormData(body);
            console.log("_formData__", formData);
            const response = await axiosInstance.post("api/edit-post", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            return response.data;
         },
         invalidatesTags: ["get-all-post"],
      }),

      saveComment: builder.mutation({
         query: async (body) => {
            const commentData = createFormData(body);

            const response = await axiosInstance.post(
               "api/save-user-comment-by-post",
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

      replySaveComment: builder.mutation({
         query: async (body) => {
            const replyCommentData = createFormData(body);

            const response = await axiosInstance.post(
               "api/reply-comment-by-direct-post",
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

      sharePostWithCaption: builder.mutation({
         query: (body) => ({
            url: "/save-share-post-with-caption",
            method: "POST",
            body: body,
            headers: {
               "Content-Type": "application/json",
            },
         }),
         invalidatesTags: ["get-all-post"],
      }),

      getAllPost: builder.query({
         query: ({ pageNo, pageSize }) => ({
            url: `/get-all-users-posts?pageNo=${pageNo}&pageSize=${pageSize}`,
            method: "GET",
         }),
         providesTags: ["get-all-post"],
         invalidatesTags: ["get-all-post"],
      }),

      getAllPostReaction: builder.query({
         query: (postId) => ({
            url: `/reaction-user-lists-of-direct-post/${postId}`,
            method: "GET",
         }),
         providesTags: ["get-all-post"],
         invalidatesTags: ["get-all-post"],
      }),

      getCommentReactionDetailsInfo: builder.mutation({
         query: (body) => ({
            url: "/reaction-user-lists-comments-of-a-direct-post",
            method: "POST",
            body: body,
            headers: {
               "Content-Type": "application/json",
            },
         }),
         invalidatesTags: ["get-all-post"],
      }),

      deleteSinglePost: builder.mutation({
         query: (body) => ({
            url: "/delete-post-by-id",
            method: "POST",
            body: body,
            headers: {
               "Content-Type": "application/json",
            },
         }),
         invalidatesTags: ["get-all-post"],
      }),
      deleteMasterComment: builder.mutation({
         query: (body) => ({
            url: "/delete-single-comment",
            method: "POST",
            body: body,
            headers: {
               "Content-Type": "application/json",
            },
         }),
         invalidatesTags: ["get-all-post"],
      }),
   }),
});

export const {
   useSavePostMutation,
   useEditPostMutation,
   useGetAllPostQuery,
   useSaveCommentMutation,
   useReplySaveCommentMutation,
   useSharePostWithCaptionMutation,
   useGetAllPostReactionQuery,
   useGetCommentReactionDetailsInfoMutation,
   useDeleteSinglePostMutation,
   useDeleteMasterCommentMutation,
} = NewsFeedApi;

export const useGetAllPostReactionMutation = NewsFeedApi.useGetAllPostQuery;
export const useGetAllPostMutation = NewsFeedApi.useGetAllPostQuery;
export const useGetAllCommentsQuery = NewsFeedApi.useGetAllPostQuery;
export const useDeletePostMutation = NewsFeedApi.useGetAllPostQuery;
export const useDeleteCommentMutation = NewsFeedApi.useGetAllPostQuery;
export const useDeleteReplyMutation = NewsFeedApi.useGetAllPostQuery;
export const useDeleteMasterReplyMutation = NewsFeedApi.useGetAllPostQuery;
