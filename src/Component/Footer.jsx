import { useState, useRef } from "react";

const Footer = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [color, setColor] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameP = document.querySelector(".name-pro");
    const priceP = document.querySelector(".price-pro");
    const colorP = document.querySelector(".color-pro");
    setName(nameP.innerHTML);
    setPrice(priceP.innerHTML);
    setColor(colorP.innerHTML);
  };
  console.log(name, price, color);
  return (
    <>
      <div className="text-secondary mt-5">Design by BTS</div>
    </>
  );
};

export default Footer;
