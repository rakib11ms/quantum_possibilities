"use client";
import React, { useState, useEffect } from "react";
import Sponserdone from "../../../public/sponserdone.png";
import Sponserdtwo from "../../../public/sponserdtwo.png";
import Link from "next/link";
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
import Image from "next/image";

const RightSidebarCusomizable = ({
  mainItemsRight,
  setSortableListRight,
  setMainItemsRight,
}) => {
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [birthDayFriendList, setBirthDayFriendList] = useState([]);
  const [friendlist, setFriendList] = useState([]);
  const [username, setUsername] = useState([]);

  // const [birthDayFriendList, setBirthDayFriendList] = useState([]);
  // const [friendRequestList, setFriendRequestList] = useState([]);
  // const [isOpenModal, setIsOpenModal] = React.useState({
  //   friendsBirthday: false,
  // });

  // const [friendlist, setFriendList] = useState([]);
  //  const handleFriendsBirthdayModal = () => {
  //    setIsOpenModal({ friendsBirthday: true });
  //  };

  useEffect(() => {
    const localStorageUserName = localStorage.getItem("username");
    setUsername(localStorageUserName);

    getFriendRequests();
    getBirthDayFriendList();
    getFriendList(localStorageUserName);
  }, []);
  const getFriendRequests = () => {
    axiosInstance.post("/api/friend-request-list").then((res) => {
      if (res.data.status == 200) {
        setFriendRequestList(res.data.results);
      }
    });
  };

  const getBirthDayFriendList = () => {
    axiosInstance.get("/api/get-todays-birthday-friends").then((res) => {
      if (res.data.status == 200) {
        setBirthDayFriendList(res.data.results);
      }
    });
  };

  const getFriendList = (localStorageUserName) => {
    const formData = {
      username: localStorageUserName,
    };
    axiosInstance.post("/api/friend-list", formData).then((res) => {
      if (res.data.status == 200) {
        setFriendList(res.data.results);
      }
    });
  };

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

  function formatDate(timestamp) {
    const now = moment();
    const postTime = moment(timestamp);
    const diffMinutes = now.diff(postTime, "minutes");

    if (diffMinutes < 1) {
      return "a few seconds ago";
    } else if (diffMinutes < 30) {
      return `${diffMinutes} min ago`;
    } else if (now.isSame(postTime, "day")) {
      return `Today at ${postTime.format("LT")}`;
    } else {
      return postTime.format("LL");
    }
  }

  const [messageReceiverId, setMessageReceiverId] = useState("");
  const [secondMessageReceiverId, setSecondMessageReceiverId] = useState("");
  const [firstMessageTriggered, setFirstMessageTriggered] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(mainItemsRight);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setMainItemsRight(newItems);
  };

  return (
    <div>
      <div>
        {/* <div className='customize-header-tag-div'>
          <h4 className='customize-header-tag'>Customize Menu</h4>
        </div> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {mainItemsRight.map((element, index) => (
                  <Draggable
                    key={element?.id}
                    draggableId={element?.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Grid
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 8fr 1fr",
                            alignItems: "center",
                            // border: '1px solid'
                          }}
                          className="px-3 py-3"
                          //  className='customizeMenu-svg-icons'
                        >
                          <span>
                            <svg
                              width="10"
                              height="16"
                              viewBox="0 0 10 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.8 2.6C2.24183 2.6 2.6 2.24183 2.6 1.8C2.6 1.35817 2.24183 1 1.8 1C1.35817 1 1 1.35817 1 1.8C1 2.24183 1.35817 2.6 1.8 2.6Z"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M8.1999 2.6C8.64173 2.6 8.9999 2.24183 8.9999 1.8C8.9999 1.35817 8.64173 1 8.1999 1C7.75807 1 7.3999 1.35817 7.3999 1.8C7.3999 2.24183 7.75807 2.6 8.1999 2.6Z"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M1.8 9.00039C2.24183 9.00039 2.6 8.64222 2.6 8.20039C2.6 7.75856 2.24183 7.40039 1.8 7.40039C1.35817 7.40039 1 7.75856 1 8.20039C1 8.64222 1.35817 9.00039 1.8 9.00039Z"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M8.1999 9.00039C8.64173 9.00039 8.9999 8.64222 8.9999 8.20039C8.9999 7.75856 8.64173 7.40039 8.1999 7.40039C7.75807 7.40039 7.3999 7.75856 7.3999 8.20039C7.3999 8.64222 7.75807 9.00039 8.1999 9.00039Z"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M1.8 15.3998C2.24183 15.3998 2.6 15.0416 2.6 14.5998C2.6 14.158 2.24183 13.7998 1.8 13.7998C1.35817 13.7998 1 14.158 1 14.5998C1 15.0416 1.35817 15.3998 1.8 15.3998Z"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M8.1999 15.3998C8.64173 15.3998 8.9999 15.0416 8.9999 14.5998C8.9999 14.158 8.64173 13.7998 8.1999 13.7998C7.75807 13.7998 7.3999 14.158 7.3999 14.5998C7.3999 15.0416 7.75807 15.3998 8.1999 15.3998Z"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                          {/* {element?.title} */}
                          <Image
                            src={element?.img_url}
                            height={120}
                            width={220}
                          />

                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setSortableListRight((prev) => {
                                const temp = prev.find(
                                  (i) => i.id === element?.id
                                );
                                if (temp) return prev;
                                mainItemsRight.splice(index, 1);
                                return [...prev, element];
                              });
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="8"
                                cy="8"
                                r="6"
                                stroke="#E20322"
                                stroke-width="1.5"
                              />
                              <path
                                d="M10 8L6 8"
                                stroke="#E20322"
                                stroke-width="1.5"
                                stroke-linecap="square"
                              />
                            </svg>
                          </span>
                        </Grid>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default RightSidebarCusomizable;
