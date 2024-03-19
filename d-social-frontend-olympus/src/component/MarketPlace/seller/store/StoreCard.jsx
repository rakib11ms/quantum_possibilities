import React, { useState } from "react";
import Image from "next/image";
import { threedot } from "@/assets/MarketPlace";
import Modal from "react-modal";
import "./StoreCard.css";

import { useDispatch, useSelector } from "react-redux";
import { modalToggle } from "@/redux/features/modalSlice";
import { deleteShop } from "@/redux/features/shopSlice";
import { host } from "../../../../environment";
import toast from "react-hot-toast";

export default function StoreCard({ storeData }) {
  const dispatch = useDispatch();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleIconClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const isOpening = useSelector((state) => state.modal.isOpen);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleStoreDelete = () => {
    dispatch(deleteShop(storeData._id));
    setPopupVisible(!isPopupVisible);
    toast.success("Store deleted successfully!");
  };

  const handleShopEdit = () => {
    dispatch(
      modalToggle({
        isOpen: true,
        title: "Edit Store",
        name: storeData.name,
        category: storeData.category_name,
        description: storeData.description,
        shopId: storeData._id,
        img: `${host}/uploads/store/${storeData.image_path}`,
        pageId: storeData.page_id,
      })
    );
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="card__wrapper">
      {/* Top area */}
      <div className="top__area">
        <div className="store__img__wrapper">
          <img
            src={
              storeData.image_path
                ? `${host}/uploads/store/${storeData.image_path}`
                : `${host}/uploads/product/noimg.jpg`
            }
            className="store__img"
          />
        </div>
        <div className="sub__tittle__content">
          <div>
            <p className="sub__tittle">{storeData.name}</p>
            <p className="outline">{storeData.category_name}</p>
          </div>
          {!isPopupVisible && (
            <Image src={threedot} alt="three dot" onClick={handleIconClick} />
          )}
          {isPopupVisible && (
            <div className="popup">
              <button className="btnCustomeStyle" onClick={handleShopEdit}>
                Edit
              </button>
              <button className="btnCustomeStyle" onClick={handleStoreDelete}>
                Delete
              </button>
            </div>
          )}
          <style jsx>{`
            .popup {
              background: #fff;
              border: 1px solid #ccc;
              padding: 5px;
              z-index: 0;
              width: 80px;
            }

            .btnCustomeStyle {
              width: 60px;
              height: 25px;
              border: 0;
              margin-top: 10px;
              margin-left: 5px;
            }
          `}</style>
        </div>
      </div>

      {/* Middle Area */}
      <div className="middle__area">
        <p className="sub__tittle">Store Description</p>
        <p className="description">{storeData.description}</p>
      </div>

      {/* Bottom Area */}
      <div className="bottom__area">
        <div className="wrapper__area">
          <p>Product</p>
          <div className="icons__value">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 8.125L8 3.625L12.5 8.125M8 4.25V13.375"
                stroke="#FFA52F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>0</p>
          </div>
        </div>
        <div className="divider"></div>

        <div className="wrapper__area">
          <p>Product</p>
          <div className="icons__value">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 8.125L8 3.625L12.5 8.125M8 4.25V13.375"
                stroke="#FFA52F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
