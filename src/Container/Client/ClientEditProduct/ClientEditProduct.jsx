import { FiSave } from "react-icons/fi";
import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import "./ClientEditProduct.css";

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
  // get data edited
  const [title, setTitle] = useState();
  const [des, setDes] = useState();
  const [price, setPrice] = useState();

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
    const title = document.querySelector(".title").innerHTML;
    const description = document.querySelector(".description").innerHTML;
    const price = document.querySelector(".price").innerHTML;
    const photo = document.getElementById("photo").files[0];
    const dataUpdate = new FormData();
    dataUpdate.append("title", title);
    dataUpdate.append("description", description);
    dataUpdate.append("price", price);
    dataUpdate.append("photo", photo);

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
        const res = await data?.forEach((item, i) => {
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
      setProduct(dataEdit);
    });
  };

  const handleChangeImage = (e) => {
    setFile(e.target.files);
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
            className=" w-full h-80 bg-primary absolute top-[100%] left-0"
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
                    src={`http://localhost:8000/images/${item.photo}`}
                    alt=""
                    className="w-[60%] bg-cover border-2 border-secondary"
                  />
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="w-[12%]"
                    onChange={(e) => handleChangeImage(e)}
                  />
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
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-[14%] flex flex-row justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-[#e64141] text-[#fff] bg-secondary"
                >
                  <FiSave className="text-lg mr-4" />
                  Save
                </button>
              </div>
            </table>
          ))}

          {/* <thead>
              <td>Id</td>
              <td>Title</td>
              <td>Description</td>
              <td>Price</td>
              <td>Photo</td>
              <td>Actions</td>
            </thead>
            <tbody className="text-[#ffffff9e]">
              show product edit
              {product?.map((item) => (
                <tr>
                  <td className="id">{item.id}</td>
                  <td className="title" contentEditable="true">
                    {item.title}
                  </td>
                  <td className="description" contentEditable="true">
                    {item.description}
                  </td>
                  <td className="price" contentEditable="true">
                    {item.price}
                  </td>
                  <td className="photo" contentEditable="true">
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      files={file ?? item.photo}
                      onChange={(e) => handleChangeImage(e)}
                    />
                  </td>
                  <td>
                    <button
                      type="submit"
                      className=" mx-auto p-2 rounded-[50%] cursor-pointer bg-[#3d3d3d] mr-3 hover:bg-secondary hover:text-[#41b7ea]"
                    >
                      <FiSave className="mx-auto text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> */}
        </form>
      </div>
    </>
  );
};

export default ClientEditProduct;
