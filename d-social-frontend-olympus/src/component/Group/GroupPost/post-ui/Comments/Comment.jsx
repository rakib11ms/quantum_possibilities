"use client";

import React, {useEffect, useState} from "react";
import "./Comment.modules.css";
import Reply from "./Reply";
import {host} from "@/environment";
import Image from "next/image";
import CommentReplyInputBox from "./CommentReplyInput";

export default function Comment({postInformation, label, setLabel}) {
  const [showComments, setShowComments] = useState([]);
  useEffect(() => {
    if (postInformation?.comments?.length > 0) {
      setShowComments(postInformation?.comments?.slice(0, 2));
    }
  }, [postInformation]);

  const handleViewAllComment = (comments) => {
    setShowComments(comments?.slice(0, 9));
  };

  return (
    <div className="comment__wrapper">
      {postInformation.comments.length > 0 && (
        <button onClick={() => handleViewAllComment(postInformation.comments)}>View more comments</button>
      )}
      <div
        style={{
          height: showComments.length > 2 ? "450px" : "auto",
          overflow: "auto",
        }}
      >
        {
        showComments.map((comment, index) => (
          <Reply
            key={index}
            comment={comment}
            mainComment={comment}
            userInfo={comment?.user_id}
            postInformation={postInformation}
          />
        ))
        }
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
        <CommentReplyInputBox postInformation={postInformation} label={label} />
      </div>
    </div>
  );
}
