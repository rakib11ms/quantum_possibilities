import React, { useEffect, useState } from 'react'
import BirthdayIcon from './NewsFeed/_ui/Icons/BirthdayIcon'
import { customStyles } from '../../utils/customeStyle';
import FriendsBrithdayModal from './NewsFeed/FriendsBrithdayModal';
import axiosInstance from '../../utils/axios';
import Modal from "react-modal";

export default function BirthDay() {
    const [isOpenModal, setIsOpenModal] = useState({
        friendsBirthday: false,
    });
    const [birthDayFriendList, setBirthDayFriendList] = useState([]);

    const getBirthDayFriendList = () => {
        axiosInstance.get("/api/get-todays-birthday-friends").then((res) => {
            if (res.data.status == 200) {
                setBirthDayFriendList(res.data.results);
            }
        });
    };
    const birthDayFriendCount = birthDayFriendList.length
    const handleFriendsBirthdayModal = () => {
        if (birthDayFriendCount) {
            setIsOpenModal({ friendsBirthday: true })
        }
    }
    useEffect(() => {
        getBirthDayFriendList()
    }, [])
    return (
        <>
            <div className='birthdayevent-texts-full-div'>
                <h6>Birthdays</h6>
                <div className='birthdayevent-texts-div'>
                    <span>
                        <BirthdayIcon />
                    </span>
                    <span onClick={handleFriendsBirthdayModal} className='birthdayevent-text'>
                        <strong className="tas_workplace_three_dots">Today you have {birthDayFriendCount} friend {birthDayFriendCount > 1 ? `'s` : ''} birthday</strong>.
                    </span>
                </div>
            </div>
            <Modal isOpen={isOpenModal.friendsBirthday} onRequestClose={() => setIsOpenModal({ friendsBirthday: false })} style={customStyles}>
                {isOpenModal.friendsBirthday && <FriendsBrithdayModal setIsOpenModal={setIsOpenModal} birthDayFriendList={birthDayFriendList} />}
            </Modal>
        </>
    )
}
