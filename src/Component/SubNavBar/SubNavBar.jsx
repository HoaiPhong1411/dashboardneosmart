import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCategorySuccess } from "../../app/categorySlice";

const SubNavBar = (props) => {
  const { dataCate, name } = props;

  const dispath = useDispatch();
  const handleActive = (e, cate) => {
    const elementLi = document.querySelectorAll(".sub-menu");
    elementLi.forEach((li) => {
      li.classList.remove("active-sub-menu");
    });
    e.target.closest(".sub-menu").classList.toggle("active-sub-menu");
    if (name == "category") {
      dispath(getCategorySuccess(cate));
    }
  };
  return (
    <>
      {dataCate?.map((item) => (
        <Link to={`/${name}`} key={item.id}>
          <li
            onClick={(e, cate) => handleActive(e, item)}
            className="sub-menu flex flex-row items-center text-[0.8rem] pl-8 py-2  w-full rounded-br-3xl rounded-tr-3xl text-[#777] hover:text-bgButton border-l-4 border-[#fefce8] dark:border-[black] cursor-pointer"
          >
            {item.title}
          </li>
        </Link>
      ))}
    </>
  );
};

export default SubNavBar;
