

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axios";

const initialState = {
    loading: false,
    allPrivateOneToOneMessage: [],
    allGroupMessage: [],
};

// console.log("initial state", initialState.searchValue)




const FetchAllPrivateOneToOneMessageSlice = createSlice({
    name: "fetchAllPrivateOneToOneMessage",
    initialState,
    reducers: {

        handleFetchOneToOneMessage: (state, action) => {
            const result = action.payload;
            state.allPrivateOneToOneMessage = result
        },

        handleFetchGroupMessage: (state, action) => {
            const result = action.payload;
            state.allGroupMessage = result
        }

    },
});

export const { handleFetchOneToOneMessage, handleFetchGroupMessage } = FetchAllPrivateOneToOneMessageSlice.actions;

export default FetchAllPrivateOneToOneMessageSlice.reducer;
