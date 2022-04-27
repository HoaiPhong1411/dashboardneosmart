import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { clientApi } from "../../../api/api";
import { getProductByCategory, getProductById } from "../../../app/apiRequest";
import { getAllProductSuccess } from "../../../app/productSlice/productSlice";
import { urlImg } from "../../../Component/Variable";
import ButtonAdd from "../../../Component/Button/ButtonAdd";
import InputSearch from "../../../Component/Input/InputSearch";
import ButtonSwitch from "../../../Component/Button/ButtonSwitch";
import ButtonActions from "../../../Component/Button/ButtonActions";

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

const ClientCategory = () => {
  const [render, setRender] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const dispath = useDispatch();
  const [dataNew, setDataNew] = useState(null);
  const dataCategory = useSelector(
    (state) => state.category.category.category[0]
  );
  const CurrentCategory = useSelector(
    (state) => state.category.category.currentCategory
  );
  const productByCateId = useSelector(
    (state) => state.productByCateId.productByCateId
  );
  const productById = useSelector(
    (state) => state.products.product.productById
  );

  // show Detail
  const handleOpen = (id) => {
    getProductById(dispath, id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // End show Detail

  // get data Product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await clientApi.productShow();
        setDataProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [render]);
  // End data Product
  // ------------------------------------

  const handleEdit = (e, product) => {
    dispath(getAllProductSuccess(product));
    navigate("/product/edit", product);
  };

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
        const res = await clientApi.productEdit(id, data);
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

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search product
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        const res = productByCateId[0]?.forEach((item, i) => {
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

  useEffect(() => {
    getProductByCategory(dispath, CurrentCategory[0].id);
  }, [render]);
  // delete Product

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        const response = await clientApi.productDelete(id);
        setRender(!render);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
    console.log("delete");
  };
  console.log(productById);
  // End delete Product
  return (
    <>
      <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        {/* button add */}
        <ButtonAdd link="/product/add" title="Add New" />
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
              <td>Price</td>
              <td>Detail</td>
              <td>Content</td>
              {/* <td>Photo</td> */}
              <td>Display</td>
              <td>Position</td>
              <td>Category</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data Product */}
          <tbody className="text-[#333] dark:text-[#fff] font-light">
            {value !== ""
              ? dataNew?.map((item) => (
                  <tr key={item.id} className="dark:hover:hoverButton">
                    <td className="flex flex-row justify-start gap-2 w-40 items-center">
                      <img
                        src={urlImg + item.photo}
                        alt=""
                        width="50px"
                        height="50px"
                      />
                      <Link
                        onClick={(e, product) => handleEdit(e, item)}
                        to="/product/edit"
                        className="break-words hover:text-bgButton dark:hover:text-lightPrimary"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td>{item.description}</td>
                    <td>
                      {Intl.NumberFormat().format(Number(item.price))} VNĐ
                    </td>
                    <td className="w-24 break-words">{item.detail}</td>
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
                    {dataCategory?.map((cate) =>
                      item.category_id == cate.id ? (
                        <td key={cate.id}>{cate.title}</td>
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
                        handleEdit={(e, product) => handleEdit(e, item)}
                      />
                    </td>

                    {/* End button delete */}
                  </tr>
                ))
              : productByCateId[0]?.map((item) => (
                  <tr key={item.id} className="dark:hover:hoverButton">
                    <td className="flex flex-row justify-start gap-2 w-40 items-center">
                      <img
                        src={urlImg + item.photo}
                        alt=""
                        width="50px"
                        height="50px"
                      />
                      <Link
                        onClick={(e, product) => handleEdit(e, item)}
                        to="/product/edit"
                        className="break-words hover:text-bgButton dark:hover:text-lightPrimary"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td>{item.description}</td>
                    <td>
                      {Intl.NumberFormat().format(Number(item.price))} VNĐ
                    </td>
                    <td className="w-24 break-words">{item.detail}</td>
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

                    {dataCategory?.map((cate) =>
                      item.category_id == cate.id ? (
                        <td key={cate.id}>{cate.title}</td>
                      ) : (
                        ""
                      )
                    )}

                    {/* Button delete */}
                    <td>
                      <ButtonActions
                        handleSeen={(id) => handleOpen(item.id)}
                        HandleDelete={(id) => handleRemove(item.id)}
                        handleEdit={(e, product) => handleEdit(e, item)}
                      />
                    </td>

                    {/* End button delete */}
                  </tr>
                ))}
          </tbody>
          {/* End show data product */}
        </table>

        {/* End table show product */}

        {/* Show Detail Blog */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col px-10 py-16 gap-5">
              <div className="flex flex-row gap-5 ">
                <div className="w-[40%]">
                  <img
                    src={urlImg + productById[0]?.photo}
                    alt=""
                    className="w-full h-[200px] border-[1px] border-[#333]"
                  />
                </div>
                <div className="w-[60%] flex flex-col gap-3">
                  <div>
                    <h2 className="text-2xl font-medium">
                      {productById[0].title}
                    </h2>
                    <span className="text-md font-normal italic text-[#777]">
                      {productById[0].description}
                    </span>
                  </div>
                  <div>
                    <span>Giá: </span>
                    <strong className="text-[#ff6363] text-xl font-medium">
                      {Intl.NumberFormat().format(Number(productById[0].price))}{" "}
                      VNĐ
                    </strong>
                  </div>
                  <p>{productById[0].detail} </p>
                  <p></p>
                </div>
              </div>
              <div>
                <p className="text-lg font-light text-[#000]">
                  {productById[0].content}
                </p>
              </div>
            </div>
          </Box>
        </Modal>

        {/*End Show Detail Blog */}
      </div>
    </>
  );
};

export default ClientCategory;
