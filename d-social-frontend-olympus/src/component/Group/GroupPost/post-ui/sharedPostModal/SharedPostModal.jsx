"use client";
import React, {useEffect, useState} from "react";
import "./SharedPostModal.modules.css";
import CrossIconSvg from "@/app/newsfeed/_svg-components/CrossIconSvg";
import Divider from "@/component/Divider";
import {host} from "@/environment";
import PostPhotoOnly from "../photo/PostPhotoOnly";
import useUserInfo from "@/hooks/useUserInfo";
import { useShareGroupPostWithCaptionMutation } from "@/redux/features/GroupPost/groupPostApi";
import toast from "react-hot-toast";

export default function SharedPostModal({postInformation, setPostState}) {
   const {userInfo} = useUserInfo();
   const {first_name, last_name, profile_pic, createdAt, cover_pic} = postInformation.user;

   const [sharePostData, setSharePostData] = useState({
      user_id: "",
      share_post_id: postInformation?.post_id,
      description: "",
      privacy: "public",
   });

   useEffect(() => {
      if (userInfo) {
         setSharePostData({
            ...sharePostData,
            user_id: userInfo?._id,
         });
      }
   }, [userInfo]);

   const [sharePostWithCaption, { data, isSuccess, isLoading, error }] = useShareGroupPostWithCaptionMutation();

   console.log("Data___After__share", sharePostData);
   if (isSuccess) {
      toast.success("Successfully shared!");
      setPostState((pre) => {
         return {
            sharedPost: {
               post_id: null,
               isShared: false,
            },
         };
      });
   }

   return (
      <div
         style={{
            minWidth: "549px",
            padding: "10px",
         }}
      >
         <div className="top__create__post__cross">
            <p></p>
            <p>Shared Post</p>
            <div
               style={{
                  cursor: "pointer",
               }}
               onClick={() =>
                  setPostState((prev) => ({
                     sharedPost: {
                        post_id: postInformation.post_id,
                        isShared: false,
                     },
                  }))
               }
            >
               <CrossIconSvg />
            </div>
         </div>

         <Divider />

         <div className="profile__picture__name__wrapper">
            <img src={`${host}/uploads/${userInfo?.profile_pic}`} className="avatar" />
            {/* <div>
               <p>{userInfo?.first_name + " " + userInfo?.last_name}</p>
               <select
                  onChange={(e) =>
                     setSharePostData({
                        ...sharePostData,
                        post_privacy: e.target.value,
                     })
                  }
                  className="select__option__wrapper"
                  name="post_privacy"
               >
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="only-me">Only me</option>
               </select>
            </div> */}
         </div>

         <textarea
            onChange={(e) =>
               setSharePostData({
                  ...sharePostData,
                  description: e.target.value,
               })
            }
            className="text-area"
            name="description"
            id=""
            type="text"
            aria-autocomplete="off"
            autoCapitalize="off"
            placeholder={`What's on your mind, ${userInfo?.first_name}?`}
         />

         <div
            style={{
               width: "100%",
               maxHeight: "50vh",
               overflowY: "auto",
               margin: "auto",
               border: "0.5px solid rgba(112, 112, 112, 0.50)",
               borderRadius: "8px",
            }}
         >
            {postInformation?.media.length > 0 ? (
               <div
                  style={{
                     maxWidth: "40vw",
                     height: "auto",
                  }}
               >
                  <PostPhotoOnly
                     postInformation={postInformation}
                     setPostState={setPostState}
                     //  setSelectedImageIndex={setSelectedImageIndex}
                  />
               </div>
            ) : null}

            <Divider />

            <div
               style={{
                  padding: "10px",
               }}
               className="profile__picture__name__wrapper"
            >
               <img src={`${host}/uploads/${profile_pic}`} className="avatar" />
               {/* <div>
                  <p>{first_name + " " + last_name}</p>
                  <select disabled className="select__option__wrapper" name="status" id="status">
                     <option value="public">Public</option>
                     <option value="friends">Friends</option>
                     <option value="only-me">Only me</option>
                  </select>
               </div> */}
            </div>
            <div
               style={{
                  padding: "10px",
               }}
            >
               <p className="shared_description">{postInformation?.description}</p>
            </div>
         </div>

         <button
            onClick={() => {
               sharePostWithCaption(sharePostData);
            }}
            className="share__post__button"
         >
            Share Post
         </button>
      </div>
   );
}
