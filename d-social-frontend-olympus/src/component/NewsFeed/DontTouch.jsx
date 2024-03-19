import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import feedauthtwo from "../../assets/img/avatar7-sm.jpg";
import feedauthsix from "../../assets/img/friend-harmonic9.jpg";
import commentSvg from "../../../public/custom-svg-icon/Comment.svg";
import shareSvg from "../../../public/custom-svg-icon/Share.svg";
import heartSvg from "../../../public/custom-svg-icon/Heart.svg";
import threedot from "../../../public/custom-svg-icon/threedot.svg";
import Image from "next/image";
import axiosInstance from "../../../utils/axios";
import { useRef } from "react";
import { host } from "@/environment";
import moment from "moment";
import CommentList from "./CommentList";
import Link from "next/link";
import "../../assets/css/post.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import photoSvg from "../../../public/custom-svg-icon/photo.svg";
import reelsSvg from "../../../public/custom-svg-icon/reels.svg";
import storySvg from "../../../public/custom-svg-icon/story.svg";
import gallerySvg from "../../../public/custom-svg-icon/gallery.svg";
import locationSvg from "../../../public/custom-svg-icon/location.svg";
import addfriendSvg from "../../../public/custom-svg-icon/addfriend.svg";

const PostList = () => {
  const [userId, setUserId] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [fullName, setFullName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [editModal, setEditModal] = useState(false);
  // console.log('user name', userName)
  const [profileImage, setprofileImage] = useState("");

  const [allPosts, setAllposts] = useState([]);
  console.log("all posts", allPosts);

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
  }, []);

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
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const fileExtension = filename.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  }

  function isVideo(filename) {
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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [postID, setPostID] = useState(null);
  console.log("post id ", postID);
  function openModal(e, Id) {
    setIsOpen(true);
    setPostID(Id);
  }
  function closeModal() {
    setIsOpen(false);
    setPostID(null);
  }
  const [renderComments, setRenderComments] = useState("");

  const [SingleMainPost, setSingleMainPost] = useState("");
  // console.log('single post', SingleMainPost)
  async function fetchSinglePost() {
    axiosInstance
      .get(`/api/view-single-main-post-with-comments/${postID}`)
      .then((res) => {
        if (res.data.status == 200) {
          setSingleMainPost(res.data.post[0]);
        }
      });
  }

  useEffect(() => {
    if (postID) {
      fetchSinglePost();
      const interval = setInterval(fetchSinglePost, 1000);
      return () => clearInterval(interval);
    }
  }, [postID, renderComments]);

  ///modal functionality end

  // const [allComments, setAllComments] = useState([]);
  // console.log('all comments', allComments)
  const [commentTextState, setCommentTextState] = useState("");
  const commentObj = {
    comment_name: commentTextState,
    post_id: postID,
    // post_id: props.postId
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("api/save-user-comment-by-post", commentObj)
      .then((res) => {
        if (res.data.status == 200) {
          setRenderComments(res.data);
          // window.location.reload();
          setCommentTextState("");
          // toast.success(res.data.message, {
          //     position: "top-right",
          //     style: {
          //         background: "white",
          //         color: "black",
          //     },
          // });
        }
      });
  };

  ///Reply comment functionality starts //
  const [commentReplyTextRender, setCommentReplyTextRender] = useState(false);
  const [commentIdReplyId, setCommentIdReplyId] = useState("");

  console.log("comment reply", commentReplyTextRender, commentIdReplyId);

  const handleReplyComment = (e, textRender, comment_id) => {
    e.preventDefault();
    setCommentReplyTextRender(textRender);
    setCommentIdReplyId(comment_id);
  };

  const [commentReplyText, setCommentReplyText] = useState("");
  const handleCommentReplySubmit = (e) => {
    e.preventDefault();
    const replyCommentObj = {
      comment_id: commentIdReplyId,
      // replies_user_id: req.userId,
      replies_comment_name: commentReplyText,
    };
    axiosInstance
      .post("api/reply-comment-by-direct-post", replyCommentObj)
      .then((res) => {
        if (res.data.status == 200) {
          setRenderComments(res.data);
          // window.location.reload();
          setCommentReplyText("");
          // toast.success(res.data.message, {
          //     position: "top-right",
          //     style: {
          //         background: "white",
          //         color: "black",
          //     },
          // });
        }
      });
  };

  ///Reply comment functionality ends//

  //post like reactions functionality starts

  const [postReactionCurrentType, setPostReactionCurrentType] = useState(null);
  const [reactionPostId, setReactionPostId] = useState(null);
  // console.log('reaction post id', reactionPostId)

  const [allMainPostReactions, setAllMainPostReactions] = useState("");

  // console.log('all main post reactions', allMainPostReactions)

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
            // setReactionPostId(null)
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

  return (
    <div className='ui-block posts-full-div'>
      {allPosts.map((item, i) => {
        return (
          <article className='hentry post video  ' key={i}>
            <div className='post__author author vcard inline-items'>
              {/* <img src={feedauthtwo.src} alt="author" /> */}
              {item.user_id.profile_pic !== null ? (
                <div className='author-thumbs'>
                  <img
                    src={`${host}/uploads/${item.user_id.profile_pic}`}
                    alt=''
                    className='avatar '
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ) : (
                <div className='author-thumbs'>
                  <img
                    src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                    className='avatar '
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              <div className='author-date'>
                {/* <a className="h6 post__author-name fn" href="#">
                                        {`${item.user_id.first_name} ${item.user_id.last_name}`}
                                    </a>{" "} */}
                {/* shared a <a href="#">link</a> */}
                <h6>
                  <Link
                    className='h6 post__author-name fn'
                    href={`profile/${item.user_id.username}`}>
                    {`${item.user_id.first_name} ${item.user_id.last_name}`}
                  </Link>

                  {item.activity_id !== null && item.activity_id.logo !== "" ? (
                    <img
                      src={`${host}/assets/activity/${item.activity_id.logo}`}
                      className='feeling-icon'
                      alt='Activity Icon'
                    />
                  ) : null}

                  {item.feeling_id !== null && item.feeling_id.logo !== "" ? (
                    <span>
                      {" Feeling "}
                      <img
                        src={`${host}/assets/logo/${item.feeling_id.logo}`}
                        className='feeling-icon'
                        alt='Feeling Icon'
                      />
                      {` ${item.feeling_id.feeling_name}`}
                    </span>
                  ) : null}

                  {item.activity_id !== null &&
                  item.activity_id.activity_name !== "" ? (
                    <span>{` is celebrating`}</span>
                  ) : null}

                  {item.location_id !== null ? (
                    <span>{` at ${item.location_id.location_name}`}</span>
                  ) : null}
                </h6>

                <div className='post__date'>
                  <time className='published' dateTime='2004-07-24T18:18'>
                    {/* March 4 at 2:05pm */}
                    {/* {moment(item.createdAt).format('LLL')} */}
                    {formatDate(item.createdAt)}
                  </time>
                </div>
              </div>

              <div className='more'>
                {/* <div>
                                    <span className="post-qp-points">1000 QPoints </span>
                                </div> */}
                <div>
                  <Image
                    src={threedot.src}
                    width='5'
                    height='5'
                    className='threedotsvg'
                  />
                  <ul className='more-dropdown'>
                    {userId == item.user_id._id ? (
                      <>
                        <li>
                          <Link href={`edit-post/` + item._id}>Edit Post</Link>
                        </li>
                        <li>
                          <a
                            href='#'
                            type='button'
                            onClick={() => deletePost(item._id)}>
                            Delete Post
                          </a>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}

                    <li>
                      <a href='#'>Turn Off Notifications</a>
                    </li>
                    <li>
                      <a href='#'>Select as Featured</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <p>
                                Hey <a href="#">Cindi</a>, you should really check out this
                                new song by Iron Maid. The next time they come to the city
                                we should totally go!
                            </p> */}

            <div>
              <p dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>

            <div className='post-videos '>
              {item.media.length !== undefined && item.media.length >= 1 && (
                <div className='post-multiple-image-video'>
                  {item.media.map((imageItem, imageIndex) => {
                    if (isImage(imageItem.media)) {
                      // This is an image.
                      return (
                        // <Image
                        //     src={`${host}/uploads/posts/${imageItem.media}`}
                        //     width="400"
                        //     height="400"
                        //     className="inner"
                        //     loading="lazy"
                        //     onClick={(e) => console.log('clicked image', imageItem.media)}
                        // />

                        <Link
                          href={`/posts/${userName}/photos/${imageItem.post_id}/${imageItem.media}`}>
                          <div className='post-multiple-image-video'>
                            {/* <Image
                                                                src={`${host}/uploads/posts/${imageItem.media}`}
                                                                width="400"
                                                                height="400"
                                                                className="img1"
                                                                loading="lazy"
                                                                onClick={(e) => console.log('clicked image', imageItem.media)}
                                                            /> */}
                            <img
                              src={`${host}/uploads/posts/${imageItem.media}`}
                              width='400'
                              height='400'
                              onClick={(e) =>
                                console.log("clicked image", imageItem.media)
                              }
                            />
                          </div>
                        </Link>

                        // <img src={`${host}/uploads/posts/${imageItem.media}`} className="" key={imageIndex} />
                      );
                    } else if (isVideo(imageItem.media)) {
                      // This is a video.
                      return (
                        <div
                          className='video-container '
                          key={imageIndex}
                          onClick={(e) =>
                            console.log("clicked video", imageItem.media)
                          }>
                          {" "}
                          <Link
                            href={`/posts/${userName}/videos/${imageItem.post_id}/${imageItem.media}`}>
                            <video
                              controls
                              // poster={`${host}/uploads/posts/${imageItem.image}`}
                              src={`${host}/uploads/posts/${imageItem.media}`}
                              key={imageIndex}
                              // onClick={() => handleVideoClick(imageItem)}
                              className='one-more-videos '
                              lazy
                              controlsList='nodownload'
                              onClick={(e) =>
                                console.log("clicked video", imageItem.media)
                              }>
                              <source
                                src={`${host}/uploads/posts/${imageItem.media}`}
                                type='video/mp4'
                                onClick={(e) =>
                                  console.log("clicked video", imageItem.media)
                                }
                              />
                              Your browser does not support the video tag.
                            </video>
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* {playingVideo && (
                                    <div className="video-overlay" onClick={handleCloseVideo}>
                                        <button className="close-button" onClick={handleCloseVideo}>
                                            &times;
                                        </button>
                                        <video autoPlay controls className="fullscreen-video">
                                            <source src={`${host}/uploads/posts/${playingVideo}`} type="video/mp4" />
                                        </video>
                                    </div>
                                )} */}
            </div>

            {/* onClick={(e) => handlePostClick(e, item._id)} */}
            <hr className='my-0' />
            <div className='reaction-count'>
              <div className='d-flex align-items-center '>
                <div>
                  <img
                    src='/logo/like.png'
                    className=''
                    style={{ width: "35px" }}
                  />
                </div>
                <div>
                  <img src='/logo/love.png' style={{ width: "21px" }} />
                </div>
              </div>

              <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center'>
                  <div>{item.commentCount}</div>
                  <div className='mt-1'>
                    <Image
                      className='mx-2 '
                      src={commentSvg.src}
                      width='13'
                      height='13'
                    />
                  </div>
                </div>
                <div className='mx-3'>
                  0
                  <Image
                    className='mx-2'
                    src={shareSvg.src}
                    width='16'
                    height='16'
                  />
                </div>
              </div>
            </div>
            <hr className='my-0' />

            <div
              className='reaction-container  my-0 px-1'
              style={{ background: "#f2f2f2" }}>
              {isHovered && (
                <div
                  className='d-flex '
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}>
                  <figure
                    className='post-reaction-icons'
                    onClick={(e) => {
                      setReactionPostId(item._id);
                    }}>
                    <img
                      src={`${host}/assets/reactions/like.gif`}
                      alt='Like emoji'
                      onClick={() => {
                        setPostReactionCurrentType("like");
                      }}
                    />
                    <img
                      src={`${host}/assets/reactions/love.gif`}
                      onClick={() => {
                        setPostReactionCurrentType("love");
                      }}
                      alt='Love emoji'
                    />
                    <img
                      src={`${host}/assets/reactions/haha.gif`}
                      onClick={() => {
                        setPostReactionCurrentType("haha");
                      }}
                      alt='Haha emoji'
                    />
                    <img
                      src={`${host}/assets/reactions/wow.gif`}
                      onClick={() => {
            
                        setPostReactionCurrentType("wow");
                      }}
                      alt='Wow emoji'
                    />
                    <img
                      src={`${host}/assets/reactions/sad.gif`}
                      onClick={() => {
                        
                        setPostReactionCurrentType("sad");
                      }}
                      alt='Sad emoji'
                    />
                    <img
                      src={`${host}/assets/reactions/angry.gif`}
                      onClick={() => {
                    
                        setPostReactionCurrentType("angry");
                      }}
                      alt='Angry emoji'
                    />
                  </figure>
                </div>
              )}

              <div
                className='d-flex justify-content-between align-items-center pb-1 my-0'
                style={{ cursor: "pointer" }}>
                <div
                  className='cursor-pointer  d-flex align-items-center'
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}>
                  <div
                    className='mx-1'
                    onClick={() => {
                      handleReactionSelect("like", item._id);
                    }}>
                    {postReactionCurrentType === "like" ? (
                      <img
                        key={`like_${item._id}`}
                        className='reaction-icon'
                        src={`${host}/assets/reactions/like.gif`}
                        alt='Like emoji'
                      />
                    ) : (
                      <span>Like</span>
                    )}
                  </div>

                  {allMainPostReactions &&
                    allMainPostReactions.map((reaction) => {
                      if (
                        reaction.post_id === item._id &&
                        reaction.reaction_type !== "like"
                      ) {
                        let reactionImageSrc = "";
                        switch (reaction.reaction_type) {
                          case "love":
                            reactionImageSrc = `${host}/assets/reactions/love.gif`;
                            break;
                          case "wow":
                            reactionImageSrc = `${host}/assets/reactions/wow.gif`;
                            break;

                          case "sad":
                            reactionImageSrc = `${host}/assets/reactions/sad.gif`;
                            break;
                          case "angry":
                            reactionImageSrc = `${host}/assets/reactions/angry.gif`;
                            break;
                          case "haha":
                            reactionImageSrc = `${host}/assets/reactions/haha.gif`;
                            break;
                          // Add cases for other reaction types as needed
                          default:
                            // Set a default image source if needed
                            reactionImageSrc = "";
                        }

                        return (
                          <img
                            key={reaction.reaction_id}
                            className='reaction-icon'
                            src={reactionImageSrc}
                            alt={`${reaction.reaction_type} emoji`}
                          />
                        );
                      }
                      return null; // Return null if there's no matching reaction
                    })}

                  {/* 
                                        {

                                            reactionPostId == item._id && postReactionCurrentType == 'like' ?
                                                <img className="reaction-icon" src={`${host}/assets/reactions/like.gif`} alt="Like emoji" /> :
                                                reactionPostId == item._id && postReactionCurrentType == 'love' ?
                                                    <img className="reaction-icon" src={`${host}/assets/reactions/love.gif`} alt="Love emoji" />
                                                    :
                                                    reactionPostId == item._id && postReactionCurrentType == 'wow' ?
                                                        <img className="reaction-icon" src={`${host}/assets/reactions/wow.gif`} alt="wow emoji" />
                                                        :
                                                        reactionPostId == item._id && postReactionCurrentType == 'haha' ?
                                                            <img className="reaction-icon" src={`${host}/assets/reactions/haha.gif`} alt="Haha emoji" />
                                                            :
                                                            reactionPostId == item._id && postReactionCurrentType == 'sad' ?
                                                                <img className="reaction-icon" src={`${host}/assets/reactions/sad.gif`} alt="Sad emoji" />
                                                                :
                                                                reactionPostId == item._id && postReactionCurrentType == 'angry' ?
                                                                    <img className="reaction-icon" src={`${host}/assets/reactions/angry.gif`} alt="angry emoji" />
                                                                    :
                                                                    <div className="mx-1" onClick={() => { console.log("like button clicked"); setPostReactionCurrentType("") }}>
                                                                        <span  >
                                                                            Like

                                                                        </span>
                                                                    </div>
                                        } */}
                </div>
                <div
                  className='d-flex '
                  // onClick={() => { setCommentTabIconClick(true) }}
                  // onMouseLeave={() => setCommentTabIconClick(false)}

                  onClick={(e) => openModal(e, item._id)}>
                  <div>
                    <Image
                      className='mx-1 '
                      src={commentSvg.src}
                      width='16'
                      height='16'
                    />
                  </div>
                  <div className='mx-1'>Comment</div>
                </div>
                <div className=''>
                  <Image
                    className='mx-2'
                    src={shareSvg.src}
                    width='16'
                    height='16'
                  />
                  Share
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles1}
        contentLabel='Example Modal'>
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <div className='d-flex justify-content-end py-0'>
          <button
            onClick={closeModal}
            className='float-right btn btn-secondary '>
            X
          </button>
        </div>

        <article className='hentry post video border pb-0'>
          <div className='post__author author vcard inline-items'>
            {/* <img src={feedauthtwo.src} alt="author" /> */}
            {SingleMainPost !== undefined &&
            SingleMainPost.user_id &&
            SingleMainPost.user_id.profile_pic !== null ? (
              <div className='author-thumbs'>
                <img
                  src={`${host}/uploads/${SingleMainPost.user_id.profile_pic}`}
                  alt=''
                  className='avatar '
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ) : (
              <div className='author-thumbs'>
                <img
                  src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                  className='avatar '
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            <div className='author-date'>
              {/* <a className="h6 post__author-name fn" href="#">
                                        {`${item.user_id.first_name} ${item.user_id.last_name}`}
                                    </a>{" "} */}
              {/* shared a <a href="#">link</a> */}
              <h6>
                <a className='h6 post__author-name fn' href='#'>
                  {`${
                    SingleMainPost !== undefined &&
                    SingleMainPost.user_id !== undefined &&
                    SingleMainPost.user_id.first_name
                  } ${
                    SingleMainPost.user_id !== undefined &&
                    SingleMainPost.user_id.last_name
                  }`}
                </a>

                {SingleMainPost.activity_id !== null &&
                SingleMainPost.activity_id !== undefined &&
                SingleMainPost.activity_id.logo !== "" ? (
                  <img
                    src={`${host}/assets/activity/${item.activity_id.logo}`}
                    className='feeling-icon'
                    alt='Activity Icon'
                  />
                ) : null}

                {SingleMainPost.feeling_id !== null &&
                SingleMainPost.feeling_id &&
                SingleMainPost.feeling_id.logo !== "" ? (
                  <span>
                    {" Feeling "}
                    <img
                      src={`${host}/assets/logo/${SingleMainPost.feeling_id.logo}`}
                      className='feeling-icon'
                      alt='Feeling Icon'
                    />
                    {` ${SingleMainPost.feeling_id.feeling_name}`}
                  </span>
                ) : null}

                {SingleMainPost.activity_id !== null &&
                SingleMainPost.activity_id &&
                SingleMainPost.activity_id.activity_name !== "" ? (
                  <span>{` is celebrating`}</span>
                ) : null}

                {SingleMainPost.location_id !== null ? (
                  <span>{` at ${
                    SingleMainPost.location_id &&
                    SingleMainPost.location_id.location_name
                  }`}</span>
                ) : null}
              </h6>

              <div className='post__date'>
                <time className='published' dateTime='2004-07-24T18:18'>
                  {/* March 4 at 2:05pm */}
                  {/* {moment(item.createdAt).format('LLL')} */}
                  {formatDate(SingleMainPost.createdAt)}
                </time>
              </div>
            </div>

            <div className='more'>
              {/* <div>
                                    <span className="post-qp-points">1000 QPoints </span>
                                </div> */}
              <div>
                <Image
                  src={threedot.src}
                  width='5'
                  height='5'
                  className='threedotsvg'
                />
                <ul className='more-dropdown'>
                  {
                    // userId == SingleMainPost.user_id._id ?
                    "a" ? (
                      <>
                        <li>
                          <a href='#'>Edit Post</a>
                        </li>
                        <li>
                          <a
                            href='#'
                            type='button'
                            onClick={() => deletePost(SingleMainPost._id)}>
                            Delete Post
                          </a>
                        </li>
                      </>
                    ) : (
                      <></>
                    )
                  }

                  <li>
                    <a href='#'>Turn Off Notifications</a>
                  </li>
                  <li>
                    <a href='#'>Select as Featured</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <p
              dangerouslySetInnerHTML={{ __html: SingleMainPost.description }}
            />
          </div>

          <div className='post-videos '>
            {SingleMainPost.media &&
              SingleMainPost.media.length !== undefined &&
              SingleMainPost.media.length >= 1 && (
                <div className='post-multiple-image-video'>
                  {SingleMainPost.media.map((imageItem, imageIndex) => {
                    if (isImage(imageItem.media)) {
                      // This is an image.
                      return (
                        // <Image
                        //     src={`${host}/uploads/posts/${imageItem.media}`}
                        //     width="400"
                        //     height="400"
                        //     className="inner"
                        //     loading="lazy"
                        //     onClick={(e) => console.log('clicked image', imageItem.media)}
                        // />

                        <Link
                          href={`/posts/${userName}/photos/${imageItem.post_id}/${imageItem.media}`}>
                          <div className='post-multiple-image-video'>
                            {/* <Image
                                                        src={`${host}/uploads/posts/${imageItem.media}`}
                                                        width="400"
                                                        height="400"
                                                        className="img1"
                                                        loading="lazy"
                                                        onClick={(e) => console.log('clicked image', imageItem.media)}
                                                    /> */}
                            <img
                              src={`${host}/uploads/posts/${imageItem.media}`}
                              className=''
                              key={imageIndex}
                            />
                            <img
                              src={`${host}/uploads/posts/${imageItem.media}`}
                              className=''
                              key={imageIndex}
                            />
                          </div>
                        </Link>

                        // <img src={`${host}/uploads/posts/${imageItem.media}`} className="" key={imageIndex} />
                      );
                    } else if (isVideo(imageItem.media)) {
                      // This is a video.
                      return (
                        <div
                          className='video-container '
                          key={imageIndex}
                          onClick={(e) =>
                            console.log("clicked video", imageItem.media)
                          }>
                          <Link
                            href={`/posts/${userName}/videos/${imageItem.post_id}/${imageItem.media}`}>
                            <video
                              controls
                              // poster={`${host}/uploads/posts/${imageItem.image}`}
                              src={`${host}/uploads/posts/${imageItem.media}`}
                              key={imageIndex}
                              // onClick={() => handleVideoClick(imageItem)}
                              className='one-more-videos '
                              lazy
                              controlsList='nodownload'
                              onClick={(e) =>
                                console.log("clicked video", imageItem.media)
                              }>
                              <source
                                src={`${host}/uploads/posts/${imageItem.media}`}
                                type='video/mp4'
                                onClick={(e) =>
                                  console.log("clicked video", imageItem.media)
                                }
                              />
                              Your browser does not support the video tag.
                            </video>
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

            {/* {playingVideo && (
                                    <div className="video-overlay" onClick={handleCloseVideo}>
                                        <button className="close-button" onClick={handleCloseVideo}>
                                            &times;
                                        </button>
                                        <video autoPlay controls className="fullscreen-video">
                                            <source src={`${host}/uploads/posts/${playingVideo}`} type="video/mp4" />
                                        </video>
                                    </div>
                                )} */}
          </div>

          {/* onClick={(e) => handlePostClick(e, item._id)} */}
          <hr />

          <div className='reaction-container'>
            {/* {isHovered && ( */}
            {isHovered && (
              <div
                className='d-flex'
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}>
                <figure className='post-reaction-icons'>
                  <img
                    src={`${host}/assets/reactions/like.gif`}
                    alt='Like emoji'
                  />
                  <img
                    src={`${host}/assets/reactions/love.gif`}
                    alt='Love emoji'
                  />
                  <img
                    src={`${host}/assets/reactions/haha.gif`}
                    alt='Haha emoji'
                  />
                  <img
                    src={`${host}/assets/reactions/wow.gif`}
                    alt='Wow emoji'
                  />
                  <img
                    src={`${host}/assets/reactions/sad.gif`}
                    alt='Sad emoji'
                  />
                  <img
                    src={`${host}/assets/reactions/angry.gif`}
                    alt='Angry emoji'
                  />
                </figure>
              </div>
            )}

            <div
              className='d-flex justify-content-between align-items-center py-0 my-0'
              style={{ cursor: "pointer" }}>
              <div
                className='cursor-pointer d-flex align-items-center'
                onMouseEnter={() => {
                  setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}>
                <div>
                  <img
                    src='https://static.vecteezy.com/system/resources/previews/021/013/524/original/like-icon-on-transparent-background-free-png.png'
                    className='like-image-icon'
                  />
                </div>
                <div className='mx-1'>
                  <span>Like</span>
                </div>
              </div>
              <div
                className='d-flex'
                // onClick={() => { setCommentTabIconClick(true) }}
                // onMouseLeave={() => setCommentTabIconClick(false)}

                // onClick={(e) => openModal(e, item._id)}
              >
                <div>
                  <Image
                    className='mx-1 '
                    src={commentSvg.src}
                    width='16'
                    height='16'
                  />
                </div>
                <div className='mx-1'>Comment</div>
              </div>
              <div className=''>
                <Image
                  className='mx-2'
                  src={shareSvg.src}
                  width='16'
                  height='16'
                />
                Share
              </div>
            </div>
          </div>

          {/* <div className="border comment-section-wrapper">
                        <CommentList allComments={item.comments} postId={postIdClick} commentTabIconClick={commentTabIconClick} />
                    </div> */}

          <div>
            {/* <div className='comment-border' /> */}
            <hr />
            <div>
              <div>
                <div className='comment-div row'>
                  <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 '>
                    {/* <Image className='comment-icon' src={authorPage} width={30} height={25} alt='' /> */}
                    {profileImage !== null ? (
                      // <img src={`${ host } / uploads / ${ profileImage }`} alt="" />
                      <Image
                        className='comment-icon'
                        src={`${host}/uploads/${profileImage}`}
                        width={30}
                        height={25}
                        alt=''
                      />
                    ) : (
                      <img
                        src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                        className='avatar-profile '
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
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
                        placeholder='comment here'
                      />
                    </form>

                    <div className='reply-div '>
                      <div className='comment-div row'>
                        {SingleMainPost &&
                          SingleMainPost.comments.map((item, i) => {
                            return (
                              <>
                                <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                                  {/* <Image className='reply-icon' src={authorPage} width={25} height={25} alt='' /> */}
                                  {item.user_id.profile_pic !== null ? (
                                    // <img src={`${ host } / uploads / ${ profileImage }`} alt="" />
                                    // <Image className='reply-icon' src={`${host}/uploads/${item.user_id.profile_pic}`} width={25} height={25} alt='' />
                                    <img
                                      className='reply-icon'
                                      src={`${host}/uploads/${item.user_id.profile_pic}`}
                                      alt=''
                                    />
                                  ) : (
                                    <img
                                      src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                                      className='avatar-profile '
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  )}
                                </div>

                                <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11'>
                                  <div className='comment-reply'>
                                    <div className='reply-text-div'>
                                      <p className='reply-text'>
                                        {item.comment_name}{" "}
                                      </p>

                                      <div className='reply-react-share'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='16'
                                          fill='gray'
                                          className='bi bi-emoji-smile react-svg'
                                          viewBox='0 0 16 16'>
                                          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                          <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
                                        </svg>

                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='16'
                                          fill='gray'
                                          className='bi bi-reply-all-fill '
                                          viewBox='0 0 16 16'
                                          onClick={(e) =>
                                            handleReplyComment(
                                              e,
                                              true,
                                              item._id
                                            )
                                          }>
                                          <path d='M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z' />
                                          <path d='M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z' />
                                        </svg>

                                        {item.user_id._id == userId ? (
                                          <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='gray'
                                            class='bi bi-trash ml-2'
                                            viewBox='0 0 16 16'
                                            onClick={() => {
                                              const formData = {
                                                comment_id: item._id,
                                              };

                                              axiosInstance
                                                .post(
                                                  "/api/delete-single-comment",
                                                  formData
                                                )
                                                .then((res) => {});
                                            }}>
                                            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                                            <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                                          </svg>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      {commentReplyTextRender &&
                                        commentIdReplyId == item._id && (
                                          <div className='w-100'>
                                            <form
                                              onSubmit={
                                                handleCommentReplySubmit
                                              }>
                                              <input
                                                type='text'
                                                className='form-control '
                                                value={commentReplyText}
                                                onChange={(e) =>
                                                  setCommentReplyText(
                                                    e.target.value
                                                  )
                                                }></input>
                                            </form>
                                          </div>
                                        )}
                                    </div>

                                    <p className='reply-time'>
                                      {moment(item.createdAt).format("LT")}
                                    </p>
                                  </div>
                                  {item.replies.length > 0 &&
                                    item.replies.map(
                                      (replyComment, replyIndex) => {
                                        return (
                                          <div className='reply-reply-div'>
                                            <div className='comment-div row'>
                                              <div className='col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                                                {/* <Image className='reply-icon' src={authorPage} width={25} height={25} alt='' /> */}
                                                {/* <Image className='reply-icon'
                                                                                                src={`${host}/uploads/${replyComment.replies_user_id && replyComment.replies_user_id.profile_pic}`}
                                                                                                width={25} height={25} alt='' /> */}

                                                <img
                                                  className='reply-icon'
                                                  src={`${host}/uploads/${
                                                    replyComment.replies_user_id &&
                                                    replyComment.replies_user_id
                                                      .profile_pic
                                                  }`}
                                                  alt=''
                                                />
                                              </div>

                                              <div className='col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11'>
                                                <div className='comment-reply'>
                                                  <div className='reply-text-div'>
                                                    <p className='reply-text'>
                                                      {
                                                        replyComment.replies_comment_name
                                                      }
                                                    </p>

                                                    <div className='reply-react-share'>
                                                      <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='gray'
                                                        className='bi bi-emoji-smile react-svg'
                                                        viewBox='0 0 16 16'>
                                                        <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                                        <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
                                                      </svg>

                                                      <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='gray'
                                                        className='bi bi-reply-all-fill '
                                                        viewBox='0 0 16 16'>
                                                        <path d='M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z' />
                                                        <path d='M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z' />
                                                      </svg>
                                                      {replyComment
                                                        .replies_user_id._id ==
                                                      userId ? (
                                                        <svg
                                                          xmlns='http://www.w3.org/2000/svg'
                                                          width='16'
                                                          height='16'
                                                          fill='currentColor'
                                                          class='bi bi-trash ml-2'
                                                          viewBox='0 0 16 16'
                                                          onClick={() => {
                                                            const formData = {
                                                              comment_id:
                                                                replyComment._id,
                                                            };

                                                            axiosInstance
                                                              .post(
                                                                "/api/delete-single-reply-comment",
                                                                formData
                                                              )
                                                              .then((res) => {
                                                                // setRenderComments((prevComment) => prevComment.filter((comment) => comment._id !== replyComment._id));
                                                                toast.success(
                                                                  "Comments removed successfully",
                                                                  {
                                                                    position:
                                                                      "top-right",
                                                                    style: {
                                                                      background:
                                                                        "white",
                                                                      color:
                                                                        "black",
                                                                    },
                                                                  }
                                                                );
                                                              });
                                                          }}>
                                                          <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                                                          <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                                                        </svg>
                                                      ) : (
                                                        <></>
                                                      )}
                                                    </div>
                                                  </div>

                                                  <p className='reply-time'>
                                                    {moment(
                                                      replyComment.createdAt
                                                    ).format("LT")}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                              </>
                            );
                          })}

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
            </div>
          </div>
        </article>
      </Modal>

      <Modal
        isOpen={editModal}
        style={customStyles1}
        onRequestClose={closeEditModal}>
        <form>
          <div className='d-flex align-items-center mt-4 m-1'>
            {/* <div className=""> */}
            {/* <div className="author-thumbs" >
                          <img src={feedauthone.src} alt="author" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'contain' }} />


                        </div> */}

            {profileImage !== null ? (
              <div className='author-thumbs'>
                <img
                  src={`${host}/uploads/${profileImage}`}
                  alt=''
                  className='avatar '
                />
              </div>
            ) : (
              <div className='author-thumbs'>
                <img
                  src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
                  className='avatar '
                />
              </div>
            )}

            <div className='mx-2'>
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

          <div className='form-group with-icon label-floating is-empty border rounded m-1'>
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

            <div className=''>
              <textarea
                className='form-control '
                placeholder=' Share what you are thinking here...'
                // defaultValue={""}
                style={{ border: "none", minHeight: "135px" }}
                // value={content}
                // onChange={handleContentChange}
              />
            </div>

            {/* Display uploaded files in a single grid */}
            <div className='grid-container'>
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
          <div className='post-field-icons'>
            <div className='row'>
              <div className='col-lg-9 col-md-9 col-sm-9 col-6 '>
                <span className='p-text-add text-black'>Add to your post</span>
              </div>
              <div className='post-field-single-icon  col-lg-3 col-md-3 col-sm-3 col-6 d-flex align-items-center '>
                {/* <Image src={photoSvg.src} width="20" height="20" onClick={handlePostImageUpload} /> */}
                {/* <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} /> */}

                <div className='post-media-icon '>
                  <Image
                    src={photoSvg.src}
                    width='20'
                    height='20'
                    className=''
                    name='media'
                    // onClick={handlePostImageUpload}
                  />
                  <input
                    type='file'
                    className='media-file'
                    name='media'
                    accept='image/*,video/*'
                    multiple
                    // onChange={handleFileUpload}
                  />
                </div>

                <div>
                  <Image
                    src={locationSvg.src}
                    width='20'
                    height='20'
                    onClick={openModal}
                  />
                </div>
                <div>
                  <Image src={addfriendSvg.src} width='20' height='20' />
                </div>
                <div>
                  <Image src={gallerySvg.src} width='20' height='20' />
                </div>
                <div className=''>
                  <span
                  // onClick={setFeelingModal}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='black'
                      className='bi bi-three-dots'
                      viewBox='0 0 16 16'>
                      <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='post-btton-div'>
            <button className='post-btton' type='submit'>
              Post
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PostList;
