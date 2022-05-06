import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { TiArrowBack } from "react-icons/ti";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonUpload from "../../../../Component/Button/ButtonUpload";

import { clientApi } from "../../../../api/api";
import { getProductSuccess } from "../../../../app/productSlice/productsSlice";
import { urlImg } from "../../../../Component/Variable";
import ButtonCheck from "../../../../Component/Button/ButtonCheck";
import "./ClientEditProduct.css";

const ClientEditProduct = () => {
  // getApi

  // show Product Choose
  const [load, setLoad] = useState(false);
  // get File Image
  const [file, setFile] = useState();
  const [img, setImg] = useState(null);
  // get data edited
  const [stateValue, setStateValue] = useState({
    title: null,
    price: null,
  });
  const [des, setDes] = useState();
  const [detail, setDetail] = useState();
  const [content, setContent] = useState();
  const [display, setDisplay] = useState();
  const [position, setPosition] = useState();
  const editorRef = useRef(null);

  const [editPro, setEditPro] = useState([]);
  const dispath = useDispatch();
  const getEdit = useSelector((state) => state.products.product.product);
  const [getTheme, setGetTheme] = useState();
  const navigate = useNavigate();
  const notify = (type = "success", content = "Sửa sản phẩm thành công!") =>
    toast[type](content);
  const getChangeTheme = async () => {
    try {
      window.addEventListener("click", (e) => {
        setGetTheme(localStorage.getItem("theme"));
      });
    } catch (error) {
      console.log(error);
    }
  };
  getChangeTheme();

  // --------------------------------

  useEffect(() => {
    setEditPro(getEdit);
  }, []);

  // Change title và price
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStateValue({
      ...stateValue,
      [name]: value,
    });
  };

  // onChange data update

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
      btnCheck.style.backgroundColor = "#0f8f31";
    } else {
      btnCheck.style.backgroundColor = "#fff";
    }
  };
  // End button display

  // button position
  const handleChangePosition = (e) => {
    setPosition(e.target.checked);
    let check = e.target.checked;
    const btnCheck = document.getElementById("btn-position");
    if (check) {
      btnCheck.style.backgroundColor = "#0f8f31";
    } else {
      btnCheck.style.backgroundColor = "#fff";
    }
  };
  // End button position

  // End Onchange data update

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = document.querySelector(".id").innerHTML;
    const dataUpdate = new FormData();

    // update
    dataUpdate.append("title", stateValue.title ?? editPro[0].title);
    dataUpdate.append("description", des ?? editPro[0].description);
    dataUpdate.append("detail", detail ?? editPro[0].detail);
    dataUpdate.append("content", content ?? editPro[0].content);
    dataUpdate.append("price", stateValue.price ?? editPro[0].price);
    dataUpdate.append("photo", file ?? editPro[0].photo);
    if (display ?? editPro[0].display) {
      dataUpdate.append("display", 1);
    } else {
      dataUpdate.append("display", 0);
    }
    if (position ?? editPro[0].position) {
      dataUpdate.append("position", 1);
    } else {
      dataUpdate.append("position", 0);
    }
    updateProduct(id, dataUpdate);
    dispath(getProductSuccess([]));
    setEditPro([]);
    setLoad(!load);
  };

  const updateProduct = async (id, data) => {
    try {
      await clientApi.productEdit(id, data);
      notify();
      setTimeout(() => {
        navigate("/product", data);
      }, 3000);
    } catch (error) {
      notify("error", "Cập nhật sản phẩm thất bại!");
    }
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <>
      <ToastContainer />

      <div className="ml-3 hover:text-hoverButton">
        <div
          className="cursor-pointer flex flex-row gap-1 items-center"
          onClick={() => handleNavigate()}
        >
          <span>Back</span>
          <TiArrowBack />
        </div>
      </div>

      <div className="flex flex-row gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-5 px-10 rounded-xl ">
        <form className="w-full" action="" onSubmit={(e) => handleSubmit(e)}>
          {editPro?.map((item) => (
            <table
              key={item.id}
              className="w-full text-secondary flex flex-col justify-between gap-5"
            >
              {/* === Input === */}
              <div className="flex flex-row justify-between gap-5">
                {/* === Left Table === */}
                <div className="w-[65%] flex flex-col justify-between gap-4">
                  {/* === Id === */}

                  <div className="hidden">
                    <label className="id">{item.id}</label>
                  </div>
                  {/* === End Id === */}

                  {/* === Title === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="title">Title</label>
                    <input
                      name="title"
                      type="text"
                      value={stateValue.title ?? item.title}
                      className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                      onChange={(e) => handleChanges(e)}
                    />
                  </div>

                  {/* === End Title === */}

                  {/* === Price === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      type="text"
                      value={stateValue.price ?? item.price}
                      className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                      onChange={(e) => handleChanges(e)}
                    />
                  </div>

                  {/* === End Price === */}

                  {/* === Description === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="description">Description</label>

                    <Editor
                      apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={item.description}
                      onEditorChange={(newText) => setDes(newText)}
                      init={{
                        height: 250,
                        width: "100%",
                        menubar: true,
                      }}
                      plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                      toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                      content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    />
                  </div>

                  {/* === End Discription === */}

                  {/* === Detail === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="detail">Detail</label>

                    <Editor
                      apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={item.detail}
                      onEditorChange={(newText) => setDetail(newText)}
                      init={{
                        height: 250,
                        width: "100%",
                        menubar: true,
                      }}
                      plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                      toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                      content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    />
                  </div>

                  {/* === End Detail === */}

                  {/* === Content === */}

                  <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                    <label htmlFor="content">Content</label>

                    <Editor
                      apiKey="9ksw8tn5zsdmdzj74e4l69xoewcxuqnmdgy3uf06wunsn404"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={item.content}
                      onEditorChange={(newText) => setContent(newText)}
                      init={{
                        height: 500,
                        width: "100%",
                        menubar: true,
                      }}
                      plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image"
                      toolbar="undo redo | formatselect bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
                      content_style="body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    />
                  </div>

                  {/* === End Content === */}
                </div>

                {/* === End Left Table === */}

                {/* === Right Table === */}

                <div className="w-[35%] flex flex-col justify-start gap-5">
                  {/* === Image === */}
                  <div className="w-full flex flex-col gap-5 justify-between items-center text-[#fff]">
                    <div
                      className="group flex flex-col w-full justify-between items-center relative
                   gap-2"
                    >
                      <img
                        src={img ?? urlImg + item.photo}
                        alt=""
                        className=" w-full h-[250px] bg-cover border-2 border-secondary"
                      />
                      {/* <label
                        htmlFor="photo"
                        className="absolute hidden group-hover:flex justify-center items-center w-full h-[250px] bg-[#33333366] cursor-pointer "
                      > */}
                      <ButtonUpload htmlFor="photo" />
                      {/* </label> */}
                      <input
                        type="file"
                        name="photo"
                        id="photo"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleChangeImage(e)}
                      />
                    </div>
                  </div>
                  {/* === End Image === */}

                  <div className="flex flex-row justify-between">
                    {/* === Display === */}

                    <div className="w-full flex flex-row justify-between items-center text-[#fff]">
                      <label htmlFor="display">Display</label>
                      <div className="w-[55%] ">
                        <ButtonCheck
                          htmlFor="display"
                          idIcon="btn-display"
                          style={
                            item.display !== 1
                              ? {
                                  backgroundColor: "#fff",
                                }
                              : {
                                  backgroundColor: "#0f8f31",
                                }
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

                    {/* === End Display === */}

                    {/* === Position === */}

                    <div className="w-full flex flex-row justify-between items-center text-[#fff]">
                      <label htmlFor="position">Position</label>
                      <div className="w-[55%] ">
                        <ButtonCheck
                          htmlFor="position"
                          idIcon="btn-position"
                          style={
                            item.position !== 1
                              ? {
                                  backgroundColor: "#fff",
                                }
                              : {
                                  backgroundColor: "#0f8f31",
                                }
                          }
                        />
                      </div>
                      <input
                        type="checkbox"
                        id="position"
                        className="hidden"
                        defaultChecked={item.position == 1 ? true : false}
                        onChange={(e) => handleChangePosition(e)}
                      />
                    </div>

                    {/* === End Position === */}
                  </div>
                </div>

                {/* === End Right Table === */}
              </div>

              {/* === End Input === */}

              {/* === Button Save === */}
              <div>
                {/* === Button Submit === */}

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="flex flex-row justify-center items-center py-2 px-4 rounded-lg cursor-pointer hover:bg-hoverButton text-[#fff] bg-bgButton"
                  >
                    <FiSave className="text-lg mr-4" />
                    Save
                  </button>
                </div>

                {/* === End Button === */}
              </div>

              {/* === End Button Save === */}
            </table>
          ))}
          {/* End pick from product */}
        </form>
      </div>
    </>
  );
};

export default ClientEditProduct;
