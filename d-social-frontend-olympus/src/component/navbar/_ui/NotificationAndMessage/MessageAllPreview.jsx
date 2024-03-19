"use client";

import React, { useEffect, useState } from "react";
import { host } from "@/environment";
import { toast } from "react-toastify";
import useToaster from "@/hooks/useToaster";
import axiosInstance from "../../../../../utils/axios";
import timeFormat from "../../../../../utils/CommentTimeFormat";
import PersonIcon from "@/component/AllMessengers/MessengerMasterLayout/_ui/icons/PersonIcon";
import NotificationIconSmall from "@/component/AllMessengers/MessengerMasterLayout/_ui/icons/NotificationIconSmall";
import BlockIcon2 from "@/component/AllMessengers/MessengerMasterLayout/_ui/icons/BlockIcon2";
import MessageItemSkeleton from "../MessageItemSkeleton";
import MessengerPopupFixedMessage from "@/component/AllMessengers/MessengerPopupFixedMessage";
import GroupMessengerPopupFixedMessage from "@/component/AllMessengers/GroupMessengerPopupFixedMessage";

export default function MessageAllPreview({ setShowMessageDropDown }) {
   const [filteredUsers, setFilteredUsers] = useState([]);
   console.log("🚀 ~ MessageAllPreview ~ filteredUsers:", filteredUsers)
   const [allUsersLastMessage, setAllUsersLastMessage] = useState([]);
   const [messageReceiverId, setMessageReceiverId] = useState("");
   const [secondMessageSkeleton, setSecondMessageSkeleton] = useState(false);
   const [groupItem, setGroupItem] = useState(null)

   const { showNotification } = useToaster();

   function lastMessageFunc() {
      try {
         setSecondMessageSkeleton(true);
         axiosInstance
            .get(`/api/including-me-chat-users`)
            .then((res) => {
               if (res.data.status == 200) {
                  setAllUsersLastMessage(res.data.data);
                  setFilteredUsers(res.data.data);
               }
            })
            .catch((error) => {
               console.log(error);
            })
            .finally(() => {
               setSecondMessageSkeleton(false);
            });
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      lastMessageFunc();
   }, []);

   console.log("secondMessageSkeleton", secondMessageSkeleton);

   return (
      <div
         style={{
            position: "fixed",
            top: "60px",
            right: 0,
            backgroundColor: "white",
            height: "80vh",
            width: "320px",
            padding: "10px",
            borderRadius: "4px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            overflow: "auto",
         }}
      >
         <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <h4>Messages</h4>
            <svg
               style={{
                  cursor: "pointer",
               }}
               onClick={() => setShowMessageDropDown(false)}
               xmlns="http://www.w3.org/2000/svg"
               width="20"
               height="20"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
               class="lucide lucide-x"
            >
               <path d="M18 6 6 18" />
               <path d="m6 6 12 12" />
            </svg>
         </div>
         {secondMessageSkeleton ? (
            <div>
               {[...Array(10)].map((_, index) => (
                  <MessageItemSkeleton key={index} />
               ))}
            </div>
         ) : (
            filteredUsers?.map((item, i) => {
               return (
                  <>
                     {/*  */}
                     <div class="last-message-single-item d-flex justify-content-between pb-3">
                        <div className="d-flex" onClick={() => {
                           if (item.type === "single") {
                              setMessageReceiverId(item.user?._id)
                           } else {
                              setMessageReceiverId(null)
                              // setGroupItem({
                              //    _id: item?.lastMessage?.group_id?._id,
                              //    group_image: item?.lastMessage?.group_id?.group_image,
                              //    group_name: item?.lastMessage?.group_id?.group_name
                              // })
                              showNotification("Working on group chat", "warning");
                           }
                        }}>
                           <div style={{ cursor: "pointer" }} className="">
                              <img
                                 src={`${host}/uploads/${item.user?.profile_pic}`}
                                 style={{
                                    width: "55px",
                                    height: "55px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                 }}
                              />
                           </div>
                           <div className="mx-3 ">
                              {item?.type === "single" ? (
                                 <h5 style={{ cursor: "pointer" }}>
                                    {" "}
                                    {item.user?.first_name} {item.user?.last_name}
                                 </h5>
                              ) : (
                                 <h5 style={{ cursor: "pointer" }}> {item?.lastMessage?.group_id?.group_name || "Unnamed Group"}</h5>
                              )}
                              <div className="">
                                 <span>
                                    {item.lastMessage?.message
                                       .split(" ")
                                       .slice(0, 20)
                                       .join(" ")
                                       .concat(item.lastMessage.message.length > 20 ? "..." : "")}
                                 </span>
                                 <span className="fw-bold mx-3">{timeFormat(item.lastMessage.createdAt)}</span>
                              </div>
                           </div>
                        </div>
                        <div className="justify-self-end mx-2 ">
                           <div className="book-more-div">
                              <div className="more">
                                 <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-three-dots" viewBox="0 0 16 16">
                                       <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                    </svg>
                                    <ul className="more-dropdown">
                                       <li>
                                          <a href={`/${item.user?.username}/timeline`} type="button">
                                             <span className="bookmark-drop-svgs">
                                                <PersonIcon />
                                             </span>
                                             View Profile
                                          </a>
                                       </li>
                                       <li>
                                          <span
                                             onClick={() => {
                                                toast.warn("We are working on it", {
                                                   position: "top-center",
                                                   style: {
                                                      background: "white",
                                                      color: "black",
                                                   },
                                                });
                                             }}
                                          >
                                             <span className="bookmark-drop-svgs">
                                                <NotificationIconSmall />
                                             </span>
                                             Mute Notification
                                          </span>
                                       </li>
                                       <li>
                                          <span
                                             onClick={() => {
                                                toast.warn("We are working on it", {
                                                   position: "top-center",
                                                   style: {
                                                      background: "white",
                                                      color: "black",
                                                   },
                                                });
                                             }}
                                          >
                                             <span
                                                onClick={() => {
                                                   toast.warn("We are working on it", {
                                                      position: "top-center",
                                                      style: {
                                                         background: "white",
                                                         color: "black",
                                                      },
                                                   });
                                                }}
                                                className="bookmark-drop-svgs"
                                             >
                                                <BlockIcon2 />
                                             </span>
                                             Block
                                          </span>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </>
               );
            })
         )}

         <hr className="" />

         <div className="text-center ">
            <h5 style={{ color: "0B3243" }}>
               <a href={"/messenger"}> Search Messenger </a>
            </h5>
         </div>

         <MessengerPopupFixedMessage messageReceiverId={messageReceiverId} setMessageReceiverId={setMessageReceiverId} />
         {/* <GroupMessengerPopupFixedMessage
            groupItem={groupItem}
            getGroupChatList={lastMessageFunc}
            setGroupItem={setGroupItem}
         /> */}
      </div>
   );
}
