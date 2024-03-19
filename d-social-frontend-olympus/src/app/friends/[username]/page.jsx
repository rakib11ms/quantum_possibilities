"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import ProfileHeader from "@/component/ProfileHeader";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axios";
import { host } from "@/environment";
import feedauththree from "../../../assets/img/avatar10-sm.jpg";
import NoImage from "../../../assets/img/no_image_available.svg";
import Link from "next/link";
import "./friend.css";

const Friends = () => {
  const [lockState, setLockState] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [username, setUsername] = useState("");
  const [friendListCount, setFriendListCount] = useState(0);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const localStorageUserName = localStorage.getItem("username");
    setUsername(localStorageUserName);
    allFriends(localStorageUserName);
  }, []);

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

  const [activeAboutDiv, setActiveAboutDiv] = useState(1);

  const handleAboutTextClick = (divId) => {
    setActiveAboutDiv(divId);
  };

  const unFriendUser = (requestId) => {
    const formData = {
      requestId: requestId,
    };
    axiosInstance.post("/api/unfriend-user", formData).then((res) => {
      if (res.data.status == 200) {
        setFriendList((prevFriendList) =>
          friendList.filter((friends) => friends._id !== requestId)
        );
      }
    });
  };

  const unFollowUser = (requestId) => {
    const formData = {
      requestId: requestId,
    };
    axiosInstance.post("/api/unfollow-user", formData).then((res) => {
      if (res.data.status == 200) {
        setFollowingList((prevFriendList) =>
          followingList.filter((following) => following._id !== requestId)
        );
      }
    });
  };
  return (
    <div>
      <Masterdashboardlayout headerName="About">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                  <ProfileHeader active="Friends" lockState={setLockState} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <ul
                    className="nav nav-tabs request-div-ul bg-white"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <p
                        className={`nav-link inline-items ${
                          activeAboutDiv === 1 ? "active" : ""
                        } `}
                        onClick={() => handleAboutTextClick(1)}
                      >
                        <span className="connection-span-active">
                          <strong className="text-custom-primary">All </strong>
                          <span className="text-custom-secondary">
                            {" "}
                            Friends ({friendList.length}){" "}
                          </span>
                        </span>
                      </p>
                    </li>
                    <li className="nav-item">
                      <p
                        className={`nav-link inline-items ${
                          activeAboutDiv === 2 ? "active" : ""
                        } `}
                        onClick={() => handleAboutTextClick(2)}
                      >
                        <span className="connection-span-active">
                          <strong className="text-custom-primary">My </strong>
                          <span className="text-custom-secondary">
                            {" "}
                            Follower ({followerList.length})
                          </span>
                        </span>
                      </p>
                    </li>

                    <li className="nav-item">
                      <p
                        className={`nav-link inline-items ${
                          activeAboutDiv === 3 ? "active" : ""
                        } `}
                        onClick={() => handleAboutTextClick(3)}
                      >
                        <span className="connection-span-active">
                          <strong className="text-custom-primary">My </strong>
                          <span className="text-custom-secondary">
                            {" "}
                            Following ({followingList.length})
                          </span>
                        </span>
                      </p>
                    </li>
                  </ul>
                  {/* <div className="ui-block responsive-flex">
                                        <div className="ui-block-title">
                                            <div className="h6 title text-left">All Friends ({friendListCount})</div>
                                        </div>
                                    </div> */}
                </div>
              </div>
            </div>
            {/* Friends */}
            <div className="tab-content">
              <div
                className={`tab-pane ${activeAboutDiv === 1 ? "active" : ""} `}
                id="home-1"
                role="tabpanel"
                aria-expanded="true"
              >
                {/* <div className="row">
                                    {
                                        friendList.length > 0 ?
                                            friendList.map((item) => (
                                                <div className="col col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12">
                                                    <div className="ui-block">
                                                        {item.connected_user_id?.username == username ?
                                                            <div className="friend-item">
                                                                <div className="friend-header-thumb">
                                                                    <img src={
                                                                        (item.user_id?.profile_pic == "" || item.user_id?.profile_pic == null)
                                                                            ? NoImage.src
                                                                            : `${host}/uploads/${item.user_id?.profile_pic}`
                                                                    } alt="author" />
                                                                </div>
                                                                <div className="friend-item-content">
                                                                    <div className="more">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                                        </svg>
                                                                        <ul className="more-dropdown">
                                                                            <li>
                                                                                <a href="javascript:void(0)" onClick={(e) => {
                                                                                    unFriendUser(item._id);
                                                                                }}> Unfriend</a>
                                                                            </li> */}
                {/* <li>
                                                                                <a href="#">Block Profile</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">Turn Off Notifications</a>
                                                                            </li> */}
                {/* </ul>
                                                                    </div>

                                                                    <div className="swiper-container mt-2" data-slide="fade">

                                                                        <div className="author-content">
                                                                            <a href={`/profile/${item.user_id?.username}`} className="h5 author-name">   {item.user_id?.first_name}  {item.user_id?.last_name}</a>
                                                                            <div className="country">@{item.user_id?.username}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            :

                                                            <div className="friend-item ">
                                                                <div className="friend-header-thumb">
                                                                    <img src={
                                                                        (item.connected_user_id?.profile_pic == "" || item.connected_user_id?.profile_pic == null)
                                                                            ? NoImage.src
                                                                            : `${host}/uploads/${item.connected_user_id?.profile_pic}`
                                                                    } alt="author" />

                                                                </div>
                                                                <div className="friend-item-content">

                                                                    <div className="more">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                                        </svg>
                                                                        <ul className="more-dropdown">
                                                                            <li>
                                                                                <a href="javascript:void(0)" onClick={(e) => {
                                                                                    unFriendUser(item._id);
                                                                                }}>Unfriend</a>
                                                                            </li> */}
                {/* <li>
                                                                                <a href="#">Block Profile</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">Turn Off Notifications</a>
                                                                            </li> */}
                {/* </ul>
                                                                    </div>

                                                                    <div className="swiper-container mt-2" data-slide="fade">
                                                                        <div className="swiper-container" data-slide="fade">

                                                                            <div className="author-content">
                                                                                <Link href={`/profile/${item.connected_user_id?.username}`} className="h5 author-name">   {item.connected_user_id?.first_name + " " + item.connected_user_id?.last_name}</Link>
                                                                                <div className="country">@{item.connected_user_id?.username}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <>
                                                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ height: '10vh' }}>
                                                    <div className="ui-block">
                                                        <div className="friend-item">
                                                            <div className="friend-header-thumb">
                                                                <h2 className='pt-10'>
                                                                    No Friend Found
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                    }


                                </div> */}

                <div className="tas_all_friends_grid_wrapper">
                  <p className="tas_all_friends_grid_title">All Friends</p>

                  {friendList.length > 0 ? (
                    friendList.map((item) => {
                      if (item.connected_user_id?.username !== username) {
                        return (
                          <div className="tas_friend_container">
                            <div className="tas_friend_img_container">
                              <img
                                className="tas_friend_img"
                                src={`${host}/uploads/${item.connected_user_id?.profile_pic}`}
                              />
                              <div className="tas_friend_details">
                                <p className="tas_friend_name">{`${item.connected_user_id.first_name} ${item.connected_user_id.last_name}`}</p>
                                <p className="tas_mutual_friend">
                                  1 mutual friends
                                </p>
                              </div>
                            </div>
                            <div>
                              <button className="tas_friend_unfollow_btn">
                                Unfollow
                              </button>
                              <button className="tas_friend_unfriend_btn">
                                Unfriend
                              </button>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="tas_friend_container">
                            <div className="tas_friend_img_container">
                              <img
                                className="tas_friend_img"
                                src={`${host}/uploads/${item.user_id.profile_pic}`}
                              />
                              <div className="tas_friend_details">
                                <p className="tas_friend_name">{`${item.user_id.first_name} ${item.user_id.last_name}`}</p>
                                <p className="tas_mutual_friend">
                                  1 mutual friends
                                </p>
                              </div>
                            </div>
                            <div>
                              <button className="tas_friend_unfollow_btn">
                                Unfollow
                              </button>
                              <button className="tas_friend_unfriend_btn">
                                Unfriend
                              </button>
                            </div>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <>
                      <div
                        className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                        style={{ height: "10vh" }}
                      >
                        <div className="ui-block">
                          <div className="friend-item">
                            <div className="friend-header-thumb">
                              <h2 className="pt-10">No Friend Found</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div
                className={`tab-pane ${activeAboutDiv === 2 ? "active" : ""} `}
                id="home-2"
                role="tabpanel"
                aria-expanded="true"
              >
                <div className="container-fluid mt-2">
                  <div className="row">
                    {followerList.length > 0 ? (
                      followerList.map((item) => (
                        <div className="col col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12">
                          <div className="ui-block">
                            <div className="friend-item ">
                              <div className="friend-header-thumb">
                                <img
                                  src={
                                    item.user_id?.profile_pic == "" ||
                                    item.user_id?.profile_pic == null
                                      ? NoImage.src
                                      : `${host}/uploads/${item.user_id?.profile_pic}`
                                  }
                                  alt="author"
                                />
                              </div>
                              <div className="friend-item-content">
                                {/* <div className="more">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                                        </svg>
                                                                        <ul className="more-dropdown">
                                                                            <li>
                                                                                <a href="#">Report Profile</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">Block Profile</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">Turn Off Notifications</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div> */}

                                <div
                                  className="swiper-container mt-2"
                                  data-slide="fade"
                                >
                                  <div
                                    className="swiper-container"
                                    data-slide="fade"
                                  >
                                    <div className="author-content">
                                      <Link
                                        href={`/profile/${item.user_id?.username}`}
                                        className="h5 author-name"
                                      >
                                        {" "}
                                        {item.user_id?.first_name +
                                          " " +
                                          item.user_id?.last_name}
                                      </Link>
                                      <div className="country">
                                        @{item.user_id?.username}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="ui-block">No Follower list</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`tab-pane ${activeAboutDiv === 3 ? "active" : ""} `}
                id="home-3"
                role="tabpanel"
                aria-expanded="true"
              >
                <div className="container-fluid mt-2">
                  <div className="row">
                    {followingList.length > 0 ? (
                      followingList.map((item) => (
                        <div className="col col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12">
                          <div className="ui-block">
                            <div className="friend-item ">
                              <div className="friend-header-thumb">
                                <img
                                  src={
                                    item.follower_user_id?.profile_pic == "" ||
                                    item.follower_user_id?.profile_pic == null
                                      ? NoImage.src
                                      : `${host}/uploads/${item.follower_user_id?.profile_pic}`
                                  }
                                  alt="author"
                                />
                              </div>
                              <div className="friend-item-content">
                                <div className="more">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="black"
                                    class="bi bi-three-dots-vertical"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                  </svg>
                                  <ul className="more-dropdown">
                                    <li>
                                      <a
                                        href="javascript:void(0)"
                                        onClick={(e) => {
                                          unFollowUser(item._id);
                                        }}
                                      >
                                        Cancel Follow
                                      </a>
                                    </li>
                                  </ul>
                                </div>

                                <div
                                  className="swiper-container mt-2"
                                  data-slide="fade"
                                >
                                  <div
                                    className="swiper-container"
                                    data-slide="fade"
                                  >
                                    <div className="author-content">
                                      <Link
                                        href={`/profile/${item.follower_user_id?.username}`}
                                        className="h5 author-name"
                                      >
                                        {" "}
                                        {item.follower_user_id?.first_name +
                                          " " +
                                          item.follower_user_id?.last_name}
                                      </Link>
                                      <div className="country">
                                        @{item.follower_user_id?.username}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div
                          className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                          style={{ height: "10vh" }}
                        >
                          <div className="ui-block">
                            <div className="friend-item">
                              <div className="friend-header-thumb">
                                <h2 className="pt-10">No Follower Found</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};
export default Friends;
