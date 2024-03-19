import { apiSlice } from "@/redux/apiSlice";

export const reactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Save Reaction
    saveGroupReaction: builder.mutation({
      query: (body) => ({
        url: "/save-reaction-group-main-post",
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["get-all-post"],
    }),

    saveGroupReactionByComment: builder.mutation({
      query: (body) => ({
        url: "/save-comment-reaction-of-direct-group-post",
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
  // useSaveReactionMutation,
  // useSaveReactionByCommentMutation

  useSaveGroupReactionMutation,
  useSaveGroupReactionByCommentMutation
} = reactionApi;
