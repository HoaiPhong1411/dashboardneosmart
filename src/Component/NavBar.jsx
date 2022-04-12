import { Link } from "react-router-dom";
import { MdOutlineSmartToy } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaMicroblog } from "react-icons/fa";

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
];
const NavBar = () => {
  const handleActive = (e) => {
    const elementLi = document.querySelectorAll("li");
    elementLi.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.toggle("active");
  };
  return (
    <>
      <div className="flex flex-col ">
        <div className="p-5 text-[1.5rem] font-semibold tracking-widest text-[#fff]">
          Dashboard
        </div>
        <div className="px-5 flex flex-row justify-center items-center">
          <img
            src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg"
            alt=""
            className="w-[2.25rem] h-[2.25rem] rounded-[50%] mr-5"
          />
          <div className="text-[#fff] font-normal">Admin</div>
        </div>
        <div>
          <ul className="text-secondary mt-5">
            {nav.map((item, index) => (
              <Link to={item.path} key={index}>
                <li
                  onClick={(e) => handleActive(e)}
                  className="flex flex-row items-center px-5 py-2 hover:bg-[#292929] w-[90%] rounded-br-3xl rounded-tr-3xl hover:text-[#fff] border-l-4 border-primary hover:border-[#007bff] cursor-pointer"
                >
                  <span className="block w-8 h-8 rounded-[50%] bg-[#3d3d3d] mr-3 flex justify-center items-center">
                    {item.icon}
                  </span>
                  {item.name}
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
