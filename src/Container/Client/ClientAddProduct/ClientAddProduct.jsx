import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik, Field } from "formik";
import { IoMdAddCircle } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";

import ButtonCheck from "../../../Component/Button/ButtonCheck";
import ButtonUpload from "../../../Component/Button/ButtonUpload";
import Toast from "../../../Component/Toast";

import notimg from "../../../assets/images/No-image-found.jpg";
import "./ClientAddProduct.css";

const ClientAddProduct = () => {
  const [image, setImage] = useState();
  const [display, setDisplay] = useState(true);
  const [position, setPosition] = useState(true);
  const [img, setImg] = useState();
  const [dataCate, setDataCate] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const navigate = useNavigate();
  let toastSuccess;
  // ---------------------------------------

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

  // ---------------------------------------

  // Prevent event submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // End Prevent event submit
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

  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value);
  };

  // End handle change Category

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
      data.append("category_id", categoryId ?? dataCate[0].id);
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
  // ---------------------------------------
  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="ml-3 hover:text-hoverButton">
        <div
          className="cursor-pointer flex flex-row gap-1 items-center"
          onClick={() => handleNavigate()}
        >
          <span>Back</span>
          <TiArrowBack />
        </div>
      </div>
      <div
        onSubmit={formik.handleSubmit}
        className=" gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-5 px-10 rounded-xl"
      >
        <form
          id="form"
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="text-[#fff] flex flex-col justify-between gap-5"
        >
          {/* === Input === */}
          <div className="flex flex-row justify-between gap-5">
            {/*=== Left ===*/}
            <div className="w-[65%] flex flex-col justify-start items-start gap-2">
              <div className="w-full flex flex-col justify-between gap-2 items-start">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Name"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="w-full border-[1px] dark:bg-primary dark:text-[#fff] border-secondary focus:border-[#e0ed2e]"
                />
              </div>
              {/* End title */}

              {/* ------------------------------------ */}

              {/* Description */}
              <div className="w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="3"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="w-full border-[1px] dark:bg-primary dark:text-[#fff] border-secondary focus:border-[#e0ed2e]"
                />
              </div>
              {/* End Description */}

              {/* ------------------------------------ */}

              {/* Price */}
              <div className="w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  className="w-full border-[1px] dark:bg-primary dark:text-[#fff] border-secondary focus:border-[#e0ed2e]"
                />
              </div>

              {/* End Price */}

              {/* ------------------------------------ */}

              {/* Detail */}
              <div className="w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="detail">Detail</label>
                <textarea
                  rows="3"
                  type="text"
                  name="detail"
                  id="detail"
                  placeholder="Detail"
                  value={formik.values.detail}
                  onChange={formik.handleChange}
                  className="w-full border-[1px] dark:bg-primary dark:text-[#fff] border-secondary focus:border-[#e0ed2e]"
                />
              </div>

              {/* End Detail */}

              {/* ------------------------------------ */}

              {/* Content */}
              <div className=" w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="content">Content</label>
                <textarea
                  rows="3"
                  type="text"
                  name="content"
                  id="content"
                  placeholder="Content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  className="w-full border-[1px] dark:bg-primary dark:text-[#fff] border-secondary focus:border-[#e0ed2e]"
                />
              </div>
              {/* End Content */}
            </div>
            {/*=== End Left ===*/}

            {/*=== Right ===*/}

            <div className="w-[35%] flex flex-col justify-start items-start gap-2">
              {/* Photo */}
              <div className="w-full flex flex-row justify-between items-center mb-5">
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  files={image}
                  onChange={(e) => handleImage(e)}
                  className="hidden"
                />
                <div className="w-full flex flex-col justify-center items-center">
                  <img
                    src={img ?? notimg}
                    alt=""
                    className="w-full h-[250px] object-cover border-2 border-secondary"
                  />
                  <ButtonUpload htmlFor="photo" />
                </div>
              </div>

              {/* End Photo */}

              {/* ------------------------------------ */}

              <div className="w-full flex flex-row justify-between">
                {/* Display */}
                <div className="w-1/2 flex flex-row justify-between items-center mb-5">
                  <label htmlFor="display">Display</label>
                  <input
                    type="checkbox"
                    name="display"
                    id="display"
                    defaultChecked={true}
                    onChange={(e) => handleChangeDisplay(e)}
                    className="hidden"
                  />
                  <div className="w-[55%]">
                    <ButtonCheck
                      htmlFor="display"
                      idIcon="btn-display"
                      style={
                        display
                          ? { backgroundColor: "#0f8f31" }
                          : { backgroundColor: "#fff" }
                      }
                    />
                  </div>
                </div>

                {/* End Display */}

                {/* ------------------------------------ */}

                {/* Position */}
                <div className="w-1/2 flex flex-row justify-between items-center mb-5">
                  <label htmlFor="position">Position</label>
                  <input
                    type="checkbox"
                    name="position"
                    id="position"
                    defaultChecked={true}
                    onChange={(e) => handleChangePosition(e)}
                    className="hidden"
                  />
                  <div className="w-[55%]">
                    <ButtonCheck
                      htmlFor="position"
                      idIcon="btn-position"
                      style={
                        position
                          ? { backgroundColor: "#0f8f31" }
                          : { backgroundColor: "#fff" }
                      }
                    />
                  </div>
                </div>

                {/* End Position */}
              </div>

              {/* ------------------------------------ */}

              {/* Category id */}
              <div className="flex flex-row justify-between gap-2 items-start mb-5">
                <label htmlFor="category_id">Category</label>
                <div className="w-full flex justify-start items-center">
                  <select
                    onChange={(e) => handleChangeCategory(e)}
                    name="category_id"
                    id="category_id"
                    className="text-[#333] dark:bg-primary dark:text-[#fff] border-[1px] border-[#888] rounded-md outline-none px-2 py-1"
                  >
                    {dataCate?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* End category id */}

              {/* ------------------------------------ */}
            </div>
            {/*=== End Right ===*/}
          </div>
          {/* === End Input === */}
          {/* Button Add */}

          <div>
            {/* Button Add */}
            <div className="flex flex-row justify-center items-center">
              <button className="flex flex-row justify-center items-center rounded-lg gap-3 px-4 py-2 hover:bg-hoverButton text-[#fff] bg-bgButton text-[1.25rem]">
                <IoMdAddCircle />
                Add Product
              </button>
            </div>

            {/* End Button Add */}
          </div>

          {/* End Button Add */}

          {/* ------------------------------------ */}
        </form>
        <p id="err" className="text-[red] text-[2rem] font-light"></p>
      </div>
    </>
  );
};

export default ClientAddProduct;
