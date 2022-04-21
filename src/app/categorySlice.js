import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice( {
    name: 'product',
    initialState: {
        category: {
            category: [],
            isFetching: false,
            failed: false,
        }
    },
    reducers: {
        getCategoryStart: (state) => {
            state.category.isFetching = true
        },
        getCategorySuccess: (state, action) => {
            state.category.isFetching = true;
            state.category.failed = true;
            state.category.category = [action.payload]
        },
        getCategoryFailed: (state) => {
            state.category.isFetching = false
            state.category.failed = true
        }

    }
});

export const {
    getCategoryStart,
    getCategorySuccess,
    getCategoryFailed,
} = categorySlice.actions;

export default categorySlice.reducer;