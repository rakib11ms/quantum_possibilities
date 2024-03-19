// import Modal from "react-modal";
import React, {useState, useEffect} from "react";
import feedauthtwo from "../../assets/img/avatar7-sm.jpg";
import feedauthsix from "../../assets/img/friend-harmonic9.jpg";
import commentSvg from "../../../public/custom-svg-icon/Comment.svg";
import shareSvg from "../../../public/custom-svg-icon/Share.svg";
import heartSvg from "../../../public/custom-svg-icon/Heart.svg";
import threedot from "../../../public/custom-svg-icon/threedot.svg";
import postHovericonOne from "../../../public/postHovericonOne.svg";
import modalAuth from "../../assets/img/author-page.jpg";
import GroupPostImg from "../../../public/groupPostImg.png";

import postHovericontwo from "../../../public/postHovericontwo.svg";
import Image from "next/image";
import axiosInstance from "../../../utils/axios";
import timeFormat from "../../../utils/CommentTimeFormat";
import {useRef} from "react";
import {host} from "@/environment";
import moment from "moment";
import CommentList from "./CommentList";
import Link from "next/link";
// import "../../assets/css/post.css";
import "../../app/newsfeed/postMediaGrid.css";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import photoSvg from "../../../public/custom-svg-icon/photo.svg";
import reelsSvg from "../../../public/custom-svg-icon/reels.svg";
import storySvg from "../../../public/custom-svg-icon/story.svg";
import gallerySvg from "../../../public/custom-svg-icon/gallery.svg";
import locationSvg from "../../../public/custom-svg-icon/location.svg";
import addfriendSvg from "../../../public/custom-svg-icon/addfriend.svg";
import WhoesAreReactedOnPost from "./WhoesAreReactedOnPost";
import WhoesAreReactedOnComment from "./WhoesAreReactedOnComment";
import {Tabs, Tab, Box, Typography, Paper} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhotoVideo} from "@fortawesome/free-solid-svg-icons";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faEarthAmericas} from "@fortawesome/free-solid-svg-icons";
import {faLock} from "@fortawesome/free-solid-svg-icons";
// import Select from 'react-select';

import {Select, MenuItem, InputLabel, FormControl, Modal} from "@mui/material";
// import { Modal as MuiModal } from "@mui/material/Modal";

import {TextareaAutosize as BaseTextareaAutosize} from "@mui/base/TextareaAutosize";
// import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import {styled} from "@mui/system";
import "../../app/check/sty.css";
import PostWrapper from "./Post/PostWrapper";

// Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  "@media (max-width: 1367px)": {
    maxHeight: "80vh", // Set a maximum height and enable vertical scrolling
    overflowY: "auto",
    overflowX: "hidden", // Hide the horizontal scrollbar
  },

  // Media query for screen width greater than 1370px
  "@media (min-width: 1370px)": {
    position: "fixed",
  },
};

