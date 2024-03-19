"use client";

import React, { useEffect, useState } from "react";
import "./Comment.modules.css";
import Reply from "./Reply";
import { host } from "@/environment";
import Image from "next/image";
import CommentReplyInputBox from "./CommentReplyInput";

export default function Comment({ postInformation, getSinglePostInfoById, label, postState, setPostState }) {
   const [showComments, setShowComments] = useState([]);
   useEffect(() => {
      if (postInformation?.comments?.length > 0) {
         setShowComments(postInformation?.comments?.slice(0, 2));
      }
   }, [postInformation]);

   const handleViewAllComment = (e, comments) => {
      e.preventDefault();
      setShowComments(comments?.slice(0, comments.length));
   };
   const lessCommentViewHandler = (e, comments) => {
      e.preventDefault();

      setShowComments(comments?.slice(0, 2));
   };

   return (
      <div className="comment__wrapper">
         {showComments.length === 0 ? null : showComments.length === 2 ? (
            <button className="view__more__comments__button" onClick={(e) => handleViewAllComment(e, postInformation.comments)}>
               View more comments
            </button>
         ) : showComments.length > 2 ? (
            <button className="view__more__comments__button" onClick={(e) => lessCommentViewHandler(e, postInformation.comments)}>
               Less comments
            </button>
         ) : null}

         <div
            style={{
               maxHeight: showComments.length > 2 ? "auto" : "480px",
               overflow: "auto",
            }}
         >
            {showComments.map((comment, index) => (
               <Reply
                  getSinglePostInfoById={getSinglePostInfoById}
                  key={index}
                  comment={comment}
                  mainComment={comment}
                  userInfo={comment?.user_id}
                  postInformation={postInformation}
                  setPostState={setPostState}
                  postState={postState}
               />
            ))}
         </div>
         <div
            style={{
               marginTop: "10px",
            }}
            className="main__reply"
         >
            <div className="profile_pic">
               <Image src={`${host}/uploads/${postInformation?.profile_pic}`} width={500} height={500} loading="lazy" />
            </div>
            <CommentReplyInputBox getSinglePostInfoById={getSinglePostInfoById} postInformation={postInformation} label={label} />
         </div>
      </div>
   );
}
