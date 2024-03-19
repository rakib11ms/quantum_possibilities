"use client";

import React, { useEffect, useRef, useState } from "react";
import MessengerIcon from "../svg-component/MessengerIcon";
import NotificationIcon from "../svg-component/NotificaationIcon";
import ProfileNavigation from "./ProfileNavigation";
import useOutsideClick from "@/hooks/useOutsideClick";
import MessageAllPreview from "./NotificationAndMessage/MessageAllPreview";
import NotificationView from "./NotificationAndMessage/NotificationView";
import { usePathname, useSearchParams } from "next/navigation";
import axiosInstance from "../../../../utils/axios";

export default function MessageNotificationProfile() {
   const [showMessageDropdown, setShowMessageDropDown] = useState(false);
   const [showNotificationDropdown, setShowNotificationDropDown] = useState(false);
   const [userId, setUserId] = useState("");
   const [notificationsCount, setNotificationsCount] = useState(0);
   const [messageCount, setMessageCount] = useState(0);
   const ref = useRef();
   useOutsideClick(ref, () => {
      setShowMessageDropDown(false);
      setShowNotificationDropDown(false);
   });

   const pathname = usePathname();

   useEffect(() => {
      const interval = setInterval(() => {
         if (typeof window !== undefined) {
            const user_id = JSON.parse(localStorage.getItem("userInfo"))[0]?._id;
            setUserId(user_id);
            if (userId) {
               getAllNotificationsCount(userId);
            }
         }

         if (pathname === "/newsfeed") {
            getAllNotificationsCount(userId);
         }
      }, 10000);

      return () => clearInterval(interval);
   }, [pathname, userId]);

   async function getAllNotificationsCount(userId) {
      try {
         if (userId) {
            const response = await axiosInstance.get(`/api/get-all-user-specific-unseen-notifications/${userId}`);
            if (response?.data) {
               const notifications = response?.data?.notifications;
               setNotificationsCount(notifications.length);
            }
            const res = axiosInstance.get(`/api/including-me-chat-users`).then((res) => {
               if (res?.data?.status == 200) {
                  setMessageCount(res?.data?.data.length);
               }
            });
         }
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <div className="Message_Notification_Profile__wrapper">
         <div className="Message_Notification_Profile">
            <div
               ref={ref}
               style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
               }}
            >
               <div
                  onClick={() => {
                     setShowMessageDropDown(!showMessageDropdown);
                     setShowNotificationDropDown(false);
                  }}
                  className="icons_wrapper"
               >
                  <MessengerIcon />
                  {messageCount > 0 && <div className="counting__message__notification">{messageCount}</div>}
               </div>

               <div
                  onClick={() => {
                     setShowNotificationDropDown(!showNotificationDropdown);
                     setShowMessageDropDown(false);
                  }}
                  className="icons_wrapper"
               >
                  <NotificationIcon />
                  {notificationsCount > 0 && <div className="counting__message__notification">{notificationsCount}</div>}
               </div>

               {/* Modal */}
               {showMessageDropdown && <MessageAllPreview setShowMessageDropDown={setShowMessageDropDown} />}
               {showNotificationDropdown && <NotificationView setShowNotificationDropDown={setShowNotificationDropDown} />}
            </div>

            {/* profile */}
            <ProfileNavigation />
         </div>

         {/* Modals */}
      </div>
   );
}
