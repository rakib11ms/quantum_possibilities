"use client";

import React, { useEffect, useState } from "react";
import ProfileTopSection from "./ProfileTopSection";
import Image from "next/image";
import StoryPreviewTimeline from "./StoryPreviewTimeline";
import { host } from "@/environment";

function Stories({ stories, counter, setCounter }) {
   const [isPlaying, setIsPlaying] = useState(true);

   const [viewStories, setView] = useState({});

   const [width, setWidth] = useState(0);

   useEffect(() => {
      let intervalId;

      const playNextMedia = () => {
         if (counter < stories.length) {
            setView(stories[counter]);
            console.log("first story selected", counter, stories[counter]);

            setWidth(0); // Reset width for the new media
            // counter += 1;
            setCounter(counter + 1);
            intervalId = setInterval(() => {
               setWidth((prevWidth) => {
                  if (prevWidth >= 100) {
                     clearInterval(intervalId);
                     playNextMedia(); // Move to the next media
                     return prevWidth;
                  }
                  return prevWidth + 1;
               });
            }, 30);
         }
      };

      // Check if it should play
      if (isPlaying) {
         playNextMedia(); // Start playing the first media
      } else {
         clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
   }, [isPlaying, stories]);

   return (
      <div>
         <div className="main__story__wrapper">
            <div className="profile__top__section">
               {/* Timeline */}
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     gap: "5px",
                     width: "100%",
                  }}
               >
                  <StoryPreviewTimeline width={width} />
               </div>
               <ProfileTopSection viewStories={viewStories} />
            </div>
            <div className="stories__dev">
               <Image className="story__img" src={`${host}/uploads/story/${viewStories?.media}`} alt="" width={500} height={500} />
            </div>
         </div>
      </div>
   );
}

export default Stories;
