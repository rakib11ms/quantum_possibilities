"use client";
import React, { useEffect, useState } from "react";
// import { isAuthenticated } from "../../middleware/middleware";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import TopNewsCaro from "@/app/newsfeed/TopNewsCaro";
import { toast } from "react-toastify";
import { host } from "@/environment";
import PagLogo from "../../../../public/qPlOgO.jpg";
import searchIcon from "../../../../public/custom-svg-icon/circum_search.svg";
import groupSvg from "../../../../public/custom-svg-icon/Group.svg";
import chatSvg from "../../../../public/custom-svg-icon/Chat.svg";
import notificationSvg from "../../../../public/custom-svg-icon/Notification.svg";
import walletSvg from "../../../../public/custom-svg-icon/Wallet.svg";
import navSvg from "../../../../public/custom-svg-icon/nav.svg";
import qLogoMobile from "../../../../public/qLogoMobile.png";
import dpProfile from "../../../assets/img/author-page.jpg";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Leftsidebar from "@/component/leftsidebar/page";
import axiosInstance from "../../../../utils/axios";
import timeFormat from "../../../../utils/CommentTimeFormat";

// import style from "./postMediaGrid.css";
// import axiosInstance from "../../../../utils/axios";
// import feedauthone from "../../assets/img/author-page.jpg";
import feedauththree from "../../../assets/img/avatar10-sm.jpg";
// import authIcon from "../../../public/img/author-page.jpg"
// import qLogoMobile from "../../../public/qLogoMobile.png";
// import reelsSVG from "../../../public/reels.svg";
// import fileupSVG from "../../../public/fileup.svg";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Leftsidebar from "@/component/leftsidebar/page";
// import statusSvg from "../../../public/custom-svg-icon/status.svg";
// import reelsSvg from "../../../public/custom-svg-icon/reels.svg";
// import storySvg from "../../../public/custom-svg-icon/story.svg";
// import gallerySvg from "../../../public/custom-svg-icon/gallery.svg";
// import locationSvg from "../../../public/custom-svg-icon/location.svg";
// import addfriendSvg from "../../../public/custom-svg-icon/addfriend.svg";
// import photoSvg from "../../../public/custom-svg-icon/photo.svg";
// import dpProfile from "../../assets/img/author-page.jpg";
import Image from "next/image";
import Link from "next/link";
import PostList from "@/component/NewsFeed/OldPostList";
import PostListCopyDontTouch from "@/component/NewsFeed/PostListCopyDontTouch";
import LocationModal from "@/component/NewsFeed/LocationModal";
import FeatureUser from "@/component/NewsFeed/FeatureUser";
import FeelingAndActivity from "@/component/NewsFeed/FeelingAndActivity";
// import authIcon from "../../../public/img/author-page.jpg";
// import MobileSlider from "./mobileSlider";
// import MobileStorieReels from "./mobileStorieReels";
// import Loader from "@/component/Loader/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
// import Select from 'react-select';
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import Head from "next/head";

import { useRouter, usePathname, useSearchParams, useServerInsertedHTML } from "next/navigation";

