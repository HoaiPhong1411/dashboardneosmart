import { IoMdArrowDropdown } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";
import { FiAlignJustify } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useDark from "../useDark";
import { io } from "socket.io-client";
import { clientApi } from "../api/api";

const socket = io("http://localhost:6001", {
  transports: ["websocket", "polling", "flashsocket"],
});

const Header = ({ handleShowRespon }) => {
  const [noti, setNoti] = useState();
  const [notification, setNotification] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [isDarkMode, toggleDarkMode] = useDark();
  const user = useSelector((state) => state.auth.login.currentUser);
  // const dispath = useDispatch();
  // const navigate = useNavigate();
  // const accessToken = user?.access_token;
  const [inputValue, setInputValue] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    socket.on("message", (data) => {
      setTimeout(() => {
        setNoti(!noti);
      }, 600);
    });
  });
  useEffect(() => {
    const getNotification = async () => {
      try {
        const res = await clientApi.messageShow();
        setNotification(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNotification();
  }, [noti]);

  useEffect(() => {
    const newNoti = notification.filter((mess) => mess.status == 0);
    setNewMessage(newNoti);
  }, [notification]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleShowProfile = (e) => {
    setShow(!show);
  };
  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Link to="/">
          <img
            src={require("../assets/images/logo.png")}
            alt="#"
            className="h-full dt:w-[150px] tb:w-[120px] "
          />
        </Link>
        <FiAlignJustify
          className="tb:block dt:hidden p-[2px] text-[38px] cursor-pointer translate-x-[-0.5rem] mr-[20px] dark:text-[#fff]"
          onClick={(e) => handleShowRespon(e)}
        />
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Search"
          value={inputValue}
          className="px-5 py-1 dark:bg-primary shadow-lg bg-[#fcfbf3] border-[1px] dark:text-[#fff] text-[black] outline-none placeholder:text-sm w-[40%] rounded-lg "
        />
        <div className="s">
          {isDarkMode ? (
            <div
              className="bg-gradient-to-b from-[#146910] to-[#bfda29] rounded-md  p-2 flex justify-between items-center cursor-pointer transition-all "
              onClick={toggleDarkMode}
            >
              <BsMoonStarsFill className="text-[black]" />
            </div>
          ) : (
            <div
              className="bg-gradient-to-t from-[#c2a016] to-[#b969de] shadow-md rounded-md p-2 flex justify-between items-center cursor-pointer transition-all "
              onClick={toggleDarkMode}
            >
              <BsSunFill className="text-[#f5eec8be]" />
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center gap-5 items-center cursor-pointer">
          <div className="flex justify-center items-center">
            <span className="relative p-2 bg-[#e8dd97be] dark:bg-hoverButton dark:text-[#fff] dark:hover:bg-bgButton shadow-md hover:bg-lightPrimary cursor-pointer rounded-[50%] ">
              <IoNotificationsSharp className="text-2xl" />
              <label className="absolute inline-flex h-[21px] min-w-[19px] justify-center items-center top-[-10px] left-[22px] bg-[red] rounded-[50%] text-xs text-[#fff] font-medium">
                <div className="pl-1 pr-1 ">{newMessage.length}</div>
              </label>
            </span>
          </div>
          <img
            onClick={(e) => handleShowProfile(e)}
            src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg"
            alt=""
            className="w-[2.25rem] h-[2.25rem] rounded-[50%]"
          />

          <div
            onClick={(e) => handleShowProfile(e)}
            className="flex flex-row justify-center items-center text-[#fff] relative"
          >
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
          className="profile absolute top-[11%] w-[180px] rounded-[4px] right-[1rem] shadow-md shadow-primary dark:bg-[black] bg-[#f5eec8] dark:text-[#fff] text-[black] z-[1000]"
        >
          <div className="text-[16px] font-medium border-b-[1px] border-secondary px-5 py-3 cursor-pointer">
            Profile
          </div>
          <div
            onClick={handleLogOut}
            className="group pt-3 flex flex-row items-center hover:bg-lightSecondary dark:hover:bg-nightSecondary cursor-pointer px-5 py-3"
          >
            <span className="w-10 h-10 rounded-[50%] bg-[#ffffffc0] dark:bg-bgButton group-hover:bg-lightPrimary mr-3 flex justify-center items-center">
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
