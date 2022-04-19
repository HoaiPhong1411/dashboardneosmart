import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import ButtonDelete from "../../../Component/Button/ButtonDelete";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";

const ClientListBlog = () => {
  const [render, setRender] = useState(false);
  const [dataListBlog, setDataListBlog] = useState();

  // get data listBlog
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/listblog/index");
        setDataListBlog(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [render]);
  // End data list Blog
  // ------------------------------------
  // delete list blog

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/listblog/delete/${id}`
        );
        setRender(!render);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
  };

  // End delete Product
  return (
    <>
      <div className="flex flex-row gap-5 w-full bg-[#fefce8] shadow-lg py-3 px-5 rounded-xl">
        {/* button add */}
        <Link
          to="/listblog/add"
          className=" px-2 py-2 rounded-lg cursor-pointer shadow-lg hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <IoIosAddCircleOutline className="mr-4 text-xl" />
          Add list
        </Link>

        {/* End button add */}

        {/* Button Edit */}
        <Link
          to="/listblog/edit"
          className=" px-2 py-2 rounded-lg cursor-pointer shadow-lg hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <AiFillEdit className="mr-4 text-xl" />
          Edit List
        </Link>

        {/* End button edit */}
      </div>
      <div className="w-full bg-[#fefce8] shadow-lg rounded-xl my-7">
        {/* Table show product */}
        <table className="w-full text-secondary font-medium">
          <thead>
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data list blog */}
          <tbody className="text-[#333] font-light">
            {dataListBlog?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                {/* Button delete */}
                <td className="">
                  <ButtonDelete handleClick={(id) => handleRemove(item.id)} />
                </td>

                {/* End button delete */}
              </tr>
            ))}
          </tbody>
          {/* End show data list blogs */}
        </table>

        {/* End table show list blogs */}
      </div>
    </>
  );
};

export default ClientListBlog;
