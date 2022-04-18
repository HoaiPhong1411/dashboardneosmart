import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { BsLightbulbFill, BsLightbulbOffFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../app/apiRequest";
import ButtonSwitch from "./Button/ButtonSwitch";
import useDark from "../useDark";

const Header = () => {
    const [isDarkMode, toggleDarkMode] = useDark();
    const user = useSelector((state) => state.auth.login.currentUser);
    // const dispath = useDispatch();
    // const navigate = useNavigate();
    // const accessToken = user?.access_token;
    const [inputValue, setInputValue] = useState();
    const [show, setShow] = useState(false);
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleShowProfile = (e) => {
        setShow(!show);
        console.log(show);
    };
    const handleLogOut = () => {
        localStorage.clear();
        window.location.href = "/signin";
    };

    return (
        <>
            <div className="flex justify-between">
                <input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Search Product"
                    value={inputValue}
                    className="px-5 py-1 dark:bg-primary bg-[white] border-[1px] dark:text-[#fff] text-[black] outline-none placeholder:text-sm w-[40%] rounded-lg "
                />
                <div className="s">
                    {isDarkMode ? (
                        <div
                            className=" border-[1px] border-[white] p-2 flex justify-between items-center cursor-pointer transition-all "
                            onClick={toggleDarkMode}
                        >
                            <BsLightbulbOffFill className="text-[white]" />
                            <p className="text-[white]">DarkMode</p>
                        </div>
                    ) : (
                        <div
                            className=" border-[1px] border-[black] p-2 flex justify-between items-center cursor-pointer transition-all "
                            onClick={toggleDarkMode}
                        >
                            <BsLightbulbFill
                                onClick={toggleDarkMode}
                                className="text-[back]"
                            />
                            <p className="text-[black]">LightMode</p>
                        </div>
                    )}
                </div>
                <div
                    onClick={(e) => handleShowProfile(e)}
                    className="flex flex-row justify-center items-center cursor-pointer"
                >
                    <img
                        src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg"
                        alt=""
                        className="w-[2.25rem] h-[2.25rem] rounded-[50%]"
                    />

                    <div className="flex flex-row justify-center items-center text-[#fff] ml-3 relative">
                        {user ? (
                            <>
                                <div className="text-sm dark:text-[white] text-[black] ">
                                    {" "}
                                    Hi,{user.user.name}
                                </div>
                                <IoMdArrowDropdown className="dark:text-[white] text-[black] text text-lg" />
                            </>
                        ) : (
                            <Link to="/signin">Login</Link>
                        )}
                    </div>
                </div>

                <div
                    style={show ? { display: "block" } : { display: "none" }}
                    className="profile absolute top-[11%] w-[180px] rounded-[4px] right-[1rem] shadow-xl dark:bg-[black] bg-[white] dark:text-[#fff] text-[black] "
                >
                    <div className="text-[16px] font-medium border-b-[1px] border-secondary px-5 py-3 cursor-pointer">
                        Profile
                    </div>
                    <div
                        onClick={handleLogOut}
                        className=" pt-3 flex flex-row items-center cursor-pointer px-5 py-3"
                    >
                        <span className="w-10 h-10 rounded-[50%] dark:bg-[#000] bg-[white] mr-3 flex justify-center items-center">
                            <MdOutlineLogout className=" text-[red] text-[1.25rem]" />
                        </span>
                        <button> Log Out</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
