"use client";

import React, { useEffect, useState } from "react";
import "./postDetailsNotification.modules.css";
import PhotoDetailsComment from "@/component/NewsFeed/Post/post-ui/PostDetailsPreview/PhotoDetailsComment";
import useAxiosGet from "@/hooks/useAxiosGet";
import { useParams } from "next/navigation";
import PhotoSliderPreview from "@/component/NewsFeed/Post/post-ui/PostDetailsPreview/PhotoSliderPreview";
import Loader from "@/component/Loader/Loading";
import ColorPost from "@/component/NewsFeed/Post/post-ui/photo/ColorPost";
import CrossIcon from "@/app/newsfeed/_ui/Icons/CrossIcon";

export default function NotificationPostDetails() {
   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
   const [postState, setPostState] = useState({
      sharedPost: {
         post_id: null,
         isShared: false,
         isPostModalOpen: false,
         isReactionDetailOpen: false,
         comment_id: null,
         isCommentReactionDetailsOpen: false,
         isCommentDelete: false,
         isPostAction: false,
      },
   });
   const [label, setLabel] = useState("");
   const { postId } = useParams();
   console.log("Notification, response", postId);

   const [response, getResponseData, responseLoader, setResponse, error] = useAxiosGet();
   const [post, setPost] = useState({});

   const getSinglePostInfoById = () => {
      getResponseData(`/api/view-single-main-post-with-comments/${postId}`, (res) => {
         console.log("Notification, response", res);
         setPost(res?.post[0]);
      });
   };

   useEffect(() => {
      getSinglePostInfoById();
   }, []);
   console.log("postpostpostpost", post);
   const postInformation = {
      description: post?.description || "",
      link: post?.link || "",
      link_title: post?.link_title || "",
      link_description: post?.link_description || "",
      post_background_color: post?.post_background_color || "",
      link_image: post?.link_image || "",
      media: post?.media || [],
      profile_pic: post?.user_id?.profile_pic || "",
      createdAt: post?.createdAt || "",
      reactionCount: post?.reactionCount || "",
      totalComments: post?.totalComments || "",
      postShareCount: post?.postShareCount || "",
      comments: post?.comments || "",
      user: post?.user_id || "",
      post_id: post?._id || "",
      reactionInfo: post?.reactionTypeCountsByPost || "",
      feelings: post?.feeling_id || "",
      location: post?.location_id || "",
      page_info: post?.page_id || null || "",
      event_type: post?.event_type || "",
      event_sub_type: post?.event_sub_type || "",
      createdAt: post?.createdAt || "",
      work_place: post?.workplace_id || "",
      post_type: post?.post_type || "",
      share_reels: post?.share_reels_id || "",
      to_user: post?.to_user_id || "",
   };

   let PostComponent = <div></div>;

   if (postInformation.post_background_color != "") {
      PostComponent = <ColorPost postInformation={postInformation} />;
   } else {
      PostComponent = <PhotoSliderPreview postInformation={postInformation} selectedImageIndex={selectedImageIndex} />;
   }
   return (
      <div className="notification__post__wrapper">
         {PostComponent}
         <div
            style={{
               padding: "20px 20px",
            }}
         >
            <PhotoDetailsComment
               getSinglePostInfoById={getSinglePostInfoById}
               postInformation={postInformation}
               postState={postState}
               setPostState={setPostState}
               setLabel={setLabel}
               label={label}
               isCrossIcon
            />
         </div>
      </div>
   );
}
