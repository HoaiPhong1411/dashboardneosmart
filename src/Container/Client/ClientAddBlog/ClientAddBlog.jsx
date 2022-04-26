import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useFormik, Field } from "formik";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TiArrowBack } from "react-icons/ti";

import ButtonCheck from "../../../Component/Button/ButtonCheck";
import ButtonUpload from "../../../Component/Button/ButtonUpload";
import notimg from "../../../assets/images/No-image-found.jpg";
import { clientApi } from "../../../api/api";

const ClientAddBlog = () => {
  const [image, setImage] = useState();
  const [display, setDisplay] = useState(true);
  const [position, setPosition] = useState(true);
  const [img, setImg] = useState();
  const [listBLogId, setListBlogId] = useState();
  const navigate = useNavigate();
  const dataListBlog = useSelector((state) => state.listBlog.listBlog.listBlog);
  console.log(dataListBlog);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

  // handle change Category

  const handleChangeListBlog = (e) => {
    setListBlogId(e.target.value);
  };

  // End handle change Category

  //   Add Blog
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      photo: "",
      display: "",
      position: "",
    },
    onSubmit: (value) => {
      const data = new FormData();
      data.append("title", value.title);
      data.append("description", value.description);
      data.append("content", value.content);
      data.append("photo", image);
      data.append("display", display ? 1 : 0);
      data.append("position", position ? 1 : 0);
      data.append("listblog_id", listBLogId ?? dataListBlog[0].id);
      addBlog(data);
    },
  });

  //   FunctionAdd
  const addBlog = async (data) => {
    try {
      const response = await clientApi.blogAdd(data);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      alert("Vui Lòng Nhập Đầy Đủ !");
    }
  };

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
          className="text-[#fff] flex flex-col justify-between gap-2"
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

              {/* Content */}
              <div className=" w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="content">Content</label>
                <textarea
                  rows="5"
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
              <div className="w-full flex flex-row justify-between gap-2 items-center ">
                <label htmlFor="listblog_id">Blog List</label>
                <div className="w-[75%] flex justify-start items-center">
                  <select
                    onChange={(e) => handleChangeListBlog(e)}
                    name="listblog_id"
                    id="listblog_id"
                    className="text-[#333] dark:bg-primary dark:text-[#fff] border-[1px] border-[#888] rounded-md outline-none px-2 py-1"
                  >
                    {dataListBlog?.map((item) => (
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
              <button
                type="submit"
                className="flex flex-row justify-center items-center rounded-lg gap-3 px-4 py-2 hover:bg-hoverButton text-[#fff] bg-bgButton text-[1.25rem]"
              >
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

export default ClientAddBlog;
