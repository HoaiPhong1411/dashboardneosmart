import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useFormik, Field } from "formik";
import axios from "axios";
import { useState } from "react";
const ClientAddBlog = () => {
    const [image, setImage] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            content: "",
            photo: "",
            display: "",
            position: "",
        },
        onSubmit: (value) => {
            const data = new FormData();
            data.append("title", value.title);
            data.append("description", value.description);
            data.append("content", value.content);
            data.append("photo", image);
            data.append("display", value.display);
            data.append("position", value.position);
            addBlog(data);
        },
    });
    const addBlog = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/blog/store",
                data
            );
            setTimeout(() => {
                window.location.reload();
            }, 200);
        } catch (error) {
            alert("Vui Lòng Nhập Đầy Đủ !");
        }
    };
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };
    return (
        <>
            <div className="flex flex-row gap-5 w-full dark:bg-[black] bg-[white]  py-5 px-10 rounded-xl">
                <h1 className="dark:text-[white] text-[black] text-[1.5rem]">
                    Add Blog
                </h1>
            </div>
            <div
                onSubmit={formik.handleSubmit}
                className=" gap-5 w-full dark:bg-[black] bg-[white] py-5 px-10 rounded-xl mt-7"
            >
                <form
                    id="form"
                    action=""
                    onSubmit={(e) => handleSubmit(e)}
                    className="dark:text-[#fff] text-[black]"
                >
                    <div className="flex flex-row justify-between items-center mb-5">
                        <label
                            htmlFor="title"
                            className="text-[1.25rem] font-normal"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Name"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            className="w-[85%] px-3 py-2 border-[1px] rounded-lg font-light dark:border-[white] border-[black] outline-none dark:bg-[black] bg-[white] dark:focus:border-[white] forcus:border-[black]"
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center mb-5">
                        <label
                            htmlFor="description"
                            className="text-[1.25rem] font-normal"
                        >
                            Description
                        </label>
                        <textarea
                            rows="3"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className="w-[85%] px-3 py-2 border-[1px] rounded-lg font-light dark:border-[white] border-[black] outline-none dark:bg-[black] bg-[white] dark:focus:border-[white] forcus:border-[black] "
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center mb-5">
                        <label
                            htmlFor="content"
                            className="text-[1.25rem] font-normal"
                        >
                            Content
                        </label>
                        <textarea
                            rows="3"
                            type="text"
                            name="content"
                            id="content"
                            placeholder="Content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            className="w-[85%] px-3 py-2 border-[1px] rounded-lg font-light dark:border-[white] border-[black] outline-none dark:bg-[black] bg-[white] dark:focus:border-[white] forcus:border-[black] "
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center mb-5">
                        <label
                            htmlFor="photo"
                            className="text-[1.25rem] font-normal"
                        >
                            Photo
                        </label>

                        <input
                            type="file"
                            name="photo"
                            id="photo"
                            files={image}
                            onChange={(e) => handleImage(e)}
                            // onChange={(e) => handleImage(e)}
                            className="w-[85%] px-3 py-2 border-[1px] rounded-lg font-light dark:border-[white] border-[black] outline-none dark:bg-[black] bg-[white] dark:focus:border-[white] forcus:border-[black] "
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center mb-5">
                        <label
                            htmlFor="display"
                            className="text-[1.25rem] font-normal"
                        >
                            Display
                        </label>
                        <input
                            type="number"
                            name="display"
                            id="display"
                            placeholder="Display"
                            value={formik.values.display}
                            onChange={formik.handleChange}
                            className="w-[85%] px-3 py-2 border-[1px] font-light rounded-lg dark:border-[white] border-[black] outline-none dark:bg-[black] bg-[white] dark:focus:border-[white] forcus:border-[black] "
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center mb-5">
                        <label
                            htmlFor="position"
                            className="text-[1.25rem] font-normal"
                        >
                            Position
                        </label>
                        <input
                            type="number"
                            name="position"
                            id="position"
                            placeholder="Position"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            className="w-[85%] px-3 py-2 border-[1px] rounded-lg font-light dark:border-[white] border-[black] outline-none dark:bg-[black] bg-[white] dark:focus:border-[white] forcus:border-[black] "
                        />
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <button className="flex flex-row  justify-center items-center gap-3 px-4 py-2 dark:bg-[white] border-2 dark:border-[black] border-[white] dark:text-[black] rounded-lg  bg-[black] text-[white] text-[1.25rem]">
                            <IoMdAddCircle />
                            Add Blog
                        </button>
                    </div>
                </form>
                <p id="err" className="text-[red] text-[2rem] font-light"></p>
            </div>
        </>
    );
};

export default ClientAddBlog;
