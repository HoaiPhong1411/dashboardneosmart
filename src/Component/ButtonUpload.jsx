import { AiOutlineCloudUpload } from "react-icons/ai";

const ButtonUpload = (props) => {
  const { htmlFor } = props;
  return (
    <label htmlFor={htmlFor} className="py-1 px-4 bg-[transparent] ">
      <AiOutlineCloudUpload className="text-[1.8rem] " />
    </label>
  );
};

export default ButtonUpload;
