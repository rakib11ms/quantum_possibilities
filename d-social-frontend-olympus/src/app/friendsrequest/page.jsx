"use client";
import React, { useEffect, useState } from "react";
// import { isAuthenticated } from "../../middleware/middleware";
import Masterdashboardlayout from "../../component/Masterdashboardlayout/Masterdashboardlayout";

import { toast } from "react-toastify";
import { host } from "@/environment";
import axiosInstance from "../../../utils/axios";
import feedauththree from "../../assets/img/avatar10-sm.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Leftsidebar from "@/component/leftsidebar/page";
import Link from "next/link";
import FeatureUser from "@/component/NewsFeed/FeatureUser";
import moment from "moment";
import authConnectone from "../../../public/connectionsone.png";
import authConnecttwo from "../../../public/connectionstwo.png";
import authConnectthree from "../../../public/connectionsthree.png";

const FriendRequest = () => {
  const [friendlist, setFriendList] = React.useState([]);
  const [friendCount, setFriendCount] = React.useState([]);
  const [connectionlist, setConnectionList] = React.useState([]);
  const [username, setUsername] = useState("");

  const getFriendRequests = () => {
    axiosInstance.post("/api/friend-request-list").then((res) => {
      if (res.data.status == 200) {
        setFriendList(res.data.results);
        setFriendCount(res.data.friendCount);
      }
    });
  };

  useEffect(() => {
    const localStorageUserName = localStorage.getItem("username");
    setUsername(localStorageUserName);
    getFriendRequests();
  }, []);

  function formatDate(timestamp) {
    const now = moment();
    const postTime = moment(timestamp);
    const diffMinutes = now.diff(postTime, "minutes");

    if (diffMinutes < 1) {
      return "a few seconds ago";
    } else if (diffMinutes < 30) {
      return `${diffMinutes} minutes ago`;
    } else if (now.isSame(postTime, "day")) {
      return `Today at ${postTime.format("LT")}`;
    } else {
      return postTime.format("LL");
    }
  }

  const acceptRequest = (request_id, accept_reject_ind) => {
    const formData = {
      request_id: request_id,
      accept_reject_ind: accept_reject_ind,
    };
    axiosInstance
      .post("/api/friend-accept-friend-request", formData)
      .then((res) => {
        if (res.data.status == 200) {
          setFriendList((prevFriends) =>
            prevFriends.filter((friend) => friend._id !== request_id)
          );
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

  const handleMyConnection = () => {
    const formData = {
      username: username,
    };
    axiosInstance.post("/api/friend-list", formData).then((res) => {
      if (res.data.status == 200) {
        setConnectionList(res.data.results);
        setFriendCount(res.data.friendCount);
      }
    });
  };

  return (
    <Masterdashboardlayout headerName="FriendRequest">
      <div className=" container-fluid ">
        <div className="row">
          <main className="col col-xl-8 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
            <div className="ui-block friendrequest">
              <div className="connection-text">
                <span>Connections</span>
              </div>
              <div className="news-feed-form feed-form">
                <ul className="nav nav-tabs request-div-ul" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active inline-items"
                      data-toggle="tab"
                      href="#home-1"
                      role="tab"
                      aria-expanded="true">
                      <span className="connection-span-active">
                        <strong className="text-custom-primary">
                          Connection{" "}
                        </strong>
                        <span className="text-custom-secondary"> Request </span>
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link inline-items"
                      data-toggle="tab"
                      href="#profile-1"
                      role="tab"
                      aria-expanded="false">
                      <span
                        className="connection-span-active"
                        onClick={handleMyConnection}>
                        <strong className="text-custom-primary">My </strong>
                        <span className="text-custom-secondary">
                          {" "}
                          Connection{" "}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="home-1"
                    role="tabpanel"
                    aria-expanded="true">
                    <div className="container">
                      <div className="row">
                        <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-6 col-6">
                          <div className="ui-block">
                            {/* Notification List Frien Requests */}
                            <ul className="notification-list friend-requests">
                              {friendlist.length > 0 ? (
                                friendlist.map((item) => (
                                  <>
                                    <li>
                                      <div className="author-thumb">
                                        <img
                                          src={
                                            item.user_id.profile_pic == "" ||
                                            item.user_id.profile_pic == null
                                              ? feedauththree.src
                                              : `${host}/uploads/${item.user_id.profile_pic}`
                                          }
                                          alt="author"
                                        />
                                      </div>

                                      <div className="notification-event">
                                        <Link
                                          href={`profile/${item.user_id.username}`}
                                          className="h6 notification-friend">
                                          {item.user_id.first_name}{" "}
                                          {item.user_id.last_name}
                                        </Link>
                                        <span className="chat-message-item">
                                          {/* Mutual Friend: Sarah Hetfield */}
                                        </span>
                                      </div>

                                      <span className="notification-icon">
                                        <span className="">
                                          {formatDate(item.createdAt)}
                                        </span>
                                        &nbsp;
                                        <a
                                          href="#"
                                          onClick={() =>
                                            acceptRequest(item._id, 1)
                                          }
                                          className="accept-request">
                                          Accept
                                        </a>
                                        <a
                                          href="#"
                                          onClick={() =>
                                            acceptRequest(item._id, 0)
                                          }
                                          className="accept-reject">
                                          Decline
                                        </a>
                                      </span>
                                    </li>
                                  </>
                                ))
                              ) : (
                                <>No Reqeusts Yet</>
                              )}
                            </ul>
                            {/* ... end Notification List Frien Requests */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane bg-dark"
                    id="profile-1"
                    role="tabpanel"
                    aria-expanded="true">
                    <div className="container">
                      <div className="row">
                        <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                          <div className="ui-block">
                            {/* Notification List Frien Requests */}
                            <div className="notification-list friend-requests ">
                              <div>
                                <p className="connections-num">
                                  {friendCount} Connection
                                  {friendCount > 1 ? "'s" : ""}
                                </p>
                                <div className="all-friend-connections">
                                  {connectionlist.length > 0 ? (
                                    connectionlist.map((item) =>
                                      item.connected_user_id.username ==
                                      username ? (
                                        <div>
                                          <img
                                            src={
                                              item.user_id.profile_pic == "" ||
                                              item.user_id.profile_pic == null
                                                ? feedauththree.src
                                                : `${host}/uploads/${item.user_id.profile_pic}`
                                            }
                                            alt=""
                                            className="connection-img"
                                          />
                                          <h5 className="connections-name">
                                            <strong>
                                              {" "}
                                              {item.user_id.first_name}
                                            </strong>{" "}
                                            {item.user_id.last_name}
                                          </h5>
                                        </div>
                                      ) : (
                                        <div>
                                          <img
                                            src={
                                              item.connected_user_id
                                                .profile_pic == "" ||
                                              item.connected_user_id
                                                .profile_pic == null
                                                ? feedauththree.src
                                                : `${host}/uploads/${item.connected_user_id?.profile_pic}`
                                            }
                                            alt=""
                                            className="connection-img"
                                          />
                                          <h5 className="connections-name">
                                            <strong>
                                              {" "}
                                              {
                                                item.connected_user_id
                                                  .first_name
                                              }
                                            </strong>{" "}
                                            {item.connected_user_id.last_name}
                                          </h5>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <>No Connection Yet</>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* ... end Notification List Frien Requests */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div id="newsfeed-items-grid">
              <PostList />

            </div> */}
          </main>

          <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
            <Leftsidebar />
          </aside>

          <aside className="col col-xl-2 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12 first-left-menu">
            <div className="ui-block">
              <FeatureUser />
            </div>
          </aside>
        </div>
      </div>
    </Masterdashboardlayout>
  );
};

export default FriendRequest;
