import React from 'react';
import CrossIcon from './_ui/Icons/CrossIcon';
import Select from 'react-select'
import "./CreateGroupPopup.css"
import { host } from '@/environment';
import axiosInstance from '../../../utils/axios';
import { toast } from 'react-toastify';
import useUserInfo from '@/hooks/useUserInfo';


const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps} className='d-flex tas_group_chat_friend_container' style={{ cursor: "pointer" }} >
        <img src={data.img} className='tas_group_chat_friend_img' />
        {label}
    </div>
);

function CreateGroupPopup({ closeHandler, friendlist, username, getGroupChatList }) {
    const [selectedFriendList, setSelectedFriendList] = React.useState([])
    const [groupName, setGroupName] = React.useState(null)
    const { userInfo } = useUserInfo();

    const handleSubmit = async () => {
        let friendListSelected = selectedFriendList.map(item => item.value)
        friendListSelected.push(userInfo._id)

        axiosInstance.post("/api/save-group-chat-info", {
            group_name: groupName,
            members: friendListSelected
        }).then((res) => {
            if (res.data.status === 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                getGroupChatList()
            }
        })
        setSelectedFriendList([])
        setGroupName("")
        closeHandler()
    }
    const options = friendlist?.map(item => {
        if (item.connected_user_id?.username == username) {
            return {
                value: item?.user_id?._id,
                label: `${item?.user_id?.first_name} ${item?.user_id?.last_name}`,
                img: `${host}/uploads/${item?.user_id?.profile_pic}`
            }
        } else {
            return {
                value: item?.connected_user_id?._id,
                label: `${item?.connected_user_id?.first_name} ${item?.connected_user_id?.last_name}`,
                img: `${host}/uploads/${item?.connected_user_id?.profile_pic}`
            }
        }

    })

    return (
        <div style={{ position: 'fixed', backgroundColor: "white", padding: "0px" }} className={"messenger-chat-main-wrapper-newsfeed messenger-chat-single-newsfeed-show"}>
            <div className='shadow-sm'>
                <div className='fixed-tops p-3'>
                    <div className='header-messenger-top d-flex py-2 justify-content-between card-header'>
                        <h6 className='mt-1'>Create Group Chat</h6>
                        <span style={{ cursor: "pointer" }} onClick={closeHandler}>
                            <CrossIcon />
                        </span>
                    </div>

                    <div>
                        <input value={groupName} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder='Group Name' class="form-control mt-2 border border-secondary" style={{ height: "30px" }} />
                    </div>

                    <div className='mt-3'>
                        <Select
                            closeMenuOnSelect={false}
                            components={{ Option: CustomOption }}
                            isMulti
                            options={options}
                            className="tas_group_friend_select"
                            placeholder="To: "
                            onChange={setSelectedFriendList}
                            value={selectedFriendList}
                        />
                    </div>
                </div>
            </div>

            <div className="tas_button_container mt-4">
                <input type="submit" onClick={handleSubmit} className="tas_submit_btn" value="Create Group chat" />
            </div>

        </div>
    );
}

export default CreateGroupPopup;