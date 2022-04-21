import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ButtonAdd from "../../../Component/Button/ButtonAdd";
import { getAllProductSuccess } from "../../../app/productSlice";
import InputSearch from "../../../Component/Input/InputSearch";
import { urlImg } from "../../../Component/Variable";
import ButtonSwitch from "../../../Component/Button/ButtonSwitch";
import ButtonActions from "../../../Component/Button/ButtonActions";

const ClientCategory = () => {
  const [render, setRender] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const dataCate = useSelector((state) => state.category.category.category);
  const [value, setValue] = useState();
  const dispath = useDispatch();
  const [dataNew, setDataNew] = useState(null);
  const [productByCata, setProductByCata] = useState([]);
  // get data Product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/product/index");
        setDataProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [render]);
  // End data Product
  // ------------------------------------

  useEffect(() => {
    const getProductByCate = async () => {
      try {
        let arr = [];
        dataProduct.forEach((product) => {
          if (product.category_id == dataCate[0].id) {
            return arr.push(product);
          }
        });
        setProductByCata(arr);
      } catch (error) {
        console.log(error);
      }
    };
    getProductByCate();
  }, [dataCate]);

  const handleEdit = (e, product) => {
    dispath(getAllProductSuccess(product));
  };

  // -------

  // Handle display
  const handleDisplay = (e, product) => {
    // On off button display
    const check = e.target.checked;
    const spanElement = e.target.parentElement;
    const btn = document.querySelectorAll(".btn-display");
    btn.forEach((item) => {
      if (item.id == product.id) {
        if (check) {
          item.style.transform = "translateX(125%)";
          spanElement.style.backgroundColor = "#0f8f31";
        } else {
          item.style.transform = "translateX(20%)";
          spanElement.style.backgroundColor = "#e64141";
        }
      }
    });

    // End On off button display

    // Update display
    const updateDisplay = async (id, data) => {
      try {
        const res = await axios.post(
          `http://localhost:8000/api/product/update/${id}`,
          data
        );
      } catch (error) {
        console.log(error);
      }
    };
    const dataDisplay = new FormData();
    dataDisplay.append("title", product.title);
    dataDisplay.append("photo", product.photo);
    dataDisplay.append("price", product.price);
    dataDisplay.append("description", product.description);
    dataDisplay.append("position", product.position);
    if (check) {
      dataDisplay.append("display", 1);
      updateDisplay(product.id, dataDisplay);
    } else {
      dataDisplay.append("display", 0);
      updateDisplay(product.id, dataDisplay);
    }
    // End Update display
  };
  // End handle display

  //   onChange Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //    search product
  useEffect(() => {
    const handleSearch = async () => {
      try {
        let dataSearch = [];
        const res = productByCata?.forEach((item, i) => {
          if (
            item.title.toLowerCase().includes(value.trim().toLowerCase(), 0)
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

  // delete Product

  const handleRemove = (id) => {
    const remove = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/category/delete/${id}`
        );
        setRender(!render);
      } catch (error) {
        console.log(error);
      }
    };
    remove();
  };

  // End delete Product
  return (
    <>
      <div className="flex flex-row items-center gap-5 w-full dark:bg-nightSecondary bg-lightSecondary shadow-lg py-3 px-5 rounded-xl">
        {/* button add */}
        <ButtonAdd link="/product/add" title="Add New" />
        {/* End button add */}

        {/* Input search */}

        <InputSearch handleChange={(e) => handleChange(e)} value={value} />
        {/* End Input search */}
      </div>
      <div className="w-full bg-lightSecondary p-3 dark:bg-nightSecondary shadow-lg rounded-xl my-7 ">
        {/* Table show product */}
        <table className="w-full text-bgButton font-medium">
          <thead>
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Description</td>
              <td>Price</td>
              <td>Detail</td>
              <td>Content</td>
              {/* <td>Photo</td> */}
              <td>Display</td>
              <td>Position</td>
              <td>CategoryId</td>
              <td>Actions</td>
            </tr>
          </thead>
          {/* show data Product */}
          <tbody className="text-[#333] dark:text-[#fff] font-light">
            {productByCata?.map((item) => (
              <tr key={item.id} className="dark:hover:hoverButton">
                <td>{item.id}</td>
                <td className="flex flex-row justify-start gap-2 w-40 items-center">
                  <img
                    src={urlImg + item.photo}
                    alt=""
                    width="50px"
                    height="50px"
                  />
                  <Link
                    onClick={(e, product) => handleEdit(e, item)}
                    to="/product/edit"
                    className="break-words hover:text-bgButton dark:hover:text-lightPrimary"
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td className="w-24 break-words">{item.detail}</td>
                <td className="w-36 break-words">{item.content}</td>

                {/* switched display */}
                <td>
                  <ButtonSwitch
                    id={item.id}
                    name={item.display}
                    handleChange={(e, product) => handleDisplay(e, item)}
                  />
                </td>
                {/* End switched display */}

                <td>{item.position}</td>

                <td key={item.id}>{dataCate[0].title}</td>

                {/* Button delete */}
                <td>
                  {/* <ButtonDelete handleClick={(id) => handleRemove(item.id)} /> */}
                  <ButtonActions
                    id={item.id}
                    handleRemove={(id) => handleRemove(item.id)}
                    handleEdit={(e, product) => handleEdit(e, item)}
                  />
                </td>

                {/* End button delete */}
              </tr>
            ))}
          </tbody>
          {/* End show data product */}
        </table>

        {/* End table show product */}
      </div>
    </>
  );
};

export default ClientCategory;
