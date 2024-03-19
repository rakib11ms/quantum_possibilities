"use client";

import React, { useEffect, useRef, useState } from "react";
import GlobSvg from "./svg/GlobSvg";
import ThreeDotSvg from "./svg/threeDotSvg";
import CrossSvg from "./svg/CrossSvg";
import "./PostHeader.modules.css";
import { host } from "@/environment";
import DemoAvater from "./demo_profile.jpg";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../utils";
import { useDeleteSinglePostMutation, useEditPostMutation } from "@/redux/features/NewsFeed/newsFeedApi";
import useUserInfo from "@/hooks/useUserInfo";
import useOutsideClick from "@/hooks/useOutsideClick";
import DeleteModal from "@/component/DeleteModal";
import Modal from "react-modal";
import { customStyles } from "../../../../../../utils/customeStyle";
import toast from "react-hot-toast";
import ProfileTextField from "@/app/newsfeed/_ui/ProfileTextField";
import LocationModal from "@/app/newsfeed/_ui/LocationModal";
import TagPeopleModal from "@/app/newsfeed/_ui/TagPeopleModal";
import GifUploadModal from "@/app/newsfeed/_ui/GifUploadModal";
import EventModal from "@/app/newsfeed/_ui/EventModal";
import FeelingsModal from "@/app/newsfeed/_ui/FeelingsModal";
import { addPostData, addPostDataInfo, insertPostData, localPostInfo, localPostInfos, setLocalPostInfo } from "@/redux/features/NewsFeed/newsFeedSlice";
import { useDispatch } from "react-redux";
import { Dialog, Radio } from "@mui/material";
import TextFieldModalContentProfile from "@/app/newsfeed/_ui/TextFieldModalContentProfile";
import PostReportModal from "@/app/newsfeed/_ui/PostReportModal";
import CrossIcon from "@/app/newsfeed/_ui/Icons/CrossIcon";

