"use client";

import React, { useState } from "react";
import "./subSidebar.modules.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {subSidebar} from "@/assets/MarketPlace/userSidebar-data";
export default function SubSidebarProp(props) {
  let { buyerSubSidebar } = props;
  if (!buyerSubSidebar) {
    return (buyerSubSidebar = subSidebar);
  }
  const path = usePathname();
  const [hover, setHover] = useState(null);

  return (
    <div className="sidebar__wrapper">
      <div className="sidebar__content">
        {buyerSubSidebar.map((each, index) => (
          <div
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            className={`${each.path === path ? "active_bg" : "nav__wrapper"}`}
            key={index}
          >
            <Link className="each_nav" href={each.path} key={index}>
              {hover === index || each.path === path ? (
                <Image className="img" src={each.hoverIcon} alt="sidebar" />
              ) : (
                <Image className="img" src={each.icon} alt="sidebar" />
              )}

              <p>{each.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
