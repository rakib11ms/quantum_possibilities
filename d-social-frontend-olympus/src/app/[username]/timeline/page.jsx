"use client";
import React, { useState } from "react";
import { host } from "@/environment";
import axiosInstance from "../../../../utils/axios";
import ProfilePostList from "@/component/NewsFeed/ProfilePostList";
import ProfileTextField from "@/app/newsfeed/_ui/ProfileTextField";
import "./timeline.modules.css";
import UploadNavigation from "@/app/newsfeed/_ui/UploadNavigation";
import Link from "next/link";
import Leftsidebar from "../_ui/Leftsidebar";
import { useParams } from "next/navigation";

export default function page() {
   const [userInfo, setUserInfo] = React.useState();
   const [allPhotos, setAllPhotos] = React.useState([]);
   const [username, setUsername] = React.useState("");
   const [friendList, setFriendList] = React.useState([]);
   const [friendListCount, setFriendListCount] = React.useState(0);
   const [followerList, setFollowerList] = React.useState([]);
   const [followingList, setFollowingList] = React.useState([]);

   const getAllPhotos = (username) => {
      axiosInstance
         .post("/api/get-users-latest-image", {
            username: username,
         })
         .then((res) => {
            if (res.data.status == 200) {
               if (res.data.posts.length > 6) {
                  setAllPhotos(res.data.posts.slice(0, 6));
               } else {
                  setAllPhotos(res.data.posts);
               }
            }
         });
   };

   const allFriends = (user) => {
      const formData = {
         username: user,
      };
      axiosInstance.post("/api/friend-list", formData).then((res) => {
         if (res.data.status == 200) {
            setFriendList(res.data.results);
            setFriendListCount(res.data.friendCount);
         }
      });

      axiosInstance.post("/api/follower-list", formData).then((res) => {
         if (res.data.status == 200) {
            setFollowerList(res.data.results);
         }
      });

      axiosInstance.post("/api/following-list", formData).then((res) => {
         if (res.data.status == 200) {
            setFollowingList(res.data.results);
         }
      });
   };
   const params = useParams();
   React.useEffect(() => {
      const localStorageUserName = localStorage.getItem("username");
      setUsername(localStorageUserName);
      getAllPhotos(localStorageUserName);
      allFriends(localStorageUserName);

      axiosInstance
         .post(`${host}/api/get-user-info`, {
            username: params.username,
         })
         .then((res) => {
            if (res.data.status == 200) {
               setUserInfo(res.data.userInfo[0]);
            }
         });
   }, []);

   const [isOpenModal, setIsOpenModal] = useState({
      post: false,
      tag: false,
      event: false,
      gif: false,
      location: false,
      photoUpload: false,
   });
   return (
      <div>
         <div className="row">
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
               <div className="about-me-div">
                  <Leftsidebar userInfo={userInfo} />
                  <div className="tas_my_photo_container">
                     <div className="tas_my_photo_title_container">
                        <div>
                           <p className="tas_my_photo_title_text">Connections</p>
                           <p className="tas_my_connection_text">{friendList.length} Connections</p>
                        </div>

                        <Link href={`/${username}/friend`} className="tas_my_photo_see_all_btn">
                           See all
                        </Link>
                     </div>
                     <div className="tas_my_photo_grid_wrapper">
                        {friendList.length > 0 ? (
                           friendList.map((item) => {
                              if (item?.connected_user_id?.username !== username) {
                                 return (
                                    <div>
                                       <Link href={`/${item?.connected_user_id?.username}/timeline`}>
                                          <img className="tas_my_photo_grid_photo" src={`${host}/uploads/${item?.connected_user_id?.profile_pic}`} />
                                          <p className="tas_my_connection_name">
                                             {item?.connected_user_id?.first_name} {item?.connected_user_id?.last_name}
                                          </p>
                                       </Link>
                                    </div>
                                 );
                              } else {
                                 return (
                                    <div>
                                       <Link href={`/${item?.user_id?.username}/timeline`}>
                                          <img className="tas_my_photo_grid_photo" src={`${host}/uploads/${item?.user_id?.profile_pic}`} />
                                          <p className="tas_my_connection_name">
                                             {item?.user_id?.first_name} {item?.user_id?.last_name}
                                          </p>
                                       </Link>
                                    </div>
                                 );
                              }
                           })
                        ) : (
                           <>
                              <div className="tas_my_connection_no_user">
                                 <p>No Friend Found</p>
                              </div>
                           </>
                        )}
                     </div>
                  </div>
                  <div className="tas_my_photo_container">
                     <div className="tas_my_photo_title_container">
                        <p className="tas_my_photo_title_text">My Photo</p>

                        <Link href={`/${username}/photo`} className="tas_my_photo_see_all_btn">
                           See all
                        </Link>
                     </div>
                     <div className="tas_my_photo_grid_wrapper">
                        {allPhotos.map((item) => {
                           return (
                              <div>
                                 <img className="tas_my_photo_grid_photo" src={`${host}/uploads/posts/${item.media}`} />
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
               <div className="newsfeed_story__wrapper">
                  <ProfileTextField isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
                  <hr />
                  {/* Navigation  */}
                  <UploadNavigation isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
                  <hr />
               </div>
               <div className="prof-ful-timeline-div">
                  <ProfilePostList />
               </div>
            </div>
         </div>
      </div>
   );
}
