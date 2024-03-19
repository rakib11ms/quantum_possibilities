"use client";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/storiesPage.css";
import { useParams } from "next/navigation";
import axiosInstance from "../../../../../utils/axios";
import Link from "next/link";
import moment from "moment";

import { useRouter } from "next/navigation";
import { host } from "@/environment";
import CrossIcon from "../_ui/svg-components/CrossIcon";
import useUserInfo from "@/hooks/useUserInfo";
import { HahaSvg } from "@/component/NewsFeed/Post/post-ui/like-share-action/emoji-icons/HahaSvg";
import ReactionTypeView from "../_ui/ReactionTypeView";
import StoriesReactionPreview from "../_ui/StoriesReactionPreview";

const storiesText = () => {
   const router = useRouter();

   const [currentIndex, setCurrentIndex] = useState(0);
   const [progress, setProgress] = useState(0);
   const params = useParams();
   const [story, setStory] = useState([]);
   const [userId, setUserId] = useState(null);
   const [fullName, setFullName] = useState(null);
   const [profilePicture, setprofileImage] = useState(null);
   const [visible, setVisible] = useState(true);
   const [isDivVisible, setDivVisibility] = useState(false);
   const [intervalId, setIntervalId] = useState(null);
   const [progressIntervalId, setProgressIntervalId] = useState(null);
   const [mergeStory, setMergeStory] = useState([]);
   const [isOpenViewersList, setIsOpenViewersList] = useState(false);
   console.log("mergeStory___mergeStory", mergeStory);

   const [progressBarIntervalId, setProgressBarIntervalId] = useState(null);
   const [stlength, SetStLength] = useState(0);
   const [isPause, setIsPause] = useState(false);

   const [storyReaction, setStoryReaction] = useState({
      storyId: "",
      reactionType: "",
   });
   const { userInfo } = useUserInfo();

   console.log("story__story__story__story", story[0]?.user_id?._id === userInfo?._id);

   useEffect(() => {
      setProgress(0);
      let length = 0;
      let width = 0;
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
         axiosInstance.post("/api/get-story").then((res) => {
            if (res.data.status == 200) {
               storyOwnerId = res.data.results[0].user_id._id;
               setStory(res.data.results);

               formData = {
                  story_id: params.storyId,
                  user_id: storyOwnerId,
               };

               axiosInstance.post("/api/save-story-view", formData).then((res) => {
                  if (res.data.status == 200) {
                  }
               });
            }
         });
      }

      formData = {
         story_id: params.storyId,
      };
      axiosInstance.post("/api/single-story", formData).then((res) => {
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

      axiosInstance.post("/api/get-merge-story", formData).then((res) => {
         if (res.data.status == 200) {
            let allStory = res.data.results;
            allStory.forEach((item, i) => {
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
                        end_width: item.stories.length / 100,
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
      setCurrentIndex((prevIndex) => (prevIndex - 1 + parseInt(stlength)) % parseInt(stlength));
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
      setVisible(true);
      setStoryReaction({
         storyId: story_id,
         reactionType: reaction_type,
      });

      axiosInstance
         .post("/api/save-story-reaction", {
            storyId: story_id,
            reactionType: reaction_type,
         })
         .then((res) => {});
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
               setTimeout(() => {
                  window.location.reload();
               }, 100);
            }
         });
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         setVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
   }, [visible]);

   return (
      <div>
         <div className="row">
            <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 profSideBar">
               <div className="row p-3">
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center w-100 gap-4">
                     <CrossIcon onClick={() => (window.location.href = "/newsfeed")} />
                     <h4
                        style={{
                           whiteSpace: "nowrap",
                           padding: "0",
                           marginLeft: "10px",
                        }}
                     >
                        All Story
                     </h4>
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                     <span className="float-right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                           <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                     </span>
                  </div>
               </div>
               <hr />

               <div className="container-fluid">
                  <ul>
                     {story.map((item, i) => (
                        <li className="">
                           <Link href={`/stories/showstory/${item._id}`} className="text-black ">
                              <div className="d-flex align-items-center mt-4 m-1">
                                 {item.user_id.profile_pic !== null ? (
                                    <div className="author-thumbs">
                                       <img
                                          style={{
                                             width: "50px",
                                             height: "50px",
                                             borderRadius: "50%",
                                          }}
                                          src={`${host}/uploads/${item.user_id.profile_pic}`}
                                          alt=""
                                       />
                                    </div>
                                 ) : (
                                    <div className="author-thumbs">
                                       <img
                                          style={{
                                             width: "50px",
                                             height: "50px",
                                             borderRadius: "50%",
                                          }}
                                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                       />
                                    </div>
                                 )}

                                 <div className="mx-2">
                                    <p
                                       style={{
                                          fontSize: "16px",
                                       }}
                                    >
                                       {item.user_id.first_name + " " + item.user_id.last_name}
                                    </p>
                                    {formatDate(item.createdAt)}
                                 </div>
                              </div>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div
               style={{
                  position: "relative",
               }}
               className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 stor-right-text-side"
            >
               {mergeStory.length > 0 && currentIndex < mergeStory.length ? (
                  <>
                     <div className="stories-single-data-div">
                        <svg
                           onClick={goPreviousIndex}
                           xmlns="http://www.w3.org/2000/svg"
                           width="50"
                           height="50"
                           fill="white"
                           class="bi bi-arrow-left-circle-fill"
                           viewBox="0 0 16 16"
                        >
                           <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                        <div
                           style={{
                              backgroundColor: mergeStory[currentIndex].color ? mergeStory[currentIndex].color : "white",
                              maxWidth: "450px",
                           }}
                        >
                           {/* Progeress Bar */}
                           <div className="d-flex ">
                              <div
                                 className="progress"
                                 style={{
                                    width: `${mergeStory[currentIndex].start_width * mergeStory[currentIndex].story_index}%`,
                                 }}
                              ></div>
                              <div
                                 className="progress"
                                 style={{
                                    width: `${mergeStory[currentIndex].start_width}%`,
                                 }}
                              >
                                 <div
                                    className={`progress-bar ${progress >= 266.6 ? "d-none" : ""}`}
                                    role="progressbar"
                                    style={{ width: `${progress}%` }}
                                    aria-valuenow={progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                 ></div>
                              </div>
                           </div>

                           {/* Top Image Profile */}
                           <div className="stor-nav-div">
                              <div
                                 style={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    gap: "10px",
                                 }}
                              >
                                 <img
                                    style={{
                                       width: "50px",
                                       height: "50px",
                                       borderRadius: "50%",
                                    }}
                                    src={`${host}/uploads/${mergeStory[currentIndex].photo}`}
                                    alt=""
                                 />
                                 <p
                                    style={{
                                       fontSize: "16px",
                                    }}
                                 >
                                    {mergeStory[currentIndex].user_info}{" "}
                                 </p>
                              </div>

                              <div className="stor-nav-icon-div">
                                 {isPause ? (
                                    <svg
                                       onClick={playStory}
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="23"
                                       height="23"
                                       fill="white"
                                       class="bi bi-play-circle-fill"
                                       viewBox="0 0 16 16"
                                    >
                                       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                    </svg>
                                 ) : (
                                    <svg onClick={pauseStory} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-pause-fill" viewBox="0 0 16 16">
                                       <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                                    </svg>
                                 )}

                                 <div className="more">
                                    <div>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-three-dots" viewBox="0 0 16 16">
                                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                       </svg>

                                       {userId == mergeStory[currentIndex].user_id && (
                                          <ul className="more-dropdown">
                                             {userId == mergeStory[currentIndex].user_id && (
                                                <li>
                                                   <a onClick={() => removeStory(mergeStory[currentIndex].story_id)}>Delete</a>
                                                </li>
                                             )}
                                          </ul>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {mergeStory[currentIndex].media == "" || mergeStory[currentIndex].media == null ? (
                              <></>
                           ) : (
                              <div>
                                 <div
                                    style={{
                                       position: "relative",
                                    }}
                                 >
                                    <img
                                       style={{
                                          width: "100%",
                                          height: "80vh",
                                          objectFit: "contain",
                                       }}
                                       src={`${host}/uploads/story/${mergeStory[currentIndex].media}`}
                                       alt=""
                                    />
                                    <div
                                       style={{
                                          position: "absolute",
                                          bottom: "0",
                                          left: "0",
                                          background: "red",
                                          height: "100px",
                                          color: "black",
                                       }}
                                    ></div>
                                 </div>
                                 <div
                                    className={`overlay-text   ${mergeStory[currentIndex].text_alignment}
                                                    ${mergeStory[currentIndex].text_position} 
                                               `}
                                 >
                                    <p
                                       className={`text-inside-image  
                                                         
                                                           `}
                                       style={{
                                          color: mergeStory[currentIndex].text_color ? mergeStory[currentIndex].text_color : "white",
                                          fontSize: mergeStory[currentIndex].font_size != null ? `${mergeStory[currentIndex].font_size}px` : "14px",
                                       }}
                                    >
                                       {" "}
                                       {mergeStory[currentIndex].title}
                                    </p>
                                 </div>

                                 {/* Reply Stories */}

                                 {mergeStory[currentIndex]?.user_id === userInfo?._id ? (
                                    <div
                                       style={{
                                          backgroundColor: "transparent",
                                          height: "100px",
                                          width: "100%",
                                          position: "absolute",
                                          bottom: "0",
                                          left: "0",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                       }}
                                    >
                                       <div
                                          style={{
                                             display: "flex",
                                             justifyContent: "space-between",
                                             alignItems: "center",
                                             color: "white",
                                             gap: "12px",
                                             width: "50%",
                                             position: "relative",
                                          }}
                                       >
                                          <div>
                                             {mergeStory[currentIndex]?.viewers_list.length > 0 ? (
                                                <svg
                                                   onClick={() => setIsOpenViewersList(!isOpenViewersList)}
                                                   xmlns="http://www.w3.org/2000/svg"
                                                   width="24"
                                                   height="24"
                                                   viewBox="0 0 24 24"
                                                   fill="none"
                                                   stroke="currentColor"
                                                   stroke-width="2"
                                                   stroke-linecap="round"
                                                   stroke-linejoin="round"
                                                   class="lucide lucide-eye"
                                                >
                                                   <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                   <circle cx="12" cy="12" r="3" />
                                                </svg>
                                             ) : (
                                                <p
                                                   style={{
                                                      cursor: "pointer",
                                                      border: "none",
                                                      backgroundColor: "none",
                                                   }}
                                                >
                                                   No view yet
                                                </p>
                                             )}

                                             {/* Who view my stories */}
                                             {isOpenViewersList && (
                                                <div
                                                   style={{
                                                      position: "absolute",
                                                      left: "0",
                                                      bottom: "40px",
                                                      borderRadius: "6px",
                                                      backgroundColor: "white",
                                                      padding: "4px",
                                                      boxShadow: "1px 2px 2px rgba(0,0,0,.05)",
                                                      maxHeight: "450px",
                                                      overflowY: "auto",
                                                   }}
                                                >
                                                   {mergeStory[currentIndex]?.viewers_list.map((each) => {
                                                      return (
                                                         <>
                                                            <StoriesReactionPreview each={each} />
                                                         </>
                                                      );
                                                   })}
                                                </div>
                                             )}
                                          </div>
                                          <Link href="/stories/create">
                                             <button>Add new</button>
                                          </Link>
                                       </div>
                                    </div>
                                 ) : (
                                    <div
                                       style={{
                                          backgroundColor: "transparent",
                                          height: "100px",
                                          width: "100%",
                                          position: "absolute",
                                          bottom: "0",
                                          left: "0",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                       }}
                                    >
                                       <div
                                          style={{
                                             display: "flex",
                                             justifyContent: "center",
                                             alignItems: "center",
                                             color: "white",
                                             gap: "12px",
                                          }}
                                       >
                                          <div>
                                             <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                   d="M0.0629276 14.9708C-0.0492299 15.25 -0.00889635 15.5881 0.163443 15.8134C0.335783 16.0387 0.60236 16.1018 0.827783 15.9706L3.74364 14.2743C6.1943 12.8486 8.86866 12.1963 11.5384 12.3497C11.5701 13.4304 11.6172 14.5105 11.6796 15.5896L11.7594 16.9704C11.8079 17.8081 12.5489 18.2764 13.1104 17.8241C15.5475 15.8612 17.6662 13.3319 19.3536 10.3711L19.8904 9.42898C20.0365 9.17264 20.0365 8.82737 19.8904 8.57102L19.3536 7.62895C17.6662 4.66811 15.5475 2.13881 13.1104 0.175871C12.5489 -0.27638 11.8079 0.191904 11.7594 1.02961L11.6796 2.41041C11.626 3.33665 11.5837 4.26368 11.5528 5.19115H10.8025C6.62479 5.19114 2.80201 8.15234 0.914728 12.8504L0.0629276 14.9708Z"
                                                   fill="white"
                                                />
                                             </svg>
                                          </div>
                                          <div>
                                             <input
                                                style={{
                                                   width: "250px",
                                                   height: "30px",
                                                   border: "1px solid white",
                                                   borderRadius: "5px",
                                                }}
                                                type="text"
                                                placeholder="Reply"
                                             />
                                          </div>
                                          <div
                                             style={{
                                                display: "flex",
                                                justifyContent: "start",
                                                alignItems: "center",
                                                gap: "5px",
                                             }}
                                          >
                                             <svg
                                                onClick={() => {
                                                   handleStoreReaction("like", mergeStory[currentIndex].story_id);
                                                }}
                                                style={{
                                                   cursor: "pointer",
                                                }}
                                                width="28"
                                                height="29"
                                                viewBox="0 0 28 29"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M27.57 18.0262C29.4064 10.5667 24.8479 3.03083 17.3883 1.19444C9.92877 -0.641947 2.39291 3.91654 0.556518 11.3761C-1.27987 18.8357 3.27862 26.3715 10.7382 28.2079C18.1978 30.0443 25.7336 25.4858 27.57 18.0262Z"
                                                   fill="#4080FF"
                                                />
                                                <path d="M9.89953 12.5176H6.26953V20.6776H9.89953V12.5176Z" fill="white" />
                                                <path
                                                   d="M20.6595 13.5875C21.0195 13.3575 21.2595 12.9675 21.2595 12.5075C21.2595 11.8075 20.6895 11.2375 19.9895 11.2375H16.0895C16.1395 10.4275 16.1695 9.12748 16.0295 7.86748C15.7995 5.82748 13.6495 6.73748 13.6495 6.73748C14.7795 9.22748 11.2695 13.6475 11.2695 13.6475V20.2475H18.5395C19.2395 20.2475 19.8095 19.6775 19.8095 18.9775C19.8095 18.6275 19.6695 18.3075 19.4395 18.0775C20.0595 17.9875 20.5395 17.4675 20.5395 16.8175C20.5395 16.4675 20.3995 16.1475 20.1695 15.9175C20.7895 15.8275 21.2695 15.3075 21.2695 14.6575C21.2695 14.2075 21.0295 13.8075 20.6695 13.5775L20.6595 13.5875Z"
                                                   fill="white"
                                                />
                                             </svg>

                                             {/* Love */}
                                             <svg
                                                onClick={() => handleStoreReaction("love", mergeStory[currentIndex].story_id)}
                                                style={{
                                                   cursor: "pointer",
                                                }}
                                                width="29"
                                                height="29"
                                                viewBox="0 0 29 29"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M28.2849 16.9211C29.5211 9.33894 24.3767 2.19025 16.7946 0.954052C9.21239 -0.282141 2.06369 4.86229 0.827498 12.4445C-0.408695 20.0266 4.73574 27.1753 12.3179 28.4115C19.9001 29.6477 27.0487 24.5033 28.2849 16.9211Z"
                                                   fill="#F25268"
                                                />
                                                <path
                                                   d="M14.55 22.9576L21.38 17.4276C22.13 16.8176 22.74 15.9976 23.04 15.0476C24.29 11.1176 20.73 6.90758 16.5 8.55758C15.36 9.00758 14.54 10.4976 14.54 10.4976C14.54 10.4976 13.72 9.00758 12.58 8.55758C8.36001 6.90758 4.79001 11.1176 6.04001 15.0476C6.35001 16.0076 6.95001 16.8176 7.70001 17.4276L14.53 22.9576H14.55Z"
                                                   fill="white"
                                                />
                                             </svg>

                                             {/* Love-Hahah */}
                                             <svg
                                                onClick={() => handleStoreReaction("haha", mergeStory[currentIndex].story_id)}
                                                style={{
                                                   cursor: "pointer",
                                                }}
                                                width="28"
                                                height="29"
                                                viewBox="0 0 28 29"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M23.8731 24.5075C29.3053 19.0754 29.3054 10.268 23.8732 4.83585C18.441 -0.596338 9.63365 -0.596338 4.20145 4.83585C-1.23074 10.268 -1.23073 19.0754 4.20146 24.5076C9.63365 29.9398 18.441 29.9397 23.8731 24.5075Z"
                                                   fill="#FDDA74"
                                                />
                                                <path
                                                   d="M24.31 14.8375C24.31 20.5075 19.71 25.1076 14.04 25.1076C8.37002 25.1076 3.77002 20.5075 3.77002 14.8375H24.31Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M14.04 18.6676C11.1 18.6676 8.46002 19.9076 6.58002 21.8876C8.45002 23.8676 11.1 25.1076 14.04 25.1076C16.98 25.1076 19.62 23.8676 21.5 21.8876C19.63 19.9076 16.98 18.6676 14.04 18.6676Z"
                                                   fill="#F25268"
                                                />
                                                <path
                                                   d="M4.46003 11.8376C4.21003 11.8376 3.98002 11.6576 3.93002 11.4076C3.87002 11.1076 4.06003 10.8276 4.35003 10.7576L8.55002 9.88757L5.37002 8.09757C5.11002 7.94757 5.01002 7.61758 5.16002 7.35758C5.31002 7.09758 5.64002 6.99755 5.90002 7.14755L10.35 9.64755C10.55 9.75755 10.66 9.97755 10.62 10.2076C10.59 10.4376 10.41 10.6076 10.19 10.6576L4.57003 11.8275C4.57003 11.8275 4.49003 11.8376 4.46003 11.8376Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M23.62 11.8376C23.62 11.8376 23.55 11.8375 23.51 11.8275L17.89 10.6576C17.67 10.6076 17.5 10.4276 17.46 10.2076C17.43 9.97755 17.53 9.75755 17.73 9.64755L22.18 7.14755C22.44 6.99755 22.78 7.09758 22.92 7.35758C23.07 7.61758 22.97 7.95757 22.71 8.09757L19.53 9.88757L23.73 10.7576C24.03 10.8176 24.21 11.1076 24.15 11.4076C24.1 11.6676 23.87 11.8376 23.62 11.8376Z"
                                                   fill="#3C3C3B"
                                                />
                                             </svg>

                                             {/* Wowo */}
                                             <svg
                                                onClick={() => handleStoreReaction("wow", mergeStory[currentIndex].story_id)}
                                                style={{
                                                   cursor: "pointer",
                                                }}
                                                width="29"
                                                height="29"
                                                viewBox="0 0 29 29"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M28.0027 16.8433C29.1978 9.25453 24.0148 2.13378 16.4261 0.938627C8.83735 -0.256525 1.71659 4.92651 0.521435 12.5153C-0.673717 20.104 4.50932 27.2248 12.0981 28.4199C19.6868 29.6151 26.8075 24.432 28.0027 16.8433Z"
                                                   fill="#FDDA74"
                                                />
                                                <path
                                                   d="M14.26 25.9976C16.2482 25.9976 17.86 23.562 17.86 20.5576C17.86 17.5531 16.2482 15.1176 14.26 15.1176C12.2717 15.1176 10.66 17.5531 10.66 20.5576C10.66 23.562 12.2717 25.9976 14.26 25.9976Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M7.73998 14.0576C8.712 14.0576 9.49998 12.8666 9.49998 11.3976C9.49998 9.92849 8.712 8.73756 7.73998 8.73756C6.76796 8.73756 5.97998 9.92849 5.97998 11.3976C5.97998 12.8666 6.76796 14.0576 7.73998 14.0576Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M20.78 14.0576C21.7521 14.0576 22.54 12.8666 22.54 11.3976C22.54 9.92849 21.7521 8.73756 20.78 8.73756C19.808 8.73756 19.02 9.92849 19.02 11.3976C19.02 12.8666 19.808 14.0576 20.78 14.0576Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M9.95999 6.03755C9.81999 6.03755 9.67999 5.98755 9.56999 5.87755C8.73999 5.04755 7.29999 5.04755 6.47999 5.87755C6.26999 6.08755 5.91999 6.08755 5.70999 5.87755C5.49999 5.66755 5.49999 5.31756 5.70999 5.10756C6.32999 4.48756 7.14999 4.14754 8.02999 4.14754C8.90999 4.14754 9.72999 4.48756 10.35 5.10756C10.56 5.31756 10.56 5.66755 10.35 5.87755C10.24 5.98755 10.1 6.03755 9.95999 6.03755Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M22.23 6.03755C22.09 6.03755 21.95 5.98755 21.84 5.87755C21.01 5.04755 19.57 5.04755 18.75 5.87755C18.54 6.08755 18.19 6.08755 17.98 5.87755C17.77 5.66755 17.77 5.31756 17.98 5.10756C18.6 4.48756 19.42 4.14754 20.3 4.14754C21.18 4.14754 22 4.48756 22.62 5.10756C22.83 5.31756 22.83 5.66755 22.62 5.87755C22.51 5.98755 22.37 6.03755 22.23 6.03755Z"
                                                   fill="#3C3C3B"
                                                />
                                             </svg>

                                             {/* sad */}
                                             <svg
                                                onClick={() => handleStoreReaction("sad", mergeStory[currentIndex].story_id)}
                                                style={{
                                                   cursor: "pointer",
                                                }}
                                                width="29"
                                                height="29"
                                                viewBox="0 0 29 29"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M28.4652 17.0612C29.7754 9.49148 24.7011 2.29285 17.1314 0.982613C9.5617 -0.327627 2.36306 4.74669 1.05282 12.3164C-0.25742 19.8861 4.8169 27.0848 12.3866 28.395C19.9563 29.7053 27.1549 24.6309 28.4652 17.0612Z"
                                                   fill="#FDDA74"
                                                />
                                                <path
                                                   d="M9.78001 13.7676C9.78001 14.9476 8.99 15.8976 8.02 15.8976C7.05 15.8976 6.26001 14.9476 6.26001 13.7676C6.26001 12.5876 7.05 11.6376 8.02 11.6376C8.99 11.6376 9.78001 12.5876 9.78001 13.7676Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M5.13998 11.8576C5.06998 11.8576 4.99998 11.8475 4.92998 11.8175C4.64998 11.7075 4.51998 11.3876 4.62998 11.1076C4.95998 10.2976 5.58998 9.66753 6.39998 9.32753C7.20998 8.98753 8.09999 8.98753 8.90999 9.32753C9.18999 9.43753 9.31998 9.75755 9.20998 10.0375C9.09998 10.3175 8.77999 10.4475 8.49999 10.3375C7.95999 10.1175 7.35999 10.1175 6.82999 10.3375C6.28999 10.5675 5.86998 10.9875 5.64998 11.5275C5.55998 11.7375 5.35998 11.8675 5.14998 11.8675L5.13998 11.8576Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M21.47 15.8976C22.442 15.8976 23.23 14.9439 23.23 13.7676C23.23 12.5912 22.442 11.6376 21.47 11.6376C20.4979 11.6376 19.71 12.5912 19.71 13.7676C19.71 14.9439 20.4979 15.8976 21.47 15.8976Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M24.35 11.8576C24.14 11.8576 23.93 11.7276 23.85 11.5176C23.63 10.9776 23.21 10.5576 22.67 10.3276C22.13 10.1076 21.54 10.0976 21 10.3276C20.72 10.4376 20.4 10.3076 20.29 10.0276C20.17 9.74758 20.31 9.42758 20.59 9.31758C21.4 8.98758 22.29 8.98758 23.1 9.31758C23.91 9.65758 24.54 10.2876 24.87 11.0976C24.99 11.3776 24.85 11.6976 24.57 11.8076C24.5 11.8376 24.43 11.8476 24.36 11.8476L24.35 11.8576Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M18.82 22.2076C18.65 22.2076 18.49 22.1275 18.38 21.9875C17.43 20.6875 15.97 19.9476 14.37 19.9476C12.77 19.9476 11.31 20.6875 10.36 21.9875C10.18 22.2275 9.84002 22.2876 9.60002 22.1076C9.36002 21.9276 9.30003 21.5876 9.48003 21.3476C10.62 19.7876 12.45 18.8576 14.37 18.8576C16.29 18.8576 18.12 19.7876 19.26 21.3476C19.44 21.5876 19.39 21.9376 19.14 22.1076C19.04 22.1776 18.93 22.2176 18.82 22.2176V22.2076Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M23.77 28.1876C21.91 28.1876 20.64 26.3076 21.33 24.5876L23.77 18.4876L26.21 24.5876C26.9 26.3176 25.63 28.1876 23.77 28.1876Z"
                                                   fill="#4F90FC"
                                                />
                                             </svg>

                                             {/*angry  */}
                                             <svg
                                                onClick={() => handleStoreReaction("angry", mergeStory[currentIndex].story_id)}
                                                style={{
                                                   cursor: "pointer",
                                                }}
                                                width="29"
                                                height="29"
                                                viewBox="0 0 29 29"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                             >
                                                <path
                                                   d="M28.3894 17.039C29.7102 9.47107 24.646 2.26538 17.0781 0.944572C9.51022 -0.376236 2.30451 4.68801 0.983698 12.2559C-0.33711 19.8238 4.72715 27.0295 12.295 28.3503C19.8629 29.6711 27.0686 24.6068 28.3894 17.039Z"
                                                   fill="url(#paint0_linear_0_1)"
                                                />
                                                <path
                                                   d="M19.16 18.6776C19.16 19.6276 19.8 20.3976 20.58 20.3976C21.36 20.3976 22 19.6276 22 18.6776C22 17.7276 21.36 16.9576 20.58 16.9576C19.8 16.9576 19.16 17.7276 19.16 18.6776Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M16.42 17.9676C16.13 17.9676 15.89 17.7376 15.88 17.4476C15.86 17.1476 16.09 16.8876 16.4 16.8776C20.26 16.6676 23.91 15.9776 24.22 15.3976C24.22 15.0976 24.46 14.8676 24.76 14.8676C25.06 14.8676 25.3 15.1376 25.3 15.4376C25.3 17.1376 20.49 17.7476 16.46 17.9676C16.46 17.9676 16.44 17.9676 16.43 17.9676H16.42Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M9.93999 18.6776C9.93999 19.6276 9.29997 20.3976 8.51997 20.3976C7.73997 20.3976 7.09998 19.6276 7.09998 18.6776C7.09998 17.7276 7.73997 16.9576 8.51997 16.9576C9.29997 16.9576 9.93999 17.7276 9.93999 18.6776Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M12.69 17.9676C12.69 17.9676 12.67 17.9676 12.66 17.9676C8.63002 17.7476 3.82001 17.1376 3.82001 15.4376C3.82001 15.1376 4.06001 14.8876 4.37001 14.8876C4.68001 14.8876 4.92001 15.1276 4.92001 15.4376C5.21001 15.9776 8.87001 16.6676 12.73 16.8776C13.03 16.8976 13.26 17.1476 13.25 17.4476C13.23 17.7376 12.99 17.9676 12.71 17.9676H12.69Z"
                                                   fill="#3C3C3B"
                                                />
                                                <path
                                                   d="M17.98 24.1976C17.98 24.1976 17.88 24.1975 17.83 24.1775C14.58 23.2575 11.15 24.1775 11.12 24.1775C10.83 24.2575 10.53 24.0875 10.45 23.7975C10.37 23.5075 10.54 23.2076 10.83 23.1276C10.98 23.0876 14.58 22.1176 18.13 23.1276C18.42 23.2076 18.59 23.5075 18.51 23.7975C18.44 24.0375 18.22 24.1976 17.98 24.1976Z"
                                                   fill="#3C3C3B"
                                                />
                                                <defs>
                                                   <linearGradient id="paint0_linear_0_1" x1="14.663" y1="28.5661" x2="14.663" y2="0.746128" gradientUnits="userSpaceOnUse">
                                                      <stop stop-color="#FDDA74" />
                                                      <stop offset="1" stop-color="#E64850" />
                                                   </linearGradient>
                                                </defs>
                                             </svg>
                                          </div>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           )}
                           {storyReaction.reactionType != "" ? (
                              <>
                                 <img
                                    style={{
                                       position: "absolute",
                                       top: "50%",
                                       right: "50%",
                                       transform: "translate(50%, -50%)",
                                       transition: "opacity 0.5s ease",
                                       opacity: visible ? 1 : 0,
                                    }}
                                    src={`${host}/assets/reactions/${storyReaction.reactionType}.gif`}
                                    alt="Like emoji"
                                    width="50px"
                                 />
                              </>
                           ) : (
                              <></>
                           )}
                        </div>
                        <svg onClick={goNextIndex} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                           <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                        </svg>
                     </div>
                  </>
               ) : (
                  ""
               )}
               {mergeStory.length > 0 && currentIndex < mergeStory.length ? <></> : ""}
            </div>
         </div>
         {/* </Masterdashboardlayout> */}
      </div>
   );
};

export default storiesText;
