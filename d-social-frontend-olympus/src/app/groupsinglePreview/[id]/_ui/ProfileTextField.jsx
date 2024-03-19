'use client';

import {
   DemoProfile,
   addTag,
   colorPicker,
   event,
   feelingActivity,
   gif,
   location,
   photoUpload,
} from '@/assets/newsfeed';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';

import PhotoUpload from './PhotoUpload';
import LocationModal from './LocationModal';
import TagPeopleModal from './TagPeopleModal';
import GifUploadModal from './GifUploadModal';
import EventModal from './EventModal';

import Divider from '@/component/Divider';
import { useDispatch, useSelector } from 'react-redux';
import {
   addPostData,
   insertPostData,
   localPostInfos,
   addPostDataInfo,
   localPostInfo,
   setLocalPostInfo,
} from '@/redux/features/GroupPost/groupPostSlice';
import { useSaveGroupPostMutation } from '@/redux/features/GroupPost/groupPostApi';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../../utils/axios';
import { customStyles } from '../../../../../utils/customeStyle';
import CrossIconSvg from '@/app/newsfeed/_svg-components/CrossIconSvg';
import useToaster from '@/hooks/useToaster';
import { host } from '@/environment';
import FeelingsModal from './FeelingsModal';
import Loading from '@/component/loader';

export default function ProfileTextField({ isOpenModal, setIsOpenModal }) {
   const [fullName, setFullName] = useState(null);
   const [profilePicture, setProfilePicture] = useState(null);
   const dispatch = useDispatch();
   useEffect(() => {
      if (localStorage.getItem('userInfo') != undefined) {
         const localStorageFullName = localStorage.getItem('fullname');
         const userImage = JSON.parse(localStorage.getItem('userInfo'));
         if (userImage) {
            setProfilePicture(userImage[0]?.profile_pic);
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
               {profilePicture !== null ? (
                  <img alt="author" src={`${host}/uploads/${profilePicture}`} className="avatar " />
               ) : (
                  <img
                     src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                     className="bi bi-wallet2 olymp-explore-icon left-menu-icon"
                     style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
               )}
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
               <input type="text" placeholder={`What’s on your mind, ${fullName}?`} />
            </div>
         </div>

         {/* Post Modal */}
         <Modal
            isOpen={isOpenModal?.post}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.post && (
               <TextFieldModalContent
                  setIsOpenModal={setIsOpenModal}
                  isOpenModal={isOpenModal}
                  fullName={fullName}
                  profilePicture={profilePicture}
               />
            )}
         </Modal>

         {/* Location Modal */}
         <Modal
            isOpen={isOpenModal?.location}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.location && <LocationModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Tag People Modal */}
         <Modal
            isOpen={isOpenModal?.tag}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.tag && <TagPeopleModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Gif Post Modal */}
         <Modal
            isOpen={isOpenModal?.gif}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.gif && <GifUploadModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Event Modal */}
         <Modal
            isOpen={isOpenModal?.event}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.event && <EventModal setIsOpenModal={setIsOpenModal} />}
         </Modal>

         {/* Feeling Modal */}
         <Modal
            isOpen={isOpenModal?.feeling}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.feeling && <FeelingsModal setIsOpenModal={setIsOpenModal} />}
         </Modal>
      </div>
   );
}

function TextFieldModalContent({ setIsOpenModal, isOpenModal, fullName, profilePicture }) {
   const [formData, setFormData] = useState({
      post: '',
      color: 'FFFFFF',
      file: '',
   });

   const addTextData = useSelector(addPostData);
   const localPostInfoGet = useSelector(localPostInfos);

   const dispatch = useDispatch();
   const [savePost, { isLoading, error, data, isSuccess }] = useSaveGroupPostMutation();

   const handleSubmit = async () => {
      savePost(addTextData);
      setIsOpenModal({ post: false });

      dispatch(insertPostData({ ...addPostDataInfo }));
   };

   if (isLoading) return <Loading />;
   if (isSuccess) toast.success('Post success!');

   return (
      <div className="content__wrapper">
         <div className="top__create__post__cross">
            <p></p>
            <p>Create Group post</p>
            <div
               style={{
                  cursor: 'pointer',
               }}
               onClick={() => {
                  setIsOpenModal({ post: false });
                  dispatch(insertPostData({ ...addPostDataInfo }));
                  dispatch(setLocalPostInfo({ ...localPostInfo }));
               }}
            >
               <CrossIconSvg />
            </div>
         </div>

         <Divider />

         <div className="profile__picture__name__wrapper">
            <img
               className="profile_image"
               width={49}
               src={`${host}/uploads/${profilePicture}`}
               alt="Profile_picture"
            />
            <div>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'start',
                     alignItems: 'center',
                     gap: '4px',
                  }}
               >
                  <div
                     style={{
                        fontWeight: '600',
                        display: 'flex',
                        flexWrap: 'wrap',
                        columnGap: '5px',
                        alignItems: 'center',
                     }}
                  >
                     <p
                        style={{
                           whiteSpace: 'nowrap',
                        }}
                     >
                        {fullName}
                     </p>
                     {localPostInfoGet.feelings && (
                        <div
                           style={{
                              display: 'flex',
                              justifyContent: 'start',
                              alignItems: 'center',
                              columnGap: '4px',
                           }}
                        >
                           <p>...is feelings</p>
                           <img
                              style={{
                                 width: '15px',
                              }}
                              src={`${host}/assets/logo/${localPostInfoGet.feelings_icon}`}
                              alt="feelings_icon"
                           />
                           <p> {localPostInfoGet.feelings}!</p>
                        </div>
                     )}

                     {localPostInfoGet.location && <p>at {localPostInfoGet.location} </p>}
                  </div>
               </div>
               {/* <select
            className="select__option__wrapper"
            name="post_privacy"
            id="post_privacy"
            onChange={(e) => {
              dispatch(
                insertPostData({
                  [e.target.name]: e.target.value,
                })
              );
            }}
          >
            <option value="public">Public</option>
            <option value="friends">Friends</option>
            <option value="only_me">Only me</option>
          </select> */}
            </div>
         </div>

         <form
            style={{
               position: 'relative',
            }}
            action=""
         >
            {isOpenModal.photoUpload ? (
               <PhotoUpload />
            ) : (
               <>
                  <textarea
                     className="text-area"
                     name="description"
                     onChange={(e) => {
                        dispatch(
                           insertPostData({
                              [e.target.name]: e.target.value,
                           }),
                        );
                     }}
                     id=""
                     type="text"
                     aria-autocomplete="off"
                     autoCapitalize="off"
                     value={addTextData?.description}
                     placeholder={`What's on your mind, ${fullName}?`}
                     style={{
                        backgroundColor: `#${addTextData?.post_background_color || formData.color}`,
                        textAlign: `${(addTextData?.post_background_color || formData.color) === 'FFFFFF' ? 'start' : 'center'}`,
                        paddingTop: `${(addTextData?.post_background_color || formData.color) === 'FFFFFF' ? '0px' : '80px'}`,
                        color: `${(addTextData?.post_background_color || formData.color) === 'FFFFFF' ? '#060505' : '#FFFFFF'}`,
                        width: '100%',
                        height: `200px`,
                        overflow: 'auto', // Allow vertical scrolling if content exceeds the height
                     }}
                  />
                  <ColorPicker setFormData={setFormData} />
               </>
            )}

            {/* Color Picker Section */}
            <PhotoLocationTagGifNavigation
               isOpenModal={isOpenModal}
               setIsOpenModal={setIsOpenModal}
               formData={formData}
            />

            <div></div>
            <button className="submit__button" onClick={handleSubmit} type="button">
               Post
            </button>
         </form>
      </div>
   );
}

