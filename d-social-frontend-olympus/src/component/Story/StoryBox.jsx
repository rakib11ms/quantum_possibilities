// StoryBox.js
import React, { useState, useEffect, useRef } from 'react';
import StoryCSS from "../../app/stories/showstory/[storyId]/showstories.module.css";
import './storybox.css';
import axiosInstance from '../../../utils/axios';
const StoryBox = ({ story, activeStory, host, removeStory, userId, sliderNext, key, length }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);
    const [intervalId, setIntervalId] = useState(null);
    const [proressId, setProgressId] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [storyReaction, setStoryReaction] = useState({
        storyId: "",
        reactionType: "",
    });

    const [isDivVisible, setDivVisibility] = useState(false);
    const currentStory = story[currentIndex];
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval = '';
        if (isDivVisible == false) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % story.length);
            }, 5000); // 30 seconds 4000
        }


        setIntervalId(interval);

        // const timeoutId = setTimeout(() => {
        //     setIsVisible(true);
        // }, 10);
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) => Math.max(0, prevProgress + (100 / 4)));
        }, 500);

        setProgressId(progressInterval);
        const progressBarInterval = setInterval(() => {
            setProgress(0);
        }, 5000);
        return () => {
            // clearTimeout(timeoutId)
            clearInterval(progressInterval);
            clearInterval(interval);
            clearInterval(progressBarInterval);
            // setProgress(0);
        };
    }, []);





    useEffect(() => {
        setIsVisible(true);
        if (currentIndex == (story.length - 1)) {

            if (isDivVisible == false) {
                if (currentIndex > 0) {
                    setTimeout(() => {
                        sliderNext();
                        // setProgress(0);
                    }, 5000);
                    // setTimeout
                }

            }

        }

    }, [currentIndex])

    const toggleDivVisibility = () => {
        console.log(isDivVisible);
        clearInterval(progressInterval);
        clearInterval(intervalId);
        clearInterval(proressId)
        console.log(isDivVisible)
        setDivVisibility(true);
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




    const toggleCloseVisibility = () => {
        // Clear existing intervals
        setDivVisibility(false);
        clearInterval(intervalId);
        clearInterval(proressId);

        console.log(proressId);
        // Restart intervals
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % story.length);
        }, 5000);

        const newProgressInterval = setInterval(() => {
            setProgress((prevProgress) => Math.max(0, prevProgress + (100 / 4)));
        }, 500);

        setIntervalId(interval);
        setProgressId(newProgressInterval);

        setProgress(0);
    }

    const arrayToRender = Array.from({ length });

    const calculateProgressBarWidth = (progress, index) => {

        if (index == currentIndex) {
            return progress;
        } else {
            return '100%';
        }
    };
    const calculateProgressBarColor = (index) => {

        if (index == currentIndex) {
            return 'gray';
        } else {
            return 'black';
        }
    };


    return (
        <div key={currentStory._id} className='container-fluid'>
            <div className={`${StoryCSS.storyContainer} newClass`}>

                {/* for Images story */}
                {currentStory.media != null ? (
                    isVisible ? (
                        <div
                            className={StoryCSS.storyBox}
                            style={{
                                backgroundImage: `url(${host}/uploads/story/${currentStory.media})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "120% 90%",
                            }}
                        >


                            <div style={{ width: `${100}%`, backgroundColor: 'black', display: 'flex' }}>
                                {arrayToRender.map((_, index) => (
                                    <div
                                        className='progress'
                                        style={{ height: '5px', position: 'relative', width: `${100 / length}%` }}
                                    >
                                        <div
                                            className='progress-bar'
                                            role='progressbar'
                                            style={{ width: calculateProgressBarWidth(progress, index), backgroundColor: calculateProgressBarColor(index) }}
                                            aria-valuenow={progress}
                                            aria-valuemin='0'
                                            aria-valuemax='100'
                                        ></div>
                                    </div>
                                ))}
                            </div>


                            <div className={StoryCSS.story_header}>

                                <div className={StoryCSS.story_internal_div}>
                                    <img
                                        className={StoryCSS.story_author_img}
                                        src={`${host}/uploads/${activeStory.profile_pic}`}
                                    />

                                    <div className={StoryCSS.story_internal_div}>
                                        <p className={StoryCSS.story_tag_text}>
                                            {activeStory.first_name +
                                                " " + activeStory.last_name}
                                        </p>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-check-circle-fill'
                                            viewBox='0 0 16 16'>
                                            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                                        </svg>
                                    </div>
                                </div>
                                <div className={StoryCSS.story_internal_div}>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='26'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-pause-fill'
                                        viewBox='0 0 16 16'>
                                        <path d='M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z' />
                                    </svg>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='26'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-volume-mute'
                                        viewBox='0 0 16 16'>
                                        <path d='M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z' />
                                    </svg>
                                    <div className='more'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='26'
                                            height='16'
                                            fill='#ffffff'
                                            className='bi bi-three-dots'
                                            viewBox='0 0 16 16'>
                                            <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                                        </svg>
                                        <ul className='more-dropdown more-with-triangle'>
                                            <li>
                                                <a
                                                    href='#'
                                                // onClick={(e) => {
                                                //     removeStory(activeStory._id);
                                                // }}
                                                >
                                                    Delete Story
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>Report</a>
                                            </li>
                                        </ul>
                                    </div>





                                </div>
                            </div>

                            <div className=''>
                                <div>
                                    <p className={`${StoryCSS.overflowingText} ${currentStory.text_position}  ${currentStory.text_alignment}`} style={{ fontSize: currentStory.font_size != null ? `${currentStory.font_size}px` : '14px', color: currentStory.text_color }}>
                                        {currentStory.title}
                                    </p>
                                </div>
                            </div>

                        </div >
                    ) : null
                ) : (
                    isVisible ? (
                        <div
                            className={StoryCSS.storyBox}
                            style={{ backgroundColor: `${currentStory.color}` }}
                        >

                            <div style={{ width: `${100}%`, backgroundColor: 'black', display: 'flex' }}>
                                {arrayToRender.map((_, index) => (
                                    <div
                                        className='progress'
                                        style={{ height: '5px', position: 'relative', width: `${100 / length}%` }}
                                    >
                                        <div
                                            className='progress-bar'
                                            role='progressbar'
                                            style={{ width: calculateProgressBarWidth(progress, index), backgroundColor: calculateProgressBarColor(index) }}
                                            aria-valuenow={progress}
                                            aria-valuemin='0'
                                            aria-valuemax='100'
                                        ></div>
                                    </div>
                                ))}
                            </div>


                            <div className={StoryCSS.story_header}>
                                <div className={StoryCSS.story_internal_div}>
                                    <img
                                        className={StoryCSS.story_author_img}
                                        src={`${host}/uploads/${activeStory.profile_pic}`}
                                    />

                                    <div className={StoryCSS.story_internal_div}>
                                        <p className={StoryCSS.story_tag_text}>
                                            {activeStory.first_name +
                                                " " + activeStory.last_name}
                                        </p>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-check-circle-fill'
                                            viewBox='0 0 16 16'>
                                            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                                        </svg>
                                    </div>
                                </div>
                                <div className={StoryCSS.story_internal_div}>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='26'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-pause-fill'
                                        viewBox='0 0 16 16'>
                                        <path d='M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z' />
                                    </svg>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='26'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-volume-mute'
                                        viewBox='0 0 16 16'>
                                        <path d='M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z' />
                                    </svg>
                                    <div className='more'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='26'
                                            height='16'
                                            fill='#ffffff'
                                            className='bi bi-three-dots'
                                            viewBox='0 0 16 16'>
                                            <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                                        </svg>
                                        <ul className='more-dropdown more-with-triangle'>
                                            <li>
                                                <a
                                                    href='#'
                                                // onClick={(e) => {
                                                //     remFFoveStory(activeStory._id);
                                                // }}
                                                >
                                                    Delete Story
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>Report</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className=''>
                                <div>
                                    <p className={`${StoryCSS.overflowingText} ${currentStory.text_position}  ${currentStory.text_alignment}`}
                                        style={{ fontSize: currentStory.font_size != null ? `${currentStory.font_size}px` : '14px', color: currentStory.text_color }}>
                                        {currentStory.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null
                )}










                <div className=''>
                    <div>
                        <p className={StoryCSS.overflowingText}>
                            {/* {title} */}
                        </p>
                    </div>
                </div>
                {storyReaction.reactionType != "" ? (
                    <div style={{ position: "revert" }}>
                        {/* Other content in the parent div */}
                        <p
                            style={{
                                color: "#fff",
                                position: "absolute",
                                top: "85%",
                            }}>
                            Your {storyReaction.reactionType} this story
                        </p>
                    </div>
                ) : (
                    <></>
                )}



            </div>

            {userId != activeStory._id ? (
                <div>
                    <div className='story-reply'>

                        <div className='story-reply-input'>
                            <input
                                className='story-input'
                                type='text'
                                placeholder='Add your reply...'
                                f
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            {/* Label wraps the file input */}
                            <label className='file-input-label'>
                                <input
                                    type='file'
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                // onChange={handleFileChange}
                                />
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='gray'
                                    className='bi bi-images'
                                    viewBox='0 0 16 16'>
                                    <path d='M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' />
                                    <path d='M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z' />
                                </svg>
                            </label>
                        </div>
                        <div className='reactions'>
                            <div
                                className='reaction-container  my-0 px-1'
                                style={{ background: "#000000" }}>
                                {/* <figure className="post-reaction-icons" onClick={(e) => { setReactionPostId(item._id) }}> */}
                                <div className='story-reaction-icons'>
                                    <img
                                        src={`${host}/assets/reactions/like.gif`}
                                        alt='Like emoji'
                                        onClick={() => {
                                            handleStoreReaction(
                                                "like",
                                                activeStory._id
                                            );
                                        }}
                                    />
                                    <img
                                        src={`${host}/assets/reactions/love.gif`}
                                        onClick={() => {
                                            handleStoreReaction(
                                                "love",
                                                activeStory._id
                                            );
                                        }}
                                        alt='Love emoji'
                                    />
                                    <img
                                        src={`${host}/assets/reactions/haha.gif`}
                                        onClick={() => {
                                            handleStoreReaction(
                                                "haha",
                                                activeStory._id
                                            );
                                        }}
                                        alt='Haha emoji'
                                    />
                                    <img
                                        src={`${host}/assets/reactions/wow.gif`}
                                        onClick={() => {
                                            handleStoreReaction(
                                                "wow",
                                                activeStory._id
                                            );
                                        }}
                                        alt='Wow emoji'
                                    />
                                    <img
                                        src={`${host}/assets/reactions/sad.gif`}
                                        onClick={() => {
                                            handleStoreReaction(
                                                "sad",
                                                activeStory._id
                                            );
                                        }}
                                        alt='Sad emoji'
                                    />
                                    <img
                                        src={`${host}/assets/reactions/angry.gif`}
                                        onClick={() => {
                                            handleStoreReaction(
                                                "angry",
                                                activeStory._id
                                            );
                                        }}
                                        alt='Angry emoji'
                                    />
                                </div>

                                {/* </figure>rrrr */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>


                    <div className='story-reply'>
                        <div className={StoryCSS.viewCount}>
                            <div
                                className={`slide-up-div ${isDivVisible ? "open" : ""
                                    }`}>
                                {/* Content of the sliding div */}
                                <div className='stories-head-tag-div container-fluid'>
                                    <div className='row stories-head-tag'>
                                        <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                            {/* <h1>hello</h1> */}
                                        </div>
                                        <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                            <div className='story-details-div'>
                                                <h6 className='story-details'>
                                                    Story Details
                                                </h6>
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
                                        {activeStory.media != null ? (
                                            <div className='view-stories-img-div' style={{
                                                backgroundImage: `url(${host}/uploads/story/${activeStory.media})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "100% 100%",
                                            }}>
                                                <div className=''>
                                                    <div>
                                                        <p className={StoryCSS.overflowingText} style={{ color: 'white' }}>
                                                            {activeStory.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) :
                                            <div className='view-stories-img-div' style={{
                                                backgroundColor: `${activeStory.color}`,
                                            }}>

                                                <div className=''>
                                                    <div>
                                                        <p className={StoryCSS.overflowingText} style={{ color: 'white' }}>
                                                            {activeStory.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className='view-stories-create-div'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='36'
                                                height='36'
                                                fill='blue'
                                                className='bi bi-plus view-stories-create'
                                                viewBox='0 0 16 16'>
                                                <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                                            </svg>
                                        </div>
                                    </div>
                                    <hr />
                                    {currentStory.viewersList.length > 0 ?

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
                                                {currentStory.viewersList.length} Viewers Yet
                                            </h6>
                                            <p className='story-view-text'>
                                                As people view your story, you'll see details
                                                here.
                                            </p>
                                            {currentStory.viewersList.map((vieewItem, index) => (
                                                <div className={StoryCSS.story_header}>
                                                    <div className={StoryCSS.story_internal_div}>
                                                        <img
                                                            className={StoryCSS.story_author_img}
                                                            src={`${host}/uploads/${vieewItem.user_id?.profile_pic}`}
                                                        />

                                                        <div className={StoryCSS.story_internal_div}>
                                                            <p className={StoryCSS.story_tag_text}>
                                                                {vieewItem.user_id.first_name}
                                                                {vieewItem.user_id.last_name}
                                                            </p>

                                                        </div>
                                                    </div>
                                                    <div className={StoryCSS.story_internal_div}>

                                                    </div>
                                                    <hr />
                                                </div>
                                            ))
                                            }
                                        </div>

                                        :
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
                                    }

                                </div>
                            </div>
                            <span onClick={toggleDivVisibility}>{
                                currentStory.viewersCount == 0 ?
                                    <>No Viewers Yet</> :
                                    <>{currentStory.viewersCount} people{currentStory.viewersCount > 1 ? "'s" : ''} view your Story</>
                            }</span>
                        </div>
                        <div
                            className={`slide-up-div ${isDivVisible ? "open" : ""
                                }`}>
                            {/* Content of the sliding div */}
                            <div className='stories-head-tag-div container-fluid'>
                                <div className='row stories-head-tag'>
                                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                        {/* <h1>hello</h1> */}
                                    </div>
                                    <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                        <div className='story-details-div'>
                                            <h6 className='story-details'>
                                                Story Details
                                            </h6>
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
                                                fill='black'
                                                class='bi bi-x-lg'
                                                viewBox='0 0 16 16'>
                                                <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className='view-stories-img-full-div'>
                                    {currentStory.media != null ? (
                                        <div className='view-stories-img-div' style={{
                                            backgroundImage: `url(${host}/uploads/story/${currentStory.media})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "100% 100%",
                                        }}>
                                            <div className=''>
                                                <div>
                                                    <p className={StoryCSS.overflowingText} style={{ color: 'white' }}>
                                                        {currentStory.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                        <div className='view-stories-img-div' style={{
                                            backgroundColor: `${currentStory.color}`,
                                        }}>

                                            <div className=''>
                                                <div>
                                                    <p className={StoryCSS.overflowingText} style={{ color: 'white' }}>
                                                        {currentStory.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className='view-stories-create-div'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='36'
                                            height='36'
                                            fill='blue'
                                            className='bi bi-plus view-stories-create'
                                            viewBox='0 0 16 16'>
                                            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                                        </svg>
                                    </div>
                                </div>
                                <hr />
                                {currentStory.viewersList.length > 0 ?

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
                                            {currentStory.viewersList.length} Viewers Yet
                                        </h6>
                                        <p className='story-view-text'>
                                            As people view your story, you'll see details
                                            here.
                                        </p>
                                        {currentStory.viewersList.map((vieewItem, index) => (
                                            <div className={`${StoryCSS.story_header} mt-2`} >
                                                <div className={StoryCSS.story_internal_div}>
                                                    <img
                                                        className={StoryCSS.story_author_img}
                                                        src={`${host}/uploads/${vieewItem.user_id?.profile_pic}`}
                                                    />

                                                    <div className={StoryCSS.story_internal_div}>
                                                        <p className={StoryCSS.story_tag_text}>
                                                            {vieewItem.user_id.first_name}
                                                            {vieewItem.user_id.last_name}
                                                        </p>

                                                    </div>
                                                </div>
                                                <div className={StoryCSS.story_internal_div}>

                                                </div>
                                                <hr />
                                            </div>
                                        ))
                                        }
                                    </div>

                                    :
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
                                }

                            </div>
                        </div>
                    </div>

                </>

            )}

        </div>
    );
};

export default StoryBox;

