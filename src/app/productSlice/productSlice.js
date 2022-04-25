import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice( {
    name: 'product',
    initialState: {
        product: {
            product: [],
            isFetching: false,
            failed: false,
        }
    },
    reducers: {
        getALlProductStart: (state) => {
            state.product.isFetching = true
        },
        getAllProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.product.failed = false;
            state.product.product = [action.payload]
        },
        getAllProductFailed: (state) => {
            state.product.isFetching = false
            state.product.failed = true
        }  
    }
});

export const {
    getALlProductStart,
    getAllProductSuccess,
    getAllProductFailed
} = productSlice.actions;

export default productSlice.reducer;