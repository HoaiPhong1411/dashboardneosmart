import { Link } from "react-router-dom";
import { MdOutlineSmartToy } from "react-icons/md";
import { BiCategory, BiMailSend } from "react-icons/bi";
import { FaMicroblog } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";

const nav = [
  {
    name: "Product",
    path: "/product",
    icon: <MdOutlineSmartToy />,
  },
  {
    name: "Category",
    path: "/category",
    icon: <BiCategory />,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: <FaMicroblog />,
  },
  {
    name: "User",
    path: "/",
    icon: <HiOutlineUserGroup />,
  },
  {
    name: "Mail",
    path: "/mail",
    icon: <BiMailSend />,
  },
];
const NavBar = ({ show }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const handleActive = (e) => {
    const elementLi = document.querySelectorAll("li");
    elementLi.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.closest(".menu").classList.toggle("active");
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="p-5 text-[1.5rem] font-semibold tracking-widest dark:text-[#fff] text-[black]">
          Dashboard
        </div>
        <div className="px-5 flex flex-row justify-center items-center mt-3">
          <img
            onClick={() => show()}
            src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg"
            alt=""
            className="w-[2.25rem] h-[2.25rem] rounded-[50%] mr-5 cursor-pointer"
          />
          {user ? (
            <div className="dark:text-[#fff] text-[black] font-normal">
              {user.user.name}
            </div>
          ) : (
            <div> Login</div>
          )}
        </div>
        <div>
          <ul className="dark:text-[white] mt-5">
            {nav.map((item, index) => (
              <Link to={item.path} key={index}>
                <li
                  onClick={(e) => handleActive(e)}
                  className="menu flex flex-row items-center px-5 py-2 hover:bg-bgButton w-[90%] rounded-br-3xl rounded-tr-3xl hover:text-[#fff] border-l-4 border-[#fefce8] dark:border-[black] hover:border-[#fce355fb] dark:hover:border-[#fce355fb] cursor-pointer"
                >
                  <span className="p-2 rounded-[50%] dark:bg-[#135d26]  bg-[#f5eec8f6] dark:text-[#fff] text-[#333] mr-3 flex justify-center items-center">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
