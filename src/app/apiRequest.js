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
        navigate("/login");
    } catch (error) {
        dispath(registerFailed());
        console.log(error);
    }
};
export const getAllUser = async (access_token, dispath) => {
    dispath(getAllUserStart());
    try {
        const urlGetAll = "http://localhost:8000/api/getalluser";
        const res = await axios.get(urlGetAll, {
            headers: {
                token: `Bearer ${access_token}`,
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
                token: `Bearer ${access_token}`,
            },
        });
        dispath(loginSuccess());
    } catch (error) {
        dispath(loginFailed());
    }
};
