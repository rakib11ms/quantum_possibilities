import React from "react";
import "./PostDetailsPreview.modules.css";
import PhotoSliderPreview from "./PhotoSliderPreview";
import PhotoDetailsComment from "./PhotoDetailsComment";

export default function PostDetailsPreview({ postInformation, setPostState, postState, label, setLabel, setIsPostDetailsModalOpen, isPostDetailsModalOpen, selectedImageIndex }) {
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
                  setPostState={setPostState}
                  postState={postState}
                  postInformation={postInformation}
                  isPostDetailsModalOpen={isPostDetailsModalOpen}
                  setIsPostDetailsModalOpen={setIsPostDetailsModalOpen}
                  setLabel={setLabel}
                  label={label}
               />
            </div>
         </div>
      </div>
   );
}
