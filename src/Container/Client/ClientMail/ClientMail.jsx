import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ButtonSwitch from "../../../Component/Button/ButtonSwitch";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessage } from "../../../app/apiRequest";
import { getMessageById } from "../../../app/apiRequest";
import { urlImg } from "../../../Component/Variable";

import "../ClientProduct/ClientProduct.css";
import Toast from "../../../Component/Toast";
import InputSearch from "../../../Component/Input/InputSearch";
import ButtonActions from "../../../Component/Button/ButtonActions";
import ButtonAdd from "../../../Component/Button/ButtonAdd";
import { clientApi } from "../../../api/api";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

const ClientMail = () => {
    const [open, setOpen] = useState(false);
    const dispath = useDispatch();
    const navigate = useNavigate();
    const getMail = useSelector((state) => state.message.message.message);
    const getMailDetail = useSelector(
        (state) => state.message.message.messageById
    );
    console.log(getMailDetail);
    const [render, setRender] = useState(false);
    // -------------------
    const [mess, setMess] = useState([]);
    const [dataNew, setDataNew] = useState(null);
    //  value input search
    const [value, setValue] = useState();
    // -----------------------

    const handleOpen = (id) => {
        getMessageById(dispath, id);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await clientApi.messageShow();
                setMess(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, [render]);

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
                const res = getMail?.forEach((item, i) => {
                    if (
                        item.message
                            .toLowerCase()
                            .includes(value.trim().toLowerCase(), 0)
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

    const updateStatus = async (id, status) => {
        try {
            await clientApi.messageUpdateStatus(id, status);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSeen = (id) => {
        updateStatus(id, { status: 1 });
        getAllMessage(dispath);
        setRender(!render);
    };
    return (
        <>
            <div className="relative flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
                {/* Input search */}

                <InputSearch
                    handleChange={(e) => handleChange(e)}
                    value={value}
                />
                {/* End Input search */}
            </div>
            <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
                {/* Table show product */}
                <table className="w-full text-bgButton font-medium">
                    {/* show data Product */}
                    <tbody className="text-[#333] dark:text-[#fff] font-light">
                        {dataNew?.map((item) => (
                            <tr
                                style={
                                    item.status == 0
                                        ? { backgroundColor: "#f5eec8" }
                                        : {}
                                }
                                key={item.id}
                                className="dark:hover:hoverButton"
                            >
                                <td className="flex flex-row justify-start gap-2 w-40 items-center">
                                    <span>{item.fullname}</span>
                                    <p>{item.email}</p>
                                </td>
                                <td>{item.phone_number}</td>
                                <td className="w-24 break-words">
                                    {item.message}
                                </td>

                                {/* switched display */}
                                <td>
                                    {item.status == 0
                                        ? "Chưa xử lý"
                                        : "Đã xử lý"}
                                </td>
                                {/* End switched display */}

                                <td>
                                    {new Date(
                                        item.created_at
                                    ).toLocaleDateString("vi-VI")}{" "}
                                    {new Date(
                                        item.created_at
                                    ).toLocaleTimeString("vi-VI")}
                                </td>
                                <td>
                                    <ButtonActions
                                        id={item.id}
                                        handleSeen={(e) => handleSeen(e)}
                                    />
                                </td>
                            </tr>
                        )) ??
                            mess?.map((item) => (
                                <tr
                                    style={
                                        item.status == 0
                                            ? { backgroundColor: "#f5eec8" }
                                            : {}
                                    }
                                    key={item.id}
                                    className="dark:hover:bg-hoverButton"
                                >
                                    <td className="flex flex-row justify-start gap-2 items-center">
                                        <div className="flex flex-col">
                                            <span className="text-xl font-normal">
                                                {item.fullname}
                                            </span>
                                            <p className="text-[#777777a7] dark:text-[#ffffff90]">
                                                {item.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="w-80 truncate">
                                            {item.message}
                                        </p>
                                    </td>
                                    <td>
                                        {item.status == 0
                                            ? "Chưa xử lý"
                                            : "Đã xử lý"}
                                    </td>
                                    {/* End switched display */}

                                    <td>
                                        {new Date(
                                            item.created_at
                                        ).toLocaleDateString("vi-VI")}{" "}
                                        {new Date(
                                            item.created_at
                                        ).toLocaleTimeString("vi-VI")}
                                    </td>
                                    <td>
                                        <ButtonActions
                                            id={item.id}
                                            handleSeen={(id) =>
                                                handleOpen(item.id)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                    {/* End show data product */}
                </table>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="flex flex-col">
                            <div className="header-message flex flex-row justify-between items-center p-3">
                                <div>
                                    <h3 className="text-xl font-medium">
                                        {getMailDetail[0]?.fullname}
                                    </h3>
                                    <p className="text-[#666] italic">
                                        {getMailDetail[0]?.email}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-[#777] text-sm italic">
                                        {new Date(
                                            getMailDetail[0]?.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="content-message border-y-[1px] border-[#33333324] p-3 text-left">
                                <p className="font-light text-base ">
                                    {getMailDetail[0]?.message}
                                </p>
                            </div>
                            <div className="p-3 flex justify-between items-center">
                                <button
                                    onClick={(id) => {
                                        handleSeen(getMailDetail[0].id);
                                        setTimeout(() => {
                                            handleClose();
                                        }, 300);
                                    }}
                                    className="inline-block p-2 bg-bgButton text-[#fff] hover:bg-hoverButton shadow-md rounded-sm"
                                >
                                    Đã xử lý
                                </button>
                                <div>
                                    <span className="font-normal">Phone:</span>
                                    <a
                                        className="inline-block ml-2 text-lg font-medium hover:text-[#d75757]"
                                        href={`tel:+${getMailDetail[0]?.phone_number}`}
                                    >
                                        {getMailDetail[0]?.phone_number}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
                {/* End table show product */}
            </div>
        </>
    );
};

export default ClientMail;
