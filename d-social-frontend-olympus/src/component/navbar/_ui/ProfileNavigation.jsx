"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import React, { useRef, useState } from "react";
import SettingsIconSvg from "../svg-component/SettingsIconSvg";
import FeedBackSvgIcon from "../svg-component/FeedBackSvgIcon";
import SignOutSvgIcon from "../svg-component/SignOutSvgIcon";
import Divider from "@/component/Divider";
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";
import { host } from "@/environment";

export default function ProfileNavigation() {
   const [isProfileOpens, setIsProfileOpens] = useState(false);
   const ref = useRef();
   useOutsideClick(ref, () => setIsProfileOpens(false));
   const router = useRouter();
   const { userInfo } = useUserInfo();

   return (
      <div ref={ref} className="profile__wrapper">
         <div onClick={() => setIsProfileOpens(!isProfileOpens)}>
            <img
               style={{
                  width: "50px",
                  height: "50px",
                  cursor: "pointer",
                  borderRadius: "50px",
                  objectFit: "cover",
               }}
               src={`${host}/uploads/${userInfo?.profile_pic}`}
               alt=""
            />
         </div>

         {isProfileOpens && (
            <div className="Profile__dropdown">
               {/* Profile Area */}
               <div
                  onClick={() => {
                     router.push(`/${userInfo?.username}/timeline`);
                  }}
                  className="profile__name__img"
               >
                  <img
                     style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                        borderRadius: "50px",
                        objectFit: "cover",
                     }}
                     src={`${host}/uploads/${userInfo?.profile_pic}`}
                     alt=""
                  />
                  <p> {userInfo?.first_name + " " + userInfo?.last_name} </p>
               </div>
               <Divider />

               {/* Drop down */}
               <div className="drop__nav__wrapper">
                  {[
                     {
                        icon: SettingsIconSvg,
                        text: "Settings & privacy",
                        href: "",
                        onClick: () => {
                           router.push("/settings-privacy");
                        },
                     },
                     {
                        icon: SettingsIconSvg,
                        text: "Customize Menu",
                        href: "",
                        onClick: () => {
                           router.push("/customize-menu");
                        },
                     },
                     {
                        icon: FeedBackSvgIcon,
                        text: "Give us Feedback",
                        href: "",
                        onClick: () => {},
                     },
                     {
                        icon: SignOutSvgIcon,
                        text: "Sign out",
                        href: "",
                        onClick: () => {
                           localStorage.clear();
                           router.push("/");
                        },
                     },
                  ].map((each, index) => {
                     return (
                        <div onClick={each.onClick} className="each_content">
                           {<each.icon />}
                           <p>{each.text}</p>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
}
