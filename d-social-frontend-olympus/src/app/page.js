"use client";
import Image from "next/image";
// import styles from './page.module.css'
import Registration from "./register/page";
import Leftsidebar from "@/component/leftsidebar/page";
import Rightsidebar from "@/component/rightsidebar/page";
import Navbar from "@/component/navbar/page";
import Newsfeed from "./newsfeed/page";
// import Newsfeed from "./newsfeed/page";
import PreLoader from "@/component/PreLoader";
import React, { useEffect, useState } from "react";


export default function Home() {
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 100);
  // }, []);
  return (
    <div>
      {/* {isLoading ? (
        <PreLoader />
        ) : ( */}

      {/* <Newsfeed /> */}
      {/* )} */}
    </div>
  );
}
