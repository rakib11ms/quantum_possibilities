import React from "react";
import DesktopNavLogo from "../svg-component/DesktopNavLogo";
import Link from "next/link";
import SearchSvgIcon from "../svg-component/SearchSvgIcon";
export default function DesktopNavLeftSide() {
   return (
      <div className="left__sidebar__wrapper">
         <Link href="/newsfeed">
            <DesktopNavLogo />
         </Link>
         <div className="input__box">
            <input type="search" className="searchInput" placeholder="Search" />
            <SearchSvgIcon className={"search__icon"} />
         </div>
      </div>
   );
}
