import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getAllUserStart: (state) => {
            state.users.isFetching = true;
        },
        getAllUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getAllUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
    },
});
export const { getAllUserFailed, getAllUserSuccess, getAllUserStart } =
    userSlice.actions;
export default userSlice.reducer;
