import { IoMdAddCircle } from "react-icons/io";
import { useFormik} from "formik";
import axios from "axios";
import { useState } from "react";
import ButtonCheck from "../../../Component/Button/ButtonCheck";
import ButtonUpload from "../../../Component/Button/ButtonUpload";
import { useEffect } from "react";

import notimg from "../../../assets/images/image-not.jpg";

const ClientAddBlog = () => {
  const [image, setImage] = useState();
  const [display, setDisplay] = useState(true);
  const [position, setPosition] = useState(true);
  const [img, setImg] = useState();
  const [dataListBlog, setDataListBlog] = useState([]);
  const [listBlogId, setListBlogId] = useState();

  // ---------------------------------------

  useEffect(() => {
    const fecthListBlog = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/listblog/index");
        setDataListBlog(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthListBlog();
  }, []);

  // ---------------------------------------

  // Prevent event submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // End Prevent event submit
  // ---------------------------------------

  // Formik handle
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      photo: "",
      display: "",
      position: "",
      listblog_id: "",
    },
    onSubmit: (value) => {
      const data = new FormData();
      data.append("title", value.title);
      data.append("description", value.description);
      data.append("content", value.content);
      data.append("photo", image);
      data.append("display", display ? 1 : 0);
      data.append("position", position ? 1 : 0);
      data.append("listblog_id", listBlogId);
      addBlog(data);
    },
  });
  const addBlog = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/blog/store",
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

  // Handle image
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // End handle Image
  // ---------------------------------------

  // handle change display

  const handleChangeDisplay = (e) => {
    setDisplay(e.target.checked);
  };

  // End handle change display

  // ---------------------------------------

  // handle change position

  const handleChangePosition = (e) => {
    setPosition(e.target.checked);
  };

  // End handle change position

  // ---------------------------------------
  // handle change Category

  const handleChangeListBlog = (e) => {
    setListBlogId(e.target.value);
  };

  // End handle change ListBlog

  return (
    <>
      <div className="flex flex-row gap-5 w-full bg-primary py-5 px-10 rounded-xl">
        <h1 className="text-[#fff] text-[1.4rem]">Add BLog</h1>
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

          {/* Content */}
          <div className="flex flex-col justify-between gap-2 items-start mb-5">
            <label htmlFor="content" className="text-[1.25rem] font-normal">
              Content
            </label>
            <textarea
              rows="3"
              type="text"
              name="content"
              id="content"
              placeholder="Content"
              value={formik.values.content}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border-[1px] font-light border-secondary outline-none bg-primary focus:border-[#e0ed2e]"
            />
          </div>
          {/* End Content */}

          {/* ------------------------------------ */}

          {/* Display */}
          <div className="flex flex-row justify-between items-center mb-5">
            <label htmlFor="display" className="text-[1.25rem] font-normal">
              Display
            </label>
            <input
              type="checkbox"
              name="display"
              id="display"
              defaultChecked={true}
              onChange={(e) => handleChangeDisplay(e)}
              className="hidden"
            />
            <div className="w-[85%]">
              <ButtonCheck
                htmlFor="display"
                idIcon="btn-display"
                style={display ? { color: "#04f604" } : { color: "#fff" }}
              />
            </div>
          </div>

          {/* End Display */}

          {/* ------------------------------------ */}

          {/* Position */}
          <div className="flex flex-row justify-between items-center mb-5">
            <label htmlFor="position" className="text-[1.25rem] font-normal">
              Position
            </label>
            <input
              type="checkbox"
              name="position"
              id="position"
              defaultChecked={true}
              onChange={(e) => handleChangePosition(e)}
              className="hidden"
            />
            <div className="w-[85%]">
              <ButtonCheck
                htmlFor="position"
                idIcon="btn-position"
                style={position ? { color: "#04f604" } : { color: "#fff" }}
              />
            </div>
          </div>

          {/* End Position */}

          {/* ------------------------------------ */}

          {/* ListBlog id */}
          <div className="flex flex-row justify-between gap-2 items-start mb-5">
            <label htmlFor="category_id" className="text-[1.25rem] font-normal">
              List Blogs
            </label>
            <div className="w-[85%] flex justify-start items-center">
              <select
                onChange={(e) => handleChangeListBlog(e)}
                name="listblog_id"
                id="listblog_id"
                className="text-[#333] outline-none px-2 py-1"
              >
                {dataListBlog?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* End listBLog id */}

          {/* ------------------------------------ */}

          {/* Photo */}
          <div className="flex flex-row justify-between items-center mb-5">
            <label className="text-[1.25rem] font-normal">Photo</label>

            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              files={image}
              onChange={(e) => handleImage(e)}
              className="hidden w-[85%] px-3 py-2 border-[1px] font-light border-secondary outline-none bg-primary focus:border-[#e0ed2e]"
            />
            <div className="w-[85%] flex flex-row items-center">
              <ButtonUpload htmlFor="photo" />
              <img
                src={img ?? notimg}
                alt=""
                className="w-[300px] h-[300px] bg-cover border-2 border-secondary"
              />
            </div>
          </div>

          {/* End Photo */}

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

export default ClientAddBlog;
