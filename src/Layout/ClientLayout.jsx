import Footer from "../Component/Footer";
import Header from "../Component/Header";
import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "../Component/NavBar";
export default function ClientLayout() {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
