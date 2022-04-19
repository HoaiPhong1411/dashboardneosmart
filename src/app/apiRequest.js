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

import { getALlProductStart, getAllProductSuccess, getAllProductFailed } from "./productsSlice";

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

export const getFullProduct = async (dispath) => {
    dispath(getALlProductStart())
    try {
        const urlProduct = "http://localhost:8000/api/product/index"
        const res = await axios.get(urlProduct)   
        dispath(getAllProductSuccess(res.data))
    } catch (error) {
        dispath(getAllProductFailed())
    }
};