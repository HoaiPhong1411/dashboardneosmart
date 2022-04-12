import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { useState } from "react";

const Header = () => {
  const [inputValue, setInputValue] = useState();
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleShowProfile = (e) => {
    setShow(!show);
    console.log(show);
  };

  return (
    <>
      <div className="flex justify-between">
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Search Product"
          value={inputValue}
          className="px-5 py-1 bg-primary border-[1px] border-secondary text-[#fff] outline-none placeholder:text-sm w-[40%] rounded-lg "
        />
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
            <div className="text-sm">Admin</div>
            <IoMdArrowDropdown className="text-secondary text-lg" />
          </div>
        </div>
        <div
          style={show ? { display: "block" } : { display: "none" }}
          className="profile absolute top-[11%] w-[180px] rounded-[4px] right-[1rem] shadow-xl bg-primary text-[#fff] "
        >
          <div className="text-[16px] font-medium border-b-[1px] border-secondary px-5 py-3">
            Profile
          </div>
          <div className="hover:bg-[#222] pt-3 flex flex-row items-center cursor-pointer px-5 py-3">
            <span className="w-10 h-10 rounded-[50%] bg-[#000] mr-3 flex justify-center items-center">
              <MdOutlineLogout className=" text-[red] text-[1.25rem]" />
            </span>
            <span> Log Out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
