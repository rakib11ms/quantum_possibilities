"use client";

import React, { useState } from "react";
import "./storyPreview.modules.css";
import LeftSvgIcon from "../_ui/LeftSvgIcon";
import RightSvgIcon from "../_ui/RightSvgIcon";
import StoriesUserProfile from "../_ui/StoriesUserProfile";
import Stories from "../_ui/Stories";
import useStories from "../_ui/hooks/useStories";
import { useParams } from "next/navigation";

export default function StoryPreview() {
   const param = useParams();
   const { stories } = useStories({ story_id: param?.storyId });
   const [counter, setCounter] = useState(0);

   console.log("Counter____Counter", counter);

   return (
      <div className="main__story__page">
         <div className="story__wrapper">
            <div className="story__likers">
               <StoriesUserProfile stories={[]} />
            </div>
            <div className="story__container">
               <Stories stories={stories} setCounter={setCounter} counter={counter} />

               <LeftSvgIcon onClick={() => setCounter(counter - 1)} className={"left__icon"} />
               <RightSvgIcon onClick={() => setCounter(counter + 1)} className={"right__icon"} />
            </div>
         </div>
      </div>
   );
}
