import React from "react";
import StorisThreeDot from "./svg-components/StorisThreeDot";
import StoriesCloseSvg from "./svg-components/StoriesCloseSvg";
import Image from "next/image";
import { host } from "@/environment";
import { useRouter } from "next/navigation";

export default function ProfileTopSection({ viewStories }) {
   const router = useRouter();
   return (
      <div
         style={{
            padding: "0px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%",
         }}
      >
         {/*  */}
         <div
            style={{
               width: "100%",
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "10px",
               }}
            >
               <Image
                  style={{
                     width: "60px",
                     height: "60px",
                     borderRadius: "50%",
                     objectFit: "cover",
                     objectPosition: "top",
                  }}
                  height={500}
                  width={500}
                  src={`${host}/uploads/${viewStories?.user_id?.profile_pic}`}
                  alt="profile-pic"
               />
               <div
                  style={{
                     color: "white",
                  }}
               >
                  <p
                     style={{
                        fontSize: "16px",
                     }}
                  >
                     {viewStories?.user_id?.first_name + " " + viewStories?.user_id?.last_name}
                  </p>
                  <p
                     style={{
                        fontSize: "12px",
                     }}
                  >
                     18 hour ago
                  </p>
               </div>
            </div>
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "center",
                  gap: "15px",
               }}
            >
               <StorisThreeDot />
               <StoriesCloseSvg onClick={() => router.push("/newsfeed")} />
            </div>
         </div>
      </div>
   );
}
