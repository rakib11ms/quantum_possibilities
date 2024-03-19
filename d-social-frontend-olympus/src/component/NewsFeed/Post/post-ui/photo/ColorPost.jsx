import { renderStringWithLink } from "@/redux/utils";
import React from "react";

export default function ColorPost({ postInformation }) {
   return (
      <div
         className="color-description"
         style={{
            backgroundColor: `#${postInformation.post_background_color}`,
            display: "flex",
            height: "450px",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <p
            style={{
               color: postInformation.post_background_color == "FFFFFF" ? "#000000" : "#FFFFFF",
            }}
            dangerouslySetInnerHTML={renderStringWithLink(postInformation.description)}
         />
      </div>
   );
}
