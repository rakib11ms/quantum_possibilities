import React from "react";
import { FacebookShareButton } from "react-share";

export default function FacebookShare({ url, title }) {
   return (
      <FacebookShareButton url={url} quote={title}>
         <p className="custom-facebook-button">Facebook</p>
      </FacebookShareButton>
   );
}
