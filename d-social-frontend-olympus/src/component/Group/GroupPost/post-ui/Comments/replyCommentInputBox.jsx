"use client";
import {replyCommentFormData, setReplyCommentFormData} from "@/redux/features/GroupPost/groupCommentSlice";
import { useReplySaveGroupCommentMutation } from "@/redux/features/GroupPost/groupPostApi";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ImojiAction from "./svg/ImojiAction";
import CameraIconSvg from "./svg/CameraIconSvg";
import GitIconSvg from "./svg/GitIconSvg";
import ActionAbleImageSvg from "./svg/ActionAbleImageSvg";

export default function ReplyCommentReplyInputBox({userInfo, setReplyView, comment, postInformation}) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const replyCommentData = useSelector(replyCommentFormData);

  const handleInputChange = (event, postId, commentId) => {
    setInputValue(event.target.value);
    // console.log("ggggggggg__",{
    //     comment_id: commentId,
    //     replies_user_id: userInfo?._id,
    //     replies_comment_name: inputValue,
    //     post_id: postId,
    //   })
    dispatch(
      setReplyCommentFormData({
        comment_id: commentId,
        replies_user_id: userInfo?._id,
        replies_comment_name: inputValue,
        post_id: postId,
      })
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
  const [replySaveComment, { data, isLoading, error }] = useReplySaveGroupCommentMutation();

  const handleSubmit = async () => {
    // console.log("replyCommentData__", replyCommentData)
    await replySaveComment(replyCommentData);
    setReplyView(false);
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
        }}
        value={inputValue}
        onChange={(e) => {
          handleInputChange(e, postInformation.post_id, comment);
        }}
        onInput={handleTextareaResize}
        onKeyDown={handleEnterPress}
        name="photo_status"
        id="photo_status"
        placeholder="Write your comment here"
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
