import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Outlet } from "react-router-dom";
import React,{useRef}from "react";
import NavBar from "../Component/NavBar";
import "./ClientLayout.css"
import {IoArrowUndoCircleSharp} from 'react-icons/io5'

export default function ClientLayout() {
    const refContainer = useRef(null)
    const refArrow = useRef(null)
    const  handleHide =() => {
      refArrow.current.classList.add('active-menu')
      refContainer.current.classList.add('dashboard-menu')
      refContainer.current.children[1].children[0].classList.toggle('active-menu')
      refContainer.current.children[1].children[1].children[1].classList.toggle('active-menu')
      refContainer.current.children[1].children[2].classList.toggle('hide-navMenu')
    }
    const  handleShow =() => {
      refContainer.current.classList.remove('dashboard-menu')
      refContainer.current.children[1].children[0].classList.remove('active-menu')
      refContainer.current.children[1].children[1].children[1].classList.remove('active-menu')
      refContainer.current.children[1].children[2].classList.remove('hide-navMenu')
      refArrow.current.classList.remove('active-menu')
    }
  return (
    <>
      <div className="w-full min-h-screen flex flex-row">
        <div ref={refContainer} className="transition-all duration-300 ease-out w-[20%] bg-primary relative">
              <div className="w-full"  ref={refArrow}>
                <IoArrowUndoCircleSharp style = {{fontSize :"35px", color:"#fff"}} className = "absolute w-[50px] top-[20px] ml-[230px] cursor-pointer" onClick={()=>handleHide()}/>
              </div>
          <NavBar show ={handleShow}/>
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
