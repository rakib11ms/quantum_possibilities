import { addTag, event, feelingActivity, gif, location, photoUpload } from '@/assets/newsfeed';
import { addPostData, insertPostData } from '@/redux/features/NewsFeed/newsFeedSlice';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function PhotoLocationTagGifNavigation({ setIsOpenModal, isOpenModal, formData }) {
   const dispatch = useDispatch();
   const addTextData = useSelector(addPostData);
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
                        }))
                        if(addTextData?.post_background_color){
                           dispatch(
                              insertPostData({
                                 post_background_color: '',
                              }),
                           );
                        }

                     }
                     }
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
