import React from "react";
import "./PostDetailsPreview.modules.css";
import PhotoSliderPreview from "./PhotoSliderPreview";
import PhotoDetailsComment from "./PhotoDetailsComment";

export default function PostDetailsPreview({
  postInformation,
  label,
  setLabel,
  setPostState,
  postState,
  selectedImageIndex,
}) {
  return (
    <div className="post_details_container">
      <div className="post_details_wrapper">
        <PhotoSliderPreview postInformation={postInformation} selectedImageIndex={selectedImageIndex} />
        <div
          style={{
            padding: "20px 0px",
          }}
        >
          <PhotoDetailsComment
            postInformation={postInformation}
            postState={postState}
            setPostState={setPostState}
            setLabel={setLabel}
            label={label}
          />
        </div>
      </div>
    </div>
  );
}
