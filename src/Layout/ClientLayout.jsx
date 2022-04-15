import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Outlet } from "react-router-dom";
import React,{useRef}from "react";
import NavBar from "../Component/NavBar";
import "./ClientLayout.css"
import {IoArrowUndoCircleSharp} from 'react-icons/io5'
export default function ClientLayout() {
    const refContainer = useRef(null)
    const  handleShow =(e) => {
      refContainer.current.classList.toggle('dashboard-menu')
      e.target.classList.toggle('active-menu')
      refContainer.current.children[1].children[0].classList.toggle('active-menu')
      refContainer.current.children[1].children[1].children[1].classList.toggle('active-menu')
      refContainer.current.children[1].children[2].classList.toggle('hide-navMenu')
    }
  return (
    <>
      <div className="w-full min-h-screen flex flex-row">
        <div ref={refContainer} className="w-[20%] bg-primary relative">
            <IoArrowUndoCircleSharp style = {{fontSize :"40px", color:"#fff"}} className = "absolute top-[20px] ml-[230px] " onClick={e=>handleShow(e)}/>
          <NavBar />
        </div>
        <div className="w-full  flex flex-col">
          <div className="bg-primary py-[1.25rem] px-[1.5rem]">
            <Header />
          </div>
          <div className="bg-[#000] min-h-screen p-7">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
