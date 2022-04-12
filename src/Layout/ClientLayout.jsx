import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "../Component/NavBar";
export default function ClientLayout() {
  return (
    <>
      <div className="w-full h-full flex flex-row">
        <div className="w-[20%] bg-primary">
          <NavBar />
        </div>
        <div className="w-[80%] flex flex-col">
          <div className="bg-primary py-[1.25rem] px-[1.5rem]">
            <Header />
          </div>
          <div className="bg-[#000] p-7">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
