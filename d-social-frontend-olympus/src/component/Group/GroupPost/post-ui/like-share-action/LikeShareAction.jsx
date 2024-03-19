import React, { useState } from "react";
import "./LikeShareAction.modules.css";
import CommentSvg from "./svg/CommentSvg";
import ShareSvg from "./svg/ShareSvg";
import LikeHoverGif from "./LikeHoverGif";
import { useDispatch, useSelector } from "react-redux";
import { handleMouseEnter, handleMouseLeave, handleTouchEnd, handleTouchStart } from "../../utils";
import { useSaveGroupReactionMutation } from "@/redux/features/GroupPost/groupReactionApi";
import { LoveSvg } from "./emoji-icons/LoveSvg";
import { HahaSvg } from "./emoji-icons/HahaSvg";
import { WowSvg } from "./emoji-icons/WowSvg";
import { SadSvg } from "./emoji-icons/SadSvg";
import { LikeSvg } from "./emoji-icons/LikeSvg";
import { AngrySvg } from "./emoji-icons/AngrySvg";
import { reactionTypeToComponent } from "./utils";
import Modal from "react-modal";
import SharedPostModal from "../sharedPostModal/SharedPostModal";
import { customStyles } from "../../../../../../utils/customeStyle";
import Divider from "@/component/Divider";
import ReactionModal from "@/app/[username]/about/_ui/ReactionModal";
import PostReactionPreview from "./PostReactionPreview";

