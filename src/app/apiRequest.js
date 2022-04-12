import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispath, navigate) => {
    dispath(loginStart());
    try {
        const url = "http://localhost:8000/api/auth/login";
        console.log(url);
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
        navigate("/login");
    } catch (error) {
        dispath(registerFailed());
    }
};
