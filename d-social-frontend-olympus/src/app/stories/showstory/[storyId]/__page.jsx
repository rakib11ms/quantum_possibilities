"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useEffect, useRef, useState } from "react";
import StoryCSS from "./showstories.module.css";
import { host } from "@/environment";
import ImageStory from "@/component/Story/ImageStory";
import axiosInstance from "../../../../../utils/axios";
import moment from "moment";
import Slider from "react-slick";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import StoryBox from "@/component/Story/StoryBox";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [reactions, setReactions] = useState([
    { id: 1, label: "Like", count: 0 },
    { id: 2, label: "Love", count: 0 },
    { id: 3, label: "Haha", count: 0 },
    { id: 4, label: "Wow", count: 0 },
    { id: 5, label: "Sad", count: 0 },
  ]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can handle the file upload logic here
      setSelectedFile(file);
    }
  };

  const [profileImage, setprofileImage] = useState("");
  const [fullName, setFullName] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(0);

  const [files, setFiles] = useState([]);
  const [story, setStory] = useState([]);
  const [mergeStory, setMergeStory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [activeStory, setActiveStory] = useState([]);
  const [storyReaction, setStoryReaction] = useState({
    storyId: "",
    reactionType: "",
  });


  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageFullName = localStorage.getItem("fullname");
      const localStorageUserInfo = localStorage.getItem("userInfo");
      const localStorageId = localStorage.getItem("userId");
      setUserId(localStorageId);

      const data = JSON.parse(localStorageUserInfo);
      setFullName(localStorageFullName);
      if (localStorageUserInfo !== null) {
        setprofileImage(data[0].profile_pic);
      }
      axiosInstance.post("/api/get-story").then((res) => {
        if (res.data.status == 200) {
          setStory(res.data.results);
        }
      });

    }
  }, []);

  useEffect(() => {
    const formData = {
      story_id: params.storyId,
    };

    getStory(formData);
    axiosInstance.post("/api/single-story", formData).then((res) => {
      if (res.data.status == 200) {
        setActiveStory(res.data.results);
      }
    });

    viewCount(params.storyId);
  }, []);

  function getStory(formData) {
    axiosInstance.post("/api/get-merge-story", formData).then((res) => {
      if (res.data.status == 200) {
        setMergeStory(res.data.results);
        console.log("results");
        console.log(res.data.results)
      }
    });
  }

  const viewCount = (storyId) => {
    const formData = {
      story_id: storyId,
    };
    axiosInstance.post("/api/save-story-view", formData).then((res) => {
      if (res.data.status == 200) {
      }
    });
  };

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

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    const newFilesArray = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      newFilesArray.push(file);
    }
    setImagePreview(1);
    setFiles([...files, ...newFilesArray]);
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

  var settingsone = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: false,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
          padding: 1,
        },
      },
    ],
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

  const customPrevArrow = (
    <div
      className={`${StoryCSS.customArrow} ${StoryCSS.leftArrow}`}
      onClick={() => {
        slider.slickPrev();
        setStoryReaction({
          storyId: "",
          reactionType: "",
        });
      }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='currentColor'
        className='bi bi-arrow-left-circle'
        viewBox='0 0 16 16'>
        <path
          fillRule='evenodd'
          d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z'
        />
      </svg>
    </div>
  );
  const sliderNext = () => {
    slider.slickNext();
  }

  const customNextArrow = (
    <div
      className={`${StoryCSS.customArrow} ${StoryCSS.rightArrow}`}
      onClick={() => {
        slider.slickNext();
        setStoryReaction({
          storyId: "",
          reactionType: "",
        });
      }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        fill='currentColor'
        className='bi bi-arrow-right-short'
        viewBox='0 0 16 16'>
        <path
          fill-rule='evenodd'
          d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z'
        />
      </svg>
    </div>
  );
  let slider;

  // Story views
  const [isDivVisible, setDivVisibility] = useState(false);

  const toggleDivVisibility = () => {
    setDivVisibility(!isDivVisible);
  };

  return (
    <div>
      <Masterdashboardlayout>
        {imagePreview === 0 && (
          <div>
            <div className='row'>
              <div className='col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3'>
                <div className={StoryCSS.profSideBar}>
                  <div className='row'>
                    <div className='col-md-6'>
                      <h4 className='container-fluid'>All Story</h4>
                    </div>
                    <div className='col-md-6'>
                      <span className='float-right mr-3'>
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
                      <li className=''>
                        <div className='d-flex align-items-center mt-4 m-1'>
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

                          <div className='mx-2'>{fullName}</div>
                        </div>
                      </li>

                      {story.map((item, i) => (
                        <li className=''>
                          <Link
                            href={`/stories/showstory/${item._id}`}
                            className={StoryCSS.textBlack}>
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
                  <hr />
                </div>
              </div>
              <div className='col-12 col-sm-6 col-md-9 col-lg-9 col-xl-9'>
                {customPrevArrow}
                <Slider
                  {...settingsone}
                  ref={(c) => {
                    slider = c;
                  }}>

                  {
                    activeStory.map((item, i) => (


                      <StoryBox
                        key={item._id}
                        story={item.stories}
                        host={host}
                        activeStory={item}
                        removeStory={removeStory}
                        userId={userId}
                        sliderNext={sliderNext}
                        length={item.stories.length}
                      />



                    ))
                  }


                  {
                    mergeStory.map((item, i) => (


                      <StoryBox
                        key={item._id}
                        story={item.stories}
                        host={host}
                        activeStory={item}
                        removeStory={removeStory}
                        userId={userId}
                        sliderNext={sliderNext}
                        length={item.stories.length}
                      />



                    ))
                  }



                </Slider>
                {customNextArrow}
              </div>
            </div>
          </div>
        )}
        {imagePreview === 1 && <ImageStory files={files} />}
      </Masterdashboardlayout>
    </div>
  );
};

export default Page;


// useEffect(() => {
//     setProgress(0);
//     let length = 0;
//     let width = 0;

//     if (typeof window !== "undefined") {
//         const localStorageFullName = localStorage.getItem("fullname");
//         const localStorageUserInfo = localStorage.getItem("userInfo");
//         const localStorageId = localStorage.getItem("userId");
//         setUserId(localStorageId);

//         const data = JSON.parse(localStorageUserInfo);
//         setFullName(localStorageFullName);
//         if (localStorageUserInfo !== null) {
//             setprofileImage(data[0].profile_pic);
//         }
//         axiosInstance.post("/api/get-story").then((res) => {
//             if (res.data.status == 200) {
//                 setStory(res.data.results);
//             }
//         });

//     }



//     const formData = {
//         story_id: params.storyId,
//     };
//     axiosInstance.post("/api/single-story", formData).then((res) => {
//         if (res.data.status == 200) {
//             const singleStory = res.data.results;

//             singleStory.map((item, i) => {
//                 length += item.stories.length;
//                 width = 0;
//                 item.stories.map((story, j) => {
//                     setMergeStory((mergeStory) => [
//                         ...mergeStory,
//                         {
//                             user_info: item.first_name + " " + item.last_name,
//                             photo: item.profile_pic,
//                             media: story.media,
//                             title: story.title,
//                             text_color: story.text_color,
//                             color: story.color,
//                             font_size: story.font_size,
//                             text_position: story.text_position,
//                             text_alignment: story.text_alignment,
//                             story_length: item.stories.length,
//                             story_index: j,
//                             start_width: 100 / item.stories.length,
//                             end_width: 100 / item.stories.length
//                             // Add other properties as needed
//                         },

//                     ]);
//                     width += item.stories.length
//                 });
//             });
//         }
//     });

//     axiosInstance.post("/api/get-merge-story", formData).then((res) => {
//         if (res.data.status == 200) {
//             let allStory = res.data.results;
//             allStory.map((item, i) => {
//                 length += item.stories.length;
//                 width = 0;
//                 item.stories.map((story, j) => {
//                     setMergeStory((mergeStory) => [
//                         ...mergeStory,
//                         {
//                             user_info: item.first_name + " " + item.last_name,
//                             photo: item.profile_pic,
//                             media: story.media,
//                             title: story.title,
//                             text_color: story.text_color,
//                             color: story.color,
//                             font_size: story.font_size,
//                             text_position: story.text_position,
//                             text_alignment: story.text_alignment,
//                             story_length: item.stories.length,
//                             story_index: j,
//                             start_width: 100 / item.stories.length,
//                             end_width: item.stories.length / 100
//                         },
//                     ]);
//                     width += item.stories.length
//                 });
//             });
//         }
//     });

//     const interval = setInterval(() => {
//         // setProgress(0);
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
//     }, 4500);
//     console.log("current index", currentIndex);

//     const progressInterval = setInterval(() => {

//         setProgress((prevProgress) => Math.max(0, prevProgress + (100 / 3)));


//     }, 500);

//     setProgressId(progressInterval);
//     const progressBarInterval = setInterval(() => {
//         const prevProgess = setProgress((prevProgress) => {
//             setProgress(0)
//         })
//     }, 4500);
//     return () => {
//         clearInterval(progressInterval);
//         clearInterval(interval);
//         clearInterval(progressBarInterval);
//         setProgress(0)
//     };
// }, []);