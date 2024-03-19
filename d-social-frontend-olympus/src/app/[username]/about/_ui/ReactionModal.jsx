"use client";
import React, { useState } from "react";
import "./ReactionModal.css";
import { host } from "@/environment";
import Loading from "@/component/loader";
import LikeSvg from "@/component/Group/GroupPost/post-ui/Comments/svg/LikeSvg";
import { HahaSvg } from "@/component/Group/GroupPost/post-ui/like-share-action/emoji-icons/HahaSvg";
import { WowSvg } from "@/component/Group/GroupPost/post-ui/like-share-action/emoji-icons/WowSvg";
import { SadSvg } from "@/component/Group/GroupPost/post-ui/like-share-action/emoji-icons/SadSvg";
import { AngrySvg } from "@/component/NewsFeed/Post/post-ui/like-share-action/emoji-icons/AngrySvg";
import LoveIcon from "./Icons/LoveIcon";
import { LoveEmoji } from "@/component/Group/GroupPost/post-ui/like-share-action/emoji-icons";
import LoveSvg from "@/component/NewsFeed/Post/post-ui/Comments/svg/LoveSvg";
import Link from "next/link";
import Divider from "../../../../component/Divider";

function ReactionModal({ navigation, isLoading }) {
   const [tab, setTab] = useState("all");
   console.log("navigation", navigation);
   return (
      <div className="tas_reaction_modal_wrapper">
         <div
            style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "start",
               gap: "20px",
            }}
         >
            {navigation?.map((each, index) => (
               <>
                  <div
                     onClick={() => setTab(each.type)}
                     style={{ cursor: "pointer" }}
                     className="tas_reaction_modal_title"
                  >
                     {each.label}
                  </div>
               </>
            ))}
         </div>

         {navigation?.map((each, index) => (
            <div>
               {each?.type === tab &&
                  each?.data?.map((each, index) => <FriendItem friend={each} />)}
            </div>
         ))}
      </div>
   );
}

export default ReactionModal;

const FriendItem = ({ friend }) => {
   console.log("friend.label", friend.label);
   return (
      <div className="tas_reaction_friend_container">
         <div className="tas_reaction_friend_img_container">
            <img
               className="tas_reaction_friend_img"
               src={`${host}/uploads/${friend?.user_id?.profile_pic}`}
            />
            <div className="tas_reaction_friend_details_container">
               <p className="tas_reaction_friend_name">
                  {friend?.user_id?.first_name} {friend?.user_id?.last_name}
               </p>
               {friend.reaction_type == "like" && <LikeSvg />}

               {friend.reaction_type == "love" && <LoveSvg />}

               {friend.reaction_type == "haha" && <HahaSvg />}

               {friend.reaction_type == "wow" && <WowSvg />}

               {friend.reaction_type == "sad" && <SadSvg />}

               {friend.reaction_type == "angry" && <AngrySvg />}

               {/* <p className="tas_reaction_friend_mutual">1 mutual friends</p> */}
            </div>
         </div>
         <Link
            href={`/${friend?.user_id?.username}/timeline`}
            className="tas_reaction_add_friend_btn"
         >
            View Profile
         </Link>
      </div>
   );
};