function ColorPicker({ setFormData }) {
   const [colorPickerShow, setColorPickerShow] = useState(false);
   const dispatch = useDispatch();
   return (
      <div>
         <div className="color-picker-wrapper">
            <Image
               style={{
                  cursor: 'pointer',
                  zIndex: '20',
               }}
               onClick={() => {
                  setColorPickerShow(!colorPickerShow);
                  setFormData((prev) => ({
                     ...prev,
                     color: 'FFFFFF',
                  }));
               }}
               src={colorPicker}
               alt={'colorPicker'}
            />
            {colorPickerShow && (
               <div className="all__color__wrapper ">
                  {[
                     {
                        color: '000000',
                        name: 'black',
                     },
                     {
                        color: 'FFFFFF',
                        name: 'white',
                     },
                     {
                        color: 'FF0000',
                        name: 'red',
                     },
                     {
                        color: '00FF00',
                        name: 'green',
                     },
                     {
                        color: '0000FF',
                        name: 'blue',
                     },
                     {
                        color: 'FFFF00',
                        name: 'yellow',
                     },
                     {
                        color: '00FFFF',
                        name: 'cyan',
                     },
                     {
                        color: 'FF00FF',
                        name: 'magenta',
                     },
                  ].map((each, index) => (
                     <div
                        key={index}
                        onClick={() => {
                           setFormData((prev) => ({
                              ...prev,
                              color: each.color,
                           }));
                           dispatch(insertPostData({ post_background_color: each.color }));
                        }}
                        style={{
                           border: '1px solid #e7e7e7',
                           backgroundColor: each.name,
                           height: '18px',
                           width: '18px',
                           cursor: 'pointer',
                           borderRadius: '4px',
                        }}
                     ></div>
                  ))}
               </div>
            )}
            {/* hidden-color-picker */}
         </div>
      </div>
   );
}

function PhotoLocationTagGifNavigation({ setIsOpenModal, isOpenModal, formData }) {
   const dispatch = useDispatch();
   return (
      <>
         <div className="navigator__wrapper__post">
            <p>Add to your post</p>

            <div className="nav-list">
               {formData.color == 'FFFFFF' ? (
                  <Image
                     onClick={() => {
                        setIsOpenModal((pre) => ({
                           ...pre,
                           post: true,
                           photoUpload: !pre.photoUpload,
                        }));
                        dispatch(insertPostData({ ...addPostDataInfo }));
                     }}
                     style={{ cursor: 'pointer' }}
                     src={photoUpload}
                     alt="photo- uploaded"
                  />
               ) : (
                  <></>
               )}

               <Image
                  onClick={() => setIsOpenModal({ location: true })}
                  style={{ cursor: 'pointer' }}
                  src={location}
                  alt="icons"
               />

               <Image
                  onClick={() => setIsOpenModal({ tag: true })}
                  style={{ cursor: 'pointer' }}
                  src={addTag}
                  alt="icons"
               />
               <Image
                  onClick={() => setIsOpenModal({ feeling: true })}
                  src={feelingActivity}
                  alt="live-video-icon"
                  style={{ cursor: 'pointer' }}
               />
               <Image
                  onClick={() => setIsOpenModal({ gif: true })}
                  style={{ cursor: 'pointer' }}
                  src={gif}
                  alt="icons"
               />
               <Image
                  onClick={() => setIsOpenModal({ event: true })}
                  style={{ cursor: 'pointer' }}
                  src={event}
                  alt="icons"
               />
            </div>
         </div>
      </>
   );
}
