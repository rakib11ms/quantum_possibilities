"use client";

import React, { useState } from "react";
// import "./PostWrapper.modules.css";
import "../[username]/page.modules.css";
import Divider from "@/component/Divider";
import PostHeader from "@/component/NewsFeed/Post/post-ui/headers/PostHeader";
import SharedPostModal from "@/component/NewsFeed/Post/post-ui/sharedPostModal/SharedPostModal";
import LikeShareAction from "@/component/NewsFeed/Post/post-ui/like-share-action/LikeShareAction";
import Comment from "@/component/NewsFeed/Post/post-ui/Comments/Comment";
import PostPhoto from "@/component/NewsFeed/Post/post-ui/photo/PostPhoto";
import PagePostHeader from "./PagePostHeader";

export default function PagePostWrapper({ post }) {
  console.log("post.post_type", post.post_type === "Shared");
  const [label, setLabel] = useState("");
  const [postState, setPostState] = useState({
    sharedPost: {
      post_id: null,
      isShared: false,
      isPostModalOpen: false,
      isReactionDetailOpen: false,
    },
  });

  console.log("postState_____", postState);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const postInformation = {
    description: post?.description || "",
    link: post?.link || "",
    link_title: post?.link_title || "",
    link_description: post?.link_description || "",
    post_background_color: post?.post_background_color || "",
    link_image: post?.link_image || "",
    media: post?.media || [],
    profile_pic: post?.user_id?.profile_pic,
    createdAt: post?.createdAt,
    reactionCount: post?.reactionCount,
    totalComments: post?.totalComments,
    postShareCount: post?.postShareCount,
    comments: post?.comments,
    user: post?.user_id,
    post_id: post?._id,
    reactionInfo: post?.reactionTypeCountsByPost,
    feelings: post?.feeling_id,
    location: post?.location_id,
  };

  return (
    <div className="post__wrapper">
      <div className="wrapper">
        <PagePostHeader
          user={post?.page_id}
          createdAt={postInformation.createdAt}
          postInformation={postInformation}
        />
      </div>
      <div>
        {post.post_type === "Shared" ? (
          <>
            <SharedPostModal
              post={post}
              postInformation={postInformation}
              setPostState={setPostState}
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
            />

            <div className="like_wrapper">
              <LikeShareAction
                postInformation={postInformation}
                setLabel={setLabel}
                label={label}
                setPostState={setPostState}
                postState={postState}
              />
            </div>

            <Divider />

            <div className="like_wrapper">
              <Comment
                postInformation={postInformation}
                setLabel={setLabel}
                label={label}
              />
            </div>
          </>
        ) : (
          <>
            <PostPhoto
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
              postInformation={postInformation}
              postState={postState}
              setPostState={setPostState}
              setLabel={setLabel}
              label={label}
            />
            <div className="like_wrapper">
              <LikeShareAction
                postInformation={postInformation}
                setLabel={setLabel}
                label={label}
                setPostState={setPostState}
                postState={postState}
              />
            </div>

            <Divider />

            <div className="like_wrapper">
              <Comment
                postInformation={postInformation}
                setLabel={setLabel}
                label={label}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
