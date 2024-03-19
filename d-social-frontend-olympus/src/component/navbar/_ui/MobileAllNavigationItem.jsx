import SearchIcon from "@/component/NewsFeed/_ui/Icons/SearchIcon";
import React from "react";
import LeftArrowSvgIcon from "../svg-component/LeftArrowSvgIcon";
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";
import { host } from "@/environment";
import MessengerIcon from "../svg-component/MessengerIcon";
import NotificationIcon from "../svg-component/NotificaationIcon";
import HomeSvg from "../svg-component/HomeSvg";
import ReelsSvgIcon from "../svg-component/ReelsSvgIcon";
import GroupSvgIcon from "../svg-component/GroupSvgIcon";
import MarketPlaceSvgIcon from "../svg-component/MarketPlaceSvgIcon";
import AddToCardSvgIcon from "../svg-component/AddToCardSvgIcon";
import FeedBackSvgIcon from "../svg-component/FeedBackSvgIcon";
import SettingsIconSvg from "../svg-component/SettingsIconSvg";

export default function MobileAllNavigationItem({ setIsMobileSidebarOpen }) {
   const router = useRouter();
   const { userInfo } = useUserInfo();

   return (
      <div>
         <div className="search__menu__top">
            <div onClick={() => setIsMobileSidebarOpen(false)}>
               <span>
                  <LeftArrowSvgIcon />
               </span>
               <span className="menu___text">Menu</span>
            </div>
            <SearchIcon />
         </div>

         <div className="profile__wrapper__sec">
            <div
               onClick={() => {
                  router.push(`/${userInfo?.username}/timeline`);
               }}
               className="Profile__wrapper"
            >
               <img src={`${host}/uploads/${userInfo?.profile_pic}`} alt="" />
               <div>
                  <p> {userInfo?.first_name + " " + userInfo?.last_name} </p>
                  <span>View your Profile</span>
               </div>
            </div>

            {/* All items */}
            <div>
               {[
                  {
                     href: "/newsfeed",
                     icon: HomeSvg,
                     level: "Home",
                  },
                  {
                     href: "/reel/8000",
                     icon: ReelsSvgIcon,
                     level: "Reels",
                  },
                  {
                     href: "/grouppage",
                     icon: GroupSvgIcon,
                     level: "Groups",
                  },
                  {
                     href: "/marketplace",
                     icon: MarketPlaceSvgIcon,
                     level: "Market-Place",
                  },
                  {
                     href: "/marketplace/seller/product/cart",
                     icon: AddToCardSvgIcon,
                     level: "cart",
                  },
                  {
                     icon: SettingsIconSvg,
                     text: "Settings & privacy",
                     href: "",
                     onClick: () => {},
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
               ].map((each, index) => (
                  <div>--</div>
               ))}

               <div
                  className="Sign__out__button"
                  onClick={() => {
                     localStorage.clear();
                     router.push("/");
                  }}
               >
                  Sign out
               </div>
            </div>
         </div>
      </div>
   );
}
