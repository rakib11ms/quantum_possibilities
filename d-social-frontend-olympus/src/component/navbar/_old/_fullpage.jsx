'use client';
import React, { useEffect, useState, useRef } from 'react';
import PagLogo from '../../../public/qPlOgO.png';
import { toast } from 'react-toastify';
import './Navbar.modules.css';
import { useRouter, usePathname, useSearchParams, useServerInsertedHTML } from 'next/navigation';
import dpProfile from '../../assets/img/author-page.jpg';
import axiosInstance from '../../../utils/axios';
import Link from 'next/link';
import NavGroup from '../../../public/navGroup.svg';
import Image from 'next/image';
import { host } from '@/environment';
import { useSelector } from 'react-redux';
import AllNotification from './AllNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MessengerPopupFixedMessage from '../AllMessengers/MessengerPopupFixedMessage';
import timeFormat from '../../../utils/CommentTimeFormat';
import PersonIcon from '../AllMessengers/MessengerMasterLayout/_ui/icons/PersonIcon';
import NotificationIconSmall from '../AllMessengers/MessengerMasterLayout/_ui/icons/NotificationIconSmall';
import BlockIcon2 from '../AllMessengers/MessengerMasterLayout/_ui/icons/BlockIcon2';

const page = ({ headerName }) => {
   const [userId, setUserId] = useState('');
   const cartItems = useSelector((state) => state.cart.items);
   const [menuVisible, setMenuVisible] = useState(false);
   const menuRef = useRef(null);
   const [menuVisibleNoti, setMenuVisibleNoti] = useState(false);
   const menuRefNoti = useRef(null);
   const [activeDiv, setActiveDiv] = useState(1);
   const [userID, setUserID] = useState(null);
   const [notifications, setNotifications] = useState([]);
   const [unSeenNotification, setUnSeenNotification] = useState('');
   const [userName, setUserName] = React.useState('');
   const [fullName, setFullName] = React.useState('');
   const [userImage, setuserImage] = React.useState('');
   const [isPageSettingRoute, setIsPageSettingRoute] = useState(false);
   const [isOtherRoute1, setIsOtherRoute1] = useState(false);
   const [isOtherRoute2, setIsOtherRoute2] = useState(false);
   const [isOtherRoute3, setIsOtherRoute3] = useState(false);
   const [friendlist, setFriendList] = React.useState([]);
   const [friendCount, setFriendCount] = React.useState([]);
   const [messageShowHide, setMessageShowHide] = useState(false);
   const [allUsersLastMessage, setAllUsersLastMessage] = useState([]);
   const [messageReceiverId, setMessageReceiverId] = useState('');
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [messageNotifications, setMessageNotifications] = useState([]);
   const [messageSenderId, setMessageSenderId] = useState('');

   const handleAvatarClick = () => {
      setMenuVisible(!menuVisible);
   };

   const triggerMessageNotification = useSelector(
      (state) => state.fetchAllPrivateOneToOneMessage.allPrivateOneToOneMessage,
   );

   const handleAvatarClickNoti = () => {
      setMenuVisibleNoti(!menuVisibleNoti);
   };

   const handleTextClick = (divId) => {
      setActiveDiv(divId);
   };

   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   useEffect(() => {
      const url = `${pathname}?${searchParams}`;

      let userIDs = null;
      if (typeof window !== undefined) {
         const userInfoString = localStorage.getItem('userInfo');
         if (userInfoString) {
            userIDs = JSON.parse(localStorage.getItem('userInfo'))[0]._id;
            setUserID(userIDs);
            getAllNotifications(userIDs);
         }
      }

      if (userID) {
         unSeenNotificationFunc();
      }
   }, [pathname, searchParams]);

   async function unSeenNotificationFunc() {
      try {
         const response = await axiosInstance.get(
            `/api/get-all-user-specific-unseen-notifications/${userID}`,
         );

         if (response.data) {
            setUnSeenNotification(response.data.notifications);
         }
      } catch (error) {
         console.error(error);
      }
   }

   async function getAllNotifications(userIDs) {
      try {
         if (userID) {
            const response = await axiosInstance.get(
               `/api/get-all-user-specific-notifications/${userID}`,
            );

            if (response.data) {
               setNotifications(response.data.notifications);
            }
         }
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      if (userID) {
         getAllNotifications(userID);
      }
   }, [userID]);

   useEffect(() => {
      if (localStorage.getItem('userInfo') != undefined) {
         const localStorageFullName = localStorage.getItem('fullname');
         const localUserName = localStorage.getItem('username');
         const userImage = JSON.parse(localStorage.getItem('userInfo'));
         if (userImage) {
            setuserImage(userImage[0].profile_pic);
         }
         setUserId(userImage[0]._id);

         if (localUserName) {
            setUserName(localUserName);
         }

         if (localStorageFullName) {
            setFullName(localStorageFullName);
         }
      }
   }, []);

   const seenNotfications = async () => {
      try {
         const response = await axiosInstance.get(
            `/api/seen-all-user-specific-notifications/${userID}`,
         );

         if (response.data) {
            setNotifications(response.data.notifications);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleLogout = () => {
      if (typeof window !== 'undefined') {
         localStorage.removeItem('refreshToken');
      }
      if (typeof window !== 'undefined') {
         localStorage.removeItem('userInfo');
      }
      if (typeof window !== 'undefined') {
         localStorage.removeItem('fullname');
      }
      if (typeof window !== 'undefined') {
         localStorage.removeItem('userId');
      }

      router.push('/login');
   };

   // Listen for route changes
   useEffect(() => {
      const currentRoute = window.location.pathname;
      const splitRoute = currentRoute.split('/');
      setIsPageSettingRoute(splitRoute[1] === 'manage-page');
      setIsOtherRoute1(splitRoute[1] === 'settings');
      setIsOtherRoute2(splitRoute[1] === 'page-settings');
      setIsOtherRoute3(splitRoute[1] === '');
   }, []);

   function lastMessageFunc() {
      axiosInstance.get(`/api/including-me-chat-users`).then((res) => {
         if (res.data.status == 200) {
            setAllUsersLastMessage(res.data.data);
            setFilteredUsers(res.data.data);
         }
      });
   }
   useEffect(() => {
      lastMessageFunc();
   }, []);

   const handleSearchMessagePeople = (e) => {
      const searchTerm = e.target.value.trim().toLowerCase();

      if (searchTerm === null || searchTerm === '') {
         // If the search term is null or empty, render the entire list
         setFilteredUsers(allUsersLastMessage);
      } else {
         const newFilteredUsers = allUsersLastMessage.filter((user) => {
            const firstName = user.user.first_name.trim().toLowerCase();
            const lastName = user.user.last_name.trim().toLowerCase();
            const fullName = `${firstName} ${lastName}`;

            return fullName.includes(searchTerm);
         });

         setFilteredUsers(newFilteredUsers);
      }
   };

   useEffect(() => {
      axiosInstance.get(`/api/get-all-private-one-to-one-message-notifications`).then((res) => {
         if (res.data.status == 200) {
            setMessageNotifications(res.data.notifications);
         }
      });
   }, [triggerMessageNotification]);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const localUserInfo = localStorage.getItem('userInfo');

         if (localUserInfo) {
            setMessageSenderId(JSON.parse(localUserInfo)[0]._id);
         }
      }
   }, []);
   return (
      <div className="">
         <header className="header" id="site-header">
            <div className="header-content-wrapper ">
               <div className="row">
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 ">
                     <div className="nav-logo-inptss-div">
                        <Link href="/newsfeed" className="main-logo">
                           <img src={'/qPlOgO.png'} alt="logo" className="nav-logoss" />
                        </Link>
                        <div className="">
                           <form className="">
                              <div className="navbar-inpu-div ">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                 >
                                    <g clip-path="url(#clip0_29_1205)">
                                       <path
                                          d="M14.8169 13.9331L11.0862 10.2025C12.1029 8.95911 12.6027 7.37254 12.4824 5.77096C12.3621 4.16938 11.6307 2.67532 10.4397 1.59781C9.24871 0.520305 7.6891 -0.0582065 6.08351 -0.0180617C4.47792 0.0220832 2.94917 0.677813 1.81349 1.81349C0.677813 2.94917 0.0220832 4.47792 -0.0180617 6.08351C-0.0582065 7.6891 0.520305 9.24871 1.59781 10.4397C2.67532 11.6307 4.16938 12.3621 5.77096 12.4824C7.37254 12.6027 8.95911 12.1029 10.2025 11.0862L13.9331 14.8169C14.051 14.9307 14.2089 14.9937 14.3727 14.9923C14.5366 14.9909 14.6934 14.9251 14.8092 14.8092C14.9251 14.6934 14.9909 14.5366 14.9923 14.3727C14.9937 14.2089 14.9307 14.051 14.8169 13.9331ZM6.24998 11.25C5.26108 11.25 4.29438 10.9567 3.47213 10.4073C2.64989 9.85793 2.00903 9.07703 1.63059 8.1634C1.25215 7.24977 1.15313 6.24444 1.34606 5.27453C1.53899 4.30463 2.01519 3.41371 2.71445 2.71445C3.41371 2.01519 4.30463 1.53899 5.27453 1.34606C6.24444 1.15313 7.24977 1.25215 8.1634 1.63059C9.07703 2.00903 9.85793 2.64989 10.4073 3.47213C10.9567 4.29438 11.25 5.26108 11.25 6.24998C11.2485 7.57561 10.7212 8.84651 9.78387 9.78387C8.84651 10.7212 7.57561 11.2485 6.24998 11.25Z"
                                          fill="black"
                                       />
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_29_1205">
                                          <rect width="15" height="15" fill="white" />
                                       </clipPath>
                                    </defs>
                                 </svg>
                                 <input
                                    className="navbar-inpu"
                                    type="search"
                                    placeholder="Search"
                                 />
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                     <div className="nav-top-head-icons-div">
                        <Link href={`/newsfeed`}>
                           <span>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="24"
                                 height="24"
                                 viewBox="0 0 24 24"
                                 fill="none"
                              >
                                 <path
                                    d="M23.477 12.3144C23.1914 12.612 23.1722 12.588 22.3034 12.588H20.5922V21.54C20.5922 22.9056 19.8698 23.7048 18.5498 23.7048H16.157L15.2282 23.688V15.9528C15.2282 15.024 14.7458 14.7888 14.1938 14.7888H9.94582C9.32662 14.7888 8.83702 15.048 8.83702 15.9096V23.7L7.60582 23.7072H5.52022C4.26502 23.7072 3.47782 22.9944 3.47782 21.4128V12.5928H1.71382C0.785022 12.5928 0.729822 12.4488 0.506622 12.18C0.0674224 11.6448 0.0914224 10.98 1.20982 10.0608L11.0066 0.945566C11.297 0.724766 11.5898 0.295166 11.9594 0.295166H12.1154C12.485 0.295166 12.7778 0.635966 13.0682 0.856766L22.7738 10.056C23.7074 10.6776 24.0578 11.7072 23.477 12.3144Z"
                                    fill="#307777"
                                 />
                              </svg>
                           </span>
                        </Link>
                        <Link href={`/reel/8000`}>
                           <span>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="32"
                                 height="33"
                                 viewBox="0 0 32 33"
                                 fill="none"
                              >
                                 <path
                                    d="M8.5 3.50673C10.7063 2.23046 13.2679 1.5 16 1.5C24.2842 1.5 31 8.21572 31 16.5C31 24.7842 24.2842 31.5 16 31.5C7.71572 31.5 1 24.7842 1 16.5C1 13.7679 1.73046 11.2063 3.00673 9"
                                    stroke="#AFB2B7"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                 />
                                 <path
                                    d="M16 31.5H31"
                                    stroke="#AFB2B7"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                 />
                                 <path
                                    d="M18 10C18 10.8284 17.1045 11.5 16 11.5C14.8955 11.5 14 10.8284 14 10C14 9.17157 14.8955 8.5 16 8.5C17.1045 8.5 18 9.17157 18 10Z"
                                    stroke="#AFB2B7"
                                    stroke-width="2"
                                 />
                                 <path
                                    d="M18 23C18 23.8284 17.1045 24.5 16 24.5C14.8955 24.5 14 23.8284 14 23C14 22.1716 14.8955 21.5 16 21.5C17.1045 21.5 18 22.1716 18 23Z"
                                    stroke="#AFB2B7"
                                    stroke-width="2"
                                 />
                                 <path
                                    d="M9.5 14.5C10.3284 14.5 11 15.3955 11 16.5C11 17.6045 10.3284 18.5 9.5 18.5C8.67157 18.5 8 17.6045 8 16.5C8 15.3955 8.67157 14.5 9.5 14.5Z"
                                    stroke="#AFB2B7"
                                    stroke-width="2"
                                 />
                                 <path
                                    d="M22.5 14.5C23.3284 14.5 24 15.3955 24 16.5C24 17.6045 23.3284 18.5 22.5 18.5C21.6716 18.5 21 17.6045 21 16.5C21 15.3955 21.6716 14.5 22.5 14.5Z"
                                    stroke="#AFB2B7"
                                    stroke-width="2"
                                 />
                              </svg>
                           </span>
                        </Link>
                        <Link href={`/grouppage`}>
                           <span>
                              <Image width={35} height={35} src={NavGroup} alt="" />
                           </span>
                        </Link>
                        <Link href={`/marketplace`}>
                           <span>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="33"
                                 height="31"
                                 viewBox="0 0 33 31"
                                 fill="none"
                              >
                                 <path
                                    d="M1 8.53185C1 7.71435 1 7.3056 1.15224 6.93806C1.30448 6.57052 1.59351 6.28149 2.17157 5.70343L5.57843 2.29657C6.15649 1.71851 6.44552 1.42948 6.81306 1.27724C7.1806 1.125 7.58935 1.125 8.40685 1.125H24.2598C25.0773 1.125 25.4861 1.125 25.8536 1.27724C26.2211 1.42948 26.5102 1.71851 27.0882 2.29657L30.4951 5.70343C31.0732 6.28149 31.3622 6.57052 31.5144 6.93806C31.6667 7.3056 31.6667 7.71435 31.6667 8.53185V25.875C31.6667 27.7606 31.6667 28.7034 31.0809 29.2892C30.4951 29.875 29.5523 29.875 27.6667 29.875H5C3.11438 29.875 2.17157 29.875 1.58579 29.2892C1 28.7034 1 27.7606 1 25.875V8.53185Z"
                                    stroke="#AFB2B7"
                                    stroke-width="2"
                                 />
                                 <path
                                    d="M1 10.7083H31.6667"
                                    stroke="#AFB2B7"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                 />
                                 <path
                                    d="M21.7628 8.79175L10.9017 8.79175C10.4499 8.79175 10.224 8.79175 10.0837 8.93209C9.94336 9.07244 9.94336 9.29832 9.94336 9.75008L9.94336 17.7362C9.94336 19.2021 9.94336 19.935 10.1329 20.329C10.5561 21.2084 11.5725 21.6294 12.4936 21.3068C12.9062 21.1623 13.4244 20.644 14.461 19.6075C14.9411 19.1274 15.1811 18.8873 15.4363 18.7524C15.9968 18.456 16.6677 18.456 17.2282 18.7524C17.4834 18.8873 17.7234 19.1274 18.2035 19.6075C19.24 20.644 19.7583 21.1623 20.1709 21.3068C21.092 21.6294 22.1084 21.2084 22.5316 20.329C22.7211 19.935 22.7211 19.2021 22.7211 17.7362V9.75008C22.7211 9.29832 22.7211 9.07244 22.5808 8.93209C22.4404 8.79175 22.2146 8.79175 21.7628 8.79175Z"
                                    fill="#AFB2B7"
                                 />
                              </svg>
                           </span>
                        </Link>
                        <Link href={`/marketplace/seller/product/cart`}>
                           <span>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="31"
                                 height="31"
                                 viewBox="0 0 31 31"
                                 fill="none"
                              >
                                 <path
                                    d="M22.4834 17C23.608 17 24.5976 16.385 25.1074 15.455L30.4754 5.72C31.0302 4.73 30.3105 3.5 29.1709 3.5H6.97916L5.56968 0.5H0.666504V3.5H3.66539L9.06339 14.885L7.03914 18.545C5.94454 20.555 7.38401 23 9.66316 23H27.6565V20H9.66316L11.3126 17H22.4834ZM8.40363 6.5H26.6219L22.4834 14H11.9573L8.40363 6.5ZM9.66316 24.5C8.01378 24.5 6.67927 25.85 6.67927 27.5C6.67927 29.15 8.01378 30.5 9.66316 30.5C11.3126 30.5 12.662 29.15 12.662 27.5C12.662 25.85 11.3126 24.5 9.66316 24.5ZM24.6576 24.5C23.0082 24.5 21.6737 25.85 21.6737 27.5C21.6737 29.15 23.0082 30.5 24.6576 30.5C26.307 30.5 27.6565 29.15 27.6565 27.5C27.6565 25.85 26.307 24.5 24.6576 24.5Z"
                                    fill="#AFB2B7"
                                 />
                              </svg>
                           </span>
                        </Link>
                     </div>
                  </div>
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 ">
                     <div className="nav-right-head-icons-div">
                        <span
                           className="nav-icon-span "
                           style={{ position: 'relative' }}
                           onClick={() => {
                              setMessageShowHide(!messageShowHide);
                              setMessageReceiverId(null);
                              lastMessageFunc();
                              axiosInstance
                                 .get(`/api/delete-all-private-one-to-one-message-notifications`)
                                 .then((res) => {
                                    if (res.data.status == 200) {
                                       setMessageNotifications([]);
                                    }
                                 });
                           }}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              className=""
                              viewBox="0 0 20 20"
                              fill="none"
                           >
                              <path
                                 d="M10.0002 0.139893C4.5882 0.139893 0.200195 4.22589 0.200195 9.26989C0.200195 12.1419 1.6262 14.7059 3.8522 16.3799V19.8599L7.1882 18.0179C8.0802 18.2659 9.0222 18.3999 10.0002 18.3999C15.4122 18.3999 19.8002 14.3119 19.8002 9.26989C19.8002 4.22589 15.4122 0.139893 10.0002 0.139893ZM10.9742 12.4339L8.4782 9.75589L3.6082 12.4339L8.9642 6.71189L11.5202 9.38989L16.3282 6.71189L10.9742 12.4339Z"
                                 fill="#2A2A2A"
                              />
                           </svg>
                           {messageNotifications.length > 0 && (
                              <span
                                 className="fw-bold text-white badge badge-danger"
                                 style={{ position: 'absolute', top: -5, right: -5 }}
                              >
                                 {messageNotifications.length}
                              </span>
                           )}
                        </span>

                        {messageShowHide && (
                           <div
                              className="card  mt-5 border  "
                              style={{ position: 'fixed', zIndex: '', top: '30px', right: '10px' }}
                           >
                              <div className="card-header py-2">
                                 <h6 className="text-center fw-bold">Chats</h6>
                                 <div className="search-bar-icons">
                                    <div class="input-group input-group-sm flex-nowrap">
                                       <span
                                          class="input-group-text rounded py-0 border-0"
                                          id="addon-wrapping"
                                       >
                                          <FontAwesomeIcon
                                             icon={faSearch}
                                             style={{
                                                fontSize: 16,
                                                cursor: 'pointer',
                                             }}
                                          />
                                       </span>
                                       <input
                                          type="text"
                                          class="form-control py-3 rounded "
                                          placeholder="Search.."
                                          aria-label="Username"
                                          aria-describedby="addon-wrapping"
                                          onChange={handleSearchMessagePeople}
                                       />
                                    </div>
                                 </div>
                              </div>
                              <div className="card-body">
                                 <div
                                    className="last_messages-wrapper"
                                    style={{
                                       cursor: 'pointer',
                                       position: 'relative',
                                       height: '60vh',
                                       overflowY: 'scroll',
                                    }}
                                 >
                                    {filteredUsers?.map((item, i) => {
                                       return (
                                          <>
                                             <div class="last-message-single-item d-flex justify-content-between pb-3">
                                                <div
                                                   className="d-flex"
                                                   onClick={() =>
                                                      setMessageReceiverId(item.user._id)
                                                   }
                                                >
                                                   <div className="">
                                                      <img
                                                         src={`${host}/uploads/${item.user?.profile_pic}`}
                                                         style={{
                                                            width: '55px',
                                                            height: '55px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                         }}
                                                      />
                                                   </div>
                                                   <div className="mx-3 ">
                                                      <h5>
                                                         {' '}
                                                         {item.user?.first_name}{' '}
                                                         {item.user?.last_name}
                                                      </h5>
                                                      <div className="">
                                                         <span>
                                                            {item.lastMessage?.message
                                                               .split(' ')
                                                               .slice(0, 20)
                                                               .join(' ')
                                                               .concat(
                                                                  item.lastMessage.message.length >
                                                                     20
                                                                     ? '...'
                                                                     : '',
                                                               )}
                                                         </span>
                                                         <span className="fw-bold mx-3">
                                                            {timeFormat(item.lastMessage.createdAt)}
                                                         </span>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="justify-self-end mx-2 ">
                                                   <div className="book-more-div">
                                                      <div className="more">
                                                         <div>
                                                            <svg
                                                               xmlns="http://www.w3.org/2000/svg"
                                                               width="16"
                                                               height="16"
                                                               fill="black"
                                                               className="bi bi-three-dots"
                                                               viewBox="0 0 16 16"
                                                            >
                                                               <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                            </svg>
                                                            <ul className="more-dropdown">
                                                               <li>
                                                                  <a
                                                                     href={`/${item.user?.username}/timeline`}
                                                                     type="button"
                                                                  >
                                                                     <span className="bookmark-drop-svgs">
                                                                        <PersonIcon />
                                                                     </span>
                                                                     View Profile
                                                                  </a>
                                                               </li>
                                                               <li>
                                                                  <span
                                                                     onClick={() => {
                                                                        toast.warn(
                                                                           'We are working on it',
                                                                           {
                                                                              position:
                                                                                 'top-center',
                                                                              style: {
                                                                                 background:
                                                                                    'white',
                                                                                 color: 'black',
                                                                              },
                                                                           },
                                                                        );
                                                                     }}
                                                                  >
                                                                     <span className="bookmark-drop-svgs">
                                                                        <NotificationIconSmall />
                                                                     </span>
                                                                     Mute Notification
                                                                  </span>
                                                               </li>
                                                               <li>
                                                                  <span
                                                                     onClick={() => {
                                                                        toast.warn(
                                                                           'We are working on it',
                                                                           {
                                                                              position:
                                                                                 'top-center',
                                                                              style: {
                                                                                 background:
                                                                                    'white',
                                                                                 color: 'black',
                                                                              },
                                                                           },
                                                                        );
                                                                     }}
                                                                  >
                                                                     <span
                                                                        onClick={() => {
                                                                           toast.warn(
                                                                              'We are working on it',
                                                                              {
                                                                                 position:
                                                                                    'top-center',
                                                                                 style: {
                                                                                    background:
                                                                                       'white',
                                                                                    color: 'black',
                                                                                 },
                                                                              },
                                                                           );
                                                                        }}
                                                                        className="bookmark-drop-svgs"
                                                                     >
                                                                        <BlockIcon2 />
                                                                     </span>
                                                                     Block
                                                                  </span>
                                                               </li>
                                                            </ul>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </>
                                       );
                                    })}
                                    <hr className="" />

                                    <div className="text-center ">
                                       <h5 style={{ color: '0B3243' }}>
                                          <a href={'/messenger'}> Search Messenger </a>
                                       </h5>
                                    </div>
                                    {messageReceiverId && messageSenderId && (
                                       <MessengerPopupFixedMessage
                                          setMessageReceiverId={setMessageReceiverId}
                                          messageSenderId={messageSenderId}
                                          messageReceiverId={messageReceiverId}
                                       />
                                    )}
                                 </div>
                              </div>
                           </div>
                        )}

                        <span
                           className="nav-icon-span nav-auth-img-span "
                           style={{ position: 'relative' }}
                           onClick={(e) => {
                              handleAvatarClickNoti();
                              e.stopPropagation(); // Prevent the click event from propagating to document
                              seenNotfications();
                              //     onClick = {() => {setMessageShowHide(!messageShowHide);
                              // setMessageReceiverId(null)
                           }}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="21"
                              viewBox="0 0 16 21"
                              fill="none"
                           >
                              <path
                                 d="M15.6505 14.3999L15.3016 12.5065C15.2648 12.3104 15.148 12.1302 14.9813 12.0144C13.5784 11.0851 12.5975 9.60392 12.2926 7.96382L12.0717 6.75985C11.667 4.57579 9.96986 2.89706 7.82987 2.50076L7.71427 1.87673C7.61806 1.3753 7.32439 0.917162 6.9133 0.632322C6.49209 0.33132 5.97016 0.221365 5.44892 0.312874C4.38715 0.519204 3.68737 1.53955 3.88851 2.59311L4.00605 3.23834C3.3885 3.61919 2.85933 4.12506 2.45256 4.72927C1.64972 5.89167 1.34779 7.31157 1.6056 8.71135L1.82126 9.87939C2.13314 11.5489 1.74014 13.294 0.74019 14.6733C0.625857 14.8336 0.576054 15.0436 0.611303 15.2464L0.969947 17.128C1.02251 17.4041 1.22494 17.6324 1.49113 17.7095C1.60773 17.7441 1.73264 17.7737 1.8574 17.8033C2.7637 18.0182 3.87175 18.1144 5.10251 18.0731L5.10911 18.0746C5.588 19.097 6.50403 19.8274 7.58114 20.0828C8.06713 20.198 8.58969 20.2178 9.11891 20.1212C10.795 19.8109 12.014 18.4143 12.1265 16.7691C13.465 16.3026 14.5763 15.7404 15.3729 15.1315C15.595 14.9555 15.6965 14.6743 15.6505 14.3999ZM5.70921 1.79002C5.77451 1.77778 5.83516 1.78519 5.89439 1.79923C5.94687 1.81168 5.99794 1.83075 6.05237 1.8644C6.13997 1.9338 6.21323 2.03431 6.23938 2.15851L6.29038 2.44111C6.27547 2.44455 6.2543 2.44634 6.23138 2.45484C6.10386 2.46627 5.98787 2.48723 5.86524 2.50678C5.76397 2.52443 5.66762 2.55005 5.56478 2.57429C5.50764 2.5815 5.46209 2.59857 5.40324 2.61234L5.35395 2.32317C5.30837 2.07653 5.46917 1.83717 5.70921 1.79002ZM8.85038 18.6494C8.05979 18.7949 7.29343 18.5161 6.79535 17.9541C6.83792 17.9502 6.88045 17.9465 6.92443 17.9361C7.18113 17.9068 7.43945 17.8708 7.69754 17.8349C7.7123 17.8314 7.72535 17.8345 7.7467 17.8326C8.05555 17.7878 8.35948 17.7351 8.66498 17.6757C8.95571 17.6198 9.23988 17.5623 9.52557 17.4982C9.59903 17.4809 9.67909 17.4652 9.74596 17.4464C9.98112 17.3911 10.2095 17.3342 10.4396 17.271C10.4608 17.269 10.4837 17.2607 10.5049 17.2587C10.2469 17.9676 9.63453 18.5023 8.85038 18.6494Z"
                                 fill="#2A2A2A"
                              />
                           </svg>

                           {unSeenNotification.length > 1 && (
                              <span
                                 className="fw-bold text-white badge badge-danger"
                                 style={{ position: 'absolute', top: -5, right: -5 }}
                              >
                                 {unSeenNotification.length}
                              </span>
                           )}
                        </span>

                        {menuVisibleNoti && (
                           <div className="menuNoti" ref={menuRefNoti}>
                              {/* Your menu content goes here */}
                              <div>
                                 <div className="Notification-headertag-div">
                                    {' '}
                                    <h6 className="all-notify-text">Notifications</h6>
                                    <Link href="#" className="link-mark">
                                       {' '}
                                       <span className="link-mark-as">Mark all as read</span>
                                       <div className=""></div>
                                    </Link>{' '}
                                 </div>
                                 {/* <hr /> */}
                                 <div>
                                    <ul className="nav-dash-sidebar-div">
                                       <li
                                          onClick={() => handleTextClick(1)}
                                          className={`nav-li-sec ${
                                             activeDiv === 1 ? 'nav-dash-sidebar' : ''
                                          }`}
                                       >
                                          <div>All {`(${notifications.length})`} </div>
                                       </li>
                                       <li
                                          onClick={() => handleTextClick(2)}
                                          className={`nav-li-sec ${
                                             activeDiv === 2 ? 'nav-dash-sidebar' : ''
                                          }`}
                                       >
                                          <div>Unread</div>
                                       </li>
                                    </ul>
                                 </div>

                                 <div>
                                    {activeDiv === 1 && (
                                       <div>
                                          <AllNotification />
                                       </div>
                                    )}

                                    {activeDiv === 2 && <div></div>}
                                 </div>
                              </div>
                           </div>
                        )}

                        <span className="nav-auth-img-span">
                           {userImage !== null ? (
                              <img
                                 className="avatar-nav "
                                 id="avatar-trigger"
                                 onClick={(e) => {
                                    handleAvatarClick();
                                    e.stopPropagation(); // Prevent the click event from propagating to document
                                 }}
                                 src={`${host}/uploads/${userImage}`}
                                 alt=""
                              />
                           ) : (
                              <img
                                 src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                 className="bi bi-wallet2 olymp-explore-icon left-menu-icon avatar"
                                 style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              />
                           )}
                        </span>
                        {menuVisible && (
                           <div className="menu" ref={menuRef}>
                              {/* Your menu content goes here */}
                              <div>
                                 <Link href={`/${userName}/timeline`}>
                                    <div className="auth-dropdon-listOne">
                                       <div>
                                          {userImage !== null ? (
                                             <img
                                                alt="author"
                                                src={`${host}/uploads/${userImage}`}
                                                className="avatar "
                                             />
                                          ) : (
                                             <img
                                                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                className="bi bi-wallet2 olymp-explore-icon left-menu-icon"
                                                style={{
                                                   width: '40px',
                                                   height: '40px',
                                                   objectFit: 'cover',
                                                }}
                                             />
                                          )}
                                       </div>
                                       <p className="auth-dropdonp">{fullName}</p>
                                    </div>
                                 </Link>
                                 <hr />
                                 <div className="nav-auth-dropdown-li-div">
                                    <ul>
                                       <li className="nav-auth-dropdown-li">
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                             >
                                                <path
                                                   d="M14.1361 3.36144L15.1312 3.26194L14.1361 3.36144ZM13.9838 2.54161L13.095 3V3L13.9838 2.54161ZM14.4311 4.81793L15.2261 4.21141L15.2261 4.21141L14.4311 4.81793ZM15.3595 5.20248L15.2261 4.21141L15.3595 5.20248ZM16.5979 4.38113L17.2311 5.15509L17.2311 5.15509L16.5979 4.38113ZM17.2853 3.90918L17.5896 4.86175L17.2853 3.90918ZM17.9872 3.94419L18.3848 3.02663L18.3848 3.02663L17.9872 3.94419ZM18.6243 4.4822L17.9172 5.1893L17.9172 5.18931L18.6243 4.4822ZM19.5178 5.37567L20.2249 4.66856L20.2249 4.66856L19.5178 5.37567ZM20.0558 6.01275L20.9733 5.61517L20.9733 5.61516L20.0558 6.01275ZM20.0908 6.71464L21.0434 7.01895L21.0434 7.01894L20.0908 6.71464ZM19.6188 7.4021L18.8449 6.76886L18.8449 6.76886L19.6188 7.4021ZM18.7975 8.64056L17.8064 8.50724L17.8064 8.50725L18.7975 8.64056ZM19.182 9.56893L18.5755 10.364L18.5755 10.364L19.182 9.56893ZM20.6385 9.86385L20.738 8.86882L20.6385 9.86385ZM21.4584 10.0162L21.9168 9.1275L21.9168 9.1275L21.4584 10.0162ZM21.9299 10.5373L22.8599 10.1696L22.8599 10.1696L21.9299 10.5373ZM21.93 13.4626L21 13.095L21 13.095L21.93 13.4626ZM21.4583 13.9838L21.9166 14.8726L21.9166 14.8726L21.4583 13.9838ZM20.6386 14.1361L20.5391 13.1411L20.5065 13.1444L20.4742 13.1497L20.6386 14.1361ZM20.6386 14.1361L20.7381 15.1312L20.7707 15.1279L20.803 15.1225L20.6386 14.1361ZM19.1825 14.4309L18.5762 13.6357L18.5762 13.6357L19.1825 14.4309ZM18.7979 15.3596L17.8068 15.4931V15.4931L18.7979 15.3596ZM19.619 16.5976L18.845 17.2308H18.845L19.619 16.5976ZM20.0908 17.2848L19.1383 17.5892V17.5892L20.0908 17.2848ZM20.0558 17.9869L19.1383 17.5892L19.1383 17.5892L20.0558 17.9869ZM19.5179 18.6238L20.225 19.3309H20.225L19.5179 18.6238ZM18.6243 19.5174L17.9172 18.8102L17.9172 18.8103L18.6243 19.5174ZM17.9873 20.0554L18.3849 20.9729L18.3849 20.9729L17.9873 20.0554ZM17.2854 20.0904L16.981 21.0429L16.981 21.0429L17.2854 20.0904ZM16.5979 19.6184L17.2312 18.8444L17.2226 18.8376L16.5979 19.6184ZM16.5979 19.6184L15.9646 20.3924L15.9732 20.3993L16.5979 19.6184ZM15.3595 18.7971L15.4928 17.806H15.4928L15.3595 18.7971ZM14.4311 19.1816L15.2262 19.7882L15.2262 19.7881L14.4311 19.1816ZM14.1362 20.6383L13.1411 20.5388V20.5388L14.1362 20.6383ZM13.9837 21.4585L13.095 21L13.095 21L13.9837 21.4585ZM13.4628 21.9299L13.095 21L13.095 21L13.4628 21.9299ZM10.5373 21.9299L10.905 21L10.5373 21.9299ZM10.0162 21.4584L10.905 21H10.905L10.0162 21.4584ZM9.86385 20.6385L8.86882 20.7381V20.7381L9.86385 20.6385ZM9.56892 19.182L8.77387 19.7885L8.77387 19.7885L9.56892 19.182ZM8.64057 18.7975L8.50728 17.8064H8.50727L8.64057 18.7975ZM7.40208 19.6189L6.76884 18.8449L6.753 18.8579L6.73771 18.8714L7.40208 19.6189ZM7.40206 19.6189L8.0353 20.3928L8.05113 20.3799L8.06643 20.3663L7.40206 19.6189ZM6.71458 20.0908L7.01887 21.0434H7.01887L6.71458 20.0908ZM6.01272 20.0558L5.61515 20.9734H5.61515L6.01272 20.0558ZM5.37561 19.5178L6.08271 18.8107H6.08271L5.37561 19.5178ZM4.48217 18.6243L3.77506 19.3315L3.77506 19.3315L4.48217 18.6243ZM3.94414 17.9873L4.86171 17.5897L4.86171 17.5897L3.94414 17.9873ZM3.90913 17.2854L4.86171 17.5897L4.86171 17.5897L3.90913 17.2854ZM4.3811 16.5979L5.15506 17.2311H5.15506L4.3811 16.5979ZM5.20247 15.3594L6.19355 15.4928L5.20247 15.3594ZM4.81792 14.4311L5.42445 13.636L5.42445 13.636L4.81792 14.4311ZM3.36143 14.1361L3.26193 15.1312H3.26193L3.36143 14.1361ZM2.54161 13.9838L3 13.095H3L2.54161 13.9838ZM2.07005 13.4627L1.14009 13.8304L1.14009 13.8304L2.07005 13.4627ZM2.07008 10.5372L1.14017 10.1694L1.14017 10.1694L2.07008 10.5372ZM2.54152 10.0163L2.08305 9.12757L2.08305 9.12757L2.54152 10.0163ZM3.36155 9.86384V8.86384H3.31167L3.26205 8.86881L3.36155 9.86384ZM3.36156 9.86384V10.8638H3.41143L3.46106 10.8589L3.36156 9.86384ZM4.81842 9.56881L4.21178 8.77383L4.21177 8.77383L4.81842 9.56881ZM5.20287 8.64066L6.19396 8.50749L6.19396 8.50749L5.20287 8.64066ZM4.38128 7.40182L5.15523 6.76858H5.15523L4.38128 7.40182ZM3.90914 6.71405L4.86175 6.40988L4.86175 6.40988L3.90914 6.71405ZM3.94413 6.01243L3.02651 5.61498L3.02651 5.61498L3.94413 6.01243ZM4.48233 5.37509L5.18944 6.0822H5.18944L4.48233 5.37509ZM5.37565 4.48177L4.66855 3.77466V3.77466L5.37565 4.48177ZM6.01277 3.94373L5.6152 3.02615L5.6152 3.02616L6.01277 3.94373ZM6.71463 3.90872L7.01892 2.95614V2.95614L6.71463 3.90872ZM7.4022 4.38076L8.03543 3.60681V3.60681L7.4022 4.38076ZM8.64044 5.20207L8.77391 4.21101L8.64044 5.20207ZM9.56907 4.81742L8.77391 4.21101L8.77391 4.21101L9.56907 4.81742ZM9.86387 3.36131L10.8589 3.46081V3.46081L9.86387 3.36131ZM10.0162 2.5417L9.12739 2.08341L9.12739 2.08341L10.0162 2.5417ZM10.5374 2.07001L10.905 3L10.905 3L10.5374 2.07001ZM13.4627 2.07005L13.8304 1.1401V1.1401L13.4627 2.07005ZM15.1312 3.26194C15.1108 3.05831 15.0912 2.85693 15.0626 2.6868C15.0324 2.50684 14.9828 2.29705 14.8725 2.08322L13.095 3C13.0721 2.95549 13.0769 2.93878 13.0902 3.01798C13.1052 3.10701 13.1181 3.23089 13.1411 3.46094L15.1312 3.26194ZM15.2261 4.21141C15.2894 4.29433 15.2693 4.33101 15.2342 4.13595C15.2008 3.95045 15.1739 3.68915 15.1312 3.26194L13.1411 3.46094C13.1805 3.85459 13.2152 4.20895 13.2658 4.49017C13.3147 4.76184 13.4009 5.11633 13.636 5.42445L15.2261 4.21141ZM15.2261 4.21141L15.2261 4.21141L13.636 5.42444C14.0718 5.99575 14.7806 6.28935 15.4928 6.19355L15.2261 4.21141ZM15.9646 3.60717C15.6323 3.87905 15.4286 4.04481 15.2738 4.15238C15.1111 4.26548 15.1228 4.22531 15.2261 4.21141L15.4928 6.19355C15.8768 6.14188 16.1885 5.95223 16.4152 5.7947C16.6498 5.63163 16.9249 5.4056 17.2311 5.15509L15.9646 3.60717ZM16.981 2.95661C16.7518 3.02983 16.5684 3.14308 16.4198 3.24897C16.2793 3.34907 16.123 3.47759 15.9646 3.60717L17.2311 5.15509C17.41 5.00869 17.5068 4.93022 17.5803 4.87784C17.6457 4.83124 17.6373 4.84651 17.5896 4.86175L16.981 2.95661ZM18.3848 3.02663C17.9408 2.83421 17.442 2.80934 16.981 2.95661L17.5896 4.86175L17.5896 4.86175L18.3848 3.02663ZM19.3314 3.77509C19.1867 3.6304 19.044 3.48696 18.9142 3.37338C18.7768 3.25323 18.6056 3.12228 18.3848 3.02663L17.5896 4.86175C17.5437 4.84184 17.5369 4.82581 17.5973 4.87869C17.6653 4.93813 17.7537 5.02583 17.9172 5.1893L19.3314 3.77509ZM20.2249 4.66856L19.3314 3.77509L17.9172 5.18931L18.8107 6.08277L20.2249 4.66856ZM20.9733 5.61516C20.8777 5.39441 20.7467 5.22316 20.6266 5.08581C20.513 4.95597 20.3696 4.81326 20.2249 4.66856L18.8106 6.08277C18.9741 6.24626 19.0618 6.33469 19.1213 6.40264C19.1742 6.46308 19.1581 6.45629 19.1382 6.41034L20.9733 5.61516ZM21.0434 7.01894C21.1906 6.55797 21.1658 6.05922 20.9733 5.61517L19.1382 6.41034L19.1382 6.41034L21.0434 7.01894ZM20.3928 8.03534C20.5224 7.87696 20.6509 7.72069 20.751 7.58019C20.8569 7.43156 20.9701 7.24814 21.0434 7.01895L19.1382 6.41033C19.1535 6.36263 19.1687 6.35427 19.1221 6.41968C19.0697 6.4932 18.9913 6.58992 18.8449 6.76886L20.3928 8.03534ZM19.7885 8.77387C19.7746 8.87723 19.7345 8.88894 19.8476 8.72619C19.9551 8.57141 20.1209 8.36764 20.3928 8.03534L18.8449 6.76886C18.5943 7.07506 18.3683 7.35016 18.2052 7.58481C18.0477 7.81148 17.8581 8.12317 17.8064 8.50724L19.7885 8.77387ZM19.7885 8.77387V8.77386L17.8064 8.50725C17.7106 9.21938 18.0042 9.92816 18.5755 10.364L19.7885 8.77387ZM20.738 8.86882C20.3108 8.82609 20.0495 8.79922 19.864 8.76584C19.6689 8.73073 19.7056 8.7106 19.7885 8.77387L18.5755 10.364C18.8836 10.599 19.2381 10.6853 19.5098 10.7342C19.791 10.7848 20.1454 10.8195 20.539 10.8589L20.738 8.86882ZM21.9168 9.1275C21.703 9.01721 21.4932 8.96759 21.3132 8.93737C21.1431 8.9088 20.9417 8.88918 20.738 8.86882L20.539 10.8589C20.7691 10.8819 20.893 10.8948 20.982 10.9098C21.0612 10.9231 21.0445 10.9279 21 10.905L21.9168 9.1275ZM22.8599 10.1696C22.682 9.71957 22.3469 9.34933 21.9168 9.1275L21 10.905L21 10.905L22.8599 10.1696ZM23 11.3682C23 11.1636 23.0005 10.9613 22.989 10.7891C22.9769 10.607 22.9484 10.3933 22.8599 10.1696L21 10.905C20.9816 10.8584 20.9881 10.8423 20.9935 10.9224C20.9995 11.0125 21 11.137 21 11.3682H23ZM23 12.6319V11.3682H21V12.6319H23ZM22.86 13.8302C22.9484 13.6065 22.9769 13.3929 22.989 13.2108C23.0005 13.0388 23 12.8365 23 12.6319H21C21 12.863 20.9995 12.9875 20.9935 13.0776C20.9881 13.1577 20.9816 13.1416 21 13.095L22.86 13.8302ZM21.9166 14.8726C22.3469 14.6507 22.682 14.2804 22.86 13.8302L21 13.095V13.095L21.9166 14.8726ZM20.7381 15.1312C20.9417 15.1108 21.1431 15.0912 21.3132 15.0626C21.4931 15.0324 21.7028 14.9828 21.9166 14.8726L21 13.095C21.0445 13.0721 21.0612 13.077 20.982 13.0902C20.893 13.1052 20.7691 13.1181 20.5391 13.1411L20.7381 15.1312ZM20.803 15.1225L20.803 15.1225L20.4742 13.1497L20.4742 13.1497L20.803 15.1225ZM19.7889 15.2261C19.706 15.2893 19.6693 15.2692 19.8644 15.2341C20.0498 15.2007 20.311 15.1739 20.7381 15.1312L20.5391 13.1411C20.1456 13.1805 19.7913 13.2151 19.5102 13.2657C19.2386 13.3146 18.8842 13.4008 18.5762 13.6357L19.7889 15.2261ZM19.7889 15.2261L19.7889 15.2261L18.5762 13.6357C18.0046 14.0716 17.7108 14.7807 17.8068 15.4931L19.7889 15.2261ZM20.3929 15.9643C20.1212 15.6322 19.9555 15.4285 19.8479 15.2738C19.7348 15.1111 19.775 15.1228 19.7889 15.2261L17.8068 15.4931C17.8585 15.877 18.0481 16.1886 18.2056 16.4152C18.3686 16.6497 18.5946 16.9247 18.845 17.2308L20.3929 15.9643ZM21.0433 16.9803C20.9701 16.7513 20.8569 16.5679 20.751 16.4193C20.651 16.2789 20.5225 16.1227 20.3929 15.9643L18.845 17.2308C18.9914 17.4097 19.0698 17.5064 19.1222 17.5799C19.1688 17.6453 19.1535 17.6369 19.1383 17.5892L21.0433 16.9803ZM20.9733 18.3846C21.1658 17.9404 21.1907 17.4415 21.0433 16.9803L19.1383 17.5892L19.1383 17.5892L20.9733 18.3846ZM20.225 19.3309C20.3697 19.1862 20.5131 19.0436 20.6266 18.9138C20.7467 18.7765 20.8776 18.6053 20.9733 18.3846L19.1383 17.5892C19.1582 17.5433 19.1742 17.5365 19.1213 17.5969C19.0619 17.6648 18.9742 17.7532 18.8108 17.9167L20.225 19.3309ZM19.3314 20.2245L20.225 19.3309L18.8108 17.9167L17.9172 18.8102L19.3314 20.2245ZM18.3849 20.9729C18.6056 20.8773 18.7769 20.7463 18.9142 20.6262C19.044 20.5126 19.1867 20.3692 19.3314 20.2245L17.9172 18.8103C17.7537 18.9737 17.6653 19.0614 17.5974 19.1209C17.5369 19.1737 17.5437 19.1577 17.5897 19.1378L18.3849 20.9729ZM16.981 21.0429C17.442 21.1902 17.9408 21.1653 18.3849 20.9729L17.5897 19.1378H17.5897L16.981 21.0429ZM15.9647 20.3924C16.1231 20.522 16.2793 20.6505 16.4198 20.7506C16.5684 20.8565 16.7519 20.9697 16.981 21.0429L17.5897 19.1378C17.6374 19.153 17.6457 19.1683 17.5803 19.1217C17.5068 19.0693 17.4101 18.9909 17.2312 18.8445L15.9647 20.3924ZM15.9732 20.3993L15.9732 20.3993L17.2226 18.8376L17.2226 18.8375L15.9732 20.3993ZM15.2262 19.7881C15.1228 19.7742 15.1111 19.7341 15.2738 19.8472C15.4286 19.9547 15.6324 20.1205 15.9647 20.3924L17.2311 18.8445C16.925 18.5939 16.6499 18.3679 16.4152 18.2048C16.1886 18.0473 15.8769 17.8577 15.4928 17.806L15.2262 19.7881ZM15.2262 19.7881H15.2262L15.4928 17.806C14.7807 17.7102 14.0719 18.0038 13.636 18.5751L15.2262 19.7881ZM15.1312 20.7378C15.1739 20.3105 15.2008 20.0492 15.2342 19.8636C15.2693 19.6685 15.2894 19.7052 15.2262 19.7882L13.636 18.5751C13.401 18.8832 13.3147 19.2378 13.2658 19.5094C13.2152 19.7907 13.1805 20.1451 13.1411 20.5388L15.1312 20.7378ZM14.8724 21.917C14.9828 21.7031 15.0324 21.4932 15.0626 21.3132C15.0912 21.143 15.1108 20.9415 15.1312 20.7378L13.1411 20.5388C13.1181 20.769 13.1052 20.8929 13.0902 20.982C13.0769 21.0612 13.072 21.0445 13.095 21L14.8724 21.917ZM13.8306 22.8598C14.2805 22.6819 14.6506 22.3469 14.8724 21.917L13.095 21L13.095 21L13.8306 22.8598ZM12.6316 23C12.8363 23 13.0387 23.0005 13.2109 22.989C13.393 22.9768 13.6068 22.9483 13.8306 22.8598L13.095 21C13.1416 20.9816 13.1577 20.9881 13.0776 20.9935C12.9875 20.9995 12.8629 21 12.6316 21V23ZM11.3682 23H12.6316V21H11.3682V23ZM10.1696 22.8599C10.3933 22.9484 10.607 22.9769 10.7891 22.989C10.9613 23.0005 11.1636 23 11.3682 23V21C11.137 21 11.0125 20.9995 10.9224 20.9935C10.8423 20.9881 10.8584 20.9816 10.905 21L10.1696 22.8599ZM9.1275 21.9168C9.34933 22.3469 9.71958 22.682 10.1696 22.8599L10.905 21L9.1275 21.9168ZM8.86882 20.7381C8.88918 20.9417 8.9088 21.1431 8.93737 21.3132C8.96759 21.4932 9.01721 21.703 9.1275 21.9168L10.905 21C10.9279 21.0445 10.9231 21.0612 10.9098 20.982C10.8948 20.893 10.8819 20.7691 10.8589 20.539L8.86882 20.7381ZM8.77387 19.7885C8.7106 19.7056 8.73073 19.6689 8.76584 19.864C8.79922 20.0495 8.82609 20.3108 8.86882 20.7381L10.8589 20.539C10.8195 20.1454 10.7848 19.791 10.7342 19.5098C10.6853 19.2381 10.599 18.8836 10.364 18.5755L8.77387 19.7885ZM8.77387 19.7885L10.364 18.5755C9.92815 18.0042 9.21939 17.7106 8.50728 17.8064L8.77387 19.7885ZM8.03531 20.3928C8.36763 20.1209 8.5714 19.9551 8.72619 19.8476C8.88895 19.7345 8.87724 19.7746 8.77387 19.7885L8.50727 17.8064C8.12318 17.858 7.81149 18.0477 7.58481 18.2052C7.35015 18.3683 7.07504 18.5944 6.76884 18.8449L8.03531 20.3928ZM8.06643 20.3663L8.06644 20.3663L6.73771 18.8714L6.7377 18.8715L8.06643 20.3663ZM7.01887 21.0434C7.24807 20.9702 7.4315 20.8569 7.58013 20.751C7.72064 20.6509 7.87691 20.5224 8.0353 20.3928L6.76883 18.8449C6.58988 18.9913 6.49316 19.0698 6.41963 19.1222C6.35422 19.1688 6.36258 19.1535 6.41029 19.1383L7.01887 21.0434ZM5.61515 20.9734C6.05919 21.1658 6.55791 21.1907 7.01887 21.0434L6.41029 19.1383L6.41029 19.1383L5.61515 20.9734ZM4.6685 20.2249C4.81321 20.3696 4.95592 20.513 5.08577 20.6266C5.22313 20.7468 5.39438 20.8777 5.61515 20.9734L6.41029 19.1383C6.45624 19.1582 6.46304 19.1742 6.40259 19.1213C6.33464 19.0619 6.2462 18.9742 6.08271 18.8107L4.6685 20.2249ZM3.77506 19.3315L4.6685 20.2249L6.08271 18.8107L5.18927 17.9172L3.77506 19.3315ZM3.02657 18.3848C3.12223 18.6056 3.25318 18.7768 3.37333 18.9142C3.48692 19.044 3.63036 19.1868 3.77506 19.3315L5.18928 17.9172C5.02579 17.7538 4.93809 17.6653 4.87864 17.5974C4.82577 17.5369 4.8418 17.5437 4.86171 17.5897L3.02657 18.3848ZM2.95656 16.9811C2.8093 17.4421 2.83417 17.9408 3.02657 18.3848L4.86171 17.5897V17.5897L2.95656 16.9811ZM3.60715 15.9647C3.47756 16.123 3.34903 16.2793 3.24892 16.4198C3.14303 16.5684 3.02977 16.7519 2.95656 16.9811L4.86171 17.5897C4.84647 17.6374 4.83119 17.6457 4.87779 17.5803C4.93018 17.5068 5.00865 17.4101 5.15506 17.2311L3.60715 15.9647ZM4.2114 15.2261C4.2253 15.1228 4.26548 15.1111 4.15237 15.2738C4.0448 15.4286 3.87903 15.6324 3.60715 15.9647L5.15506 17.2311C5.40558 16.9249 5.63162 16.6498 5.79469 16.4152C5.95222 16.1885 6.14188 15.8768 6.19355 15.4928L4.2114 15.2261ZM4.2114 15.2261L4.2114 15.2261L6.19355 15.4928C6.28934 14.7806 5.99575 14.0718 5.42445 13.636L4.2114 15.2261ZM3.26193 15.1312C3.68915 15.1739 3.95044 15.2008 4.13595 15.2342C4.33101 15.2693 4.29432 15.2894 4.2114 15.2261L5.42445 13.636C5.11633 13.4009 4.76184 13.3147 4.49017 13.2658C4.20894 13.2152 3.85458 13.1805 3.46093 13.1411L3.26193 15.1312ZM2.08323 14.8725C2.29705 14.9828 2.50683 15.0324 2.6868 15.0626C2.85693 15.0912 3.05831 15.1108 3.26193 15.1312L3.46094 13.1411C3.23089 13.1181 3.10701 13.1052 3.01798 13.0902C2.93878 13.0769 2.95549 13.0721 3 13.095L2.08323 14.8725ZM1.14009 13.8304C1.31803 14.2804 1.65311 14.6507 2.08323 14.8725L3 13.095H3L1.14009 13.8304ZM1 12.6318C1 12.8364 0.999483 13.0387 1.01098 13.2109C1.02314 13.393 1.05163 13.6066 1.14009 13.8304L3 13.095C3.01841 13.1416 3.01188 13.1577 3.00653 13.0776C3.00052 12.9875 3 12.863 3 12.6318H1ZM1 11.3683V12.6318H3V11.3683H1ZM1.14017 10.1694C1.05166 10.3932 1.02315 10.607 1.01098 10.7891C0.999483 10.9613 1 11.1637 1 11.3683H3C3 11.1371 3.00052 11.0125 3.00654 10.9224C3.01189 10.8423 3.01842 10.8584 3 10.905L1.14017 10.1694ZM2.08305 9.12757C1.65308 9.34939 1.3181 9.71954 1.14017 10.1694L3 10.905L3 10.905L2.08305 9.12757ZM3.26205 8.86881C3.05837 8.88917 2.85694 8.9088 2.68677 8.93737C2.50676 8.9676 2.29692 9.01724 2.08305 9.12757L3 10.905C2.95548 10.928 2.93877 10.9231 3.01798 10.9098C3.10704 10.8948 3.23094 10.8819 3.46105 10.8589L3.26205 8.86881ZM3.36155 8.86384H3.36155V10.8638H3.36155V8.86384ZM3.36156 8.86384H3.36155V10.8638H3.36156V8.86384ZM4.21177 8.77383C4.29471 8.71055 4.33141 8.73069 4.1363 8.7658C3.95075 8.7992 3.68939 8.82607 3.26205 8.86881L3.46106 10.8589C3.85482 10.8195 4.20927 10.7848 4.49056 10.7342C4.76231 10.6853 5.1169 10.5989 5.42506 10.3638L4.21177 8.77383ZM4.21177 8.77383L4.21178 8.77383L5.42506 10.3638C5.99613 9.92801 6.28962 9.21944 6.19396 8.50749L4.21177 8.77383ZM3.60732 8.03506C3.87929 8.36746 4.04511 8.5713 4.15272 8.72614C4.26586 8.88895 4.22567 8.87724 4.21177 8.77383L6.19396 8.50749C6.14234 8.1233 5.95263 7.81151 5.79506 7.58478C5.63195 7.35006 5.40584 7.07487 5.15523 6.76858L3.60732 8.03506ZM2.95652 7.01822C3.02973 7.24751 3.14303 7.43102 3.24896 7.5797C3.3491 7.72027 3.47768 7.8766 3.60732 8.03506L5.15523 6.76858C5.00876 6.58956 4.93026 6.49279 4.87785 6.41923C4.83123 6.35379 4.84651 6.36215 4.86175 6.40988L2.95652 7.01822ZM3.02651 5.61498C2.83424 6.05887 2.80938 6.5574 2.95652 7.01822L4.86175 6.40988L3.02651 5.61498ZM3.77523 4.66798C3.63047 4.81274 3.48698 4.9555 3.37335 5.08539C3.25316 5.2228 3.12217 5.39412 3.02651 5.61498L4.86175 6.40988C4.84184 6.45585 4.8258 6.46265 4.8787 6.40219C4.93816 6.33421 5.02589 6.24574 5.18944 6.0822L3.77523 4.66798ZM4.66855 3.77466L3.77523 4.66798L5.18944 6.0822L6.08276 5.18888L4.66855 3.77466ZM4.66855 3.77466L4.66855 3.77466L6.08276 5.18888L6.08276 5.18887L4.66855 3.77466ZM5.6152 3.02616C5.39443 3.12181 5.22317 3.25276 5.08582 3.37292C4.95597 3.48651 4.81325 3.62995 4.66855 3.77466L6.08276 5.18887C6.24625 5.02538 6.33469 4.93768 6.40264 4.87824C6.46309 4.82536 6.45629 4.84139 6.41034 4.8613L5.6152 3.02616ZM7.01892 2.95614C6.55795 2.80889 6.05923 2.83377 5.6152 3.02615L6.41033 4.8613H6.41034L7.01892 2.95614ZM8.03543 3.60681C7.87702 3.47719 7.72073 3.34865 7.58021 3.24853C7.43158 3.14264 7.24813 3.02936 7.01892 2.95614L6.41034 4.8613C6.36262 4.84606 6.35426 4.83078 6.41969 4.8774C6.49324 4.9298 6.58999 5.00829 6.76896 5.15472L8.03543 3.60681ZM8.77391 4.21101C8.87727 4.22493 8.88897 4.26509 8.72621 4.15198C8.57144 4.04441 8.36769 3.87865 8.03543 3.60681L6.76896 5.15472C7.07512 5.40521 7.35018 5.63122 7.58477 5.79427C7.81138 5.95176 8.123 6.14141 8.50697 6.19312L8.77391 4.21101ZM8.77391 4.21101L8.77391 4.21101L8.50697 6.19312C9.21932 6.28905 9.92836 5.99536 10.3642 5.42382L8.77391 4.21101ZM8.86883 3.2618C8.82612 3.6889 8.79926 3.95012 8.76589 4.13558C8.7308 4.33059 8.71068 4.29392 8.77391 4.21101L10.3642 5.42382C10.5992 5.11576 10.6854 4.76136 10.7343 4.48976C10.7849 4.20861 10.8196 3.85435 10.8589 3.46081L8.86883 3.2618ZM9.12739 2.08341C9.01716 2.29719 8.96756 2.50692 8.93736 2.68683C8.9088 2.85692 8.88919 3.05824 8.86883 3.2618L10.8589 3.46081C10.8819 3.23082 10.8948 3.10698 10.9098 3.01798C10.923 2.9388 10.9279 2.9555 10.905 3L9.12739 2.08341ZM10.1698 1.14002C9.71962 1.31796 9.34924 1.65315 9.12739 2.08341L10.905 3L10.905 3L10.1698 1.14002ZM11.3681 1C11.1635 1 10.9612 0.999483 10.7892 1.01097C10.6071 1.02313 10.3935 1.05161 10.1698 1.14002L10.905 3C10.8584 3.0184 10.8423 3.01188 10.9224 3.00653C11.0125 3.00052 11.137 3 11.3681 3V1ZM12.6318 1H11.3681V3H12.6318V1ZM13.8304 1.1401C13.6066 1.05163 13.393 1.02314 13.2109 1.01098C13.0387 0.999483 12.8364 1 12.6318 1V3C12.863 3 12.9875 3.00052 13.0776 3.00653C13.1577 3.01188 13.1416 3.01841 13.095 3L13.8304 1.1401ZM14.8725 2.08322C14.6507 1.65312 14.2804 1.31803 13.8304 1.1401L13.095 3L13.095 3L14.8725 2.08322ZM15 12C15 13.6569 13.6569 15 12 15V17C14.7614 17 17 14.7614 17 12H15ZM12 9C13.6569 9 15 10.3431 15 12H17C17 9.23858 14.7614 7 12 7V9ZM9 12C9 10.3431 10.3431 9 12 9V7C9.23858 7 7 9.23858 7 12H9ZM12 15C10.3431 15 9 13.6569 9 12H7C7 14.7614 9.23858 17 12 17V15Z"
                                                   fill="#33363F"
                                                />
                                             </svg>
                                          </span>
                                          <p className="auth-dropdonp">Settings & privacy</p>
                                       </li>
                                       <Link href="/customizeMenu">
                                          <li className="nav-auth-dropdown-li">
                                             <span>
                                                <svg
                                                   xmlns="http://www.w3.org/2000/svg"
                                                   width="24"
                                                   height="24"
                                                   viewBox="0 0 24 24"
                                                   fill="none"
                                                >
                                                   <path
                                                      d="M14.1361 3.36144L15.1312 3.26194L14.1361 3.36144ZM13.9838 2.54161L13.095 3V3L13.9838 2.54161ZM14.4311 4.81793L15.2261 4.21141L15.2261 4.21141L14.4311 4.81793ZM15.3595 5.20248L15.2261 4.21141L15.3595 5.20248ZM16.5979 4.38113L17.2311 5.15509L17.2311 5.15509L16.5979 4.38113ZM17.2853 3.90918L17.5896 4.86175L17.2853 3.90918ZM17.9872 3.94419L18.3848 3.02663L18.3848 3.02663L17.9872 3.94419ZM18.6243 4.4822L17.9172 5.1893L17.9172 5.18931L18.6243 4.4822ZM19.5178 5.37567L20.2249 4.66856L20.2249 4.66856L19.5178 5.37567ZM20.0558 6.01275L20.9733 5.61517L20.9733 5.61516L20.0558 6.01275ZM20.0908 6.71464L21.0434 7.01895L21.0434 7.01894L20.0908 6.71464ZM19.6188 7.4021L18.8449 6.76886L18.8449 6.76886L19.6188 7.4021ZM18.7975 8.64056L17.8064 8.50724L17.8064 8.50725L18.7975 8.64056ZM19.182 9.56893L18.5755 10.364L18.5755 10.364L19.182 9.56893ZM20.6385 9.86385L20.738 8.86882L20.6385 9.86385ZM21.4584 10.0162L21.9168 9.1275L21.9168 9.1275L21.4584 10.0162ZM21.9299 10.5373L22.8599 10.1696L22.8599 10.1696L21.9299 10.5373ZM21.93 13.4626L21 13.095L21 13.095L21.93 13.4626ZM21.4583 13.9838L21.9166 14.8726L21.9166 14.8726L21.4583 13.9838ZM20.6386 14.1361L20.5391 13.1411L20.5065 13.1444L20.4742 13.1497L20.6386 14.1361ZM20.6386 14.1361L20.7381 15.1312L20.7707 15.1279L20.803 15.1225L20.6386 14.1361ZM19.1825 14.4309L18.5762 13.6357L18.5762 13.6357L19.1825 14.4309ZM18.7979 15.3596L17.8068 15.4931V15.4931L18.7979 15.3596ZM19.619 16.5976L18.845 17.2308H18.845L19.619 16.5976ZM20.0908 17.2848L19.1383 17.5892V17.5892L20.0908 17.2848ZM20.0558 17.9869L19.1383 17.5892L19.1383 17.5892L20.0558 17.9869ZM19.5179 18.6238L20.225 19.3309H20.225L19.5179 18.6238ZM18.6243 19.5174L17.9172 18.8102L17.9172 18.8103L18.6243 19.5174ZM17.9873 20.0554L18.3849 20.9729L18.3849 20.9729L17.9873 20.0554ZM17.2854 20.0904L16.981 21.0429L16.981 21.0429L17.2854 20.0904ZM16.5979 19.6184L17.2312 18.8444L17.2226 18.8376L16.5979 19.6184ZM16.5979 19.6184L15.9646 20.3924L15.9732 20.3993L16.5979 19.6184ZM15.3595 18.7971L15.4928 17.806H15.4928L15.3595 18.7971ZM14.4311 19.1816L15.2262 19.7882L15.2262 19.7881L14.4311 19.1816ZM14.1362 20.6383L13.1411 20.5388V20.5388L14.1362 20.6383ZM13.9837 21.4585L13.095 21L13.095 21L13.9837 21.4585ZM13.4628 21.9299L13.095 21L13.095 21L13.4628 21.9299ZM10.5373 21.9299L10.905 21L10.5373 21.9299ZM10.0162 21.4584L10.905 21H10.905L10.0162 21.4584ZM9.86385 20.6385L8.86882 20.7381V20.7381L9.86385 20.6385ZM9.56892 19.182L8.77387 19.7885L8.77387 19.7885L9.56892 19.182ZM8.64057 18.7975L8.50728 17.8064H8.50727L8.64057 18.7975ZM7.40208 19.6189L6.76884 18.8449L6.753 18.8579L6.73771 18.8714L7.40208 19.6189ZM7.40206 19.6189L8.0353 20.3928L8.05113 20.3799L8.06643 20.3663L7.40206 19.6189ZM6.71458 20.0908L7.01887 21.0434H7.01887L6.71458 20.0908ZM6.01272 20.0558L5.61515 20.9734H5.61515L6.01272 20.0558ZM5.37561 19.5178L6.08271 18.8107H6.08271L5.37561 19.5178ZM4.48217 18.6243L3.77506 19.3315L3.77506 19.3315L4.48217 18.6243ZM3.94414 17.9873L4.86171 17.5897L4.86171 17.5897L3.94414 17.9873ZM3.90913 17.2854L4.86171 17.5897L4.86171 17.5897L3.90913 17.2854ZM4.3811 16.5979L5.15506 17.2311H5.15506L4.3811 16.5979ZM5.20247 15.3594L6.19355 15.4928L5.20247 15.3594ZM4.81792 14.4311L5.42445 13.636L5.42445 13.636L4.81792 14.4311ZM3.36143 14.1361L3.26193 15.1312H3.26193L3.36143 14.1361ZM2.54161 13.9838L3 13.095H3L2.54161 13.9838ZM2.07005 13.4627L1.14009 13.8304L1.14009 13.8304L2.07005 13.4627ZM2.07008 10.5372L1.14017 10.1694L1.14017 10.1694L2.07008 10.5372ZM2.54152 10.0163L2.08305 9.12757L2.08305 9.12757L2.54152 10.0163ZM3.36155 9.86384V8.86384H3.31167L3.26205 8.86881L3.36155 9.86384ZM3.36156 9.86384V10.8638H3.41143L3.46106 10.8589L3.36156 9.86384ZM4.81842 9.56881L4.21178 8.77383L4.21177 8.77383L4.81842 9.56881ZM5.20287 8.64066L6.19396 8.50749L6.19396 8.50749L5.20287 8.64066ZM4.38128 7.40182L5.15523 6.76858H5.15523L4.38128 7.40182ZM3.90914 6.71405L4.86175 6.40988L4.86175 6.40988L3.90914 6.71405ZM3.94413 6.01243L3.02651 5.61498L3.02651 5.61498L3.94413 6.01243ZM4.48233 5.37509L5.18944 6.0822H5.18944L4.48233 5.37509ZM5.37565 4.48177L4.66855 3.77466V3.77466L5.37565 4.48177ZM6.01277 3.94373L5.6152 3.02615L5.6152 3.02616L6.01277 3.94373ZM6.71463 3.90872L7.01892 2.95614V2.95614L6.71463 3.90872ZM7.4022 4.38076L8.03543 3.60681V3.60681L7.4022 4.38076ZM8.64044 5.20207L8.77391 4.21101L8.64044 5.20207ZM9.56907 4.81742L8.77391 4.21101L8.77391 4.21101L9.56907 4.81742ZM9.86387 3.36131L10.8589 3.46081V3.46081L9.86387 3.36131ZM10.0162 2.5417L9.12739 2.08341L9.12739 2.08341L10.0162 2.5417ZM10.5374 2.07001L10.905 3L10.905 3L10.5374 2.07001ZM13.4627 2.07005L13.8304 1.1401V1.1401L13.4627 2.07005ZM15.1312 3.26194C15.1108 3.05831 15.0912 2.85693 15.0626 2.6868C15.0324 2.50684 14.9828 2.29705 14.8725 2.08322L13.095 3C13.0721 2.95549 13.0769 2.93878 13.0902 3.01798C13.1052 3.10701 13.1181 3.23089 13.1411 3.46094L15.1312 3.26194ZM15.2261 4.21141C15.2894 4.29433 15.2693 4.33101 15.2342 4.13595C15.2008 3.95045 15.1739 3.68915 15.1312 3.26194L13.1411 3.46094C13.1805 3.85459 13.2152 4.20895 13.2658 4.49017C13.3147 4.76184 13.4009 5.11633 13.636 5.42445L15.2261 4.21141ZM15.2261 4.21141L15.2261 4.21141L13.636 5.42444C14.0718 5.99575 14.7806 6.28935 15.4928 6.19355L15.2261 4.21141ZM15.9646 3.60717C15.6323 3.87905 15.4286 4.04481 15.2738 4.15238C15.1111 4.26548 15.1228 4.22531 15.2261 4.21141L15.4928 6.19355C15.8768 6.14188 16.1885 5.95223 16.4152 5.7947C16.6498 5.63163 16.9249 5.4056 17.2311 5.15509L15.9646 3.60717ZM16.981 2.95661C16.7518 3.02983 16.5684 3.14308 16.4198 3.24897C16.2793 3.34907 16.123 3.47759 15.9646 3.60717L17.2311 5.15509C17.41 5.00869 17.5068 4.93022 17.5803 4.87784C17.6457 4.83124 17.6373 4.84651 17.5896 4.86175L16.981 2.95661ZM18.3848 3.02663C17.9408 2.83421 17.442 2.80934 16.981 2.95661L17.5896 4.86175L17.5896 4.86175L18.3848 3.02663ZM19.3314 3.77509C19.1867 3.6304 19.044 3.48696 18.9142 3.37338C18.7768 3.25323 18.6056 3.12228 18.3848 3.02663L17.5896 4.86175C17.5437 4.84184 17.5369 4.82581 17.5973 4.87869C17.6653 4.93813 17.7537 5.02583 17.9172 5.1893L19.3314 3.77509ZM20.2249 4.66856L19.3314 3.77509L17.9172 5.18931L18.8107 6.08277L20.2249 4.66856ZM20.9733 5.61516C20.8777 5.39441 20.7467 5.22316 20.6266 5.08581C20.513 4.95597 20.3696 4.81326 20.2249 4.66856L18.8106 6.08277C18.9741 6.24626 19.0618 6.33469 19.1213 6.40264C19.1742 6.46308 19.1581 6.45629 19.1382 6.41034L20.9733 5.61516ZM21.0434 7.01894C21.1906 6.55797 21.1658 6.05922 20.9733 5.61517L19.1382 6.41034L19.1382 6.41034L21.0434 7.01894ZM20.3928 8.03534C20.5224 7.87696 20.6509 7.72069 20.751 7.58019C20.8569 7.43156 20.9701 7.24814 21.0434 7.01895L19.1382 6.41033C19.1535 6.36263 19.1687 6.35427 19.1221 6.41968C19.0697 6.4932 18.9913 6.58992 18.8449 6.76886L20.3928 8.03534ZM19.7885 8.77387C19.7746 8.87723 19.7345 8.88894 19.8476 8.72619C19.9551 8.57141 20.1209 8.36764 20.3928 8.03534L18.8449 6.76886C18.5943 7.07506 18.3683 7.35016 18.2052 7.58481C18.0477 7.81148 17.8581 8.12317 17.8064 8.50724L19.7885 8.77387ZM19.7885 8.77387V8.77386L17.8064 8.50725C17.7106 9.21938 18.0042 9.92816 18.5755 10.364L19.7885 8.77387ZM20.738 8.86882C20.3108 8.82609 20.0495 8.79922 19.864 8.76584C19.6689 8.73073 19.7056 8.7106 19.7885 8.77387L18.5755 10.364C18.8836 10.599 19.2381 10.6853 19.5098 10.7342C19.791 10.7848 20.1454 10.8195 20.539 10.8589L20.738 8.86882ZM21.9168 9.1275C21.703 9.01721 21.4932 8.96759 21.3132 8.93737C21.1431 8.9088 20.9417 8.88918 20.738 8.86882L20.539 10.8589C20.7691 10.8819 20.893 10.8948 20.982 10.9098C21.0612 10.9231 21.0445 10.9279 21 10.905L21.9168 9.1275ZM22.8599 10.1696C22.682 9.71957 22.3469 9.34933 21.9168 9.1275L21 10.905L21 10.905L22.8599 10.1696ZM23 11.3682C23 11.1636 23.0005 10.9613 22.989 10.7891C22.9769 10.607 22.9484 10.3933 22.8599 10.1696L21 10.905C20.9816 10.8584 20.9881 10.8423 20.9935 10.9224C20.9995 11.0125 21 11.137 21 11.3682H23ZM23 12.6319V11.3682H21V12.6319H23ZM22.86 13.8302C22.9484 13.6065 22.9769 13.3929 22.989 13.2108C23.0005 13.0388 23 12.8365 23 12.6319H21C21 12.863 20.9995 12.9875 20.9935 13.0776C20.9881 13.1577 20.9816 13.1416 21 13.095L22.86 13.8302ZM21.9166 14.8726C22.3469 14.6507 22.682 14.2804 22.86 13.8302L21 13.095V13.095L21.9166 14.8726ZM20.7381 15.1312C20.9417 15.1108 21.1431 15.0912 21.3132 15.0626C21.4931 15.0324 21.7028 14.9828 21.9166 14.8726L21 13.095C21.0445 13.0721 21.0612 13.077 20.982 13.0902C20.893 13.1052 20.7691 13.1181 20.5391 13.1411L20.7381 15.1312ZM20.803 15.1225L20.803 15.1225L20.4742 13.1497L20.4742 13.1497L20.803 15.1225ZM19.7889 15.2261C19.706 15.2893 19.6693 15.2692 19.8644 15.2341C20.0498 15.2007 20.311 15.1739 20.7381 15.1312L20.5391 13.1411C20.1456 13.1805 19.7913 13.2151 19.5102 13.2657C19.2386 13.3146 18.8842 13.4008 18.5762 13.6357L19.7889 15.2261ZM19.7889 15.2261L19.7889 15.2261L18.5762 13.6357C18.0046 14.0716 17.7108 14.7807 17.8068 15.4931L19.7889 15.2261ZM20.3929 15.9643C20.1212 15.6322 19.9555 15.4285 19.8479 15.2738C19.7348 15.1111 19.775 15.1228 19.7889 15.2261L17.8068 15.4931C17.8585 15.877 18.0481 16.1886 18.2056 16.4152C18.3686 16.6497 18.5946 16.9247 18.845 17.2308L20.3929 15.9643ZM21.0433 16.9803C20.9701 16.7513 20.8569 16.5679 20.751 16.4193C20.651 16.2789 20.5225 16.1227 20.3929 15.9643L18.845 17.2308C18.9914 17.4097 19.0698 17.5064 19.1222 17.5799C19.1688 17.6453 19.1535 17.6369 19.1383 17.5892L21.0433 16.9803ZM20.9733 18.3846C21.1658 17.9404 21.1907 17.4415 21.0433 16.9803L19.1383 17.5892L19.1383 17.5892L20.9733 18.3846ZM20.225 19.3309C20.3697 19.1862 20.5131 19.0436 20.6266 18.9138C20.7467 18.7765 20.8776 18.6053 20.9733 18.3846L19.1383 17.5892C19.1582 17.5433 19.1742 17.5365 19.1213 17.5969C19.0619 17.6648 18.9742 17.7532 18.8108 17.9167L20.225 19.3309ZM19.3314 20.2245L20.225 19.3309L18.8108 17.9167L17.9172 18.8102L19.3314 20.2245ZM18.3849 20.9729C18.6056 20.8773 18.7769 20.7463 18.9142 20.6262C19.044 20.5126 19.1867 20.3692 19.3314 20.2245L17.9172 18.8103C17.7537 18.9737 17.6653 19.0614 17.5974 19.1209C17.5369 19.1737 17.5437 19.1577 17.5897 19.1378L18.3849 20.9729ZM16.981 21.0429C17.442 21.1902 17.9408 21.1653 18.3849 20.9729L17.5897 19.1378H17.5897L16.981 21.0429ZM15.9647 20.3924C16.1231 20.522 16.2793 20.6505 16.4198 20.7506C16.5684 20.8565 16.7519 20.9697 16.981 21.0429L17.5897 19.1378C17.6374 19.153 17.6457 19.1683 17.5803 19.1217C17.5068 19.0693 17.4101 18.9909 17.2312 18.8445L15.9647 20.3924ZM15.9732 20.3993L15.9732 20.3993L17.2226 18.8376L17.2226 18.8375L15.9732 20.3993ZM15.2262 19.7881C15.1228 19.7742 15.1111 19.7341 15.2738 19.8472C15.4286 19.9547 15.6324 20.1205 15.9647 20.3924L17.2311 18.8445C16.925 18.5939 16.6499 18.3679 16.4152 18.2048C16.1886 18.0473 15.8769 17.8577 15.4928 17.806L15.2262 19.7881ZM15.2262 19.7881H15.2262L15.4928 17.806C14.7807 17.7102 14.0719 18.0038 13.636 18.5751L15.2262 19.7881ZM15.1312 20.7378C15.1739 20.3105 15.2008 20.0492 15.2342 19.8636C15.2693 19.6685 15.2894 19.7052 15.2262 19.7882L13.636 18.5751C13.401 18.8832 13.3147 19.2378 13.2658 19.5094C13.2152 19.7907 13.1805 20.1451 13.1411 20.5388L15.1312 20.7378ZM14.8724 21.917C14.9828 21.7031 15.0324 21.4932 15.0626 21.3132C15.0912 21.143 15.1108 20.9415 15.1312 20.7378L13.1411 20.5388C13.1181 20.769 13.1052 20.8929 13.0902 20.982C13.0769 21.0612 13.072 21.0445 13.095 21L14.8724 21.917ZM13.8306 22.8598C14.2805 22.6819 14.6506 22.3469 14.8724 21.917L13.095 21L13.095 21L13.8306 22.8598ZM12.6316 23C12.8363 23 13.0387 23.0005 13.2109 22.989C13.393 22.9768 13.6068 22.9483 13.8306 22.8598L13.095 21C13.1416 20.9816 13.1577 20.9881 13.0776 20.9935C12.9875 20.9995 12.8629 21 12.6316 21V23ZM11.3682 23H12.6316V21H11.3682V23ZM10.1696 22.8599C10.3933 22.9484 10.607 22.9769 10.7891 22.989C10.9613 23.0005 11.1636 23 11.3682 23V21C11.137 21 11.0125 20.9995 10.9224 20.9935C10.8423 20.9881 10.8584 20.9816 10.905 21L10.1696 22.8599ZM9.1275 21.9168C9.34933 22.3469 9.71958 22.682 10.1696 22.8599L10.905 21L9.1275 21.9168ZM8.86882 20.7381C8.88918 20.9417 8.9088 21.1431 8.93737 21.3132C8.96759 21.4932 9.01721 21.703 9.1275 21.9168L10.905 21C10.9279 21.0445 10.9231 21.0612 10.9098 20.982C10.8948 20.893 10.8819 20.7691 10.8589 20.539L8.86882 20.7381ZM8.77387 19.7885C8.7106 19.7056 8.73073 19.6689 8.76584 19.864C8.79922 20.0495 8.82609 20.3108 8.86882 20.7381L10.8589 20.539C10.8195 20.1454 10.7848 19.791 10.7342 19.5098C10.6853 19.2381 10.599 18.8836 10.364 18.5755L8.77387 19.7885ZM8.77387 19.7885L10.364 18.5755C9.92815 18.0042 9.21939 17.7106 8.50728 17.8064L8.77387 19.7885ZM8.03531 20.3928C8.36763 20.1209 8.5714 19.9551 8.72619 19.8476C8.88895 19.7345 8.87724 19.7746 8.77387 19.7885L8.50727 17.8064C8.12318 17.858 7.81149 18.0477 7.58481 18.2052C7.35015 18.3683 7.07504 18.5944 6.76884 18.8449L8.03531 20.3928ZM8.06643 20.3663L8.06644 20.3663L6.73771 18.8714L6.7377 18.8715L8.06643 20.3663ZM7.01887 21.0434C7.24807 20.9702 7.4315 20.8569 7.58013 20.751C7.72064 20.6509 7.87691 20.5224 8.0353 20.3928L6.76883 18.8449C6.58988 18.9913 6.49316 19.0698 6.41963 19.1222C6.35422 19.1688 6.36258 19.1535 6.41029 19.1383L7.01887 21.0434ZM5.61515 20.9734C6.05919 21.1658 6.55791 21.1907 7.01887 21.0434L6.41029 19.1383L6.41029 19.1383L5.61515 20.9734ZM4.6685 20.2249C4.81321 20.3696 4.95592 20.513 5.08577 20.6266C5.22313 20.7468 5.39438 20.8777 5.61515 20.9734L6.41029 19.1383C6.45624 19.1582 6.46304 19.1742 6.40259 19.1213C6.33464 19.0619 6.2462 18.9742 6.08271 18.8107L4.6685 20.2249ZM3.77506 19.3315L4.6685 20.2249L6.08271 18.8107L5.18927 17.9172L3.77506 19.3315ZM3.02657 18.3848C3.12223 18.6056 3.25318 18.7768 3.37333 18.9142C3.48692 19.044 3.63036 19.1868 3.77506 19.3315L5.18928 17.9172C5.02579 17.7538 4.93809 17.6653 4.87864 17.5974C4.82577 17.5369 4.8418 17.5437 4.86171 17.5897L3.02657 18.3848ZM2.95656 16.9811C2.8093 17.4421 2.83417 17.9408 3.02657 18.3848L4.86171 17.5897V17.5897L2.95656 16.9811ZM3.60715 15.9647C3.47756 16.123 3.34903 16.2793 3.24892 16.4198C3.14303 16.5684 3.02977 16.7519 2.95656 16.9811L4.86171 17.5897C4.84647 17.6374 4.83119 17.6457 4.87779 17.5803C4.93018 17.5068 5.00865 17.4101 5.15506 17.2311L3.60715 15.9647ZM4.2114 15.2261C4.2253 15.1228 4.26548 15.1111 4.15237 15.2738C4.0448 15.4286 3.87903 15.6324 3.60715 15.9647L5.15506 17.2311C5.40558 16.9249 5.63162 16.6498 5.79469 16.4152C5.95222 16.1885 6.14188 15.8768 6.19355 15.4928L4.2114 15.2261ZM4.2114 15.2261L4.2114 15.2261L6.19355 15.4928C6.28934 14.7806 5.99575 14.0718 5.42445 13.636L4.2114 15.2261ZM3.26193 15.1312C3.68915 15.1739 3.95044 15.2008 4.13595 15.2342C4.33101 15.2693 4.29432 15.2894 4.2114 15.2261L5.42445 13.636C5.11633 13.4009 4.76184 13.3147 4.49017 13.2658C4.20894 13.2152 3.85458 13.1805 3.46093 13.1411L3.26193 15.1312ZM2.08323 14.8725C2.29705 14.9828 2.50683 15.0324 2.6868 15.0626C2.85693 15.0912 3.05831 15.1108 3.26193 15.1312L3.46094 13.1411C3.23089 13.1181 3.10701 13.1052 3.01798 13.0902C2.93878 13.0769 2.95549 13.0721 3 13.095L2.08323 14.8725ZM1.14009 13.8304C1.31803 14.2804 1.65311 14.6507 2.08323 14.8725L3 13.095H3L1.14009 13.8304ZM1 12.6318C1 12.8364 0.999483 13.0387 1.01098 13.2109C1.02314 13.393 1.05163 13.6066 1.14009 13.8304L3 13.095C3.01841 13.1416 3.01188 13.1577 3.00653 13.0776C3.00052 12.9875 3 12.863 3 12.6318H1ZM1 11.3683V12.6318H3V11.3683H1ZM1.14017 10.1694C1.05166 10.3932 1.02315 10.607 1.01098 10.7891C0.999483 10.9613 1 11.1637 1 11.3683H3C3 11.1371 3.00052 11.0125 3.00654 10.9224C3.01189 10.8423 3.01842 10.8584 3 10.905L1.14017 10.1694ZM2.08305 9.12757C1.65308 9.34939 1.3181 9.71954 1.14017 10.1694L3 10.905L3 10.905L2.08305 9.12757ZM3.26205 8.86881C3.05837 8.88917 2.85694 8.9088 2.68677 8.93737C2.50676 8.9676 2.29692 9.01724 2.08305 9.12757L3 10.905C2.95548 10.928 2.93877 10.9231 3.01798 10.9098C3.10704 10.8948 3.23094 10.8819 3.46105 10.8589L3.26205 8.86881ZM3.36155 8.86384H3.36155V10.8638H3.36155V8.86384ZM3.36156 8.86384H3.36155V10.8638H3.36156V8.86384ZM4.21177 8.77383C4.29471 8.71055 4.33141 8.73069 4.1363 8.7658C3.95075 8.7992 3.68939 8.82607 3.26205 8.86881L3.46106 10.8589C3.85482 10.8195 4.20927 10.7848 4.49056 10.7342C4.76231 10.6853 5.1169 10.5989 5.42506 10.3638L4.21177 8.77383ZM4.21177 8.77383L4.21178 8.77383L5.42506 10.3638C5.99613 9.92801 6.28962 9.21944 6.19396 8.50749L4.21177 8.77383ZM3.60732 8.03506C3.87929 8.36746 4.04511 8.5713 4.15272 8.72614C4.26586 8.88895 4.22567 8.87724 4.21177 8.77383L6.19396 8.50749C6.14234 8.1233 5.95263 7.81151 5.79506 7.58478C5.63195 7.35006 5.40584 7.07487 5.15523 6.76858L3.60732 8.03506ZM2.95652 7.01822C3.02973 7.24751 3.14303 7.43102 3.24896 7.5797C3.3491 7.72027 3.47768 7.8766 3.60732 8.03506L5.15523 6.76858C5.00876 6.58956 4.93026 6.49279 4.87785 6.41923C4.83123 6.35379 4.84651 6.36215 4.86175 6.40988L2.95652 7.01822ZM3.02651 5.61498C2.83424 6.05887 2.80938 6.5574 2.95652 7.01822L4.86175 6.40988L3.02651 5.61498ZM3.77523 4.66798C3.63047 4.81274 3.48698 4.9555 3.37335 5.08539C3.25316 5.2228 3.12217 5.39412 3.02651 5.61498L4.86175 6.40988C4.84184 6.45585 4.8258 6.46265 4.8787 6.40219C4.93816 6.33421 5.02589 6.24574 5.18944 6.0822L3.77523 4.66798ZM4.66855 3.77466L3.77523 4.66798L5.18944 6.0822L6.08276 5.18888L4.66855 3.77466ZM4.66855 3.77466L4.66855 3.77466L6.08276 5.18888L6.08276 5.18887L4.66855 3.77466ZM5.6152 3.02616C5.39443 3.12181 5.22317 3.25276 5.08582 3.37292C4.95597 3.48651 4.81325 3.62995 4.66855 3.77466L6.08276 5.18887C6.24625 5.02538 6.33469 4.93768 6.40264 4.87824C6.46309 4.82536 6.45629 4.84139 6.41034 4.8613L5.6152 3.02616ZM7.01892 2.95614C6.55795 2.80889 6.05923 2.83377 5.6152 3.02615L6.41033 4.8613H6.41034L7.01892 2.95614ZM8.03543 3.60681C7.87702 3.47719 7.72073 3.34865 7.58021 3.24853C7.43158 3.14264 7.24813 3.02936 7.01892 2.95614L6.41034 4.8613C6.36262 4.84606 6.35426 4.83078 6.41969 4.8774C6.49324 4.9298 6.58999 5.00829 6.76896 5.15472L8.03543 3.60681ZM8.77391 4.21101C8.87727 4.22493 8.88897 4.26509 8.72621 4.15198C8.57144 4.04441 8.36769 3.87865 8.03543 3.60681L6.76896 5.15472C7.07512 5.40521 7.35018 5.63122 7.58477 5.79427C7.81138 5.95176 8.123 6.14141 8.50697 6.19312L8.77391 4.21101ZM8.77391 4.21101L8.77391 4.21101L8.50697 6.19312C9.21932 6.28905 9.92836 5.99536 10.3642 5.42382L8.77391 4.21101ZM8.86883 3.2618C8.82612 3.6889 8.79926 3.95012 8.76589 4.13558C8.7308 4.33059 8.71068 4.29392 8.77391 4.21101L10.3642 5.42382C10.5992 5.11576 10.6854 4.76136 10.7343 4.48976C10.7849 4.20861 10.8196 3.85435 10.8589 3.46081L8.86883 3.2618ZM9.12739 2.08341C9.01716 2.29719 8.96756 2.50692 8.93736 2.68683C8.9088 2.85692 8.88919 3.05824 8.86883 3.2618L10.8589 3.46081C10.8819 3.23082 10.8948 3.10698 10.9098 3.01798C10.923 2.9388 10.9279 2.9555 10.905 3L9.12739 2.08341ZM10.1698 1.14002C9.71962 1.31796 9.34924 1.65315 9.12739 2.08341L10.905 3L10.905 3L10.1698 1.14002ZM11.3681 1C11.1635 1 10.9612 0.999483 10.7892 1.01097C10.6071 1.02313 10.3935 1.05161 10.1698 1.14002L10.905 3C10.8584 3.0184 10.8423 3.01188 10.9224 3.00653C11.0125 3.00052 11.137 3 11.3681 3V1ZM12.6318 1H11.3681V3H12.6318V1ZM13.8304 1.1401C13.6066 1.05163 13.393 1.02314 13.2109 1.01098C13.0387 0.999483 12.8364 1 12.6318 1V3C12.863 3 12.9875 3.00052 13.0776 3.00653C13.1577 3.01188 13.1416 3.01841 13.095 3L13.8304 1.1401ZM14.8725 2.08322C14.6507 1.65312 14.2804 1.31803 13.8304 1.1401L13.095 3L13.095 3L14.8725 2.08322ZM15 12C15 13.6569 13.6569 15 12 15V17C14.7614 17 17 14.7614 17 12H15ZM12 9C13.6569 9 15 10.3431 15 12H17C17 9.23858 14.7614 7 12 7V9ZM9 12C9 10.3431 10.3431 9 12 9V7C9.23858 7 7 9.23858 7 12H9ZM12 15C10.3431 15 9 13.6569 9 12H7C7 14.7614 9.23858 17 12 17V15Z"
                                                      fill="#33363F"
                                                   />
                                                </svg>
                                             </span>
                                             <p className="auth-dropdonp">Customize Menu</p>
                                          </li>
                                       </Link>
                                       <li className="nav-auth-dropdown-li">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="21"
                                             height="23"
                                             viewBox="0 0 21 23"
                                             fill="none"
                                          >
                                             <path
                                                d="M11.9999 11.3806C12.3332 11.3806 12.5809 11.1106 12.5809 10.7996C12.5809 10.4681 12.3109 10.2186 11.9999 10.2186H4.60889C4.27742 10.2186 4.02789 10.4886 4.02789 10.7996C4.02789 11.1311 4.2979 11.3806 4.60889 11.3806H11.9999ZM14.4226 3.67491L17.7931 0.110699C17.9216 0.00269287 18.0519 -0.0401372 18.2028 0.0455229L20.9141 2.67119C21.0221 2.79968 21.0426 2.95052 20.8918 3.10135L17.4579 6.73074L14.4226 3.67491ZM16.3387 7.87225L12.8639 8.59105L13.3034 4.81456L16.3387 7.87225ZM3.56421 2.43842H11.3351L10.7671 3.63952H3.56421C2.91617 3.63952 2.32586 3.90582 1.8957 4.33412C1.46553 4.76242 1.2011 5.35086 1.2011 6.00263V14.5202C1.2011 15.1683 1.4674 15.7604 1.8957 16.1887C2.324 16.617 2.91431 16.8833 3.56421 16.8833H4.25694V16.8852L4.29604 16.887C4.62565 16.9094 4.87704 17.1962 4.85283 17.5258L4.6182 20.8963L9.0837 18.1943C9.1917 18.0863 9.34068 18.0211 9.50641 18.0211H16.4561C17.1041 18.0211 17.6944 17.7567 18.1246 17.3265C18.5529 16.8982 18.8192 16.306 18.8192 15.658V9.39551H20.0631V17.3451C20.1283 19.1384 19.3964 20.1459 16.4449 20.2688L10.4394 20.131L4.34446 22.7138L4.31466 22.738C4.06327 22.954 3.68525 22.9242 3.46923 22.671C3.36309 22.5462 3.31654 22.3935 3.32585 22.2427L3.61448 18.0826H3.56607C2.58656 18.0826 1.69458 17.6822 1.04841 17.036C0.400368 16.3936 0 15.5016 0 14.5221V6.00263C0 5.02312 0.400368 4.13114 1.04654 3.48496C1.69086 2.83879 2.58284 2.43842 3.56421 2.43842ZM14.8397 14.604C15.173 14.604 15.4207 14.334 15.4207 14.023C15.4207 13.6897 15.1507 13.442 14.8397 13.442H4.60889C4.27742 13.442 4.02789 13.712 4.02789 14.023C4.02789 14.3545 4.2979 14.604 4.60889 14.604H14.8397ZM9.38351 8.15903C9.71498 8.15903 9.96451 7.88901 9.96451 7.57803C9.96451 7.26704 9.69449 6.99703 9.38351 6.99703H4.60889C4.27742 6.99703 4.02789 7.26704 4.02789 7.57803C4.02789 7.90949 4.2979 8.15903 4.60889 8.15903H9.38351Z"
                                                fill="black"
                                             />
                                          </svg>
                                          <p className="auth-dropdonp">Give us Feedback</p>
                                       </li>
                                       <li className="nav-auth-dropdown-li" onClick={handleLogout}>
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="23"
                                                viewBox="0 0 22 23"
                                                fill="none"
                                             >
                                                <path
                                                   fill-rule="evenodd"
                                                   clip-rule="evenodd"
                                                   d="M11.5899 0.00597623L0.560675 1.59792C0.253418 1.64236 0 1.94935 0 2.25454V21.0545C0 21.3584 0.250169 21.4755 0.560675 21.5172L11.5899 22.997C11.9 23.0383 12.1506 22.6482 12.1506 22.3404V0.468705C12.1506 0.160817 11.8939 -0.0375588 11.5899 0.00597623ZM17.3897 14.7756L17.3893 13.2465C17.3624 13.2541 17.3336 13.2586 17.3043 13.2586H14.8226C14.6578 13.2586 14.5232 13.1257 14.5232 12.9691V9.99795C14.5232 9.84176 14.6611 9.70846 14.8226 9.70846H17.3043C17.3336 9.70846 17.3619 9.71295 17.3888 9.72058V8.19191C17.3888 7.90961 17.6255 7.68026 17.9175 7.68026C18.0702 7.68026 18.2076 7.7431 18.3041 7.84319L21.832 11.0253C22.045 11.2169 22.0571 11.5401 21.8589 11.7461L18.2874 15.1387C18.0799 15.3362 17.7457 15.3335 17.5415 15.1328C17.4448 15.0374 17.3903 14.9092 17.3897 14.7756ZM13.3397 20.5895H14.7795V15.5049H15.957V20.6169C15.957 20.9208 15.827 21.1981 15.6195 21.3996C15.4121 21.6025 15.1243 21.7277 14.8078 21.7277H13.3397V20.5895ZM14.7795 7.46259V2.37796H13.3397V1.23977H14.8078C15.1238 1.23977 15.4116 1.36499 15.6195 1.56606C15.827 1.76713 15.957 2.04539 15.957 2.35104V7.46259H14.7795ZM10.7104 10.0891L9.55329 9.83413V13.1661L10.7104 12.8439V10.0891Z"
                                                   fill="#33363F"
                                                />
                                             </svg>
                                          </span>
                                          <p className="auth-dropdonp">Sign Out</p>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </header>
      </div>
   );
};

export default page;
