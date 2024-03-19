import { apiSlice } from "@/redux/apiSlice";

export const reactionApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      // Save Reaction
      saveReaction: builder.mutation({
         query: (body) => ({
            url: "/save-reaction-main-post",
            method: "POST",
            body: body,
            headers: {
               "Content-Type": "application/json",
            },
         }),
         invalidatesTags: ["get-all-post"],
      }),

      saveReactionByComment: builder.mutation({
         query: (body) => ({
            url: "/save-comment-reaction-of-direct-post",
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

export const { useSaveReactionMutation, useSaveReactionByCommentMutation } = reactionApi;
