import { Link } from "react-router-dom";

const SubNavBar = (props) => {
  const { dataCate } = props;

  const handleActive = (e) => {
    const elementLi = document.querySelectorAll(".sub-menu");
    elementLi.forEach((li) => {
      li.classList.remove("active-sub-menu");
    });
    e.target.closest(".sub-menu").classList.toggle("active-sub-menu");
  };
  return (
    <>
      {dataCate?.map((item) => (
        <Link to={`/product/edit`} key={item.id}>
          <li
            onClick={(e) => handleActive(e)}
            className="sub-menu flex flex-row items-center px-5 py-2 hover:bg-[#292929] w-[90%] rounded-br-3xl rounded-tr-3xl hover:text-[#fff] border-l-4 border-[#fefce8] dark:border-[black] hover:border-[#fce355fb] dark:hover:border-[#fce355fb] cursor-pointer"
          >
            {item.title}
          </li>
        </Link>
      ))}
    </>
  );
};

export default SubNavBar;
