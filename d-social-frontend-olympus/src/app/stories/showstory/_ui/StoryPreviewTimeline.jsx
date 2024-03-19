"use client";

import React, { useEffect, useState } from "react";
import useStories from "../_ui/hooks/useStories";

export default function StoryPreviewTimeline({ width }) {
   return (
      <div
         style={{
            height: "3px",
            width: "100%",
            background: "white",
            marginBottom: "10px",
         }}
      >
         <div
            style={{
               height: "3px",
               width: `${width}%`,
               background: "#307777",
               marginBottom: "10px",
            }}
         ></div>
      </div>
   );
}
