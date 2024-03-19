import React from "react";
import ImageSlider from "./ImagePreviewSlider";

export default function PhotoSliderPreview({ postInformation, selectedImageIndex }) {
   console.log("postInformation", postInformation);

   return <ImageSlider images={postInformation?.media} selectedImageIndex={selectedImageIndex} />;
}
