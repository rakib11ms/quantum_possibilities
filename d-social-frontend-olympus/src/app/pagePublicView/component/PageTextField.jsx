'use client';

import {
   addTag,
   colorPicker,
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
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { host } from '@/environment';
import Loading from '@/component/loader';
import CrossIconSvg from '@/app/newsfeed/_svg-components/CrossIconSvg';
import PhotoUpload from '@/app/newsfeed/_ui/PhotoUpload';
import LocationModal from '@/app/newsfeed/_ui/LocationModal';
import TagPeopleModal from '@/app/newsfeed/_ui/TagPeopleModal';
import GifUploadModal from '@/app/newsfeed/_ui/GifUploadModal';
import EventModal from '@/app/newsfeed/_ui/EventModal';
import Divider from '@/component/Divider';
import FeelingsModal from '@/app/newsfeed/_ui/FeelingsModal';
import {
   addPagePostData,
   addPagePostDataInfo,
   insertPostData,
   localPostInfos,
   localPostInfo,
   setLocalPostInfo,
} from '@/redux/features/Page/pageSlice';
import { useSavePagePostMutation } from '@/redux/features/Page/pageApiSlice';

export default function PageTextField({ isOpenModal, setIsOpenModal, pageDetails }) {
   console.log('...PageDetails', pageDetails);
   const [fullName, setFullName] = useState(null);
   const [profilePicture, setProfilePicture] = useState(null);
   const dispatch = useDispatch();

   useEffect(() => {
      // if (localStorage.getItem("userInfo") != undefined) {
      //   const localStorageFullName = localStorage.getItem("fullname");
      //   const userImage = JSON.parse(localStorage.getItem("userInfo"));
      //   if (userImage) {
      //     setProfilePicture(userImage[0].profile_pic);
      //   }

      //   if (localStorageFullName) {
      //     setFullName(localStorageFullName);
      //   }
      // }
      console.log('...pageDetails', pageDetails);
      if (pageDetails) {
         setFullName(pageDetails?.page_name);
         setProfilePicture(pageDetails?.profile_pic);
      }
   }, [pageDetails]);

   return (
      <div>
         <div className="padding__wrapper profile__textArea">
            <div className="profile__picture">
               {profilePicture !== null ? (
                  <img
                     alt="author"
                     src={`${host}/uploads/pages/${profilePicture}`}
                     className="avatar "
                  />
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
               dispatch(insertPostData({ ...addPagePostDataInfo }));
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
                  pageDetails={pageDetails}
               />
            )}
         </Modal>

         {/* Location Modal */}
         <Modal
            isOpen={isOpenModal?.location}
            onRequestClose={() => {
               setIsOpenModal({ location: false });
               dispatch(insertPostData({ ...addPagePostDataInfo }));
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
               dispatch(insertPostData({ ...addPagePostDataInfo }));
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
               dispatch(insertPostData({ ...addPagePostDataInfo }));
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
               dispatch(insertPostData({ ...addPagePostDataInfo }));
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
               dispatch(insertPostData({ ...addPagePostDataInfo }));
               dispatch(setLocalPostInfo({ ...localPostInfo }));
            }}
            style={customStyles}
         >
            {isOpenModal?.feeling && <FeelingsModal setIsOpenModal={setIsOpenModal} />}
         </Modal>
      </div>
   );
}

function TextFieldModalContent({
   setIsOpenModal,
   isOpenModal,
   fullName,
   profilePicture,
   pageDetails,
}) {
   const [formData, setFormData] = useState({
      post: '',
      color: 'FFFFFF',
      file: '',
   });

   let addTextData = useSelector(addPagePostData);
   const localPostInfoGet = useSelector(localPostInfos);

   const dispatch = useDispatch();
   const [savePagePost, { isLoading, error, data, isSuccess }] = useSavePagePostMutation();

   const handleSubmit = async () => {
      addTextData = {
         ...addTextData,
         page_id: pageDetails?._id,
         user_id: pageDetails?.user_id,
         ...localPostInfoGet,
      };
      console.log('...addTextData', addTextData);
      await savePagePost(addTextData);
      setIsOpenModal({ post: false });
      dispatch(insertPostData({ ...addPagePostDataInfo }));
   };

   if (isLoading) return <Loading />;
   if (isSuccess) toast.success('Post success!');

   return (
      <div className="content__wrapper">
         <div className="top__create__post__cross">
            <p></p>
            <p>Create post</p>
            <div
               style={{
                  cursor: 'pointer',
               }}
               onClick={() => {
                  setIsOpenModal({ post: false });
                  dispatch(insertPostData({ ...addPagePostDataInfo }));
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
               src={`${host}/uploads/pages/${profilePicture}`}
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
                  {/* with Munna, Anik Islam, */}
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
               <select
                  className="select__option__wrapper"
                  name="post_privacy"
                  id="post_privacy"
                  onChange={(e) => {
                     dispatch(
                        insertPostData({
                           [e.target.name]: e.target.value,
                        }),
                     );
                  }}
               >
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="only_me">Only me</option>
               </select>
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
                     placeholder={`What's on your mind, ${fullName}?`}
                     style={{
                        backgroundColor: `#${formData.color}`,
                        textAlign: `${formData.color === 'FFFFFF' ? 'start' : 'center'}`,
                        paddingTop: `${formData.color === 'FFFFFF' ? '0px' : '80px'}`,
                        color: `${formData.color === 'FFFFFF' ? '#060505' : '#FFFFFF'}`,
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
                        dispatch(insertPostData({ ...addPagePostDataInfo }));
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
