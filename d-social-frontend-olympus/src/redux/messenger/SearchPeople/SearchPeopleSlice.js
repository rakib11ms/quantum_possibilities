

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utils/axios";

const initialState = {
    loading: false,
    users: [],
    filteredUsers: [],
    searchValue: "",
};

// console.log("initial state", initialState.searchValue)




const searchPeopleSlice = createSlice({
    name: "searchPeople",
    initialState,
    reducers: {
 
        handleSearchFiltering: (state, action) => {
            const searchValue = action.payload.trim().toLowerCase();
            // console.log("searchValue", searchValue);

            state.filteredUsers = state.users.filter((user) => {
                const firstName = user.first_name.trim();
                const lastName = user.last_name.trim();

                const fullName = `${firstName} ${lastName}`.toLowerCase();
                // console.log("fullName", fullName);

                return fullName.includes(searchValue);
            });
        }

    },


    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                // console.log("Hello data",action)
                state.filteredUsers = state.users;

            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                // Handle the error here if needed
                console.error("Error fetching all users:", action.error);
            });
    },
});

export const {handleSearchFiltering } = searchPeopleSlice.actions;

export const fetchAllUsers = createAsyncThunk(
    "searchPeople/fetchAllUsers",
    async () => {
        try {
            const allUsersResponse = await axiosInstance.get(`/api/all-users/`);
            return allUsersResponse.data.all_users;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }
);

export default searchPeopleSlice.reducer;
