import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//
import { addBlogSuccess } from "../../../../app/blogSlice/blogsSlice";
import InputSearch from "../../../../Component/Input/InputSearch";
import { urlImg } from "../../../../Component/Variable";
import ButtonAdd from "../../../../Component/Button/ButtonAdd";
import ButtonSwitch from "../../../../Component/Button/ButtonSwitch";
import ButtonActions from "../../../../Component/Button/ButtonActions";
import { getBlogByBlogListId } from "../../../../app/apiRequest";
import { clientApi } from "../../../../api/api";
import SkeletonDetailBlog from "../../../../Component/Skeleton/SkeletonDetailBlog";

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

const ClientBlogList = () => {
  const [render, setRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [dataNew, setDataNew] = useState(null);
  const [blogById, setBlogById] = useState([]);
  const notify = (
    type = "error",
    content = "Cập nhật hiển thị không thành công!"
  ) => toast[type](content);

  const getBlogByListBlog = useSelector(
    (state) => state.blogs.blogs.blogByBlogListId
  );
  const getListBlog = useSelector((state) => state.listBlog.listBlog.listBlog);
  const getCurrentBlog = useSelector((state) => state.blogs.blogs.currentBlog);

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
  const handleClose = () => {
    setBlogById(null);
    setOpen(false);
  };
  // End show Detail

  const handleEdit = (e, blog) => {
    dispath(addBlogSuccess(blog));
    navigate("/blog/edit", blog);
  };

  // -------

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

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search blog
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        getBlogByListBlog[0]?.forEach((item, i) => {
          if (
            item.title.toLowerCase().includes(value.trim().toLowerCase(), 0)
          ) {
            return dataSearch.push(item);
          }
        });
        setDataNew(dataSearch);
        if (value == "") {
          setDataNew([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [value]);

  // delete blog

  useEffect(() => {
    getBlogByBlogListId(dispath, getCurrentBlog[0].id);
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

  // End delete blog

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
<<<<<<< HEAD:src/Container/Client/ClientBlogs/ClientBlogList/ClientBlogList.jsx
      <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
        {/* Table show blog */}
        <table className="w-full text-bgButton font-medium">
=======
      <div className="tb:text-xs tb:overflow-x-scroll w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
        {/* Table show product */}
        <table className="tb:w-[1000px] dt:w-full text-bgButton font-medium">
>>>>>>> thuan:src/Container/Client/ClientCategory/ClientCategory.jsx
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Display</td>
              <td>Position</td>
              <td>Blog List</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data blog */}
          <tbody className="text-[#333] dark:text-[#fff] font-light">
            {value !== ""
              ? dataNew?.map((item) => (
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
                        className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></td>

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

                    {getListBlog?.map((blog) =>
                      item.listblog_id == blog.id ? (
                        <td key={blog.id}>{blog.title}</td>
                      ) : (
                        ""
                      )
                    )}

                    {/* Button delete */}
                    <td>
                      {/* <ButtonDelete handleClick={(id) => handleRemove(item.id)} /> */}
                      <ButtonActions
                        handleSeen={(id) => handleOpen(item.id)}
                        HandleDelete={(id) => handleRemove(item.id)}
                        handleEdit={(e, blog) => handleEdit(e, item)}
                      />
                    </td>

                    {/* End button delete */}
                  </tr>
                ))
              : getBlogByListBlog[0]?.map((item) => (
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
                        className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></td>

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

                    {getListBlog?.map((blog) =>
                      item.listblog_id == blog.id ? (
                        <td key={blog.id}>{blog.title}</td>
                      ) : (
                        ""
                      )
                    )}

                    {/* Button delete */}
                    <td>
                      {/* <ButtonDelete handleClick={(id) => handleRemove(item.id)} /> */}
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
          {/* End show data blog */}
        </table>

        {/* End table show blog */}

        {/* Show Detail Blog */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {blogById ? (
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
                    <div>
                      <h2 className="text-4xl font-normal">
                        {blogById?.title}
                      </h2>
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
                    className="text-md font-normal italic "
                  ></span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: blogById?.detail }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{ __html: blogById?.content }}
                ></div>
              </div>
            </Box>
          ) : (
            <SkeletonDetailBlog style={style} />
          )}
        </Modal>

        {/* End show Detail Blog */}
      </div>
    </>
  );
};

export default ClientBlogList;
