import {arrow} from "@/assets/MarketPlace";
import React from "react";
import Image from "next/image";
import "./Breadcrumb.modules.css";
import Link from "next/link";
export default function Breadcrumb({path}) {
  return (
    <div className="main__wrapper">
      <span className="tittle">{path.page}</span>
      <div className="breadcrumb__wrapper">
        {path?.breadcrumb?.map((each, index) => (
          <>
            <Link href={each.url}>
              <p className={` ${index === path.breadcrumb.length - 1 ? "active" : "dash"} `}>{each.title}</p>
            </Link>
            {index !== path.breadcrumb.length - 1 && <Image className="img" src={arrow} alt="arrow" />}
          </>
        ))}
      </div>
    </div>
  );
}
