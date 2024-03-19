"use client";

import React, { useState, useEffect } from "react";
import { host } from "@/environment";
import "./follower.css";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { customStyles } from "../../../../../utils/customeStyle";
import UnfriendModal from "./_ui/UnfriendModal";
import axiosInstance from "../../../../../utils/axios";
import { useSelector } from "react-redux";
import { useGetPageInfoMutation } from "@/redux/features/Page/pageApiSlice";
import { useParams } from "next/navigation";
import { pageInfo, setPageInfo } from "@/redux/features/Page/pageSlice";
import { useDispatch } from "react-redux";
import { useGetUserInfoMutation } from "@/redux/features/Profile/profileApiSlice";

function page(props) {
  const [friendList, setFriendList] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [friendListCount, setFriendListCount] = useState(0);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [friendReqList, setFriendReqList] = useState([]);
  const [activeDiv, setActiveDiv] = useState(1);
  const [frienModalInfo, setFriendModalInfo] = useState({});
  const [isOpenModal, setIsOpenModal] = React.useState({
    unfriend: false,
  });

  const params = useParams();
  const [getPageInfo, { data, isloading, error, isError, isSuccess }] =
    useGetPageInfoMutation();

  console.log(data, "..pageFollowersPageInfo");
  console.log(friendList, "..friendList");

  useEffect(() => {
    (async function () {
      await getPageInfo({
        page_user_name: params.username,
      });
    })();
  }, [params.username]);

  const allFriends = (pageId) => {
    const formData = {
      page_id: pageId,
    };
    console.log(formData, "..formData");
    axiosInstance.post("/api/get-all-followers", formData).then((res) => {
      if (res.data.status == 200) {
        console.log(res.data.data, "..res.data");
        setFriendList(res.data.data);
        // setFriendListCount(res.data.friendCount);
      }
    });
  };

  useEffect(() => {
    if (data?.pageDetails?._id) {
      allFriends(data.pageDetails._id);
    }
  }, [data?.pageDetails?._id]);

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };

  const handleUnFriend = (item) => {
    setIsOpenModal({ unfriend: true });
    setFriendModalInfo(item);
  };

  const handleAcceptfriendReq = (_id, status) => {
    axiosInstance
      .post("/api/friend-accept-friend-request", {
        request_id: _id,
        accept_reject_ind: status,
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
          const localStorageUserName = localStorage.getItem("username");
          allFriends(localStorageUserName);
        }
      });
  };

  return (
    <>
      <div
        style={{ padding: 0 }}
        className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <div className="prof-ful-work-edu-div">
          <div className="prof-work-edu-div">
            <div
              onClick={() => handleTextClick(1)}
              className={`prof-about-side-bar-li ${
                activeDiv === 1 ? "active-prof-about" : ""
              }`}
            >
              <h6 className="about-profile-bartext">All Followers </h6>
            </div>
            {/* <div
              onClick={() => handleTextClick(2)}
              className={`prof-about-side-bar-li ${
                activeDiv === 2 ? "active-prof-about" : ""
              }`}
            >
              <h6 className="about-profile-bartext">Followers</h6>
            </div>
            <div
              onClick={() => handleTextClick(3)}
              className={`prof-about-side-bar-li ${
                activeDiv === 3 ? "active-prof-about" : ""
              }`}
            >
              <h6 className="about-profile-bartext">Following </h6>
            </div>
            <div
              onClick={() => handleTextClick(4)}
              className={`prof-about-side-bar-li ${
                activeDiv === 4 ? "active-prof-about" : ""
              }`}
            >
              <h6 className="about-profile-bartext">Friend Requests </h6>
            </div> */}
          </div>
          <div className="tas_all_friend_divider"></div>
          <div>
            {activeDiv === 1 && (
              <div className="tas_all_friends_container">
                <div className="tas_all_friends_grid_wrapper">
                  <p className="tas_all_friends_grid_title">All Followers</p>
                  <Modal
                    isOpen={isOpenModal.unfriend}
                    onRequestClose={() => setIsOpenModal({ unfriend: false })}
                    style={customStyles}
                  >
                    {isOpenModal.unfriend && (
                      <UnfriendModal
                        allFriends={allFriends}
                        frienModalInfo={frienModalInfo}
                        setIsOpenModal={setIsOpenModal}
                      />
                    )}
                  </Modal>

                  {friendList.length > 0 ? (
                    friendList.map((item) => {
                      if (item?.user_id?.first_name !== username) {
                        return (
                          <div className="tas_friend_container">
                            <div className="tas_friend_img_container">
                              <img
                                className="tas_friend_img"
                                src={`${host}/uploads/${item?.user_id?.profile_pic}`}
                              />
                              <div className="tas_friend_details">
                                <p className="tas_friend_name">{`${item?.user_id?.first_name} ${item?.user_id?.last_name}`}</p>
                                <p className="tas_mutual_friend">
                                  1 mutual friends
                                </p>
                              </div>
                            </div>
                            <div className="tas_friend_button_container">
                              <button className="tas_friend_unfollow_btn">
                                Unfollow
                              </button>
                              <button
                                onClick={() =>
                                  handleUnFriend({
                                    _id: item?._id,
                                    name: `${item?.user_id?.first_name} ${item?.user_id?.last_name}`,
                                  })
                                }
                                className="tas_friend_unfriend_btn"
                              >
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
                            <div className="tas_friend_button_container">
                              <button className="tas_friend_unfollow_btn">
                                Unfollow
                              </button>
                              <button
                                onClick={() =>
                                  handleUnFriend({
                                    _id: item?._id,
                                    name: `${item?.user_id?.first_name} ${item?.user_id?.last_name}`,
                                  })
                                }
                                className="tas_friend_unfriend_btn"
                              >
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
                              <h2 className="pt-10">No Followers Found</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeDiv === 2 && (
              <div className="tas_all_friends_container">
                <div className="tas_all_friends_grid_wrapper">
                  <p className="tas_all_friends_grid_title">All Followers</p>
                  {followerList.length > 0 ? (
                    followerList.map((item) => {
                      return (
                        <div className="tas_friend_container">
                          <div className="tas_friend_img_container">
                            <img
                              className="tas_friend_img"
                              src={`${host}/uploads/${item?.user_id?.profile_pic}`}
                            />
                            <div className="tas_friend_details">
                              <p className="tas_friend_name">{`${item?.user_id?.first_name} ${item?.user_id?.last_name}`}</p>
                              <p className="tas_mutual_friend">
                                1 mutual friends
                              </p>
                            </div>
                          </div>
                          <div className="tas_friend_button_container">
                            <button
                              onClick={() => {}}
                              className="tas_friend_unfriend_btn"
                            >
                              Add Friend
                            </button>
                          </div>
                        </div>
                      );
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
                              <h2 className="pt-10">No Follower</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {activeDiv === 3 && (
              <div className="tas_all_friends_container">
                <div className="tas_all_friends_grid_wrapper">
                  <p className="tas_all_friends_grid_title">All Followers</p>
                  {followingList.length > 0 ? (
                    followingList.map((item) => {
                      return (
                        <div className="tas_friend_container">
                          <div className="tas_friend_img_container">
                            <img
                              className="tas_friend_img"
                              src={`${host}/uploads/${item?.user_id?.profile_pic}`}
                            />
                            <div className="tas_friend_details">
                              <p className="tas_friend_name">{`${item?.user_id?.first_name} ${item?.user_id?.last_name}`}</p>
                              <p className="tas_mutual_friend">
                                1 mutual friends
                              </p>
                            </div>
                          </div>
                          <div className="tas_friend_button_container">
                            <button
                              onClick={() => {}}
                              className="tas_friend_unfriend_btn"
                            >
                              Unfollow
                            </button>
                          </div>
                        </div>
                      );
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
                              <h2 className="pt-10">No Following</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {activeDiv === 4 && (
              <div className="tas_all_friends_container">
                <div className="tas_all_friends_grid_wrapper">
                  <p className="tas_all_friends_grid_title">
                    All Friend Requests
                  </p>

                  {friendReqList.length > 0 ? (
                    friendReqList.map((item) => {
                      if (item?.connected_user_id?.username !== username) {
                        return (
                          <div className="tas_friend_container">
                            <div className="tas_friend_img_container">
                              <img
                                className="tas_friend_img"
                                src={`${host}/uploads/${item?.connected_user_id?.profile_pic}`}
                              />
                              <div className="tas_friend_details">
                                <p className="tas_friend_name">{`${item?.connected_user_id?.first_name} ${item?.connected_user_id?.last_name}`}</p>
                                <p className="tas_mutual_friend">
                                  1 mutual friends
                                </p>
                              </div>
                            </div>
                            <div className="tas_friend_button_container">
                              <button
                                onClick={() => {
                                  handleAcceptfriendReq(item?._id, 0);
                                }}
                                className="tas_friend_unfollow_btn"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => {
                                  handleAcceptfriendReq(item?._id, 1);
                                }}
                                className="tas_friend_unfriend_btn"
                              >
                                Accept
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
                            <div className="tas_friend_button_container">
                              <button
                                onClick={() => {
                                  handleAcceptfriendReq(item?._id, 0);
                                }}
                                className="tas_friend_unfollow_btn"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => {
                                  handleAcceptfriendReq(item?._id, 1);
                                }}
                                className="tas_friend_unfriend_btn"
                              >
                                Accept
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
                              <h2 className="pt-10">No Friend Request</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
