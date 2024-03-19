"use client";

import React, { useEffect, useState } from "react";
import "./PostWrapper.modules.css";
import PostHeader from "./post-ui/headers/PostHeader";
import PostPhoto from "./post-ui/photo/PostPhoto";
import LikeShareAction from "./post-ui/like-share-action/LikeShareAction";
import Divider from "@/component/Divider";
import Comment from "./post-ui/Comments/Comment";
import SharedPost from "./post-ui/sharedPost/SharedPost";
import CampaignCarousel from "@/app/newsfeed/CampaignCarousel";
import axiosInstance from "../../../../utils/axios";

export default function PostWrapper({ post }) {
   const [label, setLabel] = useState("");
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
      page_info: post?.page_id || null,
      event_type: post?.event_type,
      event_sub_type: post?.event_sub_type,
      createdAt: post?.createdAt,
      work_place: post?.workplace_id,
      post_type: post.post_type,
      share_reels: post?.share_reels_id,
      to_user: post?.to_user_id,
      campaign_id: post?.campaign_id,
   };

   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   const user_id = userInfo[0]?._id;

   const handleOnClickCampaignReached = () => {
      console.log(post, "post__");
      axiosInstance
         .post(`/api/campaign/save-campaign-performance`, {
            campaign_id: post?.campaign_id,
            campaign_name: post?.link_description,
            campaign_location: post?.location_id,
            is_impressed: false,
            is_reached: false,
            is_clicked: true,
            user_id: user_id,
            created_by: user_id,
            createdAt: new Date(),
         })
         .then((response) => {
            console.log(response.data);
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <div className="post__wrapper">
         <div className="wrapper">
            <PostHeader user={post?.user_id} createdAt={postInformation.createdAt} postInformation={postInformation} setPostState={setPostState} postState={postState} />
         </div>
         <div>
            {post.post_type === "Shared" ? (
               <>
                  <SharedPost
                     post={post}
                     postInformation={postInformation}
                     setPostState={setPostState}
                     selectedImageIndex={selectedImageIndex}
                     setSelectedImageIndex={setSelectedImageIndex}
                  />

                  <div className="like_wrapper">
                     <LikeShareAction postInformation={postInformation} setLabel={setLabel} label={label} setPostState={setPostState} postState={postState} />
                  </div>

                  <Divider />

                  <div className="like_wrapper">
                     <Comment postInformation={postInformation} setLabel={setLabel} label={label} />
                  </div>
               </>
            ) : (
               <>
                  {post.post_type !== "campaign" ? (
                     <PostPhoto
                        selectedImageIndex={selectedImageIndex}
                        setSelectedImageIndex={setSelectedImageIndex}
                        postInformation={postInformation}
                        postState={postState}
                        setPostState={setPostState}
                        setLabel={setLabel}
                        label={label}
                     />
                  ) : (
                     <CampaignCarousel postInformation={postInformation} />
                  )}
                  {post.post_type === "campaign" && (
                     <div className="tas_campaign_item_container_bottom" onClick={handleOnClickCampaignReached}>
                        <div>
                           <p className="tas_campaign_item_container_bottom_website">
                              {post.link && post.link.length > 30 ? post.link.slice(0, 30) + "..." : post.link || "www.example.com"}
                           </p>
                           <p className="tas_campaign_item_container_bottom_heading">
                              {post.link_description && post.link_description.length > 20 ? post.link_description.slice(0, 20) + "..." : post.link_description}
                           </p>
                        </div>
                        <button
                           className="tas_campaign_item_container_bottom_button"
                           onClick={() => {
                              let websiteUrl = post?.link;
                              if (!websiteUrl.includes("http")) {
                                 websiteUrl = "http://" + websiteUrl;
                              }
                              if (websiteUrl) {
                                 window.open(websiteUrl, "_blank");
                              } else {
                                 console.error("Website URL is not available.");
                              }
                           }}
                        >
                           {post?.link_title}
                        </button>
                     </div>
                  )}
                  <div className="like_wrapper">
                     <LikeShareAction postInformation={postInformation} setLabel={setLabel} label={label} setPostState={setPostState} postState={postState} />
                  </div>
                  <Divider />
                  <div className="like_wrapper">
                     <Comment postInformation={postInformation} setLabel={setLabel} label={label} setPostState={setPostState} postState={postState} />
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
