import React from "react";
import { navigationData } from "../data/NavigationSettings";
import Link from "next/link";

export default function DesktopMiddleNav() {
   return (
      <div className="desktop__middle__nav__wrapper">
         <div className="navigation__wrapper">
            {navigationData.map((each, index) => {
               return (
                  <div className="each__nav__icon" key={index}>
                     <Link href={each.href}>{<each.icon each={each} />}</Link>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
