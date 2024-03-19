"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useEffect, useRef, useState } from "react";
import ProfileHeader from "@/component/ProfileHeader";
import profileChat from "../../../assets/img/icon-chat23.png";
import Link from "next/link";
import pendulamIcon from "../../../../public/pendulam.png";
import bornIcon from "../../../../public/born.png";
import Image from "next/image";
import { host } from "@/environment";
import LocationModal from "@/component/NewsFeed/LocationModal";
import FeelingAndActivity from "@/component/NewsFeed/FeelingAndActivity";
import gallerySvg from "../../../../public/custom-svg-icon/gallery.svg";
import locationSvg from "../../../../public/custom-svg-icon/location.svg";
import addfriendSvg from "../../../../public/custom-svg-icon/addfriend.svg";
import photoSvg from "../../../../public/custom-svg-icon/photo.svg";
import axiosInstance from "../../../../utils/axios";
import { toast } from "react-toastify";
import ProfilePostList from "@/component/Profile/ProfilePostList";
import { useParams } from "next/navigation";
import connectionsOne from "../../../../public/connectionsone.png";
import connectionsTwo from "../../../../public/connectionstwo.png";
import connectionsThree from "../../../../public/connectionsthree.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Colorselect from "../../../../public/colorselect.png";

 export const post_pricay_optionlist = [
    { value: 'public', label: 'Public', icon: <FontAwesomeIcon icon={faEarthAmericas} size='xs' /> },
   { value: 'friends', label: 'Friends', icon: <FontAwesomeIcon icon={faUsers} size='xs' /> },
   { value: 'only_me', label: 'Only me', icon: <FontAwesomeIcon icon={faLock} size='xs' /> },
  ];

