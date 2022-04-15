import { FiSave } from "react-icons/fi";
import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { BsCheckLg } from "react-icons/bs";

import { urlImg } from "../../../Component/Variable";
import "./ClientEditProduct.css";
import ButtonCheck from "../../../Component/ButtonCheck";
import ButtonUpload from "../../../Component/ButtonUpload";
import ButtonSwitch from "../../../Component/ButtonSwitch";

const ClientEditProduct = () => {
  // getApi
  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState(null);
  //  value input search
  const [value, setValue] = useState();
  // showDropDown
  const [dropDown, setDropDown] = useState(false);
  // show Product Choose
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(false);
  // get File Image
  const [file, setFile] = useState();
  const [img, setImg] = useState();
  // get data edited
  const [title, setTitle] = useState();
  const [des, setDes] = useState();
  const [price, setPrice] = useState();
  const [display, setDisplay] = useState();
  const [position, setPosition] = useState();

  //   Lấy product từ database
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
  }, [load]);
  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // onChange data update
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDes = (e) => {
    setDes(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeImage = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // button display
  const handleChangeDiplay = (e) => {
    setDisplay(e.target.checked);
    let check = e.target.checked;
    const btnCheck = document.getElementById("btn-display");
    if (check) {
      btnCheck.style.color = "#04f604";
    } else {
      btnCheck.style.color = "#fff";
    }
  };
  // End button display

  // button position
  const handleChangePosition = (e) => {
    setPosition(e.target.checked);
    let check = e.target.checked;
    const btnCheck = document.getElementById("btn-position");
    if (check) {
      btnCheck.style.color = "#04f604";
    } else {
      btnCheck.style.color = "#fff";
    }
  };
  // End button position

  // End Onchange data update

  //   showDropDown
  const handleDropDown = (e) => {
    setDropDown(!dropDown);
  };

  //CloseDropDown
  const handleClose = (e) => {
    setTimeout(() => {
      setDropDown(!dropDown);
    }, 200);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = document.querySelector(".id").innerHTML;
    const dataUpdate = new FormData();
    dataUpdate.append("title", title ?? product[0].title);
    dataUpdate.append("description", des ?? product[0].description);
    dataUpdate.append("price", price ?? product[0].price);
    dataUpdate.append("photo", file ?? product[0].photo);
    if (display) {
      dataUpdate.append("display", +1);
    } else {
      dataUpdate.append("display", +0);
    }
    if (position) {
      dataUpdate.append("position", +1);
    } else {
      dataUpdate.append("position", +0);
    }

    updateProduct(id, dataUpdate);
    setProduct([]);
    setLoad(!load);
  };
  const updateProduct = async (id, data) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/product/update/${id}`,
        data
      );

      console.log("success", response);
    } catch (error) {
      console.log(error);
    }
  };
  //    search product
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        const res = data?.forEach((item, i) => {
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

  //   chọn product từ dropdown để edit
  const handleGetProduct = (id) => {
    const dataEdit = [];
    data?.forEach((item, i) => {
      const idItem = item.id;
      if (idItem == id) {
        return dataEdit.push(item);
      }
    });
    setProduct(dataEdit);
    setValue(dataEdit[0].title);
  };
  return (
    <>
      <div className="flex flex-row gap-5 w-full bg-primary py-5 px-10 rounded-xl">
        <h1 className="text-[#fff] text-[1.5rem]">Edit Product</h1>
        <div className="w-[40%] relative">
          {/* input */}
          <input
            onFocus={(e) => handleDropDown(e)}
            onBlur={(e) => handleClose(e)}
            onChange={(e) => handleChange(e)}
            type="text"
            value={value}
            className="w-full outline-none py-2 rounded-sm px-4 bg-primary text-[#fff] border-[1px] border-secondary"
            placeholder="Nhập tên sản phẩm cần chỉnh sửa"
          />
          {/* End input */}

          {/* dropdown */}
          <ul
            style={dropDown ? { display: "block" } : { display: "none" }}
            className=" w-full h-80 bg-primary absolute top-[100%] left-0 overflow-hidden"
          >
            {dataNew?.map((item) => (
              <li
                onClick={() => handleGetProduct(item.id)}
                className="text-[#fff] text-[1.2rem] px-3 py-2 hover:bg-[#414141] cursor-pointer"
              >
                {item.title}
              </li>
            ))}
          </ul>
          {/* End dropdown */}
        </div>
      </div>
      <div className="flex flex-row gap-5 w-full bg-primary py-5 px-10 rounded-xl mt-7">
        <form className="w-full" action="" onSubmit={(e) => handleSubmit(e)}>
          {product?.map((item) => (
            <table className="w-full text-secondary flex flex-col gap-5">
              <div className="w-full flex flex-col gap-5 justify-between items-center text-[#fff]">
                <div
                  className="flex flex-col w-full justify-between items-center
                 gap-5"
                >
                  <img
                    src={img ?? urlImg + item.photo}
                    alt=""
                    className="w-[60%] bg-cover border-2 border-secondary"
                  />
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleChangeImage(e)}
                  />
                  <ButtonUpload htmlFor="photo" />
                </div>
              </div>
              <div className="hidden">
                <label className="id">{item.id}</label>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={title ?? item.title}
                  className="w-[85%] border-[1px] border-secondary bg-primary focus:border-[#e0ed2e]"
                  onChange={(e) => handleChangeTitle(e)}
                />
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="3"
                  type="text"
                  value={des ?? item.description}
                  className="w-[85%] border-[1px] border-secondary bg-primary focus:border-[#e0ed2e]"
                  onChange={(e) => handleChangeDes(e)}
                />
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  value={price ?? item.price}
                  className="w-[85%] border-[1px] border-secondary bg-primary focus:border-[#e0ed2e]"
                  onChange={(e) => handleChangePrice(e)}
                />
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <label htmlFor="display">Display</label>
                <div className="w-[85%] ">
                  <ButtonCheck
                    htmlFor="display"
                    idIcon="btn-display"
                    style={
                      item.display !== 1
                        ? { color: "#fff" }
                        : { color: "#04f604" }
                    }
                  />
                </div>
                <input
                  type="checkbox"
                  defaultChecked={item.display == 1 ? true : false}
                  id="display"
                  className="hidden"
                  onChange={(e) => handleChangeDiplay(e)}
                />
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <label htmlFor="position">Position</label>
                <div className="w-[85%] ">
                  <ButtonCheck
                    htmlFor="position"
                    idIcon="btn-position"
                    style={
                      item.position !== 1
                        ? { color: "#fff" }
                        : { color: "#04f604" }
                    }
                  />
                </div>
                <input
                  type="checkbox"
                  id="position"
                  className="hidden"
                  style={
                    item.position !== 1
                      ? { color: "#fff" }
                      : { color: "#04f604" }
                  }
                  onChange={(e) => handleChangePosition(e)}
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-[14%] flex flex-row justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-[#2a7ffe] text-[#fff] bg-secondary"
                >
                  <FiSave className="text-lg mr-4" />
                  Save
                </button>
              </div>
            </table>
          ))}
        </form>
      </div>
    </>
  );
};

export default ClientEditProduct;
