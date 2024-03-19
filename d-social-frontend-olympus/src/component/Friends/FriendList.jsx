import { host } from '@/environment';
import useUserInfo from '@/hooks/useUserInfo';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axios';
import SearchIcon from '@/app/newsfeed/_svg-components/SearchIcon';
import ThreedotIcon from '../NewsFeed/_ui/Icons/ThreedotIcon';
import { socket } from "@/app/layout"
import NoImage from '../../assets/img/no_image_available.svg';

import MessengerPopupFixedMessage from '../AllMessengers/MessengerPopupFixedMessage';

export default function FriendList() {
    const [friendlist, setFriendList] = useState([]);

    const { userInfo } = useUserInfo();

    const [messageReceiverId, setMessageReceiverId] = useState(null);
    const [secondMessageReceiverId, setSecondMessageReceiverId] = useState("");
    const [firstMessageTriggered, setFirstMessageTriggered] = useState(false);
    const [messageSenderId, setMessageSenderId] = useState("");

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

    useEffect(() => {
        getFriendList(localStorage.getItem('username'))

        if (typeof window !== "undefined") {
            const localUserInfo = localStorage.getItem("userInfo");

            if (localUserInfo) {
                setMessageSenderId(JSON.parse(localUserInfo)[0]._id);
            }
        }

    }, [])


    const [connectedUsers, setConnectedUsers] = useState([]);
    useEffect(() => {
  
      const handleGetUsers = users => {
        if (connectedUsers.length !== users.length) {
          setConnectedUsers(users);
        }
      };
  
      socket.on("getUsers", handleGetUsers);
      return () => {
        socket.off("getUsers", handleGetUsers);
      };
    }, [connectedUsers]);

    socket.emit("addUser", messageSenderId)
    return (
        <>
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
                                        {item.connected_user_id?.username == userInfo?.username ?
                                            <div href={`/messenger/${item?.user_id?._id}`}>
                                                <div className='singl-frind-authr-img-div d-flex align-items-center' >
                                                    <img
                                                        className='singl-frind-authr-img '
                                                        onClick={() => { setMessageReceiverId(item.user_id._id), setSecondMessageReceiverId(item.user_id._id) }}
                                                        src={
                                                            item.user_id?.profile_pic == "" || item.user_id?.profile_pic == null
                                                                ? NoImage.src


                                                                : `${host}/uploads/${item.user_id?.profile_pic}`
                                                        }
                                                        alt=''
                                                    />
                                                    <p className='singl-frind-authr-text mx-2 mt-1'>
                                                        <h6 onClick={() => {
                                                            setMessageReceiverId(item.user_id._id),
                                                                setSecondMessageReceiverId(item.user_id._id)
                                                        }}
                                                        >{item.user_id?.first_name} {item.user_id?.last_name}{" "}</h6>
                                                    </p>

                                                </div>
                                            </div>
                                            :
                                            <div href={`/messenger/${item?.connected_user_id?._id}`}>
                                                <div className='singl-frind-authr-img-div d-flex align-items-center' >
                                                    <img
                                                        className='singl-frind-authr-img'
                                                        onClick={() => { setMessageReceiverId(item.connected_user_id._id), setSecondMessageReceiverId(item.user_id._id) }}

                                                        src={
                                                            item.connected_user_id?.profile_pic == "" || item.connected_user_id?.profile_pic == null
                                                                ? NoImage.src
                                                                : `${host}/uploads/${item.connected_user_id?.profile_pic}`
                                                        }
                                                        alt=''
                                                    />
                                                    <p className='singl-frind-authr-text mx-2 mt-1'>
                                                        <h6 onClick={() => {
                                                            setMessageReceiverId(item.connected_user_id._id),
                                                                setSecondMessageReceiverId(item.connected_user_id._id)
                                                        }}
                                                        >{item.connected_user_id?.first_name} {item.connected_user_id?.last_name}{" "}</h6>
                                                    </p>

                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
            {messageReceiverId && messageSenderId && <MessengerPopupFixedMessage messageReceiverId={messageReceiverId}
                secondMessageReceiverId={secondMessageReceiverId} connectedUsers={connectedUsers} setMessageReceiverId={setMessageReceiverId} messageSenderId={messageSenderId} />}
        </>


    )
}
