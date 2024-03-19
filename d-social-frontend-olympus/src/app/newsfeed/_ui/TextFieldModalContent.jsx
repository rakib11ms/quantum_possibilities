import { useDispatch } from 'react-redux';
import ColorPicker from './ColorPicker';
import PhotoLocationTagGifNavigation from './PhotoLocationTagGifNavigation';
import { useSelector } from 'react-redux';
import { addPagePostData } from '@/redux/features/Page/pageSlice';
import { useEffect, useState } from 'react';
import { useSavePagePostMutation } from '@/redux/features/Page/pageApiSlice';
import CrossIconSvg from '../_svg-components/CrossIconSvg';
import Divider from '@/component/Divider';
import PhotoUpload from './PhotoUpload';
import { host } from '@/environment';
import { insertPostData } from '@/redux/features/NewsFeed/newsFeedSlice';

export default function TextFieldModalContent({
   setIsOpenModal,
   isOpenModal,
   fullName,
   profilePicture,
}) {
   const [formData, setFormData] = useState({
      post: '',
      color: 'FFFFFF',
      file: '',
   });

   const addPagePostTextData = useSelector(addPagePostData);
   const dispatch = useDispatch();
   const [savePagePost, { isLoading, error, data, isSuccess }] = useSavePagePostMutation();

   const handleSubmit = async () => {
      savePagePost(addPagePostTextData);
      setIsOpenModal({ post: false });
   };
   console.log(addPagePostTextData, 'addPagePostTextData');
   useEffect(() => {
      if (isSuccess) toast.success('Post success!');
   }, [isSuccess]);

   return (
      <div className="content__wrapper">
         <div className="top__create__post__cross">
            <p></p>
            <p>Create post</p>
            <div
               style={{
                  cursor: 'pointer',
               }}
               onClick={() => setIsOpenModal({ post: false })}
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
               <p>{fullName}</p>
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
