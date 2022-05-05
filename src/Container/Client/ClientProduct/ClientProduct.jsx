import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import { LinearProgress } from "@mui/material";

import { getAllProduct, getProductById } from "../../../app/apiRequest";
import {
  getProductByIdSuccess,
  getProductSuccess,
} from "../../../app/productSlice/productsSlice";
import { clientApi } from "../../../api/api";
import ButtonSwitch from "../../../Component/Button/ButtonSwitch";
import InputSearch from "../../../Component/Input/InputSearch";
import ButtonActions from "../../../Component/Button/ButtonActions";
import ButtonAdd from "../../../Component/Button/ButtonAdd";
import { urlImg } from "../../../Component/Variable";
import "react-toastify/dist/ReactToastify.css";
import "./ClientProduct.css";
import ClientPagination from "../../../Component/Pagination/ClientPagination";
import SkeletonTable from "../../../Component/Skeleton/SkeletonTable";

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

const ClientProduct = () => {
  const [render, setRender] = useState(false);
  // input search
  const [open, setOpen] = useState(false);
  const [dataNew, setDataNew] = useState(null);
  //  value input search
  const [value, setValue] = useState();
  const dispath = useDispatch();
  const navigate = useNavigate();
  // pagination
  const [pagination, setPagination] = useState({
    current_page: 0,
    to: 10,
    totalRows: 18,
    totalPages: 2,
  });
  //  End pagination

  const [filter, setFilter] = useState({
    current_page: 0,
    to: 10,
  });

  const [getProduct, setGetProduct] = useState(null);
  const notify = (type = "success", content = "Cập nhật thành công!") =>
    toast[type](content);
  // -----------------------

  const dataCategory = useSelector(
    (state) => state.category.category.category[0]
  );
  const productById = useSelector(
    (state) => state.products.product.productById
  );

  useEffect(() => {
    const getProductPagination = async () => {
      try {
        const res = await clientApi.productPagination(
          filter.current_page,
          filter.to
        );
        const result = res.data.result;
        setGetProduct(result.data);
        setPagination({
          ...pagination,
          to: result.to,
          totalRows: result.total,
          totalPages: result.last_page,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProductPagination();
  }, [filter]);

  const handlePageChange = (newPage, rowsPerPage) => {
    setFilter({
      ...filter,
      current_page: newPage,
      to: rowsPerPage,
    });
  };

  const handleEdit = (e, product) => {
    dispath(getProductSuccess(product));
    navigate("/product/edit", product);
  };

  // show Detail
  const handleOpen = (id) => {
    getProductById(dispath, id);
    setOpen(true);
  };
  const handleClose = () => {
    getProductByIdSuccess(null);
    setOpen(false);
  };
  // End show Detail

  // get data Product

  useEffect(() => {
    getAllProduct(dispath);
  }, [render]);
  // End data Product

  // delete Product

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        await clientApi.productDelete(id);
        notify("success", "Xóa sản phẩm thành công!");
        setRender(!render);
      } catch (error) {
        notify("error", "Xóa sản phẩm thất bại!");
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
        notify();
      } catch (error) {
        notify("error", "Cập nhật thất bại!");
      }
    };
    const dataDisplay = new FormData();
    dataDisplay.append("title", product.title);
    dataDisplay.append("photo", product.photo);
    dataDisplay.append("price", product.price);
    dataDisplay.append("detail", product.detail);
    dataDisplay.append("content", product.content);
    dataDisplay.append("description", product.description);
    dataDisplay.append("position", product.position);
    if (check) {
      dataDisplay.append("display", 1);
      updateDisplay(product.id, dataDisplay);
    } else {
      dataDisplay.append("display", 0);
      updateDisplay(product.id, dataDisplay);
    }
    setRender(!render);
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
        if (getProduct) {
          await getProduct?.forEach((item, i) => {
            if (value !== "") {
              if (
                item.title.toLowerCase().includes(value.trim().toLowerCase(), 0)
              ) {
                return dataSearch.push(item);
              }
              setDataNew(dataSearch);
            } else {
              setDataNew(null);
            }
          });
        }
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
        <ButtonAdd link="/product/add" title="Add New" />
        {/* End button add */}

        {/* Input search */}

        <InputSearch handleChange={(e) => handleChange(e)} value={value} />
        {/* End Input search */}
      </div>
      <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7">
        {/* Table show product */}
        <table className="w-full text-bgButton font-medium ">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Price</td>
              <td>Display</td>
              <td>Position</td>
              <td>Category</td>
              <td>Actions</td>
            </tr>
          </thead>

          {/* show data Product */}
          {getProduct ? (
            <tbody className="text-[#333] dark:text-[#fff] font-light overflow-y-auto ">
              {dataNew?.map((item) => (
                <tr key={item.id} className="dark:hover:bg-hoverButton">
                  <td className="flex flex-row justify-start gap-2 items-center">
                    <img
                      src={urlImg + item.photo}
                      alt=""
                      width="50px"
                      height="50px"
                    />
                    <Link
                      onClick={(e, product) => handleEdit(e, item)}
                      to="/product/edit"
                      className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></td>
                  <td>{Intl.NumberFormat().format(Number(item.price))} VNĐ</td>

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
              )) ??
                getProduct?.map((item) => (
                  <tr key={item.id} className="dark:hover:bg-hoverButton">
                    <td className="flex flex-row justify-start gap-2 items-center">
                      <img
                        src={urlImg + item.photo}
                        alt=""
                        width="50px"
                        height="50px"
                      />
                      <Link
                        onClick={(e, product) => handleEdit(e, item)}
                        to="/product/edit"
                        className="break-words hover:text-bgButton dark:hover:text-lightPrimary font-normal text-base"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></td>
                    <td>
                      {Intl.NumberFormat().format(Number(item.price))} VNĐ
                    </td>

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
          ) : (
            <SkeletonTable rows={10} columns={5} image={true} />
          )}

          <tfoot>
            <tr className="shadow-none">
              <td colSpan="7">
                <div className="flex flex-row justify-end">
                  <ClientPagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
          {/* End show data product */}
        </table>

        {/* End table show product */}

        {/* Show Detail Blog */}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col px-10 py-16 h-[600px] overflow-y-scroll gap-5">
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
                      {productById[0]?.title}
                    </h2>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productById[0]?.description,
                      }}
                      className="text-md font-normal italic text-[#777]"
                    ></span>
                  </div>
                  <div>
                    <span>Giá: </span>
                    <strong className="text-[#ff6363] text-xl font-medium">
                      {Intl.NumberFormat().format(
                        Number(productById[0]?.price)
                      )}{" "}
                      VNĐ
                    </strong>
                  </div>
                  <div
                    className="text-[13px] font-light"
                    dangerouslySetInnerHTML={{
                      __html: productById[0]?.detail,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: productById[0]?.content,
                  }}
                  className="text-md font-normal text-[#000]"
                ></p>
              </div>
            </div>
          </Box>
        </Modal>

        {/*End Show Detail Blog */}
      </div>
      <ToastContainer />
    </>
  );
};

export default ClientProduct;
