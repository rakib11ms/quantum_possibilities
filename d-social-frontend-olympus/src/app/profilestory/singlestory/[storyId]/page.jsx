"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/storiesPage.css";
import authImg from "../../../../../public/img/author-page.jpg";
// import strieImg from "../../../../public/imgp3.jpg";
import { host } from "@/environment";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "../../../../../utils/axios";
import Link from "next/link";
import moment from "moment";

import Image from "next/image";
import threedot from "../../../../../public/custom-svg-icon/threedot.svg";

const storiesText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const params = useParams();
  const [story, setStory] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();


  const [isDivVisible, setDivVisibility] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [proressId, setProgressId] = useState(null);
  const [progressIntervalId, setProgressIntervalId] = useState(null);
  const [mergeStory, setMergeStory] = useState([]);
  const [profileImage, setprofileImage] = useState("");
  const [fullName, setFullName] = React.useState("");

  const [progressBarIntervalId, setProgressBarIntervalId] = useState(null);
  const [stlength, SetStLength] = useState(0);
  const [isPause, setIsPause] = useState(false);

  const [storyReaction, setStoryReaction] = useState({
    storyId: "",
    reactionType: "",
  });

  useEffect(() => {

    setProgress(0);
    let length = 0;
    let width = 0;
    let localStorageId = "";
    let formData = {};
    if (typeof window !== "undefined") {
      const localStorageFullName = localStorage.getItem("fullname");
      const localStorageUserInfo = localStorage.getItem("userInfo");
      const localStorageId = localStorage.getItem("userId");
      setUserId(localStorageId);
      console.log("local " + localStorageId);
      const data = JSON.parse(localStorageUserInfo);
      setFullName(localStorageFullName);
      if (localStorageUserInfo !== null) {
        setprofileImage(data[0].profile_pic);
      }
      let storyOwnerId = "";
    }

    formData = {
      story_id: params.storyId,
    };
    axiosInstance.post("/api/get-user-story", formData).then((res) => {
      if (res.data.status == 200) {
        const singleStory = res.data.results;

        singleStory.forEach((item, i) => {
          length += item.stories.length;
          SetStLength(length);
          width = 0;
          item.stories.forEach((story, j) => {
            setMergeStory((mergeStory) => [
              ...mergeStory,
              {
                user_info: item.first_name + " " + item.last_name,
                user_id: item._id,
                photo: item.profile_pic,
                media: story.media,
                title: story.title,
                text_color: story.text_color,
                color: story.color,
                font_size: story.font_size,
                text_position: story.text_position,
                text_alignment: story.text_alignment,
                story_length: item.stories.length,
                viewer_count: story.viewersCount,
                viewers_list: story.viewersList,
                story_id: story._id,
                story_index: j,
                start_width: 100 / item.stories.length,
                end_width: 100 / item.stories.length,
              },
            ]);
            width += item.stories.length;
          });
        });
      }
    });


    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }, 4500);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => Math.max(0, prevProgress + 100 / 3));
    }, 500);

    setProgressIntervalId(progressInterval);

    const progressBarInterval = setInterval(() => {
      setProgress(0);
    }, 4500);

    setIntervalId(interval);
    setProgressBarIntervalId(progressBarInterval);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearInterval(progressBarInterval);
      setProgress(0);
    };
  }, []);

  const goNextIndex = () => {
    setIsPause(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % parseInt(stlength));
    resetInterval();
    setStoryReaction({
      storyId: "",
      reactionType: "",
    });
  };

  const goPreviousIndex = () => {
    setIsPause(false);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + parseInt(stlength)) % parseInt(stlength)
    );
    resetInterval();
    setStoryReaction({
      storyId: "",
      reactionType: "",
    });
  };

  const pauseInterval = () => {
    clearInterval(intervalId);
    clearInterval(progressIntervalId);
    clearInterval(progressBarIntervalId);
  };

  const resetInterval = () => {
    pauseInterval();

    clearInterval(intervalId);
    clearInterval(progressIntervalId);
    clearInterval(progressBarIntervalId);

    const newInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stlength);
      setProgress(0);
    }, 4500);

    const newProgressInterval = setInterval(() => {
      setProgress((prevProgress) => Math.max(0, prevProgress + 100 / 3));
    }, 500);

    const newProgressBarInterval = setInterval(() => {
      setProgress(0);
    }, 4500);

    setIntervalId(newInterval);
    setProgressIntervalId(newProgressInterval);
    setProgressBarIntervalId(newProgressBarInterval);
  };

  useEffect(() => {
    setProgress(0);
    setStoryReaction({
      storyId: "",
      reactionType: "",
    });
    if (mergeStory[currentIndex] != undefined) {
      if (userId != mergeStory[currentIndex].user_id) {
        const formData = {
          story_id: mergeStory[currentIndex].story_id,
          user_id: mergeStory[currentIndex].user_id,
        };
        axiosInstance.post("/api/save-story-view", formData).then((res) => {
          if (res.data.status == 200) {
          }
        });
      }
    }
  }, [currentIndex]);

  function formatDate(timestamp) {
    const now = moment();
    const postTime = moment(timestamp);
    const diffMinutes = now.diff(postTime, "minutes");

    if (diffMinutes < 1) {
      return "a few seconds ago";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (now.isSame(postTime, "day")) {
      return `${Math.round(diffMinutes / 60)} hours ago`;
    } else {
      return postTime.format("LLL");
    }
  }

  const toggleDivVisibility = () => {
    console.log("click");
    clearInterval(intervalId);
    clearInterval(progressIntervalId);
    clearInterval(progressBarIntervalId);
    setDivVisibility(true);
    setIsPause(true);
    console.log("click");
  };
  const pauseStory = () => {
    clearInterval(intervalId);
    clearInterval(progressIntervalId);
    clearInterval(progressBarIntervalId);
    setIsPause(true);
  };
  const playStory = () => {
    setIsPause(false);

    const newInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stlength);
      setProgress(0);
    }, 4500);

    const newProgressInterval = setInterval(() => {
      setProgress((prevProgress) => Math.max(0, prevProgress + 100 / 3));
    }, 500);

    const newProgressBarInterval = setInterval(() => {
      setProgress(0);
    }, 4500);

    setIntervalId(newInterval);
    setProgressIntervalId(newProgressInterval);
    setProgressBarIntervalId(newProgressBarInterval);
  };

  const toggleCloseVisibility = () => {
    // Clear existing intervals
    setIsPause(false);
    setDivVisibility(false);
    const newInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stlength);
      setProgress(0);
    }, 4500);

    const newProgressInterval = setInterval(() => {
      setProgress((prevProgress) => Math.max(0, prevProgress + 100 / 3));
    }, 500);

    const newProgressBarInterval = setInterval(() => {
      setProgress(0);
    }, 4500);

    setIntervalId(newInterval);
    setProgressIntervalId(newProgressInterval);
    setProgressBarIntervalId(newProgressBarInterval);
  };

  const handleStoreReaction = (reaction_type, story_id) => {
    setStoryReaction({
      storyId: story_id,
      reactionType: reaction_type,
    });

    axiosInstance
      .post("/api/save-story-reaction", {
        storyId: story_id,
        reactionType: reaction_type,
      })
      .then((res) => { });
  };
  const removeStory = (story_id) => {
    console.log(story_id);
    axiosInstance
      .post("/api/delete-story", {
        storyId: story_id,
      })
      .then((res) => {
        if (res.data.status == 200) {
          router.push("/newsfeed");
        }
      });
  };

  return (
    <div>
      {" "}
      <Masterdashboardlayout>
        <div className='row'>
          <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 profSideBar  mt-2'>
            <div className='row p-3'>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <h4 className='container-fluid'>All Story</h4>
              </div>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <span className='float-right'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    fill='currentColor'
                    class='bi bi-gear-fill'
                    viewBox='0 0 16 16'>
                    <path d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' />
                  </svg>
                </span>
              </div>
            </div>
            <hr />

            <div className='container-fluid'>
              <ul>
                {story.map((item, i) => (
                  <li className=''>
                    <Link
                      href={`/stories/showstory/${item._id}`}
                      className='text-black '>
                      <div className='d-flex align-items-center mt-4 m-1'>
                        {item.user_id.profile_pic !== null ? (
                          <div className='author-thumbs'>
                            <img
                              src={`${host}/uploads/${item.user_id.profile_pic}`}
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
                          {item.user_id.first_name +
                            " " +
                            item.user_id.last_name}
                          <br />
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 stor-right-text-side'>
            {mergeStory.length > 0 && currentIndex < mergeStory.length ? (
              <>
                <div className='stories-single-data-div'>
                  <svg
                    onClick={goPreviousIndex}
                    xmlns='http://www.w3.org/2000/svg'
                    width='66'
                    height='66'
                    fill='white'
                    class='bi bi-arrow-left-circle-fill'
                    viewBox='0 0 16 16'>
                    <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z' />
                  </svg>
                  <div
                    className='storss-nav-full-div'
                    style={{
                      backgroundColor: mergeStory[currentIndex].color
                        ? mergeStory[currentIndex].color
                        : "white",
                    }}>
                    <div className='d-flex '>
                      <div
                        className='progress'
                        style={{
                          width: `${mergeStory[currentIndex].start_width *
                            mergeStory[currentIndex].story_index
                            }%`,
                        }}></div>
                      <div
                        className='progress'
                        style={{
                          width: `${mergeStory[currentIndex].start_width}%`,
                        }}>
                        <div
                          className={`progress-bar ${progress >= 266.6 ? "d-none" : ""
                            }`}
                          role='progressbar'
                          style={{ width: `${progress}%` }}
                          aria-valuenow={progress}
                          aria-valuemin='0'
                          aria-valuemax='100'></div>
                      </div>
                    </div>

                    <div className='stor-nav-div'>
                      <div className='stor-nav-auth-img-div'>
                        <img
                          className='stor-nav-auth-img'
                          src={`${host}/uploads/${mergeStory[currentIndex].photo}`}
                          alt=''
                        />
                        <p>
                          {mergeStory[currentIndex].user_info}{" "}
                          <span>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              class='bi bi-check-circle-fill'
                              viewBox='0 0 16 16'>
                              <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                            </svg>
                          </span>
                        </p>
                      </div>

                      <div className='stor-nav-icon-div'>
                        {isPause ? (
                          <svg
                            onClick={playStory}
                            xmlns='http://www.w3.org/2000/svg'
                            width='23'
                            height='23'
                            fill='white'
                            class='bi bi-play-circle-fill'
                            viewBox='0 0 16 16'>
                            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z' />
                          </svg>
                        ) : (
                          <svg
                            onClick={pauseStory}
                            xmlns='http://www.w3.org/2000/svg'
                            width='23'
                            height='23'
                            fill='white'
                            class='bi bi-pause-fill'
                            viewBox='0 0 16 16'>
                            <path d='M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z' />
                          </svg>
                        )}

                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='23'
                          height='23'
                          fill='white'
                          class='bi bi-volume-mute'
                          viewBox='0 0 16 16'>
                          <path d='M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z' />
                        </svg>
                        <div className='more'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='23'
                              height='23'
                              fill='white'
                              class='bi bi-three-dots'
                              viewBox='0 0 16 16'>
                              <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                            </svg>
                            <ul className='more-dropdown'>
                              {/* <>
                                <li>
                                  <Link href='/'>Edit Post</Link>
                                </li>
                                <li>
                                  <a
                                    href='#'
                                    type='button'
                                    onClick={() => deletePost(item._id)}>
                                    Delete Post
                                  </a>
                                </li>
                              </> */}

                              <li>
                                <a href='#' onClick={() => {
                                  removeStory(mergeStory[currentIndex].story_id)
                                }}>
                                  Delete
                                </a>
                              </li>
                              {/* <li>
                                <a href='#'>Select as Featured</a>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {mergeStory[currentIndex].media == "" ||
                      mergeStory[currentIndex].media == null ? (
                      <div className='stors-img-div'>
                        <div className='stor-text-div'>
                          <p
                            className={`stor-text  ${mergeStory[currentIndex].text_position}  ${mergeStory[currentIndex].text_alignment}`}
                            style={{
                              color: mergeStory[currentIndex].text_color
                                ? mergeStory[currentIndex].text_color
                                : "white",
                              fontSize:
                                mergeStory[currentIndex].font_size != null
                                  ? `${mergeStory[currentIndex].font_size}px`
                                  : "14px",
                            }}>
                            {mergeStory[currentIndex].title}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className='stors-img-div show-img-div'>
                        <img
                          className='stors-img'
                          src={`${host}/uploads/story/${mergeStory[currentIndex].media}`}
                          alt=''
                        />
                        <div
                          className={`overlay-text   ${mergeStory[currentIndex].text_alignment}
                                                    ${mergeStory[currentIndex].text_position} 
                                               `}>
                          <p
                            className={`text-inside-image  
                                                         
                                                           `}
                            style={{
                              color: mergeStory[currentIndex].text_color
                                ? mergeStory[currentIndex].text_color
                                : "white",
                              fontSize:
                                mergeStory[currentIndex].font_size != null
                                  ? `${mergeStory[currentIndex].font_size}px`
                                  : "14px",
                            }}>
                            {" "}
                            {mergeStory[currentIndex].title}
                          </p>
                        </div>
                      </div>
                    )}
                    {storyReaction.reactionType != "" ? (
                      <>
                        <p>
                          <img
                            src={`${host}/assets/reactions/${storyReaction.reactionType}.gif`}
                            alt='Like emoji'
                            width={"20px"}
                          />
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <svg
                    onClick={goNextIndex}
                    xmlns='http://www.w3.org/2000/svg'
                    width='66'
                    height='66'
                    fill='white'
                    class='bi bi-arrow-right-circle-fill'
                    viewBox='0 0 16 16'>
                    <path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z' />
                  </svg>
                </div>
              </>
            ) : (
              ""
            )}
            {mergeStory.length > 0 && currentIndex < mergeStory.length ? (
              <div className='storie-input-full-div'>
                {mergeStory[currentIndex].user_id != userId ? (
                  <>
                    <div>
                      <input
                        className='sotr-inp'
                        type='text'
                        placeholder='comment..'
                      />
                    </div>
                    <div className='react-div'>
                      {/* <h5 className='react'>Reactions</h5> */}
                      <div className='story-reaction-icons'>
                        <img
                          src={`${host}/assets/reactions/like.gif`}
                          alt='Like emoji'
                          onClick={() => {
                            handleStoreReaction(
                              "like",
                              mergeStory[currentIndex].story_id
                            );
                          }}
                        />
                        <img
                          src={`${host}/assets/reactions/love.gif`}
                          onClick={() => {
                            handleStoreReaction(
                              "love",
                              mergeStory[currentIndex].story_id
                            );
                          }}
                          alt='Love emoji'
                        />
                        <img
                          src={`${host}/assets/reactions/haha.gif`}
                          onClick={() => {
                            handleStoreReaction(
                              "haha",
                              mergeStory[currentIndex].story_id
                            );
                          }}
                          alt='Haha emoji'
                        />
                        <img
                          src={`${host}/assets/reactions/wow.gif`}
                          onClick={() => {
                            handleStoreReaction(
                              "wow",
                              mergeStory[currentIndex].story_id
                            );
                          }}
                          alt='Wow emoji'
                        />
                        <img
                          src={`${host}/assets/reactions/sad.gif`}
                          onClick={() => {
                            handleStoreReaction(
                              "sad",
                              mergeStory[currentIndex].story_id
                            );
                          }}
                          alt='Sad emoji'
                        />
                        <img
                          src={`${host}/assets/reactions/angry.gif`}
                          onClick={() => {
                            handleStoreReaction(
                              "angry",
                              mergeStory[currentIndex].story_id
                            );
                          }}
                          alt='Angry emoji'
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`slide-up-div ${isDivVisible ? "open" : "d-none"
                        }`}>
                      {/* Content of the sliding div */}
                      <div className='stories-head-tag-div container-fluid'>
                        <div className='row stories-head-tag'>
                          <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            {/* <h1>hello</h1> */}
                          </div>
                          <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <div className='story-details-div'>
                              <h6 className='story-details'>Story Details</h6>
                            </div>
                          </div>
                          <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <div
                              className='stories-close-icon-div'
                              onClick={toggleCloseVisibility}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                class='bi bi-x-lg'
                                viewBox='0 0 16 16'>
                                <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <hr />

                        <div className='view-stories-img-full-div'>
                          {mergeStory[currentIndex].media != null ? (
                            <div
                              className='view-stories-img-div'
                              style={{
                                backgroundImage: `url(${host}/uploads/story/${mergeStory[currentIndex].media})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "100% 100%",
                              }}>
                              <div className=''>
                                <div>
                                  <p
                                    className='overflowingText'
                                    style={{ color: "white" }}>
                                    {/* {mergeStory[currentIndex].title} */}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className='view-stories-img-div'
                              style={{
                                backgroundColor: `${mergeStory[currentIndex].color}`,
                              }}>
                              <div className=''>
                                <div>
                                  <p
                                    className={`stor-text  ${mergeStory[currentIndex].text_position}  ${mergeStory[currentIndex].text_alignment}`}
                                    style={{
                                      color: mergeStory[currentIndex].text_color
                                        ? mergeStory[currentIndex].text_color
                                        : "white",
                                      fontSize: "14px",
                                    }}>
                                    {mergeStory[currentIndex].title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className='view-stories-create-div'>
                            <Link href='/stories/create'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='36'
                                height='36'
                                fill='blue'
                                className='bi bi-plus view-stories-create'
                                viewBox='0 0 16 16'>
                                <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                              </svg>
                            </Link>
                          </div>
                        </div>
                        <hr />
                        {mergeStory[currentIndex].viewers_list.length > 0 ? (
                          <div>
                            <h6>
                              <span>
                                {" "}
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='13'
                                  fill='gray'
                                  className='bi bi-eye-fill'
                                  viewBox='0 0 16 16'>
                                  <path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
                                  <path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' />
                                </svg>
                              </span>{" "}
                              {mergeStory[currentIndex].viewers_list.length}{" "}
                              Viewers Yet
                            </h6>
                            <p className='story-view-text'>
                              As people view your story, you'll see details
                              here.
                            </p>
                            {mergeStory[currentIndex].viewers_list.map(
                              (vieewItem, index) => (
                                <div className=''>
                                  <div className='d-flex '>
                                    <img
                                      className='stor-nav-auth-img'
                                      src={`${host}/uploads/${vieewItem.user_id?.profile_pic}`}
                                    />

                                    <div className=''>
                                      <p className=''>
                                        &nbsp;{vieewItem.user_id?.first_name}{" "}
                                        &nbsp;
                                        {vieewItem.user_id?.last_name}
                                        {/* ({vieewItem.reactions?.length }) */}
                                        <span className='float-right'>
                                          <span key={index}>
                                            {vieewItem.reactions &&
                                              vieewItem.reactions.map(
                                                (reaction, index) => (
                                                  <img
                                                    key={index}
                                                    className='img-custom-w-300'
                                                    src={`${host}/assets/reactions/${reaction.reaction_type}.gif`}
                                                    alt={`${reaction.reaction_type} emoji`}
                                                    onClick={() => {
                                                      handleStoreReaction(
                                                        reaction.reaction_type,
                                                        mergeStory[currentIndex]
                                                          .story_id
                                                      );
                                                    }}
                                                  />
                                                  //   (index !== vieewItem.reactions.length - 1) ? ', ' : '')
                                                )
                                              )}
                                          </span>
                                        </span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className=''></div>
                                  <hr />
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div>
                            <h6>
                              <span>
                                {" "}
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='13'
                                  fill='gray'
                                  className='bi bi-eye-fill'
                                  viewBox='0 0 16 16'>
                                  <path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
                                  <path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' />
                                </svg>
                              </span>{" "}
                              No Viewers Yet
                            </h6>
                            <p className='story-view-text'>
                              As people view your story, you'll see details
                              here.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className='text-white' onClick={toggleDivVisibility}>
                      {mergeStory[currentIndex].viewer_count == 0 ? (
                        <>No Viewers Yet</>
                      ) : (
                        <>
                          {mergeStory[currentIndex].viewer_count} people
                          {mergeStory[currentIndex].viewer_count > 1
                            ? "'s"
                            : ""}{" "}
                          view your Story
                        </>
                      )}
                    </span>
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default storiesText;
