import SearchIcon from '@/app/newsfeed/_svg-components/SearchIcon';
import React, { useEffect, useState } from 'react'
import ThreedotIcon from './_ui/Icons/ThreedotIcon';
import AddIcon from './_ui/Icons/AddIcon';
import CreateGroupPopup from './CreateGroupPopup';
import axiosInstance from '../../../utils/axios';
import { host } from '@/environment';
import NoImage from '../../assets/img/no_image_available.svg';
import useUserInfo from '@/hooks/useUserInfo';
import GroupMessengerPopupFixedMessage from '../AllMessengers/GroupMessengerPopupFixedMessage';

export default function GroupConversations({ friendlist = [], connectedUsers }) {
    const [groupChatList, setGroupChatList] = useState([]);
    const [openCreateGroupPopup, setOpenCreateGroupPopup] = useState(false)
    const [groupItem, setGroupItem] = useState(null)
    console.log("🚀 ~ GroupConversations ~ groupItem:", groupItem)

    const { userInfo } = useUserInfo()
    const getGroupChatList = () => {
        axiosInstance.get("/api/get-all-group-chat-info").then((res) => {
            if (res.data.status == 200) {
                setGroupChatList(res.data.all_group);
            }
        });
    };

    useEffect(() => {
        getGroupChatList();
    }, [])
    return (
        <div>
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


            {openCreateGroupPopup ? <CreateGroupPopup getGroupChatList={getGroupChatList} friendlist={friendlist} username={userInfo?.username} closeHandler={() => { setOpenCreateGroupPopup(false) }} /> : null}

            <GroupMessengerPopupFixedMessage
                groupItem={groupItem}
                getGroupChatList={getGroupChatList}
                setGroupItem={setGroupItem}
                connectedUsers={connectedUsers}
            />
        </div>
    )
}
