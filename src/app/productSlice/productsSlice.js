import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice( {
    name: 'products',
    initialState: {
        product: {
            product: [],
            isFetching: false,
            failed: false,
        }
    },
    reducers: {
        getAllProductStart: (state) => {
            state.product.isFetching = true
        },
        getAllProductSuccess: (state, action) => {
            state.product.isFetching = true;
            state.product.failed = true;
            state.product.product = action.payload
        },
        getAllProductFailed: (state) => {
            state.product.isFetching = false
            state.product.failed = true
        }

    }
});

export const {
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailed,
} = productsSlice.actions;

export default productsSlice.reducer;