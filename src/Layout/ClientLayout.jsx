import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Outlet } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../app/authSlice";
import NavBar from "../Component/NavBar";
import "./ClientLayout.css";
import { RiMenuUnfoldFill, RiMenuFoldFill } from "react-icons/ri";
import NavBarClose from "../Component/NavBarClose";

export default function ClientLayout() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWT = axios.create();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
    console.log(show);
  };

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
  // const refContainer = useRef(null);
  // const refArrow = useRef(null);
  // const handleHide = () => {
  //   refArrow.current.classList.add("active-menu");
  //   refContainer.current.classList.add("dashboard-menu");
  //   refContainer.current.children[1].children[0].classList.toggle(
  //     "active-menu"
  //   );
  //   refContainer.current.children[1].children[1].children[1].classList.toggle(
  //     "active-menu"
  //   );
  //   refContainer.current.children[1].children[2].classList.toggle(
  //     "hide-navMenu"
  //   );
  // };
  // const handleShow = () => {
  //   refContainer.current.classList.remove("dashboard-menu");
  //   refContainer.current.children[1].children[0].classList.remove(
  //     "active-menu"
  //   );
  //   refContainer.current.children[1].children[1].children[1].classList.remove(
  //     "active-menu"
  //   );
  //   refContainer.current.children[1].children[2].classList.remove(
  //     "hide-navMenu"
  //   );
  //   refArrow.current.classList.remove("active-menu");
  // };
  return (
    <>
      <div className="w-full flex flex-row transition-all dark:bg-nightSecondary bg-lightSecondary">
        {/* {!show ? (
                    <div
                        // ref={refContainer}
                        className="transition-all duration-300 ease-out w-[20%] dark:bg-[black] bg-[#fefce8] "
                    >
                        <div
                            className="w-full"
                            //  ref={refArrow}
                        >
                            <RiArrowLeftSFill
                                style={{ fontSize: "35px" }}
                                className="absolute w-[50px] top-[20px] ml-[200px] cursor-pointer dark:text-[white] "

                                // onClick={() => handleHide()}
                            />
                        </div>
                        <NavBar
                        //  show={handleShow}
                        />
                    </div>
                ) : (
                    <div
                        // ref={refContainer}
                        // className="transition-all duration-300 ease-out w-[5%] dark:bg-[black] bg-[#f5eec8be]"
                        // onClick={handleShow()}
                    >
                        <div
                            className="w-full"
                            //  ref={refArrow}
                        >
                            <RiArrowRightSFill
                                style={{ fontSize: "35px" }}
                                className="absolute w-[50px] top-[20px] ml-[200px] cursor-pointer dark:text-[white] "
                                // onClick={() => handleHide()}
                                onClick={handleShow()}
                            />
                        </div>
                        <NavbarClose
                        //  show={handleShow}
                        />
                    </div>
                )} */}
        <div className="flex min-h-full">
          <div className="transition-all ">
            {!show ? <NavBar /> : <NavBarClose />}
          </div>
          <div className="cursor-pointer w-[25px]  flex justify-start items-start ">
            {!show ? (
              <RiMenuFoldFill
                className="text-hoverButton dark:text-secondary text-5xl mt-3"
                onClick={handleShow}
              />
            ) : (
              <RiMenuUnfoldFill
                className="text-hoverButton dark:text-secondary text-5xl mt-3 "
                onClick={handleShow}
              />
            )}
          </div>
        </div>

        <div className="w-full  flex flex-col">
          <div className=" py-[1.25rem] px-[1.5rem] dark:bg-nightSecondary bg-lightSecondary">
            <Header />
          </div>
          <div className=" min-h-screen p-7 dark:bg-[black] dark:border-[1px] bg-lightPrimary">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
