"use client"
import React, { useState, useEffect } from 'react'
import avatarone from "../../../../public/img/avatar35-sm.jpg";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import { host } from '@/environment';
import { toast } from "react-toastify";
import "./LeftSidebarMessenger.css";
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import moment from "moment";

import { fetchAllUsers, handleSearchFiltering } from '@/redux/messenger/SearchPeople/SearchPeopleSlice';
import axiosInstance from '../../../../utils/axios';
import ThreedotIcon from './_ui/icons/ThreedotIcon';
import SearchIcon from './_ui/icons/SearchIcon';
import PersonIcon from './_ui/icons/PersonIcon';
import MessageIcon from './_ui/icons/MessageIcon';
import MessageIcon2 from './_ui/icons/MessageIcon2';
import MessageReqIcon from './_ui/icons/MessageReqIcon';
import ThreedotBigIcon from './_ui/icons/ThreedotBigIcon';
import NotificationIconSmall from './_ui/icons/NotificationIconSmall';
import BlockIcon2 from './_ui/icons/BlockIcon2';
import MessageIconBig from './_ui/icons/MessageIconBig';


export function formatLastChatTime(timestamp) {
  const now = moment();
  const postTime = moment(timestamp);
  const diffMinutes = now.diff(postTime, "minutes");

  if (diffMinutes < 1) {
    return "Just now";
  } else if (diffMinutes < 60) {
    return moment().startOf('hour').fromNow();
  } else if (now.isSame(postTime, "day")) {
    return moment().startOf('day').fromNow();
  } else {
    return `${moment(postTime, "YYYYMMDD").fromNow()}`;
  }
}

