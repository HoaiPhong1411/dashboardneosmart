import { AiFillDelete } from "react-icons/ai";

const ButtonDelete = (props) => {
  const { handleClick } = props;
  return (
    <>
      <span
        onClick={handleClick}
        className=" mx-auto w-8 h-8 rounded-[50%] cursor-pointer bg-[#3d3d3d] mr-3 flex justify-center items-center hover:bg-[#e64141] hover:text-[#fff]"
      >
        <AiFillDelete />
      </span>
    </>
  );
};

export default ButtonDelete;
