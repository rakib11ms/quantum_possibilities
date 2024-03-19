"use client";

import React, { useState } from "react";
import "./Reply.modules.css";
import ViewMoreReplySvg from "./svg/ViewMoreReplySvg";
import LikeSvg from "./svg/LikeSvg";
import LoveSvg from "./svg/LoveSvg";
import Image from "next/image";
import { host } from "@/environment";
import ReplyCommentReplyInputBox from "./replyCommentInputBox";
import { handleMouseEnter, handleMouseLeave, handleTouchEnd, handleTouchStart } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import LikeHoverGif from "../like-share-action/LikeHoverGif";
import { useSaveGroupReactionByCommentMutation } from "@/redux/features/GroupPost/groupReactionApi";
import PostThumbanail from "../photo/PostThumbanail";
import { renderStringWithLink } from "@/redux/utils";
import { CommentTimeFormat } from "@/component/NewsFeed/Post/utils";

export default function Reply({ comment, mainComment, userInfo, postInformation }) {
   const [replyView, setReplyView] = useState(false);
   const [isReplyView, setIsReplyView] = useState(false);
   const dispatch = useDispatch();
   const isHovered = useSelector((state) => state.reaction.reactionState[comment._id]?.isHovered || false);
   const logedInUserInfo = localStorage.getItem("userInfo");
   const logedUser = JSON.parse(logedInUserInfo);

   // console.log("comment__", comment);
   const {
      comment_reactions,
      comment_name,
      createdAt,
      image_or_video,
      post_id,
      user_id,
      _id,
      replies_comment_reactions,
   } = comment;

   const [saveReactionByComment, { data, isLoading }] = useSaveGroupReactionByCommentMutation();

   const handleClick = async (reaction) => {
      if (mainComment?._id == comment?._id) {
         await saveReactionByComment({
            reaction_type: reaction,
            user_id: logedUser[0]?._id,
            post_id: postInformation?.post_id,
            comment_id: mainComment?._id,
            //  comment_replies_id: nuul,
         });
      } else {
         await saveReactionByComment({
            reaction_type: reaction,
            user_id: logedUser[0]?._id,
            post_id: postInformation?.post_id,
            comment_id: mainComment?._id,
            comment_replies_id: comment?._id,
         });
      }
   };

   const isCommentAvailable = comment?.comment_reactions?.length > 0 || comment?.replies_comment_reactions?.length > 0;

   return (
      <div>
         <div className="reply__wrapper">
            <div className="profile_pic">
               <Image src={`${host}/uploads/${userInfo?.profile_pic}`} width={500} height={500} loading="lazy" />
            </div>


            <div style={{ width: "100%", }} className="text__wrapper">
               <div className="comment__full">
                  <div className="comment__name__wrapper">
                     <div style={{ width: "100%" }} className="comment_name">
                        <p className="name">
                           {userInfo?.first_name} {userInfo?.last_name}
                        </p>
                        <p
                           className="actual__comment"
                           dangerouslySetInnerHTML={renderStringWithLink(
                              comment?.comment_name || comment?.replies_comment_name
                           )}
                        ></p>

                        {comment?.link_image != null && comment?.link_image != "" && (
                           <PostThumbanail postInformation={comment} />
                        )}
                     </div>
                     {/* <ThreeDotssvg /> */}
                  </div>

                  {/* Reaction Count */}
                  {isCommentAvailable && (
                     <div className="reaction__count__wrapper">
                        <div className="reaction__Comment__Svg">
                           <LikeSvg />
                           <LoveSvg />
                        </div>
                        <p>
                           {comment?.replies_comment_reactions?.length} {comment?.comment_reactions?.length}
                        </p>
                     </div>
                  )}
               </div>


               <div className="Like__reply">
                  {/* vejal */}
                  <div
                     style={{
                        position: "relative",
                     }}
                     className="time__like__reply"
                  >
                     <CommentTimeFormat timestamp={comment?.createdAt} />

                     <div
                        style={{
                           padding: "4px 10px",
                        }}
                        onMouseEnter={() => handleMouseEnter(comment._id, dispatch)}
                        onMouseLeave={() => handleMouseLeave(comment._id, dispatch)}
                        onTouchStart={() => handleTouchStart(comment._id, dispatch)}
                        onTouchEnd={() => handleTouchEnd(comment._id, dispatch)}
                     >
                        <p onClick={() => handleClick("like")}>Like</p>
                        {isHovered && (
                           <div
                              style={{
                                 position: "absolute",
                                 top: "-40px",
                                 left: "25px",
                              }}
                           >
                              <LikeHoverGif handleClick={handleClick} />
                           </div>
                        )}
                     </div>

                     <label
                        style={{
                           cursor: "pointer",
                           padding: "0px",
                           margin: "0px",
                        }}
                     >
                        <p
                           onClick={() => {
                              setReplyView(!replyView);
                              setIsReplyView(true);
                           }}
                        >
                           Reply
                        </p>
                     </label>
                  </div>

                  {comment?.replies?.length > 0 && (
                     <div onClick={() => setIsReplyView(!isReplyView)} className="view__more__reply">
                        <ViewMoreReplySvg />
                        {isReplyView ? (
                           <p>Hide comments</p>
                        ) : (
                           <p>
                              View <span> {comment?.replies?.length} </span> replay
                           </p>
                        )}
                     </div>
                  )}
               </div>
            </div>

         </div>

         {isReplyView &&
            comment?.replies?.map((reply) => {
               return (
                  <div
                     style={{
                        marginLeft: "50px",
                     }}
                  >
                     <Reply
                        comment={reply}
                        mainComment={mainComment}
                        userInfo={reply?.replies_user_id}
                        postInformation={postInformation}
                     />
                  </div>
               );
            })}

         {replyView && (
            <div
               style={{
                  marginLeft: "60px",
                  backgroundColor: "#F0F2F5",
                  borderRadius: "8px",
                  marginTop: "10px",
               }}
            >
               <ReplyCommentReplyInputBox
                  comment={mainComment?._id}
                  userInfo={userInfo}
                  postInformation={postInformation}
                  setReplyView={setReplyView}
               />
            </div>
         )}
      </div>
   );
}
