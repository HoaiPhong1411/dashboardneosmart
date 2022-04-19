import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Outlet } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../app/authSlice";
import NavBar from "../Component/NavBar";
import "./ClientLayout.css";
import { IoArrowUndoCircleSharp } from "react-icons/io5";

export default function ClientLayout() {
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
    }, []);
    const refContainer = useRef(null);
    const refArrow = useRef(null);
    const handleHide = () => {
        refArrow.current.classList.add("active-menu");
        refContainer.current.classList.add("dashboard-menu");
        refContainer.current.children[1].children[0].classList.toggle(
            "active-menu"
        );
        refContainer.current.children[1].children[1].children[1].classList.toggle(
            "active-menu"
        );
        refContainer.current.children[1].children[2].classList.toggle(
            "hide-navMenu"
        );
    };
    const handleShow = () => {
        refContainer.current.classList.remove("dashboard-menu");
        refContainer.current.children[1].children[0].classList.remove(
            "active-menu"
        );
        refContainer.current.children[1].children[1].children[1].classList.remove(
            "active-menu"
        );
        refContainer.current.children[1].children[2].classList.remove(
            "hide-navMenu"
        );
        refArrow.current.classList.remove("active-menu");
    };
    return (
        <>
            <div className="w-full min-h-screen flex flex-row transition-all">
                <div
                    ref={refContainer}
                    className="transition-all duration-300 ease-out w-[20%] dark:bg-[black] bg-[white] relative"
                >
                    <div className="w-full" ref={refArrow}>
                        <IoArrowUndoCircleSharp
                            style={{ fontSize: "35px" }}
                            className="absolute w-[50px] top-[20px] ml-[200px] cursor-pointer dark:text-[white]"
                            onClick={() => handleHide()}
                        />
                    </div>
                    <NavBar show={handleShow} />
                </div>
                <div className="w-full  flex flex-col">
                    <div className="dark:bg-[black] bg-[white ] py-[1.25rem] px-[1.5rem]">
                        <Header />
                    </div>
                    <div className="dark:bg-[black] bg-[white] min-h-screen p-7">
                        <Outlet />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}
