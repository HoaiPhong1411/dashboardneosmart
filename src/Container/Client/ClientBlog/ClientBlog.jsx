import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogSuccess } from "../../../app/blogSlice/blogsSlice";
import { urlImg } from "../../../Component/Variable";

// Component Button
import InputSearch from "../../../Component/Input/InputSearch";
import ButtonActions from "../../../Component/Button/ButtonActions";
import ButtonSwitch from "../../../Component/Button/ButtonSwitch";
import ButtonAdd from "../../../Component/Button/ButtonAdd";
import { getAllBlog } from "../../../app/apiRequest";
import { addBlogSuccess } from "../../../app/blogSlice/blogsSlice";
import { clientApi } from "../../../api/api";

const ClientBlog = () => {
  const [render, setRender] = useState(false);
  // -------------------
  // input search
  const [data, setData] = useState([]);

  const [dataNew, setDataNew] = useState(null);
  //  value input search
  const [value, setValue] = useState();
  // -----------------------

  const dispath = useDispatch();
  const navigate = useNavigate();
  const listBlog = useSelector((state) => state.listBlog.listBlog.listBlog);
  const dataBlog = useSelector((state) => state.blogs.blogs.blogs);

  useEffect(() => {
    getAllBlog(dispath);
  }, [render]);

  const handleEdit = (e, product) => {
    dispath(addBlogSuccess(product));
    navigate("/blog/edit", product);
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
        const response = await clientApi.blogDelete(id);
        setRender(!render);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
  };

  // Handle display
  const handleDisplay = (e, product) => {
    // On off button display
    const check = e.target.checked;
    const spanElement = e.target.parentElement;
    const btn = document.querySelectorAll(".btn-display");
    btn.forEach((item) => {
      if (item.id == product.id) {
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
        const res = await clientApi.blogDisplay(id, data);
      } catch (error) {
        console.log(error);
      }
    };
    const dataDisplay = new FormData();
    if (check) {
      dataDisplay.append("display", 1);
      updateDisplay(product.id, dataDisplay);
    } else {
      dataDisplay.append("display", 0);
      updateDisplay(product.id, dataDisplay);
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
              <td>Content</td>
              <td>Display</td>
              <td>Position</td>
              <td>List Blog</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data Product */}
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
                    onClick={(e, product) => handleEdit(e, item)}
                    to="/blog/edit"
                    className="break-words hover:text-bgButton dark:hover:text-lightPrimary"
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.description}</td>

                <td className="w-36 break-words">{item.content}</td>

                {/* switched display */}
                <td>
                  <ButtonSwitch
                    id={item.id}
                    name={item.display}
                    handleChange={(e, product) => handleDisplay(e, item)}
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
                  {/* <ButtonDelete handleClick={(id) => handleRemove(item.id)} /> */}
                  <ButtonActions
                    id={item.id}
                    handleRemove={(id) => handleRemove(item.id)}
                    handleEdit={(e, product) => handleEdit(e, item)}
                    path="blog"
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
                      onClick={(e, product) => handleEdit(e, item)}
                      to="/blog/edit"
                      className="break-words hover:text-bgButton dark:hover:text-lightPrimary"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.description}</td>

                  <td className="w-36 break-words">{item.content}</td>
                  <td>
                    <ButtonSwitch
                      id={item.id}
                      name={item.display}
                      handleChange={(e, product) => handleDisplay(e, item)}
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
                    {/* <ButtonDelete handleClick={(id) => handleRemove(item.id)} /> */}
                    <ButtonActions
                      id={item.id}
                      HandleDelete={(id) => handleRemove(item.id)}
                      handleEdit={(e, product) => handleEdit(e, item)}
                      path="blog"
                    />
                  </td>

                  {/* End button delete */}
                </tr>
              ))}
          </tbody>
          {/* End show data product */}
        </table>

        {/* End table show product */}
      </div>
    </>
  );
};

export default ClientBlog;
