import React, { useRef, useState } from "react";
import "./LikeShareAction.modules.css";
import CommentSvg from "./svg/CommentSvg";
import ShareSvg from "./svg/ShareSvg";
import LikeHoverGif from "./LikeHoverGif";
import { useDispatch, useSelector } from "react-redux";
import { handleMouseEnter, handleMouseLeave, handleTouchEnd, handleTouchStart } from "../../utils";
import { useSaveReactionMutation } from "@/redux/features/Reaction/reactionApi";
import { LoveSvg } from "./emoji-icons/LoveSvg";
import { HahaSvg } from "./emoji-icons/HahaSvg";
import { WowSvg } from "./emoji-icons/WowSvg";
import { SadSvg } from "./emoji-icons/SadSvg";
import { LikeSvg } from "./emoji-icons/LikeSvg";
import { AngrySvg } from "./emoji-icons/AngrySvg";
import { reactionTypeToComponent } from "./utils";
import Modal from "react-modal";
import { Modal as MuiModal } from "@mui/material/Modal";
import SharedPostModal from "../sharedPostModal/SharedPostModal";
import { customStyles } from "../../../../../../utils/customeStyle";
import Divider from "@/component/Divider";
import PostReactionPreview from "./PostReactionPreview";
import { DislikeSvg } from "./emoji-icons/DislikeSvg";
import useOutsideClick from "@/hooks/useOutsideClick";
import FacebookShare from "./_ui/FacebookShare";
import { host } from "@/environment";
import { FacebookMessengerShareButton, InstapaperShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

export default function LikeShareAction({ postInformation, getSinglePostInfoById, setLabel, label, setPostState, postState, isBorder }) {
   const dispatch = useDispatch();
   const isHovered = useSelector((state) => state.reaction.reactionState[postInformation.post_id]?.isHovered || false);

   const logedInUserInfo = localStorage.getItem("userInfo");
   const logedUser = JSON.parse(logedInUserInfo);
   const [saveReaction, { data, isLoading }] = useSaveReactionMutation();
   let initialReaction = [];

   console.log("initialReaction", postInformation.reactionInfo);

   if (postInformation.reactionInfo) {
      initialReaction = postInformation.reactionInfo.slice(0, 2);
   }

   const handleClick = async (reaction) => {
      await saveReaction({
         reaction_type: reaction,
         user_id: logedUser[0]?._id,
         post_id: postInformation.post_id,
         post_single_item_id: null,
      });
      if (getSinglePostInfoById) {
         getSinglePostInfoById();
      }
   };

   const [sharePostModalState, setSharePostModalState] = useState({
      postId: null,
      isOpen: false,
      isOptionOpen: false,
      isLikeViewOpen: false,
   });

   const ref = useRef(null);
   useOutsideClick(ref, () => {
      setSharePostModalState({
         postId: null,
         isOptionOpen: false,
      });
   });

   return (
      <div className="like__comment_action_wrapper">
         <div className="action__wrapper">
            <div
               onClick={() =>
                  setSharePostModalState((prev) => ({
                     postId: postInformation.post_id,
                     isLikeViewOpen: true,
                  }))
               }
               className="reaction__count"
            >
               {/* When Anyone giving any reaction render Emoji here */}
               {initialReaction.map((each) => {
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
                  if (each?.reaction_type === "dislike") {
                     return <DislikeSvg />;
                  }
               })}
               <p>{postInformation.reactionCount}</p>
            </div>

            {/* Modal for showing who Reaction Post */}
            {sharePostModalState.postId === postInformation.post_id && sharePostModalState.isLikeViewOpen ? (
               <>
                  <Modal
                     isOpen={sharePostModalState.isLikeViewOpen}
                     onRequestClose={() =>
                        setSharePostModalState((prev) => ({
                           postId: null,
                           isLikeViewOpen: false,
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
                  <ShareSvg
                     callBack={() =>
                        setSharePostModalState((prev) => ({
                           postId: postInformation.post_id,
                           isOpen: true,
                        }))
                     }
                  />
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
                        <p className="action___button">Like</p>
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
                     <p className="action___button">Comment</p>
                  </div>
               </label>
            </div>

            <div
               style={{
                  position: "relative",
               }}
            >
               <div ref={ref}>
                  <p
                     onClick={() =>
                        setSharePostModalState((prev) => ({
                           postId: postInformation.post_id,
                           isOptionOpen: !prev.isOptionOpen,
                        }))
                     }
                     style={{
                        cursor: "pointer",
                     }}
                     className="action___button"
                  >
                     Share
                  </p>
               </div>
               {sharePostModalState.postId === postInformation.post_id && sharePostModalState.isOptionOpen && (
                  <div
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
                     <p
                        onClick={() =>
                           setSharePostModalState((prev) => ({
                              postId: postInformation.post_id,
                              isOpen: true,
                           }))
                        }
                     >
                        Newsfeed
                     </p>
                     <FacebookShare title={"Qp post"} url={`${host}/notification/${postInformation.post_id}`} />

                     <WhatsappShareButton url={`${host}/notification/${postInformation.post_id}`} quote={"Qp post"}>
                        <p>WhatsApp</p>
                     </WhatsappShareButton>
                     <FacebookMessengerShareButton url={`${host}/notification/${postInformation.post_id}`} quote={"Qp post"}>
                        <p>Messenger</p>
                     </FacebookMessengerShareButton>
                     {/* <InstapaperShareButton url={`${host}/notification/${postInformation.post_id}`} quote={"Qp post"}>
                        <p>Instagram</p>
                     </InstapaperShareButton> */}

                     <TwitterShareButton url={`${host}/notification/${postInformation.post_id}`} quote={"Qp post"}>
                        <p>Twitter</p>
                     </TwitterShareButton>
                  </div>
               )}
            </div>
         </div>

         {/* <p>{postInformation.post_id}</p> */}
         {sharePostModalState.postId === postInformation.post_id && sharePostModalState.isOpen && setPostState ? (
            <>
               <Modal
                  isOpen={sharePostModalState.isOpen}
                  onRequestClose={() =>
                     setSharePostModalState((prev) => ({
                        postId: postInformation.post_id,
                        isOpen: false,
                     }))
                  }
                  style={customStyles}
               >
                  <SharedPostModal postInformation={postInformation} setPostState={setPostState} setSharePostModalState={setSharePostModalState} />
               </Modal>
            </>
         ) : null}
      </div>
   );
}
