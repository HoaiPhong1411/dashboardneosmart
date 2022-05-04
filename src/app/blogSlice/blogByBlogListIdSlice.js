import { createSlice } from "@reduxjs/toolkit";

const blogByBlogListIdSlice = createSlice({
    name: 'blogByBlogListId',
    initialState: {
        blogByBlogListId: {
            blogByBlogListId: [],
            currentBlog: [],
            isFetching: false,
            failed: false
        }
    },
    reducers: {
        getBlogByBlogListIdStart: (state) => {
            state.blogByBlogListId.isFetching = true;
        },
        getBlogByBlogListIdSuccess: (state, action) => {
            state.blogByBlogListId.isFetching = false;
            state.blogByBlogListId.blogByBlogListId = [action.payload];
            state.blogByBlogListId.failed = false;
        },
        getBlogByBlogListIdFailed: (state) => {
            state.blogByBlogListId.failed = true;
        },
        getCurrentBlogSuccess: (state, action) => {
            state.blogByBlogListId.currentBlog = [action.payload]
        }
    }
})
export const { 
    getBlogByBlogListIdStart,
    getBlogByBlogListIdSuccess,
    getBlogByBlogListIdFailed,
    getCurrentBlogSuccess
} = blogByBlogListIdSlice.actions


export default blogByBlogListIdSlice.reducer;