'use client';

import {
   DemoProfile,
   addTag,
   event,
   gif,
   location,
   photoUpload,
   feelingActivity,
} from '@/assets/newsfeed';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { customStyles } from '../../../../utils/customeStyle';
import CrossIconSvg from '../_svg-components/CrossIconSvg';
import PhotoUpload from './PhotoUpload';
import LocationModal from './LocationModal';
import TagPeopleModal from './TagPeopleModal';
import GifUploadModal from './GifUploadModal';
import EventModal from './EventModal';
import Divider from '@/component/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { addPagePostData, insertPostData, pagePosts } from '@/redux/features/Page/pageSlice';
import { useSavePagePostMutation } from '@/redux/features/Page/pageApiSlice';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../utils/axios';
import { host } from '@/environment';
import FeelingsModal from './FeelingsModal';
import TextFieldModalContent from './TextFieldModalContent';

export default function PageTextField({ isOpenModal, setIsOpenModal, pageDetails }) {
   const [fullName, setFullName] = useState(null);
   const [profilePicture, setProfilePicture] = useState(null);
   const dispatch = useDispatch();
   const [pageInfo, setPageInfo] = useState(null);
   useEffect(() => {
      if (pageDetails && pageDetails._id) {
         setPageInfo(pageDetails);
         dispatch(
            insertPostData({
               page_id: pageDetails._id,
            }),
         );
      }
   }, [pageDetails]);

   useEffect(() => {
      if (localStorage.getItem('userInfo') != undefined) {
         const localStorageFullName = localStorage.getItem('fullname');
         const localUserName = localStorage.getItem('username');
         const userImage = JSON.parse(localStorage.getItem('userInfo'));
         if (userImage) {
            setProfilePicture(userImage[0].profile_pic);
         }

         if (localStorageFullName) {
            setFullName(localStorageFullName);
         }
      }
   }, []);

   return (
      <div>
         <div className="padding__wrapper profile__textArea">
            <div className="profile__picture">
               {pageInfo?.profile_pic !== null ? (
                  <img
                     alt="author"
                     src={`${host}/uploads/pages/${pageInfo?.profile_pic}`}
                     className="avatar "
                  />
               ) : (
                  <img
                     src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                     className="bi bi-wallet2 olymp-explore-icon left-menu-icon"
                     style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
               )}
               {/* <Image src={DemoProfile} alt="Profile_picture" /> */}
            </div>
            <div
               onClick={() =>
                  setIsOpenModal((pre) => ({
                     ...pre,
                     post: true,
                  }))
               }
               className="input__box"
            >
               <input
                  type="text"
                  placeholder={`What’s on your mind ffff, ${pageInfo?.page_name}?`}
               />
            </div>
         </div>

         {/* Post Modal */}
         <Modal
            isOpen={isOpenModal.post}
            onRequestClose={() => setIsOpenModal({ post: false })}
            style={customStyles}
         >
            {isOpenModal.post && (
               <TextFieldModalContent
                  setIsOpenModal={setIsOpenModal}
                  isOpenModal={isOpenModal}
                  fullName={pageDetails.page_name}
                  profilePicture={pageDetails.profile_pic}
               />
            )}
         </Modal>

         {/* Location Modal */}
         <Modal
            isOpen={isOpenModal.location}
            onRequestClose={() => setIsOpenModal({ location: false })}
            style={customStyles}
         >
            {isOpenModal.location && <LocationModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Tag People Modal */}
         <Modal
            isOpen={isOpenModal.tag}
            onRequestClose={() => setIsOpenModal({ tag: false })}
            style={customStyles}
         >
            {isOpenModal.tag && <TagPeopleModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Gif Post Modal */}
         <Modal
            isOpen={isOpenModal.gif}
            onRequestClose={() => setIsOpenModal({ gif: false })}
            style={customStyles}
         >
            {isOpenModal.gif && <GifUploadModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Event Modal */}
         <Modal
            isOpen={isOpenModal.event}
            onRequestClose={() => setIsOpenModal({ event: false })}
            style={customStyles}
         >
            {isOpenModal.event && <EventModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Feeling Modal */}
         <Modal
            isOpen={isOpenModal.feeling}
            onRequestClose={() => setIsOpenModal({ feeling: false })}
            style={customStyles}
         >
            {isOpenModal.feeling && <FeelingsModal setIsOpenModal={setIsOpenModal} />}
         </Modal>
      </div>
   );
}
