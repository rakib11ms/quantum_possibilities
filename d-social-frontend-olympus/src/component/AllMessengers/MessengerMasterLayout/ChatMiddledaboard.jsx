'use client';

import './ChatMiddledaboard.css';
import React, { useState, useEffect, useRef } from 'react';
import ChatBodyAuthor from '../../../../public/img/avatar3-sm.jpg';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { host } from '@/environment';
import { useParams } from 'next/navigation';
import axiosInstance from '../../../../utils/axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';

import UploadIcon from './_ui/icons/UploadIcon';
import PictureIcon from './_ui/icons/PictureIcon';
import AudioIcon from './_ui/icons/AudioIcon';
import SentIcon from './_ui/icons/SentIcon';
import EmojiIcon from './_ui/icons/EmojiIcon';
import VideoIcon from './_ui/icons/VideoIcon';
import CallIcon from './_ui/icons/CallIcon';
import ThreedotIcon2 from './_ui/icons/ThreedotIcon2';
import messenger_gif from '../../../../public/messenger_gif.png';
import { formatDate } from '@/component/NewsFeed/Post/utils';
import ChatIconsContainer from './_ui/ChatIconsContainer';
import { socket } from '@/app/layout';

import timeFormat from '../../../../utils/CommentTimeFormat';
import { handleFetchOneToOneMessage } from '@/redux/messenger/LeftSideBarRefetch/LeftSideBarRefetchSlice';
import VideoChatModalPopup from './VideoChatModalPopup';
import Peer from 'simple-peer';
import VideoCalling from './VideoCalling';
// import { Modal } from '@mui/material';
import Modal from 'react-modal';
import { customStyles } from '../../../../utils/customeStyle';

