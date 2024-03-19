"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import svgverticaldot from "../../public/custom-svg-icon/threedot.svg";
import "react-toastify/dist/ReactToastify.css";
import { host } from "@/environment";
import Image from "next/image";
import LockProfileModal from "./Profile/LockProfileModal";
import UnLockProfileModal from "./Profile/UnLockProfileModal";
import { useParams } from "next/navigation";
import ShareModal from "./Profile/ShareModal";

function ProfileHeader({ active, lockState }) {
  const params = useParams();

  const [fullName, setFullName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [oldUserName, setOldUserName] = React.useState("");

  const [isHovered, setIsHovered] = useState(false);
  const [isCoverHovered, setIsCoverHovered] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");
  const [lockProfile, setLockProfile] = React.useState("");
  const [unLockProfile, setUnLockProfile] = React.useState("");

  const [profileImage, setprofileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [lockModal, setLockModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [friendRequestStatus, setFriendRequestStatus] = useState("");
  const [followStatus, setFollowStatus] = useState(0);
  const [shareModal, setShareModal] = useState(false);

  const openModal = () => {
    setLockModal(true);
  };

  const closeModal = () => {
    setLockModal(false);
  };

  const closeShareModal = () => {
    setShareModal(false);
  };

  const openUnlockModal = () => {
    setUnLockProfile(true);
  };

  const closeUnlockModal = () => {
    setUnLockProfile(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageFullName = localStorage.getItem("fullname");
      const localStorageUsername = localStorage.getItem("username");

      if (localStorageUsername != "") {
        setUserName(localStorageUsername);
        setOldUserName(localStorageUsername);
      }

      if (params.username == localStorageUsername) {
        setFullName(localStorageFullName);

        const localStorageUserInfo = localStorage.getItem("userInfo");
        if (localStorageUserInfo !== null) {
          try {
            const data = JSON.parse(localStorageUserInfo);

            if (Array.isArray(data)) {
              if (data.length > 0 && data[0].profile_pic !== undefined) {
                setprofileImage(data[0].profile_pic);
                setCoverImage(data[0].cover_pic);
              }

              setLockProfile(data[0].lock_profile);
            } else if (typeof data === "object") {
              if (data.profile_pic !== undefined) {
                setprofileImage(data.profile_pic);
              }
              if (data.cover_pic !== undefined) {
                setCoverImage(data.cover_pic);
              }
              setLockProfile(data.lock_profile);
            } else {
            }
          } catch (error) { }
        }
      } else {
        setUserName(params.username);
        getUserInfoByUserName(params.username, localStorageUsername);
      }
    }
  }, []);

  const handleCoverFileChange = (e) => {
    const formData = new FormData();
    formData.append("cover_pic", e.target.files[0]);
    axiosInstance
      .post(`/api/change-only-cover-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res pro pic", res);
        // setprofileImage(res.data.user_info.profile_pic);
        if (res.data.status == 200) {
          setCoverImage(res.data.user_info[0].cover_pic);
          localStorage.removeItem("userInfo");
          localStorage.setItem("userInfo", JSON.stringify(res.data.user_info));
          // router.refresh();
          toast(res.data.message, {
            type: "success",
            position: "top-right",
          });
          window.location.reload();
        }
      });
  };

  const handleImageClick = (e) => {
    if (params.username == oldUserName) {
      e.stopPropagation(); // Stop event propagation to prevent double triggering
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.click();
      }
    }
  };
  const handleCoverImageClick = (e) => {
    if (params.username == oldUserName) {
      e.stopPropagation(); // Stop event propagation to prevent double triggering
      const fileInput = document.getElementById("fileCoverInput");
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  const getUserInfoByUserName = (username, authusername) => {
    console.log("authusername", authusername);
    let formData = {
      username: username,

    };
    axiosInstance.post("/api/get-user-info", formData).then((res) => {
      if (res.data.status == 200) {
        setFullName(
          res.data.userInfo[0].first_name + " " + res.data.userInfo[0].last_name
        );
        setprofileImage(res.data.userInfo[0].profile_pic);
        setCoverImage(res.data.userInfo[0].cover_pic);
        setUserId(res.data.userInfo[0]._id);
        if (userId != 0) {
          checkFollowerOrNot(res.data.userInfo[0]._id);
        }
        if (authusername) {
          formData = {
            id: res.data.userInfo[0]._id
          };
          axiosInstance
            .post("/api/is-request-or-friend", formData)
            .then((res) => {
              if (res.data.status == 200) {
                setFriendRequestStatus(res.data.results);
              }
            });
        }

      }
    });
  };
  const handleFriendRequest = (user_id) => {
    const formdata = {
      connected_user_id: user_id,
    };

    axiosInstance.post("/api/send-friend-request", formdata).then((res) => {
      if (res.data.status == 200) {
        toast.success(res.data.message, {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });
        setFriendRequestStatus("0");
      } else {
        toast.warning("Something went wrong", {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });
      }
    });
  };

  const handleFollowRequest = (follow_unfollow_status) => {
    const formdata = {
      follower_user_id: userId,
      follow_unfollow_status: follow_unfollow_status,
    };
    axiosInstance
      .post("/api/follower-unfollow-request", formdata)
      .then((res) => {
        if (res.data.status == 200) {
          checkFollowerOrNot(userId);
        }
      });
  };

  const checkFollowerOrNot = (followUserId) => {
    const formdata = {
      id: followUserId,
    };
    axiosInstance.post("/api/is-follower", formdata).then((res) => {
      if (res.data.status == 200) {
        setFollowStatus(res.data.results);
      }
    });
  };

  return (
    <div className='top-header'>
      <div
        className='top-header-thumb'
        onMouseEnter={() => {
          if (params.username == oldUserName) {
            setIsCoverHovered(true);
          }
        }}
        onMouseLeave={() => setIsCoverHovered(false)}
        onClick={handleCoverImageClick}
        style={{ cursor: "pointer" }}>
        <img
          className='cover-pic'
          src={
            coverImage == "" || coverImage == null
              ? `${host}/uploads/cover_pic.png`
              : `${host}/uploads/${coverImage}`
          }
          alt='nature'
        />
        {isCoverHovered && (
          <div className='cover-camera-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-camera camera-icon-i'
              viewBox='0 0 16 16'>
              <path d='M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z' />
              <path d='M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z' />
            </svg>
          </div>
        )}
      </div>

      {/* Mobile  */}
      <div>
        <div className='top-header-author top-auth-mobile'>
          <div>
            <div
              className='author-thumb'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}>
              {profileImage !== null ? (
                <img
                  className='avatar-profile'
                  src={`${host}/uploads/${profileImage}`}
                  alt=''
                />
              ) : (
                <img
                  src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                  className='avatar-profile '
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}

              {isHovered && (
                <div className='camera-icon'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-camera camera-icon-i'
                    viewBox='0 0 16 16'>
                    <path d='M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z' />
                    <path d='M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z' />
                  </svg>
                </div>
              )}
            </div>
            <div className='author-content'>
              <a href='/' className='h4 author-name'>
                {fullName}
              </a>
              <div className='country'>
                {userName != "" ? "@" + userName : ""}
              </div>
            </div>
            {/* Hidden file input */}
            <form encType='multipart/form-data'>
              <input
                id='fileInput'
                type='file'
                name='profile_pic'
                accept='image/*'
                onChange={(e) => {
                  const formData = new FormData();
                  formData.append("profile_pic", e.target.files[0]);
                  axiosInstance
                    .post(`/api/change-only-profile-pic`, formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                          "refreshToken"
                        )}`,
                      },
                    })
                    .then((res) => {
                      // setprofileImage(res.data.user_info.profile_pic);
                      if (res.data.status == 200) {
                        setprofileImage(res.data.user_info[0].profile_pic);
                        localStorage.removeItem("userInfo");
                        localStorage.setItem(
                          "userInfo",
                          JSON.stringify(res.data.user_info)
                        );
                        // router.refresh();
                        toast(res.data.message, {
                          type: "success",
                          position: "top-right",
                        });
                        window.location.reload();
                      }
                    });
                }}
                // onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </form>

            {/* Hidden Cover Pic file input */}

            <form encType='multipart/form-data'>
              <input
                id='fileCoverInput'
                type='file'
                name='cover_pic'
                accept='image/*'
                onChange={handleCoverFileChange}
                style={{ display: "none" }}
              />
            </form>
          </div>
          <div className='mobile-shield-lock-svg-div'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='36'
              height='36'
              fill='#307777'
              className='bi bi-shield-lock mobile-shield-lock-svg'
              viewBox='0 0 16 16'>
              <path d='M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z' />
              <path d='M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z' />
            </svg>
            <p className='mobile-shield-lock-svg-text'>Learn More</p>
          </div>
        </div>

        <div className='Easy-mobile-text-div'>
          <p className='Easy-mobile-tex'>2.1 M Connections</p>
          <p className='Easy-mobile-text'>"Easy to get, Hard to forget"</p>

          <div className='mobile-top-btns-head-div'>
            <button className='mobile-top-btns-head'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='26'
                height='16'
                fill='currentColor'
                class='bi bi-plus-lg mobile-top-btns-head-btn-svg'
                viewBox='0 0 16 16'>
                <path
                  fill-rule='evenodd'
                  d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'
                />
              </svg>
              <span className='text-post-add'>Add to post</span>{" "}
            </button>
            {params.username == oldUserName ? (
              <Link
                href={`/editprofile/${userName}`}
                className='mobile-top-btns-head-div'>
                <div className='mobile-top-btns-edit-head'>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square mobile-top-btns-head-btn-svg"
                    viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg> */}
                  <>Edit profile</>
                </div>
              </Link>
            ) : (
              <span onClick={() => handleFriendRequest(userId)}>
                <div className='profile-edit-button'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='#0b3243'
                    className='bi bi-person-plus-fill'
                    viewBox='0 0 16 16'>
                    <path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                    <path
                      fill-rule='evenodd'
                      d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
                    />
                  </svg>
                  {friendRequestStatus != "" ? (
                    friendRequestStatus == 1 ? (
                      <>Friends</>
                    ) : (
                      <>Request Send</>
                    )
                  ) : (
                    <>Add Friend</>
                  )}
                </div>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Web  */}

      <div className='top-header-author web-author-top '>
        <div
          className='author-thumb'
          onMouseEnter={() => {
            if (params.username == oldUserName) {
              setIsHovered(true);
            }
          }}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}>
          {profileImage !== null ? (
            <img
              className='avatar-profile'
              src={`${host}/uploads/${profileImage}`}
              alt=''
            />
          ) : (
            <img
              src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
              className='avatar-profile '
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}

          {isHovered && (
            <div className='camera-icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-camera camera-icon-i'
                viewBox='0 0 16 16'>
                <path d='M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z' />
                <path d='M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z' />
              </svg>
            </div>
          )}
        </div>
        <div className='author-content'>
          <a href='/' className='h4 author-name'>
            {fullName}
          </a>
          <div className='emai-share'>
            {userName != "" ? "@" + userName : ""}{" "}
            <svg
              onClick={(e) => {
                setShareModal(true);
              }}
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='26'
              fill='gray'
              className='bi bi-share'
              viewBox='0 0 16 16'>
              <path d='M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z' />
            </svg>
          </div>
        </div>
        {/* Hidden file input */}
        <form encType='multipart/form-data'>
          <input
            id='fileInput'
            type='file'
            name='profile_pic'
            accept='image/*'
            onChange={(e) => {
              const formData = new FormData();
              formData.append("profile_pic", e.target.files[0]);
              axiosInstance
                .post(`/api/change-only-profile-pic`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                      "refreshToken"
                    )}`,
                  },
                })
                .then((res) => {
                  // setprofileImage(res.data.user_info.profile_pic);
                  if (res.data.status == 200) {
                    setprofileImage(res.data.user_info[0].profile_pic);
                    localStorage.removeItem("userInfo");
                    localStorage.setItem(
                      "userInfo",
                      JSON.stringify(res.data.user_info)
                    );
                    // router.refresh();
                    toast(res.data.message, {
                      type: "success",
                      position: "top-right",
                    });
                    window.location.reload();
                  }
                });
            }}
            // onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </form>

        {/* Hidden Cover Pic file input */}

        <form encType='multipart/form-data'>
          <input
            id='fileCoverInput'
            type='file'
            name='cover_pic'
            accept='image/*'
            onChange={handleCoverFileChange}
            style={{ display: "none" }}
          />
        </form>
        {params.username != oldUserName ? (
          <>
            {followStatus == 1 ? (
              <>
                <button
                  className='prof-follow-btn'
                  onClick={() => handleFollowRequest(0)}>
                  Following
                </button>
              </>
            ) : (
              <>
                <button
                  className='prof-follow-btn'
                  onClick={() => handleFollowRequest(1)}>
                  Follow
                </button>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      <div className='profile-section '>
        <div className='row'>
          {/* <div className="col-12 col-lg-12 col-md-12 col-sm-12  prof-head-border" /> */}

          <div className='col-10 col-lg-10 col-md-10 col-sm-7 col-10 mx-auto web-top-timeline'>
            <ul className='profile-menu '>
              <li>
                <Link
                  className={active == "profile" ? "active" : ""}
                  href={`/profile/${userName}`}>
                  Timeline
                </Link>
              </li>
              <li>
                <Link
                  className={active == "about" ? "active" : ""}
                  href={`/about/${userName}`}>
                  About
                </Link>
              </li>
              <li>
                <Link
                  className={active == "Friends" ? "active" : ""}
                  href={`/friends/${userName}`}>
                  {/* /friendsrequest */}
                  Friends
                </Link>
              </li>
              {/* </ul> */}
              {/* </div>
                    <div className="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12"> */}
              {/* <ul className="profile-menu"> */}
              <li>
                <Link
                  className={active == "profilephotos" ? "active" : ""}
                  href={`/profilephotos/${userName}`}>
                  {/* profilephotos */}
                  Photos
                </Link>
              </li>
              <li>
                <Link
                  className={active == "profilevideos" ? "active" : ""}
                  href='#'>
                  {/* profilevideos */}
                  Videos
                </Link>
              </li>
              <li>
                <Link
                  className={active == "Reels" ? "active" : ""}
                  href={`/myreel/${userName}`}>
                  {/* profilevideos */}
                  Reels
                </Link>
              </li>
              <li>
                <Link
                  className={active == "profilestory" ? "active" : ""}
                  href={`/profilestory/${userName}`}>
                  Stories
                </Link>
              </li>

              <li>
                <Link
                  className={active == "profilevideos" ? "active" : ""}
                  href='#'>
                  Tags
                </Link>
              </li>

              <li>
                <div className='more'>
                  More
                  <Image
                    src={svgverticaldot}
                    height={10}
                    width={12}
                    alt='vertical-dot'
                    className='ms-5'
                  />
                  <ul className='more-dropdown more-with-triangle'>
                    {params.username == oldUserName ? (
                      <>
                        <li>
                          <Link href={`/editprofile/${userName}`}>
                            Edit Profile
                          </Link>
                        </li>
                        <li>
                          {lockProfile == 1 ? (
                            <Link href='#' onClick={openUnlockModal}>
                              UnLock Profile
                            </Link>
                          ) : (
                            <Link href='#' onClick={openModal}>
                              Lock Profile
                            </Link>
                          )}
                        </li>
                      </>
                    ) : (
                      <>
                        {friendRequestStatus == 1 ?
                          <li>
                            <a href='#'> Unfriend</a>
                          </li> :
                          <></>
                        }
                        <li>
                          <a href='#'>Block Profile</a>
                        </li>
                      </>
                    )}


                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className='col-2 col-lg-2 col-md-2 col-sm-5 col-12 mx-auto web-top-timeline'>
            {params.username == oldUserName ? (
              <Link href={`/editprofile/${userName}`} className='profile-href'>
                <div className='profile-edit-button'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-pencil-square'
                    viewBox='0 0 16 16'>
                    <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                    <path
                      fill-rule='evenodd'
                      d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                    />
                  </svg>
                  <>Edit profile</>
                </div>
              </Link>
            ) : friendRequestStatus != "" ? (
              friendRequestStatus == 1 ? (
                <span>
                  <div className='profile-edit-button'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='#0b3243'
                      className='bi bi-person-plus-fill'
                      viewBox='0 0 16 16'>
                      <path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                      <path
                        fill-rule='evenodd'
                        d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
                      />
                    </svg>
                    Friends
                  </div>
                </span>
              ) : (
                <span>
                  <div className='profile-edit-button'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='#0b3243'
                      className='bi bi-person-plus-fill'
                      viewBox='0 0 16 16'>
                      <path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                      <path
                        fill-rule='evenodd'
                        d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
                      />
                    </svg>
                    Request Send
                  </div>
                </span>
              )
            ) : (
              <span onClick={() => handleFriendRequest(userId)}>
                <div className='profile-edit-button'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='#0b3243'
                    className='bi bi-person-plus-fill'
                    viewBox='0 0 16 16'>
                    <path d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                    <path
                      fill-rule='evenodd'
                      d='M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
                    />
                  </svg>
                  Add Friend
                </div>
              </span>
            )}

            {/* )} */}
          </div>
        </div>
        {/* <div className="control-block-button">
          <a
            href="35-YourAccount-FriendsRequests.html"
            className="btn btn-control bg-blue"
          >
            <svg className="olymp-happy-face-icon">
              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
            </svg>
          </a>
          <a href="#" className="btn btn-control bg-purple">
            <svg className="olymp-chat---messages-icon">
              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
            </svg>
          </a>
          <div className="btn btn-control bg-primary more">
            <svg className="olymp-settings-icon">
              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-settings-icon" />
            </svg>
            <ul className="more-dropdown more-with-triangle triangle-bottom-right">
              <li>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#update-header-photo"
                >
                  Update Profile Photo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#update-header-photo"
                >
                  Update Header Photo
                </a>
              </li>
              <li>
                <a href="29-YourAccount-AccountSettings.html">
                  Account Settings
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
      {/* <div className="top-header-author">
                <a href="02-ProfilePage.html" className="author-thumb">
                    <img src="img/author-main1.jpg" alt="author" />
                </a>
                <div className="author-content">
                    <a
                        href="02-ProfilePage.html"
                        className="h4 author-name"
                    >
                        {fullName}
                    </a>
                    <div className="country">{userName}</div>
                </div>
            </div> */}

      <LockProfileModal
        isOpen={lockModal}
        onRequestClose={closeModal}
        setLockProfile={setLockProfile}
        lockState={lockState}
      />
      <UnLockProfileModal
        isOpen={unLockProfile}
        onRequestClose={closeUnlockModal}
        setLockProfile={setLockProfile}
        lockState={lockState}
      />
      <ShareModal
        isOpen={shareModal}
        onRequestClose={closeShareModal}
        username={userName}
      />
    </div>
  );
}

export default ProfileHeader;
