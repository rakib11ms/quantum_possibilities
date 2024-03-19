import React from "react";
import LogoStories from "./svg-components/LogoStories";
import CrossIcon from "./svg-components/CrossIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StoriesUserProfile({ stories }) {
   return (
      <div className="stories__dev">
         <TopLogo />
         <div className="all_stories__profile__wrapper">
            <p className="all__stories">All stories</p>

            {stories.map((story, index) => {
               return <UserProfile key={index} storyUserInfo={story?.user_id} />;
            })}
         </div>
      </div>
   );
}

export function TopLogo() {
   const router = useRouter();
   return (
      <div className="top__logo__stories">
         <CrossIcon onClick={() => router.push("/newsfeed")} />
         <Link href={"/newsfeed"}>
            <LogoStories />
         </Link>
      </div>
   );
}

export function UserProfile({ storyUserInfo }) {
   return (
      <div className="user__profile__section">
         <img src={storyUserInfo?.profile_pic} alt="" className="profile__image" />
         <div>
            <p className="profile__name">{storyUserInfo?.first_name + " " + storyUserInfo?.last_name}</p>
            <p className="story__time">18h</p>
         </div>
      </div>
   );
}