export default function PostHeader({ user, isCrossIcon, createdAt, postInformation, postState, setPostState }) {
   const [deleteSinglePost, { isSuccess }] = useDeleteSinglePostMutation();
   const [editPost, { isSuccess: isEditSuccess }] = useEditPostMutation();
   const loggedUserInfo = useUserInfo();
   const [modalOpen, setModalOpen] = useState(false);

   const [isActionModalOpen, setIsActionModalOpen] = useState({
      delete: false,
      report: false,
   });

   const [isOpenModal, setIsOpenModal] = useState({
      post: true,
      tag: false,
      event: false,
      gif: false,
      location: false,
      photoUpload: false,
   });

   const ref = useRef(null);

   const dispatch = useDispatch();
   const [fullName, setFullName] = useState(null);
   const [profilePicture, setProfilePicture] = useState(null);
   //  section post Edit
   // Add this state variable at the top of your component
   const [editPostContent, setEditPostContent] = useState("");
   console.log("editPostContent__", editPostContent);
   useOutsideClick(ref, () => {
      setPostState((prev) => ({
         sharedPost: {
            isPostAction: false,
         },
      }));
   });
   useEffect(() => {
      if (localStorage.getItem("userInfo") != undefined) {
         const localStorageFullName = localStorage.getItem("fullname");
         const userImage = JSON.parse(localStorage.getItem("userInfo"));
         if (userImage) {
            setProfilePicture(userImage[0].profile_pic);
         }

         if (localStorageFullName) {
            setFullName(localStorageFullName);
         }
      }
   }, []);

   return (
      <div className="main__postHeader__wrapper">
         {/* Action Dropdown list */}
         <div className="right__profile__area">
            <div className="profile_pic">
               {postInformation?.page_info?._id != null ? (
                  postInformation?.page_info?.profile_pic != null ? (
                     <Link href={`/pagePublicView/${postInformation?.page_info?.page_user_name}`}>
                        <img src={`${host}/uploads/pages/${postInformation?.page_info?.profile_pic}`} className="avatar" />
                     </Link>
                  ) : (
                     <Image src={DemoAvater} alt="avater" />
                  )
               ) : user?.profile_pic != null ? (
                  <Link href={`${user?.username}/timeline`}>
                     <img src={`${host}/uploads/${user?.profile_pic}`} className="avatar" />
                  </Link>
               ) : (
                  <Image src={DemoAvater} alt="avater" />
               )}
            </div>

            <div className="name_time_wrapper">
               <div
                  style={{
                     fontWeight: "600",
                     display: "flex",
                     flexWrap: "wrap",
                     columnGap: "5px",
                     alignItems: "center",
                  }}
               >
                  {postInformation?.page_info?._id != null ? (
                     <Link href={`/pagePublicView/${postInformation?.page_info?.page_user_name}`}>
                        <p>{postInformation?.page_info?.page_name}</p>
                     </Link>
                  ) : postInformation?.to_user?._id ? (
                     <div
                        style={{
                           display: "flex",
                           justifyContent: "space-between",
                           gap: 4,
                        }}
                     >
                        <Link href={`${user?.username}/timeline`}>
                           <p>
                              {user?.first_name} {user?.last_name}
                           </p>
                        </Link>

                        <div>
                           <span>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path
                                    d="M5.68328 9.36656L5.80279 9.60557C6.02224 10.0445 6.13197 10.2639 6.13197 10.5C6.13197 10.7361 6.02224 10.9555 5.80279 11.3944L5.68328 11.6334C4.57397 13.8521 4.01931 14.9614 4.52896 15.471C5.03861 15.9807 6.14793 15.426 8.36656 14.3167L12.4223 12.2889C13.9834 11.5083 14.7639 11.118 14.7639 10.5C14.7639 9.88197 13.9834 9.49169 12.4223 8.71115L8.36656 6.68328C6.14793 5.57397 5.03861 5.01931 4.52896 5.52896C4.01931 6.03861 4.57397 7.14793 5.68328 9.36656Z"
                                    fill="#333333"
                                    stroke="#333333"
                                 />
                              </svg>
                           </span>
                        </div>
                        <Link href={`${postInformation?.to_user?.username}/timeline`}>
                           <p>
                              {postInformation?.to_user?.first_name} {postInformation?.to_user?.last_name}
                           </p>
                        </Link>
                     </div>
                  ) : (
                     <Link href={`${user?.username}/timeline`}>
                        <p>
                           {user?.first_name} {user?.last_name}
                        </p>
                     </Link>
                  )}
                  <div
                     style={{
                        fontWeight: "600",
                        display: "flex",
                        flexWrap: "wrap",
                        columnGap: "5px",
                        alignItems: "center",
                     }}
                  >
                     {postInformation?.feelings && (
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "start",
                              alignItems: "center",
                              columnGap: "4px",
                           }}
                        >
                           <p>... is feelings</p>
                           <img
                              style={{
                                 width: "15px",
                              }}
                              src={`${host}/assets/logo/${postInformation?.feelings?.logo}`}
                              alt="feelings_icon"
                           />
                           <p> {postInformation?.feelings?.feeling_name}!</p>
                        </div>
                     )}

                     {postInformation?.location && <p>at {postInformation?.location?.location_name} </p>}
                  </div>
               </div>

               <div className="time__glob">
                  <span>{formatDate(createdAt)}</span>
                  <span className="point"></span>

                  {postInformation?.post_type == "campaign" ? (
                     <>
                        <div className="tas_campaign_item_sponsors_container">
                           <p className="tas_campaign_item_sponsors">Sponsored</p>
                           <GlobSvg />
                        </div>
                     </>
                  ) : (
                     <GlobSvg />
                  )}
               </div>
            </div>
         </div>

         {/* Wrapper for post action */}

         <div
            ref={ref}
            style={{
               position: "relative",
            }}
         >
            <div
               onClick={() =>
                  setPostState((prev) => ({
                     sharedPost: {
                        post_id: postInformation.post_id,
                        isPostAction: !prev?.sharedPost.isPostAction,
                     },
                  }))
               }
            >
               <ThreeDotSvg />
            </div>
            {postState?.sharedPost?.post_id === postInformation?.post_id && postState?.sharedPost?.isPostAction === true && (
               <div
                  style={{
                     position: "absolute",
                     top: "25px",
                     right: 0,
                     backgroundColor: "white",
                     width: "100px",
                     padding: "5px",
                     zIndex: "400",
                     borderRadius: "8px",
                     boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  className="button__Comment__action"
               >
                  <p
                     onClick={() => setIsActionModalOpen({ report: true })}
                     style={{
                        cursor: "pointer",
                        paddingBottom: "10px",
                     }}
                  >
                     Report
                  </p>
                  {/* {loggedUserInfo?.userInfo?._id === postInformation?.user?._id && (
                        <p
                           onClick={() => {
                              setOpen(true);
                              setPostState((prev) => ({
                                 sharedPost: {
                                    isPostAction: false,
                                 },
                              }));
                           }}
                           style={{
                              cursor: "pointer",
                              paddingBottom: "10px",
                           }}
                        >
                           Delete
                        </p>
                     )} */}
                  {loggedUserInfo?.userInfo?._id === postInformation?.user?._id && postInformation.post_type !== "campaign" && (
                     <>
                        <p
                           onClick={() => {
                              setEditPostContent(postInformation);
                              dispatch(insertPostData({
                                 ...postInformation,
                                 location_id: postInformation?.location?._id,
                                 feeling_id: postInformation?.feelings?._id
                              }))
                              dispatch(setLocalPostInfo({
                                 location: postInformation?.location?.location_name,
                                 feelings: postInformation?.feelings?.feeling_name,
                                 feelings_icon: postInformation?.feelings?.logo,
                              }));
                              setModalOpen(true);
                              setIsOpenModal({ post: true });
                           }}
                           style={{
                              cursor: "pointer",
                              paddingBottom: "10px",
                           }}
                        >
                           Edit
                        </p>
                        <p
                           onClick={() => {
                              setIsActionModalOpen({ delete: true });
                              setPostState((prev) => ({
                                 sharedPost: {
                                    isPostAction: false,
                                 },
                              }));
                           }}
                           style={{
                              cursor: "pointer",
                              paddingBottom: "10px",
                           }}
                        >
                           Delete
                        </p>
                     </>
                  )}
               </div>
            )}
         </div>
         {isCrossIcon && (
            <div>
               <CrossIcon
                  onClick={() => {
                     window.location.href = "/newsfeed";
                  }}
                  height={30}
                  width={30}
               />
            </div>
         )}
         {/* Delete post Modal  */}
         <Modal style={customStyles} isOpen={isActionModalOpen?.delete}>
            <div
               style={{
                  maxWidth: "450px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  alignItems: "end",
                  gap: "14px",
               }}
            >
               <p
                  style={{
                     fontSize: "16px",
                     fontWeight: "400",
                     color: "#000000",
                     marginBottom: "10px",
                  }}
               >
                  If you delete the this post. it will be gone forever.
                  <span
                     style={{
                        fontWeight: "500",
                     }}
                  >
                     Are you sure want to delete it?
                  </span>
               </p>
               <div>
                  <button
                     onClick={() => setIsActionModalOpen({ delete: false })}
                     style={{
                        border: "none",
                        marginRight: "10px",
                        padding: "7px 14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                        color: "#000000",
                     }}
                  >
                     Close
                  </button>
                  <button
                     onClick={() => {
                        deleteSinglePost({ postId: postInformation.post_id });
                        setIsActionModalOpen({ delete: false });
                     }}
                     style={{
                        backgroundColor: "red",
                        border: "none",
                        padding: "7px 14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                        color: "#FFFFFF",
                     }}
                  >
                     Agree
                  </button>
               </div>
            </div>
         </Modal>

         {/* Report post Modal  */}
         <Dialog
            fullWidth
            maxWidth="sm"
            open={isActionModalOpen?.report}
            onClose={() => {
               setIsActionModalOpen({ delete: false });
               // setIsOpenModal({ event: false, post: false });
               // dispatch(insertPostData({ ...addPostDataInfo }));
               // dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
         >
            <PostReportModal setIsActionModalOpen={setIsActionModalOpen} post_id={postInformation?.post_id} />
         </Dialog>

         {modalOpen && (
            <>
               {/* Post Edit Modal */}
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
                        postData={editPostContent}
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
               {/* EventModal */}
               <Dialog
                  fullWidth
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
            </>
         )}
      </div>
   );
}
