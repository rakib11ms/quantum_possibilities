"use client";

import React, { useRef, useState } from "react";
import "./Reply.modules.css";
import ViewMoreReplySvg from "./svg/ViewMoreReplySvg";
import LikeSvg from "./svg/LikeSvg";
import LoveSvg from "./svg/LoveSvg";
import Image from "next/image";
import { host } from "@/environment";
import ReplyCommentReplyInputBox from "./replyCommentInputBox";
import { CommentTimeFormat, handleMouseEnter, handleMouseLeave, handleTouchEnd, handleTouchStart } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import LikeHoverGif from "../like-share-action/LikeHoverGif";
import { useSaveReactionByCommentMutation } from "@/redux/features/Reaction/reactionApi";
import PostThumbanail from "../photo/PostThumbanail";
import { renderStringWithLink } from "@/redux/utils";
import Modal from "react-modal";
import { customStyles } from "../../../../../../utils/customeStyle";
import CommentReactionDetailsPreview from "./CommentReactionDetailsPreview";
import ThreeDotssvg from "./svg/threeDotsvg";
import { useDeleteMasterCommentMutation } from "@/redux/features/NewsFeed/newsFeedApi";
import useUserInfo from "@/hooks/useUserInfo";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function Reply({ comment, getSinglePostInfoById, mainComment, userInfo, postInformation, setPostState, postState }) {
   const [replyView, setReplyView] = useState(false);
   const [isReplyView, setIsReplyView] = useState(false);
   const dispatch = useDispatch();
   const isHovered = useSelector((state) => state.reaction.reactionState[comment._id]?.isHovered || false);
   const logedInUserInfo = localStorage.getItem("userInfo");
   const logedUser = JSON.parse(logedInUserInfo);
   const loggedUserInfo = useUserInfo();

   const ref = useRef(null);

   useOutsideClick(ref, () => {
      setPostState((prev) => ({
         sharedPost: {
            isCommentDelete: false,
         },
      }));
   });

   const { comment_reactions, comment_name, createdAt, image_or_video, post_id, user_id, _id, replies_comment_reactions } = comment;

   const [saveReactionByComment, { data, isLoading }] = useSaveReactionByCommentMutation();
   const [deleteMasterComment, { isLoading: deleteLoding }] = useDeleteMasterCommentMutation();

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

      if (getSinglePostInfoById) {
         getSinglePostInfoById();
      }
   };

   const isCommentAvailable = comment?.comment_reactions?.length > 0 || comment?.replies_comment_reactions?.length > 0;

   const handleClickOperation = async (type, reaction) => {
      switch (type) {
         case "delete":
            deleteMasterComment({
               comment_id: _id || mainComment?._id,
            });
            setPostState((prev) => ({
               sharedPost: {
                  isCommentDelete: false,
               },
            }));
            break;
         case "toggleDelete":
            setPostState((prev) => ({
               sharedPost: {
                  comment_id: _id || mainComment?._id,
                  isCommentDelete: !prev?.sharedPost?.isCommentDelete,
               },
            }));
            break;
         case "openReactionDetails":
            setPostState((prev) => ({
               sharedPost: {
                  comment_id: _id || mainComment?._id,
                  isCommentReactionDetailsOpen: true,
               },
            }));
            break;
         default:
            break;
      }
   };
   return (
      <div>
         <div className="reply__wrapper">
            <div className="profile_pic">
               <Image src={`${host}/uploads/${userInfo?.profile_pic}`} width={500} height={500} loading="lazy" />
            </div>

            <div
               style={{
                  width: "100%",
               }}
               className="text__wrapper"
            >
               <div className="comment__full">
                  <div className="comment__name__wrapper">
                     <div style={{ width: "100%" }} className="comment_name">
                        <p className="name">
                           {userInfo?.first_name} {userInfo?.last_name}
                        </p>
                        <div>
                           <p className="actual__comment" dangerouslySetInnerHTML={renderStringWithLink(comment?.comment_name || comment?.replies_comment_name || "")}></p>

                           {image_or_video && (
                              <img
                                 style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "contain",
                                 }}
                                 src={`${host}/${image_or_video}`}
                                 alt="comment-image"
                              />
                           )}
                        </div>

                        {comment.link_image != null && comment.link_image != "" && <PostThumbanail postInformation={comment} />}
                     </div>

                     {/*  */}
                     {loggedUserInfo?.userInfo?._id === user_id?._id && (
                        <div
                           style={{
                              position: "relative",
                           }}
                        >
                           <div
                              //   onClick={(e) => {
                              //     e.stopPropagation();
                              //     setPostState((prev) => ({
                              //       sharedPost: {
                              //         comment_id: _id || mainComment?._id,
                              //         isCommentDelete: !prev?.sharedPost?.isCommentDelete,
                              //       },
                              //     }));
                              //   }}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 handleClickOperation("toggleDelete");
                              }}
                           >
                              <ThreeDotssvg />
                           </div>

                           {postState?.sharedPost.comment_id === _id && postState?.sharedPost.isCommentDelete === true ? (
                              <>
                                 <div
                                    ref={ref}
                                    style={{
                                       position: "absolute",
                                       top: "25px",
                                       right: 0,
                                       backgroundColor: "white",
                                       width: "100px",
                                       padding: "5px",
                                       zIndex: "400",
                                       borderRadius: "8px",
                                       boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                                    }}
                                    className="button__Comment__action"
                                 >
                                    <button
                                       type="button"
                                       //   onClick={(event) => {
                                       //     event.stopPropagation();
                                       //     deleteMasterComment({
                                       //       comment_id: _id || mainComment?._id,
                                       //     });
                                       //     setPostState((prev) => ({
                                       //       sharedPost: {
                                       //         isCommentDelete: false,
                                       //       },
                                       //     }));
                                       //   }}
                                       onClick={(event) => {
                                          event.stopPropagation();
                                          handleClickOperation("delete");
                                       }}
                                    >
                                       Delete
                                    </button>
                                 </div>
                              </>
                           ) : null}
                        </div>
                     )}
                  </div>

                  {/* Reaction Count */}
                  {isCommentAvailable && (
                     <button
                        //  type="button"
                        //  onClick={(e) => {
                        //    e.stopPropagation();
                        //    setPostState((prev) => ({
                        //      sharedPost: {
                        //        comment_id: _id || mainComment?._id,
                        //        isCommentReactionDetailsOpen: true,
                        //      },
                        //    }));
                        //  }}
                        type="button"
                        onClick={() => handleClickOperation("openReactionDetails")}
                        className="reaction__count__wrapper"
                     >
                        <div className="reaction__Comment__Svg">
                           {/* <LikeSvg /> */}
                           <LoveSvg />
                        </div>
                        <p>
                           {comment?.replies_comment_reactions?.length} {comment?.comment_reactions?.length}
                        </p>
                     </button>
                  )}

                  {/* Comment Reaction Modal Open */}
                  {postState?.sharedPost.comment_id === _id && postState?.sharedPost.isCommentReactionDetailsOpen === true ? (
                     <>
                        <Modal
                           isOpen={postState?.sharedPost.isCommentReactionDetailsOpen}
                           onRequestClose={() =>
                              setPostState((prev) => ({
                                 sharedPost: {
                                    comment_id: null,
                                    isCommentReactionDetailsOpen: !prev?.sharedPost.isCommentReactionDetailsOpen,
                                 },
                              }))
                           }
                           style={customStyles}
                           ariaHideApp={false}
                        >
                           <CommentReactionDetailsPreview post_id={postInformation?.post_id} comment_id={mainComment?._id} comment_replies_id={_id} />
                        </Modal>
                     </>
                  ) : null}
               </div>

               {/*  */}
               <div className="Like__reply">
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
                        <p onClick={() => handleClick("saveReaction")}>Like</p>
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
                        setPostState={setPostState}
                        postState={postState}
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
               <ReplyCommentReplyInputBox comment={mainComment?._id} userInfo={userInfo} postInformation={postInformation} setReplyView={setReplyView} />
            </div>
         )}
      </div>
   );
}
