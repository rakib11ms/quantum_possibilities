"use client";

import { host } from "@/environment";
import React from "react";

export default function LikeHoverGif({ handleClick }) {
  return (
    <div>
      <figure
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: "6px",
          backgroundColor: "#ffffff",
          padding: "2px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        className="reaction-comment-icons"
      >
        <img
          style={{
            width: "40px",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => handleClick("like")}
          src={`${host}/assets/reactions/like.gif`}
          alt="Like emoji"
        />
        <img
          style={{
            width: "40px",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => handleClick("love")}
          src={`${host}/assets/reactions/love.gif`}
          alt="Love emoji"
        />
        <img
          style={{
            width: "40px",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => handleClick("haha")}
          src={`${host}/assets/reactions/haha.gif`}
          alt="Haha emoji"
        />
        <img
          style={{
            width: "40px",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => handleClick("wow")}
          src={`${host}/assets/reactions/wow.gif`}
          alt="Wow emoji"
        />
        <img
          style={{
            width: "40px",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => handleClick("sad")}
          src={`${host}/assets/reactions/sad.gif`}
          alt="Sad emoji"
        />
        <img
          style={{
            width: "40px",
            cursor: "pointer",
            display: "block",
          }}
          onClick={() => handleClick("angry")}
          src={`${host}/assets/reactions/angry.gif`}
          alt="Angry emoji"
        />
      </figure>
    </div>
  );
}
