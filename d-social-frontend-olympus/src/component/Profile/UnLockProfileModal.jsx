import React from 'react'
import Modal from 'react-modal';
import searchIcon from "../../../public/custom-svg-icon/circum_search.svg";
import groupSvg from "../../../public/custom-svg-icon/Group.svg";
import friendSvg from "../../../public/custom-svg-icon/friends.svg";
import Image from 'next/image';
import axiosInstance from '../../../utils/axios';
import { toast } from "react-toastify";


function UnLockProfileModal({ isOpen, onRequestClose, setLockProfile, lockState }) {
  const customStyles = {
    overlay: {
      zIndex: 1001,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {

      maxWidth: '35%',
      height: '45%',
      margin: 'auto',
    },

  };


  const handleUnLockProfile = () => {
    axiosInstance.post('/api/unlock-profile').then((res) => {

      if (res.data.status == 200) {
        if (typeof window !== "undefined") {

          localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        }

        toast.success(res.data.message, {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });
        setLockProfile(0);
        lockState(0);
        onRequestClose(false)
      }
    });
  }
  return (
    <Modal isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}>
      <div className="modal-content">

        <h2 className='text-center lock-modal-header'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="30"
            fill="#307777"
            className="bi bi-shield-lock mb-3"
            viewBox="0 0 16 16"
          >
            <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
            <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
          </svg>Unlock your profile</h2>


        <p className='text-center'>Your settingswill return to the way they were before you locked you profile. Any privacy  settins you changes after locking your profile will be stay the same</p>

        <div className='p-3'>
          <ul className="notification-list privacy-list">
            <li>
              <div className="author-thumb">
                <Image
                  src={friendSvg.src}
                  width="25"
                  className="bi bi-wallet2 olymp-explore-icon left-menu-icon mt-2"
                  height="25"
                />
              </div>
              <div className="notification-event">
                More People may see the photos, posts and stories on your profile

              </div>
            </li>

            <li>
              <div className="author-thumb">
                <Image
                  src={groupSvg.src}
                  width="25"
                  className="bi bi-wallet2 olymp-explore-icon left-menu-icon mt-2"
                  height="25"
                />
              </div>
              <div className="notification-event">
                More People may see your full-size profile picture and cover photo

              </div>
            </li>
            <li>
              <div className="author-thumb">
                <Image
                  src={searchIcon.src}
                  width="25"
                  className="bi bi-wallet2 olymp-explore-icon left-menu-icon mt-2"
                  height="25"
                />
              </div>
              <div className="notification-event">
                You can share potos, post and stories will anyone
              </div>
            </li>


          </ul>

        </div>

        <button className='post-btton' onClick={handleUnLockProfile}>Unlock Profile</button>
      </div>
    </Modal>
  )
}

export default UnLockProfileModal
