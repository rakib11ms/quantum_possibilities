import { DemoProfile } from "@/assets/newsfeed";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { host } from "@/environment";

export default function StoryPreview({ isStoryAvailable, story }) {
   // console.log("storystorystory__story", story);
   return (
      <Link href={`/stories/showstory/${story._id}`}>
         <div>
            <div className="create_story">
               <img className="story__image" src={`${host}/uploads/story/${story.media}`} alt="Demo Profile" />
               <div className="profile_icons">
                  <div className={`${isStoryAvailable ? "profile__story__view__active" : "profile__story__view"}`}>
                     <img className="img" src={`${host}/uploads/${story.user_id?.profile_pic}`} width="50" height="50" alt="Demo Profile" />
                  </div>
                  <p>
                     {story.user_id?.first_name}
                     {/* {" "}
              {story.user_id?.last_name} */}
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
}
