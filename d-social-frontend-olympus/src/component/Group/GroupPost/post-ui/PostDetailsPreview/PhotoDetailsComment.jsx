import React from "react";
import PostHeader from "../headers/PostHeader";
import ThreDotPostDetails from "./svg/threDotPostDetails";
import LikeShareAction from "../like-share-action/LikeShareAction";
import Divider from "@/component/Divider";
import Comment from "../Comments/Comment";

export default function PhotoDetailsComment({postInformation, label, setLabel, setPostState, postState}) {
  return (
    <div className="photo_details_comment">
      <div className="wrapper">
        <PostHeader user={postInformation?.user} createdAt={postInformation.createdAt} />
        {/* <ThreDotPostDetails /> */}
      </div>

      <div className="like_wrapper">
        <LikeShareAction
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
        <Comment postInformation={postInformation} setLabel={setLabel} label={label} />
      </div>
    </div>
  );
}
