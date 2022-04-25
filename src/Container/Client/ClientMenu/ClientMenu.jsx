import React, { useState, useEffect } from "react";
import ButtonAdd from "../../../Component/Button/ButtonAdd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ClientMenu = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [menuId, setMenuId] = useState(null);
    const dataMenu = useSelector((state) => state.menu.menu.listMenu);
    const handleEdit = () => {
        setShow(!show);
    };
    const editMenuById = (id) => {
        const getMenuById = async () => {
            try {
                const url = `http://localhost:8000/api/menu/show/${id}`;
                const res = await axios.get(url);
                setMenuId([res.data]);
            } catch (error) {
                console.log(error);
            }
        };
        getMenuById();
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            label: "",
            parent: "",
            sort: "",
        },
    });

    return (
        <div>
            <div>
                <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
                    <ButtonAdd link="/menu/add" title="Add Menu" />
                </div>
                <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
                    <table className="w-full text-bgButton font-medium">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Displayname</td>
                                <td>Link</td>
                                <td>Sub Menu</td>
                                <td>Position</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody className="text-[#333] dark:text-[#fff] font-light">
                            {dataMenu?.map((item) => (
                                <tr
                                    key={item.id}
                                    className="dark:hover:hoverButton"
                                    onClick={(id) => editMenuById(item.id)}
                                >
                                    <td>{item.id}</td>
                                    <td className="flex flex-row justify-start gap-2 w-40 items-center">
                                        <p className="break-words hover:text-bgButton dark:hover:text-lightPrimary">
                                            {item.label}
                                        </p>
                                    </td>
                                    <td>{item.link}</td>
                                    <td>{item.parent}</td>
                                    <td>{item.sort}</td>
                                    <td>
                                        <button className="bg-[red] px-2 text-[white]">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {!show && (
                <div>
                    <form className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                value={formik.values.label}
                                onChange={formik.handleChange}
                                id="title"
                            />
                        </div>
                        <div>
                            <label htmlFor="title">Link</label>
                            <input
                                type="text"
                                value={formik.values.link}
                                onChange={formik.handleChange}
                                id="title"
                            />
                        </div>
                        <div className="flex gap-4">
                            <label htmlFor="title">Show Sub Menu</label>
                            <div></div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ClientMenu;
