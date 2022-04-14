import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./ClientProduct.css";

const ClientProduct = () => {
  const [data, setData] = useState();
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/product/index"
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
          `http://localhost:8000/api/product/delete/${id}`
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
      <div className="flex flex-row gap-5 w-full bg-primary py-3 px-5 rounded-xl">
        <Link
          to="/product/add"
          className="w-[14%] p-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <IoIosAddCircleOutline className="mr-4 text-xl" />
          Add Product
        </Link>
        <Link
          to="/product/edit"
          className="w-[14%] p-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <AiFillEdit className="mr-4 text-xl" />
          Edit Product
        </Link>
      </div>
      <div className="w-full bg-primary px-5 py-5 rounded-xl my-7">
        {/* <div className="w-full flex flex-col">
            <ul className="flex flex-row justify-between items-center text-secondary">
              <li>Id</li>
              <li>Title</li>
              <li>Description</li>
              <li>Price</li>
              <li>Detail</li>
              <li>Content</li>
              <li>Photo</li>
              <li>Display</li>
              <li>Position</li>
              <li>CategoryId</li>
              <li>Actions</li>
            </ul>
            {data?.map((item) => (
              <ul className="flex flex-row justify-between items-center mt-2 text-[#fff]">
                <li>{item.id}</li>
                <li>{item.title}</li>
                <li>{item.description}</li>
                <li>{item.price}</li>
                <li>{item.detail}</li>
                <li>{item.content}</li>
                <li>{item.photo}</li>
                <li>{item.display}</li>
                <li>{item.position}</li>
                <li>{item.category_id}</li>
                <li>
                  <span
                    onClick={() => handleRemove(item.id)}
                    className=" mx-auto w-8 h-8 rounded-[50%] cursor-pointer bg-[#3d3d3d] mr-3 flex justify-center items-center"
                  >
                    <AiFillDelete />
                  </span>
                </li>
              </ul>
            ))}
          </div> */}
        <table className="w-full text-secondary border-[1px] border-[#777]">
          <thead>
            <td>Id</td>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Detail</td>
            <td>Content</td>
            <td>Photo</td>
            <td>Display</td>
            <td>Position</td>
            <td>CategoryId</td>
            <td>Actions</td>
          </thead>
          <tbody className="text-[#ffffff9e]">
            {data?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.detail}</td>
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
                <td>{item.category_id}</td>
                <td>
                  <span
                    onClick={() => handleRemove(item.id)}
                    className=" mx-auto w-8 h-8 rounded-[50%] cursor-pointer bg-[#3d3d3d] mr-3 flex justify-center items-center"
                  >
                    <AiFillDelete />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientProduct;
