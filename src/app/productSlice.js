import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        pro: {
            
        }
    },
    reducer: {
        getProductEditSuccess: (state, action) => {
            state.pro = action.payload;
        }
    }
});

export const {
    getProductEditSuccess,
}  = productSlice.actions

export default productSlice.reducer;