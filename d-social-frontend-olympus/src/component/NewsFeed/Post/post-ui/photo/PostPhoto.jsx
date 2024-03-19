"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import "./PostPhoto.modules.css";
import PostThumbanail from "./PostThumbanail";
import { renderStringWithLink } from "@/redux/utils";
import ColorPost from "./ColorPost";
import { customStyles } from "../../../../../../utils/customeStyle";
import PostDetailsPreview from "../PostDetailsPreview/PostDetailsPreview";
import PostPhotoOnly from "./PostPhotoOnly";
import { BirthdayPost, EventPost, ReelsPost } from "./VariousPost";

export default function PostPhoto({ postInformation, setPostState, postState, label, setLabel, setSelectedImageIndex, selectedImageIndex }) {
   const [isPostDetailsModalOpen, setIsPostDetailsModalOpen] = useState({
      postDetailsModalOpen: false,
      post_id: null,
   });

   // Initialize state to manage description visibility
   const [descriptionVisibility, setDescriptionVisibility] = useState({});

   // Function to toggle description visibility for a specific postId
   const toggleDescription = (postId) => {
      setDescriptionVisibility((prevState) => ({
         ...prevState,
         [postId]: !prevState[postId], // Toggle visibility for the given postId
      }));
   };

   // Rendering the description
   let renderedDescription;

   if (postInformation.description) {
      if (postInformation.description.length > 350) {
         renderedDescription = (
            <div>
               {descriptionVisibility[postInformation.post_id] ? postInformation.description : `${postInformation.description.substring(0, 350)}... `}
               <span style={{ color: "blue", cursor: "pointer" }} onClick={() => toggleDescription(postInformation.post_id)}>
                  {descriptionVisibility[postInformation.post_id] ? "show less" : "show more"}
               </span>
            </div>
         );
      } else {
         renderedDescription = <div>{postInformation.description}</div>;
      }
   }

   return (
      <div className="post__main__wrapper">
         {postInformation.post_background_color == "" && !postInformation?.to_user?._id && postInformation.description && (
            <div className="description">
               <p>{renderedDescription}</p>
            </div>
         )}

         {postInformation.post_background_color != "" && <ColorPost postInformation={postInformation} />}

         {postInformation.link_image != null && postInformation.link_image != "" && <PostThumbanail postInformation={postInformation} />}
         {postInformation?.event_type && <EventPost postInformation={postInformation} />}
         {postInformation?.post_type == "shared_reels" && <ReelsPost postInformation={postInformation} />}
         {postInformation?.post_type == "birthday" && <BirthdayPost postInformation={postInformation} />}

         <PostPhotoOnly postInformation={postInformation} setIsPostDetailsModalOpen={setIsPostDetailsModalOpen} setSelectedImageIndex={setSelectedImageIndex} />

         <Modal
            isOpen={isPostDetailsModalOpen?.postDetailsModalOpen}
            onRequestClose={() =>
               setIsPostDetailsModalOpen({
                  postDetailsModalOpen: false,
                  post_id: null,
               })
            }
            style={customStyles}
         >
            {/* PostDetailsPreview Modal */}
            <PostDetailsPreview
               postInformation={postInformation}
               isPostDetailsModalOpen={isPostDetailsModalOpen}
               setIsPostDetailsModalOpen={setIsPostDetailsModalOpen}
               setLabel={setLabel}
               label={label}
               selectedImageIndex={selectedImageIndex}
               setPostState={setPostState}
               postState={postState}
            />
         </Modal>
      </div>
   );
}
