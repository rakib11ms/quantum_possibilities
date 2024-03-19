import ReactionModal from "@/app/[username]/about/_ui/ReactionModal";
import { useGetAllGroupPostReactionQuery } from "@/redux/features/GroupPost/groupPostApi";
import React from "react";
import { LoveSvg } from "./emoji-icons/LoveSvg";
import { HahaSvg } from "./emoji-icons/HahaSvg";
import { WowSvg } from "./emoji-icons/WowSvg";
import { SadSvg } from "./emoji-icons/SadSvg";
import { AngrySvg } from "./emoji-icons/AngrySvg";

export default function PostReactionPreview({ postInformation }) {
   const { data: reactionData, isLoading } = useGetAllGroupPostReactionQuery(postInformation.post_id);

   let reactionDataProcess = [
      {
         label: "",
         data: [],
      },
   ];

   return (
      <ReactionModal
         isLoading={isLoading}
         navigation={[
            {
               type: "all",
               label: "All",
               data: reactionData?.reactions,
            },
            {
               type: "love",
               label: <LoveSvg />,
               data: reactionData?.reactions.filter((each) => each.reaction_type === "love"),
            },
            {
               type: "haha",

               label: <HahaSvg />,
               data: reactionData?.reactions.filter((each) => each.reaction_type === "haha"),
            },
            {
               type: "wow",

               label: <WowSvg />,
               data: reactionData?.reactions.filter((each) => each.reaction_type === "wow"),
            },
            {
               type: "sad",

               label: <SadSvg />,
               data: reactionData?.reactions.filter((each) => each.reaction_type === "sad"),
            },
            {
               type: "angry",

               label: <AngrySvg />,
               data: reactionData?.reactions.filter((each) => each.reaction_type === "angry"),
            },
         ]}
      />
   );
}