const ChatMiddledaboard = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const [connectedUsers, setConnectedUsers] = useState([]);

   // console.log("connected",connectedUsers)
   const [authUserId, setAuthUserId] = useState('');
   const [messageReceiverId, setMessageReceiverId] = useState('');
   const [customFile, setCustomFile] = useState('');
   const [userInfo, setUserInfo] = useState('');
   const [message, setMessage] = useState('');
   const [allPrivateOneToOneMessages, setAllPrivateOneToOneMessages] = useState([]);
   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   const [chosenEmoji, setChosenEmoji] = useState(null);
   const chatContainerRef = useRef(null);

   const scrollToBottom = () => {
      if (chatContainerRef.current) {
         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
   };

   const messageDataPrivateOneToOne = {
      message: message,
      sender_id: authUserId,
      receiver_id: messageReceiverId !== null && messageReceiverId,
   };

   const data = {
      sender_id: authUserId,
      receiver_id: messageReceiverId,
   };

   useEffect(() => {
      setMessageReceiverId(params.userId);
   }, [params]);

   useEffect(() => {
      const handleGetUsers = (users) => {
         if (connectedUsers.length !== users.length) {
            setConnectedUsers(users);
         }
      };

      socket.on('getUsers', handleGetUsers);

      return () => {
         socket.off('getUsers', handleGetUsers);
         // socket.disconnect();
      };
   }, [connectedUsers]);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const localUserInfo = localStorage.getItem('userInfo');

         if (localUserInfo) {
            setAuthUserId(JSON.parse(localUserInfo)[0]._id);
         }
      }
   }, []);

   useEffect(() => {
      if (params.userId) {
         axiosInstance.get(`/api/get-user-info/${params.userId}`).then((res) => {
            if (res.data.status == 200) {
               setUserInfo(res.data.userInfo[0]);
            }
         });
      }
   }, []);

   useEffect(() => {
      scrollToBottom();
   }, [allPrivateOneToOneMessages]);

   socket.on('message', (message) => {
      console.log('socket message chatMiddledboard', message);
      if (messageReceiverId == message?.data?.sender_id?._id) {
         const updatedMessages = [message.data, ...allPrivateOneToOneMessages];
         setAllPrivateOneToOneMessages(updatedMessages);
         dispatch(handleFetchOneToOneMessage(updatedMessages));
      } else if (authUserId == message?.data?.sender_id?._id) {
         const updatedMessages = [message.data, ...allPrivateOneToOneMessages];
         setAllPrivateOneToOneMessages(updatedMessages);
         dispatch(handleFetchOneToOneMessage(updatedMessages));
      }
   });

   useEffect(() => {
      getAllPrivateOneToOneMessages(messageReceiverId);
   }, [messageReceiverId]);

   const handleCustomFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
         setCustomFile(selectedFile);
         const fileType = selectedFile.type;
      }
   };

   const handleMessageInputChange = (e) => {
      setMessage(e.target.value);
   };

   async function getAllPrivateOneToOneMessages() {
      if (messageReceiverId) {
         axiosInstance
            .get(`/api/get-private-message-one-to-one/${authUserId}/${messageReceiverId}`, data)
            .then((res) => {
               if (res.data.status == 200) {
                  setAllPrivateOneToOneMessages(res.data.messages);
               }
            });
      }
   }

   socket.on('getDeleteMessage', (data) => {
      // console.log("test1",data)
      setAllPrivateOneToOneMessages((state) => {
         return state.map((item) => {
            if (item._id === data.messageId) {
               return {
                  ...item,
                  message_delete_status: 1,
               };
            }
            return item;
         });
      });

      if (data.messageId) {
         axiosInstance
            .patch(`/api/delete-private-message-one-to-one/${data.messageId}`)
            .then((res) => {
               if (res.data.status == 200) {
               }
            });
      }
   });

   async function deleteOneToOneMessages(messageId) {
      const data1 = {
         ...messageDataPrivateOneToOne,
         messageId: messageId,
      };
      // console.log("ttt", data1)
      socket.emit('deleteMessage', data1);
   }

   const handleMessageSubmit = (e) => {
      e.preventDefault();
      setMessage('');
      setShowEmojiPicker(false);

      socket.emit('messageNotification', messageDataPrivateOneToOne);
      if (message == '' && customFile == '') {
         alert("Empty message won't be accepted");
      }
      if (customFile) {
         const fileData = customFile;

         const reader = new FileReader();

         reader.onload = async () => {
            console.log('Reader onload triggered');

            const base64Data = reader.result.split(',')[1];

            const extendedMessageData = {
               ...messageDataPrivateOneToOne,
               file: { base64Data, fileName: fileData.name },
            };
            socket.emit('user_message', extendedMessageData);
            console.log('base64Data:', extendedMessageData);
         };

         reader.readAsDataURL(fileData);

         setCustomFile('');
      } else {
         socket.emit('user_message', messageDataPrivateOneToOne);
      }
   };

   const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         handleMessageSubmit(e);
      }
   };

   const toggleEmojiPicker = () => {
      setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
   };

   const [videoModalOpen, setVideoModalOpen] = useState(false);
   const [remoteSocketId, setRemoteSocketId] = useState('');

   return (
      <div className="chat_main_wrapper">
         <div className="chat_main_top_wrapper">
            <div className="tas_chat_head_full_div">
               {params.userId ? (
                  <div className="tas_chat_top_bar">
                     <div className="tas_chat_top_profile_details">
                        <img
                           className="incoming-img tas_chat_top_profile"
                           src={`${host}/uploads/${userInfo.profile_pic}`}
                        />
                        <div className="tas_chat_top_profile_name_container">
                           <p className="tas_user_name">
                              {userInfo.first_name} {userInfo.last_name}
                           </p>
                           <p className="mssengrid-tagp">
                              {/* Last seen 11:03 am */}
                              {connectedUsers.some((user) => user.userId === messageReceiverId)
                                 ? 'Online'
                                 : timeFormat(userInfo.last_login)}
                           </p>
                        </div>
                     </div>
                     <div className="tas_chat_top_profile_video_container">
                        <span
                           // href={`/test`}
                           className="tas_chat_top_profile_video_span"
                           onClick={() => {
                              setVideoModalOpen(!videoModalOpen);

                              // socket.emit('room:join', {
                              //    email: 'anik.ba@pakizatvl.com',
                              //    // room: params.userId + authUserId,
                              //    room:"123456"
                              // });

                              // socket.on('user:joined', (data) => {
                              //    console.log('joined data', data);
                              //    setRemoteSocketId(data);
                              // });
                           }}
                        >
                           <VideoIcon />
                        </span>
                        <span
                           className="tas_chat_top_profile_video_span"
                           onClick={() => {
                              toast.warn('We are working on it', {
                                 position: 'top-center',
                                 style: {
                                    background: 'white',
                                    color: 'black',
                                 },
                              });
                           }}
                        >
                           <CallIcon />
                        </span>
                        <span
                           onClick={() => {
                              toast.warn('We are working on it', {
                                 position: 'top-center',
                                 style: {
                                    background: 'white',
                                    color: 'black',
                                 },
                              });
                           }}
                        >
                           <ThreedotIcon2 />
                        </span>
                     </div>
                  </div>
               ) : (
                  <div className="chat-head-name-div">
                     <span>To: </span>
                     <p className="chat-head-name">
                        {userInfo.first_name} {userInfo.last_name}
                     </p>
                  </div>
               )}
            </div>
         </div>
         <div className="chat_main_middle_wrapper" ref={chatContainerRef}>
            <div ref={chatContainerRef}>
               {allPrivateOneToOneMessages
                  .slice()
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((item, i) => {
                     if (item?.sender_id._id === authUserId) {
                        return (
                           <div className="Outgoing-div" key={i}>
                              <div className="Outgoing-chat-text-div w-100">
                                 <div className="tas_message_outgoing_text_container">
                                    {item.message !== '' ? (
                                       <div className="tas_message_outgoing_text_icon_container ">
                                          <div className="icon">
                                             {item.message_delete_status ? null : (
                                                <ChatIconsContainer
                                                   deleteOneToOneMessages={() =>
                                                      deleteOneToOneMessages(item._id)
                                                   }
                                                />
                                             )}
                                          </div>

                                          {item.message_delete_status ? (
                                             <p className="tas_delete_message_outgoing_text">
                                                Message Deleted
                                             </p>
                                          ) : (
                                             <div className="tas_text_container">
                                                <p className="tas_message_outgoing_text">
                                                   {item?.message}
                                                </p>
                                             </div>
                                          )}
                                       </div>
                                    ) : null}

                                    {item?.file !== undefined ? (
                                       item?.file?.endsWith('jpg') ||
                                          item?.file?.endsWith('png') ? (
                                          item.message_delete_status ? (
                                             <p className="tas_delete_message_outgoing_text mt-1">
                                                Message Deleted
                                             </p>
                                          ) : (
                                             <div className=" mt-1">
                                                <div className="tas_message_outgoing_img_icon_container">
                                                   <div className="icon">
                                                      <ChatIconsContainer
                                                         deleteOneToOneMessages={() =>
                                                            deleteOneToOneMessages(item._id)
                                                         }
                                                      />
                                                   </div>
                                                   <img
                                                      className="tas_message_img"
                                                      src={`${host}/uploads/${item.file}`}
                                                      alt="Image"
                                                   />
                                                </div>
                                             </div>
                                          )
                                       ) : item?.file?.endsWith('mp4') ? (
                                          item.message_delete_status ? (
                                             <p className="tas_delete_message_outgoing_text mt-1">
                                                Message Deleted
                                             </p>
                                          ) : (
                                             <div className=" mt-1">
                                                <div className="tas_message_outgoing_img_icon_container">
                                                   <div className="icon">
                                                      <ChatIconsContainer
                                                         deleteOneToOneMessages={() =>
                                                            deleteOneToOneMessages(item._id)
                                                         }
                                                      />
                                                   </div>
                                                   <video
                                                      controls
                                                      width="100%"
                                                      height="100%"
                                                      className="tas_message_video"
                                                   >
                                                      <source
                                                         src={`${host}/uploads/${item.file}`}
                                                         type="video/mp4"
                                                      />
                                                      Your browser does not support the video tag.
                                                   </video>
                                                </div>
                                             </div>
                                          )
                                       ) : null
                                    ) : null}

                                    <p className="tas_message_outgoing_time_text">
                                       {formatDate(item?.createdAt)}
                                    </p>
                                 </div>
                              </div>
                              <div>
                                 <img
                                    className="incoming-img"
                                    src={`${host}/uploads/${item.sender_id.profile_pic}`}
                                    style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                                 />
                              </div>
                           </div>
                        );
                     } else if (item?.sender_id._id !== authUserId) {
                        return (
                           <div className="incomming-div " key={i}>
                              <div>
                                 <img
                                    className="incomming-img"
                                    src={`${host}/uploads/${item?.sender_id.profile_pic}`}
                                    style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                                 />
                              </div>
                              <div className="w-100">
                                 <div className="tas_message_incoming_text_container">
                                    {item.message !== '' ? (
                                       <div className="tas_message_incoming_text_icon_container">
                                          {item.message_delete_status ? (
                                             <p className="tas_delete_message_incoming_text">
                                                Message Deleted
                                             </p>
                                          ) : (
                                             <div className="tas_incoming_text_container">
                                                <p className="tas_message_incoming_text">
                                                   {item?.message}
                                                </p>
                                             </div>
                                          )}
                                          <div className="icon">
                                             <ChatIconsContainer incoming={true} />
                                          </div>
                                       </div>
                                    ) : null}

                                    <div className=" mt-1">
                                       {item?.file !== undefined ? (
                                          item?.file?.endsWith('jpg') ||
                                             item?.file?.endsWith('png') ? (
                                             item.message_delete_status ? (
                                                <p className="tas_delete_message_incoming_text mt-1">
                                                   Message Deleted
                                                </p>
                                             ) : (
                                                <div className=" mt-1">
                                                   <div className="tas_message_incoming_img_icon_container">
                                                      <img
                                                         className="tas_message_img"
                                                         src={`${host}/uploads/${item.file}`}
                                                         alt="Image"
                                                      />
                                                      <div className="icon">
                                                         <ChatIconsContainer incoming={true} />
                                                      </div>
                                                   </div>
                                                </div>
                                             )
                                          ) : item?.file?.endsWith('mp4') ? (
                                             item.message_delete_status ? (
                                                <p className="tas_delete_message_incoming_text mt-1">
                                                   Message Deleted
                                                </p>
                                             ) : (
                                                <div className=" mt-1">
                                                   <div className="tas_message_incoming_img_icon_container">
                                                      <video
                                                         controls
                                                         width="100%"
                                                         height="100%"
                                                         className="tas_message_video"
                                                      >
                                                         <source
                                                            src={`${host}/uploads/${item.file}`}
                                                            type="video/mp4"
                                                         />
                                                         Your browser does not support the video
                                                         tag.
                                                      </video>
                                                      <div className="icon">
                                                         <ChatIconsContainer incoming={true} />
                                                      </div>
                                                   </div>
                                                </div>
                                             )
                                          ) : null
                                       ) : null}
                                    </div>

                                    <p className="tas_message_outgoing_time_text">
                                       {formatDate(item?.createdAt)}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        );
                     }
                     return null; // Add this line if you want to handle the case when neither condition is met
                  })}
            </div>
         </div>
         <div className="chat_main_bottom_wrapper">
            <div className="mainchat-inputs-full-div tas_message_send_wrapper">
               {customFile !== null && customFile.type?.startsWith('image/') ? (
                  <div className="" style={{ position: 'relative', width: '100px' }}>
                     <img
                        src={URL.createObjectURL(customFile)}
                        className="mt-2"
                        style={{
                           height: '100px',
                           width: '100px',
                           objectFit: 'cover',
                           borderRadius: '5px',
                        }}
                     />
                     <div className="" style={{ position: 'absolute', top: 0, right: -17 }}>
                        <FontAwesomeIcon
                           icon={faWindowClose}
                           style={{
                              fontSize: 18,
                              cursor: 'pointer',
                              color: 'black',
                           }}
                           onClick={() => setCustomFile('')}
                        />
                     </div>
                  </div>
               ) : customFile.type?.startsWith('video/') ? (
                  <div className="" style={{ position: 'relative', width: '100px' }}>
                     <video
                        src={URL.createObjectURL(customFile)}
                        className="mt-2"
                        style={{
                           height: '100px',
                           width: '100px',
                           objectFit: 'cover',
                           borderRadius: '5px',
                        }}
                     />
                     <div className="" style={{ position: 'absolute', top: 0, right: -17 }}>
                        <FontAwesomeIcon
                           icon={faWindowClose}
                           style={{
                              fontSize: 18,
                              cursor: 'pointer',
                              color: 'black',
                           }}
                           onClick={() => setCustomFile('')}
                        />
                     </div>
                  </div>
               ) : (
                  ''
               )}
               <div className="row">
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                     <div className="mainchat-left-side-div tas_chat_bottom_left_container">
                        <span
                           className="tas_chat_top_profile_video_span"
                           onClick={() => {
                              toast.warn('We are working on it', {
                                 position: 'top-center',
                                 style: {
                                    background: 'white',
                                    color: 'black',
                                 },
                              });
                           }}
                        >
                           <UploadIcon />
                        </span>
                        <span
                           className="tas_chat_top_profile_video_span"
                           onClick={() => {
                              toast.warn('We are working on it', {
                                 position: 'top-center',
                                 style: {
                                    background: 'white',
                                    color: 'black',
                                 },
                              });
                           }}
                        >
                           <Image className="mx-1 " src={messenger_gif} width="20" height="20" />
                        </span>
                        <span>
                           <div className="tas_picture_icon">
                              <label htmlFor="custom-files" style={{ cursor: 'pointer' }}>
                                 <PictureIcon />
                              </label>
                              <input
                                 type="file"
                                 id="custom-files"
                                 name="custom-files"
                                 accept="image/*, video/*"
                                 onChange={handleCustomFileChange}
                                 style={{ display: 'none' }}
                              />
                           </div>
                        </span>
                     </div>
                  </div>
                  <div
                     className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8"
                     style={{ padding: '0px' }}
                  >
                     <div className="tas_chat_bottom_input_container">
                        <input
                           className="tas_chat_bottom_input"
                           type="text"
                           placeholder="Type your Message.."
                           value={message}
                           onChange={handleMessageInputChange}
                           onKeyPress={handleKeyPress}
                        />
                     </div>
                  </div>
                  <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                     <div className="tas_chat_bottom_right_container">
                        <span
                           className="tas_chat_top_profile_video_span"
                           onClick={toggleEmojiPicker}
                        >
                           <EmojiIcon />
                        </span>
                        <span
                           className="tas_chat_top_profile_video_span"
                           onClick={() => {
                              toast.warn('We are working on it', {
                                 position: 'top-center',
                                 style: {
                                    background: 'white',
                                    color: 'black',
                                 },
                              });
                           }}
                        >
                           <AudioIcon />
                        </span>
                        <span
                           className="tas_chat_bottom_right_sentIcon"
                           onClick={handleMessageSubmit}
                        >
                           <SentIcon />
                        </span>
                     </div>
                  </div>
               </div>
               <div
                  className=""
                  style={{ position: 'absolute', right: '-298px', bottom: '65px', zIndex: 1 }}
               >
                  {showEmojiPicker && (
                     <EmojiPicker
                        emojiStyle="twitter"
                        searchPlaceHolder=""
                        searchDisabled={true}
                        previewConfig={{ showPreview: false }}
                        onEmojiClick={(e) => {
                           setMessage((prevMessage) => prevMessage + e.emoji);
                        }}
                        width={280}
                        height={300}
                        style={{
                           boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                           '--epr-emoji-size': '20px',
                        }}
                     />
                  )}
               </div>
            </div>
         </div>

         {videoModalOpen && (
            <Modal
               style={customStyles}
               isOpen={videoModalOpen}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <VideoCalling setVideoModalOpen={setVideoModalOpen} id={remoteSocketId} />
            </Modal>
         )}
      </div>
   );
};

export default ChatMiddledaboard;
