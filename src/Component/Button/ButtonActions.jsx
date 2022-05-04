import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

import "./Button.css";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlineBrandingWatermark } from "react-icons/md";

const ButtonActions = (props) => {
  const { HandleDelete, handleEdit, handleSeen } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    switch (e.target.innerText) {
      case "See more":
        handleSeen();
        break;
      case "Edit":
        handleEdit();
        break;
      case "Delete":
        HandleDelete();
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };
  const options = [
    {
      action: "See more",
      onC: handleClose,
    },
    {
      action: "Edit",
      onC: handleClose,
    },
    {
      action: "Delete",
      onC: handleClose,
    },
  ];
  const optionSee = [
    {
      action: "See more",
      onC: handleClose,
    },
  ];

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <BsThreeDotsVertical />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { backgroundColor: "#f5eec8" },
        }}
      >
        {!handleEdit
          ? optionSee.map((option) => (
              <MenuItem
                onClick={option.onC}
                style={{ height: "25px", fontSize: "13px", fontWeight: "600" }}
              >
                {option.action}
              </MenuItem>
            ))
          : options.map((option) => (
              <MenuItem
                onClick={option.onC}
                style={{ height: "25px", fontSize: "13px", fontWeight: "600" }}
              >
                {option.action}
              </MenuItem>
            ))}
      </Menu>
    </>
    // </div>
    // <div className="relative flex justify-center items-center">
    //   <span
    //     onClick={(e) => handleShow(e)}
    //     className="p-2 rounded-[50%] hover:bg-lightPrimary dark:hover:bg-bgButton cursor-pointer"
    //   >
    //     <BsThreeDotsVertical />
    //   </span>
    //   <ul
    //     id={idUl}
    //     className="hidden absolute bottom-[-180%] left-[-10%] bg-buttonAction dark:bg-lightSecondary p-3 rounded-md shadow-lg z-20 "
    //   >
    //     {handleSeen ? (
    //       <li
    //         onClick={handleSeen}
    //         className="text-[0.8rem] font-medium text-bgButton cursor-pointer"
    //       >
    //         Xem
    //       </li>
    //     ) : (
    //       ""
    //     )}
    //     {handleEdit ? (
    //       <Link to={`/${path}/edit`}>
    //         <li
    //           onClick={handleEdit}
    //           className="text-[0.8rem] font-medium text-bgButton cursor-pointer"
    //         >
    //           Edit
    //         </li>
    //       </Link>
    //     ) : (
    //       ""
    //     )}
    //     {HandleDelete ? (
    //       <li
    //         onClick={HandleDelete}
    //         className="text-[0.8rem] font-medium text-[#e64141] cursor-pointer"
    //       >
    //         Delete
    //       </li>
    //     ) : (
    //       ""
    //     )}
    //   </ul>
    // </div>
  );
};

export default ButtonActions;
