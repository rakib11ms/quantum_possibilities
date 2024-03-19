"use client";

import ReactionModal from "@/app/[username]/about/_ui/ReactionModal";
import { useGetCommentReactionDetailsInfoMutation } from "@/redux/features/NewsFeed/newsFeedApi";
import React, { useEffect } from "react";
import LikeSvg from "./svg/LikeSvg";
import LoveSvg from "./svg/LoveSvg";
import { HahaSvg } from "../like-share-action/emoji-icons/HahaSvg";
import { WowSvg } from "../like-share-action/emoji-icons/WowSvg";
import { SadSvg } from "../like-share-action/emoji-icons/SadSvg";
import { AngrySvg } from "../like-share-action/emoji-icons/AngrySvg";

export default function CommentReactionDetailsPreview({ comment_replies_id, comment_id, post_id }) {
   const [getCommentReactionDetailsInfo, { data: commentReactionInfo, isLoading }] =
      useGetCommentReactionDetailsInfoMutation();

   useEffect(() => {
      if (comment_id == comment_replies_id) {
         getCommentReactionDetailsInfo({
            postId: post_id,
            commentId: comment_id,
            commentRepliesId: null,
         });
      } else {
         getCommentReactionDetailsInfo({
            postId: post_id,
            commentId: comment_id,
            commentRepliesId: comment_replies_id,
         });
      }
   }, []);

   return (
      <div>
         <ReactionModal
            isLoading={null}
            navigation={[
               {
                  type: "all",
                  label: "All",
                  data: commentReactionInfo?.reactions,
               },
               {
                  type: "like",
                  label: <LikeSvg />,
                  data: commentReactionInfo?.reactions?.filter(
                     (each) => each.reaction_type === "like"
                  ),
               },
               {
                  type: "love",
                  label: <LoveSvg />,
                  data: commentReactionInfo?.reactions?.filter(
                     (each) => each.reaction_type === "love"
                  ),
               },
               {
                  type: "haha",

                  label: <HahaSvg />,
                  data: commentReactionInfo?.reactions?.filter(
                     (each) => each.reaction_type === "haha"
                  ),
               },
               {
                  type: "wow",

                  label: <WowSvg />,
                  data: commentReactionInfo?.reactions?.filter(
                     (each) => each.reaction_type === "wow"
                  ),
               },
               {
                  type: "sad",

                  label: <SadSvg />,
                  data: commentReactionInfo?.reactions?.filter(
                     (each) => each.reaction_type === "sad"
                  ),
               },
               {
                  type: "angry",

                  label: <AngrySvg />,
                  data: commentReactionInfo?.reactions?.filter(
                     (each) => each.reaction_type === "angry"
                  ),
               },
            ]}
         />
      </div>
   );
}
