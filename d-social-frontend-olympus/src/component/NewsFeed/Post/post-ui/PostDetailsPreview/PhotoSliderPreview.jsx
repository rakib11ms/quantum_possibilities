import React from "react";
import ImageSlider from "./ImagePreviewSlider";

export default function PhotoSliderPreview({ postInformation, selectedImageIndex }) {
   return <ImageSlider images={postInformation?.media} selectedImageIndex={selectedImageIndex} />;
}
