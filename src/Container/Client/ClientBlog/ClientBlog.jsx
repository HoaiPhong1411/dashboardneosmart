import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component Button
import { urlImg } from "../../../Component/Variable";
import InputSearch from "../../../Component/Input/InputSearch";
import ButtonActions from "../../../Component/Button/ButtonActions";
import ButtonSwitch from "../../../Component/Button/ButtonSwitch";
import ButtonAdd from "../../../Component/Button/ButtonAdd";
import { getAllBlog } from "../../../app/apiRequest";
import { addBlogSuccess } from "../../../app/blogSlice/blogsSlice";
import { clientApi } from "../../../api/api";

// Style Modal show detail
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "#fff",
  border: "none",
  boxShadow: 24,
};
// End Style Modal show detail

const ClientBlog = () => {
  const [render, setRender] = useState(false);
  // -------------------
  // input search
  const [data, setData] = useState([]);

  const [dataNew, setDataNew] = useState(null);
  //  value input search
  const [value, setValue] = useState();
  // -----------------------
  const [open, setOpen] = useState(false);
  const [blogById, setBlogById] = useState([]);

  const dispath = useDispatch();
  const navigate = useNavigate();
  const listBlog = useSelector((state) => state.listBlog.listBlog.listBlog);
  const dataBlog = useSelector((state) => state.blogs.blogs.blogs);

  const notify = (
    type = "error",
    content = "Cập nhật hiển thị không thành công!"
  ) => toast[type](content);

  // show Detail
  const handleOpen = (id) => {
    const getBlogById = async () => {
      try {
        const res = await clientApi.blogShowById(id);
        setBlogById(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogById();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // End show Detail

  useEffect(() => {
    getAllBlog(dispath);
  }, [render]);

  const handleEdit = (e, blog) => {
    dispath(addBlogSuccess(blog));
    navigate("/blog/edit", blog);
  };
  // getBlog
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await clientApi.blogShow();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecth();
  }, [render]);

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        await clientApi.blogDelete(id);
        setRender(!render);
        notify("success", "Xóa bài viết thành công!");
      } catch (error) {
        notify("error", "Xóa sản phẩm thất bại!");
      }
    };
    remove();
  };

  // Handle display
  const handleDisplay = (e, blog) => {
    // On off button display
    const check = e.target.checked;
    const spanElement = e.target.parentElement;
    const btn = document.querySelectorAll(".btn-display");
    btn.forEach((item) => {
      if (item.id == blog.id) {
        if (check) {
          item.style.transform = "translateX(125%)";
          spanElement.style.backgroundColor = "#0f8f31";
        } else {
          item.style.transform = "translateX(20%)";
          spanElement.style.backgroundColor = "#e64141";
        }
      }
    });

    // End On off button display

    // Update display
    const updateDisplay = async (id, data) => {
      try {
        await clientApi.blogDisplay(id, data);
        notify("success", "Cập nhật hiển thị thành công!");
      } catch (error) {
        notify();
      }
    };
    const dataDisplay = new FormData();
    if (check) {
      dataDisplay.append("display", 1);
      updateDisplay(blog.id, dataDisplay);
    } else {
      dataDisplay.append("display", 0);
      updateDisplay(blog.id, dataDisplay);
    }
    // End Update display
  };
  // End handle display

  // ---------------------------------------------

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search product
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        const res = dataBlog?.forEach((item, i) => {
          if (
            item.title.toLowerCase().includes(value.trim().toLowerCase(), 0)
          ) {
            return dataSearch.push(item);
          }
        });
        setDataNew(dataSearch);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [value]);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        {/* button add */}
        <ButtonAdd link="/blog/add" title="Add New" />
        {/* End button add */}

        {/* Input search */}

        <InputSearch handleChange={(e) => handleChange(e)} value={value} />
        {/* End Input search */}
      </div>
      <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
        {/* Table show product */}
        <table className="w-full text-bgButton font-medium">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Display</td>
              <td>Position</td>
              <td>List Blog</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data Blog */}
          <tbody className="text-[#333] dark:text-[#fff] font-light">
            {dataNew?.map((item) => (
              <tr key={item.id} className="dark:hover:hoverButton">
                <td className="flex flex-row justify-start gap-2 items-center">
                  <img
                    src={urlImg + item.photo}
                    alt=""
                    width="50px"
                    height="50px"
                  />
                  <Link
                    onClick={(e, blog) => handleEdit(e, item)}
                    to="/blog/edit"
                    className="break-words hover:text-bgButton dark:hover:text-lightPrimary"
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.description}</td>

                {/* switched display */}
                <td>
                  <ButtonSwitch
                    id={item.id}
                    name={item.display}
                    handleChange={(e, blog) => handleDisplay(e, item)}
                  />
                </td>
                {/* End switched display */}

                <td>{item.position}</td>
                {listBlog?.map((blog) =>
                  item.category_id == blog.id ? (
                    <td key={blog.id}>{blog.title}</td>
                  ) : (
                    ""
                  )
                )}

                {/* Button delete */}
                <td>
                  <ButtonActions
                    handleSeen={(id) => handleOpen(item.id)}
                    handleRemove={(id) => handleRemove(item.id)}
                    handleEdit={(e, blog) => handleEdit(e, item)}
                  />
                </td>

                {/* End button delete */}
              </tr>
            )) ??
              dataBlog?.map((item) => (
                <tr key={item.id} className="dark:hover:bg-hoverButton">
                  <td className="flex flex-row justify-start gap-2 w-40 items-center">
                    <img
                      src={urlImg + item.photo}
                      alt=""
                      width="50px"
                      height="50px"
                    />
                    <Link
                      onClick={(e, blog) => handleEdit(e, item)}
                      to="/blog/edit"
                      className="break-words hover:text-bgButton dark:hover:text-lightPrimary"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></td>

                  <td>
                    <ButtonSwitch
                      id={item.id}
                      name={item.display}
                      handleChange={(e, blog) => handleDisplay(e, item)}
                    />
                  </td>
                  {/* End switched display */}

                  <td>{item.position}</td>
                  {listBlog?.map((blog) =>
                    item.listblog_id == blog.id ? (
                      <td key={blog.id}>{blog.title}</td>
                    ) : (
                      ""
                    )
                  )}

                  {/* Button delete */}
                  <td>
                    <ButtonActions
                      handleSeen={(id) => handleOpen(item.id)}
                      HandleDelete={(id) => handleRemove(item.id)}
                      handleEdit={(e, blog) => handleEdit(e, item)}
                    />
                  </td>

                  {/* End button delete */}
                </tr>
              ))}
          </tbody>
          {/* End show data Blog */}
        </table>

        {/* End table show Blog */}

        {/* Show Detail Blog */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col px-10 py-16 gap-5 h-[600px] overflow-y-scroll">
              <div className="flex flex-col gap-5 ">
                <div className="w-full flex justify-center items-center">
                  <img
                    src={urlImg + blogById?.photo}
                    alt=""
                    className="w-[80%] h-[250px] border-[1px] border-[#333]"
                  />
                </div>
                <div className="w-full flex flex-row gap-3 justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-normal">{blogById?.title}</h2>
                  </div>
                  <div className="flex flex-col items-end">
                    <p>
                      {new Date(blogById?.created_at).toLocaleDateString(
                        "vi-VI"
                      )}
                    </p>
                    <p className="text-[#666] text-md font-light">
                      {new Date(blogById?.created_at).toLocaleTimeString(
                        "vi-VI"
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <span
                  dangerouslySetInnerHTML={{
                    __html: blogById?.description,
                  }}
                  className="text-md font-normal italic"
                ></span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: blogById?.detail }}></div>
              <div
                dangerouslySetInnerHTML={{ __html: blogById?.content }}
              ></div>
            </div>
          </Box>
        </Modal>

        {/* End show Detail Blog */}
      </div>
    </>
  );
};

export default ClientBlog;
