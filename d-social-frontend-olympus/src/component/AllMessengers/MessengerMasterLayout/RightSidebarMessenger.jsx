
"use client"
import React, { useState, useEffect } from "react";
import "./RightSidebarMessenger.css"
import Link from 'next/link';

import mssengrIdimg from "../../../../public/mssengr-idimg.png";
import { Checkbox } from "@mui/material";
import { Label } from "@mui/icons-material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { useParams } from 'next/navigation'
import axiosInstance from "../../../../utils/axios";
import { toast } from "react-toastify";
import { host } from "@/environment";
import SearchIcon2 from "./_ui/icons/SearchIcon2";
import ProfileIcon2 from "./_ui/icons/ProfileIcon2";
import NotificationIcon from "./_ui/icons/NotificationIcon";
import GroupIcon from "./_ui/icons/GroupIcon";
import AdminIcon from "./_ui/icons/AdminIcon";
import ReportIcon from "./_ui/icons/ReportIcon";
import BlockIcon from "./_ui/icons/BlockIcon";
import io from "socket.io-client"
const socket = io(host);
import timeFormat from "../../../../utils/CommentTimeFormat";
const RightSidebarMessenger = () => {
  const [activeAccordion, setActiveAccordion] = React.useState(null);

  const isAccordionExpanded = (accordionId) => {
    return activeAccordion === accordionId;
  };
  const handleAccordionClicks = (accordionId) => {
    setActiveAccordion((prevAccordion) =>
      prevAccordion === accordionId ? null : accordionId
    );
  };

  const [activeAccordion1, setActiveAccordion1] = React.useState(null);
  const isAccordionExpanded1 = (accordionId1) => {
    return activeAccordion1 === accordionId1;
  };
  const handleAccordionClicks1 = (accordionId1) => {
    setActiveAccordion1((prevAccordion1) =>
      prevAccordion1 === accordionId1 ? null : accordionId1
    );
  };
  const [activeAccordion2, setActiveAccordion2] = React.useState(null);
  const isAccordionExpanded2 = (accordionId2) => {
    return activeAccordion2 === accordionId2;
  };
  const handleAccordionClicks2 = (accordionId2) => {
    setActiveAccordion2((prevAccordion2) =>
      prevAccordion2 === accordionId2 ? null : accordionId2
    );
  };
  const [activeAccordion3, setActiveAccordion3] = React.useState(null);
  const isAccordionExpanded3 = (accordionId3) => {
    return activeAccordion3 === accordionId3;
  };
  const handleAccordionClicks3 = (accordionId3) => {
    setActiveAccordion3((prevAccordion3) =>
      prevAccordion3 === accordionId3 ? null : accordionId3
    );
  };


  const params = useParams()

  const [userInfo, setUserInfo] = useState("");

  console.log("userinfo", userInfo)

  useEffect(() => {
    if (params.userId) {
      axiosInstance.get(`/api/get-user-info/${params.userId}`).then((res) => {
        if (res.data.status == 200) {
          setUserInfo(res.data.userInfo[0])
        }
      });
    }

  }, [])

  const [messageReceiverId, setMessageReceiverId] = useState("");
  const [messageSenderId, setMessageSenderId] = useState("");
  const [allPrivateOneToOneMessages, setAllPrivateOneToOneMessages] = useState([]);


  useEffect(() => {
    setMessageReceiverId(params.userId)
  }, [params])

  const [authUserId, setAuthUserId] = useState("");
  // console.log("boom",authUserId)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localUserInfo = localStorage.getItem("userInfo");

      if (localUserInfo) {
        setAuthUserId(JSON.parse(localUserInfo)[0]._id);
      }
    }
  }, [])

  socket.emit("addUser", authUserId)


  const [connectedUsers, setConnectedUsers] = useState([]);
  // console.log("trigg", connectedUsers)

  useEffect(() => {
    // Establish socket connection
    const socket = io(host);

    // Event handler for "getUsers"
    const handleGetUsers = users => {
      // Extract userId values from the users array
      // const userIds = users.map(user => user.userId);

      // Check if the new state is different before updating
      // if (JSON.stringify(userIds) !== JSON.stringify(connectedUsers)) {
      if (connectedUsers.length !== users.length) {
        setConnectedUsers(users);
      }
      // }
    };

    socket.on("getUsers", handleGetUsers);

    return () => {
      socket.off("getUsers", handleGetUsers);
      socket.disconnect();
    };

  }, [connectedUsers]);



  const data = {
    sender_id: messageSenderId,
    receiver_id: messageReceiverId
  }
  async function getAllPrivateOneToOneMessages() {
    if (messageReceiverId) {
      axiosInstance.get(`/api/get-private-message-one-to-one/${messageSenderId}/${messageReceiverId}`, data).then((res) => {
        if (res.data.status == 200) {
          setAllPrivateOneToOneMessages(res.data.messages)
        }
      });
    }
  }


  useEffect(() => {
    if (typeof window !== "undefined") {
      const localUserInfo = localStorage.getItem("userInfo");

      if (localUserInfo) {
        setMessageSenderId(JSON.parse(localUserInfo)[0]._id);
      }
    }
  }, []);

  useEffect(() => {
    setMessageReceiverId(params.userId)
  }, [params])

  useEffect(() => {
    getAllPrivateOneToOneMessages(messageReceiverId);
  }, [messageReceiverId])

  return (

    <div className='tas_right_side_full_div'>
      <div className='right-side-div'>
        <div className='tas_mssengridimg_div'>
          {/* <img className='mssengridimg' src={mssengrIdimg.src} alt='' /> */}
          <img className='mssengridimg' src={`${host}/uploads/${userInfo.profile_pic}`} alt='' />
          {/* <img className='tas_mssengridimg' src={`${host}/uploads/1706331352375-download.jpg`} alt='' /> */}

        </div>
        <div className='tas_user_name_container'>
          <span className='tas_user_name'>{userInfo.first_name} {userInfo.last_name}</span>
          <span className='mssengrid-tagp'>
            {/* Last seen 11:03 am */}
            {connectedUsers.some(user => user.userId === messageReceiverId) ? "Online" : timeFormat(userInfo.last_login)}

          </span>
        </div>

        <div className='mssengrid-spm-icons-div'>
          <div className='right-icon-div'>
            <span onClick={() => {
              toast.warn("We are working on it", {
                position: "top-center",
                style: {
                  background: "white",
                  color: "black",
                },
              });
            }} className='tas_right_icon_span'>
              <SearchIcon2 />
            </span>
            <p className="tas_mssengrid_icon_text">Search</p>
          </div>
          <div className='right-icon-div'>
            <Link href={`/${userInfo.username}/timeline`}>
              <span className='tas_right_icon_span'>
                <ProfileIcon2 />
              </span>

              <p className="tas_mssengrid_icon_text">Profile</p>
            </Link>
          </div>
          <div className='right-icon-div'>
            <span onClick={() => {
              toast.warn("We are working on it", {
                position: "top-center",
                style: {
                  background: "white",
                  color: "black",
                },
              });
            }} className='tas_right_icon_span'>
              <NotificationIcon />
            </span>

            <p className="tas_mssengrid_icon_text">Mute</p>
          </div>
        </div>

        <div className='full-accordion-div tas_full_accordion_div'>

          {/* Chat Information */}
          {/* <div className='accordion' id='accordionExample'>
              <div className='accordion-item' style={{ border: "none" }}>
                <div className='accor-tag-div '>
                  <div
                    className={`accordion-button w-100 ${isAccordionExpanded(`collapse`) ? "" : "collapsed"
                      }`}
                    type='button'
                    data-bs-target={`#collapse`}
                    aria-expanded={isAccordionExpanded(`collapse`)}
                    aria-controls={`collapse`}
                    onClick={() => handleAccordionClicks(`collapse`)}>
                    <div className='ccsc'>
                      <span className='tas_right_dropdown_title'>Chat Information</span>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='14'
                          height='9'
                          viewBox='0 0 14 9'
                          fill='none'
                          className={`accordion-chevron-svg ${isAccordionExpanded(`collapse`) ? "expanded" : ""
                            }`}>
                          <path
                            d='M7 5.44484L12.4447 -6.79848e-08L14 1.55536L7 8.55556L-6.79867e-08 1.55535L1.55531 -5.43975e-07L7 5.44484Z'
                            fill='#001835'
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  id={`collapse`}
                  className={`accordion-collapse collapse ${isAccordionExpanded(`collapse`) ? "show" : ""
                    }`}
                  data-bs-parent='#accordionExample'>
                  <div className='tas_chat_info'>
                    <GroupIcon />
                    <p className="tas_chat_info_text">302 Members</p>
                  </div>
                  <div className='tas_chat_info'>
                    <AdminIcon />
                    <p className="tas_chat_info_text">7 Admins</p>
                  </div>
                </div>
              </div>
            </div> */}

          {/* Customized Chat */}
          {/* <div className='accordion' id='accordionExample'>
              <div className='accordion-item' style={{ border: "none" }}>
                <div className='accor-tag-div'>
                  <div
                    className={`accordion-button w-100 ${isAccordionExpanded1(`collapse`) ? "" : "collapsed"
                      }`}
                    type='button'
                    data-bs-target={`#collapse`}
                    aria-expanded={isAccordionExpanded1(`collapse`)}
                    aria-controls={`collapse`}
                    onClick={() => handleAccordionClicks1(`collapse`)}>
                    <div className='ccsc'>
                      <span className='tas_right_dropdown_title'>Customized Chat</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='14'
                        height='9'
                        viewBox='0 0 14 9'
                        fill='none'
                        className={`accordion-chevron-svg ${isAccordionExpanded1(`collapse`) ? "expanded" : ""
                          }`}>
                        <path
                          d='M7 5.44484L12.4447 -6.79848e-08L14 1.55536L7 8.55556L-6.79867e-08 1.55535L1.55531 -5.43975e-07L7 5.44484Z'
                          fill='#001835'
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  id={`collapse`}
                  className={`accordion-collapse collapse ${isAccordionExpanded1(`collapse`) ? "show" : ""
                    }`}
                  data-bs-parent='#accordionExample'>
                  <div className='accordion-body'>
                    <div>
                      <div className='checkoutwarp-text'>
                        <Checkbox {...label} />
                        <label
                          className='form-check-label'
                          for='flexCheckDefault'>
                          Any Price
                        </label>
                      </div>
                      <div className='checkoutwarp-text'>
                        <Checkbox {...label} />
                        <label
                          className='form-check-label'
                          for='flexCheckDefault'>
                          Under Taka 250
                        </label>
                      </div>
                      <div className='checkoutwarp-text'>
                        <Checkbox {...label} />
                        <label
                          className='form-check-label'
                          for='flexCheckDefault'>
                          Taka 700 to 1000
                        </label>
                      </div>
                      <div className='checkoutwarp-text'>
                        <Checkbox {...label} />
                        <label
                          className='form-check-label'
                          for='flexCheckDefault'>
                          Taka 7000 to 10000
                        </label>
                      </div>
                      <div className='checkoutwarp-text'>
                        <Checkbox {...label} />
                        <label
                          className='form-check-label'
                          for='flexCheckDefault'>
                          Custom
                        </label>
                      </div>
                      <div className='low-high-div'>
                        <p className='lh-p'>Low</p>
                        <p>to</p>
                        <p className='lh-p'>High</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

          <div className='accordion' id='accordionExample'>
            <div className='accordion-item' style={{ border: "none" }}>
              <div className='accor-tag-div'>
                {/* <h6 className='accordion-header'> */}
                <div
                  className={`accordion-button w-100 ${isAccordionExpanded2(`collapse`) ? "" : "collapsed"
                    }`}
                  type='button'
                  data-bs-target={`#collapse`}
                  aria-expanded={isAccordionExpanded2(`collapse`)}
                  aria-controls={`collapse`}
                  onClick={() => handleAccordionClicks2(`collapse`)}>
                  <div className='ccsc'>
                    <span className='tas_right_dropdown_title'> Media</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='14'
                      height='9'
                      viewBox='0 0 14 9'
                      fill='none'
                      className={`accordion-chevron-svg ${isAccordionExpanded2(`collapse`) ? "expanded" : ""
                        }`}>
                      <path
                        d='M7 5.44484L12.4447 -6.79848e-08L14 1.55536L7 8.55556L-6.79867e-08 1.55535L1.55531 -5.43975e-07L7 5.44484Z'
                        fill='#001835'
                      />
                    </svg>
                  </div>
                </div>
                {/* </h6> */}
              </div>

              <div
                id={`collapse`}
                className={`accordion-collapse collapse ${isAccordionExpanded2(`collapse`) ? "show" : ""
                  }`}
                data-bs-parent='#accordionExample'>
                <div className='accordion-body'>
                  <div className="tas_media_container">
                    {allPrivateOneToOneMessages.slice().reverse().map(item => {
                      if (!item.message_delete_status) {
                        if (item?.file?.endsWith("jpg") || item?.file?.endsWith("png")) {
                          return <img className='tas_media_img' src={`${host}/uploads/${item.file}`} alt='' />;
                        } else if (item?.file?.endsWith("mp4")) {
                          return (
                            <video controls className="tas_media_video">
                              <source src={`${host}/uploads/${item.file}`} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          );
                        } else {
                          return
                        }
                      }
                    })}

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='accordion' id='accordionExample'>
            <div className='accordion-item' style={{ border: "none" }}>
              <div className='accor-tag-div'>
                {/* <h6 className='accordion-header'> */}
                <div
                  className={`accordion-button w-100 ${isAccordionExpanded3(`collapse`) ? "" : "collapsed"
                    }`}
                  type='button'
                  data-bs-target={`#collapse`}
                  aria-expanded={isAccordionExpanded3(`collapse`)}
                  aria-controls={`collapse`}
                  onClick={() => handleAccordionClicks3(`collapse`)}>
                  <div className='ccsc'>
                    <span className='tas_right_dropdown_title'> Chat Settings</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='14'
                      height='9'
                      viewBox='0 0 14 9'
                      fill='none'
                      className={`accordion-chevron-svg ${isAccordionExpanded3(`collapse`) ? "expanded" : ""
                        }`}>
                      <path
                        d='M7 5.44484L12.4447 -6.79848e-08L14 1.55536L7 8.55556L-6.79867e-08 1.55535L1.55531 -5.43975e-07L7 5.44484Z'
                        fill='#001835'
                      />
                    </svg>
                  </div>
                </div>
                {/* </h6> */}
              </div>

              <div
                id={`collapse`}
                className={`accordion-collapse collapse ${isAccordionExpanded3(`collapse`) ? "show" : ""
                  }`}
                data-bs-parent='#accordionExample'>
                <div className='accordion-body'>
                  <span onClick={() => {
                    toast.warn("We are working on it", {
                      position: "top-center",
                      style: {
                        background: "white",
                        color: "black",
                      },
                    });
                  }} className='tas_chat_setting'>
                    <BlockIcon />
                    <p className="tas_chat_setting_text">Block</p>
                  </span>
                  <span onClick={() => {
                    toast.warn("We are working on it", {
                      position: "top-center",
                      style: {
                        background: "white",
                        color: "black",
                      },
                    });
                  }} className='tas_chat_setting'>
                    <ReportIcon />
                    <p className="tas_chat_setting_text">Report</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebarMessenger;
