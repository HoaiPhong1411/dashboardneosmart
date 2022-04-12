const Header = () => {
  return (
    <>
      <div className="w-[80%] bg-primary p-[1rem] flex justify-between absolute right-0 top-0">
        <input
          type="text"
          placeholder="Search Product"
          className="px-5 py-1 bg-primary border-[1px] border-secondary text-[#fff] outline-none placeholder:text-sm w-[40%] rounded-lg "
        />
        <div>
          <img
            src="https://www.bootstrapdash.com/demo/corona-react-free/template/demo_1/preview/static/media/face15.736ec0d9.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Header;
