import React from "react";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ButtonDelete from "../../../Component/Button/ButtonDelete";
const ClientBlog = () => {
  const [data, setData] = useState();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/blog/index"
        );
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
        const response = await axios.delete(
          `http://localhost:8000/api/blog/delete/${id}`
        );
        setRender(!render);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
  };
  return (
    <>
      <div className="flex flex-row gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        <Link
          to="/blog/add"
          className="w-[14%] p-2 rounded-lg cursor-pointer hover:bg-hoverButton text-[#fff] bg-bgButton flex flex-row items-center"
        >
          <IoIosAddCircleOutline className="mr-4 text-xl" />
          Add Blog
        </Link>
        <Link
          to="/blog/edit"
          className="w-[14%] p-2 rounded-lg cursor-pointer hover:bg-hoverButton text-[#fff] bg-bgButton flex flex-row items-center"
        >
          <AiFillEdit className="mr-4 text-xl" />
          Edit Blog
        </Link>
      </div>
      <div className="w-full dark:bg-nightSecondary bg-lightSecondary p-3 rounded-xl my-7">
        <table className="w-full text-bgButton font-medium">
          <thead>
            <td>Id</td>
            <td>Title</td>
            <td>Description</td>
            <td>Content</td>
            <td>Photo</td>
            <td>Display</td>
            <td>Position</td>
            <td>Actions</td>
          </thead>
          <tbody className="dark:text-[#fff] text-[#333] font-light">
            {data?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.content}</td>
                <td
                  style={{
                    display: "block",
                    width: "100px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.photo}
                </td>
                <td>{item.display}</td>
                <td>{item.position}</td>
                <td>
                  <ButtonDelete handleClick={(id) => handleRemove(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientBlog;
