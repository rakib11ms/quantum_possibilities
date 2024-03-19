import React, { useEffect, useState } from 'react'
import '../../assets/css/comment.css';
import Image from "next/image";
import heartSvg from '../../../public/custom-svg-icon/Heart.svg';
import commentSvg from '../../../public/custom-svg-icon/Comment.svg';
import authorPage from "../../../public/img/author-page.jpg"
import axiosInstance from '../../../utils/axios';
import { toast } from "react-toastify";
import { host } from '@/environment';
import moment from 'moment';



function CommentList(props) {

    const [allComments, setAllComments] = useState(props.allComments)
    console.log('allPostsssss', allComments)
    const [profileImage, setprofileImage] = useState("");
    // console.log('profile image', profileImage)

    const [renderComments, setRenderComments] = useState('')
    // const [allComments, setAllComments] = useState([]);
    // console.log('all comments', allComments)
    const [commentTextState, setCommentTextState] = useState('')
    const commentObj = {
        comment_name: commentTextState,
        post_id: props.postId
        // post_id: props.postId

    }
    const handleCommentSubmit = (e) => {
        // const commentObj = {
        //     comment_name: commentTextState,
        //     post_id: '652664cd7cfb723997f2e090'
        // }
        e.preventDefault();
        axiosInstance
            .post("api/save-user-comment-by-post", commentObj)
            .then((res) => {
                if (res.data.status == 200) {
                    setRenderComments(res.data)
                    // window.location.reload();
                    setCommentTextState('')
                    // toast.success(res.data.message, {
                    //     position: "top-right",
                    //     style: {
                    //         background: "white",
                    //         color: "black",
                    //     },
                    // });


                }
            });

    }



    useEffect(() => {
        if (typeof window !== "undefined") {
            setprofileImage(JSON.parse(localStorage.getItem("userInfo"))[0].profile_pic)

        }
        // axiosInstance.get(`/api/get-all-comments-direct-post/${commentObj.post_id}`).then((res) => {

        //     if (res.data.status == 200) {
        //         setAllComments(res.data.comments);
        //     }
        // });
        // axiosInstance.get(`/api/get-all-users-posts`).then((res) => {

        //     if (res.data.status == 200) {
        //         // console.log('res data', res.data)
        //         setAllComments(res.data.posts);
        //     }
        // });
    }, [])

    async function fetchComments() {
        axiosInstance.get(`/api/get-all-comments-direct-post/${commentObj.post_id}`).then((res) => {

            if (res.data.status == 200) {
                setAllComments(res.data.comments);
            }
        });
    }

    async function fetchComments() {
        axiosInstance.get(`/api/get-all-comments-direct-post/${commentObj.post_id}`).then((res) => {

            if (res.data.status == 200) {
                setAllComments(res.data.comments);
            }
        });
    }

    useEffect(() => {
        if (props.postId) {
            fetchComments();
        }
        // const interval = setInterval(fetchComments, 2000);
        // return () => clearInterval(interval);


    }, [renderComments])





    return (
        <>
            {/* Comment #1 //*/}
            <div>
                {/* <div className='comment-border' /> */}
                <hr />
                <div>
                    <div>
                        <div className="comment-div row">
                            <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 '>
                                {/* <Image className='comment-icon' src={authorPage} width={30} height={25} alt='' /> */}
                                {profileImage !== null ? (
                                    // <img src={`${ host } / uploads / ${ profileImage }`} alt="" />
                                    <Image className='comment-icon' src={`${host}/uploads/${profileImage}`} width={30} height={25} alt='' />

                                ) : (
                                    <img
                                        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                        className="avatar-profile "
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                )}
                            </div>
                            <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11  '>
                                <form onSubmit={handleCommentSubmit}>
                                    {/* <input
                                        className={`comment-input ${props.commentTabIconClick == true && 'borders border-primary'}`}

                                        type='text'
                                        value={commentTextState}
                                        onChange={(e) => setCommentTextState(e.target.value)}
                                        placeholder='comment here' /> */}
                                    <input
                                        className='comment-input'

                                        type='text'
                                        value={commentTextState}
                                        onChange={(e) => setCommentTextState(e.target.value)}
                                        placeholder='comment here' />
                                </form>




                                <div className='reply-div '>
                                    <div className='comment-div row'>
                                        {

                                            allComments.map((item, i) => {
                                                return (
                                                    <>
                                                        <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>




                                                            {/* <Image className='reply-icon' src={authorPage} width={25} height={25} alt='' /> */}
                                                            {item.user_id.profile_pic !== null ? (
                                                                // <img src={`${ host } / uploads / ${ profileImage }`} alt="" />
                                                                <Image className='reply-icon' src={`${host}/uploads/${item.user_id.profile_pic}`} width={25} height={25} alt='' />

                                                            ) : (
                                                                <img
                                                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                                    className="avatar-profile "
                                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                />
                                                            )}

                                                        </div>

                                                        <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11'>

                                                            <div className='comment-reply'>
                                                                <div className='reply-text-div'>

                                                                    <p className='reply-text'>{item.comment_name} </p>

                                                                    <div className='reply-react-share'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-emoji-smile react-svg" viewBox="0 0 16 16">
                                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                                                        </svg>

                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-reply-all-fill " viewBox="0 0 16 16">
                                                                            <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                                                                            <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z" />
                                                                        </svg>

                                                                    </div>

                                                                </div>

                                                                <p className='reply-time'>
                                                                    {/* 20 min ago */}
                                                                    {
                                                                        moment(item.createdAt).format('LT')}
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })

                                        }


                                        {/* <div className='reply-reply-div '>
                                                                <div className='comment-div row'>
                                                                    <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>

                                                                        <Image className='reply-icon' src={authorPage} width={25} height={25} alt='' />

                                                                    </div>

                                                                    <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11'>

                                                                        <div className='comment-reply'>
                                                                            <div className='reply-text-div'>
                                                                                <p className='reply-text'>Thanks for your comments </p>

                                                                                <div className='reply-react-share'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-emoji-smile react-svg" viewBox="0 0 16 16">
                                                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                                                                    </svg>

                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-reply-all-fill " viewBox="0 0 16 16">
                                                                                        <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                                                                                        <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z" />
                                                                                    </svg>

                                                                                </div>

                                                                            </div>

                                                                            <p className='reply-time'>10 min ago</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div> */}








                                    </div>
                                </div>
                                {/* 
                                <div className='reply-div'>
                                    <div className='comment-div row'>
                                        <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>

                                            <Image className='reply-icon' src={authorPage} width={25} height={25} alt='' />

                                        </div>

                                        <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11'>

                                            <div className='comment-reply'>
                                                <div className='reply-text-div'>
                                                    <p className='reply-text'>Amazing Post</p>

                                                    <div className='reply-react-share'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-emoji-smile react-svg" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                                        </svg>

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-reply-all-fill " viewBox="0 0 16 16">
                                                            <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                                                            <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z" />
                                                        </svg>

                                                    </div>

                                                </div>

                                                <p className='reply-time'>20 min ago</p>
                                            </div>

                                            <div className='reply-reply-div'>
                                                <div className='comment-div row'>
                                                    <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>

                                                        <Image className='reply-icon' src={authorPage} width={25} height={25} alt='' />

                                                    </div>

                                                    <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11'>

                                                        <div className='comment-reply'>
                                                            <div className='reply-text-div'>
                                                                <p className='reply-text'>Your comment is amazing </p>

                                                                <div className='reply-react-share'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-emoji-smile react-svg" viewBox="0 0 16 16">
                                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                                                    </svg>

                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-reply-all-fill " viewBox="0 0 16 16">
                                                                        <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                                                                        <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z" />
                                                                    </svg>

                                                                </div>

                                                            </div>

                                                            <p className='reply-time'>3 min ago</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>




                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div >
            </div >

        </>
    )
}

export default CommentList
