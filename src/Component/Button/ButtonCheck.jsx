import { BsCheckLg } from "react-icons/bs";

const ButtonCheck = (props) => {
  const { htmlFor, idIcon, style } = props;
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="inline-block p-[0.2rem] bg-[#33333390] rounded-sm border-2 border-[#fff] cursor-pointer"
      >
        <BsCheckLg id={idIcon} style={style} />
      </label>
    </>
  );
};

export default ButtonCheck;
