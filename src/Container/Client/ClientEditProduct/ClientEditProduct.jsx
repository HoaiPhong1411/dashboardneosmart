import { FiSave } from "react-icons/fi";
import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { urlImg } from "../../../Component/Variable";
import "./ClientEditProduct.css";
import ButtonCheck from "../../../Component/Button/ButtonCheck";
import ButtonUpload from "../../../Component/Button/ButtonUpload";
import { getAllProductSuccess } from "../../../app/productSlice";

const ClientEditProduct = () => {
    // getApi
    // const [data, setData] = useState([]);

    // show Product Choose
    const [product, setProduct] = useState(null);
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

    const [editPro, setEditPro] = useState([]);
    const dispath = useDispatch();
    const getEdit = useSelector((state) => state.product.product.product);
    console.log(getEdit);
    const [getTheme, setGetTheme] = useState();
    const getChangeTheme = async () => {
        try {
            await window.addEventListener("click", (e) => {
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
        if (product) {
            dataUpdate.append("title", title ?? product[0].title);
            dataUpdate.append("description", des ?? product[0].description);
            dataUpdate.append("price", price ?? product[0].price);
            dataUpdate.append("photo", file ?? product[0].photo);
            if (display ?? product[0].display) {
                dataUpdate.append("display", 1);
            } else {
                dataUpdate.append("display", 0);
            }
            if (position ?? product[0].position) {
                dataUpdate.append("position", 1);
            } else {
                dataUpdate.append("position", 0);
            }
        } else {
            // update
            dataUpdate.append("title", title ?? editPro[0].title);
            dataUpdate.append("description", des ?? editPro[0].description);
            dataUpdate.append("price", price ?? editPro[0].price);
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
        }
        updateProduct(id, dataUpdate);
        dispath(getAllProductSuccess([]));
        setEditPro([]);
        setLoad(!load);
    };
    const updateProduct = async (id, data) => {
        try {
            await axios.post(
                `http://localhost:8000/api/product/update/${id}`,
                data
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* <div className="flex flex-row gap-5 w-full items-center dark:bg-nightSecondary bg-lightSecondary shadow-lg py-5 px-10 rounded-xl">
        <h1 className="text-bgButton text-[1.4rem]">Edit Product</h1>
      </div> */}

            <div className="flex flex-row gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-5 px-10 rounded-xl ">
                <form
                    className="w-full"
                    action=""
                    onSubmit={(e) => handleSubmit(e)}
                >
                    {
                        // pick from product
                        editPro?.map((item) => (
                            <table className="w-full text-secondary flex flex-row justify-between gap-5">
                                {/* === Left Table === */}
                                <div className="w-1/2 flex flex-col justify-between gap-4">
                                    {/* === Id === */}

                                    <div className="hidden">
                                        <label className="id">{item.id}</label>
                                    </div>
                                    {/* === End Id === */}

                                    {/* === Title === */}

                                    <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            value={title ?? item.title}
                                            className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                                            onChange={(e) =>
                                                handleChangeTitle(e)
                                            }
                                        />
                                    </div>

                                    {/* === End Title === */}

                                    {/* === Description === */}

                                    <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            rows="3"
                                            type="text"
                                            value={des ?? item.description}
                                            className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                                            onChange={(e) => handleChangeDes(e)}
                                        />
                                    </div>

                                    {/* === End Discription === */}

                                    {/* === Price === */}

                                    <div className="w-full flex flex-col justify-between gap-2 items-start text-[#fff]">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            type="text"
                                            value={price ?? item.price}
                                            className="w-full border-[1px] border-secondary dark:bg-primary dark:text-[#fff] focus:border-[#e0ed2e] font-light"
                                            onChange={(e) =>
                                                handleChangePrice(e)
                                            }
                                        />
                                    </div>

                                    {/* === End Price === */}

                                    {/* === Display === */}

                                    <div className="w-full flex flex-row justify-between items-center text-[#fff]">
                                        <label htmlFor="display">Display</label>
                                        <div className="w-[75%] ">
                                            <ButtonCheck
                                                htmlFor="display"
                                                idIcon="btn-display"
                                                style={
                                                    item.display !== 1
                                                        ? {
                                                              backgroundColor:
                                                                  "#fff",
                                                          }
                                                        : {
                                                              backgroundColor:
                                                                  "#0f8f31",
                                                          }
                                                }
                                            />
                                        </div>
                                        <input
                                            type="checkbox"
                                            defaultChecked={
                                                item.display == 1 ? true : false
                                            }
                                            id="display"
                                            className="hidden"
                                            onChange={(e) =>
                                                handleChangeDiplay(e)
                                            }
                                        />
                                    </div>

                                    {/* === End Display === */}

                                    {/* === Position === */}

                                    <div className="w-full flex flex-row justify-between items-center text-[#fff]">
                                        <label htmlFor="position">
                                            Position
                                        </label>
                                        <div className="w-[75%] ">
                                            <ButtonCheck
                                                htmlFor="position"
                                                idIcon="btn-position"
                                                style={
                                                    item.position !== 1
                                                        ? {
                                                              backgroundColor:
                                                                  "#fff",
                                                          }
                                                        : {
                                                              backgroundColor:
                                                                  "#0f8f31",
                                                          }
                                                }
                                            />
                                        </div>
                                        <input
                                            type="checkbox"
                                            id="position"
                                            className="hidden"
                                            defaultChecked={
                                                item.position == 1
                                                    ? true
                                                    : false
                                            }
                                            onChange={(e) =>
                                                handleChangePosition(e)
                                            }
                                        />
                                    </div>

                                    {/* === End Position === */}
                                </div>

                                {/* === End Left Table === */}

                                {/* === Right Table === */}

                                <div className=" w-1/2 flex flex-col justify-between">
                                    {/* === Image === */}
                                    <div className="w-full flex flex-col gap-5 justify-between items-center text-[#fff]">
                                        <div
                                            className="flex flex-col w-full justify-between items-center
                   gap-2"
                                        >
                                            <img
                                                src={img ?? urlImg + item.photo}
                                                alt=""
                                                className="w-[400px] h-[310px] bg-cover border-2 border-secondary"
                                            />
                                            <input
                                                type="file"
                                                name="photo"
                                                id="photo"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    handleChangeImage(e)
                                                }
                                            />
                                            <ButtonUpload htmlFor="photo" />
                                        </div>
                                    </div>
                                    {/* === End Image === */}

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

                                {/* === End Right Table === */}
                            </table>
                        ))
                    }
                    {/* End pick from product */}
                </form>
            </div>
        </>
    );
};

export default ClientEditProduct;
