"use client";

import React, {useState} from "react";
import "./sidebar.modules.css";
import {subSidebar} from "@/assets/MarketPlace/userSidebar-data";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SubSidebar() {
  const path = usePathname();
  const [hover, setHover] = useState(null);

  return (
    <div className="sidebar__wrapper">
      <div className="sidebar__content">
        {subSidebar.map((each, index) => (
          <div
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            className={`${each.path === path ? "active_bg" : "nav__wrapper"}`}
          >
            <Link className="each_nav " key={index} href={each.path}>
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
