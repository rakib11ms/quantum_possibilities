"use client";

import React, {useState} from "react";
import Modal from "react-modal";
import "./PostPhoto.modules.css";
import PostThumbanail from "./PostThumbanail";
import {renderStringWithLink} from "@/redux/utils";
import ColorPost from "./ColorPost";
import {customStyles} from "../../../../../../utils/customeStyle";
import PostDetailsPreview from "../PostDetailsPreview/PostDetailsPreview";
import PostPhotoOnly from "./PostPhotoOnly";

export default function PostPhoto({
   postInformation,
   setPostState,
   postState,
   label,
   setLabel,
   setSelectedImageIndex,
   selectedImageIndex,
}) {
   return (
      <div className="post__main__wrapper">
         {postInformation.post_background_color == "" && postInformation.description && (
            <div className="description">
               <p dangerouslySetInnerHTML={renderStringWithLink(postInformation.description)} />
            </div>
         )}

         {postInformation.post_background_color != "" && <ColorPost postInformation={postInformation} />}

         {postInformation.link_image != null && postInformation.link_image != "" && (
            <PostThumbanail postInformation={postInformation} />
         )}

         {/* Photo Show */}

         <PostPhotoOnly
            postInformation={postInformation}
            setPostState={setPostState}
            setSelectedImageIndex={setSelectedImageIndex}
         />

         <Modal
            isOpen={postState?.sharedPost.isPostModalOpen}
            onRequestClose={() => setPostState((pre) => {})}
            style={customStyles}
         >
            {/* PostDetailsPreview Modal */}
            <PostDetailsPreview
               postInformation={postInformation}
               postState={postState}
               setPostState={setPostState}
               setLabel={setLabel}
               label={label}
               selectedImageIndex={selectedImageIndex}
            />
         </Modal>
      </div>
   );
}
