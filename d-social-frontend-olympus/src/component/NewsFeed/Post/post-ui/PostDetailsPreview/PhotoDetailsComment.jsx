import React from "react";
import PostHeader from "../headers/PostHeader";
import ThreDotPostDetails from "./svg/threDotPostDetails";
import LikeShareAction from "../like-share-action/LikeShareAction";
import Divider from "@/component/Divider";
import Comment from "../Comments/Comment";

export default function PhotoDetailsComment({ postInformation, isCrossIcon, getSinglePostInfoById, label, setLabel, setPostState, postState }) {
   return (
      <div className="photo_details_comment">
         <div className="wrapper">
            <PostHeader
               isCrossIcon
               user={postInformation?.user}
               postInformation={postInformation}
               createdAt={postInformation.createdAt}
               setPostState={setPostState}
               postState={postState}
            />
         </div>

         <div className="like_wrapper">
            <LikeShareAction
               getSinglePostInfoById={getSinglePostInfoById}
               postInformation={postInformation}
               setLabel={setLabel}
               label={label}
               setPostState={setPostState}
               postState={postState}
               isBorder
            />
         </div>
         <Divider />

         <div className="like_wrapper">
            <Comment
               getSinglePostInfoById={getSinglePostInfoById}
               postInformation={postInformation}
               postState={postState}
               setPostState={setPostState}
               setLabel={setLabel}
               label={label}
            />
         </div>
      </div>
   );
}
