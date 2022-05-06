import { IoMdAddCircle } from "react-icons/io";
import { useFormik} from "formik";
import axios from "axios";

const ClientAddListBlog = () => {

  // Prevent event submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // End Prevent event submit
// ------------------------------
  // Formik handle
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (value) => {
      const data = new FormData();
      data.append("title", value.title);
      data.append("description", value.description);
      addListBlog(data);
    },
  });
  const addListBlog = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/listblog/store",
        data
      );
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      alert("Vui Lòng Nhập Đầy Đủ !");
    }
  };

  // End formik handle
  // ---------------------------------------

  return (
    <>
      <div className="flex flex-row gap-5 w-full bg-primary py-5 px-10 rounded-xl">
        <h1 className="text-[#fff] text-[1.4rem]">Add List</h1>
      </div>
      <div
        onSubmit={formik.handleSubmit}
        className=" gap-5 w-full bg-primary py-5 px-10 rounded-xl mt-7"
      >
        <form
          id="form"
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="text-[#fff]"
        >
          <div className="flex flex-col justify-between gap-2 items-start mb-5">
            <label htmlFor="title" className="text-[1.25rem] font-normal">
              Name
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Name"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border-[1px] font-light border-secondary outline-none bg-primary focus:border-[#e0ed2e]"
            />
          </div>
          {/* End title */}

          {/* ------------------------------------ */}

          {/* Description */}
          <div className="flex flex-col justify-between gap-2 items-start mb-5">
            <label htmlFor="description" className="text-[1.25rem] font-normal">
              Description
            </label>
            <textarea
              rows="3"
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border-[1px] font-light border-secondary outline-none bg-primary focus:border-[#e0ed2e]"
            />
          </div>
          {/* End Description */}

          {/* ------------------------------------ */}



          {/* Button Add */}
          <div className="flex flex-row justify-center items-center">
            <button className="flex flex-row justify-center items-center gap-3 px-4 py-2 bg-secondary rounded-lg hover:bg-[#e64141] text-[1.25rem]">
              <IoMdAddCircle />
              Add Blog
            </button>
          </div>

          {/* End Button Add */}

          {/* ------------------------------------ */}
        </form>
        <p id="err" className="text-[red] text-[2rem] font-light"></p>
      </div>
    </>
  );
};

export default ClientAddListBlog;
