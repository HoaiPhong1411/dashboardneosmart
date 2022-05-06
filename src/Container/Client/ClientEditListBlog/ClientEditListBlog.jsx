
import { FiSave } from "react-icons/fi";
import { useEffect, useState} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { getAllListBlogSuccess } from "../../../app/listBlogSlice";

const ClientEditListBlog = () => {
  // getApi
  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState(null);
  //  value input search
  const [value, setValue] = useState();
  // showDropDown
  const [dropDown, setDropDown] = useState(false);
  // show Product Choose
  const [listItem, setListItem] = useState(null)
  const [load, setLoad] = useState(false);
  // get data edited
  const [title, setTitle] = useState();
  const [des, setDes] = useState();

  const [editPro, setEditPro] = useState([]);
  const dispath = useDispatch();
  const getEdit = useSelector((state) => state.product.product.product);
  useEffect(() => {
    setEditPro(getEdit);
  }, []);
  //   Lấy product từ database
  useEffect(() => {
    const fecth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/listblog/index"
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
    if (listItem) {
      dataUpdate.append("title", title ?? listItem[0].title);
      dataUpdate.append("description", des ?? listItem[0].description);
    } else {
      // update
      dataUpdate.append("title", title ?? editPro[0].title);
      dataUpdate.append("description", des ?? editPro[0].description);
    }
    updateListBLog(id, dataUpdate);
    dispath(getAllListBlogSuccess([]));
    setListItem([]);
    setLoad(!load);
  };
  const updateListBLog = async (id, data) => {
    try {
      await axios.post(`http://localhost:8000/api/listblog/update/${id}`, data);
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
  const handleGetListBLog = (id) => {
    const dataEdit = [];
    data?.forEach((item, i) => {
      const idItem = item.id;
      if (idItem == id) {
        return dataEdit.push(item);
      }
    });
    setListItem(dataEdit);
    setValue(dataEdit[0].title);
  };
  return (
    <>
      <div className="flex flex-row gap-5 w-full items-center bg-primary py-5 px-10 rounded-xl">
        <h1 className="text-[#fff] text-[1.4rem]">Edit List</h1>
        <div className="w-[40%] relative">
          {/* input */}
          <input
            onFocus={(e) => handleDropDown(e)}
            onBlur={(e) => handleClose(e)}
            onChange={(e) => handleChange(e)}
            type="text"
            value={value}
            className="w-full outline-none py-[0.4rem] text-sm rounded-md px-4 text-[#ffffff] border-[1px] border-secondary"
            placeholder="Nhập tên list cần chỉnh sửa"
          />
          {/* End input */}

          {/* dropdown */}
          <ul
            style={dropDown ? { display: "block" } : { display: "none" }}
            className=" w-full h-[19rem] bg-primary absolute top-[100%] left-0 overflow-hidden overflow-y-scroll"
          >
            {dataNew?.map((item) => (
              <li
                onClick={() => handleGetListBLog(item.id)}
                className="text-[#fff] text-[0.9rem] px-3 py-2 hover:bg-[#414141] cursor-pointer"
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
          {
            // pick from input
            listItem?.map((item) => (
              <table className="w-full text-secondary flex flex-col gap-5">
                <div className="w-full flex flex-col gap-5 justify-between items-center text-[#fff]">
                </div>
                <div className="hidden">
                  <label className="id">{item.id}</label>
                </div>
                <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    value={title ?? item.title}
                    className="w-full border-[1px] border-secondary focus:border-[#e0ed2e] font-light"
                    onChange={(e) => handleChangeTitle(e)}
                  />
                </div>
                <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                  <label htmlFor="description">Description</label>
                  <textarea
                    rows="3"
                    type="text"
                    value={des ?? item.description}
                    className="w-full border-[1px] border-secondary focus:border-[#e0ed2e] font-light"
                    onChange={(e) => handleChangeDes(e)}
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
            )) ?? // End pick from input
              // pick from product
              getEdit?.map((item) => (
                <table className="w-full text-secondary flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-5 justify-between items-center text-[#fff]">
                  </div>
                  <div className="hidden">
                    <label className="id">{item.id}</label>
                  </div>
                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      value={title ?? item.title}
                      className="w-full border-[1px] border-secondary focus:border-[#e0ed2e] font-light"
                      onChange={(e) => handleChangeTitle(e)}
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="description">Description</label>
                    <textarea
                      rows="3"
                      type="text"
                      value={des ?? item.description}
                      className="w-full border-[1px] border-secondary focus:border-[#e0ed2e] font-light"
                      onChange={(e) => handleChangeDes(e)}
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
              ))
          }
          {/* End pick from product */}
        </form>
      </div>
    </>
  );
};

export default ClientEditListBlog;

