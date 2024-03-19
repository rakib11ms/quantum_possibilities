"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopNavbar from "../../../component/navbar/page";
import "../reelsStyle.css";
import ReactPlayer from "react-player";
import axiosInstance from "../../../../utils/axios";
import { frontendHost, host } from "@/environment";
import Link from "next/link";
// import { useRouter } from 'next/router';
import { useParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLink,
    faSave,
    faTrash,
    faThumbsUp,
    faComment,
    faArrowLeft,
    faArrowRight, faShare
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import WhoesAreReactedOnComment from "@/component/NewsFeed/WhoesAreReactedOnComment";
import WhoesAreReactedOnPost from "@/component/NewsFeed/WhoesAreReactedOnPost";
import timeFormat from "../../../../utils/CommentTimeFormat";


import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import ProfileHeader from "@/component/ProfileHeader";
import "../../../assets/css/profile.css";


function page() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex === activeTab ? null : tabIndex);
    };






























    const [loginUserId, setLoginUserId] = useState("");
    console.log("login userid", loginUserId);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUserInfo = localStorage.getItem("userInfo");

            if (localUserInfo) {
                setLoginUserId(JSON.parse(localUserInfo)[0]._id);
            }
        }
    }, []);
    const router1 = useParams();
    const router = useRouter();
    // const reelId = router.reelId;
    const [reelId, setReelId] = useState("");
    // Set reelId from the router
    useEffect(() => {
        setReelId(router1.reelId);
    }, [router1.reelId]);

    const [allReels, setAllReels] = useState([]);
    console.log("all reels", allReels)
    const [currentReelIndex, setCurrentReelIndex] = useState(0);

    console.log("current reel index", currentReelIndex);
    const [singleReelData, setSingleReelData] = useState("");

    console.log("singleReelData", singleReelData);
    const [totalReels, setTotalReels] = useState(0);

    // Fetch all user reels when reelId changes or on initial load
    useEffect(() => {
        axiosInstance.get("/api/get-all-individual-user-reels").then((res) => {
            if (res.data.status === 200) {
                const reels = res.data.all_reels;
                setAllReels(reels);
                setTotalReels(reels.length);
            }
        });

    }, []);

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
        console.log("curre", currentReelIndex);
        if (nextIndex === totalReels) {
            nextIndex = 0;
        }
        // Make sure allReels has data before attempting to access it
        if (allReels.length >= 0) {
            const nextReel = allReels[nextIndex];
            setCurrentReelIndex(nextIndex);
            setSingleReelData(allReels[nextIndex]);
            setpostid(allReels[nextIndex]._id);
            // router.push(`/reel/${nextReel._id}`);
            axiosInstance
                .get(`/api/view-single-reel-with-comments/${allReels[nextIndex]._id}`)
                .then((res) => {
                    if (res.data.status === 200) {
                        setReelsPostComments(res.data.post);

                    }
                });
        }
    };
    const handlePrevButton = () => {
        console.log("prev", currentReelIndex);
        let nextIndex = currentReelIndex - 1;
        if (nextIndex < 0) {
            nextIndex = 0;
        }
        const nextReel = allReels[nextIndex];
        setCurrentReelIndex(nextIndex);
        setSingleReelData(nextReel);
        setpostid(nextReel._id);
        axiosInstance
            .get(`/api/view-single-reel-with-comments/${nextReel._id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    setReelsPostComments(res.data.post);

                }
            });
        // console.log(allReels[nextIndex]);
        // router.push(`/reel/${nextReel._id}`);
    };

    console.log(
        "total reels",
        currentReelIndex,
        allReels.length,
        allReels[currentReelIndex]
    );

    const handleDeleteReels = (e) => {
        e.preventDefault();
        axiosInstance
            .delete(`/api/delete-own-user-reel/${singleReelData._id}`)
            .then((res) => {
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
                    setCurrentReelIndex(currentReelIndex + 1);
                    const nextReel = allReels[nextIndex];
                    setCurrentReelIndex(nextIndex);
                    setSingleReelData(nextReel);
                }
            });
    };

    const copyToClipboardReelsLink = () => {
        const inputValue = `${frontendHost}/reel/${singleReelData._id}`;
        navigator.clipboard
            .writeText(inputValue)
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
                console.error("Failed to copy text: ", error);
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
    };

    //comment all functionality starts //

    // const [postid, setpostid] = useState("658aa48f2aa024da4018fc9b");
    const [postid, setpostid] = useState("");
    const [reelsPostComments, setReelsPostComments] = useState("");

    console.log("Guyssssssss", singleReelData, reelsPostComments);

    useEffect(() => {
        if (singleReelData._id !== undefined) {
            axiosInstance
                .get(`/api/view-single-reel-with-comments/${singleReelData?._id}`)
                .then((res) => {
                    if (res.data.status === 200) {
                        setReelsPostComments(res.data.post);
                    }
                });
        }

    }, [singleReelData]);

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
        commentimagevideotype
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
                                    setReelsPostComments(res.data.post);
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
                                    setReelsPostComments(res.data.post);
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
                .post("/api/save-reaction-reel-post", submitReactionData)
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
                        axiosInstance
                            .get(`/api/view-single-reel-with-comments/${singleReelData._id}`)
                            .then((res) => {
                                if (res.data.status === 200) {
                                    setReelsPostComments(res.data.post);

                                }
                            });
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
        clicktoSeeWhoReactedPostId
    );
    useEffect(() => {
        if (clicktoSeeWhoReactedPostId) {
            axiosInstance
                .get(
                    `/api/reaction-user-lists-of-direct-post/${clicktoSeeWhoReactedPostId}`
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
        editCommentImageOrVideo
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
        editReplyCommentImageOrVideo
    );

    async function getEditMainCommentData() {
        axiosInstance
            .get(
                `/api/edit-comment-by-reel-post/${editMainCommentPostId}/${editMainCommentId}/main_comment`
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
                `/api/edit-comment-by-reel-post/${editMainCommentPostId}/${editMainCommentReplyId}/reply_comment`
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
        commentReactionCurrentType
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
                                setReelsPostComments(res.data.post);
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
        reactedUserListsOfDirectPostsComments
    );

    function openWhoesReactOnCommentModal(
        e,
        reactionPostId,
        commentId,
        commentRepliesId
    ) {
        setModalwhoesReactOnCommentIsOpen(true);
        // setClicktoSeeWhoReactedPostId(reactionPostId);
        axiosInstance
            .get(
                `/api/reaction-user-lists-comments-of-a-reel-post/${reactionPostId}/${commentId}/${commentRepliesId || "null"
                }`
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
                                    (post) => post._id === postid
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

    const [fullViewTrigger, setFullViewTrigger] = useState(true);
    // console.log("full view trigger", fullViewTrigger)

    return (
        <>
            <Masterdashboardlayout headerName='Photos'>
                <div>
                    <div className='profile-phot-header-div'>
                        <ProfileHeader active={'myreel'} />
                    </div>

                    <div className='profile-all-photos-div ' style={{ padding: "7px 12px" }}>
                        <div>
                            <div className='photos-text-one-div '>
                                <h6>My Reels</h6>
                            </div>


                        </div>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">My reels</button>
                            </li>
                            {/* <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Saved reels</button>
                            </li> */}

                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="view-all-reels-wrapper mt-2">
                                    {
                                        allReels.map((item, i) => {
                                            return (
                                                <Link href={`/myreel/reels/${item._id}`}>
                                                    <div key={i} className="single-reels-item" >
                                                        <ReactPlayer
                                                            url={`${host}/${item.video}`}
                                                            className="rounded-3"
                                                            width="100%"
                                                            height="100%"
                                                            controls
                                                            // playing
                                                            style={{ position: 'relative' }}
                                                            config={{
                                                                youtube: {
                                                                    playerVars: { controls: 0, disablekb: 1 }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </Link>

                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                2nd tab Section content
                            </div>

                        </div>
                    </div>
                </div>
            </Masterdashboardlayout>
        </>
    );
}

export default page;
