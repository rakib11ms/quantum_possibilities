import React from "react";
import "./Navbar.modules.css";
import DesktopNavLeftSide from "./_ui/DesktopNavLeftSide";
import DesktopMiddleNav from "./_ui/DesktopMiddleNav";
import MessageNotificationProfile from "./_ui/MessageNotificationProfile";
import MobileNavigation from "./_ui/MobileNavigation";

export default function page() {
   return (
      <div>
         <div className="navbar__main__wrapper">
            <DesktopNavLeftSide />
            <DesktopMiddleNav />
            <MessageNotificationProfile />
         </div>
         <div className="mobile__navigation">
            <MobileNavigation />
         </div>
      </div>
   );
}
