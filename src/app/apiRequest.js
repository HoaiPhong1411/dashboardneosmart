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

<<<<<<< HEAD
import { getALlProductStart, getAllProductSuccess, getAllProductFailed } from "./productsSlice";
import { getALlBlogStart, getAllBlogSuccess, getAllBlogFailed } from "./blogsSlide";
=======
import {
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailed,
    getProductByIdSuccess,
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
import {
    getMenuStart,
    getMenuFailed,
    getMenuSuccess,
    getMenuByIdSuccess,
} from "./menuSlice/menuSlice";
import { clientApi } from "../api/api";
import {
    getMessageByIdSuccess,
    getMessageFailed,
    getMessageStart,
    getMessageSuccess,
} from "./messageSlice/messageSlice";
>>>>>>> origin/phong

export const loginUser = async (user, dispath, navigate) => {
    dispath(loginStart());
    try {
        const url = "http://localhost:8000/api/auth/login";
        const res = await axios.post(url, user);
        dispath(loginSuccess(res.data));

        navigate("/");
    } catch (error) {
        dispath(loginFailed());
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
        const res = await clientApi.productShow();
        dispath(getAllProductSuccess(res.data));
    } catch (error) {
        dispath(getAllProductFailed());
    }
};
<<<<<<< HEAD
export const getFullBlog = async (dispath) => {
    dispath(getALlBlogStart())
    try {
        const urlBlog = "http://localhost:8000/api/blog/index"
        const res = await axios.get(urlBlog)   
        dispath(getAllBlogSuccess(res.data))
    } catch (error) {
        dispath(getAllBlogFailed())
        // console.log(error);
    }
};
=======

// call api product by id

export const getProductById = async (dispatch, id) => {
    try {
        const res = await clientApi.productShowById(id)
        dispatch(getProductByIdSuccess(res.data))
    } catch (error) {
        console.log(error);
    }
}

// End call api product by id

// call api get Product By CateId

export const getProductByCategory = async (dispath, id) => {
    try {
        const res = await clientApi.productShowByCategoryId(id);
        dispath(getProductByCategorySuccess(res.data));
    } catch (error) {
        console.log(error);
    }
};
// End call api get Product By CateId

// call api Category
export const getAllCategory = async (dispath) => {
    dispath(getCategoryStart());
    try {
        const res = await clientApi.categoryShow();
        dispath(getCategorySuccess(res.data));
    } catch (error) {
        dispath(getCategoryFailed());
    }
};

// call api get blog

export const getAllBlog = async (dispath) => {
    dispath(getAllBlogStart());
    try {
        const res = await clientApi.blogShow();
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
        const res = await clientApi.listBlogShow();
        dispath(getListBlogSuccess(res.data));
    } catch (error) {
        dispath(getListBlogFailed());
    }
};
// End call api get blog List

// call api get Blog By BlogListId

export const getBlogByBlogListId = async (dispath, id) => {
    dispath(getBlogByBlogListIdStart());
    try {
        const res = await clientApi.blogShowByListBlogId(id);
        dispath(getBlogByBlogListIdSuccess(res.data));
    } catch (error) {
        dispath(getBlogByBlogListIdFailed());
    }
};
// End call api get Blog By BlogListId

export const getAllMenu = async (dispath) => {
    dispath(getMenuStart());
    try {
        const res = await clientApi.menuShow();
        dispath(getMenuSuccess(res.data));
    } catch (error) {
        dispath(getMenuFailed()) 
    }
};

// Call Api message

export const getAllMessage = async (dispath) => {
    dispath(getMessageStart());
    try {
        const res = await clientApi.messageShow();
        dispath(getMessageSuccess(res.data));
    } catch (error) {
        dispath(getMessageFailed());
    }
};

export const getMessageById = async (dispath, id) => {
    try {
        const res = await clientApi.messageShowById(id);
        dispath(getMessageByIdSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
};

// End Call Api message
// getMenuById
>>>>>>> origin/phong
