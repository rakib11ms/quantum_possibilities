import React from 'react';
import "./FriendsBrithdayModal.css"
import CrossRoundIcon from '@/app/[username]/about/_ui/Icons/CrossRoundIcon';
import { host } from '@/environment';
import useUserInfo from '@/hooks/useUserInfo';
import axiosInstance from '../../../utils/axios';
import useToaster from '@/hooks/useToaster';
import moment from 'moment';

function FriendsBrithdayModal({ setIsOpenModal, birthDayFriendList }) {
    const { userInfo } = useUserInfo()
    const handleCloseModal = () => {
        setIsOpenModal({ friendsBirthday: false })
    }


    return (
        <div className='tas_friend_birthday_modal_container'>
            <div className='d-flex justify-content-between p-3'>
                <div></div>
                <p className='tas_friend_birthday_modal_title'>Friend's Birthdays</p>

                <span className='tas_workplace_three_dots' onClick={handleCloseModal}>
                    <CrossRoundIcon />
                </span>
            </div>

            <div className='tas_friend_birthday_modal_item_container'>

                {
                    userInfo && birthDayFriendList.map(i => <FriendsBirthdayItem friend={i.user_id._id == userInfo._id ? i.connected_user_id : i.user_id} handleCloseModal={handleCloseModal} />)
                }
                {/* <FriendsBirthdayItem to_user_id={''} />
                <FriendsBirthdayItem to_user_id={''} /> */}

            </div>

        </div>
    );
}
const FriendsBirthdayItem = ({ friend, handleCloseModal }) => {
    const [timelineText, setTimeLineText] = React.useState(null)

    const { showNotification } = useToaster()
    const handleInputChange = (event) => {
        setTimeLineText(event.target.value)
    }

    const handleEnterPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (timelineText) {
                const data = {
                    description: timelineText,
                    to_user_id: friend?._id,
                    post_type: 'birthday',
                    post_privacy:'friends'
                }

                axiosInstance.post('/api/save-post', data)
                    .then(res => {
                        showNotification('Birthday wished successfully !!')
                        setTimeLineText(null)
                        handleCloseModal()
                    })
            }
            console.log("timelineText", timelineText)
        }
    };


    return <>
        <div className='w-100 tas_friend_birthday_modal_line'></div>
        <div className='d-flex p-3'>
            <img className='tas_friend_birthday_item_img' src={`${host}/uploads/${friend?.profile_pic}`} />
            <div>
                <div className='tas_friend_birthday_item_name_container'>
                    <p className='tas_friend_birthday_item_name'>{[friend?.first_name, friend?.last_name].join(' ')}</p>
                    <p className='tas_friend_birthday_item_year'>{moment(friend?.date_of_birth).format('LL')}</p>
                </div>
                <input onChange={handleInputChange} value={timelineText} onKeyDown={handleEnterPress} className="tas_friend_birthday_item_input" placeholder='Write on her timeline...' />
            </div>
        </div>
    </>
}
export default FriendsBrithdayModal;