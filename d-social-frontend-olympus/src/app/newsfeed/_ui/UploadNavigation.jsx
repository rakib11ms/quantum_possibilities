import { feelingActivity, liveVideo, photoVideo } from '@/assets/newsfeed';
import React from 'react';
import Image from 'next/image';
import { customStyles } from '../../../../utils/customeStyle';
import Modal from 'react-modal';
import './UploadNavigation.css';
import FeelingsModal from './FeelingsModal';

export default function UploadNavigation({ isOpenModal, setIsOpenModal }) {
   return (
      <div>
         <div className=" navigation">
            <div className="button_navigation">
               <Image src={liveVideo} alt="live-video-icon" />
               <p>Live Video</p>
            </div>
            <div
               onClick={() => setIsOpenModal({ post: true, photoUpload: true })}
               className="button_navigation"
            >
               <Image src={photoVideo} alt="live-video-icon" />
               <p>Photo/Video</p>
            </div>
            <Modal
               isOpen={isOpenModal?.feeling}
               onRequestClose={() => setIsOpenModal({ feeling: false })}
               style={customStyles}
            >
               {isOpenModal?.feeling && <FeelingsModal setIsOpenModal={setIsOpenModal} />}
            </Modal>
            <button
               className="button_navigation tas_button_navigation"
               onClick={() => {
                  setIsOpenModal({ feeling: true });
               }}
            >
               <Image src={feelingActivity} alt="live-video-icon" />
               <p>Feeling/activity</p>
            </button>
         </div>
      </div>
   );
}
