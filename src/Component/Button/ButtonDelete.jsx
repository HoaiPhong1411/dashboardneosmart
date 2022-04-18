import { AiFillDelete } from "react-icons/ai";

const ButtonDelete = (props) => {
  const { handleClick } = props;
  return (
    <>
      <span
        onClick={handleClick}
        className="inline-block border-2 border-[#dedede] mx-auto p-[0.4rem] rounded-[50%] cursor-pointer bg-[#3d3d3d] mr-3 hover:bg-[#e64141] hover:text-[#fff]"
      >
        <AiFillDelete />
      </span>
    </>
  );
};

export default ButtonDelete;