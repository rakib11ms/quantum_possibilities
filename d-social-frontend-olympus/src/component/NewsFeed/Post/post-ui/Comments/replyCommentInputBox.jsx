'use client';

import {
   replyCommentFormData,
   setReplyCommentFormData,
} from '@/redux/features/NewsFeed/commentSlice';
import { useReplySaveCommentMutation } from '@/redux/features/NewsFeed/newsFeedApi';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImojiAction from './svg/ImojiAction';
import CameraIconSvg from './svg/CameraIconSvg';
import GitIconSvg from './svg/GitIconSvg';
import ActionAbleImageSvg from './svg/ActionAbleImageSvg';
import CommentReplyButton from './svg/CommentReplyButton';
import EmojiPicker from 'emoji-picker-react';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function ReplyCommentReplyInputBox({
   userInfo,
   setReplyView,
   comment,
   postInformation,
}) {
   const [inputValue, setInputValue] = useState('');
   const dispatch = useDispatch();
   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   const ref = useRef(null);

   useOutsideClick(ref, () => {
      setShowEmojiPicker(false);
   });

   const replyCommentData = useSelector(replyCommentFormData);
   const handleInputChange = (event, postId, commentId) => {
      setInputValue(event.target.value);
      dispatch(
         setReplyCommentFormData({
            comment_id: commentId,
            replies_user_id: userInfo?._id,
            replies_comment_name: event.target.value,
            post_id: postId,
         }),
      );
   };

   const handleTextareaResize = (event) => {
      event.target.style.height = 'auto';
      event.target.style.height = `${event.target.scrollHeight}px`;
   };

   const handleEnterPress = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
         event.preventDefault();
         handleSubmit();
      }
   };
   const handleCommentButtonClick = (event) => {
      handleSubmit();
      setShowEmojiPicker(false);
   };

   const [replySaveComment, { data, isLoading, error }] = useReplySaveCommentMutation();

   const handleSubmit = async () => {
      await replySaveComment(replyCommentData);
      setReplyView(false);
      setInputValue('');
   };

   const fileInputRef = useRef(null);
   const [inputImageValue, setInputImageValue] = useState('');
   const onImageChange = (event) => {
      event.preventDefault();
      const uploadedFiles = event.target.files;
      const newFilesArray = [];
      console.log(event.target.files, 'files');
      for (let i = 0; i < uploadedFiles.length; i++) {
         const file = uploadedFiles[i];
         newFilesArray.push(file);
      }

      setInputImageValue([...inputImageValue, ...newFilesArray]);
   };

   return (
      <div
         style={{
            width: '100%',
            position: 'relative',
         }}
      >
         <textarea
            style={{
               width: '100%',
               minHeight: '5px',
               resize: 'none',
               backgroundColor: '#F0F2F5',
               padding: '2px 10px',
               borderRadius: '8px',
               paddingTop: '10px',
            }}
            value={inputValue}
            onChange={(e) => {
               handleInputChange(e, postInformation.post_id, comment);
            }}
            onInput={handleTextareaResize}
            onKeyDown={handleEnterPress}
            name="photo_status"
            id="photo_status"
            placeholder="Write your comment here"
         />

         <div
            style={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               width: '100%',
               padding: '0px 10px',
            }}
            className=""
         >
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
               }}
            >
               <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => {
                     onImageChange(e, postInformation.post_id);
                  }}
                  accept="image/*"
                  style={{ display: 'none' }}
               />

               <div ref={ref}>
                  <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                     <ImojiAction className={'each_button'} />
                  </div>
                  {/* {showEmojiPicker && (
                     <EmojiPicker
                        emojiStyle="facebook"
                        searchPlaceHolder=""
                        searchDisabled={true}
                        previewConfig={{ showPreview: false }}
                        onEmojiClick={(e) => {
                           setInputValue((prevMessage) => prevMessage + e.emoji);
                        }}
                        width={280}
                        height={300}
                        style={{
                           boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                           '--epr-emoji-size': '20px',
                           zIndex: '200',
                        }}
                     />
                  )} */}
               </div>

               <div onClick={(e) => fileInputRef.current.click()}>
                  <CameraIconSvg className={'each_button'} />
               </div>
               {/* <GitIconSvg className={"each_button"} />
        <ActionAbleImageSvg className={"each_button"} /> */}
            </div>
            <button type="button" onClick={handleCommentButtonClick}>
               <CommentReplyButton />
            </button>
         </div>
      </div>
   );
}
