import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ButtonDelete from "../../../Component/Button/ButtonDelete";
import ButtonSwitch from "../../../Component/Button/ButtonSwitch";
import { useDispatch, useSelector } from "react-redux";
import { getFullBlog } from "../../../app/apiRequest.js";
import { getAllBlogSuccess } from "../../../app/blogSlice.js";
import { urlImg } from "../../../Component/Variable";


const ClientBlog = () => {
  const getBlog = useSelector((state) => state.blogs.blog.blog);
  const dispath = useDispatch();
  const [render, setRender] = useState(false);
  const [dataListBlog, setDataListBlog] = useState();

  const handleEdit = (e, blog) => {
    dispath(getAllBlogSuccess(blog));
  };

  // get data Blog

  useEffect(() => {
    getFullBlog(dispath);
  }, []);
  // End data Blog

  // get data Category
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/listblog/index"
        );
        setDataListBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecth();
  }, [render]);

  // End data Category

  // delete Blog

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        await axios.delete(`http://localhost:8000/api/blog/delete/${id}`);
        setRender(!render);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
  };
  // End delete blog

  // -------

  // Handle display
  const handleDisplay = (e, blog) => {
    // On off button display
    const check = e.target.checked;
    const spanElement = e.target.parentElement;
    const btn = document.querySelectorAll(".btn-display");
    btn.forEach((item) => {
      if (item.id === blog.id) {
        if (check) {
          item.style.transform = "translateX(105%)";
          spanElement.style.backgroundColor = "#e64141";
        } else {
          item.style.transform = "translateX(15%)";
          spanElement.style.backgroundColor = "#6c7293";
        }
      }
    });

    // End On off button display

    // Update display
    const updateDisplay = async (id, data) => {
      try {
        const res = await axios.post(
          `http://localhost:8000/api/blog/update/${id}`,
          data
        );
      } catch (error) {
        console.log(error);
      }
    };
    const dataDisplay = new FormData();
    dataDisplay.append("title", blog.title);
    dataDisplay.append("photo", blog.photo);
    dataDisplay.append("description", blog.description);
    dataDisplay.append("position", blog.position);
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
  return (
    <>
      <div className="flex flex-row gap-5 w-full bg-primary py-3 px-5 rounded-xl">
        {/* button add */}
        <Link
          to="/blog/add"
          className="px-2 py-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <IoIosAddCircleOutline className="mr-4 text-xl" />
          Add Blog
        </Link>

        {/* End button add */}

        {/* Button Edit */}
        <Link
          to="/blog/edit"
          className=" px-2 py-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <AiFillEdit className="mr-4 text-xl" />
          Edit blog
        </Link>

        {/* End button edit */}
      </div>
      <div className="w-full bg-primary px-5 py-5 rounded-xl my-7">
        {/* Table show blog */}
        <table className="w-full text-secondary border-[1px] border-[#777]">
          <thead>
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Description</td>
              <td>Content</td>
              <td>Display</td>
              <td>Position</td>
              <td>List Blog</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data Blog */}
          <tbody className="text-[#ffffff9e]">
            {getBlog?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
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
                    className="break-words hover:text-secondary"
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.description}</td>
                <td className="w-36 break-words">{item.content}</td>
                {/* <td>
                  <img
                    src={urlImg + item.photo}
                    alt=""
                    width="50px"
                    height="50px"
                  />
                </td> */}
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
                {dataListBlog?.map((listblog, index) =>
                  item.listblog_id === listblog.id ? (
                    <td key={index}>{listblog.title}</td>
                  ) : (
                    ""
                  )
                )}

                {/* Button delete */}
                <td>
                  <ButtonDelete handleClick={(id) => handleRemove(item.id)} />
                </td>

                {/* End button delete */}
              </tr>
            ))}
          </tbody>
          {/* End show data blog */}
        </table>

        {/* End table show blog */}
      </div>
    </>
  );
};

export default ClientBlog;
