import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Outlet } from "react-router-dom";
import React,{useRef}from "react";
import NavBar from "../Component/NavBar";
import "./ClientLayout.css"

export default function ClientLayout() {

    const refContainer = useRef(null)
    const  handleToggle =(e) =>{
      e.target.classList.toggle('rotate-180')
      refContainer.current.classList.toggle('dashboard-menu')
      refContainer.current.children[1].children[0].classList.toggle('active-menu')
      refContainer.current.children[1].children[1].children[1].classList.toggle('active-menu')
      refContainer.current.children[1].children[2].classList.toggle('hide-navMenu')
    }
  return (
    <>
      <div className="w-full min-h-screen flex flex-row">
        <div ref={refContainer} className="transition-all duration-300 ease-out w-[20%] bg-primary relative">
                <img src={require('../assets/icons/control.png')} alt="#" className = "right-0 top-[25px] cursor-pointer text-white absolute w-[25px] translate-x-3" 
                onClick={(e)=>handleToggle(e)}/>
          <NavBar/>
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
