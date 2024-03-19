"use client"
import React, { useState, useEffect, useRef } from 'react'
import { faWindowClose, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./MessengerPopupFixedMessage.css"
import { host } from '@/environment';
import axiosInstance from '../../../utils/axios';
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";

import { socket } from "@/app/layout"
import './messenger.modules.css';
import EmojiPicker from 'emoji-picker-react';
import ChatIconsContainer from './MessengerMasterLayout/_ui/ChatIconsContainer';
import { formatDate } from "@/component/NewsFeed/Post/utils";
import MessengerIcon from './MessengerMasterLayout/_ui/icons/MessengerIcon';
import { customStyles } from '../../../utils/customeStyle';
import GroupNameChangeModal from './MessengerMasterLayout/_ui/GroupNameChangeModal';
import GroupMessengTopPart from './MessengerMasterLayout/_ui/GroupMessengTopPart';
import GroupMessageDetails from './MessengerMasterLayout/_ui/GroupMessageDetails';
import GroupMessageMenu from './MessengerMasterLayout/_ui/GroupMessageMenu';
import GroupMessengBottomPart from './MessengerMasterLayout/_ui/GroupMessengBottomPart';
import { handleFetchGroupMessage } from '@/redux/messenger/LeftSideBarRefetch/LeftSideBarRefetchSlice';

function GroupMessengerPopupFixedMessage({ groupItem, getGroupChatList, setGroupItem, connectedUsers }) {
    const dispatch = useDispatch()
    const [authUserId, setAuthUserId] = useState("");
    const [customFile, setCustomFile] = useState("")
    const [groupInfo, setGroupInfo] = useState("");
    const [message, setMessage] = useState("");
    const [allGroupMessages, setAllGroupMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    const messageDataGroupChat = {
        message: message,
        sender_id: authUserId,
        groupId: groupItem?._id
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUserInfo = localStorage.getItem("userInfo");

            if (localUserInfo) {
                setAuthUserId(JSON.parse(localUserInfo)[0]._id);
            }
        }
    }, [])


    //Fetch Group Info
    useEffect(() => {
        if (groupItem?._id) {
            axiosInstance.get(`/api/get-group-chat-infomation/${groupItem?._id}`).then((res) => {
                if (res.data.status == 200) {
                    setGroupInfo(res.data.group_messages)
                }
            });
        }

    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [allGroupMessages]);

    useEffect(() => {
        if (groupItem?._id) {
            getGroupChatMessages(groupItem?._id);
        }
    }, [groupItem?._id])

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

    async function getGroupChatMessages(groupId) {
        axiosInstance.get(`/api/get-group-chat-messages/${groupId}`).then((res) => {
            if (res.data.status == 200) {
                setAllGroupMessages(res.data.group_messages)
            }
        });

    }

    //Group Delete Message will implement later
    socket.on("getDeleteGroupSingleMessage", data => {

        console.log("delete group", data)
        setAllGroupMessages(state => {
            return state.map(item => {
                if (item._id === data.data.messageId) {
                    return {
                        ...item,
                        message_delete_status: 1
                    };
                }
                return item;
            });
        })

        if (data.data.messageId) {
            axiosInstance.patch(`/api/delete-group-single-message-one-to-one/${data.data.messageId}`).then((res) => {
                if (res.data.status == 200) {
                }
            });
        }
    })

    async function deleteOneToOneSingleGroupMessage(messageId) {
        const data = {
            ...messageDataGroupChat,
            messageId: messageId
        }
        socket.emit("deleteGroupSingleMessage", data)
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setShowEmojiPicker(false);

        // socket.emit("messageNotification", messageDataPrivateOneToOne);
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
                    ...messageDataGroupChat,
                    file: { base64Data, fileName: fileData.name },
                };
                socket.emit("joinGroup", extendedMessageData);
                console.log("base64Data:", extendedMessageData);

            };

            reader.readAsDataURL(fileData);

            setCustomFile("");
        }
        else {
            socket.emit("joinGroup", messageDataGroupChat)
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default behavior of the Enter key (e.g., form submission)
            handleMessageSubmit(e)
        }
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
    };

    socket.on("newGroupMessage", (message) => {
        if (groupItem?._id == message?.data?.group_id) {
            console.log("socket message GroupPop", message, groupItem?._id);
            const updatedMessages = [message.data, ...allGroupMessages];
            setAllGroupMessages(updatedMessages);
            dispatch(handleFetchGroupMessage(updatedMessages))
        } else if (authUserId == message?.data?.sender_id?._id) {
            console.log("socket message GroupPop auth", message?.data?.sender_id?._id, authUserId);
            const updatedMessages = [message.data, ...allGroupMessages];
            setAllGroupMessages(updatedMessages);
            dispatch(handleFetchGroupMessage(updatedMessages))
        }
    })


    //Group Message Menu
    const [groupMessageMenu, setGroupMessageMenu] = React.useState(null);
    const openGroupMessageMenu = Boolean(groupMessageMenu);
    const handleOpenGroupMessageMenu = (event) => {
        setGroupMessageMenu(event.currentTarget);
    };

    const handleCloseGroupMessageMenu = () => {
        setGroupMessageMenu(null);
    };

    const handleGroupNameEdit = () => {
        setIsOpenModal({ nickname: true })
        handleCloseGroupMessageMenu()
    }


    //Group image upload
    const handleImageClick = (e) => {
        console.log("Image")
        e.stopPropagation(); // Stop event propagation to prevent double triggering
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.click();
            handleCloseGroupMessageMenu()
        }
    };

    const [isOpenModal, setIsOpenModal] = React.useState({
        groupModal: false,
    });

    const updateGroupImg = (e) => {
        const formData = new FormData();
        formData.append("group_image", e.target.files[0]);
        axiosInstance
            .patch(`/api/update-group-chat-info/${groupItem?._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setGroupItem(res.data.data)
                getGroupChatList()
            });
    }


    return (

        <div className='messenger-chat-main-wrapper-newsfeeds'>
            <div style={{ position: 'fixed' }} className={`card  ${groupItem !== null ? "messenger-chat-main-wrapper-newsfeed messenger-chat-single-newsfeed-show" : "messenger-chat-single-newsfeed-hide"}`}  >
                <GroupMessengTopPart handleOpenGroupMessageMenu={handleOpenGroupMessageMenu} groupItem={groupItem} setGroupItem={setGroupItem} />

                <div class="card-body tas_scrollable_contents" ref={chatContainerRef}>
                    <div className='d-flex flex-column justify-content-between ' >
                        {
                            allGroupMessages.length > 0 ?
                                allGroupMessages
                                    .slice() // Create a shallow copy to avoid modifying the original array
                                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                    .map((item, i) => (
                                        item?.sender_id._id === authUserId ? (
                                            <div className='outgoing-chat text-white px-2 align-self-end mt-2' key={i} style={{ maxWidth: "95%" }}>
                                                {
                                                    item.message !== "" ?
                                                        <div className='tas_outgoing_message_container' style={{ justifyContent: "flex-end" }} >
                                                            <div className="icon" >
                                                                {item.message_delete_status ? null :
                                                                    <ChatIconsContainer deleteOneToOneMessages={() => deleteOneToOneSingleGroupMessage(item._id)} />
                                                                }
                                                            </div>

                                                            {item.message_delete_status ?
                                                                <p className='tas_delete_message_text'>Message Deleted</p>
                                                                :
                                                                <div className="px-2 py-1 " style={{ borderRadius: '8px', background: "#3fcdcd" }}>
                                                                    <span>{item?.message}</span>
                                                                </div>}
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
                                                                        <ChatIconsContainer deleteOneToOneMessages={() => deleteOneToOneSingleGroupMessage(item._id)} />
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
                                                                        <ChatIconsContainer deleteOneToOneMessages={() => deleteOneToOneSingleGroupMessage(item._id)} />
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
                                                            <div className="px-2 py-1" style={{ borderRadius: '8px', background: "#307777" }}>
                                                                <span>{item?.message}</span>
                                                            </div>}

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
                                :
                                <GroupMessageDetails groupItem={groupItem} handleImageClick={handleImageClick} />
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
                <GroupMessengBottomPart handleCustomFileChange={handleCustomFileChange} message={message} handleMessageInputChange={handleMessageInputChange} setMessage={setMessage} handleMessageSubmit={handleMessageSubmit} />
            </div>

            <GroupMessageMenu groupId={groupItem?._id} groupMessageMenu={groupMessageMenu} openGroupMessageMenu={openGroupMessageMenu} handleCloseGroupMessageMenu={handleCloseGroupMessageMenu} handleGroupNameEdit={handleGroupNameEdit} handleImageClick={handleImageClick} />
            <Modal isOpen={isOpenModal.nickname} onRequestClose={() => setIsOpenModal({ groupModal: false })} style={customStyles}>
                {isOpenModal.nickname && <GroupNameChangeModal setIsOpenModal={setIsOpenModal} groupItem={groupItem} setGroupItem={setGroupItem} getGroupChatList={getGroupChatList} />}
            </Modal>

            <form encType='multipart/form-data'>
                <input
                    id='fileInput'
                    type='file'
                    name='group_image'
                    accept='image/*'
                    onChange={(e) => updateGroupImg(e)}
                    style={{ display: "none" }}
                />
            </form>
        </div>
    )
}

export default GroupMessengerPopupFixedMessage