"use client";
import React, { useEffect, useState, useRef } from "react";
import Masterdashboardlayout from "../../component/Masterdashboardlayout/Masterdashboardlayout";
import TopNewsCaro from "./TopNewsCaro";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { host } from "@/environment";
import axiosInstance from "../../../utils/axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Leftsidebar from "@/component/leftsidebar/page";
import Link from "next/link";
import PostList from "@/component/NewsFeed/OldPostList";
import LocationModal from "@/component/NewsFeed/LocationModal";
import FeatureUser from "@/component/NewsFeed/FeatureUser";
import FeelingAndActivity from "@/component/NewsFeed/FeelingAndActivity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
// import Select from 'react-select';
import NewsfeedStory from "./_ui/NewsfeedStory";
import "./newsfeed-style.css";
import Sponsored from "@/component/SideBar/Sponsored";
import Campaign from "./_ui/Campaign";

const Newsfeed = () => {
   const colorsRef = useRef(null);

   const router = useRouter();
   useEffect(() => {
      if (router.pathname === "/newsfeed") {
         window.location.reload();
      }
   }, []);

   const [openLocationModal, setOpenLocationModal] = useState(false);
   const [openFeelingModal, setOpenFeelingModal] = useState(false);

   const closeModal = () => {
      setOpenLocationModal(false);
   };

   const closeFeelingModal = () => {
      setOpenFeelingModal(false);
   };

   const [activityData, setActivityData] = useState({
      activity_name: "",
      activity_type: "",
      logo: "",
      activity_id: "",
      sub_activity_id: "",
      feeling_id: "",
   });

   const [textColor, setTextColor] = useState(null);

   const [fullName, setFullName] = React.useState("");
   const [profileImage, setprofileImage] = useState("");
   useEffect(() => {
      if (typeof window !== "undefined") {
         const userInfoJSON = localStorage.getItem("userInfo");

         if (userInfoJSON) {
            const userInfo = JSON.parse(userInfoJSON);

            // Now you can access properties from userInfo
            const profile_image = userInfo[0].profile_pic;
            setprofileImage(profile_image);
         }
         const localStorageFullName = localStorage.getItem("fullname");
         const localStorageUsername = localStorage.getItem("username");
         setFullName(localStorageFullName);
      }
      getPages();
      getPeopleMayKnow();
   }, []);

   const [locationChildData, setlocationChildData] = useState(null);

   const handlelocationChildData = (data) => {
      setlocationChildData(data);
   };

   const handleFeelingChildData = (data) => {
      setActivityData(data);
   };

   // Mobile
   const [pageList, setPageList] = useState([]);
   const [suggestionList, setSuggestionList] = useState([]);

   const getPages = () => {
      axiosInstance.get("/api/get-all-pages").then((res) => {
         if (res.data.status == 200) setPageList(res.data.data.slice(0, 4));
      });
   };

   const getPeopleMayKnow = () => {
      axiosInstance.get("/api/suggestion-list?limit=3").then((res) => {
         if (res.data.status == 200) setSuggestionList(res.data.userlist);
      });
   };

   const handleFollowPage = (page_id, index) => {
      const formData = {
         page_id: page_id,
         follow_unfollow_status: 1,
      };

      axiosInstance
         .post("/api/follow-page", formData)
         .then((res) => {
            if (res.data.status === 200) {
               toast.success(res.data.message, {
                  position: "top-right",
                  style: {
                     background: "white",
                     color: "black",
                  },
               });
            } else {
               toast.error(res.data.message, {
                  position: "top-right",
                  style: {
                     background: "white",
                     color: "black",
                  },
               });
            }

            getPages();
         })
         .catch((error) => {
            toast.error("An error occurred while processing your request", {
               position: "top-right",
               style: {
                  background: "white",
                  color: "black",
               },
            });
         });
   };

   const handleFriendReq = (user_id, index) => {
      axiosInstance
         .post("/api/send-friend-request", {
            connected_user_id: user_id,
         })
         .then((res) => {
            if (res.data.status === 200) {
               toast.success(res.data.message, {
                  position: "top-right",
                  style: {
                     background: "white",
                     color: "black",
                  },
               });
            } else {
               toast.error(res.data.message, {
                  position: "top-right",
                  style: {
                     background: "white",
                     color: "black",
                  },
               });
            }

            getPeopleMayKnow();
         })
         .catch((error) => {
            toast.error("An error occurred while processing your request", {
               position: "top-right",
               style: {
                  background: "white",
                  color: "black",
               },
            });
         });
   };

   return (
      <Masterdashboardlayout headerName="Newsfeed">
         <div className=" container-fluid ">
            <div className="row">
               {/* Main Content */}
               <main className="col col-xl-6 order-xl-2 p-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                  <NewsfeedStory />

                  <div id="newsfeed-items-grid">
                     <PostList />
                  </div>
               </main>

               {/* Left Sidebar */}
               <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
                  <div>
                     <Leftsidebar />
                  </div>
               </aside>

               <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
                  <div className="">
                     <div className="ui-block-news ">
                        {/* W-Weather */}
                        <TopNewsCaro />
                     </div>

                     <div className="ui-block">
                        <div className="ui-block-title">
                           <h6 className="title">Pages You May Follow</h6>
                        </div>
                        {/* W-Friend-Pages-Added */}
                        <ul className="">
                           {pageList.map((item, index) => (
                              <li className="inline-items">
                                 <div className="people-added-div">
                                    <div className="people-added-img-text">
                                       <div className="texts-news-kno-img-div">
                                          <img src={`${host}/uploads/pages/${item.profile_pic}`} alt="author" className="texts-news-kno-img" />
                                       </div>
                                       <div className="texts">
                                          <Link href={`/pagePublicView/${item.page_user_name}`}>
                                             <h6 className="texts-news-know-h6">{item.page_name}</h6>
                                          </Link>
                                          <p className="texts-news-know-p"> {item.category}</p>
                                       </div>
                                    </div>

                                    <div className="follow-btn-div">
                                       <button
                                          className="follow-btn"
                                          onClick={() => {
                                             handleFollowPage(item._id, index);
                                          }}
                                       >
                                          Follow
                                       </button>
                                    </div>
                                 </div>
                              </li>
                           ))}
                        </ul>
                        {/* .. end W-Friend-Pages-Added */}
                     </div>

                     {/* People You May Know */}
                     <div className="ui-block">
                        <div className="ui-block-title">
                           <h6 className="title">People You May Know</h6>
                           <Link href={`/suggestedfriend/`}>
                              <h6 className="texts-news-know-h6">See All</h6>
                           </Link>
                        </div>
                        {/* W-Friend-Pages-Added */}
                        <ul className="">
                           {suggestionList?.map((item, index) => (
                              <li className="inline-items">
                                 <div className="people-added-div">
                                    <div className="people-added-img-text">
                                       <div className="texts-news-kno-img-div">
                                          <img
                                             src={item?.profile_pic ? `${host}/uploads/${item.profile_pic}` : `${host}/uploads/noimg.jpg`}
                                             // src={`${host}/uploads/${item.profile_pic}`}
                                             alt="author"
                                             className="texts-news-kno-img"
                                          />
                                       </div>
                                       <div className="texts">
                                          <Link href={`/${item.username}/timeline`}>
                                             <h6 className="texts-news-know-h6">{`${item.first_name} ${item.last_name}`}</h6>
                                          </Link>
                                          <p className="texts-news-know-p">Not Avaliable</p>
                                       </div>
                                    </div>

                                    <div className="follow-btn-div">
                                       <button
                                          onClick={() => {
                                             handleFriendReq(item._id, index);
                                          }}
                                          className="tas_follow_btn_style"
                                       >
                                          <img
                                             src={`${host}/assets/icon/AddFriendIcon.png`}
                                             alt="author"
                                             style={{
                                                width: "22px",
                                                height: "22px",
                                             }}
                                          />
                                       </button>
                                    </div>
                                 </div>
                              </li>
                           ))}
                        </ul>
                        {/* .. end W-Friend-Pages-Added */}
                     </div>

                     {/* People You May Know */}
                     <div className="ui-block">
                        <Sponsored left={true} />
                     </div>
                  </div>
               </aside>
               {/* ... end Left Sidebar */}

               <aside className="col col-xl-2 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12 first-left-menu">
                  <div className="scrollable_div ">
                     <div className="ui-block">
                        <FeatureUser />
                     </div>
                  </div>
               </aside>
            </div>
         </div>

         {/* Hidden file input */}
         <form encType="multipart/form-data">
            <input type="file" name="post_pic" accept="image/*" style={{ display: "none" }} />
         </form>
         <LocationModal isOpen={openLocationModal} onRequestClose={closeModal} sendDataToParent={handlelocationChildData} />
         <FeelingAndActivity isFeelingOpen={openFeelingModal} onRequestClose={closeFeelingModal} sendDataToParent={handleFeelingChildData} />
      </Masterdashboardlayout>
   );
};

export default Newsfeed;
