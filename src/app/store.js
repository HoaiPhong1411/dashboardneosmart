import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productsReducer from "./productSlice/productsSlice";
import productReducer from "./productSlice/productSlice";
import categoryReducer from "./productSlice/categorySlice";
import listBlogReducer from "./blogSlice/listBlogSlice";
import blogsReducer from "./blogSlice/blogsSlice";
import productByCateIdReducer from "./productSlice/productByCateIdSlice";
import blogByBlogListIdReducer from "./blogSlice/blogByBlogListIdSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
const rootReducer = combineReducers({ auth: authReducer, users: userReducer, products: productsReducer, product: productReducer, category: categoryReducer, blogs: blogsReducer ,listBlog: listBlogReducer, productByCateId: productByCateIdReducer, blogByBlogListId: blogByBlogListIdReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export let persistor = persistStore(store);
