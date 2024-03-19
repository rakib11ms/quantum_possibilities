import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import Leftsidebar from "@/component/leftsidebar/page";
import React from "react";

export default function NotificationDetailsPageLayout({ children }) {
   return (
      <Masterdashboardlayout>
         <div
            style={{
               display: "flex",
               justifyContent: "start",
               alignItems: "center",
               margin: "0px 20px",
            }}
         >
            <Leftsidebar />

            <div
               style={{
                  width: "340px",
               }}
            ></div>

            <div
               style={{
                  marginTop: "8px",
                  width: "100%",
               }}
            >
               {children}
            </div>
         </div>
      </Masterdashboardlayout>
   );
}
