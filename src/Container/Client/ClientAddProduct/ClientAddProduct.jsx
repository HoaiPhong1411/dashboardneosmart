import { IoMdAddCircle } from "react-icons/io";
import { useFormik, Field } from "formik";
import axios from "axios";
import { useState } from "react";
import ButtonCheck from "../../../Component/ButtonCheck";
import { useEffect } from "react";

const ClientAddProduct = () => {
  const [image, setImage] = useState();
  const [display, setDisplay] = useState(true);
  const [position, setPosition] = useState(true);
  const [dataCate, setDataCate] = useState([]);

  useEffect(() => {
    const fecthCategory = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/category/index");
        setDataCate(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthCategory();
  }, []);

  // Prevent event submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // End Prevent event submit

  // Formik handle
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      detail: "",
      content: "",
      photo: "",
      display: "",
      position: "",
      category_id: "",
    },
    onSubmit: (value) => {
      const data = new FormData();
      data.append("title", value.title);
      data.append("description", value.description);
      data.append("price", value.price);
      data.append("detail", value.detail);
      data.append("content", value.content);
      data.append("photo", image);
      data.append("display", display ? 1 : 0);
      data.append("position", position ? 1 : 0);
      data.append("category_id", value.category_id);
      addProduct(data);
    },
  });
  const addProduct = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/product/store",
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

  // Handle image
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // End handle Image

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

  return (
    <>
      <div className="flex flex-row gap-5 w-full bg-primary py-5 px-10 rounded-xl">
        <h1 className="text-[#fff] text-[1.4rem]">Add Product</h1>
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
            {/* title */}
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

          {/* Price */}
          <div className="flex flex-col justify-between gap-2 items-start mb-5">
            <label htmlFor="price" className="text-[1.25rem] font-normal">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border-[1px] font-light border-secondary outline-none bg-primary focus:border-[#e0ed2e]"
            />
          </div>

          {/* End Price */}

          {/* Detail */}
          <div className="flex flex-col justify-between gap-2 items-start mb-5">
            <label htmlFor="detail" className="text-[1.25rem] font-normal">
              Detail
            </label>
            <textarea
              rows="3"
              type="text"
              name="detail"
              id="detail"
              placeholder="Detail"
              value={formik.values.detail}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border-[1px] font-light border-secondary outline-none bg-primary focus:border-[#e0ed2e]"
            />
          </div>

          {/* End Detail */}

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

          {/* Photo */}
          <div className="flex flex-row justify-between items-center mb-5">
            <label htmlFor="photo" className="text-[1.25rem] font-normal">
              Photo
            </label>

            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              files={image}
              onChange={(e) => handleImage(e)}
              // onChange={(e) => handleImage(e)}
              className="w-[85%] px-3 py-2 border-[1px] font-light border-secondary outline-none bg-primary focus:border-[#e0ed2e]"
            />
          </div>

          {/* End Photo */}

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

          {/* Category id */}
          <div className="flex flex-row justify-between gap-2 items-start mb-5">
            <label htmlFor="category_id" className="text-[1.25rem] font-normal">
              Category
            </label>
            {/* <input
              type="number"
              name="category_id"
              id="category_id"
              placeholder="Category Id"
              value={formik.values.category_id}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border-[1px] font-light border-secondary outline-none bg-primary focus:border-[#e0ed2e]"
            /> */}
            <div className="w-[85%] flex justify-start items-center">
              <select
                name="category_id"
                id="category_id"
                className="text-[#333] outline-none px-2 py-1"
              >
                {dataCate?.map((item) => (
                  <option value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* End category id */}

          {/* Button Add */}
          <div className="flex flex-row justify-center items-center">
            <button className="flex flex-row justify-center items-center gap-3 px-4 py-2 bg-secondary rounded-lg hover:bg-[#e64141] text-[1.25rem]">
              <IoMdAddCircle />
              Add Product
            </button>
          </div>

          {/* End Button Add */}
        </form>
        <p id="err" className="text-[red] text-[2rem] font-light"></p>
      </div>
    </>
  );
};

export default ClientAddProduct;
