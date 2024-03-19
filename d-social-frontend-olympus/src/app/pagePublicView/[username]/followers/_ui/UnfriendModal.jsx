import React from "react";
import "./UnfriendModal.css";
import AlertIcon from "./Icons/AlertIcon";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../../utils/axios";

function UnfriendModal({ setIsOpenModal, frienModalInfo, allFriends }) {
  const handleCancel = () => {
    setIsOpenModal({ unfriend: false });
  };

  const handleUnfriend = (_id) => {
    axiosInstance
      .post("/api/unfriend-user", {
        requestId: _id,
      })
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });
          const localStorageUserName = localStorage.getItem("username");
          allFriends(localStorageUserName);
        }
      });
    setIsOpenModal({ unfriend: false });
  };
  return (
    <div className="unfriend_modal_container">
      <AlertIcon />
      <p className="unfriend_modal_title">Hey there!</p>
      <p className="unfriend_modal_details">
        Thinking of removing {frienModalInfo.name}? We just want to make sure
        you're sure about it.
      </p>
      <div className="d-flex justify-content-between mt-4">
        <button
          onClick={handleCancel}
          className="unfriend_modal_btn unfriend_modal_cancel_btn"
          title="Cancel"
        >
          Cancel
        </button>
        <button
          onClick={() => handleUnfriend(frienModalInfo._id)}
          className="unfriend_modal_btn unfriend_modal_delete_btn"
          title="Unfriend"
        >
          Unfriend
        </button>
      </div>
    </div>
  );
}

export default UnfriendModal;
