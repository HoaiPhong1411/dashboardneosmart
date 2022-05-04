<<<<<<< HEAD
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
=======
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useFormik, Field } from "formik";
import { useSelector } from "react-redux";
import { TiArrowBack } from "react-icons/ti";
import { Editor } from "@tinymce/tinymce-react";
import { location } from "../../../Component/Variable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ButtonCheck from "../../../Component/Button/ButtonCheck";
import ButtonUpload from "../../../Component/Button/ButtonUpload";
import notimg from "../../../assets/images/No-image-found.jpg";
import { clientApi } from "../../../api/api";

// config upload img
const init = {
  file_browser_callback: function (field_name, url, type, win) {
    win.document.getElementById(field_name).value = "my browser value";
  },
  file_browser_callback_types: "image media",
  file_picker_callback: function (callback, value, meta) {
    // Provide file and text for the link dialog

    // Provide image and alt text for the image dialog
    if (meta.filetype == "image") {
      callback("myimage.jpg", { alt: "My alt text" });
    }

    // Provide alternative source and posted for the media dialog
    if (meta.filetype == "media") {
      callback("movie.mp4", {
        source2: "alt.ogg",
        poster: "image.jpg",
      });
    }
  },
  file_picker_types: "file image media",
  images_upload_url: location,
  automatic_uploads: false,
  images_reuse_filename: true,
  images_dataimg_filter: function (img) {
    return img.hasAttribute("internal-blob");
  },
  tablemergecells: true,
};

// End config upload img

const ClientAddBlog = () => {
  const [image, setImage] = useState();

  const [display, setDisplay] = useState(true);
  const [content, setContent] = useState();
  const [des, setDes] = useState();
  const [detail, setDetail] = useState();
  const [position, setPosition] = useState(true);
  const [img, setImg] = useState();
  const [listBLogId, setListBlogId] = useState();
  const navigate = useNavigate();
  const dataListBlog = useSelector((state) => state.listBlog.listBlog.listBlog);
  const notify = (type = "error", content = "Vui lòng nhập đầy đủ!") =>
    toast[type](content);

  const editorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

>>>>>>> origin/phong
  // handle change display

  const handleChangeDisplay = (e) => {
    setDisplay(e.target.checked);
  };

  // End handle change display
<<<<<<< HEAD
// ---------------------------------------
=======

  // ---------------------------------------
>>>>>>> origin/phong

  // handle change position

  const handleChangePosition = (e) => {
    setPosition(e.target.checked);
  };

  // End handle change position

<<<<<<< HEAD
  // ---------------------------------------
    // handle change listBlog

    const handleChangeListBlog = (e) => {
      setListBlogId(e.target.value);
    };
  
    // End handle change Category

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
=======
  // handle change Category

  const handleChangeListBlog = (e) => {
    setListBlogId(e.target.value);
  };

  // End handle change Category

  //   Add Blog
  const formik = useFormik({
    initialValues: {
      title: "",
>>>>>>> origin/phong
    },
    onSubmit: (value) => {
      const data = new FormData();
      data.append("title", value.title);
<<<<<<< HEAD
      data.append("description", value.description);
      data.append("content", value.content);
      data.append("photo", image);
      data.append("display", display ? 1 : 0);
      data.append("position", position ? 1 : 0);
      data.append("listblog_id", listBlogId ?? dataListBlog[0].id);
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

  return (
    <>
      <div className="flex flex-row gap-5 w-full bg-primary py-5 px-10 rounded-xl">
        <h1 className="text-[#fff] text-[1.4rem]">Add BLog</h1>
      </div>
      <div
        onSubmit={formik.handleSubmit}
        className=" gap-5 w-full bg-primary py-5 px-10 rounded-xl mt-7"
=======
      data.append("description", des);
      data.append("content", content);
      data.append("detail", detail);
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
      await clientApi.blogAdd(data);
      notify("success", "Thêm sản phẩm thành công!");
    } catch (error) {
      notify();
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
      <ToastContainer />
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
>>>>>>> origin/phong
      >
        <form
          id="form"
          action=""
          onSubmit={(e) => handleSubmit(e)}
<<<<<<< HEAD
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
=======
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

                <Editor
                  name="description"
                  apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<b>Địa chỉ: <br>Diện tích: "
                  onEditorChange={(newText) => setDes(newText)}
                  init={{
                    height: 250,
                    width: "100%",
                    menubar: true,
                    image_advtab: true,
                    ...init,
                  }}
                  plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                  toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                  content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                />
              </div>
              {/* End Description */}

              {/* Description */}
              <div className="w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="description">Detail</label>

                <Editor
                  name="detail"
                  apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<b>Giới thiệu chung:</b>"
                  onEditorChange={(newText) => setDetail(newText)}
                  init={{
                    height: 250,
                    width: "100%",
                    menubar: true,
                    ...init,
                  }}
                  plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                  toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                  content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                />
              </div>
              {/* End Description */}

              {/* ------------------------------------ */}

              {/* Content */}
              <div className=" w-full flex flex-col justify-between gap-2 items-start mb-5">
                <label htmlFor="content">Content</label>

                <Editor
                  name="content"
                  apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  onEditorChange={(newText) => setContent(newText)}
                  init={{
                    height: 500,
                    width: "100%",
                    menubar: true,
                    ...init,
                  }}
                  plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image imagetools"
                  toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image  imagetools"
                  content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                  imagetools_cors_hosts={("mydomain.com", "otherdomain.com")}
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
                Add Blog
              </button>
            </div>

            {/* End Button Add */}
>>>>>>> origin/phong
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