const page = ({ headerName }) => {
   const [userId, setUserId] = useState("");

   // console.log("boom boom", userId);

   // const [userID, serUserID] = useState('')

   // const userID = JSON.parse(localStorage.getItem("userInfo"))[0]._id;

   // Check if localStorage is defined
   // const canUseLocalStorage =
   //   typeof window !== "undefined" && window.localStorage;

   // // Get the user ID from localStorage, if it is defined
   // if (typeof window !== 'undefined' && localStorage.getItem("userInfo") !== undefined) {
   //   if (localStorage.getItem("userInfo") != undefined) {
   //     const userID = canUseLocalStorage
   //       ? JSON.parse(localStorage.getItem("userInfo"))[0]._id
   //       : null;
   //   } else {
   //     const userID = 0;
   //   }
   // } else {
   //   const userID = 0;
   // }

   // const [userID, setUserID] = useState(null)
   // const router = useRouter();
   // const pathname = usePathname();
   // const searchParams = useSearchParams();

   // console.log("path name", pathname, userID)

   // useEffect(() => {
   //   const url = `${pathname}?${searchParams}`
   //   console.log("urrl", url)
   //   getFriendRequests();
   //   if (typeof window !== undefined) {
   //     const userIDs = JSON.parse(localStorage.getItem("userInfo"))[0]._id;
   //     setUserID(userIDs);

   //   }
   //   if (userID) {
   //     getAllNotifications();

   //   }
   //   if (pathname === "/newsfeed") {
   //     getAllNotifications();

   //   }

   // }, [pathname, searchParams])

   const [userID, setUserID] = useState(null);
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   console.log("path name", pathname, userID);

   useEffect(() => {
      const url = `${pathname}?${searchParams}`;
      console.log("urrl", url);

      getFriendRequests();

      if (typeof window !== undefined) {
         const userIDs = JSON.parse(localStorage.getItem("userInfo"))[0]._id;
         setUserID(userIDs);
         if (userIDs) {
            getAllNotifications(userIDs);
         }
      }

      if (pathname === "/newsfeed") {
         // No dependency on userID here
         getAllNotifications(userID);
      }
   }, [pathname, searchParams]);

   const [notifications, setNotifications] = useState([]);

   // console.log("notifications", notifications);

   async function getAllNotifications(userID) {
      try {
         const response = await axiosInstance.get(`/api/get-all-user-specific-notifications/${userID}`);

         if (response.data) {
            setNotifications(response.data.notifications);
         }
      } catch (error) {
         console.error(error);
      }
   }
   // console.log("notifications", notifications);

   useEffect(() => {
      if (localStorage.getItem("userInfo") != undefined) {
         const localStorageFullName = localStorage.getItem("fullname");
         const localUserName = localStorage.getItem("username");
         const userImage = JSON.parse(localStorage.getItem("userInfo"));
         if (userImage) {
            setuserImage(userImage[0].profile_pic);
         }
         setUserId(userImage[0]._id);

         if (localUserName) {
            setUserName(localUserName);
         }
      }
   }, []);

   // const [notifications, setNotifications] = useState([]);

   // console.log('notifications', notifications)

   // async function getAllNotifications() {
   //   try {
   //     const response = await axiosInstance.get(
   //       `/api/get-all-user-specific-notifications/${userID}`
   //     ); // Replace with your API endpoint

   //     if (response.data) {
   //       // Update the notifications state with the received data
   //       setNotifications(response.data.notifications);
   //     }
   //   } catch (error) {
   //     console.error(error);
   //   }

   // }

   // useEffect(() => {
   //   // Call getAllNotifications immediately when the component mounts
   //   // getAllNotifications();

   //   // Set up an interval to check for notifications every second
   //   // const intervalId = setInterval(() => {
   //   //   getAllNotifications();
   //   // }, 4000);

   //   // Cleanup the interval when the component unmounts
   //   // return () => {
   //   //   clearInterval(intervalId);
   //   // };
   // }, []);

   // const seenNotfications = async () => {
   //     try {
   //         const response = await axiosInstance.get(
   //             `/api/seen-all-user-specific-notifications/${userID}`
   //         );

   //         if (response.data) {
   //             // Update the notifications state with the received data
   //             setNotifications(response.data.notifications);
   //             // setNotifications()
   //         }
   //     } catch (error) {
   //         console.error(error);
   //     }
   // };

   const [userName, setUserName] = React.useState("");
   const [userImage, setuserImage] = React.useState("");

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
         localStorage.removeItem("userId");
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

      console.log("Current Route:", splitRoute[1]);
   }, []);

   const [friendlist, setFriendList] = React.useState([]);
   const [friendCount, setFriendCount] = React.useState([]);

   console.log("friendlist", friendlist, friendCount);

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

   const groupInvitation = ({ status, invitationId, notification_id, type }) => {
      // resource_id
      axiosInstance
         .post("/api/group-invitation-status-change", {
            invitationId,
            status,
            notification_id,
            type,
         })
         .then((res) => {
            if (res.data.status == 200) {
               toast.success(res.data.message, {
                  position: "top-right",
                  style: {
                     background: "white",
                     color: "black",
                  },
               });
               getAllNotifications(userId);
            }
         })
         .catch((err) => {
            toast.error(`Group invitation ${status} Error`, {
               position: "top-right",
               style: {
                  background: "white",
                  color: "black",
               },
            });
         });
   };

   const acceptRequest = (request_id, accept_reject_ind) => {
      const formData = {
         request_id: request_id,
         accept_reject_ind: accept_reject_ind,
      };
      axiosInstance.post("/api/friend-accept-friend-request", formData).then((res) => {
         if (res.data.status == 200) {
            getFriendRequests();

            setFriendList((prevFriends) => prevFriends.filter((friend) => friend._id !== request_id));
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
   return (
      <div>
         {" "}
         <Masterdashboardlayout>
            <div className=" container-fluid ">
               <div className="row">
                  {/* Main Content */}
                  <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                     {/* <h1>Hello</h1> */}

                     <div className="card">
                        <h5 class="text-center mt-3">View All Notifications</h5>
                        <hr className="my-0" />
                        <div className="mCustomScrollbar1" data-mcs-theme="dark" style={{ maxHeight: "90vh", overflowY: "scroll" }}>
                           <ul className="notification-list">
                              {notifications &&
                                 notifications.map((notification, index) => {
                                    console.log("notification__", notification);
                                    const cleanedDescription = notification.notification_data?.post_id?.description?.replace(/<br\s*\/?>/g, " ") || "";

                                    const truncatedDescription = cleanedDescription.length > 50 ? `${cleanedDescription.substring(0, 50)}...` : cleanedDescription;
                                    if (notification.notification_type == "post_reaction") {
                                       return (
                                          <Link href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                             <li key={index}>
                                                <div className="author-thumb">
                                                   {notification.notification_sender_id.profile_pic !== null ? (
                                                      <img src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`} className="comment-header-image-person" />
                                                   ) : (
                                                      <img
                                                         src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                         className="comment-header-image-person"
                                                      />
                                                   )}
                                                </div>
                                                <div className="notification-event">
                                                   <div>
                                                      <Link className="h6 notification-friend" href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                                         {notification.notification_sender_id.first_name} has reacted on your post
                                                      </Link>

                                                      <div className="" style={{ color: "black" }}>
                                                         {truncatedDescription}
                                                      </div>
                                                   </div>
                                                   <span className="notification-date" style={{ color: "black" }}>
                                                      <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                         {timeFormat(notification.createdAt)}
                                                      </time>
                                                   </span>
                                                </div>
                                                <span className="notification-icon">
                                                   <svg className="olymp-comments-post-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                   </svg>
                                                </span>
                                                <div className="more">
                                                   <svg className="olymp-three-dots-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                   </svg>
                                                   <svg className="olymp-little-delete">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                   </svg>
                                                </div>
                                             </li>
                                          </Link>
                                       );
                                    } else if (notification.notification_type === "post_commented") {
                                       return (
                                          <Link href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                             <li key={index}>
                                                <div className="author-thumb">
                                                   {notification.notification_sender_id.profile_pic !== null ? (
                                                      <img src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`} className="comment-header-image-person" />
                                                   ) : (
                                                      <img
                                                         src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                         className="comment-header-image-person"
                                                      />
                                                   )}
                                                </div>

                                                <div className="notification-event">
                                                   <div>
                                                      <a href="#" className="h6 notification-friend">
                                                         {notification.notification_sender_id.first_name} has commented on your post
                                                      </a>
                                                      <div className="" style={{ color: "black" }}>
                                                         {truncatedDescription}
                                                      </div>
                                                   </div>
                                                   <span className="notification-date" style={{ color: "black" }}>
                                                      <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                         {timeFormat(notification.createdAt)}
                                                      </time>
                                                   </span>
                                                </div>
                                                <span className="notification-icon">
                                                   <svg className="olymp-comments-post-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                   </svg>
                                                </span>
                                                <div className="more">
                                                   <svg className="olymp-three-dots-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                   </svg>
                                                   <svg className="olymp-little-delete">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                   </svg>
                                                </div>
                                             </li>
                                          </Link>
                                       );
                                    } else if (notification.notification_type === "shared_post") {
                                       return (
                                          <Link href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                             <li key={index}>
                                                <div className="author-thumb">
                                                   {/* <img
                                    src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`}
                                    alt='author'
                                  /> */}
                                                   {notification.notification_sender_id.profile_pic !== null ? (
                                                      <img src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`} className="comment-header-image-person" />
                                                   ) : (
                                                      <img
                                                         src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                         className="comment-header-image-person"
                                                      />
                                                   )}
                                                </div>
                                                <div className="notification-event">
                                                   <div>
                                                      <a href="#" className="h6 notification-friend">
                                                         {notification.notification_sender_id.first_name} has shared on your post
                                                      </a>
                                                      <div className="" style={{ color: "black" }}>
                                                         {truncatedDescription}
                                                      </div>
                                                   </div>
                                                   <span className="notification-date" style={{ color: "black" }}>
                                                      <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                         {timeFormat(notification.createdAt)}
                                                      </time>
                                                   </span>
                                                </div>
                                                <span className="notification-icon">
                                                   <svg className="olymp-comments-post-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                   </svg>
                                                </span>
                                                <div className="more">
                                                   <svg className="olymp-three-dots-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                   </svg>
                                                   <svg className="olymp-little-delete">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                   </svg>
                                                </div>
                                             </li>
                                          </Link>
                                       );
                                    } else if (notification.notification_type === "comment_reaction") {
                                       return (
                                          <Link href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                             <li key={index}>
                                                <div className="author-thumb">
                                                   {notification.notification_sender_id.profile_pic !== null ? (
                                                      <img src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`} className="comment-header-image-person" />
                                                   ) : (
                                                      <img
                                                         src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                         className="comment-header-image-person"
                                                      />
                                                   )}
                                                </div>
                                                <div className="notification-event">
                                                   <div>
                                                      <a href="#" className="h6 notification-friend">
                                                         {notification.notification_sender_id?.first_name} has reacted on your comment
                                                      </a>
                                                      <div>
                                                         {notification.notification_data?.comment_id?.comment_name?.length !== undefined &&
                                                         notification.notification_data.comment_id.comment_name.length > 50
                                                            ? `${notification.notification_data.comment_id.comment_name.substring(0, 50)}...`
                                                            : notification.notification_data?.comment_id?.comment_name}
                                                      </div>
                                                   </div>
                                                   <span className="notification-date" style={{ color: "black" }}>
                                                      <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                         {timeFormat(notification.createdAt)}
                                                      </time>
                                                   </span>
                                                </div>
                                                <span className="notification-icon">
                                                   <svg className="olymp-comments-post-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                   </svg>
                                                </span>
                                                <div className="more">
                                                   <svg className="olymp-three-dots-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                   </svg>
                                                   <svg className="olymp-little-delete">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                   </svg>
                                                </div>
                                             </li>
                                          </Link>
                                       );
                                    } else if (notification?.notification_type === "group_invitation") {
                                       if (notification?.message !== "accepted" && notification?.message !== "declined") {
                                          return (
                                             <li key={index}>
                                                <div className="author-thumb">
                                                   {notification?.notification_sender_id?._id !== null ? (
                                                      <img src={`${host}/uploads/${notification?.notification_sender_id?.profile_pic}`} className="comment-header-image-person" />
                                                   ) : (
                                                      <img
                                                         src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                         className="comment-header-image-person"
                                                      />
                                                   )}
                                                </div>

                                                <div className="notification-event">
                                                   <div>
                                                      <Link href={`/groupsinglePreview/${notification?.resource_object?.group?._id}`} className="h6 notification-friend">
                                                         {notification.notification_sender_id?.first_name} sent {notification?.resource_object?.group?.group_name} Group invitation
                                                      </Link>
                                                      <div>
                                                         {notification.notification_data?.comment_id?.comment_name?.length !== undefined &&
                                                         notification.notification_data.comment_id.comment_name.length > 50
                                                            ? `${notification.notification_data.comment_id.comment_name.substring(0, 50)}...`
                                                            : notification.notification_data?.comment_id?.comment_name}
                                                      </div>
                                                   </div>
                                                   <span className="notification-date" style={{ color: "black" }}>
                                                      <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                         {timeFormat(notification.createdAt)}
                                                      </time>
                                                   </span>
                                                </div>

                                                <div className="txt-center  d-flex justify-content-start mt-2 mx-4">
                                                   <div>
                                                      <button
                                                         className="btn btn-secondary btn-sm "
                                                         onClick={() =>
                                                            groupInvitation({
                                                               status: "accept",
                                                               invitationId: notification?.resource_id,
                                                               notification_id: notification._id,
                                                               type: "invite",
                                                            })
                                                         }
                                                      >
                                                         Accept
                                                      </button>
                                                   </div>
                                                   <div>
                                                      <button
                                                         className="btn btn-danger btn-sm  mx-2"
                                                         onClick={() =>
                                                            groupInvitation({
                                                               status: "decline",
                                                               invitationId: notification?.resource_id,
                                                               notification_id: notification._id,
                                                               type: "invite",
                                                            })
                                                         }
                                                      >
                                                         Decline
                                                      </button>
                                                   </div>
                                                </div>
                                                <span className="notification-icon"></span>
                                                <div className="more">
                                                   <svg className="olymp-three-dots-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                   </svg>
                                                </div>
                                             </li>
                                          );
                                       } else {
                                          return <p>{notification?.message}</p>;
                                       }
                                    } else if (notification?.notification_type === "group_invitation_status") {
                                       return (
                                          <Link href={`/groupsinglePreview/${notification?.resource_object?.group?._id}`}>
                                             <li key={index}>
                                                <div className="author-thumb">
                                                   {notification.notification_sender_id.profile_pic !== null ? (
                                                      <img src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`} className="comment-header-image-person" />
                                                   ) : (
                                                      <img
                                                         src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                         className="comment-header-image-person"
                                                      />
                                                   )}
                                                </div>

                                                <div className="notification-event">
                                                   <div>
                                                      <a href="#" className="h6 notification-friend">
                                                         {notification.notification_sender_id.first_name} {notification?.message} the{" "}
                                                         {notification?.resource_object?.group?.group_name} group invitation request
                                                      </a>
                                                      <div className="" style={{ color: "black" }}>
                                                         {truncatedDescription}
                                                      </div>
                                                   </div>
                                                   <span className="notification-date" style={{ color: "black" }}>
                                                      <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                         {timeFormat(notification.createdAt)}
                                                      </time>
                                                   </span>
                                                </div>
                                                <span className="notification-icon">
                                                   <svg className="olymp-comments-post-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                   </svg>
                                                </span>
                                                <div className="more">
                                                   <svg className="olymp-three-dots-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                   </svg>
                                                   <svg className="olymp-little-delete">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                   </svg>
                                                </div>
                                             </li>
                                          </Link>
                                       );
                                    } else if (notification?.notification_type === "group_joining") {
                                       if (notification?.message !== "accepted" && notification?.message !== "declined") {
                                          return (
                                             <li key={index}>
                                                <div className="author-thumb">
                                                   {notification?.notification_sender_id?._id !== null ? (
                                                      <img src={`${host}/uploads/${notification?.notification_sender_id?.profile_pic}`} className="comment-header-image-person" />
                                                   ) : (
                                                      <img
                                                         src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                         className="comment-header-image-person"
                                                      />
                                                   )}
                                                </div>

                                                <div className="notification-event">
                                                   <div>
                                                      <Link href={`/groupsinglePreview/${notification?.resource_object?.group?._id}`} className="h6 notification-friend">
                                                         {notification.notification_sender_id?.first_name} sent {notification?.resource_object?.group?.group_name} Group Joining
                                                         request
                                                      </Link>
                                                      <div>
                                                         {notification.notification_data?.comment_id?.comment_name?.length !== undefined &&
                                                         notification.notification_data.comment_id.comment_name.length > 50
                                                            ? `${notification.notification_data.comment_id.comment_name.substring(0, 50)}...`
                                                            : notification.notification_data?.comment_id?.comment_name}
                                                      </div>
                                                   </div>
                                                   <span className="notification-date" style={{ color: "black" }}>
                                                      <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                         {timeFormat(notification.createdAt)}
                                                      </time>
                                                   </span>
                                                </div>

                                                <div className="txt-center  d-flex justify-content-start mt-2 mx-4">
                                                   <div>
                                                      <button
                                                         className="btn btn-secondary btn-sm "
                                                         onClick={() =>
                                                            groupInvitation({
                                                               status: "accept",
                                                               invitationId: notification?.resource_id,
                                                               notification_id: notification._id,
                                                               type: "join",
                                                            })
                                                         }
                                                      >
                                                         Accept
                                                      </button>
                                                   </div>
                                                   <div>
                                                      <button
                                                         className="btn btn-danger btn-sm  mx-2"
                                                         onClick={() =>
                                                            groupInvitation({
                                                               status: "decline",
                                                               invitationId: notification?.resource_id,
                                                               notification_id: notification._id,
                                                               type: "join",
                                                            })
                                                         }
                                                      >
                                                         Decline
                                                      </button>
                                                   </div>
                                                </div>
                                                <span className="notification-icon"></span>
                                                <div className="more">
                                                   <svg className="olymp-three-dots-icon">
                                                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                   </svg>
                                                </div>
                                             </li>
                                          );
                                       } else {
                                          return <p>{notification?.message}</p>;
                                       }
                                    }
                                 })}
                           </ul>
                        </div>
                     </div>

                     <div className="">
                        <header className="header" id="site-header">
                           <Link href="/newsfeed">
                              <div className="page-title">
                                 <img src={PagLogo.src} alt="logo" className="site-logo" />
                              </div>
                           </Link>

                           <div className="header-content-wrapper ">
                              <div className="settingspage-nav-icon">
                                 <form className="search-bar w-search rounded-3 ">
                                    <div className="form-group with-button ">
                                       <button className="">
                                          <Image src={searchIcon.src} width="24" height="24" />
                                       </button>
                                       <input className="form-control js-user-search rounded-1 " placeholder=" Search here people of pages" type="text" />
                                    </div>
                                 </form>

                                 {isPageSettingRoute && (
                                    <div className="settingspage-nav-icon-div">
                                       <div className="settingspage-nav-icon-div"></div>
                                    </div>
                                 )}
                                 {isOtherRoute1 && (
                                    <div className="other-route1-icons">
                                       <div className="settingspage-nav-icon-div"></div>
                                    </div>
                                 )}
                                 {isOtherRoute2 && (
                                    <div className="other-route2-icons">
                                       <div className="settingspage-nav-icon-div"></div>
                                    </div>
                                 )}
                                 {isOtherRoute3 && (
                                    <div className="other-route3-icons">
                                       <div className="settingspage-nav-icon-div"></div>
                                    </div>
                                 )}
                              </div>

                              {/* <a href="#" className="link-find-friend">
            Find Friends
          </a> */}
                              <div className="control-block">
                                 <div className="control-icon more has-items">
                                    <Image src={groupSvg.src} width="24" height="24" className="bi bi-emoji-smile-fill olymp-happy-face-icon custom-icon-block" />
                                    {friendCount == 0 ? (
                                       <div className="label-avatar bg-theme-colors">{friendCount} </div>
                                    ) : (
                                       <div className="label-avatar bg-theme-color">{friendCount} </div>
                                    )}
                                    <div className="more-dropdown more-with-triangle triangle-top-center">
                                       <div className="ui-block-title ui-block-title-small">
                                          <h6 className="title">FRIEND REQUESTS</h6>
                                          <a href="#">Find Friends</a>
                                          <a href="#">Settings</a>
                                       </div>
                                       <div className="mCustomScrollbar" data-mcs-theme="dark">
                                          {friendlist.map((item, i) => {
                                             return (
                                                <ul className="notification-list friend-requests">
                                                   <li>
                                                      <div className="author-thumb">
                                                         {/* <img src={`${host}/uploads/${item.user_id
                                .profile_pic}`} alt='author' /> */}

                                                         {item.user_id.profile_pic !== null ? (
                                                            <img src={`${host}/uploads/${item.user_id.profile_pic}`} className="comment-header-image-person" />
                                                         ) : (
                                                            <img
                                                               src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                               className="comment-header-image-person"
                                                            />
                                                         )}
                                                      </div>
                                                      <div className="notification-event px-1">
                                                         <a href="#" className="h6 notification-friend">
                                                            {item.user_id.first_name}
                                                         </a>
                                                         <span className="chat-message-item">{/* Mutual Friend: Rakib Hossain */}</span>
                                                      </div>

                                                      <div className="txt-center  d-flex justify-content-start mt-2 mx-4">
                                                         <div>
                                                            <button className="btn btn-secondary btn-sm " onClick={() => acceptRequest(item._id, 1)}>
                                                               Accept
                                                            </button>
                                                         </div>
                                                         <div>
                                                            <button className="btn btn-danger btn-sm  mx-2" onClick={() => acceptRequest(item._id, 1)}>
                                                               Decline
                                                            </button>
                                                         </div>
                                                      </div>
                                                      <span className="notification-icon">
                                                         {/* <a href='#' className='accept-request'>
                          <span className='icon-add without-text'>
                            <svg className='olymp-happy-face-icon'>
                              <use xlinkHref='svg-icons/sprites/icons.svg#olymp-happy-face-icon' />
                            </svg>
                          </span>
                        </a> */}

                                                         {/* <button className="btn btn-success btn-sm px-1 py-1">Accept</button>
                        <button className="btn btn-danger btn-sm px-1 py-1 mx-2">Reject</button> */}
                                                         {/* <a href='#' className='accept-request request-del'>
                          <span className='icon-minus'>
                            <svg className='olymp-happy-face-icon'>
                              <use xlinkHref='svg-icons/sprites/icons.svg#olymp-happy-face-icon' />
                            </svg>
                          </span>
                        </a> */}
                                                      </span>
                                                      <div className="more">
                                                         <svg className="olymp-three-dots-icon">
                                                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                         </svg>
                                                      </div>
                                                   </li>
                                                   {/* <li>
                      <div className='author-thumb'>
                        <img src={smileimgtwo.src} alt='author' />
                      </div>
                      <div className='notification-event'>
                        <a href='#' className='h6 notification-friend'>
                          Tony Stevens
                        </a>
                        <span className='chat-message-item'>
                          4 Friends in Common
                        </span>
                      </div>
                      <span className='notification-icon'>
                        <a href='#' className='accept-request'>
                          <span className='icon-add without-text'>
                            <svg className='olymp-happy-face-icon'>
                              <use xlinkHref='svg-icons/sprites/icons.svg#olymp-happy-face-icon' />
                            </svg>
                          </span>
                        </a>
                        <a href='#' className='accept-request request-del'>
                          <span className='icon-minus'>
                            <svg className='olymp-happy-face-icon'>
                              <use xlinkHref='svg-icons/sprites/icons.svg#olymp-happy-face-icon' />
                            </svg>
                          </span>
                        </a>
                      </span>
                      <div className='more'>
                        <svg className='olymp-three-dots-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-three-dots-icon' />
                        </svg>
                      </div>
                    </li>
                    <li className='accepted'>
                      <div className='author-thumb'>
                        <img src={smileimgthree.src} alt='author' />
                      </div>
                      <div className='notification-event'>
                        You and{" "}
                        <a href='#' className='h6 notification-friend'>
                          Mary Jane Stark
                        </a>{" "}
                        just became friends. Write on{" "}
                        <a href='#' className='notification-link'>
                          her wall
                        </a>
                        .
                      </div>
                      <span className='notification-icon'>
                        <svg className='olymp-happy-face-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-happy-face-icon' />
                        </svg>
                      </span>
                      <div className='more'>
                        <svg className='olymp-three-dots-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-three-dots-icon' />
                        </svg>
                        <svg className='olymp-little-delete'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-little-delete' />
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className='author-thumb'>
                        <img src='img/avatar58-sm.jpg' alt='author' />
                      </div>
                      <div className='notification-event'>
                        <a href='#' className='h6 notification-friend'>
                          Stagg Clothing
                        </a>
                        <span className='chat-message-item'>
                          9 Friends in Common
                        </span>
                      </div>
                      <span className='notification-icon'>
                        <a href='#' className='accept-request'>
                          <span className='icon-add without-text'>
                            <svg className='olymp-happy-face-icon'>
                              <use xlinkHref='svg-icons/sprites/icons.svg#olymp-happy-face-icon' />
                            </svg>
                          </span>
                        </a>
                        <a href='#' className='accept-request request-del'>
                          <span className='icon-minus'>
                            <svg className='olymp-happy-face-icon'>
                              <use xlinkHref='svg-icons/sprites/icons.svg#olymp-happy-face-icon' />
                            </svg>
                          </span>
                        </a>
                      </span>
                      <div className='more'>
                        <svg className='olymp-three-dots-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-three-dots-icon' />
                        </svg>
                      </div>
                    </li> */}
                                                </ul>
                                             );
                                          })}
                                       </div>

                                       <Link href="/friendsrequest" className="view-all bg-primary">
                                          See All Friend Requests
                                       </Link>
                                    </div>
                                 </div>
                                 <div className="control-icon more has-items">
                                    <Image src={chatSvg.src} width="24" height="24" className="bi bi-emoji-smile-fill olymp-happy-face-icon custom-icon-block" />

                                    <div className="label-avatar bg-theme-colorsssssssssssssss">0</div>
                                    {/* <div className='more-dropdown more-with-triangle triangle-top-center'>
                <div className='ui-block-title ui-block-title-small'>
                  <h6 className='title'>Chat / Messages</h6>
                  <a href='#'>Mark all as read</a>
                  <a href='#'>Settings</a>
                </div>
                <div className='mCustomScrollbar' data-mcs-theme='dark'>
                  <ul className='notification-list chat-message'>
                    <li className='message-unread'>
                      <div className='author-thumb'>
                        <img src='img/avatar59-sm.jpg' alt='author' />
                      </div>
                      <div className='notification-event'>
                        <a href='#' className='h6 notification-friend'>
                          Diana Jameson
                        </a>
                        <span className='chat-message-item'>
                          Hi James! It’s Diana, I just wanted to let you know
                          that we have to reschedule...
                        </span>
                        <span className='notification-date'>
                          <time
                            className='entry-date updated'
                            dateTime='2004-07-24T18:18'>
                            4 hours ago
                          </time>
                        </span>
                      </div>
                      <span className='notification-icon'>
                        <svg className='olymp-chat---messages-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-chat---messages-icon' />
                        </svg>
                      </span>
                      <div className='more'>
                        <svg className='olymp-three-dots-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-three-dots-icon' />
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className='author-thumb'>
                        <img src='img/avatar60-sm.jpg' alt='author' />
                      </div>
                      <div className='notification-event'>
                        <a href='#' className='h6 notification-friend'>
                          Jake Parker
                        </a>
                        <span className='chat-message-item'>
                          Great, I’ll see you tomorrow!.
                        </span>
                        <span className='notification-date'>
                          <time
                            className='entry-date updated'
                            dateTime='2004-07-24T18:18'>
                            4 hours ago
                          </time>
                        </span>
                      </div>
                      <span className='notification-icon'>
                        <svg className='olymp-chat---messages-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-chat---messages-icon' />
                        </svg>
                      </span>
                      <div className='more'>
                        <svg className='olymp-three-dots-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-three-dots-icon' />
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className='author-thumb'>
                        <img src='img/avatar61-sm.jpg' alt='author' />
                      </div>
                      <div className='notification-event'>
                        <a href='#' className='h6 notification-friend'>
                          Elaine Dreyfuss
                        </a>
                        <span className='chat-message-item'>
                          We’ll have to check that at the office and see if the
                          client is on board with...
                        </span>
                        <span className='notification-date'>
                          <time
                            className='entry-date updated'
                            dateTime='2004-07-24T18:18'>
                            Yesterday at 9:56pm
                          </time>
                        </span>
                      </div>
                      <span className='notification-icon'>
                        <svg className='olymp-chat---messages-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-chat---messages-icon' />
                        </svg>
                      </span>
                      <div className='more'>
                        <svg className='olymp-three-dots-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-three-dots-icon' />
                        </svg>
                      </div>
                    </li>
                    <li className='chat-group'>
                      <div className='author-thumb'>
                        <img src='img/avatar11-sm.jpg' alt='author' />
                        <img src='img/avatar12-sm.jpg' alt='author' />
                        <img src='img/avatar13-sm.jpg' alt='author' />
                        <img src='img/avatar10-sm.jpg' alt='author' />
                      </div>
                      <div className='notification-event'>
                        <a href='#' className='h6 notification-friend'>
                          You, Faye, Ed &amp; Jet +3
                        </a>
                        <span className='last-message-author'>Ed:</span>
                        <span className='chat-message-item'>
                          Yeah! Seems fine by me!
                        </span>
                        <span className='notification-date'>
                          <time
                            className='entry-date updated'
                            dateTime='2004-07-24T18:18'>
                            March 16th at 10:23am
                          </time>
                        </span>
                      </div>
                      <span className='notification-icon'>
                        <svg className='olymp-chat---messages-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-chat---messages-icon' />
                        </svg>
                      </span>
                      <div className='more'>
                        <svg className='olymp-three-dots-icon'>
                          <use xlinkHref='svg-icons/sprites/icons.svg#olymp-three-dots-icon' />
                        </svg>
                      </div>
                    </li>
                  </ul>
                </div>
                <a href='#' className='view-all bg-purple'>
                  View All Messages
                </a>
              </div> */}
                                 </div>

                                 <div
                                    className="control-icon more has-items "
                                    // onMouseEnter={seenNotfications}
                                 >
                                    <Image src={notificationSvg.src} width="24" height="24" className="bi bi-app-indicator custom-icon-block" />
                                    {notifications.filter((item) => item.notification_seen == false).length == 0 ? (
                                       <div className="label-avatar bg-theme-colors">
                                          {notifications.filter((item) => item.notification_seen == false).length}
                                          {/* {seenNotificationCount !== undefined && seenNotificationCount} */}
                                       </div>
                                    ) : (
                                       <div className="label-avatar bg-theme-color">
                                          {notifications.filter((item) => item.notification_seen == false).length}
                                          {/* {seenNotificationCount !== undefined && seenNotificationCount} */}
                                       </div>
                                    )}

                                    <div className="more-dropdown more-with-triangle triangle-top-center">
                                       {/* <div className='ui-block-title ui-block-title-small'>
                  <h6 className='title'>Notifications</h6>
                  <a href='#'>Mark all as read</a>
                  <a href='#'>Settings</a>
                </div> */}
                                       <div className="mCustomScrollbar1" data-mcs-theme="dark" style={{ maxHeight: "40vh", overflowY: "scroll" }}>
                                          <ul className="notification-list">
                                             {notifications &&
                                                notifications.map((notification, index) => {
                                                   const cleanedDescription = notification.notification_data?.post_id?.description?.replace(/<br\s*\/?>/g, " ") || "";

                                                   const truncatedDescription = cleanedDescription.length > 50 ? `${cleanedDescription.substring(0, 50)}...` : cleanedDescription;
                                                   if (notification.notification_type == "post_reaction") {
                                                      return (
                                                         <Link href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                                            <li key={index}>
                                                               <div className="author-thumb">
                                                                  {notification.notification_sender_id.profile_pic !== null ? (
                                                                     <img
                                                                        src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`}
                                                                        className="comment-header-image-person"
                                                                     />
                                                                  ) : (
                                                                     <img
                                                                        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                                        className="comment-header-image-person"
                                                                     />
                                                                  )}
                                                               </div>
                                                               <div className="notification-event">
                                                                  <div>
                                                                     <Link
                                                                        className="h6 notification-friend"
                                                                        href={`/view-single-post/${notification.notification_data?.post_id?._id}`}
                                                                     >
                                                                        {notification.notification_sender_id.first_name} has reacted on your post
                                                                     </Link>

                                                                     <div className="" style={{ color: "black" }}>
                                                                        {truncatedDescription}
                                                                     </div>
                                                                  </div>
                                                                  <span className="notification-date" style={{ color: "black" }}>
                                                                     <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                                        {timeFormat(notification.createdAt)}
                                                                     </time>
                                                                  </span>
                                                               </div>
                                                               <span className="notification-icon">
                                                                  <svg className="olymp-comments-post-icon">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                                  </svg>
                                                               </span>
                                                               <div className="more">
                                                                  <svg className="olymp-three-dots-icon">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                                  </svg>
                                                                  <svg className="olymp-little-delete">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                                  </svg>
                                                               </div>
                                                            </li>
                                                         </Link>
                                                      );
                                                   } else if (notification.notification_type === "post_commented") {
                                                      return (
                                                         <Link href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                                            <li key={index}>
                                                               <div className="author-thumb">
                                                                  {notification.notification_sender_id.profile_pic !== null ? (
                                                                     <img
                                                                        src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`}
                                                                        className="comment-header-image-person"
                                                                     />
                                                                  ) : (
                                                                     <img
                                                                        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                                        className="comment-header-image-person"
                                                                     />
                                                                  )}
                                                               </div>

                                                               <div className="notification-event">
                                                                  <div>
                                                                     <a href="#" className="h6 notification-friend">
                                                                        {notification.notification_sender_id.first_name} has commented on your post
                                                                     </a>
                                                                     <div className="" style={{ color: "black" }}>
                                                                        {truncatedDescription}
                                                                     </div>
                                                                  </div>
                                                                  <span className="notification-date" style={{ color: "black" }}>
                                                                     <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                                        {timeFormat(notification.createdAt)}
                                                                     </time>
                                                                  </span>
                                                               </div>
                                                               <span className="notification-icon">
                                                                  <svg className="olymp-comments-post-icon">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                                  </svg>
                                                               </span>
                                                               <div className="more">
                                                                  <svg className="olymp-three-dots-icon">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                                  </svg>
                                                                  <svg className="olymp-little-delete">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                                  </svg>
                                                               </div>
                                                            </li>
                                                         </Link>
                                                      );
                                                   } else if (notification.notification_type === "shared_post") {
                                                      return (
                                                         <Link href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                                            <li key={index}>
                                                               <div className="author-thumb">
                                                                  {/* <img
                                    src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`}
                                    alt='author'
                                  /> */}
                                                                  {notification.notification_sender_id.profile_pic !== null ? (
                                                                     <img
                                                                        src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`}
                                                                        className="comment-header-image-person"
                                                                     />
                                                                  ) : (
                                                                     <img
                                                                        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                                        className="comment-header-image-person"
                                                                     />
                                                                  )}
                                                               </div>
                                                               <div className="notification-event">
                                                                  <div>
                                                                     <a href="#" className="h6 notification-friend">
                                                                        {notification.notification_sender_id.first_name} has shared on your post
                                                                     </a>
                                                                     <div className="" style={{ color: "black" }}>
                                                                        {truncatedDescription}
                                                                     </div>
                                                                  </div>
                                                                  <span className="notification-date" style={{ color: "black" }}>
                                                                     <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                                        {timeFormat(notification.createdAt)}
                                                                     </time>
                                                                  </span>
                                                               </div>
                                                               <span className="notification-icon">
                                                                  <svg className="olymp-comments-post-icon">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                                  </svg>
                                                               </span>
                                                               <div className="more">
                                                                  <svg className="olymp-three-dots-icon">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                                  </svg>
                                                                  <svg className="olymp-little-delete">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                                  </svg>
                                                               </div>
                                                            </li>
                                                         </Link>
                                                      );
                                                   } else if (notification.notification_type === "comment_reaction") {
                                                      return (
                                                         <Link href={`/view-single-post/${notification.notification_data?.post_id?._id}`}>
                                                            <li key={index}>
                                                               <div className="author-thumb">
                                                                  {notification.notification_sender_id.profile_pic !== null ? (
                                                                     <img
                                                                        src={`${host}/uploads/${notification.notification_sender_id.profile_pic}`}
                                                                        className="comment-header-image-person"
                                                                     />
                                                                  ) : (
                                                                     <img
                                                                        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                                        className="comment-header-image-person"
                                                                     />
                                                                  )}
                                                               </div>
                                                               <div className="notification-event">
                                                                  <div>
                                                                     <a href="#" className="h6 notification-friend">
                                                                        {notification.notification_sender_id?.first_name} has reacted on your comment
                                                                     </a>
                                                                     <div style={{ color: "black" }}>
                                                                        {notification.notification_data?.comment_id?.comment_name?.length !== undefined &&
                                                                        notification.notification_data.comment_id.comment_name.length > 50
                                                                           ? `${notification.notification_data.comment_id.comment_name.substring(0, 50)}...`
                                                                           : notification.notification_data?.comment_id?.comment_name}
                                                                     </div>
                                                                  </div>
                                                                  <span className="notification-date" style={{ color: "black" }}>
                                                                     <time className="entry-date updated" dateTime="2004-07-24T18:18">
                                                                        {timeFormat(notification.createdAt)}
                                                                     </time>
                                                                  </span>
                                                               </div>
                                                               <span className="notification-icon">
                                                                  <svg className="olymp-comments-post-icon">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                                                                  </svg>
                                                               </span>
                                                               <div className="more">
                                                                  <svg className="olymp-three-dots-icon">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                                                  </svg>
                                                                  <svg className="olymp-little-delete">
                                                                     <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                                                                  </svg>
                                                               </div>
                                                            </li>
                                                         </Link>
                                                      );
                                                   }
                                                })}
                                          </ul>
                                       </div>
                                       {/* <a className="view-all bg-primary">View All Notifications</a> */}
                                    </div>
                                 </div>

                                 <div className="author-page author vcard inline-items more">
                                    <div className="author-thumb">
                                       <div className="nav-news-profile">
                                          <Link href={`/profile/${userName}`}>
                                             {/* <img alt="author" className="avatar " /> */}

                                             {userImage !== null ? (
                                                <img
                                                   alt="author"
                                                   src={`${host}/uploads/${userImage}`}
                                                   className="avatar "
                                                   style={{
                                                      width: "40px",
                                                      height: "40px",
                                                      objectFit: "cover",
                                                   }}
                                                />
                                             ) : (
                                                <img
                                                   src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                   className="avatar "
                                                   style={{
                                                      width: "40px",
                                                      height: "40px",
                                                      objectFit: "cover",
                                                   }}
                                                />
                                             )}
                                          </Link>

                                          <Image src={navSvg.src} className="bi bi-caret-down " width="16" height="16" style={{ marginLeft: 6 }} />
                                       </div>
                                       <div className="more-dropdown more-with-triangle">
                                          <div className="mCustomScrollbar" data-mcs-theme="dark">
                                             <div className="ui-block-title ui-block-title-small">
                                                <h6 className="title">Your Account</h6>
                                             </div>
                                             <ul className="account-settings">
                                                <li>
                                                   <Link href={`/profile/${userName}`}>
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="5.85"
                                                         height="10.95"
                                                         fill="currentColor"
                                                         className="bi bi-person"
                                                         viewBox="0 0 16 16"
                                                      >
                                                         <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                                      </svg>
                                                      <span>My Profile </span>
                                                   </Link>
                                                   <Link href="/accountsettings">
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="16"
                                                         height="16"
                                                         fill="currentColor"
                                                         className="bi bi-gear-wide-connected"
                                                         viewBox="0 0 16 16"
                                                      >
                                                         <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
                                                      </svg>
                                                      <span>Profile Settings</span>
                                                   </Link>
                                                </li>

                                                <li>
                                                   <a onClick={handleLogout}>
                                                      <svg
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="16"
                                                         height="16"
                                                         fill="currentColor"
                                                         className="bi bi-box-arrow-right"
                                                         viewBox="0 0 16 16"
                                                      >
                                                         <path
                                                            fill-rule="evenodd"
                                                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                                                         />
                                                         <path
                                                            fill-rule="evenodd"
                                                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                                                         />
                                                      </svg>
                                                      <span>Log Out</span>
                                                   </a>
                                                </li>
                                             </ul>
                                             <div className="ui-block-title ui-block-title-small">
                                                <h6 className="title">Chat Settings</h6>
                                             </div>
                                             <ul className="chat-settings">
                                                <li>
                                                   <a href="#">
                                                      <span className="icon-status online" />
                                                      <span>Online</span>
                                                   </a>
                                                </li>
                                                <li>
                                                   <a href="#">
                                                      <span className="icon-status away" />
                                                      <span>Away</span>
                                                   </a>
                                                </li>
                                                <li>
                                                   <a href="#">
                                                      <span className="icon-status disconected" />
                                                      <span>Disconnected</span>
                                                   </a>
                                                </li>
                                                <li>
                                                   <a href="#">
                                                      <span className="icon-status status-invisible" />
                                                      <span>Invisible</span>
                                                   </a>
                                                </li>
                                             </ul>
                                          </div>
                                       </div>
                                    </div>
                                    <Link href="/profile/username" className="author-name fn">
                                       <div className="author-title">
                                          <svg className="olymp-dropdown-arrow-icon">
                                             <use xlinkHref="svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon" />
                                          </svg>
                                       </div>
                                       <span className="author-subtitle">{/* SPACE COWBOY */}</span>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </header>

                        <div className=" mobile-header-full-div container-fluid">
                           <div className="mobile-header ">
                              <div className="mobile-top-header">
                                 <div className="mobile-top-logo-div ">
                                    <div className="mobile-top-header">
                                       <Image className="" src={qLogoMobile} width={150} height={100} alt="" />
                                    </div>

                                    <div className="mobile-top-header-svg">
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="23"
                                          height="27"
                                          fill="#0B3243"
                                          className="bi bi-plus-lg mobile-header-svg"
                                          viewBox="0 0 16 16"
                                       >
                                          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                       </svg>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="23" height="27" fill="#0B3243" className="bi bi-search mobile-header-svg" viewBox="0 0 16 16">
                                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                       </svg>
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="23"
                                          height="27"
                                          fill="#0B3743"
                                          class="bi bi-chat-right-dots  mobile-header-svg"
                                          viewBox="0 0 16 16"
                                       >
                                          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                                          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                       </svg>
                                    </div>
                                 </div>

                                 <div className="mobile--second-top-logo-div ">
                                    <div className="mobile-home-svg">
                                       <Link href="/newsfeed">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="#78B1CE" class="bi bi-house-door " viewBox="0 0 16 16">
                                             <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                                          </svg>
                                       </Link>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#78B1CE" class="bi bi-camera-reels" viewBox="0 0 16 16">
                                       <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                                       <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                                       <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#78B1CE" class="bi bi-people" viewBox="0 0 16 16">
                                       <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#78B1CE" class="bi bi-bell" viewBox="0 0 16 16">
                                       <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FF0707" class="bi bi-wallet" viewBox="0 0 16 16">
                                       <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                                    </svg>
                                    <Link href="/profile/anik.ba">
                                       <img className="mobile-av-auth-pic" src={dpProfile.src} alt="" />
                                    </Link>

                                    <div>
                                       {["right"].map((anchor) => (
                                          <React.Fragment key={anchor}>
                                             <div onClick={toggleDrawer(anchor, true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" fill="#78B1CE" class="bi bi-blockquote-left" viewBox="0 0 16 16">
                                                   <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.79-5.373c.112-.078.26-.17.444-.275L3.524 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282c.024-.203.065-.37.123-.498a1.38 1.38 0 0 1 .252-.37 1.94 1.94 0 0 1 .346-.298zm2.167 0c.113-.078.262-.17.445-.275L5.692 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282a1.75 1.75 0 0 1 .118-.492c.058-.13.144-.254.257-.375a1.94 1.94 0 0 1 .346-.3z" />
                                                </svg>
                                             </div>
                                             <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
                                                <Leftsidebar />
                                             </SwipeableDrawer>
                                          </React.Fragment>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* <Newsfeed /> */}
                     </div>
                  </main>

                  <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
                     <Leftsidebar />
                  </aside>
                  <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
                     <div className="ui-block-news ">
                        {/* W-Weather */}
                        <TopNewsCaro />
                     </div>

                     <div className="ui-block">
                        <div className="ui-block-title">
                           <h6 className="title">Pages You May Like</h6>
                        </div>
                        {/* W-Friend-Pages-Added */}
                        <ul className="">
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="people-added-img-text">
                                    <div className="author-thumb">
                                       <img src={feedauththree.src} alt="author" />
                                    </div>
                                    <div className="texts">
                                       <h6>Zara</h6>
                                       <p>Fashion Brand</p>
                                    </div>
                                 </div>

                                 <div className="follow-btn-div">
                                    <button className="follow-btn">Follow</button>
                                 </div>
                              </div>
                           </li>
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="people-added-img-text">
                                    <div className="author-thumb">
                                       <img src={feedauththree.src} alt="author" />
                                    </div>
                                    <div className="texts">
                                       <h6>Zara</h6>
                                       <p>Fashion Brand</p>
                                    </div>
                                 </div>

                                 <div className="follow-btn-div">
                                    <button className="follow-btn">Follow</button>
                                 </div>
                              </div>
                           </li>
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="people-added-img-text">
                                    <div className="author-thumb">
                                       <img src={feedauththree.src} alt="author" />
                                    </div>
                                    <div className="texts">
                                       <h6>Zara</h6>
                                       <p>Fashion Brand</p>
                                    </div>
                                 </div>

                                 <div className="follow-btn-div">
                                    <button className="follow-btn">Follow</button>
                                 </div>
                              </div>
                           </li>
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="people-added-img-text">
                                    <div className="author-thumb">
                                       <img src={feedauththree.src} alt="author" />
                                    </div>
                                    <div className="texts">
                                       <h6>Zara</h6>
                                       <p>Fashion Brand</p>
                                    </div>
                                 </div>

                                 <div className="follow-btn-div">
                                    <button className="follow-btn">Follow</button>
                                 </div>
                              </div>
                           </li>
                        </ul>
                        {/* .. end W-Friend-Pages-Added */}
                     </div>
                  </aside>
                  {/* ... end Left Sidebar */}
                  {/* Right Sidebar */}

                  <aside className="col col-xl-2 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12 first-left-menu">
                     <div className="ui-block">
                        {/* ... end W-Birthsday-Alert */}
                        <div className="trending-div">
                           <h6 className="trending-tag">Trending Topic</h6>
                           <ul className="tag-cloud">
                              <li className="tag-small">#organization</li>
                              <li className="tag-medium">#indigo</li>
                              <li className="tag-large">#verma_traders</li>
                              <li className="tag-medium">#alignments</li>
                              <li className="tag-small">#cloud</li>
                              <li className="tag-small">#technology</li>
                              <br />
                              <li className="tag-small">#company</li>
                              <li className="tag-small">#doller</li>
                              <br /> <li className="tag-small">#information</li>
                              <li className="tag-small">#media</li>
                              <li className="tag-small">#content</li>
                              <li className="tag-small">#mouthguard</li>
                              <li className="tag-small">#donation</li>
                              <li className="tag-small">#zoom</li>
                              <li className="tag-small">#flavour</li>
                              <li className="tag-small">#cream</li>
                           </ul>
                        </div>
                     </div>

                     <div className="ui-block">
                        <FeatureUser />
                     </div>

                     <div className="ui-block">
                        <div className="ui-block-title">
                           <h6 className="title">Top Post</h6>
                           {/* <a href="#" className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                </a> */}
                        </div>
                        {/* W-Activity-Feed */}
                        <ul className="">
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="author-thumb">
                                    <img src={feedauththree.src} alt="author" />
                                 </div>
                                 <div className="top-text-div">
                                    <h5 className="top-text">
                                       <strong>Marina Polson</strong> Captured a stunning sunset over the horizon Photo
                                    </h5>
                                    <p>2 min ago</p>
                                 </div>
                              </div>
                           </li>
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="author-thumb">
                                    <img src={feedauththree.src} alt="author" />
                                 </div>
                                 <div className="top-text-div">
                                    <h5 className="top-text">
                                       <strong>Marina Polson</strong> Captured a stunning sunset over the horizon Photo
                                    </h5>
                                    <p>2 min ago</p>
                                 </div>
                              </div>
                           </li>
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="author-thumb">
                                    <img src={feedauththree.src} alt="author" />
                                 </div>
                                 <div className="top-text-div">
                                    <h5 className="top-text">
                                       <strong>Marina Polson</strong> Captured a stunning sunset over the horizon Photo
                                    </h5>
                                    <p>2 min ago</p>
                                 </div>
                              </div>
                           </li>
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="author-thumb">
                                    <img src={feedauththree.src} alt="author" />
                                 </div>
                                 <div className="top-text-div">
                                    <h5 className="top-text">
                                       <strong>Marina Polson</strong> Captured a stunning sunset over the horizon Photo
                                    </h5>
                                    <p>2 min ago</p>
                                 </div>
                              </div>
                           </li>
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="author-thumb">
                                    <img src={feedauththree.src} alt="author" />
                                 </div>
                                 <div className="top-text-div">
                                    <h5 className="top-text">
                                       <strong>Marina Polson</strong> Captured a stunning sunset over the horizon Photo
                                    </h5>
                                    <p>2 min ago</p>
                                 </div>
                              </div>
                           </li>
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="author-thumb">
                                    <img src={feedauththree.src} alt="author" />
                                 </div>
                                 <div className="top-text-div">
                                    <h5 className="top-text">
                                       <strong>Marina Polson</strong> Captured a stunning sunset over the horizon Photo
                                    </h5>
                                    <p>2 min ago</p>
                                 </div>
                              </div>
                           </li>
                        </ul>
                        {/* .. end W-Activity-Feed */}
                     </div>
                     <div className="ui-block">
                        {/* W-Action */}
                        <div className="widget w-action">
                           {/* <img src="/QP_logo.png" alt="Olympus" /> */}
                           <div className="content">
                              <h4 className="title">Quntum Possibilities</h4>
                              <span>WORLD BIGGEST DECENTRALIZED SOCIAL NETWORK</span>
                              <Link href="/register" className="newsfeed-register-btn">
                                 <p className="register-btn"> Register Now!</p>
                              </Link>
                           </div>
                        </div>
                        {/* ... end W-Action */}
                     </div>
                  </aside>
               </div>
            </div>
         </Masterdashboardlayout>
      </div>
   );
};

export default page;
