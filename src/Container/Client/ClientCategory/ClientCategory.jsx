import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import ButtonDelete from "../../../Component/Button/ButtonDelete";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";

const ClientCategory = () => {
  const [render, setRender] = useState(false);
  const [dataCategory, setDataCategory] = useState();

  // get data Category
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/category/index");
        setDataCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [render]);
  // End data Category
  // ------------------------------------
  // delete Product

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/category/delete/${id}`
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
          to="/category/add"
          className=" px-2 py-2 rounded-lg cursor-pointer shadow-lg hover:bg-hoverButton text-[#fff] bg-bgButton flex flex-row items-center"
        >
          <IoIosAddCircleOutline className="mr-4 text-xl" />
          Add Category
        </Link>

        {/* End button add */}

        {/* Button Edit */}
        <Link
          to="/category/edit"
          className=" px-2 py-2 rounded-lg cursor-pointer shadow-lg hover:bg-hoverButton text-[#fff] bg-bgButton flex flex-row items-center"
        >
          <AiFillEdit className="mr-4 text-xl" />
          Edit Category
        </Link>

        {/* End button edit */}
      </div>
      <div className="w-full bg-[#fefce8] shadow-lg rounded-xl my-7">
        {/* Table show product */}
        <table className="w-full text-bgButton font-medium">
          <thead>
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data Product */}
          <tbody className="text-[#333] font-light">
            {dataCategory?.map((item) => (
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
          {/* End show data product */}
        </table>

        {/* End table show product */}
      </div>
    </>
  );
};

export default ClientCategory;
