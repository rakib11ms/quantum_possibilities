import React from "react";
import "./MessageItemSkeleton.modules.css";

const MessageItemSkeleton = () => {
   return (
      <div className="skeleton">
         <div className="avatar"></div>
         <div className="content">
            <h5></h5>
            <div className="message"></div>
         </div>
      </div>
   );
};

export default MessageItemSkeleton;
