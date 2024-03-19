

import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'

import StyleCSS from './waring.module.css';

import Link from 'next/link';

function WarningModal({ isOpen, onRequestClose, sendDataToParent }) {




    const customStyles = {
        overlay: {
            zIndex: 1001,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {

            maxWidth: '850px',
            height: '250px',
            margin: 'auto',
        },

    };
    return (
        <Modal isOpen={isOpen}
            style={customStyles}
            onRequestClose={onRequestClose}>
            <div className='row mx-auto' style={{ borderBottom: '2px solid black' }}>
                <div className='col-md-6 '>
                    <p className=' f-700 fs-15' style={{ fontSize: '24px' }}>
                        <b>
                            Discard story?
                        </b>
                    </p>

                </div>
                <hr />
                <div className='col-md-6 d-flex justify-content-end align-items-center'>
                    <div>
                        {/* <button onClick={onRequestClose}>Close</button> */}
                        <span onClick={onRequestClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </span>
                    </div>
                </div>


            </div>


            <div className='row mx-auto'>


                <div className='col-md-12'>
                    {/* <b>Discard Story?</b> */}
                    <h4>Are you sure you want to discard this story? Your story won't be saved.</h4>
                </div>
            </div>
            <div className='float-right d-flex'>
                <button onClick={onRequestClose} className={`pr-5 ${StyleCSS.discardBtton}`} >
                    Continue Editing
                </button>


                <Link href='/newsfeed' className={`pl-2 ml-2  post-btton`} style={{ padding: '15px 15px ' }}>
                    Discard Story
                </Link>


            </div>


        </Modal >
    )
}

export default WarningModal