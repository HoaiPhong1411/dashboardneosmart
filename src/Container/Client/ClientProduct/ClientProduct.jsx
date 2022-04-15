import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { urlImg } from "../../../Component/Variable";
import "./ClientProduct.css";
import ButtonDelete from "../../../Component/ButtonDelete";
import ButtonSwitch from "../../../Component/ButtonSwitch";

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
        {/* button add */}
        <Link
          to="/product/add"
          className="w-[15%] px-2 py-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <IoIosAddCircleOutline className="mr-4 text-xl" />
          Add Product
        </Link>

        {/* End button add */}

        {/* Button Edit */}
        <Link
          to="/product/edit"
          className="w-[15%] px-2 py-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <AiFillEdit className="mr-4 text-xl" />
          Edit Product
        </Link>

        {/* End button edit */}
      </div>
      <div className="w-full bg-primary px-5 py-5 rounded-xl my-7">
        {/* Table show product */}
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
          {/* show data Product */}
          <tbody className="text-[#ffffff9e]">
            {data?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.detail}</td>
                <td>{item.content}</td>
                <td>
                  <img
                    src={urlImg + item.photo}
                    alt=""
                    width="50px"
                    height="50px"
                  />
                </td>
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
                <td>{item.category_id}</td>

                {/* Button delete */}
                <td>
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

export default ClientProduct;
