"use client";
import React, { useState, useEffect } from "react";
import { host } from "@/environment";
import image1 from "../../../public/gM3.png";
import image2 from "../../../public/accepted.png";
import axiosInstance from "../../../utils/axios";
import timeFormat from "../../../utils/CommentTimeFormat";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams, useServerInsertedHTML } from "next/navigation";
import NotificationSkeleton from "./_ui/NotifiationSkeleton";

const AllNotification = ({ setShowNotificationDropDown }) => {
   const [userID, setUserID] = useState(null);
   const [userName, setUserName] = React.useState("");
   const [userImage, setUserImage] = React.useState("");
   const [notifications, setNotifications] = useState([]);
   const [notificationsLoader, setNotificationsLoader] = useState(true);

   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   useEffect(() => {
      // setNotificationsLoader(true);
      const url = `${pathname}?${searchParams}`;

      getFriendRequests();

      if (typeof window !== undefined) {
         const userIDs = JSON.parse(localStorage.getItem("userInfo"))[0]._id;
         setUserID(userIDs);
         if (userIDs) {
            getAllNotifications(userIDs);
         }
      }

      if (pathname === "/newsfeed") {
         getAllNotifications(userID);
      }
   }, [pathname, searchParams]);

   async function getAllNotifications(userID) {
      try {
         setNotificationsLoader(true);

         const response = await axiosInstance.get(`/api/get-all-user-specific-notifications/${userID}`);

         if (response?.data) {
            setNotifications(response?.data?.notifications);
            setNotificationsLoader(false);
         }
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      if (localStorage.getItem("userInfo") != undefined) {
         const localStorageFullName = localStorage.getItem("fullname");
         const localUserName = localStorage.getItem("username");
         const userImage = JSON.parse(localStorage.getItem("userInfo"));
         if (userImage) {
            setUserImage(userImage[0].profile_pic);
         }

         if (localUserName) {
            setUserName(localUserName);
         }
      }
   }, []);

   const handleClickToNotificationSeen = (notification) => {
      const notificationId = notification?._id;
      if (notification.notification_seen === false && notification?._id) {
         axiosInstance.post(`/api/update-notification-seen-status/${notificationId}`).then((res) => {
            if (res.data.status == 200) {
               getAllNotifications(userID);
            }
         });
      }
      router.push(`/notification/${notification?.notification_data?.post_id?._id}`);
   };

   const handleLogout = () => {
      if (typeof window !== "undefined") {
         localStorage.removeItem("refreshToken");
      }
      if (typeof window !== "undefined") {
         localStorage.removeItem("userInfo");
      }
      if (typeof window !== "undefined") {
         localStorage.removeItem("fullname");
      }
      if (typeof window !== "undefined") {
         localStorage.removeItem("userID");
      }
      // Clear the 'auth' cookie by setting its expiration date to a past date
      // document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to the login page
      router.push("/login");
   };

   // Mobile
   const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
   });

   const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
         return;
      }

      setState({ ...state, [anchor]: open });
   };
   const [isPageSettingRoute, setIsPageSettingRoute] = useState(false);
   const [isOtherRoute1, setIsOtherRoute1] = useState(false);
   const [isOtherRoute2, setIsOtherRoute2] = useState(false);
   const [isOtherRoute3, setIsOtherRoute3] = useState(false);
   // Listen for route changes
   useEffect(() => {
      // Get the current route from your routing library
      const currentRoute = window.location.pathname;
      const splitRoute = currentRoute.split("/");
      // Check if the current route is the 'pageSettings' route
      setIsPageSettingRoute(splitRoute[1] === "manage-page");

      // Check if the current route is 'otherRoute1'
      setIsOtherRoute1(splitRoute[1] === "settings");

      // Check if the current route is 'otherRoute2'
      setIsOtherRoute2(splitRoute[1] === "page-settings");

      // Check if the current route is 'otherRoute3'
      setIsOtherRoute3(splitRoute[1] === "");
   }, []);

   const [friendList, setFriendList] = React.useState([]);
   const [friendCount, setFriendCount] = React.useState([]);

   const getFriendRequests = () => {
      axiosInstance.post("/api/friend-request-list").then((res) => {
         if (res.data.status == 200) {
            setFriendList(res.data.results);
            setFriendCount(res.data.friendCount);
         }
      });
   };

   // useEffect(() => {
   //   getFriendRequests();
   // }, []);

   const acceptRequest = (request_id, accept_reject_ind, notification) => {
      console.log("nootifciation", notification);
      const formData = {
         request_id: request_id,
         accept_reject_ind: accept_reject_ind,
      };
      handleClickToNotificationSeen(notification);
      axiosInstance.post("/api/friend-accept-friend-request", formData).then((res) => {
         if (res.data.status == 200) {
            getFriendRequests();

            getAllNotifications(userID);
            if (accept_reject_ind == 1) {
               toast.success("Request Accepted successfully", {
                  position: "top-right",
                  style: {
                     background: "white",
                     color: "black",
                  },
               });
            } else {
               toast.success("Request Declined successfully", {
                  position: "top-right",
                  style: {
                     background: "white",
                     color: "black",
                  },
               });
            }
         }
      });
   };

   console.log("notificationsLoader__notificationsLoader", notificationsLoader);

   return (
      <div className="all-scrollable-div">
         <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <h4>Notifications</h4>
            <svg
               style={{
                  cursor: "pointer",
               }}
               onClick={() => setShowNotificationDropDown(false)}
               xmlns="http://www.w3.org/2000/svg"
               width="20"
               height="20"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
               class="lucide lucide-x"
            >
               <path d="M18 6 6 18" />
               <path d="m6 6 12 12" />
            </svg>
         </div>
         {notificationsLoader ? (
            <div>
               {[...Array(10)].map((_, index) => (
                  <NotificationSkeleton key={index} />
               ))}
            </div>
         ) : (
            notifications &&
            notifications.map((notification, index) => {
               console.log("notification__", notification);
               const cleanedDescription = notification.notification_data?.post_id?.description?.replace(/<br\s*\/?>/g, " ") || "";

               const truncatedDescription = cleanedDescription.length > 50 ? `${cleanedDescription.substring(0, 50)}...` : cleanedDescription;
               if (notification.notification_type == "post_reaction") {
                  return (
                     <div
                        onClick={() => handleClickToNotificationSeen(notification)}
                        className={`row notification-div ${notification.notification_seen ? "text-secondary" : ""}`}
                        key={index}
                     >
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="noti-img-div">
                              {notification.notification_sender_id?.profile_pic !== null ? (
                                 <img src={`${host}/uploads/${notification.notification_sender_id?.profile_pic}`} className="noti-img" />
                              ) : (
                                 <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" className="noti-img" />
                              )}
                           </div>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                           <div>
                              <p>
                                 <strong className="">{`${notification.notification_sender_id?.first_name} ${notification.notification_sender_id?.last_name}`}</strong> has reacted
                                 on your post
                              </p>

                              <p className="file-notifi-texttwo mt-1">{truncatedDescription}</p>
                              <p className="time-all-noti-text">{timeFormat(notification.createdAt)}</p>
                           </div>
                        </div>
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="time-three-dots">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                 <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  );
               } else if (notification.notification_type === "post_commented") {
                  return (
                     <div
                        onClick={() => handleClickToNotificationSeen(notification)}
                        className={`row notification-div ${notification.notification_seen ? "text-secondary" : ""}`}
                        key={index}
                     >
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="noti-img-div">
                              {notification.notification_sender_id?.profile_pic !== null ? (
                                 <img src={`${host}/uploads/${notification.notification_sender_id?.profile_pic}`} className="noti-img" />
                              ) : (
                                 <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" className="noti-img" />
                              )}
                              {/* <img className='noti-img' src={image1.src} alt='' /> */}
                           </div>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                           <div>
                              <p>
                                 <strong className="">{`${notification.notification_sender_id?.first_name} ${notification.notification_sender_id?.last_name}`}</strong> has
                                 commented on your post
                              </p>

                              <p className="file-notifi-texttwo mt-1">{truncatedDescription}</p>
                              <p className="time-all-noti-text">{timeFormat(notification.createdAt)}</p>
                           </div>
                        </div>
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="time-three-dots">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                 <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  );
               } else if (notification.notification_type === "shared_post") {
                  return (
                     <div
                        onClick={() => handleClickToNotificationSeen(notification)}
                        className={`row notification-div ${notification.notification_seen ? "text-secondary" : ""}`}
                        key={index}
                     >
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="noti-img-div">
                              {notification.notification_sender_id.profile_pic !== null ? (
                                 <img src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`} className="noti-img" />
                              ) : (
                                 <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" className="noti-img" />
                              )}
                           </div>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                           <div>
                              <p>
                                 <strong className="">{`${notification.notification_sender_id.first_name} ${notification.notification_sender_id.last_name}`}</strong> has shared on
                                 your post
                              </p>

                              <p className="file-notifi-texttwo mt-1">{truncatedDescription}</p>
                              <p className="time-all-noti-text">{timeFormat(notification.createdAt)}</p>
                           </div>
                        </div>
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="time-three-dots">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                 <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  );
               } else if (notification.notification_type === "comment_reaction") {
                  return (
                     <div
                        onClick={() => handleClickToNotificationSeen(notification)}
                        className={`row notification-div ${notification.notification_seen ? "text-secondary" : ""}`}
                        key={index}
                     >
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="noti-img-div">
                              {notification.notification_sender_id?.profile_pic !== null ? (
                                 <img src={`${host}/uploads/${notification.notification_sender_id?.profile_pic}`} className="noti-img" />
                              ) : (
                                 <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" className="noti-img" />
                              )}
                              {/* <img className='noti-img' src={image1.src} alt='' /> */}
                           </div>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                           <div>
                              <p>
                                 <strong className="">{`${notification.notification_sender_id?.first_name} ${notification.notification_sender_id?.last_name}`}</strong> has reacted
                                 on your comment
                              </p>

                              <p className="file-notifi-texttwo mt-1">
                                 {notification.notification_data?.comment_id?.comment_name?.length !== undefined &&
                                 notification.notification_data.comment_id.comment_name.length > 50
                                    ? `${notification.notification_data.comment_id.comment_name.substring(0, 50)}...`
                                    : notification.notification_data?.comment_id?.comment_name}{" "}
                              </p>
                              <p className="time-all-noti-text">{timeFormat(notification.createdAt)}</p>
                           </div>
                        </div>
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="time-three-dots">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                 <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  );
               } else if (notification.notification_type === "friend_request") {
                  return (
                     <div className={`row notification-div ${notification.notification_seen ? "text-secondary" : ""}`}>
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="noti-img-div">
                              {/* <img className='noti-img' src={image1.src} alt='' /> */}
                              {notification.notification_sender_id?.profile_pic !== null ? (
                                 <img src={`${host}/uploads/${notification.notification_sender_id?.profile_pic}`} className="noti-img" />
                              ) : (
                                 <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" className="noti-img" />
                              )}
                           </div>
                        </div>
                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                           <p>
                              <strong className="">{`${notification.notification_sender_id?.first_name} ${notification.notification_sender_id?.last_name}`}</strong> sent you a
                              friend request
                           </p>

                           <div className="noti-Accep-btn-div">
                              <button className="noti-Accep-btn" onClick={() => acceptRequest(item?._id, 1, notification)}>
                                 Accept
                              </button>
                              <button className="noti-decline-btn">Decline</button>
                           </div>
                        </div>
                        <p className="time-all-noti-text">{timeFormat(notification.createdAt)}</p>
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                           <div className="time-three-dots">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                 <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  );
               }
            })
         )}
      </div>
   );
};

export default AllNotification;
