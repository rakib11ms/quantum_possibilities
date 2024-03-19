import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

import Image from 'next/image';
import axiosInstance from '../../../../utils/axios';
import { toast } from "react-toastify";
import { host } from '@/environment';


function ReviewModal({ isOpen, onRequestClose, pageDetails, getPageDetails, type }) {

    const [wordCount, setWordCount] = useState(0);
    const [content, setContent] = useState(0);
    const customStyles = {
        overlay: {
            zIndex: 1001,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {

            maxWidth: '40%',
            height: '40vh',
            margin: 'auto',
            overflowY: 'hidden'
        },

    };

    const handlePageReviews = (e) => {
        e.preventDefault();
        const formdata = {
            page_id: pageDetails._id,
            content: content,
            type: type
        }

        axiosInstance.post('/api/save-pages-reviews', formdata).then((res) => {

            if (res.data.status == 200) {


                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                onRequestClose(true)
                getPageDetails()
            }
        });
    }

    const handleChange = (e) => {
        const newContent = e.target.value;
        if (newContent.length <= 25) {
            setContent(newContent);
            setWordCount(newContent.length);
        }
    }

    return (
        <Modal isOpen={isOpen}
            style={customStyles}
            onRequestClose={onRequestClose}>
            <form onSubmit={handlePageReviews}>
                <div className="modal-content">

                    <span className='text-center lock-modal-header'>
                        <b>Recommend {pageDetails.page_name}</b>
                    </span>


                    <div className='p-3'>

                        <div className='settings-post-div'>
                            <div className='post-img-div'>
                                <img
                                    className='post-img'
                                    src={`${host}/uploads/pages/${pageDetails.profile_pic}`}
                                    alt=''
                                />
                            </div>
                            <div className='settings-post-in-div'>
                                <input
                                    required
                                    type='text'
                                    maxLength={'25'}
                                    placeholder={`What do you recommend about ${pageDetails.page_name}`}
                                    onChange={handleChange}
                                    className='settings-post-in'
                                />
                            </div>

                        </div>
                        <p className='text-center'>
                            {wordCount}/25 · Posts must be at least 25 characters
                        </p>
                    </div>






                </div>

                <button className='post-btton' type='submit'>Post Your Recommendation </button>
            </form>

        </Modal >
    )
}

export default ReviewModal
