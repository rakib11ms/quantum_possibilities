import { host } from '@/environment';
import {
   addPostData,
   addPostDataInfo,
   insertPostData,
   localPostInfo,
   localPostInfos,
   setLocalPostInfo,
} from '@/redux/features/NewsFeed/newsFeedSlice';
import { useSelector, useDispatch } from 'react-redux';
import PhotoUpload from './PhotoUpload';
import ColorPicker from './ColorPicker';
import PhotoLocationTagGifNavigation from './PhotoLocationTagGifNavigation';
import Divider from '@/component/Divider';
import CrossIconSvg from '../_svg-components/CrossIconSvg';
import Loading from '@/component/loader';
import { useState } from 'react';
import { useEditPostMutation, useSavePostMutation } from '@/redux/features/NewsFeed/newsFeedApi';

export default function TextFieldModalContentProfile({
   setIsOpenModal,
   isOpenModal,
   fullName,
   profilePicture,
   postData,
   setModalOpen,
}) {
   const [formData, setFormData] = useState({
      post: '',
      color: 'FFFFFF',
      file: '',
   });

   const addTextData = useSelector(addPostData);
   const localPostInfoGet = useSelector(localPostInfos);

   const dispatch = useDispatch();
   const [savePost, { isLoading, error, data, isSuccess }] = useSavePostMutation();
   const [editPost] = useEditPostMutation();

   const handleSubmit = async () => {
      if (!postData) {
         console.log('1111111');
         savePost(addTextData);
         // setModalOpen(false);
         setIsOpenModal({ post: false });
         dispatch(insertPostData({ ...addPostDataInfo }));
      } else {
         console.log('222222');
         editPost({ ...addTextData, post_id: postData.post_id });
         setIsOpenModal({ post: false });
         setModalOpen(false);
         dispatch(insertPostData({ ...addPostDataInfo }));
      }
   };

   if (isLoading) return <Loading />;
   if (isSuccess) toast.success('Post success!');
   console.log(localPostInfoGet,'addTextData__', addTextData);
   return (
      <div className="content__wrapper">
         <div className="top__create__post__cross">
            <p></p>
            <p>{postData ? 'Editing post' : 'Create post'}</p>
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
                     {localPostInfoGet.tagsPeople.length > 0 && (
                        <p>
                           with{' '}
                           {localPostInfoGet.tagsPeople.slice(0, 2).map((person, index) => (
                              <span key={index}>
                                 {person}
                                 {index < 1 && localPostInfoGet.tagsPeople.length > 1 ? ', ' : ''}
                              </span>
                           ))}
                           {localPostInfoGet.tagsPeople.length > 2 && (
                              <span> +{localPostInfoGet.tagsPeople.length - 2}</span>
                           )}
                        </p>
                     )}
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
            {isOpenModal.photoUpload || postData?.media?.length > 0 ? (
               <PhotoUpload postData={postData} />
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
                     defaultValue={postData?.description || addTextData?.description ||''}
                     type="text"
                     aria-autocomplete="off"
                     autoCapitalize="off"
                     placeholder={`What's on your mind, ${fullName}?`}
                     style={{
                        backgroundColor: `#${addTextData.post_background_color === '' ? 'FFFFFF' : addTextData.post_background_color}`,
                        textAlign: `${
                           //  addTextData.post_background_color === 'FFFFFF' ||
                           addTextData.post_background_color === '' ? 'start' : 'center'
                        }`,
                        paddingTop: `${
                           //  addTextData.post_background_color === 'FFFFFF' ||
                           addTextData.post_background_color === '' ? '0px' : '80px'
                        }`,
                        color: `${
                           //  addTextData.post_background_color === 'FFFFFF' ||
                           addTextData.post_background_color === '' ||
                           addTextData.post_background_color === 'FFFFFF'
                              ? '#060505'
                              : '#FFFFFF'
                        }`,
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

            <button className="submit__button" onClick={handleSubmit} type="button">
               {postData && 'Edit '}Post
            </button>
         </form>
      </div>
   );
}