const PostList = () => {
  // timeFormat("2023-11-20T07:19:33.622Z"
  // )

  const [userId, setUserId] = useState("");
  // console.log('userII', userId)
  const [isHovered, setIsHovered] = useState(false);
  const [fullName, setFullName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [editModal, setEditModal] = useState(false);
  // console.log('user name', userName)
  const [profileImage, setprofileImage] = useState("");
  const [postReactionCurrentType, setPostReactionCurrentType] = useState(null);

  const [allPosts, setAllposts] = useState([]);

  //share Post
  const [sharePost, setSharePost] = useState({});

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function allPostss() {
    axiosInstance.get("/api/get-all-users-posts").then((res) => {
      if (res.data.status == 200) {
        setAllposts(res.data.posts);
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

  const [singleSharePost, setSingleSharePost] = useState({
    description: "",
    privacy: "public",
  });
  console.log(singleSharePost, "singleSharePost");
  //post privacy functionality starts
  // const customPrivacyStyles = {
  //   control: (provided, state) => ({
  //     ...provided,
  //     border: 'none',
  //     boxShadow: 'none',
  //     paddingRight: '2px',
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //   }),
  //   dropdownIndicator: (provided) => ({
  //     ...provided,
  //     marginLeft: '-2px',
  //     marginRight: '1px',
  //   }),
  //   option: (provided, state) => ({
  //     ...provided,
  //     backgroundColor: state.data.value === selectedOptions[item._id]?.value ? '#3498db' : 'inherit',
  //     '&:hover': {
  //       backgroundColor: '#e0e0e0',
  //     },
  //     // Highlight selected option
  //     ...(state.isSelected && { backgroundColor: '#3498db', color: '#ffffff' }),
  //   }),
  // };

  // const options = [
  //   { value: 'public', label: 'Public', icon: <FontAwesomeIcon icon={faEarthAmericas} /> },
  //   { value: 'friends', label: 'Friends', icon: <FontAwesomeIcon icon={faUsers} /> },
  //   { value: 'only_me', label: 'Only me', icon: <FontAwesomeIcon icon={faLock} /> },
  // ];

  // const [selectedOptions, setSelectedOptions] = useState({});
  // console.log("checking", selectedOptions)

  // useEffect(() => {
  //   const updatedSelectedOptions = {};
  //   allPosts.forEach((post) => {
  //     updatedSelectedOptions[post._id] = options.find((opt) => opt.value === post.post_privacy);
  //   });

  //   setSelectedOptions(updatedSelectedOptions);
  // }, [allPosts]); // Run this effect whenever allPosts changes

  // const handlePostPrivacyChange = (itemId, selectedOption) => {
  //   setSelectedOptions({
  //     ...selectedOptions,
  //     [itemId]: selectedOption,
  //   });
  // };

  const shareToPublic = (post_id) => {
    console.log(post_id, "share");
    axiosInstance
      .post("/api/save-share-post", {
        share_post_id: post_id,
      })
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });
          allPostss();
        } else {
          if (res.data.status == 201) {
            toast.error(res.data.message, {
              position: "top-right",
              style: {
                background: "white",
                color: "black",
              },
            });
          }
        }
      });
  };
  const saveSharePost = (post_id) => {
    console.log(post_id, "share");
    const formData = {
      share_post_id: post_id,
      description: singleSharePost.description,
      privacy: singleSharePost.privacy,
    };
    axiosInstance.post("/api/save-share-post-with-caption", formData).then((res) => {
      if (res.data.status == 200) {
        toast.success(res.data.message, {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });
        allPostss();
        handleClose();
      } else {
        if (res.data.status == 201) {
          toast.error(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });
        }
      }
    });
  };

  const [selectedOption, setSelectedOption] = useState([{id: "", post_privacy: ""}]);
  console.log("sona", selectedOption);

  useEffect(() => {
    const data = allPosts.map((item) => ({
      id: item._id,
      post_privacy: item.post_privacy,
    }));
    setSelectedOption(data);
  }, [allPosts]);

  const options = [
    {
      value: "public",
      label: "Public",
      icon: <FontAwesomeIcon icon={faEarthAmericas} />,
    },
    {
      value: "friends",
      label: "Friends",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
      value: "only_me",
      label: "Only me",
      icon: <FontAwesomeIcon icon={faLock} />,
    },
  ];

  const handlePostPrivacyChange = (postId, privacyValue) => {
    const post_privacy = {
      post_privacy: privacyValue,
    };
    axiosInstance.patch(`api/update-post-privacy-of-direct-post/${postId}`, post_privacy).then((res) => {
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
          {id: postId, post_privacy: privacyValue},
          ...prevOptions.slice(index + 1),
        ];
      } else {
        return [...prevOptions, {id: postId, post_privacy: privacyValue}];
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

  console.log("commentTextState", commentTextState);

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
        .post("api/save-user-comment-by-post", formData, {
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
            axiosInstance.get(`/api/view-single-main-post-with-comments/${postSubmitID}`).then((res) => {
              if (res.data.status === 200) {
                setCommentTextState({});
                // setCommentImageOrVideoFile(null);
                const postIndex = allPosts.findIndex((post) => post._id === postSubmitID);

                if (postIndex !== -1) {
                  const updatedPosts = [...allPosts];
                  updatedPosts[postIndex] = res.data.post[0];
                  setAllposts(updatedPosts);
                }
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
      e.preventDefault(); // Prevent the default behavior (creating a new line)
      toast.error("Comment cannot be empty", {
        position: "top-right",
        style: {
          background: "white",
          color: "red",
        },
      });
    } else {
      axiosInstance
        .post("api/reply-comment-by-direct-post", formData, {
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
            axiosInstance.get(`/api/view-single-main-post-with-comments/${commentReplyPostId}`).then((res) => {
              if (res.data.status === 200) {
                setCommentTextState("");
                const postIndex = allPosts.findIndex((post) => post._id === commentReplyPostId);

                if (postIndex !== -1) {
                  const updatedPosts = [...allPosts];
                  updatedPosts[postIndex] = res.data.post[0];
                  setAllposts(updatedPosts);
                }
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
      axiosInstance.post("/api/save-reaction-main-post", submitReactionData).then((res) => {
        if (res.data.status == 200) {
          setReactionPostId(null);
          setPostReactionCurrentType(null);
          toast.success("Post reaction updated", {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
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
  const [modalwhoesReactOnPostIsOpen, setModalwhoesReactOnPostIsOpen] = React.useState(false);

  const [clicktoSeeWhoReactedPostId, setClicktoSeeWhoReactedPostId] = useState(null);

  const [reactedUserListsOfDirectPosts, setReactedUserListsOfDirectPosts] = useState([]);
  console.log("reactedUserListsOfDirectPosts", reactedUserListsOfDirectPosts, clicktoSeeWhoReactedPostId);
  useEffect(() => {
    if (clicktoSeeWhoReactedPostId) {
      axiosInstance.get(`/api/reaction-user-lists-of-direct-post/${clicktoSeeWhoReactedPostId}`).then((res) => {
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
  const [editCommentImageOrVideo, setEditMainCommentImageOrVideo] = useState(null);

  console.log("edit main comment data", editCommentData, editCommentImageOrVideo);

  // const [postid, setpostid] = useState(null);
  // const [commentid, setcommentid] = useState(null);
  const [editcommentImageOrVideoFile, setEditCommentImageOrVideoFile] = useState(null);
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
  const [editMainCommentReplyStatus, setEditMainCommentReplyStatus] = useState(false);
  const [editReplyCommentImageOrVideo, setEditReplyCommentImageOrVideo] = useState(null);
  const [editReplyCommentImageOrVideoFile, setEditReplyCommentImageOrVideoFile] = useState(null);

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
      .get(`/api/edit-comment-by-direct-post/${editMainCommentPostId}/${editMainCommentId}/main_comment`)
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
      .get(`/api/edit-comment-by-direct-post/${editMainCommentPostId}/${editMainCommentReplyId}/reply_comment`)
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
  const [isReplyCommentReactionHover, setIsReplyCommentReactionHover] = useState(false);
  const [isCommentReactionHoverId, setIsCommentReactionHoverId] = useState(null);
  const [isReplyCommentReactionHoverId, setIsReplyCommentReactionHoverId] = useState(null);

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
    axiosInstance.post("api/save-comment-reaction-of-direct-post", commentReactionData).then((res) => {
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
        axiosInstance.get(`/api/view-single-main-post-with-comments/${commentReactionPostID}`).then((res) => {
          if (res.data.status === 200) {
            setCommentTextState("");

            const postIndex = allPosts.findIndex((post) => post._id === commentReactionPostID);

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

  //whoes are reacted lists on main post functionality starts
  const [modalwhoesReactOnCommentIsOpen, setModalwhoesReactOnCommentIsOpen] = React.useState(false);

  // const [clicktoSeeWhoReactedPostId, setClicktoSeeWhoReactedPostId] =
  //   useState(null);

  const [reactedUserListsOfDirectPostsComments, setReactedUserListsOfDirectPostsComments] = useState([]);
  console.log("reactedUserListsOfDirectPostsComments", reactedUserListsOfDirectPostsComments);

  function openWhoesReactOnCommentModal(e, reactionPostId, commentId, commentRepliesId) {
    setModalwhoesReactOnCommentIsOpen(true);
    // setClicktoSeeWhoReactedPostId(reactionPostId);
    axiosInstance
      .get(
        `/api/reaction-user-lists-comments-of-a-direct-post/${reactionPostId}/${commentId}/${
          commentRepliesId || "null"
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
  const [isLoading, setIsLoading] = useState(false);

  const [postid, setpostid] = useState(null);
  const [commentid, setcommentid] = useState(null);
  const [commentImageOrVideoFile, setCommentImageOrVideoFile] = useState(null);

  const [commenttype, setcommenttype] = useState(null);
  const [commentReplyImageOrVideoFile, setCommentReplyImageOrVideoFile] = useState(null);
  // console.log('commentImageOrVideoFile', commentImageOrVideoFile, "postid", postid, "commentid", commentid, "comment type", commenttype);
  // console.log('commentReplyImageOrVideoFile', commentReplyImageOrVideoFile, "postid", postid, "commentid", commentid, "comment type", commenttype);
  const handleCommentImageVideo = (e, postid, commenttype) => {
    setCommentImageOrVideoFile(e.target.files[0]);
    setpostid(postid);
    // setcommentid(commentid);
    setcommenttype(commenttype);
  };

  console.log("comment img or video file check", commentImageOrVideoFile);

  const handleCommentReplyImageVideo = (e, postid, commentid, commenttype) => {
    setCommentReplyImageOrVideoFile(e.target.files[0]);
    setpostid(postid);
    setcommentid(commentid);
    setcommenttype(commenttype);
  };

  const submitMainCommentWithImageOrVideo = (e) => {
    e.preventDefault();
    setCommentImageOrVideoFile(null);
    setIsLoading(true);

    const commentText = commentTextState[postid] || "";
    const formData = new FormData();
    formData.append("comment_name", commentText);
    formData.append("image_or_video", commentImageOrVideoFile);
    formData.append("post_id", postid);
    // formData.append("comment_id", commentid);

    axiosInstance
      .post("api/save-user-comment-by-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setIsLoading(false);
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
          axiosInstance.get(`/api/view-single-main-post-with-comments/${postid}`).then((res) => {
            if (res.data.status === 200) {
              setpostid(null);
              setcommentid(null);
              setCommentTextState({});
              setCommentImageOrVideoFile(null);
              const postIndex = allPosts.findIndex((post) => post._id === postid);

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
          axiosInstance.get(`/api/view-single-main-post-with-comments/${postid}`).then((res) => {
            if (res.data.status === 200) {
              setpostid(null);
              setcommentid(null);
              setCommentTextState({});
              setCommentImageOrVideoFile(null);
              const postIndex = allPosts.findIndex((post) => post._id === postid);

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
  const [viewMoreRepliesLogicCommentId, setViewMoreRepliesLogicCommentId] = useState("");
  const [viewMoreRepliesLogicPostId, setViewMoreRepliesLogicPostId] = useState("");

  //view more replies logic functionality ends

  return (
    <div>
      {allPosts.map((item, i) => {
        // Check if the user has reacted to this post
        const userHasReacted =
          allMainPostReactions && allMainPostReactions.some((reaction) => reaction.post_id === item._id);

        return (
          // TODO->POST Design Start here
          <PostWrapper post={item} />
        );
      })}

      <Modal isOpen={editModal} style={customStyles1} onRequestClose={closeEditModal}>
        <form>
          <div className="d-flex align-items-center mt-4 m-1">
            {/* <div className=""> */}
            {/* <div className="author-thumbs" >
                          <img src={feedauthone.src} alt="author" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'contain' }} />


                        </div> */}

            {profileImage !== null ? (
              <div className="author-thumbs">
                <img src={`${host}/uploads/${profileImage}`} alt="" className="avatar " />
              </div>
            ) : (
              <div className="author-thumbs">
                <img
                  src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                  className="avatar "
                />
              </div>
            )}

            <div className="mx-2">
              {/* activityData.activity_name  */}
              {/* <h6>{`${fullName} `}
                                {` ${activityData.activity_name != "" ? "is" : ''} `}
                                {activityData.logo != "" ? <img src={`${host}/assets/${activityData.logo}`} className="feeling-icon" /> : ''}
                                {` ${activityData.activity_type != "" ? activityData.activity_type : ''} `}
                                {` ${activityData.activity_name != "" ? activityData.activity_name : ''} `}
                                {`${locationChildData !== null ? `is at ${locationChildData.location_name}` : ''}`}
                            </h6> */}

              {/* {
                            locationChildData !== null && locationChildData.location_name
                          } */}
            </div>
          </div>

          <div className="form-group with-icon label-floating is-empty border rounded m-1">
            {/* <label className="control-label">
                          Share what you are thinking here...
                        </label> */}

            {/* <textarea
                          ref={input}
                          type="text"
                          className="form-control"
                          style={{
                            height: height + 'px',
                            border: 'none',
                            width: '100%',
                            minHeight: '80px', // Set a minimum height
                          }}
                          onInput={handleInputChange}
                        /> */}

            <div className="">
              <textarea
                className="form-control "
                placeholder=" Share what you are thinking here..."
                // defaultValue={""}
                style={{border: "none", minHeight: "135px"}}
                // value={content}
                // onChange={handleContentChange}
              />
            </div>

            {/* Display uploaded files in a single grid */}
            <div className="grid-container">
              {/* {files.length > 0 &&
                                files.map((file, index) => (
                                    <div key={`file-${index}`} className="grid-item">
                                        {file.type.startsWith("image/") ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Uploaded Image ${index}`}
                                            // width="200"
                                            // height="200"
                                            />
                                        ) : file.type.startsWith("video/") ? (
                                            // <video width="200" height="200" controls>
                                            <video controls>
                                                <source
                                                    src={URL.createObjectURL(file)}
                                                    type={file.type}
                                                />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : null}
                                    </div>
                                ))} */}
            </div>
          </div>
          <div className="post-field-icons">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-9 col-6 ">
                <span className="p-text-add text-black">Add to your post</span>
              </div>
              <div className="post-field-single-icon  col-lg-3 col-md-3 col-sm-3 col-6 d-flex align-items-center ">
                {/* <Image src={photoSvg.src} width="20" height="20" onClick={handlePostImageUpload} /> */}
                {/* <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} /> */}

                <div className="post-media-icon ">
                  <Image
                    src={photoSvg.src}
                    width="20"
                    height="20"
                    className=""
                    name="media"
                    // onClick={handlePostImageUpload}
                  />
                  <input
                    type="file"
                    className="media-file"
                    name="media"
                    accept="image/*,video/*"
                    multiple
                    // onChange={handleFileUpload}
                  />
                </div>

                {/* <div>
                                    <Image
                                        src={locationSvg.src}
                                        width="20"
                                        height="20"
                                        onClick={openModal}
                                    />
                                </div> */}
                <div>
                  <Image src={addfriendSvg.src} width="20" height="20" />
                </div>
                <div>
                  <Image src={gallerySvg.src} width="20" height="20" />
                </div>
                <div className="">
                  <span
                  // onClick={setFeelingModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="black"
                      className="bi bi-three-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="post-btton-div">
            <button className="post-btton" type="submit">
              Post
            </button>
          </div>
        </form>
      </Modal>

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
        reactedUserListsOfDirectPostsComments={reactedUserListsOfDirectPostsComments}
      />
      {/* Comment Reaction User Lists functionality ends */}
    </div>
  );
};

export default PostList;




      <Modal isOpen={editModal} style={customStyles1} onRequestClose={closeEditModal}>
        <form>
          <div className="d-flex align-items-center mt-4 m-1">
            {/* <div className=""> */}
            {/* <div className="author-thumbs" >
                          <img src={feedauthone.src} alt="author" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'contain' }} />


                        </div> */}

            {profileImage !== null ? (
              <div className="author-thumbs">
                <img src={`${host}/uploads/${profileImage}`} alt="" className="avatar " />
              </div>
            ) : (
              <div className="author-thumbs">
                <img
                  src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                  className="avatar "
                />
              </div>
            )}

            <div className="mx-2">
              {/* activityData.activity_name  */}
              {/* <h6>{`${fullName} `}
                                {` ${activityData.activity_name != "" ? "is" : ''} `}
                                {activityData.logo != "" ? <img src={`${host}/assets/${activityData.logo}`} className="feeling-icon" /> : ''}
                                {` ${activityData.activity_type != "" ? activityData.activity_type : ''} `}
                                {` ${activityData.activity_name != "" ? activityData.activity_name : ''} `}
                                {`${locationChildData !== null ? `is at ${locationChildData.location_name}` : ''}`}
                            </h6> */}

              {/* {
                            locationChildData !== null && locationChildData.location_name
                          } */}
            </div>
          </div>

          <div className="form-group with-icon label-floating is-empty border rounded m-1">
            {/* <label className="control-label">
                          Share what you are thinking here...
                        </label> */}

            {/* <textarea
                          ref={input}
                          type="text"
                          className="form-control"
                          style={{
                            height: height + 'px',
                            border: 'none',
                            width: '100%',
                            minHeight: '80px', // Set a minimum height
                          }}
                          onInput={handleInputChange}
                        /> */}

            <div className="">
              <textarea
                className="form-control "
                placeholder=" Share what you are thinking here..."
                // defaultValue={""}
                style={{border: "none", minHeight: "135px"}}
                // value={content}
                // onChange={handleContentChange}
              />
            </div>

            {/* Display uploaded files in a single grid */}
            <div className="grid-container">
              {/* {files.length > 0 &&
                                files.map((file, index) => (
                                    <div key={`file-${index}`} className="grid-item">
                                        {file.type.startsWith("image/") ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Uploaded Image ${index}`}
                                            // width="200"
                                            // height="200"
                                            />
                                        ) : file.type.startsWith("video/") ? (
                                            // <video width="200" height="200" controls>
                                            <video controls>
                                                <source
                                                    src={URL.createObjectURL(file)}
                                                    type={file.type}
                                                />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : null}
                                    </div>
                                ))} */}
            </div>
          </div>
          <div className="post-field-icons">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-9 col-6 ">
                <span className="p-text-add text-black">Add to your post</span>
              </div>
              <div className="post-field-single-icon  col-lg-3 col-md-3 col-sm-3 col-6 d-flex align-items-center ">
                {/* <Image src={photoSvg.src} width="20" height="20" onClick={handlePostImageUpload} /> */}
                {/* <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} /> */}

                <div className="post-media-icon ">
                  <Image
                    src={photoSvg.src}
                    width="20"
                    height="20"
                    className=""
                    name="media"
                    // onClick={handlePostImageUpload}
                  />
                  <input
                    type="file"
                    className="media-file"
                    name="media"
                    accept="image/*,video/*"
                    multiple
                    // onChange={handleFileUpload}
                  />
                </div>

                {/* <div>
                                    <Image
                                        src={locationSvg.src}
                                        width="20"
                                        height="20"
                                        onClick={openModal}
                                    />
                                </div> */}
                <div>
                  <Image src={addfriendSvg.src} width="20" height="20" />
                </div>
                <div>
                  <Image src={gallerySvg.src} width="20" height="20" />
                </div>
                <div className="">
                  <span
                  // onClick={setFeelingModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="black"
                      className="bi bi-three-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="post-btton-div">
            <button className="post-btton" type="submit">
              Post
            </button>
          </div>
        </form>
      </Modal>

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
        reactedUserListsOfDirectPostsComments={reactedUserListsOfDirectPostsComments}
      />
      {/* Comment Reaction User Lists functionality ends */}



       const [userId, setUserId] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [fullName, setFullName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [editModal, setEditModal] = useState(false);
  const [profileImage, setprofileImage] = useState("");
  const [postReactionCurrentType, setPostReactionCurrentType] = useState(null);
  const [allPosts, setAllposts] = useState([]);
  const [sharePost, setSharePost] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [renderComments, setRenderComments] = useState("");
  const [postIdWhenCommentSubmit, setPostIdWhenCommentSubmit] = useState(null);
  const [commentTextState, setCommentTextState] = useState("");
  const [commentReplyTextRender, setCommentReplyTextRender] = useState(false);
  const [commentIdReplyId, setCommentIdReplyId] = useState("");
  const [commentReplyPostId, setCommentReplyPostId] = useState("");
  const [commentReplyText, setCommentReplyText] = useState("");
  const [reactionPostId, setReactionPostId] = useState(null);
  const [allMainPostReactions, setAllMainPostReactions] = useState("");
  const [selectedOption, setSelectedOption] = useState([{id: "", post_privacy: ""}]);
  const [modalwhoesReactOnPostIsOpen, setModalwhoesReactOnPostIsOpen] = React.useState(false);
  const [clicktoSeeWhoReactedPostId, setClicktoSeeWhoReactedPostId] = useState(null);
  const [reactedUserListsOfDirectPosts, setReactedUserListsOfDirectPosts] = useState([]);
  const [commentTabIconClick, setCommentTabIconClick] = useState(false);
  const [value, setValue] = React.useState(0);
  const [editMainCommentStatus, setEditMainCommentStatus] = useState(false);
  const [editMainCommentId, setEditMainCommentId] = useState(null);
  const [editMainCommentPostId, setEditMainCommentPostId] = useState(null);
  const [editCommentData, setEditMainCommentData] = useState(null);
  const [editCommentImageOrVideo, setEditMainCommentImageOrVideo] = useState(null);
  const [replyCommentStatus, setReplyCommentStatus] = useState(false);
  const [replyCommentStatusChain, setReplyCommentStatusChain] = useState(false);
  const [valueOfReply, setValueOfReply] = useState("");
  const [editMainCommentReplyId, setEditMainCommentReplyId] = useState(null);
  const [editReplyCommentData, setEditReplyCommentData] = useState(null);
  const [editMainCommentReplyStatus, setEditMainCommentReplyStatus] = useState(false);
  const [editReplyCommentImageOrVideo, setEditReplyCommentImageOrVideo] = useState(null);
  const [editReplyCommentImageOrVideoFile, setEditReplyCommentImageOrVideoFile] = useState(null);
  const [editcommentImageOrVideoFile, setEditCommentImageOrVideoFile] = useState(null);
  const [editcommenttype, setEditcommenttype] = useState(null);
  const [isCommentReactionHover, setIsCommentReactionHover] = useState(false);
  const [isReplyCommentReactionHover, setIsReplyCommentReactionHover] = useState(false);
  const [isCommentReactionHoverId, setIsCommentReactionHoverId] = useState(null);
  const [isReplyCommentReactionHoverId, setIsReplyCommentReactionHoverId] = useState(null);
  const [modalwhoesReactOnCommentIsOpen, setModalwhoesReactOnCommentIsOpen] = React.useState(false);

  async function allPostss() {
    axiosInstance.get("/api/get-all-users-posts").then((res) => {
      if (res.data.status == 200) {
        setAllposts(res.data.posts);
      }
    });
  }
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

  const [singleSharePost, setSingleSharePost] = useState({
    description: "",
    privacy: "public",
  });

  const shareToPublic = (post_id) => {
    console.log(post_id, "share");
    axiosInstance
      .post("/api/save-share-post", {
        share_post_id: post_id,
      })
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });
          allPostss();
        } else {
          if (res.data.status == 201) {
            toast.error(res.data.message, {
              position: "top-right",
              style: {
                background: "white",
                color: "black",
              },
            });
          }
        }
      });
  };
  const saveSharePost = (post_id) => {
    console.log(post_id, "share");
    const formData = {
      share_post_id: post_id,
      description: singleSharePost.description,
      privacy: singleSharePost.privacy,
    };
    axiosInstance.post("/api/save-share-post-with-caption", formData).then((res) => {
      if (res.data.status == 200) {
        toast.success(res.data.message, {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });
        allPostss();
        handleClose();
      } else {
        if (res.data.status == 201) {
          toast.error(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });
        }
      }
    });
  };

  useEffect(() => {
    const data = allPosts.map((item) => ({
      id: item._id,
      post_privacy: item.post_privacy,
    }));
    setSelectedOption(data);
  }, [allPosts]);

  const options = [
    {
      value: "public",
      label: "Public",
      icon: <FontAwesomeIcon icon={faEarthAmericas} />,
    },
    {
      value: "friends",
      label: "Friends",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
      value: "only_me",
      label: "Only me",
      icon: <FontAwesomeIcon icon={faLock} />,
    },
  ];

  const handlePostPrivacyChange = (postId, privacyValue) => {
    const post_privacy = {
      post_privacy: privacyValue,
    };
    axiosInstance.patch(`api/update-post-privacy-of-direct-post/${postId}`, post_privacy).then((res) => {
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
          {id: postId, post_privacy: privacyValue},
          ...prevOptions.slice(index + 1),
        ];
      } else {
        return [...prevOptions, {id: postId, post_privacy: privacyValue}];
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

  function openEditModal() {
    setEditModal(true);
  }
  function closeEditModal() {
    setEditModal(false);
  }

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
        .post("api/save-user-comment-by-post", formData, {
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
            axiosInstance.get(`/api/view-single-main-post-with-comments/${postSubmitID}`).then((res) => {
              if (res.data.status === 200) {
                setCommentTextState({});
                // setCommentImageOrVideoFile(null);
                const postIndex = allPosts.findIndex((post) => post._id === postSubmitID);

                if (postIndex !== -1) {
                  const updatedPosts = [...allPosts];
                  updatedPosts[postIndex] = res.data.post[0];
                  setAllposts(updatedPosts);
                }
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

  const handleReplyComment = (e, textRender, comment_id, post_id) => {
    e.preventDefault();
    setCommentReplyTextRender(textRender);
    setCommentIdReplyId(comment_id);
    setCommentReplyPostId(post_id);
  };

  const handleCommentReplySubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("replies_comment_name", commentReplyText);
    formData.append("image_or_video", commentReplyImageOrVideoFile);
    formData.append("comment_id", commentIdReplyId);
    formData.append("post_id", commentReplyPostId);

    if (!commentReplyText || commentReplyText.trim() === "") {
      e.preventDefault(); // Prevent the default behavior (creating a new line)
      toast.error("Comment cannot be empty", {
        position: "top-right",
        style: {
          background: "white",
          color: "red",
        },
      });
    } else {
      axiosInstance
        .post("api/reply-comment-by-direct-post", formData, {
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
            axiosInstance.get(`/api/view-single-main-post-with-comments/${commentReplyPostId}`).then((res) => {
              if (res.data.status === 200) {
                setCommentTextState("");
                const postIndex = allPosts.findIndex((post) => post._id === commentReplyPostId);

                if (postIndex !== -1) {
                  const updatedPosts = [...allPosts];
                  updatedPosts[postIndex] = res.data.post[0];
                  setAllposts(updatedPosts);
                }
              }
            });
          }
        });
    }
  };

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
      axiosInstance.post("/api/save-reaction-main-post", submitReactionData).then((res) => {
        if (res.data.status == 200) {
          setReactionPostId(null);
          setPostReactionCurrentType(null);
          toast.success("Post reaction updated", {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
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

  useEffect(() => {
    if (clicktoSeeWhoReactedPostId) {
      axiosInstance.get(`/api/reaction-user-lists-of-direct-post/${clicktoSeeWhoReactedPostId}`).then((res) => {
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("value of reply", valueOfReply);
  const handleChange1 = (event) => {
    setValueOfReply(event.target.value);
  };

  const handleEditCommentImageVideo = (e, postid, commenttype) => {
    setEditCommentImageOrVideoFile(e.target.files[0]);
    setEditcommenttype(commenttype);
  };

  const handleEditReplyCommentImageVideo = (e, postid, commenttype) => {
    setEditReplyCommentImageOrVideoFile(e.target.files[0]);
    // setEditMainCommentPostId(postid)
    setEditcommenttype(commenttype);
  };

  async function getEditMainCommentData() {
    axiosInstance
      .get(`/api/edit-comment-by-direct-post/${editMainCommentPostId}/${editMainCommentId}/main_comment`)
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
      .get(`/api/edit-comment-by-direct-post/${editMainCommentPostId}/${editMainCommentReplyId}/reply_comment`)
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
    axiosInstance.post("api/save-comment-reaction-of-direct-post", commentReactionData).then((res) => {
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
        axiosInstance.get(`/api/view-single-main-post-with-comments/${commentReactionPostID}`).then((res) => {
          if (res.data.status === 200) {
            setCommentTextState("");

            const postIndex = allPosts.findIndex((post) => post._id === commentReactionPostID);

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

  const [reactedUserListsOfDirectPostsComments, setReactedUserListsOfDirectPostsComments] = useState([]);
  console.log("reactedUserListsOfDirectPostsComments", reactedUserListsOfDirectPostsComments);

  function openWhoesReactOnCommentModal(e, reactionPostId, commentId, commentRepliesId) {
    setModalwhoesReactOnCommentIsOpen(true);
    // setClicktoSeeWhoReactedPostId(reactionPostId);
    axiosInstance
      .get(
        `/api/reaction-user-lists-comments-of-a-direct-post/${reactionPostId}/${commentId}/${
          commentRepliesId || "null"
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
  const [isLoading, setIsLoading] = useState(false);

  const [postid, setpostid] = useState(null);
  const [commentid, setcommentid] = useState(null);
  const [commentImageOrVideoFile, setCommentImageOrVideoFile] = useState(null);

  const [commenttype, setcommenttype] = useState(null);
  const [commentReplyImageOrVideoFile, setCommentReplyImageOrVideoFile] = useState(null);
  // console.log('commentImageOrVideoFile', commentImageOrVideoFile, "postid", postid, "commentid", commentid, "comment type", commenttype);
  // console.log('commentReplyImageOrVideoFile', commentReplyImageOrVideoFile, "postid", postid, "commentid", commentid, "comment type", commenttype);
  const handleCommentImageVideo = (e, postid, commenttype) => {
    setCommentImageOrVideoFile(e.target.files[0]);
    setpostid(postid);
    // setcommentid(commentid);
    setcommenttype(commenttype);
  };

  const handleCommentReplyImageVideo = (e, postid, commentid, commenttype) => {
    setCommentReplyImageOrVideoFile(e.target.files[0]);
    setpostid(postid);
    setcommentid(commentid);
    setcommenttype(commenttype);
  };

  const submitMainCommentWithImageOrVideo = (e) => {
    e.preventDefault();
    setCommentImageOrVideoFile(null);
    setIsLoading(true);

    const commentText = commentTextState[postid] || "";
    const formData = new FormData();
    formData.append("comment_name", commentText);
    formData.append("image_or_video", commentImageOrVideoFile);
    formData.append("post_id", postid);
    // formData.append("comment_id", commentid);

    axiosInstance
      .post("api/save-user-comment-by-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setIsLoading(false);
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
          axiosInstance.get(`/api/view-single-main-post-with-comments/${postid}`).then((res) => {
            if (res.data.status === 200) {
              setpostid(null);
              setcommentid(null);
              setCommentTextState({});
              setCommentImageOrVideoFile(null);
              const postIndex = allPosts.findIndex((post) => post._id === postid);

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
          axiosInstance.get(`/api/view-single-main-post-with-comments/${postid}`).then((res) => {
            if (res.data.status === 200) {
              setpostid(null);
              setcommentid(null);
              setCommentTextState({});
              setCommentImageOrVideoFile(null);
              const postIndex = allPosts.findIndex((post) => post._id === postid);

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

  const [viewMoreRepliesLogicCommentId, setViewMoreRepliesLogicCommentId] = useState("");
  const [viewMoreRepliesLogicPostId, setViewMoreRepliesLogicPostId] = useState("");
