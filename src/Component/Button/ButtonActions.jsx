import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./Button.css";

const ButtonActions = (props) => {
  const { id, HandleDelete, handleEdit } = props;
  const idUl = `ul${id}`;
  let UlElement = document.getElementById(idUl);
  const handleShow = (e) => {
    UlElement.classList.toggle("show-drop-actions");
  };
  window.addEventListener("click", (e) => {
    const dropElement = document.querySelector(".show-drop-actions");
    console.log(e.target.closest(idUl));
  });

  return (
    <div className="relative flex justify-center items-center">
      <span
        onClick={(e) => handleShow(e)}
        className="p-2 rounded-[50%] hover:bg-lightPrimary dark:hover:bg-bgButton cursor-pointer"
      >
        <BsThreeDotsVertical className="" />
      </span>
      <ul
        id={idUl}
        className="hidden absolute bottom-[-220%] left-[-30%] bg-lightPrimary dark:bg-lightSecondary p-3 rounded-md shadow-lg z-20 "
      >
        <Link to="/product/edit">
          <li
            onClick={handleEdit}
            className="text-[0.8rem] font-medium text-bgButton cursor-pointer"
          >
            Edit
          </li>
        </Link>
        <li
          onClick={HandleDelete}
          className="text-[0.8rem] font-medium text-[#e64141] cursor-pointer"
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default ButtonActions;
