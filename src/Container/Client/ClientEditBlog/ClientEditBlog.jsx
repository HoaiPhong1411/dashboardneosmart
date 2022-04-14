import React from 'react'
import { FiSave } from "react-icons/fi";
import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
const ClientEditBlog = () => {
  // getApi
  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState(null);
  //  value input search
  const [value, setValue] = useState();
  // showDropDown
  const [dropDown, setDropDown] = useState(false);
  // show Product Choose
  const [blog, setBLog] = useState([]);
  const [load, setLoad] = useState(false);
  // get File Image
  const [file, setFile] = useState();
  // get data edited
  const [title, setTitle] = useState();
  const [des, setDes] = useState();

  //   Lấy product từ database
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/blog/index"
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
    const photo = document.getElementById("photo").files[0];
    const dataUpdate = new FormData();
    dataUpdate.append("title", title);
    dataUpdate.append("description", description);
    dataUpdate.append("photo", photo);

    updateBlog(id, dataUpdate);
    setBLog([]);
    setLoad(!load);
  };
  const updateBlog = async (id, data) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/blog/update/${id}`,
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
  const handleGetBLog = (id) => {
    const dataEdit = [];
    data?.forEach((item, i) => {
      const idItem = item.id;
      if (idItem === id) {
        return dataEdit.push(item);
      }
      setBLog(dataEdit);
    });
  };

  const handleChangeImage = (e) => {
    setFile(e.target.files);
  };

  return (
    <>
      <div className="flex flex-row gap-5 w-full bg-primary py-5 px-10 rounded-xl">
        <h1 className="text-[#fff] text-[1.5rem]">Edit BLog</h1>
        <div className="w-[40%] relative">
          {/* input */}
          <input
            onFocus={(e) => handleDropDown(e)}
            onBlur={(e) => handleClose(e)}
            onChange={(e) => handleChange(e)}
            type="text"
            value={value}
            className="w-full outline-none py-2 rounded-sm px-4 bg-primary text-[#fff] border-[1px] border-secondary"
            placeholder="Nhập tên BLog cần chỉnh sửa"
          />
          {/* End input */}

          {/* dropdown */}
          <ul
            style={dropDown ? { display: "block" } : { display: "none" }}
            className=" w-full h-80 bg-primary absolute top-[100%] left-0"
          >
            {dataNew?.map((item) => (
              <li
                onClick={() => handleGetBLog(item.id)}
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
          {blog?.map((item) => (
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
                    className="w-[60%]"
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
        </form>
      </div>
    </>
  );
}

export default ClientEditBlog