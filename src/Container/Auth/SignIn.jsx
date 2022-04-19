import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginUser } from "../../app/apiRequest";
import { useDispatch } from "react-redux";

const Signin = () => {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            loginUser(values, dispath, navigate);
        },
    });

    return (
        <div>
            <div className="border-[1px] border-[#808080] shadow-lg mx-auto w-[50%] mt-5 py-10 px-5 rounded-3xl">
                <div className="flex items-center justify-around">
                    {" "}
                    <h1 className=" text-3xl font-bold mb-8">Login</h1>
                    <Link to="/">Home</Link>
                </div>

                <form
                    className="flex flex-col  px-3 gap-8"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="flex justify-start items-center gap-4">
                        <label className="font-semibold text-[14px]">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="enter your username"
                            className=" bg-[#E5E4E2] rounded-lg placeholder-slate-400 p-2 placeholder:text-sm w-2/3"
                        />
                    </div>
                    <div className="flex justify-start items-center gap-4">
                        <label className="font-semibold text-[14px]">
                            Password
                        </label>
                        <input
                            type="text"
                            id="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="enter your username"
                            className=" bg-[#E5E4E2] rounded-lg placeholder-slate-400 p-2 placeholder:text-sm w-2/3"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-2 mt-3 w-1/2 mx-auto rounded-xl mb-4 bg-secondary text-[white] hover:bg-primary"
                    >
                        Login
                    </button>
                    <div className="flex justify-end px-5">
                        <Link to="/signup">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
