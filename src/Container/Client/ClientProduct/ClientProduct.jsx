import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ButtonDelete from "../../../Component/Button/ButtonDelete";
import ButtonSwitch from "../../../Component/Button/ButtonSwitch";
import { useDispatch, useSelector } from "react-redux";
import { getFullProduct } from "../../../app/apiRequest";
import { getProductEditSuccess } from "../../../app/productSlice";
import { urlImg } from "../../../Component/Variable";

import "./ClientProduct.css";

const ClientProduct = () => {
  const getProduct = useSelector((state) => state.products.product.product);

  const dispath = useDispatch();
  const [render, setRender] = useState(false);
  const [dataCategory, setDataCategory] = useState();

  const handleEdit = (e, product) => {
    dispath(getProductEditSuccess(product));
    console.log(product);
  };

  // get data Product

  useEffect(() => {
    getFullProduct(dispath);
  }, []);
  // End data Product

  // get data Category
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/category/index"
        );
        setDataCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fecth();
  }, [render]);

  // End data Category

  // delete Product

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        await axios.delete(`http://localhost:8000/api/product/delete/${id}`);
        setRender(!render);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
  };
  // End delete Product

  // -------

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
          className="px-2 py-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
        >
          <IoIosAddCircleOutline className="mr-4 text-xl" />
          Add Product
        </Link>

        {/* End button add */}

        {/* Button Edit */}
        <Link
          to="/product/edit"
          className=" px-2 py-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary flex flex-row items-center"
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
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Description</td>
              <td>Price</td>
              <td>Detail</td>
              <td>Content</td>
              {/* <td>Photo</td> */}
              <td>Display</td>
              <td>Position</td>
              <td>CategoryId</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data Product */}
          <tbody className="text-[#ffffff9e]">
            {getProduct?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="flex flex-row justify-start gap-2 w-40 items-center">
                  <img
                    src={urlImg + item.photo}
                    alt=""
                    width="50px"
                    height="50px"
                  />
                  <span
                    onClick={(e, product) => handleEdit(e, item)}
                    to="/product/edit"
                    className="break-words hover:text-secondary"
                  >
                    {item.title}
                  </span>
                </td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td className="w-24 break-words">{item.detail}</td>
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
                    handleChange={(e, product) => handleDisplay(e, item)}
                  />
                </td>
                {/* End switched display */}

                <td>{item.position}</td>
                {dataCategory?.map((cate) =>
                  item.category_id == cate.id ? (
                    <td key={cate.id}>{cate.title}</td>
                  ) : (
                    ""
                  )
                )}

                {/* Button delete */}
                <td>
                  <ButtonDelete handleClick={(e) => handleRemove(e)} />
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
