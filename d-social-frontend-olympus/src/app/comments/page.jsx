"use client";
import React, { useState } from "react";
import Comment from "@/component/Comment/Comment";
import authImage from "../../../public/img/author-page.jpg";

const page = () => {
  // const [replyMode, setReplyMode] = useState(false);
  // const [replyText, setReplyText] = useState("Woow, amazing");
  // const [replyRepMode, setReplyRepMode] = useState(false);
  // const [replyRepText, setReplyRepText] = useState("No It's Not");
  // const [replyRepRepMode, setReplyRepRepMode] = useState(false);
  // const [replyRepRepText, setReplyRepRepText] = useState("Sometimes yes");

  // const handleToggleReply = () => {
  //   setReplyMode(!replyMode);
  // };

  // const handleReplyInputChange = (event) => {
  //   setReplyText(event.target.value);
  // };

  // const handleReplySubmit = (event) => {
  //   if (event.key === "Enter") {
  //     // If Enter key is pressed, save the reply and exit reply mode
  //     setReplyMode(false);
  //   }
  // };

  // const handleToggleReplyRep = () => {
  //   setReplyRepMode(!replyRepMode);
  // };

  // const handleReplyInputChangeRep = (event) => {
  //   setReplyRepText(event.target.value);
  // };

  // const handleReplySubmitRep = (event) => {
  //   if (event.key === "Enter") {
  //     // If Enter key is pressed, save the reply and exit reply mode
  //     setReplyRepMode(false);
  //   }
  // };

  // const handleToggleReplyRepRep = () => {
  //   setReplyRepRepMode(!replyRepRepMode);
  // };

  // const handleReplyInputChangeRepRep = (event) => {
  //   setReplyRepRepText(event.target.value);
  // };

  // const handleReplySubmitRepRep = (event) => {
  //   if (event.key === "Enter") {
  //     // If Enter key is pressed, save the reply and exit reply mode
  //     setReplyRepRepMode(false);
  //   }
  // };

  return (
    <Comment />
  );
};

export default page;
