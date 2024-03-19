import { cartApiSlice } from "./cartApiSlice";

export const cartApi = cartApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: "/cart",
                method: "GET",
            }),
        }),

        addToCart: builder.mutation({
            query: (body) => ({
                url: "/saveOrder",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["cart"],
            clearCart: true,
        }),

        removeFromCart: builder.mutation({
            query: (body) => ({
                url: "/cart",
                method: "DELETE",
                body: body,
            }),
            invalidatesTags: ["cart"],
        }),

        clearCart: builder.mutation({
            query: () => ({
                url: "/cart",
                method: "DELETE",
            }),
            invalidatesTags: ["cart"],
        }),
    }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation } = cartApi;
