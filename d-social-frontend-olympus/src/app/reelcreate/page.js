"use client"
import React, { useRef, useState, useEffect } from 'react'
import "../reel/reelsStyle.css"
import TopNavabr from "../../component/navbar/page"
import ReactPlayer from 'react-player';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import axiosInstance from '../../../utils/axios';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Card, Grid, Typography } from '@mui/material';
import { fi } from 'date-fns/locale';

function page() {


    function valuetext(value) {
        return `${value} sec`;
    }

    const router = useRouter();

    const [updateContent, setUpdateContent] = useState("");
    const [trimValue, setTrimValue] = useState(null)

    const [description, setDescription] = useState('')
    const [privacy, setPrivacy] = useState('public');

    console.log("privacy checking", privacy)
    const [videoUrl, setVideoUrl] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleContentChange = (e) => {
        setDescription(e.target.value);

        const newText = e.target.value.replace(/\n/g, "<br>");
        setUpdateContent(newText);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            setVideoUrl(URL.createObjectURL(file));
        }
    };

    const [value, setValue] = React.useState([0, 100]); // Default duration set to 100 seconds
    const [seekingSec, setSeekingSec] = useState(0);
    console.log("seeking", seekingSec)
    const [videoDuration, setVideoDuration] = useState(100); // Default video duration set to 100 seconds

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const valueDiff = newValue[1] - newValue[0];
        setSeekingSec(valueDiff);
        if (valueDiff > 90) {
            console.log("Not accepted for more than 90 seconds");
        }
    };

    const handleDuration = (duration) => {
        const truncatedDuration = Math.trunc(duration);
        setVideoDuration(truncatedDuration);
        setValue([0, truncatedDuration]); // Set initial slider range based on video duration
        setSeekingSec(truncatedDuration - value[0]);

    };

    const playerRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Reset slider range if video duration changes dynamically
        setValue([0, videoDuration]);
    }, [videoDuration]);


    const handleReelsSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', updateContent);
        formData.append('video', videoFile);
        formData.append('reels_privacy', privacy);
        formData.append('startTime', value[0]);
        formData.append('endTime', value[1]);
        setLoading(true);

        if (seekingSec > 90) {
            alert("Video trimming not accpeted if more 90sec");
            setLoading(false)
        }
        else {
            try {
                const response = await axiosInstance.post('/api/save-user-reels', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.status === 200) {
                    setLoading(false);

                    setTimeout(() => {
                        router.push("/newsfeed")

                    }, 1500)

                    toast.success(response.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                } else {
                    // Handle other status codes or errors here
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }


    };




    // const [value, setValue] = React.useState([0, videoDuration]);
    // const [seekingSec, setseekingSec] = useState("");
    // console.log('value check', value);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    //     console.log("value difference", newValue[1] - newValue[0]);
    //     let valueDiff = newValue[1] - newValue[0];
    //     // console.log("Type of",typeof(valueDiff))
    //     setseekingSec(valueDiff)
    //     if (valueDiff > 90) {
    //         console.log("Not accepted for more than 90")
    //     }

    // };



    // useEffect(() => {
    //     if (playerRef.current && videoUrl) {
    //         playerRef.current.seekTo(videoDuration, 'seconds');
    //         // playerRef.current.play();
    //     }

    // }, [value]);
    const handleUploadClicktw = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <TopNavabr />
            </div>

            <Grid sx={{
                mt: '90px',
                display: 'grid',
                gridTemplateColumns: {
                    md: '25% 75%',
                    sm: '1fr'
                }
            }}>
                {
                    loading && <div className="d-flex justify-content-center loader-on-reel-create">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                }



                <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>

                        <div>
                            <div>
                                <p className='reels-bio-textsec'>Create a reel</p>
                                <p className='reels-create-text'>Upload video</p>
                            </div>
                            <br />
                            <div className='add-video-div add-video ' onClick={handleUploadClicktw} style={{ cursor: 'pointer' }}>
                                <div className='add-video'>
                                    <span>
                                        <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="19.5" cy="19" r="19" fill="#D9D9D9" />
                                            <g clip-path="url(#clip0_907_2596)">
                                                <path d="M15.0716 11H24.9284C25.7421 11.0034 26.5216 11.3617 27.0969 11.9967C27.6723 12.6317 27.9969 13.4919 28 14.39V23.61C28.0007 24.5076 27.6785 25.3687 27.1042 26.0041L27.0755 26.0329C26.5039 26.6515 25.7355 26.9987 24.9349 27H15.0716C14.6684 26.9997 14.2693 26.9116 13.897 26.7407C13.5248 26.5698 13.1868 26.3195 12.9023 26.0041L12.8763 25.9725C12.3149 25.3422 12.0002 24.4938 12 23.61V14.39C12.0024 13.4917 12.3268 12.631 12.9023 11.9958C13.4778 11.3607 14.2577 11.0027 15.0716 11ZM19.0313 17.859L22.319 20.3925C22.3874 20.4406 22.4441 20.5066 22.4839 20.5846C22.5237 20.6626 22.5455 20.7503 22.5473 20.8398C22.5491 20.9293 22.5309 21.0179 22.4942 21.0978C22.4576 21.1777 22.4037 21.2464 22.3372 21.2978L19.0599 23.7968C18.9722 23.8776 18.8616 23.9218 18.7474 23.9219C18.6823 23.9224 18.6177 23.9088 18.5573 23.8816C18.497 23.8545 18.4422 23.8145 18.3959 23.7639C18.3497 23.7132 18.313 23.653 18.2879 23.5866C18.2629 23.5203 18.25 23.4491 18.25 23.3772V18.303C18.2488 18.2023 18.273 18.1032 18.32 18.0168C18.367 17.9304 18.4349 17.8603 18.5161 17.8141C18.5972 17.768 18.6884 17.7478 18.7795 17.7557C18.8705 17.7636 18.9577 17.7994 19.0313 17.859ZM12.957 14.8038H14.7799L15.9596 12.0562H15.0716C14.5113 12.0581 13.9745 12.3046 13.5783 12.7419C13.1821 13.1791 12.9587 13.7716 12.957 14.39V14.8038ZM16.8242 12.0562L15.6458 14.8038H18.9479L20.1289 12.0605L16.8242 12.0562ZM20.9909 12.0562L19.8021 14.8038H23.0182L24.2005 12.0562H20.9909ZM25.069 12.0562L23.8828 14.8038H27.043V14.39C27.0406 13.7976 26.8352 13.2282 26.4681 12.7961C26.101 12.364 25.5993 12.1012 25.0638 12.0605L25.069 12.0562ZM27.0482 15.8902H12.957V23.61C12.9592 24.2178 13.1765 24.8005 13.5625 25.2339L13.5846 25.2569C13.9781 25.6947 14.5129 25.9423 15.0716 25.9452H24.9284C25.4781 25.9447 26.006 25.7076 26.3997 25.2842L26.4206 25.2583C26.6175 25.0426 26.7739 24.7861 26.8807 24.5034C26.9875 24.2208 27.0427 23.9177 27.043 23.6115V15.8946L27.0482 15.8902Z" fill="#307777" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_907_2596">
                                                    <rect width="16" height="16" fill="white" transform="translate(12 11)" />
                                                </clipPath>
                                            </defs>
                                        </svg>


                                    </span>
                                    <b>Add Video</b>
                                    <p>or drag and drop</p>
                                </div>
                                <input class="form-control" type="file" ref={fileInputRef} id="formFile" name="video" accept="video/*" onChange={handleVideoChange} />
                            </div>
                        </div>

                        <div className='reels-main-sec-left-description pt-4'>
                            <div class="form-group">
                                <label className='reels-bio-textsec'>Description</label>
                                <textarea className="form-control border" id="exampleFormControlTextarea1" rows="3"
                                    value={description}
                                    onChange={handleContentChange}

                                />
                            </div>
                        </div>

                        <div className=''>
                            {/* <h5> Post Audience</h5> */}
                            <select class="form-control" value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                                {/* <option>Choose Audience</option> */}
                                <option value="public" selected>Public</option>
                                <option value="friends">Friends</option>
                                <option value="only_me">Only Me</option>
                            </select>

                        </div>

                        <hr />

                        <div className='d-flex flex-column pt-4'>
                            <Typography variant='h6' fontWeight={600} fontSize={'16px'} component={'black'}>Time Range</Typography>
                            <Box sx={{ width: 300 }}>
                                <Slider
                                    getAriaLabel={() => 'Time range'}
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="on"
                                    // getAriaValueText={valuetext}
                                    valueLabelFormat={(value) => `${value} sec`}

                                    max={videoDuration}
                                    sx={{
                                        '& .MuiSlider-thumb': { color: "white", border: '1px solid #65B7B7' },
                                        '& .MuiSlider-track': {
                                            color: "#307777"
                                        },
                                        '& .MuiSlider-rail': {
                                            color: "#acc4e4"
                                        },
                                        // '& .MuiSlider-active': {
                                        //     color: "green"
                                        // }
                                    }}
                                />
                                <Typography>
                                    Seeking : {seekingSec} seconds

                                </Typography>
                            </Box>
                        </div>

                        {/* <div className='mt-3'>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">
                                <h5 className='text-danger border rounded p-2'>Upload Reels</h5>
                            </label>

                            <input class="form-control" type="file" id="formFile" name="video" accept="video/*" onChange={handleVideoChange}
                            />

                        </div>
                    </div> */}


                    </div>
                    <div style={{ bottom: 0 }}>
                        {/* {publishButtonShow && (
                            <button className='btn btn-primary' onClick={handleReelsSubmit}>
                                {loading ? 'Uploading...' : 'Publish'}
                            </button>
                        )} */}

                        <button className='card-pag-button' onClick={handleReelsSubmit}>
                            {loading ? 'Uploading...' : 'Publish'}
                        </button>

                    </div>
                </Card>

                <Grid sx={{ p: 2, pt: 6, pl: 4, height: '90vh', width: '100%' }}>
                    {/* <div className='card '>
                        <h4 className='text-center mt-2 text-dark fw-600'>Video Preview</h4>
                        <div className='reels-video-preview border rounded'>
                            {videoFile && (
                                <ReactPlayer
                                    url={videoUrl}
                                    className="custom-video-player"
                                    // width='100%'
                                    // height='auto'
                                    // playing={true}
                                    ref={playerRef}
                                    onDuration={handleDuration}
                                    controls
                                />
                            )}
                        </div>

                    </div> */}
                    <Card sx={{
                        height: '100%',
                        px: 2,
                        pt: 4,
                        // border:'1px solid red'
                    }}>
                        <Typography variant='h6' pb={2} fontWeight={1000} color={'black'} fontSize={'16px'}>Preview</Typography>
                        <Grid className='add-video' sx={{
                            backgroundColor: '#F0F2F5',
                            height: '92%',
                            borderRadius: '8px'
                        }}>
                            {videoFile ? (
                                <Grid className=' rounded' sx={{
                                    width: {
                                        xl: "491px",
                                        md: "40%"
                                    },
                                    height: {
                                        xl: "647px",
                                        md: "100%"
                                    },
                                    position: 'relative',
                                    py:1
                                    // border: '1px solid red'
                                }}>

                                    <ReactPlayer
                                        height={'100%'}
                                        width={'100%'}
                                        url={videoUrl}
                                        // className="custom-video-player"
                                        // width='100%'
                                        // height='auto'
                                        // playing={true}
                                        ref={playerRef}
                                        onDuration={handleDuration}
                                        controls
                                    />

                                </Grid>
                            ) :
                                <div>
                                    <p className='reels-create-text text-center' >Your Video Preview</p>
                                    <p className='reels-bio-textsec text-center'>Upload your video in order to see a preview here.</p>
                                </div>
                            }
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

        </div >
    )
}

export default page