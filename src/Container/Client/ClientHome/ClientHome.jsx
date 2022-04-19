import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const ClientHome = () => {
    const userList = useSelector((state) => state.users.users.allUsers);
    console.log(userList);
    return (
        <div>
            <>
                {userList?.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between mb-6 border-2"
                    >
                        <div className="flex gap-4  w-1/5 ">
                            <FaUserAlt className="text-[white]" />
                            <p className="text-[white]">{user.name}</p>
                        </div>
                        <div className=" w-1/5  flex justify-center items-center">
                            <p className="text-[white]">{user.email}</p>
                        </div>
                        <div className="w-1/5 flex items-center">
                            {user.level == 1 ? (
                                <p className="text-[white]"> Role : admin </p>
                            ) : (
                                <p className="text-[white]"> Role : user </p>
                            )}
                        </div>
                        <div className="w-1/5">
                            {" "}
                            <button className="text-[white] bg-[blue] p-2 rounded-xl   ">
                                Edit Role
                            </button>
                        </div>
                    </div>
                ))}
            </>
        </div>
    );
};

export default ClientHome;
