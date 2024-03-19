import React from "react";
import loveImage from "./loveImage.svg";
import Image from "next/image";

export default function LoveSvg() {
   return (
      <div>
         <Image src={loveImage} alt="love_icon" />
      </div>
   );
}
