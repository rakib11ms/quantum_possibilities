import React, { useState, useEffect } from 'react'
import './sty.css'

import authImage from "../../../public/img/author-page.jpg";

function Comment() {
    // const [replyMode, setReplyMode] = useState(false);
    // const [replyText, setReplyText] = useState("Woow, amazing");
    // const [replyRepMode, setReplyRepMode] = useState(false);
    // const [replyRepText, setReplyRepText] = useState("No It's Not");
    // const [replyRepRepMode, setReplyRepRepMode] = useState(false);
    // const [replyRepRepText, setReplyRepRepText] = useState("Sometimes yes");

    // const handleToggleReply = () => {
    //     setReplyMode(!replyMode);
    // };

    // const handleReplyInputChange = (event) => {
    //     setReplyText(event.target.value);
    // };

    // const handleReplySubmit = (event) => {
    //     if (event.key === "Enter") {
    //         // If Enter key is pressed, save the reply and exit reply mode
    //         setReplyMode(false);
    //     }
    // };

    // const handleToggleReplyRep = () => {
    //     setReplyRepMode(!replyRepMode);
    // };

    // const handleReplyInputChangeRep = (event) => {
    //     setReplyRepText(event.target.value);
    // };

    // const handleReplySubmitRep = (event) => {
    //     if (event.key === "Enter") {
    //         // If Enter key is pressed, save the reply and exit reply mode
    //         setReplyRepMode(false);
    //     }
    // };

    // const handleToggleReplyRepRep = () => {
    //     setReplyRepRepMode(!replyRepRepMode);
    // };

    // const handleReplyInputChangeRepRep = (event) => {
    //     setReplyRepRepText(event.target.value);
    // };

    // const handleReplySubmitRepRep = (event) => {
    //     if (event.key === "Enter") {
    //         // If Enter key is pressed, save the reply and exit reply mode
    //         setReplyRepRepMode(false);
    //     }
    // };
    return (
        <>
            {/* 
            <div className='container g-cmnt-full-div'>
                <div className='row'>
                    <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                        <img className='g-cmnt-auth-img' src={authImage.src} alt='' />
                    </div>

                    <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 '>
                        <input
                            className='g-cmnt-inpu'
                            type='text'
                            placeholder='write comment'
                        />

                        <div className='row mt-2'>
                            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                                <img className='g-cmnt-auth-img' src={authImage.src} alt='' />
                            </div>

                            <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9'>
                                <h6>Aminul Islam</h6>
                                {replyMode ? (
                                    <input
                                        className='g-cmnt-inpu'
                                        type='text'
                                        placeholder='Type a new reply'
                                        value={replyText}
                                        onChange={handleReplyInputChange}
                                        onKeyPress={handleReplySubmit}
                                    />
                                ) : (
                                    <p>{replyText}</p>
                                )}
                                <div className='cmnt-repl-div'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-emoji-smile'
                                        viewBox='0 0 16 16'>
                                        <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                        <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
                                    </svg>

                                    <p>Delete</p>

                                    <svg
                                        onClick={handleToggleReply}
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-reply-all'
                                        viewBox='0 0 16 16'>
                                        <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                                        <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                                    </svg>
                                </div>

                                <div className='row'>
                                    <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                                        <img className='g-cmnt-auth-img' src={authImage.src} alt='' />
                                    </div>
                                    <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9'>
                                        <h6>Rakibul Islam</h6>
                                        {replyRepMode ? (
                                            <input
                                                className='g-cmnt-inpu'
                                                type='text'
                                                placeholder='Type a new reply'
                                                value={replyRepText}
                                                onChange={handleReplyInputChangeRep}
                                                onKeyPress={handleReplySubmitRep}
                                            />
                                        ) : (
                                            <p>{replyRepText}</p>
                                        )}

                                        <div className='cmnt-repl-div'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='bi bi-emoji-smile'
                                                viewBox='0 0 16 16'>
                                                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                                <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
                                            </svg>

                                            <p>Delete</p>

                                            <svg
                                                onClick={handleToggleReplyRep}
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='bi bi-reply-all'
                                                viewBox='0 0 16 16'>
                                                <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                                                <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                        <p>20 min ago</p>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                                        <img className='g-cmnt-auth-img' src={authImage.src} alt='' />
                                    </div>
                                    <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9'>
                                        <h6>Hemu Islam</h6>
                                        {replyRepRepMode ? (
                                            <input
                                                className='g-cmnt-inpu'
                                                type='text'
                                                placeholder='Type a new reply'
                                                value={replyRepRepText}
                                                onChange={handleReplyInputChangeRepRep}
                                                onKeyPress={handleReplySubmitRepRep}
                                            />
                                        ) : (
                                            <p>{replyRepRepText}</p>
                                        )}

                                        <div className='cmnt-repl-div'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='bi bi-emoji-smile'
                                                viewBox='0 0 16 16'>
                                                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                                <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
                                            </svg>

                                            <p>Delete</p>

                                            <svg
                                                onClick={handleToggleReplyRepRep}
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='bi bi-reply-all'
                                                viewBox='0 0 16 16'>
                                                <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                                                <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                        <p>20 min ago</p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                <p>20 min ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className='comment-section pt-5'>
                <div className='comment-section-wrapper bg-white '>
                    <div className='comment-header-with-form '>
                        <div className='comment-header-image'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy2hMfXwz82PCLi8Cz1AzwHsNp9jOd9iqZd9fhHFI1&s' className='comment-header-image-person' />
                        </div>
                        <div className='comment-header-form'>

                            <input type="text" class="comment-input border" id="exampleFormControlInput1" placeholder="Type comment" />
                        </div>
                    </div>

                    <div className='main-comment-wrapper '>
                        {/* <div className='main-comment-person-image border'> */}
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy2hMfXwz82PCLi8Cz1AzwHsNp9jOd9iqZd9fhHFI1&s' className='main-comment-person-image-1' />
                        {/* </div> */}
                        <div className='main-comment-text'>
                            <div className='comment-txt-person-name'>
                                <span className=''>Rakib Hossain</span>
                            </div>
                            <div className='comment-txt'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                </p>
                            </div>

                            <div className='main-comment-reaction-emoji-share-wrapper'>
                                <div className=''>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path></svg>
                                </div>
                                <div className=''>
                                    <svg
                                        onClick=""
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-reply-all  ml-2'
                                        viewBox='0 0 16 16'>
                                        <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                                        <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                                    </svg>
                                </div>

                                <div className=''>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='gray'
                                        class='bi bi-trash ml-2'
                                        viewBox='0 0 16 16'
                                    >
                                        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                                        <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='main-comment-wrapper '>
                        {/* <div className='main-comment-person-image border'> */}
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Opx0jptaraMHRgaEhdaLxmcxCo87mHrToJ9akQA&s' className='main-comment-person-image-1' />
                        {/* </div> */}
                        <div className='main-comment-text '>
                            <div className='comment-txt-person-name'>
                                <span className=''>Rakib Hossain</span>
                            </div>
                            <div className='comment-txt '>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                </p>
                            </div>

                            <div className='main-comment-reaction-emoji-share-wrapper'>
                                <div className=''>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path></svg>
                                </div>
                                <div className=''>
                                    <svg
                                        onClick=""
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-reply-all  ml-2'
                                        viewBox='0 0 16 16'>
                                        <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                                        <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                                    </svg>
                                </div>

                                <div className=''>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='gray'
                                        class='bi bi-trash ml-2'
                                        viewBox='0 0 16 16'
                                    >
                                        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                                        <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                                    </svg>
                                </div>
                            </div>

                            <div className='main-comment-reply-div-wrapper'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Opx0jptaraMHRgaEhdaLxmcxCo87mHrToJ9akQA&s' className='main-comment-person-image-1' />
                                {/* </div> */}
                                <div className='main-comment-text '>
                                    <div className='comment-txt-person-name'>
                                        <span className=''>Rakib Hossain</span>
                                    </div>
                                    <div className='comment-txt '>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </p>
                                    </div>

                                    <div className='main-comment-reaction-emoji-share-wrapper'>
                                        <div className=''>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path></svg>
                                        </div>
                                        <div className=''>
                                            <svg
                                                onClick=""
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='bi bi-reply-all  ml-2'
                                                viewBox='0 0 16 16'>
                                                <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                                                <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                                            </svg>
                                        </div>

                                        <div className=''>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='gray'
                                                class='bi bi-trash ml-2'
                                                viewBox='0 0 16 16'
                                            >
                                                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                                                <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >



        </>
    )
}

export default Comment