import React, { useEffect, useState } from "react";
import "./NewsfeedStory.modules.css";
import { DemoProfile, feelingActivity, liveVideo, photoVideo, plusIcon } from "@/assets/newsfeed";
import Image from "next/image";
import StoryPreview from "./StoryPreview";
import ProfileTextField from "./ProfileTextField";
import UploadNavigation from "./UploadNavigation";
import PlusIcon from "../_svg-components/plusIcon";
import Link from "next/link";
import axiosInstance from "../../../../utils/axios";
import { host } from "@/environment";

export default function NewsfeedStory() {
   const [story, setStory] = useState([]);
   const [fullName, setFullName] = useState(null);
   const [profilePic, setProfilePic] = useState(null);

   useEffect(() => {
      if (typeof window !== "undefined") {
         const localUserInfo = localStorage.getItem("userInfo");
         setFullName(localStorage.getItem("username"));

         const localProfilePic = JSON.parse(localUserInfo)[0].profile_pic;
         setProfilePic(localProfilePic);
      }

      axiosInstance.post("/api/get-story").then((res) => {
         if (res.data.status == 200) {
            setStory(res.data.results);
         }
      });
   }, []);

   const [isOpenModal, setIsOpenModal] = useState({
      post: false,
      tag: false,
      event: false,
      gif: false,
      location: false,
      photoUpload: false,
   });

   return (
      <div>
         <div className="newsfeed_story__wrapper">
            <ProfileTextField isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
            <hr />

            {/* Navigation  */}
            <UploadNavigation isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
            <hr />

            {/* Story Section */}
            <div className="padding__wrapper  story__wrapper">
               <Link href={"/stories/create"}>
                  <div className="create_story">
                     <img className="story__image" src={`${host}/uploads/${profilePic}`} alt="User Profile" />
                     <div className="profile_icons_story_add">
                        <PlusIcon />
                     </div>
                  </div>
               </Link>
               {/* <StoryPreview isStoryAvailable /> */}
               {story.length > 0 && story.map((item, i) => <StoryPreview isStoryAvailable story={item} />)}
            </div>
         </div>
      </div>
   );
}
