import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: {
            blogs: [],
            blog: [],
            isFetching: false,
            failed: false
        },
    },
    reducers: {
        getAllBlogStart: (state) => {
            state.blogs.isFetching = true;
        },
        getAllBlogSuccess: (state, action) => {
            state.blogs.isFetching = false;
            state.blogs.blogs = action.payload;
            state.blogs.failed = false;
        },
        getAllBlogFailed: (state) => {
            state.blogs.failed = true
        },
        addBlogSuccess: (state, action) => {
            state.blogs.blog = [action.payload];
        }
        
    }
})

export const {
    getAllBlogStart,
    getAllBlogSuccess,
    getAllBlogFailed,
    addBlogSuccess
} = blogsSlice.actions

export default blogsSlice.reducer