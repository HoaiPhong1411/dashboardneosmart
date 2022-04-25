import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutStart,
    registerFailed,
    registerStart,
    registerSuccess,
} from "./authSlice";
import {
    getAllUserFailed,
    getAllUserStart,
    getAllUserSuccess,
} from "./userSlice";

import {
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailed,
} from "./productSlice/productsSlice";
import {
    getCategoryFailed,
    getCategoryStart,
    getCategorySuccess,
} from "./productSlice/categorySlice";
import {
    getAllBlogFailed,
    getAllBlogStart,
    getAllBlogSuccess,
} from "./blogSlice/blogsSlice";
import {
    getBlogByBlogListIdStart,
    getBlogByBlogListIdSuccess,
    getBlogByBlogListIdFailed,
} from "./blogSlice/blogByBlogListIdSlice";
import { getProductByCategorySuccess } from "./productSlice/productByCateIdSlice";
import { useDispatch } from "react-redux";
import {
    getListBlogFailed,
    getListBlogStart,
    getListBlogSuccess,
} from "./blogSlice/listBlogSlice";

export const loginUser = async (user, dispath, navigate) => {
    dispath(loginStart());
    try {
        const url = "http://localhost:8000/api/auth/login";
        const res = await axios.post(url, user);
        dispath(loginSuccess(res.data));

        navigate("/");
    } catch (error) {
        dispath(loginFailed());
        console.log(error);
    }
};

export const registerUser = async (user, dispath, navigate) => {
    dispath(registerStart());
    try {
        const urlRegis = "http://localhost:8000/api/auth/register";
        await axios.post(urlRegis, user);
        dispath(registerSuccess());
        navigate("/signin");
    } catch (error) {
        dispath(registerFailed());
        console.log(error);
    }
};
export const getAllUser = async (access_token, dispath, axiosJWT) => {
    dispath(getAllUserStart());
    try {
        const urlGetAll = "http://localhost:8000/api/auth/getalluser";
        const res = await axiosJWT.get(urlGetAll, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        dispath(getAllUserSuccess(res.data));
        console.log(res.data);
    } catch (error) {
        dispath(getAllUserFailed());
    }
};
export const logOut = async (dispath, navigate, access_token) => {
    dispath(logOutStart());
    try {
        const urlLogout = "http://localhost:8000/api/LogoutJTW";
        await axios.post(urlLogout, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        dispath(loginSuccess());
    } catch (error) {
        dispath(loginFailed());
    }
};
// call api product
export const getAllProduct = async (dispath) => {
    dispath(getAllProductStart());
    try {
        const urlProduct = "http://localhost:8000/api/product/index";
        const res = await axios.get(urlProduct);
        dispath(getAllProductSuccess(res.data));
    } catch (error) {
        dispath(getAllProductFailed());
    }
};

// call api Category
export const getAllCategory = async (dispath) => {
    dispath(getCategoryStart());
    try {
        const urlProduct = "http://localhost:8000/api/category/index";
        const res = await axios.get(urlProduct);
        dispath(getCategorySuccess(res.data));
    } catch (error) {
        dispath(getCategoryFailed());
    }
};

// call api get blog

export const getAllBlog = async (dispath) => {
    dispath(getAllBlogStart());
    try {
        const urlBlog = "http://localhost:8000/api/blog/index";
        const res = await axios.get(urlBlog);
        dispath(getAllBlogSuccess(res.data));
    } catch (error) {
        dispath(getAllBlogFailed());
    }
};
// End call api get blog

// call api get blog List

export const getAllListBlog = async (dispath) => {
    dispath(getListBlogStart());
    try {
        const urlBlog = "http://localhost:8000/api/listblog/index";
        const res = await axios.get(urlBlog);
        dispath(getListBlogSuccess(res.data));
    } catch (error) {
        dispath(getListBlogFailed());
    }
};
// End call api get blog List

// call api get Product By CateId

export const getProductByCategory = async (dispath, id) => {
    try {
        const urlProByCate = `http://localhost:8000/api/product/show/category/${id}`;
        const res = await axios.get(urlProByCate);
        dispath(getProductByCategorySuccess(res.data));
    } catch (error) {
        console.log(error);
    }
};
// Ebd call api get Product By CateId

// call api get Blog By BlogListId

export const getBlogByBlogListId = async (dispath, id) => {
    dispath(getBlogByBlogListIdStart());
    try {
        const urlBlogByBlogListId = `http://localhost:8000/api/blog/show/listblog/${id}`;
        const res = await axios.get(urlBlogByBlogListId);
        dispath(getBlogByBlogListIdSuccess(res.data));
    } catch (error) {
        dispath(getBlogByBlogListIdFailed());
    }
};
// End call api get Blog By BlogListId
