"use client";

import React, { useState } from "react";
import PlusIconSvg from "../svg-component/PlusIconSvg";
import DesktopNavLogo from "../svg-component/DesktopNavLogo";
import MobileSearchIconSvg from "../svg-component/MobileSearchIconSvg";
import MessageIconSvg from "../svg-component/MessageIconSvg";
import DesktopMiddleNav from "./DesktopMiddleNav";
import useUserInfo from "@/hooks/useUserInfo";
import { host } from "@/environment";
import "./MobileNavigation.modules.css";
import MobileAllNavigationItem from "./MobileAllNavigationItem";

export default function MobileNavigation() {
   const { userInfo } = useUserInfo();
   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

   return (
      <div
         style={{
            background: "white",
            paddingTop: "10px",
         }}
      >
         <div className="mobile__nav__top__area">
            <DesktopNavLogo width={40} />
            <div className="Mobile__nav__top__Svg__icon">
               <PlusIconSvg className={"each_nav"} />
               <MobileSearchIconSvg className={"each_nav"} />
               <MessageIconSvg className={"each_nav"} />
            </div>
         </div>
         <div
            style={{
               margin: "10px 0px 10px 10px",
               display: "flex",
            }}
         >
            <DesktopMiddleNav />
            <div>
               <div onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
                  <img
                     style={{
                        width: "40px",
                        cursor: "pointer",
                        borderRadius: "50px",
                        marginRight: "15px",
                     }}
                     src={`${host}/uploads/${userInfo?.profile_pic}`}
                     alt=""
                  />
               </div>

               {isMobileSidebarOpen && (
                  <div className="modal__open active">
                     <MobileAllNavigationItem setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
