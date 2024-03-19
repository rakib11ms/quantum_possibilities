"use client"
import React, { useState, useEffect, useRef } from 'react'
import { faWindowClose, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./MessengerPopupFixedMessage.css"

import ChatBodyAuthor from "../../../public/img/avatar3-sm.jpg";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import { host } from '@/environment';
import { useParams } from 'next/navigation'
import axiosInstance from '../../../utils/axios';

import { socket } from '@/app/layout';
import Image from 'next/image';
import messenger_camera from "../../../public/messenger_camera.png";
import messenger_custom_file from "../../../public/messenger_custom_file.png";
import messenger_gif from "../../../public/messenger_gif.png";
import messenger_voice from "../../../public/messenger_voice.png";
import './messenger.modules.css';
import EmojiPicker from 'emoji-picker-react';
import ChatIconsContainer from './MessengerMasterLayout/_ui/ChatIconsContainer';
import ChatSmallIconsContainer from './MessengerMasterLayout/_ui/ChatSmallIconsContainer';
import { formatDate } from "@/component/NewsFeed/Post/utils";
import timeFormat from '../../../utils/CommentTimeFormat';
import { handleFetchOneToOneMessage } from '@/redux/messenger/LeftSideBarRefetch/LeftSideBarRefetchSlice';
// import useUserInfo from "@/utils/useUserInfo";
function MessengerPopupFixedMessage({ connectedUsers, messageReceiverId, secondMessageReceiverId, setMessageReceiverId, messageSenderId }) {
    const dispatch = useDispatch()
    const [customFile, setCustomFile] = useState("")
    const [userInfo, setUserInfo] = useState("");
    const [message, setMessage] = useState("");
    const [allPrivateOneToOneMessages, setAllPrivateOneToOneMessages] = useState([]);

    // useEffect(() => {
    //     socket.emit("addUser", messageSenderId)
    // }, [messageSenderId])


    useEffect(() => {
        if (messageReceiverId) {
            axiosInstance.get(`/api/get-user-info/${messageReceiverId}`).then((res) => {
                if (res.data.status == 200) {
                    setUserInfo(res.data.userInfo[0])
                }
            });
        }

    }, [messageReceiverId])

    useEffect(() => {

        getAllPrivateOneToOneMessages(messageReceiverId);
        // getAllPrivateOneToOneMessages(secondMessageReceiverId);

    }, [messageReceiverId,
        // secondMessageReceiverId
    ])




    socket.on("message", (message) => {
        console.log("socket message ChatPop", message);
        const updatedMessages = [message.data, ...allPrivateOneToOneMessages];
        setAllPrivateOneToOneMessages(updatedMessages);
        dispatch(handleFetchOneToOneMessage(updatedMessages))
    })

    socket.on("getDeleteMessage", data => {
        // console.log("test1",data)
        setAllPrivateOneToOneMessages(state => {
            return state.map(item => {
                if (item._id === data.messageId) {
                    return {
                        ...item,
                        message_delete_status: 1
                    };
                }
                return item;
            });
        })

        if (data.messageId) {
            axiosInstance.patch(`/api/delete-private-message-one-to-one/${data.messageId}`).then((res) => {
                if (res.data.status == 200) {
                }
            });
        }
    })



    const handleCustomFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setCustomFile(selectedFile)
            const fileType = selectedFile.type;

        }
    }

    const handleMessageInputChange = (e) => {
        setMessage(e.target.value)
    }

    const messageDataPrivateOneToOne = {
        message: message,
        sender_id: messageSenderId,
        receiver_id: messageReceiverId !== null && messageReceiverId,
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();

        setMessage("");
        if (message == "" && customFile == "") {
            alert("Empty message won't be accepted")
        }
        if (customFile) {
            const fileData = customFile;

            const reader = new FileReader();

            reader.onload = async () => {
                console.log("Reader onload triggered");

                const base64Data = reader.result.split(',')[1];


                const extendedMessageData = {
                    ...messageDataPrivateOneToOne,
                    file: { base64Data, fileName: fileData.name },
                };
                // Emit the base64-encoded file data to the server
                socket.emit("user_message", extendedMessageData);
                console.log("base64Data:", extendedMessageData);

            };

            reader.readAsDataURL(fileData);

            setCustomFile("");
        }
        else {
            socket.emit("user_message", messageDataPrivateOneToOne);

        }



    };

    async function deleteOneToOneMessages(messageId) {
        const data1 = {
            ...messageDataPrivateOneToOne,
            messageId: messageId
        }
        socket.emit("deleteMessage", data1)
    }





    // async function deleteOneToOneMessages(messageId) {
    //     setAllPrivateOneToOneMessages(state => {
    //         return state.map(item => {
    //             if (item._id === messageId) {
    //                 return {
    //                     ...item,
    //                     message_delete_status: 1
    //                 };
    //             }
    //             return item;
    //         });
    //     })

    //     if (messageId) {
    //         axiosInstance.patch(`/api/delete-private-message-one-to-one/${messageId}`).then((res) => {
    //             if (res.data.status == 200) {
    //             }
    //         });
    //     }
    // }




    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleMessageSubmit(e)
        }
    };

    const data = {
        sender_id: messageSenderId,
        receiver_id: messageReceiverId
    }




    async function getAllPrivateOneToOneMessages() {
        if (messageReceiverId && messageSenderId) {
            axiosInstance.get(`/api/get-private-message-one-to-one/${messageSenderId}/${messageReceiverId}`, data).then((res) => {
                if (res.data.status == 200) {
                    setAllPrivateOneToOneMessages(res.data.messages)
                }
            });
        }
    }



    // const sortedMessages = allPrivateOneToOneMessages
    //     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // console.log("sorted message", sortedMessages);


    const chatWrapperRef = useRef();
    // const scrollToBottom = () => {
    //     if (chatWrapperRef.current) {
    //         const objDiv = chatWrapperRef.current;
    //         objDiv.scrollTop = objDiv.scrollHeight;
    //     }
    //     // console.log("hello1", "Scrolled to bottom");
    // };

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         // Include a conditional check if needed
    //         // if (messageReceiverId !== null) {
    //         scrollToBottom();
    //         // }
    //     }, 3000);

    //     return () => {
    //         // Clear the interval when the component is unmounted
    //         clearInterval(intervalId);
    //     };
    // }, []);



    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
    };
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const chatContainerRef = React.useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [allPrivateOneToOneMessages]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    //New
    const [authUserId, setAuthUserId] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUserInfo = localStorage.getItem("userInfo");

            if (localUserInfo) {
                setAuthUserId(JSON.parse(localUserInfo)[0]._id);
            }
        }
    }, []);

    return (

        <div className='messenger-chat-main-wrapper-newsfeeds' >

            <div style={{ position: 'fixed' }} className={`card  ${messageReceiverId ? "messenger-chat-main-wrapper-newsfeed messenger-chat-single-newsfeed-show" : "messenger-chat-single-newsfeed-hide"}`}  >
                {/* <div className={`card ${uniqueMessageReceiverIds[0] ? "messenger-chat-single-newsfeed-show" : "messenger-chat-single-newsfeed-hide"}`} style={{ width: "21rem" }}> */}

                {/* <div className=''
                    style={{ position: "fixed", width: "20rem", height: "auto", zIndex: "9111", background: "white" }}


                > */}
                <div className='fixed-tops'>
                    <div className='header-messenger-top d-flex py-2 justify-content-between card-header  '  >

                        <div>
                            <div style={{ position: "relative", width: '35px', height: "35px", borderRadius: "50%", marginLeft: '-30px', position: "fixed", padding: "2px" }}>
                                <img src={`${host}/uploads/${userInfo.profile_pic}`} style={{ width: '30px', height: "30px", objectFit: "cover", borderRadius: "50%", border: "1px solid black" }} />

                                {connectedUsers?.some(user => user.userId === messageReceiverId) ? <div className='tas_green_div'></div> : null}

                            </div>
                            <h6 className='mx-2'>{userInfo.first_name} {userInfo.last_name}</h6>
                            <p className="tas_mssengrid_tagp">
                                {connectedUsers?.some(user => user.userId === messageReceiverId) ? "Online" : timeFormat(userInfo.last_login)}
                            </p>
                        </div>

                        <div className=' d-flex justify-content-between'>
                            <div className='mt-1 mx-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "14px" }} viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                            </div>
                            <div className='mx-2 mt-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "18px" }} viewBox="0 0 576 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" /></svg>
                            </div>
                            <div className='header-messenger-top-right-icons mx-2'
                                onClick={() => {
                                    setMessageReceiverId(null)
                                }}

                            // onClick={() => {
                            //     // setMessageReceiverId(null);
                            //     // props.setMessageReceiverId(null); // Assuming you have a function in props to update messageReceiverId

                            // }}
                            >
                                <FontAwesomeIcon
                                    icon={faWindowClose}
                                    style={{
                                        fontSize: 22,
                                        cursor: "pointer",
                                        color: 'black'
                                    }}
                                />

                            </div>
                        </div>

                    </div>
                </div>

                <div class="card-body tas_scrollable_contents" ref={chatContainerRef}>

                    <div className='d-flex flex-column justify-content-between ' >

                        {
                            allPrivateOneToOneMessages
                                .slice() // Create a shallow copy to avoid modifying the original array
                                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                .map((item, i) => (
                                    item?.sender_id._id === messageSenderId ? (
                                        <div className='outgoing-chat text-white px-2 align-self-end mt-2' key={i} style={{ maxWidth: "95%" }}>
                                            {
                                                item.message !== "" ?
                                                    <div className='tas_outgoing_message_container' style={{ justifyContent: "flex-end" }}>
                                                        <div className="icon" >
                                                            {item.message_delete_status ? null :
                                                                <ChatIconsContainer deleteOneToOneMessages={() => deleteOneToOneMessages(item._id)} />
                                                            }
                                                        </div>

                                                        {item.message_delete_status ?
                                                            <p className='tas_delete_message_text'>Message Deleted</p>
                                                            :
                                                            <div className="tas_text_container">
                                                                <p className='tas_message_outgoing_text'>{item?.message}</p>
                                                            </div>
                                                        }
                                                        {/* <div className="tas_text_container">
                                                            <p className='tas_message_outgoing_text'>{item?.message}</p>
                                                        </div> */}

                                                        {/* <div className="icon" >
                                                        {item.message_delete_status ? null :
                                                            <ChatSmallIconsContainer deleteOneToOneMessages={() => deleteOneToOneMessages(item._id)} />
                                                        }
                                                    </div> */}
                                                    </div>
                                                    :
                                                    null

                                            }


                                            {
                                                item?.file !== undefined && (
                                                    item?.file?.endsWith("jpg") || item?.file?.endsWith("png") ? (
                                                        item.message_delete_status ?
                                                            <p className='tas_delete_message_text'>Message Deleted</p>
                                                            :
                                                            <div className='tas_message_img_container mt-1'>
                                                                <div className="icon">
                                                                    <ChatIconsContainer deleteOneToOneMessages={() => deleteOneToOneMessages(item._id)} />
                                                                </div>
                                                                <img
                                                                    className='incoming-img'
                                                                    src={`${host}/uploads/${item.file}`}
                                                                    style={{ width: "130px", height: "130px", objectFit: "cover", borderRadius: "5px" }}
                                                                    alt="Image"
                                                                />
                                                            </div>
                                                    ) : item?.file?.endsWith("mp4") ? (
                                                        item.message_delete_status ?
                                                            <p className='tas_delete_message_incoming_text mt-1'>Message Deleted</p>
                                                            :
                                                            <div className='tas_message_img_container mt-1'>
                                                                <div className="icon">
                                                                    <ChatIconsContainer deleteOneToOneMessages={() => deleteOneToOneMessages(item._id)} />
                                                                </div>
                                                                <video controls width="100%" height="100%" style={{ width: "130px", height: "130px", borderRadius: "5px" }}>
                                                                    <source src={`${host}/uploads/${item.file}`} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            </div>
                                                    ) : null
                                                )
                                            }

                                            <p className="tas_message_outgoing_time_text">{formatDate(item?.createdAt)}</p>


                                        </div>
                                    ) : (
                                        <div className='incoming-chat bg-light  text-white mx-3  mt-2 align-self-start ' style={{ borderRadius: '8px', position: "relative", maxWidth: "75%" }} key={i}>

                                            {
                                                item.message !== "" &&
                                                <div className='tas_outgoing_message_container'>
                                                    {item.message_delete_status ?
                                                        <p className='tas_delete_message_text tas_delete_message_incoming_text'>Message Deleted</p>
                                                        :
                                                        <div className="tas_incoming_text_container">
                                                            <p className='tas_message_incoming_text'>{item?.message}</p>
                                                        </div>
                                                    }

                                                    <div className="icon" >
                                                        {item.message_delete_status ? null :
                                                            <ChatIconsContainer incoming={true} />
                                                        }
                                                    </div>
                                                </div>
                                            }



                                            {
                                                item?.file !== undefined && (
                                                    item?.file?.endsWith("jpg") || item?.file?.endsWith("png") ? (
                                                        item.message_delete_status ?
                                                            <p className='tas_delete_message_text tas_delete_message_incoming_text'>Message Deleted</p>
                                                            :
                                                            <div class="tas_message_img_container mt-1">
                                                                <img
                                                                    className='incoming-img'
                                                                    src={`${host}/uploads/${item.file}`}
                                                                    style={{ width: "130px", height: "130px", objectFit: "cover", borderRadius: "5px" }}
                                                                    alt="Image"
                                                                />
                                                                <div className="icon">
                                                                    <ChatIconsContainer incoming={true} />
                                                                </div>
                                                            </div>
                                                    ) : item?.file?.endsWith("mp4") ? (
                                                        item.message_delete_status ?
                                                            <p className='tas_delete_message_text tas_delete_message_incoming_text'>Message Deleted</p>
                                                            :
                                                            <div class="tas_message_img_container mt-1">
                                                                <video controls width="100%" height="100%" style={{ width: "130px", height: "130px", borderRadius: "5px" }}>
                                                                    <source src={`${host}/uploads/${item.file}`} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                                <div className="icon">
                                                                    <ChatIconsContainer incoming={true} />
                                                                </div>
                                                            </div>
                                                    ) : null
                                                )
                                            }

                                            <p className="tas_message_incoming_time_text">{formatDate(item?.createdAt)}</p>


                                            <div className='' style={{ position: "absolute", left: "-36px", top: "-2px" }}>
                                                <img src={`${host}/uploads/${item?.sender_id.profile_pic}`} style={{ width: '30px', height: "30px", objectFit: "cover", borderRadius: "50%" }} />

                                            </div>
                                        </div>
                                    )
                                ))
                        }

                        {customFile !== null && customFile.type?.startsWith('image/') ?
                            <div className='' style={{ position: "relative", width: "100px" }}>
                                <img src={URL.createObjectURL(customFile)} className="mt-2" style={{ height: "100px", width: "100px", objectFit: "cover", borderRadius: "5px" }} />
                                <div className='' style={{ position: "absolute", top: 0, right: -17 }}>

                                    <FontAwesomeIcon
                                        icon={faWindowClose}
                                        style={{
                                            fontSize: 18,
                                            cursor: "pointer",
                                            color: 'black'
                                        }}
                                        onClick={() => setCustomFile("")}
                                    />
                                </div>

                            </div>
                            :
                            customFile.type?.startsWith('video/') ?
                                <div className='' style={{ position: "relative", width: "100px" }}>
                                    <video src={URL.createObjectURL(customFile)} className="mt-2" style={{ height: "100px", width: "100px", objectFit: "cover", borderRadius: "5px" }} />
                                    <div className='' style={{ position: "absolute", top: 0, right: -17 }}>

                                        <FontAwesomeIcon
                                            icon={faWindowClose}
                                            style={{
                                                fontSize: 18,
                                                cursor: "pointer",
                                                color: 'black'
                                            }}
                                            onClick={() => setCustomFile("")}
                                        />
                                    </div>

                                </div>
                                :
                                ""
                        }



                    </div>

                </div>
                <div className='fixed-bottoms d-flex align-items-center mt-2'>
                    <div className='tas_messenger_left_icon_container'>
                        <div>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.54545C0 1.87036 0.263392 1.22291 0.732233 0.745546C1.20107 0.268181 1.83696 0 2.5 0H7.5C8.16688 0 8.77188 0.265363 9.22063 0.698727C9.54375 1.01118 9.94 1.27273 10.3869 1.27273H12.5C13.163 1.27273 13.7989 1.54091 14.2678 2.01827C14.7366 2.49564 15 3.14308 15 3.81818V11.4545C15 12.1296 14.7366 12.7771 14.2678 13.2545C13.7989 13.7318 13.163 14 12.5 14H7.5C6.85979 14.0008 6.24386 13.7506 5.78 13.3013C5.45625 12.9888 5.06 12.7273 4.61375 12.7273H2.5C1.83696 12.7273 1.20107 12.4591 0.732233 11.9817C0.263392 11.5044 0 10.8569 0 10.1818V2.54545ZM4.91562 5.66873C4.68514 5.47136 4.39099 5.36797 4.09 5.37854C3.80187 5.39127 3.51625 5.51473 3.28062 5.74509C3.04437 5.97609 2.87437 6.30064 2.80937 6.67227C2.74498 7.03972 2.79049 7.41839 2.94 7.75918C3.0875 8.09009 3.32187 8.34145 3.59375 8.48464C3.8549 8.62507 4.15859 8.65963 4.44375 8.58136C4.7275 8.50373 4.99375 8.31473 5.19063 8.029C5.25188 7.93991 5.305 7.84382 5.34875 7.742C5.39125 7.644 5.31625 7.54091 5.21125 7.54091H4.28125C4.14035 7.54091 4.00523 7.48392 3.9056 7.38248C3.80597 7.28104 3.75 7.14346 3.75 7C3.75 6.85654 3.80597 6.71896 3.9056 6.61752C4.00523 6.51608 4.14035 6.45909 4.28125 6.45909H6.03125C6.325 6.45909 6.5625 6.70091 6.5625 7C6.5648 7.58933 6.38964 8.16522 6.06062 8.65009C5.73125 9.12736 5.2625 9.47736 4.72063 9.62627C4.17865 9.77496 3.60154 9.7102 3.10438 9.44491C2.60437 9.18145 2.21063 8.74045 1.9725 8.20591C1.73445 7.66634 1.66149 7.06629 1.76313 6.48391C1.85924 5.90602 2.13275 5.37401 2.54438 4.96427C2.94739 4.56335 3.48039 4.32617 4.04312 4.29736C4.6051 4.27496 5.15538 4.46489 5.58812 4.83064C5.69728 4.92144 5.76653 5.05267 5.78066 5.19546C5.79478 5.33825 5.75262 5.48091 5.66344 5.59205C5.57426 5.70318 5.44537 5.7737 5.30513 5.78808C5.16489 5.80246 5.02478 5.75953 4.91562 5.66873V5.66873ZM10.4375 8.01818C10.4375 7.97599 10.454 7.93552 10.4833 7.90569C10.5126 7.87585 10.5523 7.85909 10.5938 7.85909H12.3125C12.4534 7.85909 12.5885 7.8021 12.6882 7.70066C12.7878 7.59922 12.8437 7.46164 12.8437 7.31818C12.8437 7.17472 12.7878 7.03714 12.6882 6.9357C12.5885 6.83426 12.4534 6.77727 12.3125 6.77727H10.5938C10.5523 6.77727 10.5126 6.76051 10.4833 6.73068C10.454 6.70084 10.4375 6.66037 10.4375 6.61818V5.69545C10.4375 5.65326 10.454 5.61279 10.4833 5.58296C10.5126 5.55312 10.5523 5.53636 10.5938 5.53636H12.5937C12.7346 5.53636 12.8698 5.47937 12.9694 5.37793C13.069 5.27649 13.125 5.13891 13.125 4.99545C13.125 4.852 13.069 4.71441 12.9694 4.61297C12.8698 4.51153 12.7346 4.45454 12.5937 4.45454H9.90625C9.76535 4.45454 9.63023 4.51153 9.5306 4.61297C9.43097 4.71441 9.375 4.852 9.375 4.99545V9.00454C9.375 9.148 9.43097 9.28559 9.5306 9.38703C9.63023 9.48847 9.76535 9.54545 9.90625 9.54545C10.0471 9.54545 10.1823 9.48847 10.2819 9.38703C10.3815 9.28559 10.4375 9.148 10.4375 9.00454V8.01818V8.01818ZM8.34375 4.99545C8.34375 4.852 8.28778 4.71441 8.18815 4.61297C8.08852 4.51153 7.9534 4.45454 7.8125 4.45454C7.6716 4.45454 7.53648 4.51153 7.43685 4.61297C7.33722 4.71441 7.28125 4.852 7.28125 4.99545V9.00454C7.28125 9.148 7.33722 9.28559 7.43685 9.38703C7.53648 9.48847 7.6716 9.54545 7.8125 9.54545C7.9534 9.54545 8.08852 9.48847 8.18815 9.38703C8.28778 9.28559 8.34375 9.148 8.34375 9.00454V4.99545Z" fill="#307777" />
                            </svg>
                        </div>
                        <div>
                            <label htmlFor='custom-files' style={{ marginBottom: "0px" }}>
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5499 5.9499C4.92121 5.9499 5.2773 5.8024 5.53985 5.53985C5.8024 5.2773 5.9499 4.92121 5.9499 4.5499C5.9499 4.1786 5.8024 3.8225 5.53985 3.55995C5.2773 3.2974 4.92121 3.1499 4.5499 3.1499C4.1786 3.1499 3.8225 3.2974 3.55995 3.55995C3.2974 3.8225 3.1499 4.1786 3.1499 4.5499C3.1499 4.92121 3.2974 5.2773 3.55995 5.53985C3.8225 5.8024 4.1786 5.9499 4.5499 5.9499Z" fill="#307777" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.8V11.2C0 11.9426 0.294999 12.6548 0.820101 13.1799C1.3452 13.705 2.05739 14 2.8 14H12.6C13.3426 14 14.0548 13.705 14.5799 13.1799C15.105 12.6548 15.4 11.9426 15.4 11.2V2.8C15.4 2.05739 15.105 1.3452 14.5799 0.820101C14.0548 0.294999 13.3426 0 12.6 0H2.8C2.05739 0 1.3452 0.294999 0.820101 0.820101C0.294999 1.3452 0 2.05739 0 2.8V2.8ZM12.6 1.75H2.8C2.52152 1.75 2.25445 1.86062 2.05754 2.05754C1.86062 2.25445 1.75 2.52152 1.75 2.8V9.4822C1.74994 9.51295 1.75798 9.54317 1.77332 9.56982C1.78865 9.59647 1.81074 9.61861 1.83735 9.63401C1.86396 9.64941 1.89416 9.65753 1.92491 9.65755C1.95566 9.65756 1.98587 9.64947 2.0125 9.6341L5.6 7.5621C6.23848 7.19347 6.96275 6.99941 7.7 6.99941C8.43725 6.99941 9.16152 7.19347 9.8 7.5621L13.3875 9.6341C13.4141 9.64947 13.4443 9.65756 13.4751 9.65755C13.5058 9.65753 13.536 9.64941 13.5626 9.63401C13.5893 9.61861 13.6113 9.59647 13.6267 9.56982C13.642 9.54317 13.6501 9.51295 13.65 9.4822V2.8C13.65 2.52152 13.5394 2.25445 13.3425 2.05754C13.1455 1.86062 12.8785 1.75 12.6 1.75V1.75Z" fill="#307777" />
                                </svg>
                            </label>
                            {/* <input type="file" id="custom-files" name="custom-files" accept="image/*, video/*" onChange={handleCustomFileChange} style={{ display: "none" }} /> */}
                            <input type="file" id="custom-files" name="custom-files" accept="image/*, video/*" onChange={handleCustomFileChange} style={{ display: "none" }} />

                        </div>
                        {/* <div className=''>
                            <img src={messenger_gif} style={{ width: '15px', height: '15px' }} />
                        </div> */}

                    </div>

                    <div class="input-group">
                        <input type="text" class="tas_form_control py-2 mx-1" value={message} onChange={handleMessageInputChange} onKeyPress={handleKeyPress} placeholder="" aria-label="Username" aria-describedby="basic-addon1" style={{ borderRadius: "7px" }} />
                    </div>

                    <div className='tas_messenger_right_icon_container'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            onClick={toggleEmojiPicker}
                            viewBox='0 0 20 20'
                            fill='none'>
                            <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM6.90017 5.25465C7.31858 5.01872 7.99432 4.79563 8.57787 5.3246C9.96312 6.5803 7.58754 9 6.5 9C5.41247 9 3.03688 6.5803 4.42213 5.3246C5.00568 4.79563 5.68141 5.01873 6.09982 5.25465C6.33624 5.38796 6.66375 5.38796 6.90017 5.25465ZM15.5779 5.3246C14.9943 4.79563 14.3186 5.01872 13.9002 5.25465C13.6637 5.38796 13.3362 5.38796 13.0998 5.25465C12.6814 5.01873 12.0057 4.79563 11.4221 5.3246C10.0369 6.5803 12.4125 9 13.5 9C14.5875 9 16.9631 6.5803 15.5779 5.3246ZM10 17C8.29876 17 6.832 15.6362 5.88467 14.384C5.43226 13.7861 5.89514 13 6.64496 13H13.355C14.1049 13 14.5677 13.7861 14.1153 14.384C13.168 15.6362 11.7012 17 10 17Z'
                                fill='#307777'
                            />
                        </svg>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <g clip-path='url(#clip0_6_4237)'>
                                <path
                                    d='M9.99999 0.833374C10.5472 0.833374 11.089 0.941148 11.5945 1.15054C12.1 1.35994 12.5594 1.66685 12.9463 2.05376C13.3332 2.44067 13.6401 2.9 13.8495 3.40553C14.0589 3.91105 14.1667 4.45287 14.1667 5.00004V10C14.1667 11.1051 13.7277 12.1649 12.9463 12.9463C12.1649 13.7277 11.1051 14.1667 9.99999 14.1667C8.89493 14.1667 7.83512 13.7277 7.05372 12.9463C6.27231 12.1649 5.83333 11.1051 5.83333 10V5.00004C5.83333 3.89497 6.27231 2.83516 7.05372 2.05376C7.83512 1.27236 8.89493 0.833374 9.99999 0.833374ZM1.82666 11.635L3.46166 11.3075C3.76532 12.8179 4.58252 14.1766 5.77442 15.1527C6.96632 16.1288 8.4594 16.6622 9.99999 16.6622C11.5406 16.6622 13.0337 16.1288 14.2256 15.1527C15.4175 14.1766 16.2347 12.8179 16.5383 11.3075L18.1733 11.635C17.4133 15.4542 14.0417 18.3334 9.99999 18.3334C5.95833 18.3334 2.58666 15.4542 1.82666 11.635Z'
                                    fill='#307777'
                                />
                            </g>
                            <defs>
                                <clipPath id='clip0_6_4237'>
                                    <rect width='20' height='20' fill='white' />
                                </clipPath>
                            </defs>
                        </svg>
                        <svg
                            onClick={handleMessageSubmit}
                            className=""
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 21 20'
                            fill='none'>
                            <path
                                d='M0.388544 6.98257C-0.128686 6.81016 -0.13364 6.53173 0.398452 6.35437L19.311 0.0505081C19.8352 -0.123884 20.1354 0.169411 19.9888 0.682678L14.5846 19.5943C14.436 20.1184 14.1338 20.1363 13.9118 19.6388L10.3507 11.6248L16.2958 3.69787L8.36894 9.64304L0.388544 6.98257Z'
                                fill='#307777'
                            />
                        </svg>
                    </div>
                </div>


                <div className='' style={{ position: "fixed", right: "65px", bottom: 20 }}>
                    {
                        showEmojiPicker && <EmojiPicker
                            emojiStyle='twitter'
                            searchPlaceHolder=""
                            searchDisabled={true}
                            previewConfig={{ showPreview: false }}
                            onEmojiClick={(e) => {
                                // console.log("eva", e)
                                setMessage((prevMessage) => prevMessage + e.emoji);
                                // setShowEmojiPicker(false);

                            }}
                            width={280}
                            height={300}
                            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", '--epr-emoji-size': '20px' }}
                        />
                    }

                </div>

            </div>



        </div>
    )
}

export default MessengerPopupFixedMessage