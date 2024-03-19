"use client"
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TopNavbar from '../../../component/navbar/page'
import '../reelsStyle.css'
import ReactPlayer from 'react-player';
import axiosInstance from '../../../../utils/axios';
import { frontendHost, host } from '@/environment';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faSave, faTrash, faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import WhoesAreReactedOnComment from '@/component/NewsFeed/WhoesAreReactedOnComment';
import WhoesAreReactedOnPost from '@/component/NewsFeed/WhoesAreReactedOnPost';
import timeFormat from '../../../../utils/CommentTimeFormat';
function page() {

    const [loginUserId, setLoginUserId] = useState("");
    console.log("login userid", loginUserId)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUserInfo = localStorage.getItem("userInfo");

            if (localUserInfo) {
                setLoginUserId(JSON.parse(localUserInfo)[0]._id);
            }
        }
    }, [])
    const router1 = useParams();
    const router = useRouter();
    // const reelId = router.reelId;
    const [reelId, setReelId] = useState("")
    // Set reelId from the router
    useEffect(() => {
        setReelId(router1.reelId);
    }, [router1.reelId]);



    const [allReels, setAllReels] = useState([]);
    const [currentReelIndex, setCurrentReelIndex] = useState(0);

    console.log("current reel index", currentReelIndex)
    const [singleReelData, setSingleReelData] = useState('');

    console.log("singleReelData", singleReelData)
    const [totalReels, setTotalReels] = useState(0);

    // Fetch all user reels when reelId changes or on initial load
    useEffect(() => {
        if (reelId) {
            axiosInstance.get('/api/all-user-reels').then((res) => {
                if (res.data.status === 200) {
                    const reels = res.data.all_reels;
                    setAllReels(reels);
                    setTotalReels(reels.length);
                }
            });
        }
    }, [reelId]);

    // Fetch single reel data when reelId changes
    useEffect(() => {
        if (reelId) {
            axiosInstance.get(`/api/get-user-reel-by-id/${reelId}`).then((res) => {
                if (res.data.status === 200) {
                    setSingleReelData(res.data.user_reel);
                }
            });
        }
    }, [reelId]);




    const handleNextButton = () => {
        let nextIndex = currentReelIndex + 1;
        console.log('curre', currentReelIndex);
        if (nextIndex === totalReels) {
            nextIndex = 0;
        }
        // Make sure allReels has data before attempting to access it
        if (allReels.length >= 0) {
            const nextReel = allReels[nextIndex];
            setCurrentReelIndex(nextIndex);
            setSingleReelData(allReels[nextIndex]);
            setpostid(allReels[nextIndex]._id)
            // router.push(`/reel/${nextReel._id}`);
        }

    };
    const handlePrevButton = () => {
        console.log('prev', currentReelIndex);
        let nextIndex = currentReelIndex - 1;
        if (nextIndex < 0) {
            nextIndex = 0;
        }
        const nextReel = allReels[nextIndex];
        setCurrentReelIndex(nextIndex);
        setSingleReelData(nextReel)
        setpostid(nextReel._id)

        // console.log(allReels[nextIndex]);
        // router.push(`/reel/${nextReel._id}`);
    };

    console.log('total reels', currentReelIndex, allReels.length, allReels[currentReelIndex]);


    const handleDeleteReels = (e) => {
        e.preventDefault();
        axiosInstance.delete(`/api/delete-own-user-reel/${singleReelData._id}`).then((res) => {
            if (res.data.status === 200) {
                // setAllposts((prevPosts) => prevPosts.filter((post) => post._id !== id));
                toast.success("Reels deleted successfully", {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                // window.location.reload();
                let nextIndex = currentReelIndex + 1;
                if (nextIndex === totalReels) {
                    nextIndex = 0;
                }
                setCurrentReelIndex(currentReelIndex + 1)
                const nextReel = allReels[nextIndex];
                setCurrentReelIndex(nextIndex);
                setSingleReelData(nextReel)
            }
        });
    }


    const copyToClipboardReelsLink = () => {
        const inputValue = `${frontendHost}/reel/${singleReelData._id}`;
        navigator.clipboard.writeText(inputValue)
            .then(() => {

                toast.success("Reel URL Copied", {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            });

    };


    const SaveReels = (e) => {
        e.preventDefault();
        toast.success("Reel saved successfully", {
            position: "top-right",
            style: {
                background: "white",
                color: "black",
            },
        });
    }





















    //comment all functionality starts //

    // const [postid, setpostid] = useState("658aa48f2aa024da4018fc9b");
    const [postid, setpostid] = useState("");
    const [reelsPostComments, setReelsPostComments] = useState("");

    console.log("Guyssssssss", postid)

    useEffect(() => {
        axiosInstance
            .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    setReelsPostComments(res.data.post)
                    // setpostid(null);
                    // setcommentid(null);
                    // setCommentTextState({});
                    // setCommentImageOrVideoFile(null);
                    // const postIndex = allPosts.findIndex(
                    //     (post) => post._id === postid,
                    // );

                    // if (postIndex !== -1) {
                    //     const updatedPosts = [...allPosts];
                    //     updatedPosts[postIndex] = res.data.post[0];
                    //     setAllposts(updatedPosts);
                    // }
                }
            });
    }, [singleReelData])

    const [isDropdownOpenArray, setIsDropdownOpenArray] = useState([]);

    const [userId, setUserId] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [profileImage, setprofileImage] = useState("");
    const [postReactionCurrentType, setPostReactionCurrentType] = useState(null);

    const [allPosts, setAllposts] = useState([]);
    console.log("all posts", allPosts);
    //share Post
    const [sharePost, setSharePost] = useState({});

    // Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDropdownToggle = (index) => {
        // Create a copy of the array to modify state immutably
        const newArray = [...isDropdownOpenArray];
        // Toggle the dropdown state for the clicked post
        newArray[index] = !newArray[index];
        // Update the state
        setIsDropdownOpenArray(newArray);
    };
    const [postLoading, setPostLoading] = useState(true);
    async function allPostss() {
        axiosInstance.get("/api/get-all-users-posts").then((res) => {
            if (res.data.status == 200) {
                setPostLoading(false);
                setAllposts(res.data.posts);
                setIsDropdownOpenArray(new Array(allPosts.length).fill(false));
            }
        });
    }
    // alert(userId);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUserInfo = localStorage.getItem("userInfo");

            if (localUserInfo) {
                setUserId(JSON.parse(localUserInfo)[0]._id);
            }
        }
        allPostss();
    }, [postReactionCurrentType]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userInfoJSON = localStorage.getItem("userInfo");

            if (userInfoJSON) {
                const userInfo = JSON.parse(userInfoJSON);

                // Now you can access properties from userInfo
                const profile_image = userInfo[0].profile_pic;
                setprofileImage(profile_image);
            }
            const localStorageFullName = localStorage.getItem("fullname");
            const localStorageUsername = localStorage.getItem("username");
            setFullName(localStorageFullName);
            if (localStorageUsername != "") {
                setUserName(localStorageUsername);
            }
        }
    }, []);



    const [selectedOption, setSelectedOption] = useState([
        { id: "", post_privacy: "" },
    ]);


    useEffect(() => {
        const data = allPosts.map((item) => ({
            id: item._id,
            post_privacy: item.post_privacy,
        }));
        setSelectedOption(data);
    }, [allPosts]);





    const handlePostPrivacyChange = (postId, privacyValue) => {
        const post_privacy = {
            post_privacy: privacyValue,
        };
        axiosInstance
            .patch(`api/update-post-privacy-of-direct-post/${postId}`, post_privacy)
            .then((res) => {
                if (res.data.status == 200) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                }
            });
        setSelectedOption((prevOptions) => {
            // Find the index of the post with postId in the array
            const index = prevOptions.findIndex((option) => option.id === postId);

            // If the post is found, update its privacy, otherwise add a new entry
            if (index !== -1) {
                return [
                    ...prevOptions.slice(0, index),
                    { id: postId, post_privacy: privacyValue },
                    ...prevOptions.slice(index + 1),
                ];
            } else {
                return [...prevOptions, { id: postId, post_privacy: privacyValue }];
            }
        });
    };
    function formatDate(timestamp) {
        const now = moment();
        const postTime = moment(timestamp);
        const diffMinutes = now.diff(postTime, "minutes");

        if (diffMinutes < 1) {
            return "a few seconds ago";
        } else if (diffMinutes < 30) {
            return `${diffMinutes} minutes ago`;
        } else if (now.isSame(postTime, "day")) {
            return `Today at ${postTime.format("LT")}`;
        } else {
            return postTime.format("LLL");
        }
    }

    function isImage(filename) {
        if (!filename) {
            return false;
        }
        const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
        const fileExtension = filename.split(".").pop().toLowerCase();
        return imageExtensions.includes(fileExtension);
    }

    function isVideo(filename) {
        if (!filename) {
            return false;
        }
        const videoExtensions = ["mp4", "avi", "mov", "wmv", "mkv"];
        const fileExtension = filename.split(".").pop().toLowerCase();
        return videoExtensions.includes(fileExtension);
    }

    const [playingVideo, setPlayingVideo] = useState(null);

    // console.log('video click', playingVideo)

    // const handleVideoClick = (mediaItem) => {

    //     // console.log('hol', mediaItem)
    //     setPlayingVideo(mediaItem.image);
    // };

    const handleCloseVideo = () => {
        setPlayingVideo(null);
    };

    const deletePost = (id) => {
        const formData = {
            postId: id,
        };
        axiosInstance.post("/api/delete-post-by-id", formData).then((res) => {
            if (res.data.status == 200) {
                setAllposts((prevPosts) => prevPosts.filter((post) => post._id !== id));
                toast.success("Posts removed successfully", {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
            }
        });
    };

    const [commentTabIconClick, setCommentTabIconClick] = useState(false);

    function openEditModal() {
        setEditModal(true);
    }
    function closeEditModal() {
        setEditModal(false);
    }

    ///////modal functionality starts
    const customStyles1 = {
        content: {
            top: "50%",
            left: "50%",
            width: "70%",
            minHeight: "500px",
            right: "auto",
            // bottom: 'auto',
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const [renderComments, setRenderComments] = useState("");

    ///modal functionality end

    //save comment functionality starts
    const [postIdWhenCommentSubmit, setPostIdWhenCommentSubmit] = useState(null);
    const [commentTextState, setCommentTextState] = useState("");

    // console.log('commentTextState', commentTextState);
    const [commentImageOrVideoFileBlob, setCommentImageOrVideoFileBlob] =
        useState(null);
    const [commentimagevideopostid, setCommentimagevideopostid] = useState(null);
    const [commentimagevideotype, setCommentimagevideotype] = useState(null);

    // console.log("comment image video docs", commentImageOrVideoFileBlob, commentimagevideopostid, commentimagevideotype)
    const commentImageOrVideoFileBlobChange = (
        e,
        commentimagevideopostidd,
        commentimagevideotype,
    ) => {
        setCommentImageOrVideoFileBlob(e.target.files[0]);
        setCommentimagevideopostid(commentimagevideopostidd);
        console.log("vuda", commentimagevideopostidd);
        setCommentimagevideotype(commentimagevideotype);
    };

    const handleCommentSubmit = (e, postSubmitID) => {
        e.preventDefault();
        const commentText = commentTextState[postSubmitID] || "";

        const formData = new FormData();
        formData.append("comment_name", commentText);
        formData.append("image_or_video", commentImageOrVideoFile);
        formData.append("post_id", postSubmitID);
        // Reset the input field for the specific post
        setCommentTextState((prevState) => ({
            ...prevState,
            [postSubmitID]: "", // Clear the comment text for the post
        }));

        if (commentTextState !== null) {
            axiosInstance
                .post("api/save-user-comment-by-reel", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        setCommentTextState("");
                        setCommentImageOrVideoFile(null);
                        toast.success(res.data.message, {
                            position: "top-right",
                            style: {
                                background: "white",
                                color: "black",
                            },
                        });
                        axiosInstance
                            .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
                            .then((res) => {
                                if (res.data.status === 200) {
                                    setReelsPostComments(res.data.post)
                                    // setpostid(null);
                                    // setcommentid(null);
                                    // setCommentTextState({});
                                    // setCommentImageOrVideoFile(null);
                                    // const postIndex = allPosts.findIndex(
                                    //     (post) => post._id === postid,
                                    // );

                                    // if (postIndex !== -1) {
                                    //     const updatedPosts = [...allPosts];
                                    //     updatedPosts[postIndex] = res.data.post[0];
                                    //     setAllposts(updatedPosts);
                                    // }
                                }
                            });
                    }
                });
        }
    };

    const handleKeyDown = (e, postSubmitID) => {
        if (e.key === "Enter") {
            const postId = postSubmitID;
            const commentText = commentTextState[postId];

            if (!commentText || commentText.trim() === "") {
                e.preventDefault(); // Prevent the default behavior (creating a new line)
                toast.error("Comment cannot be empty", {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "red",
                    },
                });
            } else {
                // Submit the form or perform other actions
                handleCommentSubmit(e, postSubmitID, commentText);
            }
        }
    };

    ///Reply comment functionality starts //
    const [commentReplyTextRender, setCommentReplyTextRender] = useState(false);
    const [commentIdReplyId, setCommentIdReplyId] = useState("");

    // console.log("comment reply", commentReplyTextRender, commentIdReplyId);

    const [commentReplyPostId, setCommentReplyPostId] = useState("");

    const handleReplyComment = (e, textRender, comment_id, post_id) => {
        e.preventDefault();
        setCommentReplyTextRender(textRender);
        setCommentIdReplyId(comment_id);
        setCommentReplyPostId(post_id);
    };

    const [commentReplyText, setCommentReplyText] = useState("");

    // console.log('com1', commentReplyText)

    const handleCommentReplySubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("replies_comment_name", commentReplyText);
        formData.append("image_or_video", commentReplyImageOrVideoFile);
        formData.append("comment_id", commentIdReplyId);
        formData.append("post_id", commentReplyPostId);

        if (!commentReplyText || commentReplyText.trim() === "") {
            e.preventDefault();
            toast.error("Comment cannot be empty", {
                position: "top-right",
                style: {
                    background: "white",
                    color: "red",
                },
            });
        } else {
            axiosInstance
                .post("api/reply-comment-by-reel-post", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    if (res.data.status == 200) {
                        setRenderComments(res.data);
                        // window.location.reload();
                        setCommentReplyText("");
                        toast.success(res.data.message, {
                            position: "top-right",
                            style: {
                                background: "white",
                                color: "black",
                            },
                        });
                        setCommentReplyTextRender(false);
                        axiosInstance
                            .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
                            .then((res) => {
                                if (res.data.status === 200) {
                                    setReelsPostComments(res.data.post)
                                    // setpostid(null);
                                    // setcommentid(null);
                                    // setCommentTextState({});
                                    // setCommentImageOrVideoFile(null);
                                    // const postIndex = allPosts.findIndex(
                                    //     (post) => post._id === postid,
                                    // );

                                    // if (postIndex !== -1) {
                                    //     const updatedPosts = [...allPosts];
                                    //     updatedPosts[postIndex] = res.data.post[0];
                                    //     setAllposts(updatedPosts);
                                    // }
                                }
                            });
                    }
                });
        }
    };

    ///Reply comment functionality ends//

    //post like reactions functionality starts

    // const [postReactionCurrentType, setPostReactionCurrentType] = useState(null);
    const [reactionPostId, setReactionPostId] = useState(null);
    // console.log('reaction post id', reactionPostId)

    const [allMainPostReactions, setAllMainPostReactions] = useState("");

    console.log("all main post reactions", allMainPostReactions);

    useEffect(() => {
        axiosInstance.get(`/api/get-all-reaction-main-post`).then((res) => {
            if (res.data.status == 200) {
                setAllMainPostReactions(res.data.userPostsReactions);
            }
        });
    }, [postReactionCurrentType, reactionPostId]);

    useEffect(() => {
        if (reactionPostId || postReactionCurrentType) {
            const submitReactionData = {
                reaction_type: postReactionCurrentType,
                post_id: reactionPostId,
                // post_single_item_id: req.body.post_single_item_id,
            };
            axiosInstance
                .post("/api/save-reaction-main-post", submitReactionData)
                .then((res) => {
                    if (res.data.status == 200) {
                        setReactionPostId(null);
                        setPostReactionCurrentType(null);
                        // toast.success("Post reaction updated", {
                        //     position: "top-right",
                        //     style: {
                        //         background: "white",
                        //         color: "black",
                        //     },
                        // });
                    }
                });
        }
    }, [postReactionCurrentType, reactionPostId]);

    const handleReactionSelect = (reactionType, postId) => {
        // Here you can implement the logic to select the reaction and update the state
        setPostReactionCurrentType(reactionType);
        setReactionPostId(postId);
    };

    function getReactionImageSrc(reactionType) {
        switch (reactionType) {
            case "like":
                return `${host}/assets/reactions/like.gif`;
            case "love":
                return `${host}/assets/reactions/love.gif`;
            case "wow":
                return `${host}/assets/reactions/wow.gif`;
            case "sad":
                return `${host}/assets/reactions/sad.gif`;
            case "angry":
                return `${host}/assets/reactions/angry.gif`;
            case "haha":
                return `${host}/assets/reactions/haha.gif`;
            default:
                return ""; // Return an empty string for unknown or unhandled reaction types
        }
    }

    //whoes are reacted lists on main post functionality starts
    const [modalwhoesReactOnPostIsOpen, setModalwhoesReactOnPostIsOpen] =
        React.useState(false);

    const [clicktoSeeWhoReactedPostId, setClicktoSeeWhoReactedPostId] =
        useState(null);

    const [reactedUserListsOfDirectPosts, setReactedUserListsOfDirectPosts] =
        useState([]);
    console.log(
        "reactedUserListsOfDirectPosts",
        reactedUserListsOfDirectPosts,
        clicktoSeeWhoReactedPostId,
    );
    useEffect(() => {
        if (clicktoSeeWhoReactedPostId) {
            axiosInstance
                .get(
                    `/api/reaction-user-lists-of-direct-post/${clicktoSeeWhoReactedPostId}`,
                )
                .then((res) => {
                    if (res.data.status == 200) {
                        setReactedUserListsOfDirectPosts(res.data.reactions);
                    }
                });
        }
    }, [clicktoSeeWhoReactedPostId]);

    function openWhoesReactOnPostModal(e, reactionPostId) {
        setModalwhoesReactOnPostIsOpen(true);
        setClicktoSeeWhoReactedPostId(reactionPostId);
    }
    function closeWhoesReactOnPostModal() {
        setModalwhoesReactOnPostIsOpen(false);
        setClicktoSeeWhoReactedPostId(null);
        setReactedUserListsOfDirectPosts([]);
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [replyCommentStatus, setReplyCommentStatus] = useState(false);
    const [replyCommentStatusChain, setReplyCommentStatusChain] = useState(false);
    const [valueOfReply, setValueOfReply] = useState("");

    console.log("value of reply", valueOfReply);
    const handleChange1 = (event) => {
        // console.log('handleChange called',even);

        setValueOfReply(event.target.value);
        // Additional logic can be added here if needed
    };

    //edit main comments functionality starts
    const [editMainCommentStatus, setEditMainCommentStatus] = useState(false);
    const [editMainCommentId, setEditMainCommentId] = useState(null);
    const [editMainCommentPostId, setEditMainCommentPostId] = useState(null);
    const [editCommentData, setEditMainCommentData] = useState(null);
    const [editCommentImageOrVideo, setEditMainCommentImageOrVideo] =
        useState(null);

    console.log(
        "edit main comment data",
        editCommentData,
        editCommentImageOrVideo,
    );

    // const [postid, setpostid] = useState(null);
    // const [commentid, setcommentid] = useState(null);
    const [editcommentImageOrVideoFile, setEditCommentImageOrVideoFile] =
        useState(null);
    const [editcommenttype, setEditcommenttype] = useState(null);
    // const [commentReplyImageOrVideoFile, setCommentReplyImageOrVideoFile] = useState(null);
    // console.log('commentImageOrVideoFile', commentImageOrVideoFile, "postid", postid, "commentid", commentid, "comment type", commenttype);
    // console.log('commentReplyImageOrVideoFile', commentReplyImageOrVideoFile, "postid", postid, "commentid", commentid, "comment type", commenttype);
    const handleEditCommentImageVideo = (e, postid, commenttype) => {
        setEditCommentImageOrVideoFile(e.target.files[0]);
        // setEditMainCommentPostId(postid)
        setEditcommenttype(commenttype);
    };

    //edit main comments reply functionality starts

    const [editMainCommentReplyId, setEditMainCommentReplyId] = useState(null);
    const [editReplyCommentData, setEditReplyCommentData] = useState(null);
    console.log("edit reply comment data", editReplyCommentData);
    const [editMainCommentReplyStatus, setEditMainCommentReplyStatus] =
        useState(false);
    const [editReplyCommentImageOrVideo, setEditReplyCommentImageOrVideo] =
        useState(null);
    const [
        editReplyCommentImageOrVideoFile,
        setEditReplyCommentImageOrVideoFile,
    ] = useState(null);

    const handleEditReplyCommentImageVideo = (e, postid, commenttype) => {
        setEditReplyCommentImageOrVideoFile(e.target.files[0]);
        // setEditMainCommentPostId(postid)
        setEditcommenttype(commenttype);
    };

    console.log(
        "edit reply comment fetch Data",
        "",
        editMainCommentPostId,
        editMainCommentReplyId,
        editReplyCommentData,
        editReplyCommentImageOrVideo,
    );

    async function getEditMainCommentData() {
        axiosInstance
            .get(
                `/api/edit-comment-by-reel-post/${editMainCommentPostId}/${editMainCommentId}/main_comment`,
            )
            .then((res) => {
                if (res.data.status == 200) {
                    console.log("ressing", res.data);
                    setEditMainCommentData(res.data.data.comment_name);
                    // Clean up the previous video URL if it exists
                    setEditMainCommentImageOrVideo(res.data.data.image_or_video);
                }
            });
    }

    async function getEditMainCommentReplyData() {
        axiosInstance
            .get(
                `/api/edit-comment-by-reel-post/${editMainCommentPostId}/${editMainCommentReplyId}/reply_comment`,
            )
            .then((res) => {
                if (res.data.status == 200) {
                    setEditReplyCommentData(res.data.data.replies_comment_name);
                    setEditReplyCommentImageOrVideo(res.data.data.image_or_video);
                }
            });
    }

    useEffect(() => {
        if (editMainCommentId) {
            getEditMainCommentData();
        }
        if (editMainCommentReplyId) {
            getEditMainCommentReplyData();
        }
    }, [editMainCommentId, editMainCommentReplyId]);

    //comment reactions all logic functionalities starts
    const [isCommentReactionHover, setIsCommentReactionHover] = useState(false);
    const [isReplyCommentReactionHover, setIsReplyCommentReactionHover] =
        useState(false);
    const [isCommentReactionHoverId, setIsCommentReactionHoverId] =
        useState(null);
    const [isReplyCommentReactionHoverId, setIsReplyCommentReactionHoverId] =
        useState(null);

    const handleCommentReactionSubmit = (
        e,
        commentReactionPostID,
        commentReactionCommentID,
        commentRepliesID,
        commentReactionCurrentType,
    ) => {
        e.preventDefault();
        // console.log("post id", commentReactionPostID, "comment id", commentReactionCommentID, "reaction type", commentReactionCurrentType);
        const commentReactionData = {
            post_id: commentReactionPostID,
            comment_id: commentReactionCommentID,
            comment_replies_id: commentRepliesID,
            reaction_type: commentReactionCurrentType,
        };
        axiosInstance
            .post("api/save-comment-reaction-of-reel-post", commentReactionData)
            .then((res) => {
                if (res.data.status == 200) {
                    setRenderComments(res.data);
                    toast.success(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                    setIsCommentReactionHover(false);
                    setIsReplyCommentReactionHover(false);
                    setIsCommentReactionHoverId(null);
                    setIsReplyCommentReactionHoverId(null);
                    axiosInstance
                        .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
                        .then((res) => {
                            if (res.data.status === 200) {
                                setReelsPostComments(res.data.post)

                            }
                        });
                }
            });
    };

    //whoes are reacted lists on main post functionality starts
    const [modalwhoesReactOnCommentIsOpen, setModalwhoesReactOnCommentIsOpen] =
        React.useState(false);

    // const [clicktoSeeWhoReactedPostId, setClicktoSeeWhoReactedPostId] =
    //   useState(null);

    const [
        reactedUserListsOfDirectPostsComments,
        setReactedUserListsOfDirectPostsComments,
    ] = useState([]);
    console.log(
        "reactedUserListsOfDirectPostsComments",
        reactedUserListsOfDirectPostsComments,
    );

    function openWhoesReactOnCommentModal(
        e,
        reactionPostId,
        commentId,
        commentRepliesId,
    ) {
        setModalwhoesReactOnCommentIsOpen(true);
        // setClicktoSeeWhoReactedPostId(reactionPostId);
        axiosInstance
            .get(
                `/api/reaction-user-lists-comments-of-a-reel-post/${reactionPostId}/${commentId}/${commentRepliesId || "null"
                }`,
            )
            .then((res) => {
                if (res.data.status == 200) {
                    setReactedUserListsOfDirectPostsComments(res.data.reactions);
                }
            });
    }

    function closeWhoesReactOnCommentModal() {
        setModalwhoesReactOnCommentIsOpen(false);
        setReactedUserListsOfDirectPostsComments([]);
    }

    // comment reactions all logic functionalities ends

    //comment with image or video or media logics starts
    // const [isLoading, setIsLoading] = useState(false);

    // const [postid, setpostid] = useState(null);
    // const [commentid, setcommentid] = useState(null);
    const [commentImageOrVideoFile, setCommentImageOrVideoFile] = useState(null);

    // const [commenttype, setcommenttype] = useState(null)
    const [commentReplyImageOrVideoFile, setCommentReplyImageOrVideoFile] =
        useState(null);
    // // console.log('commentImageOrVideoFile', commentImageOrVideoFile, "postid", postid, "commentid", commentid, "comment type", commenttype);
    // // console.log('commentReplyImageOrVideoFile', commentReplyImageOrVideoFile, "postid", postid, "commentid", commentid, "comment type", commenttype);
    // const handleCommentImageVideo = (e, postid, commenttype) => {
    //     setCommentImageOrVideoFile(e.target.files[0])
    //     setpostid(postid);
    //     // setcommentid(commentid);
    //     setcommenttype(commenttype)
    // }

    // console.log('comment img or video file check', commentImageOrVideoFile)

    // const handleCommentReplyImageVideo = (e, postid, commentid, commenttype) => {
    //     setCommentReplyImageOrVideoFile(e.target.files[0])
    //     setpostid(postid);
    //     setcommentid(commentid);
    //     setcommenttype(commenttype)
    // }

    // const submitMainCommentWithImageOrVideo = (e) => {
    //     e.preventDefault();
    //     setCommentImageOrVideoFile(null);
    //     setIsLoading(true);

    //     const commentText = commentTextState[postid] || "";
    //     const formData = new FormData();
    //     formData.append("comment_name", commentText);
    //     formData.append("image_or_video", commentImageOrVideoFile);
    //     formData.append("post_id", postid);
    //     // formData.append("comment_id", commentid);

    //     axiosInstance
    //         .post("api/save-user-comment-by-post", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         })
    //         .then((res) => {
    //             if (res.data.status == 200) {
    //                 setIsLoading(false);
    //                 // Reset the input field for the specific post
    //                 setCommentTextState((prevState) => ({
    //                     ...prevState,
    //                     [postid]: "",
    //                 }));
    //                 toast.success(res.data.message, {
    //                     position: "top-right",
    //                     style: {
    //                         background: "white",
    //                         color: "black",
    //                     },
    //                 });
    //                 axiosInstance
    //                     .get(`/api/view-single-main-post-with-comments/${postid}`)
    //                     .then((res) => {
    //                         if (res.data.status === 200) {
    //                             setpostid(null);
    //                             setcommentid(null);
    //                             setCommentTextState({});
    //                             setCommentImageOrVideoFile(null);
    //                             const postIndex = allPosts.findIndex(
    //                                 (post) => post._id === postid,
    //                             );

    //                             if (postIndex !== -1) {
    //                                 const updatedPosts = [...allPosts];
    //                                 updatedPosts[postIndex] = res.data.post[0];
    //                                 setAllposts(updatedPosts);
    //                             }
    //                         }
    //                     });
    //             }
    //         });
    // };

    const submitMainCommentReplyWithImageOrVideo = (e) => {
        e.preventDefault();
        // setIsLoading(true);
        // const commentText = commentTextState[postid] || "";
        const formData = new FormData();
        formData.append("replies_comment_name", commentReplyText);
        formData.append("image_or_video", commentReplyImageOrVideoFile);
        formData.append("post_id", postid);
        formData.append("comment_id", commentid);

        axiosInstance
            .post("api/reply-comment-by-direct-post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                if (res.data.status == 200) {
                    // setIsLoading(false);
                    // Reset the input field for the specific post
                    setCommentTextState((prevState) => ({
                        ...prevState,
                        [postid]: "",
                    }));
                    toast.success(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                    axiosInstance
                        .get(`/api/view-single-main-post-with-comments/${postid}`)
                        .then((res) => {
                            if (res.data.status === 200) {
                                setpostid(null);
                                setcommentid(null);
                                setCommentTextState({});
                                setCommentImageOrVideoFile(null);
                                const postIndex = allPosts.findIndex(
                                    (post) => post._id === postid,
                                );

                                if (postIndex !== -1) {
                                    const updatedPosts = [...allPosts];
                                    updatedPosts[postIndex] = res.data.post[0];
                                    setAllposts(updatedPosts);
                                }
                            }
                        });
                }
            });
    };
    //comment with image or video or media logics ends

    //view more replies logic functionality starts when click someone
    const [viewMoreRepliesLogicCommentId, setViewMoreRepliesLogicCommentId] =
        useState("");
    const [viewMoreRepliesLogicPostId, setViewMoreRepliesLogicPostId] =
        useState("");

    //view more replies logic functionality ends




    function renderStringWithLink(inputString) {
        const urlRegex = /(https?:\/\/[^\s]+)/;
        const match = inputString && inputString.match(urlRegex); // Check if inputString is defined
        const link = match && match[0];
        let html = "";

        if (link) {
            // Extract "Live now" text dynamically
            const liveNowText = inputString.split(link)[0];
            html = `
            ${liveNowText} <a class="post-link-comment" href="${link}">${link}</a>
        `;
        } else {
            // No link found, display the original string
            html = `${inputString}`;
        }

        return { __html: html }; // Wrap HTML string in an object with __html property
    }




















































    //comment functionality ends

    const [fullViewTrigger, setFullViewTrigger] = useState(false);
    // console.log("full view trigger", fullViewTrigger)

    return (
        <>


            <div className="">
                <TopNavbar />
                <div className="view-reels-main-wrapper">
                    <div className={`  ${fullViewTrigger ? "full-width" : "view-reels-left-sec"}`}>
                        <div className="view-reels-video-wrapper rounded-3">
                            <div className='reels-top-navbar-sec '>
                                <div className='reels-top-navbar-image-name-privacy-wrapper'>
                                    <Link href={`/profile/${singleReelData?.user_id?.username}`} style={{ color: "white" }}>
                                        <div className='reels-top-navbar-image-name'>
                                            <div className='reels-top-navbar-image'>
                                                {
                                                    singleReelData?.user_id?.profile_pic !== null ? (
                                                        <img src={`${host}/uploads/${singleReelData?.user_id?.profile_pic}`} alt="" />
                                                    ) : (
                                                        <img
                                                            src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                                                            alt='Default Profile Pic'
                                                        />
                                                    )
                                                }

                                            </div>
                                            <div className='mx-2'>
                                                <strong>     {singleReelData.user_id?.first_name} {singleReelData.user_id?.last_name}
                                                </strong>

                                                <div className='reels-privacy-view'>
                                                    {singleReelData.reels_privacy}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                </div>

                                <div className='reels-three-dot-dropdown'>
                                    <div class="dropdown">
                                        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <strong>. . . </strong>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ cursor: "pointer" }}>
                                            <a class="dropdown-item" onClick={copyToClipboardReelsLink}>
                                                <FontAwesomeIcon
                                                    icon={faLink}
                                                    style={{
                                                        fontSize: 14,
                                                        cursor: "pointer",
                                                        marginRight: '8px'
                                                    }}
                                                    className=''
                                                />Copy Link
                                            </a>
                                            {
                                                singleReelData?.user_id?._id == loginUserId && <a class="dropdown-item" onClick={handleDeleteReels}>
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        style={{
                                                            fontSize: 14,
                                                            cursor: "pointer",
                                                            marginRight: '8px'
                                                        }}
                                                        className=''
                                                    /> Delete reels</a>

                                            }

                                            <a class="dropdown-item" onClick={SaveReels}>
                                                <FontAwesomeIcon
                                                    icon={faSave}
                                                    style={{
                                                        fontSize: 14,
                                                        cursor: "pointer",
                                                        marginRight: '8px'
                                                    }}
                                                    className=''
                                                />
                                                Save reels</a>

                                        </div>
                                    </div>
                                </div>


                            </div>

                            {(currentReelIndex > 0 && allReels.length > 1) && (
                                <div className="left-side-button d-flex">
                                    <div className="bg-white rounded p-1" onClick={handlePrevButton}>
                                        <img src="https://icons.veryicon.com/png/o/miscellaneous/line-icon/left-arrow-15.png" style={{ width: '30px' }} />
                                    </div>
                                </div>
                            )}

                            <div className="view-reels-video">
                                {singleReelData && singleReelData.video && (
                                    <ReactPlayer
                                        url={`${host}/uploads/reels/${singleReelData.video}`}
                                        className="rounded-3 reels-video-custom"
                                        width="100%"
                                        height="100%"
                                        controls
                                    />
                                )}
                            </div>


                            {(currentReelIndex < totalReels - 1 && allReels.length > 1) && (
                                <>
                                    <div className="right-side-buttons-wrapper d-flex ">
                                        <div className="bg-white rounded p-1" onClick={handleNextButton}>
                                            <img src="https://icons.veryicon.com/png/o/miscellaneous/test-2/next-28.png" style={{ width: '30px' }} />
                                        </div>

                                    </div>
                                    <div className='right-side-like-buttons-wrapper '>
                                        <FontAwesomeIcon
                                            icon={faThumbsUp}
                                            style={{
                                                fontSize: 30,
                                                cursor: "pointer",
                                                // marginRight: '8px',
                                            }}
                                            className=''
                                        />
                                    </div>

                                    <div className='right-side-comment-buttons-wrapper' onClick={() => setFullViewTrigger(!fullViewTrigger)}>
                                        <FontAwesomeIcon
                                            icon={faComment}
                                            style={{
                                                fontSize: 30,
                                                cursor: "pointer",
                                                // marginRight: '8px',
                                            }}
                                            className=''
                                        />
                                    </div>
                                </>
                            )}


                            <div className='view-reels-video-description'>
                                <p dangerouslySetInnerHTML={{ __html: singleReelData.description }} />
                            </div>
                        </div>
                    </div>

                    <div className={` border bg-white p-2 ${fullViewTrigger ? "normal-width" : "view-reels-right-sec"}`}>

                        <div className='float-right'>
                            <Link href={`/reelcreate`}>
                                <button className="btn btn-secondary ">Create Reel</button>
                            </Link>
                        </div>

                        <div className='reels-top-navbar-image-name-privacy-wrapper'>
                            <Link href={`/profile/${singleReelData?.user_id?.username}`} style={{ color: "black" }}>
                                <div className='reels-top-navbar-image-name'>
                                    <div className='reels-top-navbar-image'>
                                        {
                                            singleReelData?.user_id?.profile_pic !== null ? (
                                                <img src={`${host}/uploads/${singleReelData?.user_id?.profile_pic}`} alt="" />
                                            ) : (
                                                <img
                                                    src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                                                    alt='Default Profile Pic'
                                                />
                                            )
                                        }

                                    </div>
                                    <div className='mx-2'>
                                        <strong>     {singleReelData.user_id?.first_name} {singleReelData.user_id?.last_name}
                                        </strong>

                                        <div className='reels-privacy-view'>
                                            {singleReelData.reels_privacy}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        </div>
                        <hr />

                        <div className="comment-section py-2  ">
                            <div
                                className={`comment-section-wrapper bg-white ${reelsPostComments[0]?.comments?.length > 1
                                    ? "comment-scrollbar"
                                    : reelsPostComments[0]?.comments?.length === 0
                                        ? "comment-scrollbar-default"
                                        : ""
                                    }`}
                            >
                                <div className="comment-header-with-form">
                                    <div className="comment-header-image ">
                                        {profileImage !== null ? (
                                            <img
                                                src={`${host}/uploads/${profileImage}`}
                                                className="comment-header-image-person"
                                            />
                                        ) : (
                                            <img
                                                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                className="comment-header-image-person"
                                            />
                                        )}
                                    </div>

                                    <div className="w-100 main-comment-div">
                                        <form
                                        // onSubmit={(e) => handleCommentSubmit(e, item._id)}
                                        >
                                            <textarea
                                                id="scrollstyle"
                                                placeholder="Type your comment!"
                                                className="external-class  px-3 "
                                                value={commentTextState[reelsPostComments[0]?._id] || ""}
                                                onChange={(e) => {
                                                    const postId = reelsPostComments[0]?._id;
                                                    const newText = e.target.value;
                                                    setCommentTextState((prevState) => ({
                                                        ...prevState,
                                                        [postId]: newText,
                                                    }));
                                                }}
                                                onKeyDown={(e) => handleKeyDown(e, reelsPostComments[0]?._id)}
                                            />
                                        </form>

                                        <div className="comments-icons d-flex px-1 ">
                                            {/* <div className=''>
                                                <label
                                                    htmlFor={`formFileSm${item._id}`}
                                                    className='form-label'>
                                                    <FontAwesomeIcon
                                                        icon={faPhotoVideo}
                                                        style={{
                                                            fontSize: 16,
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                </label>
                                                <input
                                                    className='form-control form-control-sm'
                                                    id={`formFileSm${item._id}`}
                                                    type='file'
                                                    onChange={(e) => {
                                                        commentImageOrVideoFileBlobChange(
                                                            e,
                                                            item._id,
                                                            "main_comment")
                                                    }}

                                                />
                                            </div> */}

                                            {/* <div
                                                className='mx-2 '
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const formData = new FormData();
                                                    formData.append(
                                                        "comment_type",
                                                        "main_comment"
                                                    );
                                                    formData.append(
                                                        "comment_name",
                                                        editCommentData
                                                    );
                                                    formData.append(
                                                        "image_or_video",
                                                        editcommentImageOrVideoFile
                                                    );

                                                    axiosInstance
                                                        .post(
                                                            `api/update-comments-by-direct-post/${editMainCommentPostId}/${editMainCommentId}`,
                                                            formData,
                                                            {
                                                                headers: {
                                                                    "Content-Type":
                                                                        "multipart/form-data",
                                                                },
                                                            }
                                                        )
                                                        .then((res) => {
                                                            if (res.data.status == 200) {
                                                                setRenderComments(res.data);
                                                                setEditMainCommentPostId(null);
                                                                setEditMainCommentId(null);
                                                                setEditMainCommentStatus(false);
                                                                toast.success(
                                                                    "Comment Updated successfully",
                                                                    {
                                                                        position: "top-right",
                                                                        style: {
                                                                            background: "white",
                                                                            color: "black",
                                                                        },
                                                                    }
                                                                );
                                                                axiosInstance
                                                                    .get(
                                                                        `/api/view-single-main-post-with-comments/${item._id}`
                                                                    )
                                                                    .then((res) => {
                                                                        if (res.data.status === 200) {
                                                                            setCommentTextState("");
                                                                            const postIndex =
                                                                                allPosts.findIndex(
                                                                                    (post) =>
                                                                                        post._id === item._id
                                                                                );

                                                                            if (postIndex !== -1) {
                                                                                const updatedPosts = [
                                                                                    ...allPosts,
                                                                                ];
                                                                                updatedPosts[postIndex] =
                                                                                    res.data.post[0];
                                                                                setAllposts(updatedPosts);
                                                                            }
                                                                        }
                                                                    });
                                                            }
                                                        });
                                                }}>
                                                <FontAwesomeIcon
                                                    icon={faPaperPlane}
                                                    className='mx-1'
                                                    style={{
                                                        cursor: "pointer",
                                                        marginTop: "-20px",
                                                    }}
                                                />
                                            </div> */}
                                        </div>
                                        {/* comment image or video blob url render by onchange main comment */}
                                        {commentImageOrVideoFileBlob &&
                                            commentimagevideopostid == item._id &&
                                            commentimagevideotype == "main_comment" && (
                                                <div className="comment-image-or-video-portion-render">
                                                    <div
                                                        className="cross-icon-comment-or-video"
                                                        onClick={() => {
                                                            setCommentImageOrVideoFileBlob(null);
                                                            setCommentimagevideotype(null);
                                                            setCommentimagevideopostid(null);
                                                        }}
                                                    >
                                                        X
                                                    </div>

                                                    {commentImageOrVideoFileBlob &&
                                                        commentImageOrVideoFileBlob.type.startsWith(
                                                            "image/",
                                                        ) ? (
                                                        <img
                                                            src={URL.createObjectURL(
                                                                commentImageOrVideoFileBlob,
                                                            )}
                                                        // alt={`Uploaded Image ${index}`}
                                                        />
                                                    ) : commentImageOrVideoFileBlob &&
                                                        commentImageOrVideoFileBlob.type.startsWith(
                                                            "video/",
                                                        ) ? (
                                                        <video controls>
                                                            <source
                                                                src={URL.createObjectURL(
                                                                    commentImageOrVideoFileBlob,
                                                                )}
                                                                type={commentImageOrVideoFileBlob.type}
                                                            />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : null}
                                                </div>
                                            )}
                                    </div>
                                </div>

                                {reelsPostComments !== null && reelsPostComments[0] !== undefined && reelsPostComments[0].comments.map((commentitem, commentIndex) => {
                                    return (
                                        <div
                                            className="main-comment-wrapper  py-1 px-2 border  "
                                            scrollstyleReply
                                            style={{ backgroundColor: "#f1f1f1" }}
                                            key={commentIndex}
                                        >
                                            {commentitem.user_id.profile_pic !== null ? (
                                                <img
                                                    className="main-comment-person-image-1"
                                                    src={`${host}/uploads/${commentitem.user_id.profile_pic}`}
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                    className="main-comment-person-image-1"
                                                // style={{
                                                //     width: "100%",
                                                //     height: "100%",
                                                //     objectFit: "cover",
                                                // }}
                                                />
                                            )}

                                            <div className="main-comment-text">
                                                <div className="d-flex justify-content-between ">
                                                    <Link
                                                        href={`/profile/${commentitem.user_id.username}`}
                                                        style={{ color: "black" }}
                                                    >
                                                        <div
                                                            className="comment-txt-person-name"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <span className="">{`${commentitem.user_id.first_name} ${commentitem.user_id.last_name}`}</span>
                                                        </div>
                                                    </Link>

                                                    <div className="">
                                                        {timeFormat(commentitem.createdAt)}
                                                    </div>
                                                </div>

                                                {editMainCommentId !== commentitem._id && (
                                                    <>
                                                        <div className="comment-txt ">
                                                            <span className="py-2" dangerouslySetInnerHTML={renderStringWithLink(commentitem.comment_name)}>

                                                            </span>
                                                        </div>
                                                    </>
                                                )}

                                                {/* if someone wants edit main comment */}
                                                {editMainCommentStatus &&
                                                    editMainCommentId == commentitem._id && (
                                                        <div className="">
                                                            <textarea
                                                                id="scrollstyle"
                                                                placeholder="Type your comment!"
                                                                className="external-class  px-3 border"
                                                                onChange={(e) =>
                                                                    setEditMainCommentData(e.target.value)
                                                                }
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                                        e.preventDefault();
                                                                        const formData = new FormData();
                                                                        formData.append(
                                                                            "comment_type",
                                                                            "main_comment",
                                                                        );
                                                                        formData.append(
                                                                            "comment_name",
                                                                            editCommentData,
                                                                        );
                                                                        formData.append(
                                                                            "image_or_video",
                                                                            editcommentImageOrVideoFile,
                                                                        );

                                                                        axiosInstance
                                                                            .post(
                                                                                `api/update-comments-by-reel-post/${editMainCommentPostId}/${editMainCommentId}`,
                                                                                formData,
                                                                                {
                                                                                    headers: {
                                                                                        "Content-Type":
                                                                                            "multipart/form-data",
                                                                                    },
                                                                                },
                                                                            )
                                                                            .then((res) => {
                                                                                if (res.data.status == 200) {
                                                                                    setRenderComments(res.data);
                                                                                    axiosInstance
                                                                                        .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
                                                                                        .then((res) => {
                                                                                            if (res.data.status === 200) {
                                                                                                setReelsPostComments(res.data.post)

                                                                                            }
                                                                                        });
                                                                                    setEditMainCommentPostId(null);
                                                                                    setEditMainCommentId(null);
                                                                                    setEditMainCommentStatus(false);
                                                                                    toast.success(
                                                                                        "Comment Updated successfully",
                                                                                        {
                                                                                            position: "top-right",
                                                                                            style: {
                                                                                                background: "white",
                                                                                                color: "black",
                                                                                            },
                                                                                        },
                                                                                    );
                                                                                    axiosInstance
                                                                                        .get(
                                                                                            `/api/view-single-main-post-with-comments/${item._id}`,
                                                                                        )
                                                                                        .then((res) => {
                                                                                            if (res.data.status === 200) {
                                                                                                setCommentTextState("");
                                                                                                const postIndex =
                                                                                                    allPosts.findIndex(
                                                                                                        (post) =>
                                                                                                            post._id === item._id,
                                                                                                    );

                                                                                                if (postIndex !== -1) {
                                                                                                    const updatedPosts = [
                                                                                                        ...allPosts,
                                                                                                    ];
                                                                                                    updatedPosts[postIndex] =
                                                                                                        res.data.post[0];
                                                                                                    setAllposts(updatedPosts);
                                                                                                }
                                                                                            }
                                                                                        });
                                                                                }
                                                                            });
                                                                    }
                                                                }}
                                                                value={editCommentData}
                                                            ></textarea>
                                                            <span
                                                                href=""
                                                                className="float-right"
                                                                style={{ color: "red", cursor: "pointer" }}
                                                                onClick={() => {
                                                                    setEditMainCommentStatus(false),
                                                                        setEditMainCommentId(null),
                                                                        setEditMainCommentPostId(null);
                                                                }}
                                                            >
                                                                Cancel
                                                            </span>
                                                        </div>
                                                    )}

                                                <div
                                                    className="main-comment-reaction-emoji-share-wrapper p-1 "
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <div
                                                        className="reaction-comment-container "
                                                        onMouseEnter={() => {
                                                            setIsCommentReactionHover(true);
                                                            setIsCommentReactionHoverId(commentitem._id);
                                                        }}
                                                        onMouseLeave={() => {
                                                            setIsCommentReactionHover(false),
                                                                setIsCommentReactionHoverId(null);
                                                        }}
                                                    >
                                                        {/* comment reaction logics of a user if this user has reacted or not */}

                                                        {commentitem?.comment_reactions?.filter(
                                                            (reaction) =>
                                                                reaction.user_id === userId &&
                                                                reaction.comment_id === commentitem._id,
                                                        )
                                                            .map((filteredReaction) => (
                                                                <div
                                                                    key={filteredReaction._id}
                                                                    style={{ marginTop: "-5px" }}
                                                                >
                                                                    <span
                                                                        className=""
                                                                        style={{ color: "red", fontSize: "12px" }}
                                                                    >
                                                                        {filteredReaction.reaction_type}{" "}
                                                                    </span>
                                                                </div>
                                                            ))}

                                                        {/* Render default emoji if no reactions */}
                                                        {commentitem?.comment_reactions?.filter(
                                                            (reaction) =>
                                                                reaction.user_id === userId &&
                                                                reaction.comment_id === commentitem._id,
                                                        ).length === 0 && (
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-emoji-smile"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                                                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path>
                                                                </svg>
                                                            )}
                                                    </div>

                                                    {/* comment reaction hover and shows the reactions */}
                                                    {isCommentReactionHover &&
                                                        isCommentReactionHoverId == commentitem._id && (
                                                            <div
                                                                onMouseEnter={() => {
                                                                    setIsCommentReactionHover(true);
                                                                    setIsCommentReactionHoverId(
                                                                        commentitem._id,
                                                                    );
                                                                }}
                                                                onMouseLeave={() => {
                                                                    setIsCommentReactionHover(false);
                                                                }}
                                                                className="reaction-comment-icons-wrapper "
                                                            >
                                                                <figure className="reaction-comment-icons mt-1">
                                                                    <img
                                                                        src={`${host}/assets/reactions/like.gif`}
                                                                        alt="Like emoji"
                                                                        onClick={(e) => {
                                                                            handleCommentReactionSubmit(
                                                                                e,
                                                                                // item._id,
                                                                                reelsPostComments[0]?._id,
                                                                                commentitem._id,
                                                                                "",
                                                                                "like",
                                                                            );
                                                                        }}
                                                                    />
                                                                    <img
                                                                        src={`${host}/assets/reactions/love.gif`}
                                                                        onClick={(e) => {
                                                                            handleCommentReactionSubmit(
                                                                                e,
                                                                                reelsPostComments[0]?._id,
                                                                                commentitem._id,
                                                                                "",
                                                                                "love",
                                                                            );
                                                                        }}
                                                                        alt="Love emoji"
                                                                    />
                                                                    <img
                                                                        src={`${host}/assets/reactions/haha.gif`}
                                                                        onClick={(e) => {
                                                                            handleCommentReactionSubmit(
                                                                                e,
                                                                                // item._id,
                                                                                reelsPostComments[0]?._id,
                                                                                commentitem._id,
                                                                                "",
                                                                                "haha",
                                                                            );
                                                                        }}
                                                                        alt="Haha emoji"
                                                                    />
                                                                    <img
                                                                        src={`${host}/assets/reactions/wow.gif`}
                                                                        onClick={(e) => {
                                                                            handleCommentReactionSubmit(
                                                                                e,
                                                                                // item._id,
                                                                                reelsPostComments[0]?._id,
                                                                                commentitem._id,
                                                                                "",
                                                                                "wow",
                                                                            );
                                                                        }}
                                                                        alt="Wow emoji"
                                                                    />
                                                                    <img
                                                                        src={`${host}/assets/reactions/sad.gif`}
                                                                        onClick={(e) => {
                                                                            handleCommentReactionSubmit(
                                                                                e,
                                                                                // item._id,
                                                                                reelsPostComments[0]?._id,
                                                                                commentitem._id,
                                                                                "",
                                                                                "sad",
                                                                            );
                                                                        }}
                                                                        alt="Sad emoji"
                                                                    />
                                                                    <img
                                                                        src={`${host}/assets/reactions/angry.gif`}
                                                                        onClick={(e) => {
                                                                            handleCommentReactionSubmit(
                                                                                e,
                                                                                // item._id,
                                                                                reelsPostComments[0]?._id,
                                                                                commentitem._id,
                                                                                "",
                                                                                "angry",
                                                                            );
                                                                        }}
                                                                        alt="Angry emoji"
                                                                    />
                                                                </figure>
                                                            </div>
                                                        )}

                                                    <div
                                                        className=""
                                                        onClick={(e) => {
                                                            handleReplyComment(
                                                                e,
                                                                true,
                                                                commentitem._id,
                                                                // item._id,
                                                                reelsPostComments[0]._id
                                                            );
                                                        }}
                                                    >
                                                        <a
                                                            // href={`#${commentitem._id}${item._id}`}
                                                            href={`#${reelsPostComments[0]._id}${reelsPostComments[0]._id
                                                                }`}

                                                            className=""
                                                            style={{ color: "black" }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                className="bi bi-reply-all  ml-2"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                                                                <path d="M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z" />
                                                            </svg>
                                                        </a>
                                                    </div>

                                                    {userId == commentitem.user_id._id && (
                                                        <div
                                                            className=""
                                                            onClick={() => {
                                                                setEditMainCommentStatus(true);
                                                                setEditMainCommentId(commentitem._id),
                                                                    setEditMainCommentPostId(reelsPostComments[0]?._id);
                                                            }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                class="bi bi-pencil-square ml-2 "
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}

                                                    <div className="">
                                                        {commentitem.user_id._id === userId ||
                                                            reelsPostComments[0].user_id?._id === userId ? (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                class="bi bi-trash ml-2"
                                                                viewBox="0 0 16 16"
                                                                onClick={() => {
                                                                    const formData = {
                                                                        comment_id: commentitem._id,
                                                                    };

                                                                    axiosInstance
                                                                        .post(
                                                                            "/api/delete-single-comment-reel",
                                                                            formData,
                                                                        )
                                                                        .then((res) => {
                                                                            axiosInstance
                                                                                .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
                                                                                .then((res) => {
                                                                                    if (res.data.status === 200) {
                                                                                        setReelsPostComments(res.data.post)

                                                                                    }
                                                                                });
                                                                            toast.success(
                                                                                "Comments removed successfully",
                                                                                {
                                                                                    position: "top-right",
                                                                                    style: {
                                                                                        background: "white",
                                                                                        color: "black",
                                                                                    },
                                                                                },
                                                                            );
                                                                        });
                                                                }}
                                                            >
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                            </svg>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>

                                                    <div
                                                        className="mx-2 lead"
                                                        style={{ fontSize: "11px" }}
                                                    >
                                                        {commentitem.comment_edited == true
                                                            ? "Edited"
                                                            : ""}
                                                    </div>

                                                    <div
                                                        className="comment-icon-lists-btn d-flex "
                                                        onClick={(e) =>
                                                            openWhoesReactOnCommentModal(
                                                                e,
                                                                // item._id,
                                                                reelsPostComments[0]?._id,
                                                                commentitem._id,
                                                                "",
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...new Set(
                                                                commentitem.comment_reactions?.map(
                                                                    (reaction) => reaction.reaction_type,
                                                                ),
                                                            ),
                                                        ]
                                                            .slice(0, 2)
                                                            .map((uniqueReaction, index) => (
                                                                <div key={index} className="">
                                                                    <img
                                                                        src={`${host}/assets/reactions/${uniqueReaction}.gif`}
                                                                        alt={`Reaction: ${uniqueReaction}`}
                                                                        style={{ width: "30px" }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        {commentitem.comment_reactions?.length > 0 && (
                                                            <div className="mt-1 text-muted">
                                                                {`${commentitem.comment_reactions.length}`}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* niye gelam */}

                                                {commentitem.replies?.length > 0 && (
                                                    <a
                                                        className={`${viewMoreRepliesLogicCommentId ===
                                                            commentitem._id &&
                                                            viewMoreRepliesLogicPostId === reelsPostComments[0]._id
                                                            ? "d-none"
                                                            : ""
                                                            }`}
                                                        data-toggle="collapse"
                                                        href={`#collapseExample${commentitem._id}`}
                                                        role="button"
                                                        aria-expanded="false"
                                                        aria-controls={`collapseExample${commentitem._id}`}
                                                        onClick={() => {
                                                            setViewMoreRepliesLogicCommentId(
                                                                commentitem._id,
                                                            );
                                                            setViewMoreRepliesLogicPostId(reelsPostComments[0]._id);
                                                        }}
                                                    >
                                                        <span
                                                            style={{ color: "black", fontWeight: "600" }}
                                                        >
                                                            {" "}
                                                            View more replies
                                                        </span>
                                                    </a>
                                                )}

                                                <div
                                                    class="collapse"
                                                    id={`collapseExample${commentitem._id}`}
                                                >
                                                    {commentitem.replies?.length > 0 &&
                                                        commentitem.replies.map(
                                                            (replyComment, replyIndex) => {
                                                                return (
                                                                    <div
                                                                        className="main-comment-reply-div-wrapper border rounded-right py-1 px-2"
                                                                        style={{ backgroundColor: "#f5f5f5" }}
                                                                    >
                                                                        {replyComment.replies_user_id
                                                                            .profile_pic !== null ? (
                                                                            <img
                                                                                className="main-comment-person-image-1"
                                                                                src={`${host}/uploads/${replyComment.replies_user_id &&
                                                                                    replyComment.replies_user_id
                                                                                        .profile_pic
                                                                                    }`}
                                                                                alt=""
                                                                            />
                                                                        ) : (
                                                                            <img
                                                                                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                                                className="comment-header-image-person"
                                                                            />
                                                                        )}

                                                                        {/* </div> */}
                                                                        <div className="main-comment-text rounded">
                                                                            <div className="d-flex justify-content-between">
                                                                                <Link
                                                                                    href={`/profile/${commentitem.user_id.username}`}
                                                                                    style={{ color: "black" }}
                                                                                >
                                                                                    <div
                                                                                        className="comment-txt-person-name "
                                                                                        style={{ cursor: "pointer" }}
                                                                                    >
                                                                                        <span className="">{`${replyComment.replies_user_id.first_name} ${replyComment.replies_user_id.last_name}`}</span>
                                                                                    </div>
                                                                                </Link>
                                                                                <div>
                                                                                    {timeFormat(replyComment.createdAt)}
                                                                                </div>
                                                                            </div>

                                                                            {editMainCommentReplyId !==
                                                                                replyComment._id && (
                                                                                    <div className="comment-txt">
                                                                                        <span className="py-2" dangerouslySetInnerHTML={renderStringWithLink(replyComment.replies_comment_name)}>

                                                                                            {/* {
                                                                                                    replyComment.replies_comment_name
                                                                                                } */}
                                                                                        </span>
                                                                                    </div>
                                                                                )}

                                                                            {/* if someone wants edit  reply comment */}
                                                                            {editMainCommentReplyStatus &&
                                                                                editMainCommentReplyId ==
                                                                                replyComment._id && (
                                                                                    <>
                                                                                        <div className="">
                                                                                            <textarea
                                                                                                id="scrollstyle"
                                                                                                placeholder="Type your comment!"
                                                                                                className="external-class  px-3 border"
                                                                                                onChange={(e) =>
                                                                                                    setEditReplyCommentData(
                                                                                                        e.target.value,
                                                                                                    )
                                                                                                }
                                                                                                onKeyDown={(e) => {
                                                                                                    if (
                                                                                                        e.key === "Enter" &&
                                                                                                        !e.shiftKey
                                                                                                    ) {
                                                                                                        e.preventDefault();
                                                                                                        const editedData = {
                                                                                                            comment_type:
                                                                                                                "reply_comment",
                                                                                                            replies_comment_name:
                                                                                                                editReplyCommentData,
                                                                                                        };
                                                                                                        axiosInstance
                                                                                                            .post(
                                                                                                                `api/update-comments-by-reel-post/${editMainCommentPostId}/${editMainCommentReplyId}`,
                                                                                                                editedData,
                                                                                                            )
                                                                                                            .then((res) => {
                                                                                                                if (
                                                                                                                    res.data.status ==
                                                                                                                    200
                                                                                                                ) {
                                                                                                                    axiosInstance
                                                                                                                        .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
                                                                                                                        .then((res) => {
                                                                                                                            if (res.data.status === 200) {
                                                                                                                                setReelsPostComments(res.data.post)

                                                                                                                            }
                                                                                                                        });
                                                                                                                    setRenderComments(
                                                                                                                        res.data,
                                                                                                                    );
                                                                                                                    setEditMainCommentPostId(
                                                                                                                        null,
                                                                                                                    );
                                                                                                                    setEditMainCommentReplyId(
                                                                                                                        null,
                                                                                                                    );
                                                                                                                    setEditMainCommentReplyStatus(
                                                                                                                        false,
                                                                                                                    );

                                                                                                                    axiosInstance
                                                                                                                        .get(
                                                                                                                            `/api/view-single-main-post-with-comments/${item._id}`,
                                                                                                                        )
                                                                                                                        .then((res) => {
                                                                                                                            if (
                                                                                                                                res.data
                                                                                                                                    .status ===
                                                                                                                                200
                                                                                                                            ) {
                                                                                                                                setCommentTextState(
                                                                                                                                    "",
                                                                                                                                );
                                                                                                                                const postIndex =
                                                                                                                                    allPosts.findIndex(
                                                                                                                                        (post) =>
                                                                                                                                            post._id ===
                                                                                                                                            item._id,
                                                                                                                                    );

                                                                                                                                if (
                                                                                                                                    postIndex !==
                                                                                                                                    -1
                                                                                                                                ) {
                                                                                                                                    const updatedPosts =
                                                                                                                                        [
                                                                                                                                            ...allPosts,
                                                                                                                                        ];
                                                                                                                                    updatedPosts[
                                                                                                                                        postIndex
                                                                                                                                    ] =
                                                                                                                                        res.data.post[0];
                                                                                                                                    setAllposts(
                                                                                                                                        updatedPosts,
                                                                                                                                    );
                                                                                                                                }
                                                                                                                            }
                                                                                                                        });
                                                                                                                }
                                                                                                            });
                                                                                                    }
                                                                                                }}
                                                                                                value={editReplyCommentData}
                                                                                            ></textarea>
                                                                                            <span
                                                                                                href=""
                                                                                                className="float-right "
                                                                                                style={{
                                                                                                    color: "red",
                                                                                                    cursor: "pointer",
                                                                                                }}
                                                                                                onClick={() => {
                                                                                                    setEditMainCommentReplyStatus(
                                                                                                        false,
                                                                                                    ),
                                                                                                        setEditMainCommentReplyId(
                                                                                                            null,
                                                                                                        ),
                                                                                                        setEditMainCommentPostId(
                                                                                                            null,
                                                                                                        );
                                                                                                    setEditReplyCommentImageOrVideo(
                                                                                                        null,
                                                                                                    );
                                                                                                    setEditReplyCommentImageOrVideoFile(
                                                                                                        null,
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                Cancel
                                                                                            </span>
                                                                                        </div>
                                                                                    </>
                                                                                )}

                                                                            <div className="main-comment-reaction-emoji-share-wrapper py-2">
                                                                                <div
                                                                                    className="reaction-comment-container "
                                                                                    onMouseEnter={() => {
                                                                                        setIsReplyCommentReactionHover(
                                                                                            true,
                                                                                        );
                                                                                        setIsReplyCommentReactionHoverId(
                                                                                            replyComment._id,
                                                                                        );
                                                                                    }}
                                                                                    onMouseLeave={() => {
                                                                                        setIsReplyCommentReactionHover(
                                                                                            false,
                                                                                        ),
                                                                                            setIsReplyCommentReactionHoverId(
                                                                                                null,
                                                                                            );
                                                                                    }}
                                                                                >
                                                                                    {/* comment reply reaction logics of a user if this user has reacted or not */}

                                                                                    {replyComment.replies_comment_reactions?.filter(
                                                                                        (reaction) =>
                                                                                            reaction.user_id === userId &&
                                                                                            reaction.comment_replies_id ===
                                                                                            replyComment._id,
                                                                                    )
                                                                                        .map((filteredReaction) => (
                                                                                            <div
                                                                                                key={filteredReaction._id}
                                                                                                style={{ marginTop: "-5px" }}
                                                                                            >
                                                                                                <span
                                                                                                    className=""
                                                                                                    style={{
                                                                                                        color: "red",
                                                                                                        fontSize: "12px",
                                                                                                    }}
                                                                                                >
                                                                                                    {
                                                                                                        filteredReaction.reaction_type
                                                                                                    }{" "}
                                                                                                </span>
                                                                                            </div>
                                                                                        ))}

                                                                                    {/* Render default emoji if no reactions */}
                                                                                    {replyComment.replies_comment_reactions?.filter(
                                                                                        (reaction) =>
                                                                                            reaction.user_id === userId &&
                                                                                            reaction.comment_replies_id ===
                                                                                            replyComment._id,
                                                                                    ).length === 0 && (
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                width="16"
                                                                                                height="16"
                                                                                                fill="currentColor"
                                                                                                className="bi bi-emoji-smile"
                                                                                                viewBox="0 0 16 16"
                                                                                            >
                                                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                                                                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path>
                                                                                            </svg>
                                                                                        )}
                                                                                </div>

                                                                                {/* comment reaction hover and shows the reactions */}
                                                                                {isReplyCommentReactionHover &&
                                                                                    isReplyCommentReactionHoverId ==
                                                                                    replyComment._id && (
                                                                                        <div
                                                                                            onMouseEnter={() => {
                                                                                                setIsReplyCommentReactionHover(
                                                                                                    true,
                                                                                                );
                                                                                                setIsReplyCommentReactionHoverId(
                                                                                                    replyComment._id,
                                                                                                );
                                                                                            }}
                                                                                            onMouseLeave={() => {
                                                                                                setIsReplyCommentReactionHoverId(
                                                                                                    false,
                                                                                                );
                                                                                            }}
                                                                                            className="reaction-comment-icons-wrapper "
                                                                                        >
                                                                                            <figure className="reaction-comment-icons mt-1">
                                                                                                <img
                                                                                                    src={`${host}/assets/reactions/like.gif`}
                                                                                                    alt="Like emoji"
                                                                                                    onClick={(e) => {
                                                                                                        handleCommentReactionSubmit(
                                                                                                            e,
                                                                                                            // item._id,
                                                                                                            reelsPostComments[0]?._id,
                                                                                                            commentitem._id,
                                                                                                            replyComment._id,
                                                                                                            "like",
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                                <img
                                                                                                    src={`${host}/assets/reactions/love.gif`}
                                                                                                    onClick={(e) => {
                                                                                                        handleCommentReactionSubmit(
                                                                                                            e,
                                                                                                            // item._id,
                                                                                                            reelsPostComments[0]?._id,

                                                                                                            commentitem._id,
                                                                                                            replyComment._id,
                                                                                                            "love",
                                                                                                        );
                                                                                                    }}
                                                                                                    alt="Love emoji"
                                                                                                />
                                                                                                <img
                                                                                                    src={`${host}/assets/reactions/haha.gif`}
                                                                                                    onClick={(e) => {
                                                                                                        handleCommentReactionSubmit(
                                                                                                            e,
                                                                                                            // item._id,
                                                                                                            reelsPostComments[0]?._id,

                                                                                                            commentitem._id,
                                                                                                            replyComment._id,
                                                                                                            "haha",
                                                                                                        );
                                                                                                    }}
                                                                                                    alt="Haha emoji"
                                                                                                />
                                                                                                <img
                                                                                                    src={`${host}/assets/reactions/wow.gif`}
                                                                                                    onClick={(e) => {
                                                                                                        handleCommentReactionSubmit(
                                                                                                            e,
                                                                                                            // item._id,
                                                                                                            reelsPostComments[0]?._id,

                                                                                                            commentitem._id,
                                                                                                            replyComment._id,
                                                                                                            "wow",
                                                                                                        );
                                                                                                    }}
                                                                                                    alt="Wow emoji"
                                                                                                />
                                                                                                <img
                                                                                                    src={`${host}/assets/reactions/sad.gif`}
                                                                                                    onClick={(e) => {
                                                                                                        handleCommentReactionSubmit(
                                                                                                            e,
                                                                                                            // item._id,
                                                                                                            reelsPostComments[0]?._id,

                                                                                                            commentitem._id,
                                                                                                            replyComment._id,
                                                                                                            "sad",
                                                                                                        );
                                                                                                    }}
                                                                                                    alt="Sad emoji"
                                                                                                />
                                                                                                <img
                                                                                                    src={`${host}/assets/reactions/angry.gif`}
                                                                                                    onClick={(e) => {
                                                                                                        handleCommentReactionSubmit(
                                                                                                            e,
                                                                                                            // item._id,
                                                                                                            reelsPostComments[0]?._id,

                                                                                                            commentitem._id,
                                                                                                            replyComment._id,
                                                                                                            "angry",
                                                                                                        );
                                                                                                    }}
                                                                                                    alt="Angry emoji"
                                                                                                />
                                                                                            </figure>
                                                                                        </div>
                                                                                    )}

                                                                                <div className="">
                                                                                    <svg
                                                                                        onClick={(e) => {
                                                                                            handleReplyComment(
                                                                                                e,
                                                                                                true,
                                                                                                commentitem._id,
                                                                                                // item._id,
                                                                                                reelsPostComments[0]?._id,

                                                                                            );
                                                                                            // setCommentReplyText(`${replyComment.replies_user_id.first_name} ${replyComment.replies_user_id.last_name}`)
                                                                                        }}
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="16"
                                                                                        height="16"
                                                                                        fill="currentColor"
                                                                                        className="bi bi-reply-all  ml-2"
                                                                                        viewBox="0 0 16 16"
                                                                                    >
                                                                                        <path d="M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                                                                                        <path d="M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z" />
                                                                                    </svg>
                                                                                </div>

                                                                                {replyComment.replies_user_id._id ==
                                                                                    userId && (
                                                                                        <div
                                                                                            className=""
                                                                                            onClick={() => {
                                                                                                setEditMainCommentReplyStatus(
                                                                                                    true,
                                                                                                );
                                                                                                setEditMainCommentReplyId(
                                                                                                    replyComment._id,
                                                                                                ),
                                                                                                    setEditMainCommentPostId(
                                                                                                        // item._id,
                                                                                                        reelsPostComments[0]?._id
                                                                                                    );
                                                                                            }}
                                                                                        >
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                width="16"
                                                                                                height="16"
                                                                                                fill="currentColor"
                                                                                                class="bi bi-pencil-square ml-2"
                                                                                                viewBox="0 0 16 16"
                                                                                            >
                                                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                                                <path
                                                                                                    fill-rule="evenodd"
                                                                                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                                                                />
                                                                                            </svg>
                                                                                        </div>
                                                                                    )}
                                                                                <div className="">
                                                                                    {replyComment.replies_user_id._id ==
                                                                                        userId ||
                                                                                        reelsPostComments[0].user_id._id === userId ? (
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            width="16"
                                                                                            height="16"
                                                                                            fill="currentColor"
                                                                                            class="bi bi-trash ml-2"
                                                                                            viewBox="0 0 16 16"
                                                                                            onClick={() => {
                                                                                                const formData = {
                                                                                                    comment_id:
                                                                                                        replyComment._id,
                                                                                                };

                                                                                                axiosInstance
                                                                                                    .post(
                                                                                                        "/api/delete-single-reply-comment-reel",
                                                                                                        formData,
                                                                                                    )
                                                                                                    .then((res) => {
                                                                                                        axiosInstance
                                                                                                            .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
                                                                                                            .then((res) => {
                                                                                                                if (res.data.status === 200) {
                                                                                                                    setReelsPostComments(res.data.post)

                                                                                                                }
                                                                                                            });
                                                                                                        toast.success(
                                                                                                            "Comments removed successfully",
                                                                                                            {
                                                                                                                position: "top-right",
                                                                                                                style: {
                                                                                                                    background: "white",
                                                                                                                    color: "black",
                                                                                                                },
                                                                                                            },
                                                                                                        );
                                                                                                    });
                                                                                            }}
                                                                                        >
                                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                                        </svg>
                                                                                    ) : (
                                                                                        <></>
                                                                                    )}
                                                                                </div>

                                                                                <div
                                                                                    className="mx-2 lead"
                                                                                    style={{ fontSize: "11px" }}
                                                                                >
                                                                                    {replyComment.comment_edited == true
                                                                                        ? "Edited"
                                                                                        : ""}
                                                                                </div>

                                                                                <div
                                                                                    className="comment-icon-lists-btn d-flex "
                                                                                    onClick={(e) =>
                                                                                        openWhoesReactOnCommentModal(
                                                                                            e,
                                                                                            // item._id,
                                                                                            reelsPostComments[0]?._id,

                                                                                            commentitem._id,
                                                                                            replyComment._id,
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {[
                                                                                        ...new Set(
                                                                                            replyComment.replies_comment_reactions?.map(
                                                                                                (reaction) =>
                                                                                                    reaction.reaction_type,
                                                                                            ),
                                                                                        ),
                                                                                    ]
                                                                                        .slice(0, 2)
                                                                                        .map((uniqueReaction, index) => (
                                                                                            <div key={index} className="">
                                                                                                <img
                                                                                                    className="mx-0 px-0 "
                                                                                                    src={`${host}/assets/reactions/${uniqueReaction}.gif`}
                                                                                                    alt={`Reaction: ${uniqueReaction}`}
                                                                                                    style={{ width: "30px" }}
                                                                                                />
                                                                                            </div>
                                                                                        ))}
                                                                                    {replyComment
                                                                                        .replies_comment_reactions
                                                                                        ?.length > 0 && (
                                                                                            <div className="mt-1 text-muted">
                                                                                                {`${replyComment.replies_comment_reactions.length}`}
                                                                                            </div>
                                                                                        )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                </div>

                                                {/* Comment reply form input render (if someone want to reply main comment ) */}
                                                {/* {
                                                        commentitem.replies.length > 0 &&
                                                        commentReplyTextRender &&
                                                        commentIdReplyId == commentitem._id && (
                                                            <div className='main-comment-reply-div-wrapper'>
                                                                {profileImage !== null ? (

                                                                    <img src={`${host}/uploads/${profileImage}`} className='main-comment-person-image-1' />
                                                                ) : (
                                                                    <img
                                                                        src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                                                                        className='main-comment-person-image-1 '
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />
                                                                )}


                                                                <div className='w-100 main-comment-div' >
                                                                    <form onSubmit={
                                                                        (e) => handleCommentReplySubmit(e)
                                                                    }
                                                                    >
                                                                        <textarea
                                                                            aria-label="empty textarea"
                                                                            placeholder="Type your comment..."

                                                                            value={commentReplyText}
                                                                            onChange={(e) => setCommentReplyText(e.target.value)}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                                                    e.preventDefault();
                                                                                    handleCommentReplySubmit(e);
                                                                                }
                                                                            }}
                                                                            className='external-class px-3 '
                                                                        />
                                                                    </form>


                                                                </div>
                                                            </div>
                                                        )
                                                    } */}

                                                {/* niye gelam code theke niye aslam */}
                                                {
                                                    // replyCommentStatus &&
                                                    // commentitem.replies.length == 0 &&
                                                    commentReplyTextRender &&
                                                    commentIdReplyId == commentitem._id && (
                                                        <div
                                                            className="main-comment-reply-div-wrapper"
                                                            id={`${commentitem._id}${reelsPostComments[0]._id}`}
                                                        >
                                                            {profileImage !== null ? (
                                                                <img
                                                                    src={`${host}/uploads/${profileImage}`}
                                                                    className="main-comment-person-image-1"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                                                    className="main-comment-person-image-1 "
                                                                // style={{
                                                                //     width: "100%",
                                                                //     height: "100%",
                                                                //     objectFit: "cover",
                                                                // }}
                                                                />
                                                            )}

                                                            {/* </div> */}
                                                            {/* <div className='main-comment-text '> */}

                                                            <div className="w-100 main-comment-div ">
                                                                <form
                                                                    onSubmit={(e) =>
                                                                        handleCommentReplySubmit(e)
                                                                    }
                                                                >
                                                                    <textarea
                                                                        aria-label="empty textarea"
                                                                        placeholder="Type your comment..."
                                                                        value={commentReplyText}
                                                                        onChange={(e) =>
                                                                            setCommentReplyText(e.target.value)
                                                                        }
                                                                        onKeyDown={(e) => {
                                                                            if (
                                                                                e.key === "Enter" &&
                                                                                !e.shiftKey
                                                                            ) {
                                                                                e.preventDefault();
                                                                                handleCommentReplySubmit(e);
                                                                            }
                                                                        }}
                                                                        className="external-class px-3 "
                                                                    />
                                                                </form>
                                                            </div>
                                                            {/* </div> */}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>




                    </div>






                    {/* Post reaction user lists modal view code starts */}
                    <WhoesAreReactedOnPost
                        isOpen={modalwhoesReactOnPostIsOpen}
                        onClose={closeWhoesReactOnPostModal}
                        value={value}
                        handleChange={handleChange}
                        reactedUserListsOfDirectPosts={reactedUserListsOfDirectPosts}
                    />

                    {/* Post reaction user lists modal view code ends*/}

                    {/* Comment Reaction User Lists functionality starts */}
                    <WhoesAreReactedOnComment
                        isOpen={modalwhoesReactOnCommentIsOpen}
                        onClose={closeWhoesReactOnCommentModal}
                        value={value}
                        handleChange={handleChange}
                        reactedUserListsOfDirectPostsComments={
                            reactedUserListsOfDirectPostsComments
                        }
                    />
                    {/* Comment Reaction User Lists functionality ends */}

                </div>
            </div >

        </>
    )
}



export default page


