"use client";

import { commentFormData, setCommentFormData } from "@/redux/features/NewsFeed/commentSlice";
import { useSaveCommentMutation } from "@/redux/features/NewsFeed/newsFeedApi";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Comment.modules.css";
import ImojiAction from "./svg/ImojiAction";
import CameraIconSvg from "./svg/CameraIconSvg";
import CrossSvg from "../headers/svg/CrossSvg";
import EmojiPicker from "emoji-picker-react";
import useOutsideClick from "@/hooks/useOutsideClick";
import CommentReplyButton from "./svg/CommentReplyButton";

export default function CommentReplyInputBox({ postInformation, getSinglePostInfoById, label }) {
   const [inputValue, setInputValue] = useState("");
   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   const dispatch = useDispatch();
   const commentData = useSelector(commentFormData);

   const ref = useRef(null);

   useOutsideClick(ref, () => {
      setShowEmojiPicker(false);
   });

   const handleInputChange = (event, postId) => {
      setInputValue(event.target.value);
      dispatch(
         setCommentFormData({
            comment_name: event.target.value,
            user_id: postInformation.user._id,
            post_id: postId,
         }),
      );
   };

   const handleTextareaResize = (event) => {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
   };

   const handleEnterPress = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
         event.preventDefault();
         handleSubmit();
         setShowEmojiPicker(false);
      }
      if (getSinglePostInfoById) {
         getSinglePostInfoById();
      }
   };
   const handleCommentButtonClick = (event) => {
      handleSubmit();
      setShowEmojiPicker(false);

      if (getSinglePostInfoById) {
         getSinglePostInfoById();
      }
   };

   const [saveComment, { data, isLoading, error }] = useSaveCommentMutation();

   const handleSubmit = async () => {
      await saveComment(commentData);

      setInputValue("");
      setInputImageValue([]);
      dispatch(
         setCommentFormData({
            user_id: "" || null,
            post_id: "" || null,
            comment_name: "" || null,
            image_or_video: "" || null,
            link: "" || null,
            link_title: "" || null,
            link_description: "" || null,
            link_image: "" || null,
         }),
      );
   };

   const fileInputRef = useRef(null);
   const [inputImageValue, setInputImageValue] = useState("");

   const onImageChange = (event, postId) => {
      event.preventDefault();

      setInputImageValue(event.target.files[0]);

      dispatch(
         setCommentFormData({
            image_or_video: event.target.files[0],
            user_id: postInformation.user._id,
            post_id: postId,
         }),
      );
   };
   return (
      <div
         style={{
            width: "100%",
            position: "relative",
         }}
      >
         <div
            style={{
               width: "100%",
               minHeight: "5px",
               resize: "none",
               backgroundColor: "#F0F2F5",
               padding: "2px 10px",
               borderRadius: "8px",
               // paddingTop: "10px",
            }}
            onInput={handleTextareaResize}
            onKeyDown={handleEnterPress}
         >
            {inputImageValue && (
               <>
                  <div>
                     {inputImageValue?.type?.startsWith("image/") ? (
                        <div
                           style={{
                              backgroundColor: "white",
                              width: "fit-content",
                              position: "relative",
                              padding: "5px",
                              borderRadius: "10px",
                           }}
                        >
                           <div
                              onClick={() => {
                                 setInputImageValue("");
                                 dispatch(
                                    setCommentFormData({
                                       image_or_video: null,
                                    }),
                                 );
                              }}
                           >
                              <CrossSvg />
                           </div>

                           <img
                              style={{
                                 width: "100px",
                                 height: "auto",
                                 objectFit: "contain",
                              }}
                              src={URL.createObjectURL(inputImageValue)}
                              alt="upload-image"
                           />
                        </div>
                     ) : inputImageValue?.type?.startsWith("video/") ? (
                        // <video width="200" height="200" controls>
                        <video
                           style={{
                              width: "100px",
                              height: "auto",
                           }}
                           controls
                        >
                           <source src={URL.createObjectURL(inputImageValue)} type={"video"} />
                           Your browser does not support the video tag.
                        </video>
                     ) : null}
                  </div>
               </>
            )}

            <div>
               <textarea
                  style={{
                     backgroundColor: "#F0F2F5",
                  }}
                  value={inputValue}
                  onChange={(e) => {
                     handleInputChange(e, postInformation.post_id);
                  }}
                  id={label}
                  placeholder="Write your comment"
               />

               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     width: "100%",
                  }}
                  className=""
               >
                  <div
                     style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                     }}
                  >
                     <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={(e) => {
                           onImageChange(e, postInformation.post_id);
                        }}
                        accept="image/*"
                        style={{ display: "none" }}
                     />

                     <div ref={ref}>
                        <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                           <ImojiAction className={"each_button"} />
                        </div>
                        {showEmojiPicker && (
                           <EmojiPicker
                              emojiStyle="facebook"
                              searchPlaceHolder=""
                              searchDisabled={true}
                              previewConfig={{ showPreview: false }}
                              onEmojiClick={(e) => {
                                 setInputValue((prevMessage) => prevMessage + e.emoji);
                              }}
                              width={280}
                              height={300}
                              style={{
                                 boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                 "--epr-emoji-size": "20px",
                                 zIndex: "200",
                              }}
                           />
                        )}
                     </div>

                     <div onClick={(e) => fileInputRef.current.click()}>
                        <CameraIconSvg className={"each_button"} />
                     </div>
                     {/* <GitIconSvg className={"each_button"} />
        <ActionAbleImageSvg className={"each_button"} /> */}
                  </div>
                  <button type="button" onClick={handleCommentButtonClick}>
                     <CommentReplyButton />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
