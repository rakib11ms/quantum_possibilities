import { host } from "@/environment";
import React from "react";
import ReactionTypeView from "./ReactionTypeView";

export default function StoriesReactionPreview({ each }) {
   console.log("first reaction", each);
   return (
      <div
         style={{
            backgroundColor: "#ffff",
            padding: "4px",
         }}
      >
         <div
            style={{
               backgroundColor: "#FFFF",
               color: "#000000",
            }}
         >
            <div
               style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: "6px",
               }}
            >
               <img
                  style={{
                     width: "40px",
                     height: "40px",
                     objectFit: "cover",
                     borderRadius: "50%",
                     border: "1px solid gray",
                  }}
                  src={`${host}/uploads/${each?.profile_pic}`}
                  alt=""
               />
               <div>
                  <p>{each?.first_name + " " + each?.last_name || "Not yet"}</p>
                  {/* Showing Reaction Type Icons */}
                  <div
                     style={{
                        display: "flex",
                        gap: "-8px",
                     }}
                  >
                     {each?.reactions.map((each) => {
                        return <ReactionTypeView reactionType={each?.reaction_type} />;
                     })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
