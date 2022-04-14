import React, { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../../app/apiRequest";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../../app/authSlice";

const ClientHome = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users.allUsers);
    let axiosJWT = axios.create();
    const dispath = useDispatch();
    const navigate = useNavigate();

    const refreshToken = async () => {
        try {
            const urlRefresh = "http://localhost:8000/api/auth/refresh";
            const res = await axios.post(urlRefresh, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    axiosJWT.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.access_token);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    access_token: data.access_token,
                };
                dispath(loginSuccess(refreshUser));
                config.headers["token"] = "Bearer" + data.access_token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        if (user?.access_token) {
            getAllUser(user?.access_token, dispath, axiosJWT);
        }
    }, []);
    return (
        <div>
            <>
                {userList?.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between mb-6"
                    >
                        <div className="flex gap-4  w-1/5 ">
                            <FaUserAlt className="text-[white]" />
                            <p className="text-[white]">{user.name}</p>
                        </div>
                        <div className=" w-1/5  flex justify-center items-center">
                            <p className="text-[white]">{user.email}</p>
                        </div>
                        <div className="w-1/5 flex items-center">
                            {user.level == 1 ? (
                                <p className="text-[white]"> Role : admin </p>
                            ) : (
                                <p className="text-[white]"> Role : user </p>
                            )}
                        </div>
                        <div className="w-1/5">
                            {" "}
                            <button className="text-[white] bg-[blue] p-2 rounded-xl   ">
                                Edit Role
                            </button>
                        </div>
                    </div>
                ))}
            </>
        </div>
    );
};

export default ClientHome;
