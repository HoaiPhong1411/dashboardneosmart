import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./ClientProduct.css";

const ClientProduct = () => {
  const [data, setData] = useState();
  const [render, setRender] = useState(false);

  // get data Product
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

  // End data Product

  // delete Product

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
  // End delete Product

  // Handle display
  const handleDisplay = (e, product) => {
    // On off button display
    const check = e.target.checked;
    const spanElement = e.target.parentElement;
    const btn = document.querySelectorAll(".btn-display");
    btn.forEach((item) => {
      if (item.id == product.id) {
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
          `http://localhost:8000/api/product/update/${id}`,
          data
        );
      } catch (error) {
        console.log(error);
      }
    };
    const dataDisplay = new FormData();
    dataDisplay.append("title", product.title);
    dataDisplay.append("photo", product.photo);
    dataDisplay.append("price", product.price);
    dataDisplay.append("description", product.description);
    dataDisplay.append("position", product.position);
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
                {/* <td>{item.display}</td> */}
                <td>
                  <label
                    htmlFor={item.id}
                    style={
                      item.display == 1
                        ? { backgroundColor: "#e64141" }
                        : { backgroundColor: "#6c7293" }
                    }
                    className="flex items-center w-[2.2rem] h-[1.25rem] rounded-2xl bg-secondary border-2 border-[#fff]"
                  >
                    <input
                      type="checkbox"
                      name="display"
                      id={item.id}
                      className="hidden"
                      defaultChecked={item.display == 1 ? true : false}
                      onChange={(e, product) => handleDisplay(e, item)}
                    />
                    <span
                      id={item.id}
                      style={
                        item.display == 1
                          ? { transform: "translateX(105%)" }
                          : { transform: "translateX(15%)" }
                      }
                      className="btn-display block h-[0.9rem] w-[0.9rem] translate-x-[20%] rounded-[50%] bg-[#fff] shadow-md transition-transform"
                    ></span>
                  </label>
                </td>
                <td>{item.position}</td>
                <td>{item.category_id}</td>
                <td>
                  <span
                    onClick={(id) => handleRemove(item.id)}
                    className=" mx-auto w-8 h-8 rounded-[50%] cursor-pointer bg-[#3d3d3d] mr-3 flex justify-center items-center hover:bg-[#e64141] hover:text-[#fff]"
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
