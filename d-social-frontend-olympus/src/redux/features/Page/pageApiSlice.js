import { apiSlice } from '@/redux/apiSlice';
import { createFormData, savePostFormData } from '@/redux/utils';
import axiosInstance from '../../../../utils/axios';

export const PageApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getPageInfo: builder.mutation({
         query: (body) => ({
            url: '/get-page-details',
            method: 'post',
            body: body,
         }),
         invalidatesTags: ['get-page-details'],
      }),

      getPagePost: builder.mutation({
         query: (body) => ({
            url: '/get-pages-posts',
            method: 'post',
            body: body,
         }),
      }),
      savePagePost: builder.mutation({
         query: async (body) => {
            const formData = savePostFormData(body);

            const response = await axiosInstance.post('api/save-page-post', formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
            return response.data;
         },
         invalidatesTags: ['get-all-page-post'],
      }),

      saveComment: builder.mutation({
         query: async (body) => {
            const commentData = createFormData(body);

            const response = await axiosInstance.post(
               'api/save-user-comment-by-post',
               commentData,
               {
                  headers: {
                     'Content-Type': 'multipart/form-data',
                  },
               },
            );
            return response.data;
         },
         invalidatesTags: ['get-all-post'],
      }),

      replySaveComment: builder.mutation({
         query: async (body) => {
            const replyCommentData = createFormData(body);

            const response = await axiosInstance.post(
               'api/reply-comment-by-direct-post',
               replyCommentData,
               {
                  headers: {
                     'Content-Type': 'multipart/form-data',
                  },
               },
            );
            return response.data;
         },
         invalidatesTags: ['get-all-post'],
      }),

      getAllPost: builder.query({
         query: () => ({
            url: '/get-all-page-posts',
            method: 'GET',
         }),
         providesTags: ['get-all-post'],
      }),
   }),
});

export const {
   useGetPageInfoMutation,
   useGetPagePostMutation,
   useSavePagePostMutation,
   useGetAllPostQuery,
   useSaveCommentMutation,
   useReplySaveCommentMutation,
} = PageApi;