function page() {
  const params = useParams();
  const colorsRef = useRef(null);
  const [showColors, setShowColors] = useState(false);
  const [friendRequestStatus, setFriendRequestStatus] = useState("");
  const [userBio, setUserBio] = React.useState("");
  const [friendlist, setFriendList] = React.useState([]);
  const [friendCount, setFriendCount] = React.useState(0);
  const [lockProfile, setLockProfile] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [profileImage, setprofileImage] = useState("");
  const [locationChildData, setlocationChildData] = useState(null);
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const initialItemsToShow = 2;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const isScrollable = itemsToShow < 3;
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openFeelingModal, setOpenFeelingModal] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [lockState, setLockState] = useState("");
  const [lastestImage, setLastestImage] = useState([]);
  const [lastestVideo, setLastestVideo] = useState([]);
  const [authUserName, setAuthUserName] = useState("");
  const [folowCount, setFollowCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState('public');
 

  const [activityData, setActivityData] = useState({
    activity_name: "",
    activity_type: "",
    logo: "",
    activity_id: "",
    sub_activity_id: "",
  });

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const localUserInfo = localStorage.getItem("userInfo");
    if (localUserInfo) {
      setLockProfile(JSON.parse(localUserInfo)[0].lock_profile);
    }
  }, [lockState]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localUserInfo = localStorage.getItem("userInfo");
      const localStorageFullName = localStorage.getItem("fullname");
      const localStorageUserName = localStorage.getItem("username");
      setAuthUserName(localStorageUserName);
      if (localStorageUserName == params.username) {
        if (localUserInfo) {
          const userInfo = JSON.parse(localUserInfo);
          const profile_image = userInfo[0].profile_pic;
          followerCount(JSON.parse(localUserInfo)[0]._id);
          setUserBio(JSON.parse(localUserInfo)[0].user_bio);
          setprofileImage(profile_image);
          setFullName(localStorageFullName);
          setLockProfile(JSON.parse(localUserInfo)[0].lock_profile);
          getUserPhotos(params.username);
        }
      } else {
        getUserInfoByUserName(params.username);
      }
    } else {
      getUserInfoByUserName(params.username);
    }

    getFriends(params.username);
  }, []);

  const getUserInfoByUserName = (username) => {
    const formData = {
      username: username,
    };
    axiosInstance.post("/api/get-user-info", formData).then((res) => {
      if (res.data.status == 200) {
        setUserBio(res.data.userInfo[0].user_bio);
        setprofileImage(res.data.userInfo[0].profile_pic);
        setFullName(
          res.data.userInfo[0].first_name + " " + res.data.userInfo[0].last_name
        );
        setLockProfile(res.data.userInfo[0].lock_profile);
        followerCount(res.data.userInfo[0]._id);
        getUserPhotos(params.username);
        const userData = {
          id: res.data.userInfo[0]._id,
        };
        axiosInstance
          .post("/api/is-request-or-friend", userData)
          .then((res) => {
            if (res.data.status == 200) {
              setFriendRequestStatus(res.data.results);
            }
          });
      }
    });
  };


  const followerCount = (followUserId) => {

    const formdata = {
      userId: followUserId
    };
    axiosInstance.post("/api/user-follower-count", formdata).then((res) => {
      if (res.data.status == 200) {
        setFollowCount(res.data.results);
      }
    })
  }


  const handleSeeAllClick = () => {
    setItemsToShow(1000);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);

    const newText = e.target.value.replace(/\n/g, "<br>");
    setUpdateContent(newText);
  };

  const handlePostImageUpload = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent double triggering
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const openModal = () => {
    setOpenLocationModal(true);
  };

  const closeModal = () => {
    setOpenLocationModal(false);
  };

  const setFeelingModal = () => {
    setOpenFeelingModal(true);
  };

  const closeFeelingModal = () => {
    setOpenFeelingModal(false);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    const newFilesArray = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      newFilesArray.push(file);
    }

    setFiles([...files, ...newFilesArray]);
  };

  const handlelocationChildData = (data) => {
    setlocationChildData(data);
  };

  const handleFeelingChildData = (data) => {
    setActivityData(data);
  };

  const setLockStateValue = () => {
    setLockState(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to prepare files for upload
    const formData = new FormData();
    formData.append("description", updateContent);
    formData.append("post_privacy", selectedOption)
    formData.append("post_background_color", textColor);
    if (
      activityData &&
      activityData.activity_id &&
      activityData.activity_id._id
    ) {
      formData.append("activity_id", activityData.activity_id._id);
    }

    if (activityData && activityData.sub_activity_id) {
      formData.append("sub_activity_id", activityData.sub_activity_id);
    }

    if (locationChildData && locationChildData._id) {
      formData.append("location_id", locationChildData._id);
    }

    files.forEach((file) => {
      formData.append("files", file);
    });

    axiosInstance
      .post("api/save-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          window.location.reload();

          toast.success(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });

          setFiles("");
          setContent("");
          setUpdateContent("");
        }
      });
  };

  const getUserPhotos = (username) => {
    const formdata = {
      username: username,
    };
    axiosInstance
      .post("/api/get-users-latest-image-video", formdata)
      .then((res) => {
        if (res.data.status == 200) {
          setLastestImage(res.data.posts);
          setLastestVideo(res.data.videos);
        }
      });
  };

  const getFriends = (username) => {
    const formdata = {
      username: username,
      limit: 6,
    };
    axiosInstance.post("/api/friend-list", formdata).then((res) => {
      if (res.data.status == 200) {
        setFriendList(res.data.results);
        setFriendCount(res.data.friendCount);
      }
    });
  };

  const [textColor,setTextColor]= useState(null);
  function  handleBackgroundColors(tempColor){
    setTextColor(tempColor);
}

  // Mobile Connections
  const connectionsData = [
    {
      id: 1,
      name: "Michel jordan",
      image: connectionsTwo.src,
    },
    {
      id: 2,
      name: "Kristina catthy",
      image: connectionsOne.src,
    },
    {
      id: 3,
      name: "Steav Jonson",
      image: connectionsThree.src,
    },
    {
      id: 4,
      name: "Kristina catthy",
      image: connectionsTwo.src,
    },
    {
      id: 5,
      name: "Steav Jonson",
      image: connectionsOne.src,
    },
    {
      id: 6,
      name: "Kristina catthy",
      image: connectionsThree.src,
    },
    // Add more fake data as needed
  ];

  return (
    <Masterdashboardlayout headerName="Profile">
      {/* Top Header-Profile */}
      <div className="container-fluid">
        <div className="row">
          <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="ui-block">
              <ProfileHeader active="profile" lockState={setLockState} />
            </div>

            <div className="connections-div container-fluid">
              <div className="connec-mob-texts-div ">
                <h5>Connennections</h5>
                <h6 className="connec-101-text-h6">See all connections</h6>
              </div>
              <p className="connec-101-text">101 Connections</p>

              <div className="connections-map ">
                {connectionsData.map((item) => (
                  <div key={item.id} className="indi-card-div">
                    <img
                      className="connections-map-image"
                      src={item.image}
                      alt={item.name}
                    />
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ... end Top Header-Profile */}

      <div className="container-fluid">
        <div className="row">
          {/* Main Content */}
          <div className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
            {(authUserName != params.username && lockProfile != 1) ||
              friendRequestStatus == 1 ? (
              <div
                className="profile-post-inputs"
                id=""
                role="tabpanel"
                aria-expanded="true">
                <form
                  className="profile-post-inputs-form"
                  onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center mt-4 m-1">
                    {/* <div className=""> */}

                    {profileImage !== null ? (
                      <div className="author-thumbs ">
                        <img
                          src={`${host}/uploads/${profileImage}`}
                          alt=""
                          className="avatar "
                        />
                      </div>
                    ) : (
                      <div className="author-thumbs">
                        <img
                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          className="avatar "
                        />
                      </div>
                    )}

                    <div className="mx-2">
                      <h6>
                        {`${fullName} `}
                        {` ${activityData.activity_name != "" ? "is" : ""} `}
                        {activityData.logo != "" ? (
                          <img
                            src={`${host}/assets/${activityData.logo}`}
                            className="feeling-icon"
                          />
                        ) : (
                          ""
                        )}
                        {` ${activityData.activity_type != ""
                          ? activityData.activity_type
                          : ""
                          } `}
                        {` ${activityData.activity_name != ""
                          ? activityData.activity_name
                          : ""
                          } `}
                        {`${locationChildData !== null
                          ? `is at ${locationChildData.location_name}`
                          : ""
                          }`}
                      </h6>
                    </div>

                  </div>

                  <div className="form-group with-icon label-floating is-empty border rounded m-1">
                    {/* <label className="control-label">
                          Share what you are thinking here...
                        </label> */}

                    {/* <textarea
                          ref={input}
                          type="text"
                          className="form-control"
                          style={{
                            height: height + 'px',
                            border: 'none',
                            width: '100%',
                            minHeight: '80px', // Set a minimum height
                          }}
                          onInput={handleInputChange}
                        /> */}

                    <div className="">
                      <textarea
                         className={`${textColor!=null ? 'form-controlss '+textColor:'form-control'} `}
                        placeholder=" Share what you are thinking here..."
                        // defaultValue={""}
                        style={{ border: "none", minHeight: "135px" }}
                        value={content}
                        onChange={handleContentChange}
                      />
                    </div>

                    {/* Display uploaded files in a single grid */}
                    <div className="grid-container">
                      {files.length > 0 &&
                        files.map((file, index) => (
                          <div key={`file-${index}`} className="grid-item">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Uploaded Image ${index}`}
                              // width="200"
                              // height="200"
                              />
                            ) : file.type.startsWith("video/") ? (
                              // <video width="200" height="200" controls>
                              <video controls>
                                <source
                                  src={URL.createObjectURL(file)}
                                  type={file.type}
                                />
                                Your browser does not support the video tag.
                              </video>
                            ) : null}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className='post-back-color-full-div'>
                    <div
                      className='post-back-color-div'
                      onClick={() => {
                        setShowColors(!showColors);
                        handleBackgroundColors(null);
                      }
                      }>
                      <img
                        className='post-back-color-img'
                        src={Colorselect.src}
                        alt=''
                      />
                    </div>

                    {showColors && (
                      <div className='colors-div' ref={colorsRef}>
                        <div className='color-div color-one' onClick={(e) => { handleBackgroundColors('color-one') }} />
                        <div className='color-div color-two' onClick={(e) => { handleBackgroundColors('color-two') }} />
                        <div className='color-div color-three' onClick={(e) => { handleBackgroundColors('color-three') }} />

                        <div className='color-div color-four' onClick={(e) => { handleBackgroundColors('color-four') }} />
                        <div className='color-div color-five' onClick={(e) => { handleBackgroundColors('color-five') }} />
                        <div className='color-div color-six' onClick={(e) => { handleBackgroundColors('color-six') }} />
                        <div className='color-div color-seven' onClick={(e) => { handleBackgroundColors('color-seven') }} />
                        <div className='color-div color-nine' onClick={(e) => { handleBackgroundColors('color-nine') }} />
                        <div className='color-div color-ten' onClick={(e) => { handleBackgroundColors('color-ten') }} />
                        <div className='color-div color-nine' onClick={(e) => { handleBackgroundColors('color-nine') }} />
                        <div className='color-div color-ten' onClick={(e) => { handleBackgroundColors('color-ten') }} />
                        <div className='color-div color-eleven' onClick={(e) => { handleBackgroundColors('color-eleven') }} />
                        <div className='color-div color-twelve' onClick={(e) => { handleBackgroundColors('color-twelve') }} />
                        <div className='color-div color-thirteen' onClick={(e) => { handleBackgroundColors('color-thirteen') }} />
                        <div className='color-div color-fortheen' onClick={(e) => { handleBackgroundColors('color-fortheen') }} />
                        <div className='color-div color-fivteen' onClick={(e) => { handleBackgroundColors('color-fivteen') }} />
                      </div>
                    )}

                    {showColors && (
                      <>
                        {colorsRef.current &&
                          colorsRef.current.scrollLeft > 0 && (
                            <div
                              className='arrow'
                              onClick={() => scroll("left")}>
                              {"<"}
                            </div>
                          )}
                        {colorsRef.current &&
                          colorsRef.current.scrollLeft <
                          colorsRef.current.scrollWidth -
                          colorsRef.current.clientWidth && (
                            <div
                              className='arrow'
                              style={{ right: 0 }}
                              onClick={() => scroll("right")}>
                              {">"}
                            </div>
                          )}
                      </>
                    )}
                  </div>


                  <div className="post-field-icons">
                    <div className="row">
                      <div className="col-lg-9 col-md-9 col-sm-9 col-6 ">
                        <span className="p-text-add text-black">
                          Add to your post
                        </span>
                      </div>
                      <div className="post-field-single-icon  col-lg-3 col-md-3 col-sm-3 col-6 d-flex align-items-center ">
                        {/* <Image src={photoSvg.src} width="20" height="20" onClick={handlePostImageUpload} /> */}
                        {/* <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} /> */}

                        <div className="post-media-icon ">
                          <Image
                            src={photoSvg.src}
                            width="20"
                            height="20"
                            className=""
                            name="media"
                            onClick={handlePostImageUpload}
                          />
                          <input
                            type="file"
                            className="media-file"
                            name="media"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleFileUpload}
                          />
                        </div>

                        <div>
                          <Image
                            src={locationSvg.src}
                            width="20"
                            height="20"
                            onClick={openModal}
                          />
                        </div>
                        <div>
                          <Image
                            src={addfriendSvg.src}
                            width="20"
                            height="20"
                          />
                        </div>
                        <div>
                          <Image src={gallerySvg.src} width="20" height="20" />
                        </div>
                        <div className="">
                          <span onClick={setFeelingModal}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="black"
                              className="bi bi-three-dots"
                              viewBox="0 0 16 16">
                              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="post-btton-div">
                    <button className="post-btton" type="submit">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            ) : authUserName == params.username ? (
              <div
                className="profile-post-inputs"
                id=""
                role="tabpanel"
                aria-expanded="true">
                <form
                  className="profile-post-inputs-form"
                  onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center mt-4 m-1">
                    {/* <div className=""> */}

                    {profileImage !== null ? (
                      <div className="author-thumbs">
                        <img
                          src={`${host}/uploads/${profileImage}`}
                          alt=""
                          className="avatar "
                        />
                      </div>
                    ) : (
                      <div className="author-thumbs">
                        <img
                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          className="avatar "
                        />
                      </div>
                    )}
                    <div className="name-and-privacy ">
                      <div className="mx-2">
                        <h6>
                          {`${fullName} `}
                          {` ${activityData.activity_name != "" ? "is" : ""} `}
                          {activityData.logo != "" ? (
                            <img
                              src={`${host}/assets/${activityData.logo}`}
                              className="feeling-icon"
                            />
                          ) : (
                            ""
                          )}
                          {` ${activityData.activity_type != ""
                            ? activityData.activity_type
                            : ""
                            } `}
                          {` ${activityData.activity_name != ""
                            ? activityData.activity_name
                            : ""
                            } `}
                          {`${locationChildData !== null
                            ? `is at ${locationChildData.location_name}`
                            : ""
                            }`}
                        </h6>
                      </div>
                      <div className="">
                        <div className="my-0">
                          {/* <Select

                                options={options}
                                value={{
                                  label: (
                                    <div className="selected-option">
                                      {selectedOption.icon}
                                      <span className="mx-1">{selectedOption.label}</span>
                                    </div>
                                  ),
                                  value: selectedOption.value,
                                }} onChange={handleChange}
                                isSearchable={false}
                                components={{
                                  Option: ({ innerProps, label, data }) => (
                                    <div {...innerProps} className="inner-item-select-post-privacy-dropdown">
                                      {data.icon}
                                      <span className="mx-1">{label} </span>

                                    </div>
                                  ),
                                }}
                                className="select-post-privacy-dropdown py-1 my-0"
                                styles={customStyles}

                              /> */}
                          <FormControl size="small" fullWidth
                          >
                            {/* <InputLabel id="privacy-label">Privacy</InputLabel> */}
                            <Select
                              labelId="privacy-label"
                              id="privacy-select"
                              value={selectedOption}
                              // label="Privacy"
                              onChange={handleChange}
                              sx={{
                                fontSize: '12px',
                                backgroundColor: 'white',
                                '& .MuiSelect-select': {
                                  border: 'none',
                                },
                                '& .MuiFilledInput-root': {
                                  borderBottom: 'none',
                                },
                                "& fieldset": { border: 'none' },
                              }}

                            >
                              {post_pricay_optionlist.map((option) => (
                                <MenuItem key={option.value} value={option.value} sx={{ fontSize: '12px', '& .MuiSelect-select': { border: 'none', backgroundColor: "white", outline: "0" } }}>
                                  <span class=""> {option.icon}</span>
                                  <span class="mx-1"> {option.label}</span>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>






                      </div>
                    </div>

                  </div>

                  <div className="form-group with-icon label-floating is-empty border rounded m-1">
                    {/* <label className="control-label">
                          Share what you are thinking here...
                        </label> */}

                    {/* <textarea
                          ref={input}
                          type="text"
                          className="form-control"
                          style={{
                            height: height + 'px',
                            border: 'none',
                            width: '100%',
                            minHeight: '80px', // Set a minimum height
                          }}
                          onInput={handleInputChange}
                        /> */}

                    <div className="">
                      <textarea
                        className={`${textColor!=null ? 'form-controlss '+textColor:'form-control'} `}
                        placeholder=" Share what you are thinking here..."
                        // defaultValue={""}
                        style={{ border: "none", minHeight: "135px" }}
                        value={content}
                        onChange={handleContentChange}
                      />
                    </div>

                    {/* Display uploaded files in a single grid */}
                    <div className="grid-container">
                      {files.length > 0 &&
                        files.map((file, index) => (
                          <div key={`file-${index}`} className="grid-item">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Uploaded Image ${index}`}
                              // width="200"
                              // height="200"
                              />
                            ) : file.type.startsWith("video/") ? (
                              // <video width="200" height="200" controls>
                              <video controls>
                                <source
                                  src={URL.createObjectURL(file)}
                                  type={file.type}
                                />
                                Your browser does not support the video tag.
                              </video>
                            ) : null}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className='post-back-color-full-div'>
                    <div
                      className='post-back-color-div'
                      onClick={() => {
                        setShowColors(!showColors);
                        handleBackgroundColors(null);
                      }
                      }>
                      <img
                        className='post-back-color-img'
                        src={Colorselect.src}
                        alt=''
                      />
                    </div>

                    {showColors && (
                      <div className='colors-div' ref={colorsRef}>
                        <div className='color-div color-one' onClick={(e) => { handleBackgroundColors('color-one') }} />
                        <div className='color-div color-two' onClick={(e) => { handleBackgroundColors('color-two') }} />
                        <div className='color-div color-three' onClick={(e) => { handleBackgroundColors('color-three') }} />

                        <div className='color-div color-four' onClick={(e) => { handleBackgroundColors('color-four') }} />
                        <div className='color-div color-five' onClick={(e) => { handleBackgroundColors('color-five') }} />
                        <div className='color-div color-six' onClick={(e) => { handleBackgroundColors('color-six') }} />
                        <div className='color-div color-seven' onClick={(e) => { handleBackgroundColors('color-seven') }} />
                        <div className='color-div color-nine' onClick={(e) => { handleBackgroundColors('color-nine') }} />
                        <div className='color-div color-ten' onClick={(e) => { handleBackgroundColors('color-ten') }} />
                        <div className='color-div color-nine' onClick={(e) => { handleBackgroundColors('color-nine') }} />
                        <div className='color-div color-ten' onClick={(e) => { handleBackgroundColors('color-ten') }} />
                        <div className='color-div color-eleven' onClick={(e) => { handleBackgroundColors('color-eleven') }} />
                        <div className='color-div color-twelve' onClick={(e) => { handleBackgroundColors('color-twelve') }} />
                        <div className='color-div color-thirteen' onClick={(e) => { handleBackgroundColors('color-thirteen') }} />
                        <div className='color-div color-fortheen' onClick={(e) => { handleBackgroundColors('color-fortheen') }} />
                        <div className='color-div color-fivteen' onClick={(e) => { handleBackgroundColors('color-fivteen') }} />
                      </div>
                    )}

                    {showColors && (
                      <>
                        {colorsRef.current &&
                          colorsRef.current.scrollLeft > 0 && (
                            <div
                              className='arrow'
                              onClick={() => scroll("left")}>
                              {"<"}
                            </div>
                          )}
                        {colorsRef.current &&
                          colorsRef.current.scrollLeft <
                          colorsRef.current.scrollWidth -
                          colorsRef.current.clientWidth && (
                            <div
                              className='arrow'
                              style={{ right: 0 }}
                              onClick={() => scroll("right")}>
                              {">"}
                            </div>
                          )}
                      </>
                    )}
                  </div>
                  <div className="post-field-icons">
                    <div className="row">
                      <div className="col-lg-9 col-md-9 col-sm-9 col-6 ">
                        <span className="p-text-add text-black">
                          Add to your post
                        </span>
                      </div>
                      <div className="post-field-single-icon  col-lg-3 col-md-3 col-sm-3 col-6 d-flex align-items-center ">
                        {/* <Image src={photoSvg.src} width="20" height="20" onClick={handlePostImageUpload} /> */}
                        {/* <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} /> */}

                        <div className="post-media-icon ">
                          <Image
                            src={photoSvg.src}
                            width="20"
                            height="20"
                            className=""
                            name="media"
                            onClick={handlePostImageUpload}
                          />
                          <input
                            type="file"
                            className="media-file"
                            name="media"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleFileUpload}
                          />
                        </div>

                        <div>
                          <Image
                            src={locationSvg.src}
                            width="20"
                            height="20"
                            onClick={openModal}
                          />
                        </div>
                        <div>
                          <Image
                            src={addfriendSvg.src}
                            width="20"
                            height="20"
                          />
                        </div>
                        <div>
                          <Image src={gallerySvg.src} width="20" height="20" />
                        </div>
                        <div className="">
                          <span onClick={setFeelingModal}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="black"
                              className="bi bi-three-dots"
                              viewBox="0 0 16 16">
                              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="post-btton-div">
                    <button className="post-btton" type="submit">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
            <div className="profile-post-inputs profile-post-block-lock">
              {authUserName != params.username &&
                lockProfile == "1" &&
                friendRequestStatus != 1 ? (
                <div className="lock-profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="#307777"
                    className="bi bi-shield-lock mb-3"
                    viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
                  </svg>
                  <div className="lock-profile-texts">
                    <h5>
                      {authUserName == params.username
                        ? "You"
                        : fullName + "'s"}{" "}
                      locked your profile{" "}
                    </h5>
                    <p className="lock-profile-text-p">
                      Learn More about unlock
                    </p>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div id="newsfeed-items-grid">
              {authUserName == params.username || friendRequestStatus == 1 ? (
                <ProfilePostList />
              ) : (
                <>
                  {" "}
                  <h3 className="text-center mt-3"> No Posts available</h3>
                </>
              )}
            </div>
            <a
              id="load-more-button"
              href="#"
              className="btn btn-control btn-more"
              data-load-link="items-to-load.html"
              data-container="newsfeed-items-grid">
              <svg className="olymp-three-dots-icon">
                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
              </svg>
            </a>
          </div>
          {/* ... end Main Content */}
          {/* Left Sidebar */}
          <div className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
            <div className="lock-div">
              {lockProfile == "1" ? (
                <div className="lock-profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="#307777"
                    className="bi bi-shield-lock mb-3"
                    viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
                  </svg>
                  <div className="lock-profile-texts">
                    <h5>
                      {authUserName == params.username
                        ? "You"
                        : fullName + "'s"}{" "}
                      locked his profile{" "}
                    </h5>
                    <p className="lock-profile-text-p">
                      Learn More about unlock
                    </p>
                  </div>
                </div>
              ) : (
                <div className="lock-profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="#307777"
                    className="bi bi-shield-lock mb-3"
                    viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
                  </svg>
                  <div className="lock-profile-texts">
                    <h5>
                      {authUserName == params.username
                        ? "You"
                        : fullName + "'s"}{" "}
                      can lock his profile
                    </h5>
                    <p className="lock-profile-text-p">Learn More</p>
                  </div>
                </div>
              )}
            </div>

            <div className="ui-block web">
              <div className="ui-block-content">
                {/* W-Personal-Info */}
                <ul className="widget w-personal-info item-block">
                  <li>
                    <p className="title">Intro:</p>
                    <span className="pro-intro-text">"{userBio}"</span>
                    <div className="profile-follow-li">
                      <Image
                        src={pendulamIcon}
                        height={20}
                        width={20}
                        alt="pendulam"
                        className="follow-icon"
                      />
                      <p>
                        Followed by{" "}
                        <strong style={{ color: "#307777" }}>{folowCount}</strong>{" "}
                        QPeoples
                      </p>
                    </div>
                  </li>
                  {authUserName == params.username ? (
                    <li>
                      <div className="profile-edit-li">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person-badge "
                          viewBox="0 0 16 16">
                          <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                        </svg>
                        <p className="ed">Edit Details</p>
                      </div>
                      <div className="profile-edit-li">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-shield-shaded"
                          viewBox="0 0 16 16">
                          <path
                            fill-rule="evenodd"
                            d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
                          />
                        </svg>
                        <p className="ed">Add your Hobbies</p>
                      </div>
                      <div className="profile-edit-li">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-puzzle"
                          viewBox="0 0 16 16">
                          <path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.459.459 0 0 0-.115.118.113.113 0 0 0-.012.025L6.5 4.5v.003l.003.01c.004.01.014.028.036.053a.86.86 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.86.86 0 0 0 .271-.194.213.213 0 0 0 .039-.063v-.009a.112.112 0 0 0-.012-.025.459.459 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.459.459 0 0 0 .115-.118.113.113 0 0 0 .012-.025L9.5 11.5v-.003a.214.214 0 0 0-.039-.064.859.859 0 0 0-.27-.193C8.91 11.1 8.49 11 8 11c-.491 0-.912.1-1.19.24a.859.859 0 0 0-.271.194.214.214 0 0 0-.039.063v.003l.001.006a.113.113 0 0 0 .012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238l-.244-2.855zM4.605 3a.5.5 0 0 0-.498.55l.001.007.29 3.4A.5.5 0 0 1 3.9 7.5h-.782c-.696 0-1.182-.497-1.469-.872a.459.459 0 0 0-.118-.115.112.112 0 0 0-.025-.012L1.5 6.5h-.003a.213.213 0 0 0-.064.039.86.86 0 0 0-.193.27C1.1 7.09 1 7.51 1 8c0 .491.1.912.24 1.19.07.14.14.225.194.271a.213.213 0 0 0 .063.039H1.5l.006-.001a.112.112 0 0 0 .025-.012.459.459 0 0 0 .118-.115c.287-.375.773-.872 1.469-.872H3.9a.5.5 0 0 1 .498.542l-.29 3.408a.5.5 0 0 0 .497.55h1.878c-.048-.166-.195-.352-.463-.557-.274-.21-.52-.528-.52-.943 0-.568.447-.947.862-1.154C6.807 10.123 7.387 10 8 10s1.193.123 1.638.346c.415.207.862.586.862 1.154 0 .415-.246.733-.52.943-.268.205-.415.39-.463.557h1.878a.5.5 0 0 0 .498-.55l-.001-.007-.29-3.4A.5.5 0 0 1 12.1 8.5h.782c.696 0 1.182.497 1.469.872.05.065.091.099.118.115.013.008.021.01.025.012a.02.02 0 0 0 .006.001h.003a.214.214 0 0 0 .064-.039.86.86 0 0 0 .193-.27c.14-.28.24-.7.24-1.191 0-.492-.1-.912-.24-1.19a.86.86 0 0 0-.194-.271.215.215 0 0 0-.063-.039H14.5l-.006.001a.113.113 0 0 0-.025.012.459.459 0 0 0-.118.115c-.287.375-.773.872-1.469.872H12.1a.5.5 0 0 1-.498-.543l.29-3.407a.5.5 0 0 0-.497-.55H9.517c.048.166.195.352.463.557.274.21.52.528.52.943 0 .568-.447.947-.862 1.154C9.193 5.877 8.613 6 8 6s-1.193-.123-1.638-.346C5.947 5.447 5.5 5.068 5.5 4.5c0-.415.246-.733.52-.943.268-.205.415-.39.463-.557H4.605z" />
                        </svg>
                        <p className="ed">Add featured</p>
                      </div>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
            <div
              className={`life-info ui-block web ${isScrollable ? "scrollable" : ""
                }`}>
              <div className="my-life-book">
                <h6 className="life-book-h6">My life book</h6>
                {itemsToShow < 3 && (
                  <p className="see-all" onClick={handleSeeAllClick}>
                    See all
                  </p>
                )}
              </div>
              <div className="ui-block-content">
                <div>
                  <div className="life-single-full-div">
                    {[...Array(itemsToShow)].map((_, index) => (
                      <div key={index} className="life-single-div">
                        <Image src={bornIcon} height={20} width={20} alt="" />
                        <div className="life-single-texts">
                          <h6>Born in</h6>
                          <p>1996</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ui-block web">
              <div className="my-life-book-full-div">
                <div className="frieds-text">
                  <div className="life-book-h6-div">
                    <h6 className="life-book-h6">Connections</h6>
                    <span>
                      {friendCount}{" "}
                      {friendCount > 1 ? "Connections" : "Connection"}
                    </span>
                  </div>
                  <p style={{ color: "#307777" }}>See all friends</p>
                </div>
                <div className="profile-friends-div">
                  {friendlist.length > 0
                    ? friendlist.map((item) => (
                      <div>
                        {item.connected_user_id?.username ==
                          params.username ? (
                          <>
                            <Image
                              src={`${host}/uploads/${item.user_id.profile_pic}`}
                              className="prof-freinds-img"
                              height={110}
                              width={90}
                              alt={item.user_id.first_name}
                            />

                            <p>
                              <Link
                                href={`/profile/${item.user_id.username}`}>
                                <p className="profi-nam">
                                  <strong>{item.user_id.first_name}</strong>{" "}
                                  {item.user_id.last_name}
                                </p>
                              </Link>
                            </p>
                          </>
                        ) : (
                          <>
                            <Image
                              src={`${host}/uploads/${item.connected_user_id?.profile_pic}`}
                              className="prof-freinds-img"
                              height={110}
                              width={90}
                              alt={item.connected_user_id?.first_name}
                            />

                            <p>
                              <Link
                                href={`/profile/${item.connected_user_id?.username}`}>
                                <p className="profi-nam">
                                  <strong>
                                    {" "}
                                    {item.connected_user_id?.first_name}
                                  </strong>{" "}
                                  {item.connected_user_id?.last_name}
                                </p>
                              </Link>
                            </p>
                          </>
                        )}
                      </div>
                    ))
                    : "No Connections Yet"}
                </div>
              </div>
            </div>
            {authUserName == params.username ? (
              <>
                <div className="ui-block web">
                  {/* W-Twitter */}
                  <div className="Other-social-div">
                    <div className="widget w-socials">
                      <h6 className="wallet">Other Social Networks:</h6>
                      <a href="#" className="social-single-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="60"
                          height="16"
                          fill="currentColor"
                          className="bi bi-facebook"
                          viewBox="0 0 16 16">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                        <p className="connect-p">Connect with Facebook</p>
                      </a>
                      <a href="#" className="social-single-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="60"
                          height="16"
                          fill="currentColor"
                          className="bi bi-globe-americas"
                          viewBox="0 0 16 16">
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                        </svg>
                        <p className="connect-p">Connect with Dribbble</p>
                      </a>
                      <a href="#" className="social-single-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="60"
                          height="16"
                          fill="currentColor"
                          className="bi bi-twitter"
                          viewBox="0 0 16 16">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                        <p className="connect-p">Connect with Twitter</p>
                      </a>
                    </div>
                  </div>
                  {/* .. end W-Twitter */}
                </div>
                <div className="ui-block">
                  <div className="wallet-tag">
                    <h6 className="wallet">Wallet</h6>
                  </div>
                  <div className="ui-block-content">
                    {/* W-Latest-Video */}
                    <a href="#" className="social-single-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="16"
                        fill="white"
                        className="bi bi-wallet2"
                        viewBox="0 0 16 16">
                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                      </svg>
                      <p className="connect-p">Connect with Wallet</p>
                    </a>
                    {/* .. end W-Latest-Video */}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="ui-block web">
              <div className="walle t-tag">
                <h6 className="wallet">Add-ons</h6>
                <p>Find your add ons & privilege your area</p>
                <div className="random-div" />
              </div>
              <div className="ui-block-content">
                <div className="privacy-profile">
                  <Link href="/">Privacy</Link>
                  <Link href="/">Term</Link>
                  <Link href="/">Advertising</Link>
                  <Link href="/">Ad-Choices</Link>
                  <Link href="/">Cokies</Link>
                  <Link href="/">More</Link>
                </div>

                <div className="possibilities-Inc">
                  <>Quantum possibilities Inc. © 2023</>
                </div>
              </div>
            </div>
          </div>
          {/* ... end Left Sidebar */}
          {/* Right Sidebar */}
          <div className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
            <div className="ui-block ">
              <div className="ui-block-title">
                <h6 className="title">My Photos</h6>
              </div>
              <div className="ui-block-content">
                {/* W-Latest-Photo */}
                <ul className="widget w-last-photo js-zoom-gallery">
                  {lastestImage.length > 0
                    ? lastestImage.map((item, i) => (
                      <li>
                        <a href="#">
                          <img
                            src={`${host}/uploads/posts/${item.media}`}
                            alt="photo"
                            className="image-height"
                          />
                        </a>
                      </li>
                    ))
                    : "No Photos "}
                </ul>
                {/* .. end W-Latest-Photo */}
              </div>
            </div>
            <div className="ui-block">
              <div className="ui-block-title">
                <h6 className="title">My Videos</h6>
              </div>
              <div className="ui-block-content">
                {/* W-Latest-Photo */}
                <ul className="widget w-last-photo js-zoom-gallery">
                  {lastestVideo.length > 0
                    ? lastestVideo.map((item, i) => (
                      <li>
                        <a href="#">
                          <video
                            controls
                            // poster={`${host}/uploads/posts/${imageItem.image}`}
                            src={`${host}/uploads/posts/${item.media}`}
                            key={item._id}
                            // onClick={() => handleVideoClick(imageItem)}
                            className="one-more-videos border"
                            lazy
                            controlsList="nodownload"
                            onClick={(e) =>
                              console.log("clicked video", imageItem.media)
                            }>
                            <source
                              src={`${host}/uploads/posts/${item.media}`}
                              type="video/mp4"
                              onClick={(e) =>
                                console.log("clicked video", item.media)
                              }
                            />
                            Your browser does not support the video tag.
                          </video>
                        </a>
                      </li>
                    ))
                    : "No Videos "}
                </ul>
                {/* .. end W-Latest-Photo */}
              </div>
            </div>
          </div>
          {/* ... end Right Sidebar */}
        </div>
      </div>

      {/* Window-popup Update Header Photo */}
      <div
        className="modal fade"
        id="update-header-photo"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="update-header-photo"
        aria-hidden="true">
        <div
          className="modal-dialog window-popup update-header-photo"
          role="document">
          <div className="modal-content">
            <a
              href="#"
              className="close icon-close"
              data-dismiss="modal"
              aria-label="Close">
              <svg className="olymp-close-icon">
                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
              </svg>
            </a>
            <div className="modal-header">
              <h6 className="title">Update Header Photo</h6>
            </div>
            <div className="modal-body">
              <a href="#" className="upload-photo-item">
                <svg className="olymp-computer-icon">
                  <use xlinkHref="svg-icons/sprites/icons.svg#olymp-computer-icon" />
                </svg>
                <h6>Upload Photo</h6>
                <span>Browse your computer.</span>
              </a>
              <a
                href="#"
                className="upload-photo-item"
                data-toggle="modal"
                data-target="#choose-from-my-photo">
                <svg className="olymp-photos-icon">
                  <use xlinkHref="svg-icons/sprites/icons.svg#olymp-photos-icon" />
                </svg>
                <h6>Choose from My Photos</h6>
                <span>Choose from your uploaded photos</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ... end Window-popup Update Header Photo */}
      {/* Window-popup Choose from my Photo */}
      <div
        className="modal fade"
        id="choose-from-my-photo"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="choose-from-my-photo"
        aria-hidden="true">
        <div
          className="modal-dialog window-popup choose-from-my-photo"
          role="document">
          <div className="modal-content">
            <a
              href="#"
              className="close icon-close"
              data-dismiss="modal"
              aria-label="Close">
              <svg className="olymp-close-icon">
                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
              </svg>
            </a>
            <div className="modal-header">
              <h6 className="title">Choose from My Photos</h6>
              {/* Nav tabs */}
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-expanded="true">
                    <svg className="olymp-photos-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-photos-icon" />
                    </svg>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-expanded="false">
                    <svg className="olymp-albums-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-albums-icon" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="modal-body">
              {/* Tab panes */}
              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="home"
                  role="tabpanel"
                  aria-expanded="true">
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo1.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo2.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo3.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo4.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo5.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo6.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo7.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo8.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <div className="radio">
                      <label className="custom-radio">
                        <img src="img/choose-photo9.jpg" alt="photo" />
                        <input type="radio" name="optionsRadios" />
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="btn btn-secondary btn-lg btn--half-width">
                    Cancel
                  </a>
                  <a
                    href="#"
                    className="btn btn-primary btn-lg btn--half-width">
                    Confirm Photo
                  </a>
                </div>
                <div
                  className="tab-pane"
                  id="profile"
                  role="tabpanel"
                  aria-expanded="false">
                  <div className="choose-photo-item" data-mh="choose-item">
                    <figure>
                      <img src="img/choose-photo10.jpg" alt="photo" />
                      <figcaption>
                        <a href="#">South America Vacations</a>
                        <span>Last Added: 2 hours ago</span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <figure>
                      <img src="img/choose-photo11.jpg" alt="photo" />
                      <figcaption>
                        <a href="#">Photoshoot Summer 2016</a>
                        <span>Last Added: 5 weeks ago</span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <figure>
                      <img src="img/choose-photo12.jpg" alt="photo" />
                      <figcaption>
                        <a href="#">Amazing Street Food</a>
                        <span>Last Added: 6 mins ago</span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <figure>
                      <img src="img/choose-photo13.jpg" alt="photo" />
                      <figcaption>
                        <a href="#">Graffity &amp; Street Art</a>
                        <span>Last Added: 16 hours ago</span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <figure>
                      <img src="img/choose-photo14.jpg" alt="photo" />
                      <figcaption>
                        <a href="#">Amazing Landscapes</a>
                        <span>Last Added: 13 mins ago</span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="choose-photo-item" data-mh="choose-item">
                    <figure>
                      <img src="img/choose-photo15.jpg" alt="photo" />
                      <figcaption>
                        <a href="#">The Majestic Canyon</a>
                        <span>Last Added: 57 mins ago</span>
                      </figcaption>
                    </figure>
                  </div>
                  <a
                    href="#"
                    className="btn btn-secondary btn-lg btn--half-width">
                    Cancel
                  </a>
                  <a
                    href="#"
                    className="btn btn-primary btn-lg disabled btn--half-width">
                    Confirm Photo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ... end Window-popup Choose from my Photo */}
      {/* Playlist Popup */}
      <div
        className="window-popup playlist-popup"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="playlist-popup"
        aria-hidden="true">
        <a href className="icon-close js-close-popup">
          <svg className="olymp-close-icon">
            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
          </svg>
        </a>
        <div className="mCustomScrollbar">
          <table className="playlist-popup-table">
            <thead>
              <tr>
                <th className="play">PLAY</th>
                <th className="cover">COVER</th>
                <th className="song-artist">SONG AND ARTIST</th>
                <th className="album">ALBUM</th>
                <th className="released">RELEASED</th>
                <th className="duration">DURATION</th>
                <th className="spotify">GET IT ON SPOTIFY</th>
                <th className="remove">REMOVE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="play">
                  <a href="#" className="play-icon">
                    <svg className="olymp-music-play-icon-big">
                      <use xlinkHref="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                    </svg>
                  </a>
                </td>
                <td className="cover">
                  <div className="playlist-thumb">
                    <img src="img/playlist19.jpg" alt="thumb-composition" />
                  </div>
                </td>
                <td className="song-artist">
                  <div className="composition">
                    <a href="#" className="composition-name">
                      We Can Be Heroes
                    </a>
                    <a href="#" className="composition-author">
                      Jason Bowie
                    </a>
                  </div>
                </td>
                <td className="album">
                  <a href="#" className="album-composition">
                    Ziggy Firedust
                  </a>
                </td>
                <td className="released">
                  <div className="release-year">2014</div>
                </td>
                <td className="duration">
                  <div className="composition-time">
                    <time className="published" dateTime="2017-03-24T18:18">
                      6:17
                    </time>
                  </div>
                </td>
                <td className="spotify">
                  <i
                    className="fab fa-spotify composition-icon"
                    aria-hidden="true"
                  />
                </td>
                <td className="remove">
                  <a href="#" className="remove-icon">
                    <svg className="olymp-close-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="play">
                  <a href="#" className="play-icon">
                    <svg className="olymp-music-play-icon-big">
                      <use xlinkHref="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                    </svg>
                  </a>
                </td>
                <td className="cover">
                  <div className="playlist-thumb">
                    <img src="img/playlist6.jpg" alt="thumb-composition" />
                  </div>
                </td>
                <td className="song-artist">
                  <div className="composition">
                    <a href="#" className="composition-name">
                      The Past Starts Slow and Ends
                    </a>
                    <a href="#" className="composition-author">
                      System of a Revenge
                    </a>
                  </div>
                </td>
                <td className="album">
                  <a href="#" className="album-composition">
                    Wonderize
                  </a>
                </td>
                <td className="released">
                  <div className="release-year">2014</div>
                </td>
                <td className="duration">
                  <div className="composition-time">
                    <time className="published" dateTime="2017-03-24T18:18">
                      6:17
                    </time>
                  </div>
                </td>
                <td className="spotify">
                  <i
                    className="fab fa-spotify composition-icon"
                    aria-hidden="true"
                  />
                </td>
                <td className="remove">
                  <a href="#" className="remove-icon">
                    <svg className="olymp-close-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="play">
                  <a href="#" className="play-icon">
                    <svg className="olymp-music-play-icon-big">
                      <use xlinkHref="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                    </svg>
                  </a>
                </td>
                <td className="cover">
                  <div className="playlist-thumb">
                    <img src="img/playlist7.jpg" alt="thumb-composition" />
                  </div>
                </td>
                <td className="song-artist">
                  <div className="composition">
                    <a href="#" className="composition-name">
                      The Pretender
                    </a>
                    <a href="#" className="composition-author">
                      Kung Fighters
                    </a>
                  </div>
                </td>
                <td className="album">
                  <a href="#" className="album-composition">
                    Warping Lights
                  </a>
                </td>
                <td className="released">
                  <div className="release-year">2014</div>
                </td>
                <td className="duration">
                  <div className="composition-time">
                    <time className="published" dateTime="2017-03-24T18:18">
                      6:17
                    </time>
                  </div>
                </td>
                <td className="spotify">
                  <i
                    className="fab fa-spotify composition-icon"
                    aria-hidden="true"
                  />
                </td>
                <td className="remove">
                  <a href="#" className="remove-icon">
                    <svg className="olymp-close-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="play">
                  <a href="#" className="play-icon">
                    <svg className="olymp-music-play-icon-big">
                      <use xlinkHref="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                    </svg>
                  </a>
                </td>
                <td className="cover">
                  <div className="playlist-thumb">
                    <img src="img/playlist8.jpg" alt="thumb-composition" />
                  </div>
                </td>
                <td className="song-artist">
                  <div className="composition">
                    <a href="#" className="composition-name">
                      Seven Nation Army
                    </a>
                    <a href="#" className="composition-author">
                      The Black Stripes
                    </a>
                  </div>
                </td>
                <td className="album">
                  <a href="#" className="album-composition ">
                    Icky Strung (LIVE at Cube Garden)
                  </a>
                </td>
                <td className="released">
                  <div className="release-year">2014</div>
                </td>
                <td className="duration">
                  <div className="composition-time">
                    <time className="published" dateTime="2017-03-24T18:18">
                      6:17
                    </time>
                  </div>
                </td>
                <td className="spotify">
                  <i
                    className="fab fa-spotify composition-icon"
                    aria-hidden="true"
                  />
                </td>
                <td className="remove">
                  <a href="#" className="remove-icon">
                    <svg className="olymp-close-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="play">
                  <a href="#" className="play-icon">
                    <svg className="olymp-music-play-icon-big">
                      <use xlinkHref="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                    </svg>
                  </a>
                </td>
                <td className="cover">
                  <div className="playlist-thumb">
                    <img src="img/playlist9.jpg" alt="thumb-composition" />
                  </div>
                </td>
                <td className="song-artist">
                  <div className="composition">
                    <a href="#" className="composition-name">
                      Leap of Faith
                    </a>
                    <a href="#" className="composition-author">
                      Eden Artifact
                    </a>
                  </div>
                </td>
                <td className="album">
                  <a href="#" className="album-composition">
                    The Assassins’s Soundtrack
                  </a>
                </td>
                <td className="released">
                  <div className="release-year">2014</div>
                </td>
                <td className="duration">
                  <div className="composition-time">
                    <time className="published" dateTime="2017-03-24T18:18">
                      6:17
                    </time>
                  </div>
                </td>
                <td className="spotify">
                  <i
                    className="fab fa-spotify composition-icon"
                    aria-hidden="true"
                  />
                </td>
                <td className="remove">
                  <a href="#" className="remove-icon">
                    <svg className="olymp-close-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                    </svg>
                  </a>
                </td>
              </tr>
              <tr>
                <td className="play">
                  <a href="#" className="play-icon">
                    <svg className="olymp-music-play-icon-big">
                      <use xlinkHref="svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                    </svg>
                  </a>
                </td>
                <td className="cover">
                  <div className="playlist-thumb">
                    <img src="img/playlist10.jpg" alt="thumb-composition" />
                  </div>
                </td>
                <td className="song-artist">
                  <div className="composition">
                    <a href="#" className="composition-name">
                      Killer Queen
                    </a>
                    <a href="#" className="composition-author">
                      Archiduke
                    </a>
                  </div>
                </td>
                <td className="album">
                  <a href="#" className="album-composition ">
                    News of the Universe
                  </a>
                </td>
                <td className="released">
                  <div className="release-year">2014</div>
                </td>
                <td className="duration">
                  <div className="composition-time">
                    <time className="published" dateTime="2017-03-24T18:18">
                      6:17
                    </time>
                  </div>
                </td>
                <td className="spotify">
                  <i
                    className="fab fa-spotify composition-icon"
                    aria-hidden="true"
                  />
                </td>
                <td className="remove">
                  <a href="#" className="remove-icon">
                    <svg className="olymp-close-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <audio id="mediaplayer" data-showplaylist="true">
          <source
            src="mp3/Twice.mp3"
            title="Track 1"
            data-poster="track1.png"
            type="audio/mpeg"
          />
          <source
            src="mp3/Twice.mp3"
            title="Track 2"
            data-poster="track2.png"
            type="audio/mpeg"
          />
          <source
            src="mp3/Twice.mp3"
            title="Track 3"
            data-poster="track3.png"
            type="audio/mpeg"
          />
          <source
            src="mp3/Twice.mp3"
            title="Track 4"
            data-poster="track4.png"
            type="audio/mpeg"
          />
        </audio>
      </div>
      {/* ... end Playlist Popup */}
      <a className="back-to-top" href="#">
        <img
          src="../svg-icons/back-to-top.svg"
          alt="arrow"
          className="back-icon"
        />
      </a>
      {/* Window-popup-CHAT for responsive min-width: 768px */}
      <div
        className="ui-block popup-chat popup-chat-responsive"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="popup-chat-responsive"
        aria-hidden="true">
        <div className="modal-content">
          <div className="modal-header">
            <span className="icon-status online" />
            <h6 className="title">Chat</h6>
            <div className="more">
              <svg className="olymp-three-dots-icon">
                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
              </svg>
              <svg className="olymp-little-delete js-chat-open">
                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
              </svg>
            </div>
          </div>
          <div className="modal-body">
            <div className="mCustomScrollbar">
              <ul className="notification-list chat-message chat-message-field">
                <li>
                  <div className="author-thumb">
                    <img
                      src="img/avatar14-sm.jpg"
                      alt="author"
                      className="mCS_img_loaded"
                    />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">
                      Hi James! Please remember to buy the food for tomorrow!
                      I’m gonna be handling the gifts and Jake’s gonna get the
                      drinks
                    </span>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18">
                        Yesterday at 8:10pm
                      </time>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="author-thumb">
                    <img
                      src="img/author-page.jpg"
                      alt="author"
                      className="mCS_img_loaded"
                    />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">
                      Don’t worry Mathilda!
                    </span>
                    <span className="chat-message-item">
                      I already bought everything
                    </span>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18">
                        Yesterday at 8:29pm
                      </time>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="author-thumb">
                    <img
                      src="img/avatar14-sm.jpg"
                      alt="author"
                      className="mCS_img_loaded"
                    />
                  </div>
                  <div className="notification-event">
                    <span className="chat-message-item">
                      Hi James! Please remember to buy the food for tomorrow!
                      I’m gonna be handling the gifts and Jake’s gonna get the
                      drinks
                    </span>
                    <span className="notification-date">
                      <time
                        className="entry-date updated"
                        dateTime="2004-07-24T18:18">
                        Yesterday at 8:10pm
                      </time>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <form className="need-validation">
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Press enter to post..."
                  defaultValue={""}
                />
                <div className="add-options-message">
                  <a href="#" className="options-message">
                    <svg className="olymp-computer-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-computer-icon" />
                    </svg>
                  </a>
                  <div className="options-message smile-block">
                    <svg className="olymp-happy-sticker-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-happy-sticker-icon" />
                    </svg>
                    <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={profileChat.src} alt="icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <LocationModal
        isOpen={openLocationModal}
        onRequestClose={closeModal}
        sendDataToParent={handlelocationChildData}
      />

      <FeelingAndActivity
        isFeelingOpen={openFeelingModal}
        onRequestClose={closeFeelingModal}
        sendDataToParent={handleFeelingChildData}
      />
    </Masterdashboardlayout>
  );
}

export default page;
