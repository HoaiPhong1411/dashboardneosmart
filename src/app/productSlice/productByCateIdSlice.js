import { createSlice } from "@reduxjs/toolkit";

const productByCateIdSlice = createSlice({
    name: 'productByCateId',
    initialState: {
        productByCateId: []
    },
    reducers: {
        getProductByCategorySuccess: (state, action) => {
            state.productByCateId = [action.payload];
        }
    }
});

export const { 
    getProductByCategorySuccess
} = productByCateIdSlice.actions

export default productByCateIdSlice.reducer