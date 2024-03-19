import React, { useEffect } from "react";
import AllNotification from "../../AllNotification";

export default function NotificationView({ setShowNotificationDropDown }) {
   return (
      <div
         style={{
            position: "fixed",
            top: "60px",
            right: 0,
            backgroundColor: "white",
            height: "80vh",
            // width: '400px',
            padding: "10px",
            borderRadius: "4px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            overflow: "auto",
         }}
      >
         <AllNotification setShowNotificationDropDown={setShowNotificationDropDown} />
      </div>
   );
}
