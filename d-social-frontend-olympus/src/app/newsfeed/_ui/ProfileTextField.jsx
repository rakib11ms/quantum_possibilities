"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../../../../utils/customeStyle";
import LocationModal from "./LocationModal";
import TagPeopleModal from "./TagPeopleModal";
import GifUploadModal from "./GifUploadModal";
import EventModal from "./EventModal";
import { useDispatch, useSelector } from "react-redux";
import { addPostData, addPostDataInfo, insertPostData, localPostInfo, localPostInfos, setLocalPostInfo } from "@/redux/features/NewsFeed/newsFeedSlice";
import { host } from "@/environment";
import FeelingsModal from "./FeelingsModal";
import { Dialog } from "@mui/material";
import TextFieldModalContentProfile from "./TextFieldModalContentProfile";

export default function ProfileTextField({ isOpenModal, setIsOpenModal }) {
   const [fullName, setFullName] = useState(null);
   const [profilePicture, setProfilePicture] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
   const dispatch = useDispatch();
   useEffect(() => {
      if (localStorage.getItem("userInfo") != undefined) {
         const localStorageFullName = localStorage.getItem("fullname");
         const userImage = JSON.parse(localStorage.getItem("userInfo"));
         if (userImage) {
            setProfilePicture(userImage[0]?.profile_pic);
         }

         if (localStorageFullName) {
            setFullName(localStorageFullName);
         }
      }
   }, []);
   console.log("isOpenModal____", isOpenModal);
   return (
      <div>
         <div className="padding__wrapper profile__textArea">
            <div className="profile__picture">
               {profilePicture !== null ? (
                  <img alt="author" src={`${host}/uploads/${profilePicture}`} className="avatar " />
               ) : (
                  <img
                     src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                     className="bi bi-wallet2 olymp-explore-icon left-menu-icon"
                     style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
               )}
            </div>
            <div
               onClick={() => {
                  setIsOpenModal((pre) => ({
                     ...pre,
                     post: true,
                  }));
               }}
               className="input__box"
            >
               <input type="text" placeholder={`What’s on your mind, ${fullName}?`} />
            </div>
         </div>

         {/* Post Modal */}
         <Modal
            isOpen={isOpenModal?.post}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.post && (
               <TextFieldModalContentProfile
                  setIsOpenModal={setIsOpenModal}
                  isOpenModal={isOpenModal}
                  fullName={fullName}
                  profilePicture={profilePicture}
                  setModalOpen={setModalOpen}
               />
            )}
         </Modal>

         {/* Location Modal */}
         <Modal
            isOpen={isOpenModal?.location}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.location && <LocationModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Tag People Modal */}
         <Modal
            isOpen={isOpenModal?.tag}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.tag && <TagPeopleModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Gif Post Modal */}
         <Modal
            isOpen={isOpenModal?.gif}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.gif && <GifUploadModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Event Modal */}
         {/* <Modal
        isOpen={isOpenModal?.event}
        onRequestClose={() => {
          setIsOpenModal({location: false});
          dispatch(insertPostData({...addPostDataInfo}));
          dispatch(setLocalPostInfo({...localPostInfo}));
        }}
        style={customStyles}
      >
        {isOpenModal?.event && <EventModal setIsOpenModal={setIsOpenModal} />}
      </Modal> */}
         <Dialog
            fullWidth
            // maxWidth='md'
            maxWidth="sm"
            open={isOpenModal?.event}
            onClose={() => {
               setIsOpenModal({ event: false, post: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
         >
            {isOpenModal?.event && <EventModal setIsOpenModal={setIsOpenModal} />}
         </Dialog>

         {/* Feeling Modal */}
         <Modal
            isOpen={isOpenModal?.feeling}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.feeling && <FeelingsModal setIsOpenModal={setIsOpenModal} />}
         </Modal>
      </div>
   );
}
