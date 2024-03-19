import React, { useEffect, useState } from "react";
import feedauththree from "../../assets/img/avatar10-sm.jpg";
import Sponserdone from "../../../public/sponserdone.png";
import Sponserdtwo from "../../../public/sponserdtwo.png";
import NoImage from '../../assets/img/no_image_available.svg';
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import { toast } from "react-toastify";
import Link from "next/link";
import addFriend from "../../../public/addFriend.png";
import "./FeatureUser.css"
import Image from "next/image";
// import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessengerPopupFixedMessage from "../AllMessengers/MessengerPopupFixedMessage";
import moment from "moment";
import Modal from "react-modal";
import { customStyles } from "../../../utils/customeStyle";
import FriendsBrithdayModal from "./FriendsBrithdayModal";
import io from "socket.io-client"
import BirthdayIcon from "./_ui/Icons/BirthdayIcon";
import SearchIcon from "./_ui/Icons/SearchIcon";
import ThreedotIcon from "./_ui/Icons/ThreedotIcon";
import AddIcon from "./_ui/Icons/AddIcon";
import CreateGroupPopup from "./CreateGroupPopup";
import GroupMessengerPopupFixedMessage from "../AllMessengers/GroupMessengerPopupFixedMessage";

const socket = io(host);

function BannaTestRightbarBackup() {

    const [friendRequestList, setFriendRequestList] = useState([]);
    const [groupChatList, setGroupChatList] = useState([]);
    const [friendlist, setFriendList] = useState([]);
    const [birthDayFriendList, setBirthDayFriendList] = useState([]);
    const [username, setUsername] = useState([]);
    const [messageSenderId, setMessageSenderId] = useState("");
    const [isOpenModal, setIsOpenModal] = React.useState({
        friendsBirthday: false,
    });

    const handleFriendsBirthdayModal = () => {
        setIsOpenModal({ friendsBirthday: true })
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
        const localStorageUserName = localStorage.getItem("username");
        setUsername(localStorageUserName);

        getFriendRequests();
        getGroupChatList();
        getBirthDayFriendList();
        getFriendList(localStorageUserName);
    }, [])


    const getFriendRequests = () => {
        axiosInstance.post("/api/friend-request-list").then((res) => {
            if (res.data.status == 200) {
                setFriendRequestList(res.data.results);
            }
        });
    };

    const getGroupChatList = () => {
        axiosInstance.get("/api/get-all-group-chat-info").then((res) => {
            if (res.data.status == 200) {
                setGroupChatList(res.data.all_group);
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
            username: localStorageUserName
        }
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
        axiosInstance.post("/api/friend-accept-friend-request", formData).then((res) => {
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


    const [messageReceiverId, setMessageReceiverId] = useState(null);
    const [secondMessageReceiverId, setSecondMessageReceiverId] = useState("");
    const [firstMessageTriggered, setFirstMessageTriggered] = useState(false);
    const [openCreateGroupPopup, setOpenCreateGroupPopup] = useState(false)




    const [groupItem, setGroupItem] = useState(null)





    // const [authUserId, setAuthUserId] = useState("");
    // // console.log("boom",authUserId)
    // useEffect(() => {
    //   if (typeof window !== "undefined") {
    //     const localUserInfo = localStorage.getItem("userInfo");

    //     if (localUserInfo) {
    //       setAuthUserId(JSON.parse(localUserInfo)[0]._id);
    //     }
    //   }
    // }, [])
    // // useEffect(() => {
    // //   // Emit "addUser" event after authUserId is set
    // //   if (authUserId && socket) {
    // //     socket.emit("addUser", authUserId);
    // //   }
    // // }, [authUserId, socket]);





    // socket.emit("addUser", authUserId)


    // const [connectedUsers, setConnectedUsers] = useState([]);
    // console.log("trigg", connectedUsers)

    // useEffect(() => {
    //   // Establish socket connection
    //   const socket = io(host);

    //   // Event handler for "getUsers"
    //   const handleGetUsers = users => {
    //     // Extract userId values from the users array
    //     // const userIds = users.map(user => user.userId);

    //     // Check if the new state is different before updating
    //     // if (JSON.stringify(userIds) !== JSON.stringify(connectedUsers)) {
    //     setConnectedUsers(users);
    //     // }
    //   };

    //   socket.on("getUsers", handleGetUsers);

    //   return () => {
    //     socket.off("getUsers", handleGetUsers);
    //     socket.disconnect();
    //   };

    // }, [connectedUsers]);

    const [connectedUsers, setConnectedUsers] = useState([]);
    useEffect(() => {
        // Establish socket connection
        const socket = io(host);

        // Event handler for "getUsers"
        const handleGetUsers = users => {
            if (connectedUsers.length !== users.length) {
                setConnectedUsers(users);
            }
        };

        socket.on("getUsers", handleGetUsers);

        // Clean up socket connection when component unmounts
        return () => {
            socket.off("getUsers", handleGetUsers);
            socket.disconnect();
        };
    }, [connectedUsers]);

    return (
        <>
            <div>
                <div className='sponserd-full-div'>
                    <h6>Sponsored</h6>

                    <div className='sponserd-div'>
                        <img className="sponserd-img" src={Sponserdone.src} alt='' />
                        <div>
                            <span className="sponserd-tags">আপনার অফিসের</span>
                            <p className="sponserd-tagsp">homefectionery.com</p>
                        </div>
                    </div>
                    <div className='sponserd-div'>
                        <img className="sponserd-img" src={Sponserdtwo.src} alt='' />
                        <div>
                            <span className="sponserd-tags">আপনার অফিসের লাঞ্চ</span>
                            <p className="sponserd-tagsp">homefectionery.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=''>

                <div>
                    <div className='frnd-see-all-div'>
                        <span className='single-frnd-see-all'>Friend request</span>
                        <Link href={'/friendsrequest'}>
                            <p className='frnd-see-all'>See all</p>
                        </Link>

                    </div>
                    <div >
                        {
                            friendRequestList.length > 0 ?
                                friendRequestList.map((item) =>
                                    <div className='single-friend-request-div'>
                                        <div className="" >
                                            {item.connected_user_id?.username == username ?
                                                <img
                                                    className='singl-frind-authr-img'
                                                    src={
                                                        item.user_id?.profile_pic == "" || item.user_id?.profile_pic == null
                                                            ? NoImage.src
                                                            : `${host}/uploads/${item.user_id?.profile_pic}`
                                                    }
                                                    alt=''
                                                />
                                                :
                                                <img
                                                    className='singl-frind-authr-img'
                                                    src={
                                                        item.connected_user_id?.profile_pic == "" || item.connected_user_id?.profile_pic == null
                                                            ? NoImage.src
                                                            : `${host}/uploads/${item.connected_user_id?.profile_pic}`
                                                    }
                                                    alt=''
                                                />
                                            }
                                        </div>
                                        <div>
                                            <div className='single-tag-hur-div'>
                                                {item.connected_user_id?.username == username ?
                                                    <h6>{item.user_id?.first_name} {item.user_id?.last_name}{" "}</h6>
                                                    :
                                                    <h6>{item.connected_user_id?.first_name} {item.connected_user_id?.last_name}{" "}</h6>
                                                }
                                                <p className='single-tag-hur-p'>
                                                    {formatDate(item.createdAt)} {" "}
                                                    <span>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='16'
                                                            height='16'
                                                            fill='green'
                                                            class='bi bi-dot'
                                                            viewBox='0 0 16 16'>
                                                            <path d='M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3' />
                                                        </svg>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className='single-frend-rqest-btn-div'>
                                                <button className='single-conferm-btn' onClick={() =>
                                                    acceptRequest(item._id, 1)
                                                }>Confirm</button>
                                                <button className='single-delete-btn' onClick={() =>
                                                    acceptRequest(item._id, 0)
                                                }>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                <>
                                    <div className='single-friend-request-div'>
                                        <div>

                                        </div>
                                        <div>
                                            <div className='single-tag-hur-div'>
                                                No Friends Request
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }

                    </div>


                    <Modal isOpen={isOpenModal.friendsBirthday} onRequestClose={() => setIsOpenModal({ friendsBirthday: false })} style={customStyles}>
                        {isOpenModal.friendsBirthday && <FriendsBrithdayModal setIsOpenModal={setIsOpenModal} birthDayFriendList={birthDayFriendList} />}
                    </Modal>
                    <div className='birthdayevent-texts-full-div'>
                        <h6>Birthdays</h6>
                        <div className='birthdayevent-texts-div'>
                            <span>
                                <BirthdayIcon />
                            </span>
                            <span onClick={handleFriendsBirthdayModal} className='birthdayevent-text'>
                                <strong className="tas_workplace_three_dots">Today you have {birthDayFriendList.length} friend {birthDayFriendList.length > 1 ? `'s` : ''} birthday</strong>.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='feated-tags-div mt-1'>
        <h6 className='featured-tags'>Featured User</h6>
    
      </div> */}

            <div>
                <div className='contacts-right-div'>
                    <p className='contcts-text'>Recent Chats</p>
                    <div className='contacts-right-svgs'>
                        <span>
                            <SearchIcon />
                        </span>
                        <span>
                            <div className=''>
                                <div className='more'>
                                    <div>
                                        <ThreedotIcon />
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>

                <div className='' style={{ cursor: "pointer" }}>
                    <div>
                        {
                            friendlist.length > 0 ?
                                friendlist.map((item) =>
                                    <div className='contact-single-id-div '>
                                        {item.connected_user_id?.username == username ?
                                            <Link href={`/messenger/${item?.user_id?._id}`}>
                                                <div className='singl-frind-authr-img-div d-flex align-items-center' >
                                                    <img
                                                        className='singl-frind-authr-img '
                                                        // onClick={() => { setMessageReceiverId(item.user_id._id), setSecondMessageReceiverId(item.user_id._id) }}
                                                        src={
                                                            item.user_id?.profile_pic == "" || item.user_id?.profile_pic == null
                                                                ? NoImage.src
                                                                : `${host}/uploads/${item.user_id?.profile_pic}`
                                                        }
                                                        alt=''
                                                    />
                                                    <p className='singl-frind-authr-text mx-2 mt-1'>
                                                        <h6 onClick={() => { setMessageReceiverId(item.user_id._id), setSecondMessageReceiverId(item.user_id._id) }}
                                                        >{item.user_id?.first_name} {item.user_id?.last_name}{" "}</h6>
                                                    </p>

                                                </div>
                                            </Link>
                                            :
                                            <Link href={`/messenger/${item?.connected_user_id?._id}`}>
                                                <div className='singl-frind-authr-img-div d-flex align-items-center' >
                                                    <img
                                                        className='singl-frind-authr-img'
                                                        // onClick={() => { setMessageReceiverId(item.connected_user_id._id), setSecondMessageReceiverId(item.user_id._id) }}

                                                        src={
                                                            item.connected_user_id?.profile_pic == "" || item.connected_user_id?.profile_pic == null
                                                                ? NoImage.src
                                                                : `${host}/uploads/${item.connected_user_id?.profile_pic}`
                                                        }
                                                        alt=''
                                                    />
                                                    <p className='singl-frind-authr-text mx-2 mt-1'>
                                                        <h6 onClick={() => { setMessageReceiverId(item.connected_user_id._id), setSecondMessageReceiverId(item.connected_user_id._id) }}
                                                        >{item.connected_user_id?.first_name} {item.connected_user_id?.last_name}{" "}</h6>
                                                    </p>

                                                </div>
                                            </Link>
                                        }
                                    </div>
                                )
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>

            <div style={{ borderTop: "1px solid rgb(226, 226, 226)" }}>
                <div className='contacts-right-div'>
                    <p className='contcts-text'>Group conversations</p>
                    <div className='contacts-right-svgs'>
                        <span>
                            <SearchIcon />
                        </span>
                        <span>
                            <div className=''>
                                <div className='more'>
                                    <div>
                                        <ThreedotIcon />
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>

                <div className='' style={{ cursor: "pointer" }}>
                    <div>
                        {
                            groupChatList.length > 0 ?
                                groupChatList.map((item) =>
                                    <div className='contact-single-id-div' onClick={() => setGroupItem(item)}>
                                        <div className='singl-frind-authr-img-div'>
                                            <img
                                                className='singl-frind-authr-img'
                                                onClick={() => { }}
                                                src={
                                                    item?.group_image == "" || item?.group_image == null
                                                        ? NoImage.src
                                                        : `${host}/uploads/messenger/${item?.group_image}`
                                                }
                                                alt=''
                                            />
                                        </div>
                                        <p className='singl-frind-authr-text'>
                                            <h6 onClick={() => { }}
                                            >{item.group_name}</h6>

                                        </p>
                                    </div>
                                )
                                :
                                <></>
                        }
                    </div>
                    <div className="tas_create_new_group" onClick={() => { setOpenCreateGroupPopup(true) }}>
                        <AddIcon />
                        <span className="tas_create_new_group_text">Create new group</span>
                    </div>
                </div>
            </div>


            {openCreateGroupPopup ? <CreateGroupPopup getGroupChatList={getGroupChatList} friendlist={friendlist} username={username} closeHandler={() => { setOpenCreateGroupPopup(false) }} /> : null}

            {/* {messageReceiverId && messageSenderId && <MessengerPopupFixedMessage messageReceiverId={messageReceiverId}
        secondMessageReceiverId={secondMessageReceiverId} connectedUsers={connectedUsers} setMessageReceiverId={setMessageReceiverId} messageSenderId={messageSenderId} />} */}



            {/* <GroupMessengerPopupFixedMessage
        groupItem={groupItem}
        getGroupChatList={getGroupChatList}
        setGroupItem={setGroupItem}
      /> */}
        </>
    );
}

export default BannaTestRightbarBackup;