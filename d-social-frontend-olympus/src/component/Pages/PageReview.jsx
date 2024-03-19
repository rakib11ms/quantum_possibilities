import React, { useEffect, useState } from "react";
import Connectionsone from "../../../public/connectionsone.png";
import Image from "next/image";
import Link from "next/link";
import settingaddreaction from "../../../public/add-reaction.svg";
import settingReply from "../../../public/reply.svg";
import axiosInstance from "../../../utils/axios";
import noImage from "../../assets/img/no_image_available.svg";
import { host } from "@/environment";
import { toast } from "react-toastify";
import settingLove from "../../../public/love.svg";
import settingShare from "../../../public/share.svg";
import WhoesAreReactedReview from "./Reviews/WhoesAreReactedReview";
import "../../assets/css/main.css";

const PageReview = ({ pageDetails }) => {
  const [commentTextState, setCommentTextState] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [commentReplyTextRender, setCommentReplyTextRender] = useState(false);
  const [modalwhoesReactOnPostIsOpen, setModalwhoesReactOnPostIsOpen] =
    useState(false);
  const [clicktoSeeWhoReactedPostId, setClicktoSeeWhoReactedPostId] =
    useState(null);

  const [userId, setUserid] = useState(0);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getALlPageReviews();
  }, [pageDetails]);

  const getALlPageReviews = () => {
    if (pageDetails._id != null) {
      const formData = {
        page_id: pageDetails._id,
      };
      axiosInstance.post("/api/get-pages-reviews", formData).then((res) => {
        if (res.data.status == 200) {
          setReviews(res.data.reviews);
        }
      });
    }
  };

  const saveReaction = (reviews_id, reactionType) => {
    const submitReactionData = {
      reaction_type: reactionType,
      review_id: reviews_id,
    };
    axiosInstance
      .post("/api/save-reaction-on-reviews", submitReactionData)
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

        getALlPageReviews();
      });
  };

  const handleCommentSubmit = (e, postSubmitID) => {
    e.preventDefault();

    const commentObj = {
      comment_name: commentTextState,
      review_id: postSubmitID,
    };

    axiosInstance
      .post("/api/save-user-comment-by-review", commentObj)
      .then((res) => {
        if (res.data.status === 200) {
          setCommentTextState("");

          axiosInstance
            .get(`/api/view-single-main-reviews-with-comments/${postSubmitID}`)
            .then((res) => {
              if (res.data.status === 200) {
                setCommentTextState("");
                const postIndex = reviews.findIndex(
                  (post) => post._id === postSubmitID
                );

                if (postIndex !== -1) {
                  const updatedPosts = [...reviews];
                  updatedPosts[postIndex] = res.data.post[0];
                  setReviews(updatedPosts);
                }
              }
            });
        }
      });
  };
  const [commentIdReplyId, setCommentIdReplyId] = useState("");

  const [commentReplyPostId, setCommentReplyPostId] = useState("");
  const handleReplyComment = (e, textRender, comment_id, post_id) => {
    e.preventDefault();
    setCommentReplyTextRender(textRender);
    setCommentIdReplyId(comment_id);
    setCommentReplyPostId(post_id);
  };

  const [renderComments, setRenderComments] = useState("");
  const [commentReplyText, setCommentReplyText] = useState("");
  const handleCommentReplySubmit = (e) => {
    e.preventDefault();
    const replyCommentObj = {
      comment_id: commentIdReplyId,
      // replies_user_id: req.userId,
      replies_comment_name: commentReplyText,
    };
    axiosInstance
      .post("api/reply-comment-by-direct-review", replyCommentObj)
      .then((res) => {
        if (res.data.status == 200) {
          setRenderComments(res.data);
          // window.location.reload();
          setCommentReplyText("");

          axiosInstance
            .get(
              `/api/view-single-main-reviews-with-comments/${commentReplyPostId}`
            )
            .then((res) => {
              if (res.data.status === 200) {
                setCommentTextState("");
                const postIndex = reviews.findIndex(
                  (post) => post._id === commentReplyPostId
                );

                if (postIndex !== -1) {
                  const updatedPosts = [...reviews];
                  updatedPosts[postIndex] = res.data.post[0];
                  setReviews(updatedPosts);
                }
              }
            });
        }
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = useState(0);
  function closeWhoesReactOnPostModal() {
    setModalwhoesReactOnPostIsOpen(false);
    setClicktoSeeWhoReactedPostId(null);
    setReactedUserListsOfDirectPosts([]);
  }

  const deleteReview = (reviewId) => {
    const formData = {
      reviewId: reviewId,
    };
    axiosInstance.post("/api/delete-page-review", formData).then((res) => {
      if (res.data.status == 200) {
        getALlPageReviews();
      }
    });
  };

  function openWhoesReactOnPostModal(e, reactionPostId) {
    setModalwhoesReactOnPostIsOpen(true);
    setClicktoSeeWhoReactedPostId(reactionPostId);
  }
  const [reactedUserListsOfDirectPosts, setReactedUserListsOfDirectPosts] =
    useState([]);

  useEffect(() => {
    if (clicktoSeeWhoReactedPostId) {
      axiosInstance
        .get(
          `/api/reaction-user-lists-of-reviews/${clicktoSeeWhoReactedPostId}`
        )
        .then((res) => {
          if (res.data.status == 200) {
            setReactedUserListsOfDirectPosts(res.data.reactions);
          }
        });
    }
  }, [clicktoSeeWhoReactedPostId]);

  return (
    <div className="page-review-full-div mt-2">
      {reviews.length > 0 ? (
        reviews.map((item, index) => (
          <div>
            <div className="row">
              <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                <div className="page-review-img-div">
                  {item.user_id?.profile_pic != null ? (
                    <img
                      src={`${host}/uploads/${item.user_id.profile_pic}`}
                      alt=""
                      className="page-review-img"
                      width={60}
                      height={60}
                    />
                  ) : (
                    <img
                      src={noImage.src}
                      alt=""
                      className="page-review-img"
                      width={60}
                      height={60}
                    />
                  )}
                </div>
              </div>

              <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <div className="review-tag-div">
                  <div>
                    <h6>
                      {item.user_id.first_name + " " + item.user_id.last_name}
                    </h6>
                    <p className="review-time">
                      Just now
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          fill="#8C8888"
                          className="bi bi-globe-europe-africa"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z" />
                        </svg>
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="review-tag-sec">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#8C8888"
                          className="bi bi-chat-left-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12ZM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" />
                          <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                        </svg>
                      </span>
                      reviewed <strong>{item.page_id?.page_name}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                <div className="more">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-three-dots threedotsvg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                    <ul className="more-dropdown">
                      <>
                        {/* <li>
                            <Link href=''>Edit Post</Link>
                          </li> */}
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              deleteReview(item._id);
                            }}
                            type="button"
                          >
                            Delete Review
                          </a>
                        </li>
                      </>

                      <li>
                        <a href="#">Turn Off Notifications</a>
                      </li>
                      <li>
                        <a href="#">Select as Featured</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                <div className="page-review-img-div"></div>
              </div>

              <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                <div className="Post-tag-div">
                  <h6 className="Post-tag-text">{item.recommendation}</h6>
                </div>
              </div>

              <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
            </div>

            <div className="row">
              <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                <div className="page-review-img-div"></div>
              </div>
              <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <div className="settings-comment-div-reaction">
                  <div>
                    <Image src={settingLove} width={30} height={30} alt="" />
                  </div>
                  <div
                    className="settings-comment-div-reaction-people"
                    onClick={(e) => openWhoesReactOnPostModal(e, item._id)}
                  >
                    <span>{item.reactionCount} liked this</span>
                  </div>
                </div>
              </div>

              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="comment-share-icon">
                  <div className="settings-comment-div-reaction-people">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chat"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    </svg>
                    <span>{item.totalComments} Comment</span>
                  </div>
                  <div className="settings-comment-div-reaction-people">
                    <Image src={settingShare} width={30} height={30} alt="" />
                    <span>0 Shares</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="page-reviews-reaction-container"
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered && (
                <div className="d-flex ">
                  <figure className="page-reviews-post-reaction-icons">
                    <img
                      src={`${host}/assets/reactions/like.gif`}
                      alt="Like emoji"
                      onClick={() => {
                        console.log("like reactions button clicked");
                        saveReaction(item._id, "like");
                      }}
                    />
                    <img
                      src={`${host}/assets/reactions/love.gif`}
                      onClick={() => {
                        console.log("love reactions button clicked");
                        saveReaction(item._id, "love");
                      }}
                      alt="Love emoji"
                    />
                    <img
                      src={`${host}/assets/reactions/haha.gif`}
                      onClick={() => {
                        console.log("hahah reactions button clicked");
                        saveReaction(item._id, "haha");
                      }}
                      alt="Haha emoji"
                    />
                    <img
                      src={`${host}/assets/reactions/wow.gif`}
                      onClick={() => {
                        console.log("wow reactions button clicked");
                        saveReaction(item._id, "wow");
                      }}
                      alt="Wow emoji"
                    />
                    <img
                      src={`${host}/assets/reactions/sad.gif`}
                      onClick={() => {
                        console.log("sad reactions button clicked");
                        saveReaction(item._id, "sad");
                      }}
                      alt="Sad emoji"
                    />
                    <img
                      src={`${host}/assets/reactions/angry.gif`}
                      onClick={() => {
                        console.log("angry reactions button clicked");
                        saveReaction(item._id, "angry");
                      }}
                      alt="Angry emoji"
                    />
                  </figure>
                </div>
              )}
            </div>

            <div className="cmment-shar-full-div">
              <div className="cmment-shar-full">
                {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                <div
                  className="single-cmment-shar "
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Image
                    src={settingaddreaction.src}
                    width={30}
                    height={30}
                    alt=""
                  />
                  Reaction
                </div>
                <div className="single-cmment-shar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chat"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                  </svg>
                  Comments
                </div>
                <div className="single-cmment-shar">
                  <Image src={settingReply.src} width={30} height={30} alt="" />
                  Share
                </div>
              </div>

              <div className="single-img-cmmnt-div">
                <div className="manage-pageicon-div">
                  <Image
                    src={`${host}/uploads/pages/${pageDetails.profile_pic}`}
                    width="24"
                    height="24"
                    className="manage-pageicon"
                  />
                </div>
                <div className="comment-text-div">
                  <form
                    onSubmit={(e) => {
                      handleCommentSubmit(e, item._id);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="comment"
                      alt=""
                      value={commentTextState}
                      onChange={(e) => setCommentTextState(e.target.value)}
                      className="comment-text"
                    />
                  </form>
                  {item.comments.length > 0 ? (
                    <div className="reply-div reply-div-page">
                      <div className="comment-div row">
                        {item.comments.map((commentitem, commentIndex) => {
                          return (
                            <>
                              <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                {/* <Image className='reply-icon' src={authorPage} width={25} height={25} alt='' /> */}
                                {commentitem.user_id.profile_pic !== null ? (
                                  // <img src={`${ host } / uploads / ${ profileImage }`} alt="" />
                                  // <Image className='reply-icon' src={`${host}/uploads/${item.user_id.profile_pic}`} width={25} height={25} alt='' />
                                  <img
                                    className="reply-icon"
                                    src={`${host}/uploads/${commentitem.user_id.profile_pic}`}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                    className="avatar-profile "
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </div>

                              <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 margin-top-30">
                                <div className="comment-reply">
                                  <div className="reply-text-div">
                                    <p className="reply-text">
                                      {commentitem.comment_name}
                                    </p>

                                    <div className="reply-react-share">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="gray"
                                        className="bi bi-emoji-smile react-svg"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                      </svg>

                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="gray"
                                        className="bi bi-reply-all-fill "
                                        viewBox="0 0 16 16"
                                        onClick={(e) =>
                                          handleReplyComment(
                                            e,
                                            true,
                                            commentitem._id,
                                            item._id
                                          )
                                        }
                                      >
                                        <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                                        <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z" />
                                      </svg>

                                      {commentitem.user_id._id == userId ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="gray"
                                          class="bi bi-trash ml-2"
                                          viewBox="0 0 16 16"
                                          onClick={() => {
                                            const formData = {
                                              comment_id: commentitem._id,
                                            };

                                            axiosInstance
                                              .post(
                                                "/api/delete-single-comment",
                                                formData
                                              )
                                              .then((res) => {
                                                allPostss();
                                                toast.success(
                                                  "Comments removed successfully",
                                                  {
                                                    position: "top-right",
                                                    style: {
                                                      background: "white",
                                                      color: "black",
                                                    },
                                                  }
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
                                    {commentReplyTextRender &&
                                      commentIdReplyId == commentitem._id && (
                                        <div className="w-100">
                                          <form
                                            onSubmit={handleCommentReplySubmit}
                                          >
                                            <input
                                              type="text"
                                              className="form-control "
                                              value={commentReplyText}
                                              onChange={(e) =>
                                                setCommentReplyText(
                                                  e.target.value
                                                )
                                              }
                                            ></input>
                                          </form>
                                        </div>
                                      )}
                                  </div>

                                  <p className="reply-time">
                                    {moment(commentitem.createdAt).format("LT")}
                                  </p>
                                </div>

                                {commentitem.replies.length > 0 &&
                                  commentitem.replies.map(
                                    (replyComment, replyIndex) => {
                                      return (
                                        <div className="reply-reply-div">
                                          <div className="comment-div row">
                                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                              {/* <Image className='reply-icon' src={authorPage} width={25} height={25} alt='' /> */}

                                              <img
                                                className="reply-icon  "
                                                src={`${host}/uploads/${
                                                  replyComment.replies_user_id &&
                                                  replyComment.replies_user_id
                                                    .profile_pic
                                                }`}
                                                alt=""
                                              />

                                              {/* <Image className='reply-icon border' src={`${host}/uploads/${replyComment.replies_user_id && replyComment.replies_user_id.profile_pic}`} width={25} height={25} alt='' /> */}
                                            </div>

                                            <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 margin-top-30">
                                              <div className="comment-reply">
                                                <div className="reply-text-div">
                                                  <p className="reply-text">
                                                    {
                                                      replyComment.replies_comment_name
                                                    }
                                                  </p>

                                                  <div className="reply-react-share">
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="16"
                                                      height="16"
                                                      fill="gray"
                                                      className="bi bi-emoji-smile react-svg"
                                                      viewBox="0 0 16 16"
                                                    >
                                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                                    </svg>

                                                    {replyComment
                                                      .replies_user_id._id ==
                                                    userId ? (
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
                                                              "/api/delete-single-reply-comment",
                                                              formData
                                                            )
                                                            .then((res) => {
                                                              allPostss();
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
                                                        }}
                                                      >
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                      </svg>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </div>
                                                </div>

                                                <p className="reply-time">
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
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="container">
          <div className="mrak_profile_no_video">No Reviews Yet</div>
        </div>
      )}

      <WhoesAreReactedReview
        isOpen={modalwhoesReactOnPostIsOpen}
        onClose={closeWhoesReactOnPostModal}
        value={value}
        handleChange={handleChange}
        reactedUserListsOfDirectPosts={reactedUserListsOfDirectPosts}
      />
    </div>
  );
};

export default PageReview;
