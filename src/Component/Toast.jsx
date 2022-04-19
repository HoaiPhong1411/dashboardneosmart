import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdOutlineError } from "react-icons/md";
const Toast = (props) => {
  const { type, title, text } = props;
  let divElement;
  const [iconMessage, setIconMessage] = useState();
  const [classN, setClassN] = useState();
  useEffect(() => {
    divElement = document.querySelector(".toast");
    console.log(divElement);
    switch (type) {
      case "error":
        setIconMessage(<MdOutlineError />);
        // divElement?.classList.add("error");
        setClassN("error");
        break;
      case "success":
        setIconMessage(<BsCheckCircleFill />);
        // divElement?.classList.add("success");
        setClassN("success");
        break;
      case "warning":
        setIconMessage(<RiErrorWarningFill />);
        // divElement?.classList.add("warning");
        setClassN("warning");
        break;
      default:
        break;
    }
  }, [type]);
  return (
    <>
      {/* 
        Bỏ Component Toast trong div:
        <div className="fixed top-[10%] right-2 z-50">
        </div>

      */}
      <div
        id={classN}
        className="toast flex flex-row justify-between items-center gap-2 p-3 w-[20rem] h-[3.8rem] mt-5 text-base font-normal bg-[white] rounded-[4px] shadow-xl transition-all "
      >
        <div className="icon-left text-[1.25rem]">{iconMessage}</div>
        <div className="flex flex-col justify-center items-start flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-[#808080d2] font-light">{text}</p>
        </div>
        <div className="text-[1.25rem] cursor-pointer">
          <GrClose />
        </div>
      </div>
    </>
  );
};

export default Toast;
