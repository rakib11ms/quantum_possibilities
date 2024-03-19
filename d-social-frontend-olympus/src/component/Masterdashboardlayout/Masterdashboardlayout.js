"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../navbar/page";
import "./master-layout.modules.css";
import { useParams } from "next/navigation";

const Masterdashboardlayout = ({ children, headerName }) => {
   return (
      <>
         <Navbar />
         <div
            style={{
               height: "75px",
            }}
         />
         {children}
         <div className="header-spacer" />
      </>
   );
};

export default Masterdashboardlayout;
