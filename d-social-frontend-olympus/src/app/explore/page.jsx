"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/component/navbar/page";
import Leftsidebar from "@/component/leftsidebar/page";
import PostList from "@/component/NewsFeed/OldPostList";
import FeatureUser from "@/component/NewsFeed/FeatureUser";
import Sponsored from "@/component/SideBar/Sponsored";
import TopNewsCaro from "../newsfeed/TopNewsCaro";
import "../newsfeed/newsfeed-style.css";
import Link from "next/link";
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchIconSvg from "@/assets/SearchIconSvg";
import "./_ui/Explore.modules.css";

const Page = () => {
   const [pageList, setPageList] = useState([]);
   const [suggestionList, setSuggestionList] = useState([]);
   useEffect(() => {
      getPages();
      getPeopleMayKnow();
   }, []);

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
      <>
         <div>
            <Navbar />
         </div>
         <div className="row">
            <div className="col-lg-2 col-xl-2">
               <div className="header-spacer"></div>
               <Leftsidebar />
            </div>
            <div className="col-lg-2 col-xl-2">
               <div className="header-spacer"></div>

               <div>
                  <div className="ui-block-news ">
                     <TopNewsCaro />
                  </div>

                  <div className="ui-block">
                     <div className="ui-block-title">
                        <h6 className="title">Pages You May Follow</h6>
                     </div>
                     <ul>
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
                     <ul>
                        {suggestionList?.map((item, index) => (
                           <li className="inline-items">
                              <div className="people-added-div">
                                 <div className="people-added-img-text">
                                    <div className="texts-news-kno-img-div">
                                       <img
                                          src={item?.profile_pic ? `${host}/uploads/${item.profile_pic}` : `${host}/uploads/noimg.jpg`}
                                          alt="author"
                                          className="texts-news-kno-img"
                                       />
                                    </div>
                                    <div className="texts">
                                       <Link href={`/${item.username}/timeline`}>
                                          <h6 className="texts-news-know-h6">{`${item.first_name} ${item.last_name}`}</h6>
                                       </Link>
                                       <p className="texts-news-know-p">Not Available</p>
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
            </div>
            <div className="col-lg-6 col-xl-6">
               <div className="header-spacer"></div>
               <div className="d-flex explore__content__area py-2 justify-content-between px-6 align-items-center bg-white mb-2">
                  <p className="w-25 pl-2 explore">Explore</p>
                  <div className="d-flex w-50 justify-content-between pr-2 position-relative">
                     <SearchIconSvg className={"position-absolute search__icons"} />
                     <input className="w-100 py-2 m-0 inputBox" type="search" placeholder="Search" />
                  </div>
               </div>

               <div className="mb-2 w-100 trending__tag__wrapper">
                  <p className="trending__tag__active">Shanto</p>
                  <p className="trending__tag">Anik Khan</p>
                  <p className="trending__tag">Tasluf</p>
                  <p className="trending__tag">Banna</p>
                  <p className="trending__tag">Shanto</p>
               </div>

               <PostList />
            </div>
            <div className="col-lg-2 col-xl-2 ">
               <div className="header-spacer"></div>
               <div className="ui-block">
                  <FeatureUser />
               </div>
            </div>
         </div>
      </>
   );
};

export default Page;