const LeftSidebarMessenger = () => {
  const params = useParams();

  const allPrivateOneToOneMessage = useSelector((state) => state.fetchAllPrivateOneToOneMessage.allPrivateOneToOneMessage);
  const allGroupMessage = useSelector((state) => state.fetchAllPrivateOneToOneMessage.allGroupMessage);

  const [allChat, setAllChat] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const allChat = await axiosInstance.get(`/api/including-me-chat-users`)

      setAllChat(allChat.data.data);
      setFilteredUsers(allChat.data.data)
    })()
  }, [allPrivateOneToOneMessage, allGroupMessage])


  // search message people functionality
  const handleSearchMessagePeople = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();

    if (searchTerm === null || searchTerm === "") {
      // If the search term is null or empty, render the entire list
      setFilteredUsers(allChat);
    } else {
      const newFilteredUsers = allChat.filter((user) => {
        if (user.type === "group") {
          const groupName = user?.lastMessage?.group_id?.group_name.trim().toLowerCase();
          return groupName.includes(searchTerm)
        } else {
          const firstName = user?.user?.first_name.trim().toLowerCase();
          const lastName = user?.user?.last_name.trim().toLowerCase();
          const fullName = `${firstName} ${lastName}`;
          return fullName.includes(searchTerm);
        }
      });
      console.log("🚀 ~ newFilteredUsers ~ newFilteredUsers:", newFilteredUsers)

      setFilteredUsers(newFilteredUsers);
    }
  };

  return (

    <div className='messenger-left-layout-full-div'>
      <div className='tas_messenger_left_layout_header'>
        <p className='tas_messenger_left_layout_header_title'>Messages</p>
        {/* <span className='tas_big_message_icon_container'>
          <MessageIconBig />
        </span> */}
        {/* <span>
          <div className='book-more-div'>
            <div className='more'>
              <div>
                <ThreedotBigIcon />
                <ul className='more-dropdown'>
                  <li>
                    <a href='#' type='button'>
                      <span className='bookmark-drop-svgs'>
                        <PersonIcon />
                      </span>
                      Active Contacts
                    </a>
                  </li>

                  <li>
                    <Link href={`/messenger`}>
                      <span className='bookmark-drop-svgs'>
                        <MessageIcon />
                      </span>
                      New Messages
                    </Link>
                  </li>
                  <li>
                    <a href='#'>
                      <span className='bookmark-drop-svgs'>
                        <MessageIcon2 />
                      </span>
                      New Group Chat
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <span className='bookmark-drop-svgs'>
                        <MessageIcon2 />
                      </span>
                      Archived Chats
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <span className='bookmark-drop-svgs'>
                        <MessageReqIcon />
                      </span>
                      Message Request
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </span> */}
      </div>
      <div className='tas_left_messenger_input_div'>
        <SearchIcon />
        <input
          className='tas_left_messenger_input'
          type='search'
          placeholder='Search'
          onChange={handleSearchMessagePeople}
        />
      </div>



      <div className="card-body tas_messages_container" >
        <div className="last_messages-wrapper tas_messages_wrapper">

          {
            filteredUsers?.map((item, i) => {
              let selected = false;
              if (params?.groupId) {
                selected = item?.lastMessage?.group_id?._id === params?.groupId
              } else if (params?.userId) {
                selected = item?.user?._id === params?.userId
              }
              return (
                <>
                  <div class={selected ? "last-message-single-item justify-content-between d-flex tas_message_single_item_selected" : "last-message-single-item d-flex justify-content-between tas_message_single_item"} >

                    <Link href={item?.type == "group" ? `/messenger/group/${item?.lastMessage?.group_id?._id}` : `/messenger/${item?.user?._id}`}>
                      <div className="d-flex tas_message_single_item_img_name_container">
                        <div className="">
                          <img src={item?.type == "group" ? `${host}/uploads/messenger/${item?.lastMessage?.group_id?.group_image}` : `${host}/uploads/${item?.user?.profile_pic}`} style={{ width: "55px", height: "55px", objectFit: "cover", borderRadius: "50%" }} />
                          {/* <img src={`${host}/uploads/1706331352375-download.jpg`} className='tas_message_single_item_img' /> */}
                        </div>
                        <div className="mx-3">
                          <h5 className={selected ? 'tas_message_single_item_name_selected' : 'tas_message_single_item_name'}>{item?.type == "group" ? item?.lastMessage?.group_id?.group_name : `${item?.user?.first_name} ${item?.user?.last_name}`}</h5>
                          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <span className={selected ? "tas_message_single_item_last_message_selected" : "tas_message_single_item_last_message"}>
                              {item.lastMessage?.message.substring(0, 10).concat(item.lastMessage.message.length > 10 ? '...' : '')}
                            </span>
                            <span className={selected ? "tas_message_single_item_last_message_time_selected" : "tas_message_single_item_last_message_time"}>
                              {formatLastChatTime(item?.lastMessage?.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="justify-self-end mx-2">
                      <span>
                        <div className='book-more-div'>
                          <div className='more'>
                            <div>
                              <ThreedotIcon color={selected ? "#fff" : "#002046"} />
                              <ul className='more-dropdown'>
                                <li>
                                  <a href={`/${item.user?.username}/timeline`} type='button'>
                                    <span className='bookmark-drop-svgs'>
                                      <PersonIcon />
                                    </span>
                                    View Profile
                                  </a>
                                </li>
                                <li>
                                  <span onClick={() => {
                                    toast.warn("We are working on it", {
                                      position: "top-center",
                                      style: {
                                        background: "white",
                                        color: "black",
                                      },
                                    });
                                  }}>
                                    <span className='bookmark-drop-svgs'>
                                      <NotificationIconSmall />
                                    </span>
                                    Mute Notification
                                  </span>
                                </li>
                                <li>
                                  <span onClick={() => {
                                    toast.warn("We are working on it", {
                                      position: "top-center",
                                      style: {
                                        background: "white",
                                        color: "black",
                                      },
                                    });
                                  }}>
                                    <span onClick={() => {
                                      toast.warn("We are working on it", {
                                        position: "top-center",
                                        style: {
                                          background: "white",
                                          color: "black",
                                        },
                                      });
                                    }} className='bookmark-drop-svgs'>
                                      <BlockIcon2 />
                                    </span>
                                    Block
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </>

              )
            })
          }

        </div>

      </div>
    </div>
  );
}

export default LeftSidebarMessenger