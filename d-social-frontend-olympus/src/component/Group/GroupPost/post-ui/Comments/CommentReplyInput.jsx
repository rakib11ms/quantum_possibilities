"use client";
import {commentFormData, setCommentFormData} from "@/redux/features/GroupPost/groupCommentSlice";
import { useSaveGroupCommentMutation } from "@/redux/features/GroupPost/groupPostApi";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./Comment.modules.css";
import ImojiAction from "./svg/ImojiAction";
import CameraIconSvg from "./svg/CameraIconSvg";
import GitIconSvg from "./svg/GitIconSvg";
import ActionAbleImageSvg from "./svg/ActionAbleImageSvg";

export default function CommentReplyInputBox({postInformation, label}) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const commentData = useSelector(commentFormData);

  const handleInputChange = (event, postId) => {
    setInputValue(event.target.value);
    dispatch(
      setCommentFormData({comment_name: event.target.value, user_id: postInformation.user._id, post_id: postId})
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
    }
  };
  const [saveComment, { data, isLoading, error }] = useSaveGroupCommentMutation();

  const handleSubmit = async () => {
    await saveComment(commentData);
    console.log("commentData__", commentData);

    setInputValue("");
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <textarea
        style={{
          width: "100%",
          minHeight: "5px",
          resize: "none",
          backgroundColor: "#F0F2F5",
          padding: "2px 10px",
          borderRadius: "8px",
          paddingTop: "10px",
          whiteSpace: "nowrap",
        }}
        value={inputValue}
        onChange={(e) => {
          handleInputChange(e, postInformation.post_id);
        }}
        onInput={handleTextareaResize}
        onKeyDown={handleEnterPress}
        name="photo_status"
        id={label}
        placeholder="Write your comment"
      />
      <div className="input__action__media">
        <ImojiAction className={"each_button"} />
        <CameraIconSvg className={"each_button"} />
        <GitIconSvg className={"each_button"} />
        <ActionAbleImageSvg className={"each_button"} />
      </div>
    </div>
  );
}