export default function LikeShareAction({
   postInformation,
   setLabel,
   label,
   setPostState,
   postState,
   isBorder,
}) {
   const dispatch = useDispatch();
   const isHovered = useSelector(
      (state) => state.reaction.reactionState[postInformation.post_id]?.isHovered || false
   );

   const logedInUserInfo = localStorage.getItem("userInfo");
   const logedUser = JSON.parse(logedInUserInfo);
   const [saveReaction, { data, isLoading }] = useSaveGroupReactionMutation();

   const handleClick = async (reaction) => {
      await saveReaction({
         reaction_type: reaction,
         user_id: logedUser[0]?._id,
         post_id: postInformation.post_id,
         post_single_item_id: null,
      });
   };

   return (
      <div className="like__comment_action_wrapper">
         <div className="action__wrapper">
            <div
               onClick={() =>
                  setPostState((prev) => ({
                     sharedPost: {
                        post_id: postInformation.post_id,
                        isReactionDetailOpen: !prev?.sharedPost.isReactionDetailOpen,
                     },
                  }))
               }
               className="reaction__count"
            >
               {/* When Anyone giving any reaction render Emoji here */}
               {postInformation?.reactionInfo && postInformation?.reactionInfo?.slice(0, 2)?.map((each) => {
                  if (each?.reaction_type === "love") {
                     return <LoveSvg />;
                  }
                  if (each?.reaction_type === "haha") {
                     return <HahaSvg />;
                  }
                  if (each?.reaction_type === "wow") {
                     return <WowSvg />;
                  }
                  if (each?.reaction_type === "sad") {
                     return <SadSvg />;
                  }
                  if (each?.reaction_type === "like") {
                     return <LikeSvg />;
                  }
                  if (each?.reaction_type === "angry") {
                     return <AngrySvg />;
                  }
               })}
               <p>{postInformation.reactionCount}</p>
            </div>

            {/* Modal for showing who  */}

            {postState?.sharedPost.post_id === postInformation.post_id &&
            postState?.sharedPost.isReactionDetailOpen === true ? (
               <>
                  <Modal
                     isOpen={postState?.sharedPost.isReactionDetailOpen}
                     onRequestClose={() =>
                        setPostState((prev) => ({
                           sharedPost: {
                              post_id: null,
                              isReactionDetailOpen: !prev?.sharedPost.isReactionDetailOpen,
                           },
                        }))
                     }
                     style={customStyles}
                     ariaHideApp={false}
                  >
                     <PostReactionPreview postInformation={postInformation} />
                  </Modal>
               </>
            ) : null}

            {/* Left side */}
            <div className="share__comment_count__wrapper">
               <div className="count__icons">
                  <p>{postInformation?.totalComments}</p>
                  <CommentSvg />
               </div>
               <div className="count__icons">
                  <p>{postInformation?.postShareCount}</p>
                  <ShareSvg />
               </div>
            </div>
         </div>

         {/* Bottom Like comment Share button */}
         {isBorder && <Divider />}
         <div className="like_share_comment">
            <div
               style={{
                  position: "relative",
                  width: "content-fit",
               }}
               onMouseEnter={() => handleMouseEnter(postInformation.post_id, dispatch)}
               onMouseLeave={() => handleMouseLeave(postInformation.post_id, dispatch)}
               onTouchStart={() => handleTouchStart(postInformation.post_id, dispatch)}
               onTouchEnd={() => handleTouchEnd(postInformation.post_id, dispatch)}
               className="Thamsup_like bg-effect"
            >
               <div
                  onClick={() => handleClick("like")}
                  style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     gap: "6px",
                  }}
               >
                  {postInformation.reactionInfo?.length > 0 ? (
                     postInformation.reactionInfo.slice(0, 1).map((each) => {
                        const reactionMapping = reactionTypeToComponent[each?.reaction_type];

                        if (reactionMapping) {
                           const { component: ReactionComponent, textClass } = reactionMapping;

                           return (
                              <div
                                 style={{
                                    padding: "5px 20px 0px 0px",
                                 }}
                                 className="reaction__wrapper reaction__text__color__love"
                              >
                                 {ReactionComponent}
                                 <p
                                    style={{
                                       textTransform: "capitalize",
                                    }}
                                 >
                                    {each.reaction_type}
                                 </p>
                              </div>
                           );
                        }

                        return (
                           <div
                              style={{
                                 padding: "5px 20px 0px 0px",
                              }}
                              className="reaction__wrapper reaction__text__color__love"
                           >
                              <LikeSvg />
                              <p>Like</p>
                           </div>
                        );
                     })
                  ) : (
                     <div
                        style={{
                           padding: "5px 20px 0px 0px",
                        }}
                        className="reaction__wrapper reaction__text__color__love"
                     >
                        <LikeSvg />
                        <p>Like</p>
                     </div>
                  )}
               </div>

               {isHovered && (
                  <div
                     style={{
                        position: "absolute",
                        top: "-40px",
                        left: 0,
                     }}
                  >
                     <LikeHoverGif handleClick={handleClick} />
                  </div>
               )}
            </div>
            <div>
               <label
                  style={{
                     cursor: "pointer",
                     padding: "0px",
                     margin: "0px",
                  }}
                  htmlFor={label}
               >
                  <div onClick={() => setLabel(postInformation.post_id)} className="bg-effect">
                     <p>Comment</p>
                  </div>
               </label>
            </div>

            <div
               style={{
                  cursor: "pointer",
               }}
               onClick={() =>
                  setPostState((prev) => ({
                     sharedPost: {
                        post_id: postInformation.post_id,
                        isShared: !prev?.sharedPost.isShared,
                     },
                  }))
               }
               className="bg-effect"
            >
               <p>Share</p>
            </div>
         </div>
         {/* <p>{postInformation.post_id}</p> */}
         {postState?.sharedPost.post_id === postInformation.post_id &&
         postState?.sharedPost.isShared === true ? (
            <>
               <Modal
                  isOpen={postState?.sharedPost.isShared}
                  onRequestClose={() =>
                     setPostState((prev) => ({
                        sharedPost: {
                           post_id: postInformation.post_id,
                           isShared: !prev?.sharedPost.isShared,
                        },
                     }))
                  }
                  style={customStyles}
               >
                  <SharedPostModal postInformation={postInformation} setPostState={setPostState} />
               </Modal>
            </>
         ) : null}
      </div>
   );
}
