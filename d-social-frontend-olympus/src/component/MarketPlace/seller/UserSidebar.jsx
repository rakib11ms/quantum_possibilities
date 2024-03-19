import React from "react";
import "./sidebar.modules.css";
import Image from "next/image";
import Link from "next/link";
import {profile} from "@/assets/MarketPlace";
import {userSidebarData} from "@/assets/MarketPlace/userSidebar-data";

export default function UserSidebar() {
  return (
    <div className="sidebar__wrapper">
      <div className="sidebar__content">
        <Link href={"#"}>
          <div className="each_content">
            <div className="icons">
              <Image src={profile} alt="profile" />
            </div>
            <p className="profile">James Rodigan</p>
          </div>
        </Link>

        {userSidebarData.map((each, index) => (
          <Link key={index} href={each.path}>
            <div className="each_content">
              <div className="icons">
                <Image src={each.icon} alt="sidebar" />
              </div>
              <p>{each.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
