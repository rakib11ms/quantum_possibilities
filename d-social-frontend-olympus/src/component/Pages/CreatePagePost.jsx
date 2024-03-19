import React, { useEffect, useRef, useState } from "react";
import { host } from "@/environment";

import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import photoSvg from "../../../public/custom-svg-icon/photo.svg";
import locationSvg from "../../../public/custom-svg-icon/location.svg";
import addfriendSvg from "../../../public/custom-svg-icon/addfriend.svg";
import gallerySvg from "../../../public/custom-svg-icon/gallery.svg";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader/Loading";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import PagePostList from "../NewsFeed/PagePostList";
import ProfileTextField from "@/app/newsfeed/_ui/ProfileTextField";
import UploadNavigation from "@/app/newsfeed/_ui/UploadNavigation";
import PlusIcon from "@/app/newsfeed/_svg-components/plusIcon";
import StoryPreview from "@/app/newsfeed/_ui/StoryPreview";
import PageTextField from "@/app/newsfeed/_ui/PageTextField";
// import Colorselect from "../../../../public/colorselect.png";


const CreatePagePost = ({ pageDetails }) => {
    const [showColors, setShowColors] = useState(false);
    const colorsRef = useRef(null);

    const [pageInfo, setPageInfo] = useState(null);
    const [locationChildData, setlocationChildData] = useState(null);
    const [selectedOption, setSelectedOption] = useState('public');
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [openFeelingModal, setOpenFeelingModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateContent, setUpdateContent] = useState("");

    const openModal = () => {
        setOpenLocationModal(true);
    };
    const [textColor, setTextColor] = useState(null);
    function handleBackgroundColors(tempColor) {
        setTextColor(tempColor);
    }
    const [activityData, setActivityData] = useState({
        activity_name: "",
        activity_type: "",
        logo: "",
        activity_id: "",
        sub_activity_id: "",
        feeling_id: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Create a FormData object to prepare files for upload
        const formData = new FormData();
        formData.append("description", updateContent);
        formData.append("post_type", "timeline_post");
        formData.append("post_privacy", selectedOption)
        formData.append("page_id", pageDetails._id)
        formData.append("post_background_color", textColor);
        if (
            activityData.feeling_id !== undefined ||
            activityData.feeling_id !== null
        ) {
            formData.append("feeling_id", activityData.feeling_id);
        }

        if (
            activityData &&
            activityData.activity_id &&
            activityData.activity_id._id
        ) {
            formData.append("activity_id", activityData.activity_id._id);
        }

        if (activityData && activityData.sub_activity_id) {
            formData.append("sub_activity_id", activityData.sub_activity_id);
        }

        if (locationChildData && locationChildData._id) {
            formData.append("location_id", locationChildData._id);
        }

        files.forEach((file) => {
            formData.append("files", file);
        });

        if (formData.get("description") == null || formData.get("description").trim() === "" && formData.get("files") == null) {
            setLoading(false);

            toast.error("Empty Content would not be posted!", {
                position: "top-right",
                style: {
                    background: "white",
                    color: "black",
                },
            })
        }
        else {
            axiosInstance
                .post("api/save-page-post", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    if (res.data.status == 200) {
                        window.location.reload();

                        // router.replace("/newsfeed");

                        toast.success(res.data.message, {
                            position: "top-right",
                            style: {
                                background: "white",
                                color: "black",
                            },
                        });
                        setLoading(false);
                        setFiles("");
                        setContent("");
                        setUpdateContent("");
                    }
                });
        }

    };

    const setFeelingModal = () => {
        setOpenFeelingModal(true);
    };

    useEffect(() => {
        if (pageDetails && pageDetails._id) {

            setPageInfo(pageDetails);
        }
    }, [pageDetails]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const options = [
        { value: 'public', label: 'Public', icon: <FontAwesomeIcon icon={faEarthAmericas} /> },
        { value: 'friends', label: 'Friends', icon: <FontAwesomeIcon icon={faUsers} /> },
        { value: 'only_me', label: 'Only me', icon: <FontAwesomeIcon icon={faLock} /> },
    ];

    const handleContentChange = (e) => {
        setContent(e.target.value);

        const newText = e.target.value.replace(/\n/g, "<br>");
        setUpdateContent(newText);
    };

    const handlePostImageUpload = (e) => {
        e.stopPropagation(); // Stop event propagation to prevent double triggering
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileUpload = (e) => {
        const uploadedFiles = e.target.files;
        const newFilesArray = [];

        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            newFilesArray.push(file);
        }

        setFiles([...files, ...newFilesArray]);
    };

const [fullName, setFullName] = useState(null);
const [profilePic, setProfilePic] = useState(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    const localUserInfo = localStorage.getItem("userInfo");
    setFullName(localStorage.getItem("username"));

    const localProfilePic = JSON.parse(localUserInfo)[0].profile_pic;
    setProfilePic(localProfilePic);
  }
}, []);

const [isOpenModal, setIsOpenModal] = useState({
  post: false,
  tag: false,
  event: false,
  gif: false,
  location: false,
  photoUpload: false,
});


    return (
      <>
        {pageInfo != null ? (
          // <>
          //     <form onSubmit={handleSubmit} className="page-post-form ">
          //         <div className='d-flex align-items-center mt-4 m-1'>

          //             {pageInfo.profile_pic !== null ? (
          //                 <div className='author-thumbs'>
          //                     <img
          //                         src={`${host}/uploads/pages/${pageInfo.profile_pic}`}
          //                         alt=''
          //                         className='avatar '
          //                     />
          //                 </div>
          //             ) : (
          //                 <div className='author-thumbs'>
          //                     <img
          //                         src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
          //                         className='avatar '
          //                     />
          //                 </div>
          //             )}
          //             <div className="name-and-privacy ">
          //                 <div className='mx-2'>
          //                     {/* activityData.activity_name  */}
          //                     <h6 className="my-0">
          //                         {`${pageInfo.page_name} `}
          //                         {` ${activityData.activity_name != "" ? "is" : ""
          //                             } `}
          //                         {activityData.logo != "" ? (
          //                             <img
          //                                 src={`${host}/assets/${activityData.logo}`}
          //                                 className='feeling-icon'
          //                             />
          //                         ) : (
          //                             ""
          //                         )}
          //                         {` ${activityData.activity_type != ""
          //                             ? activityData.activity_type
          //                             : ""
          //                             } `}
          //                         {` ${activityData.activity_name != ""
          //                             ? activityData.activity_name
          //                             : ""
          //                             } `}
          //                         {`${locationChildData !== null
          //                             ? `is at ${locationChildData.location_name}`
          //                             : ""
          //                             }`}
          //                     </h6>

          //                 </div>
          //                 <div className="">
          //                     <div className="my-0">

          //                         <FormControl size="small" fullWidth
          //                         >
          //                             <Select
          //                                 labelId="privacy-label"
          //                                 id="privacy-select"
          //                                 value={selectedOption}
          //                                 // label="Privacy"
          //                                 onChange={handleChange}
          //                                 sx={{
          //                                     fontSize: '12px',
          //                                     backgroundColor: 'white',
          //                                     '& .MuiSelect-select': {
          //                                         border: 'none',
          //                                     },
          //                                     '& .MuiFilledInput-root': {
          //                                         borderBottom: 'none',
          //                                     },
          //                                     "& fieldset": { border: 'none' },
          //                                 }}

          //                             >
          //                                 {options.map((option) => (
          //                                     <MenuItem key={option.value} value={option.value} sx={{ fontSize: '12px', '& .MuiSelect-select': { border: 'none', backgroundColor: "white", outline: "0" } }}>
          //                                         <span class=""> {option.icon}</span>
          //                                         <span class="mx-1"> {option.label}</span>
          //                                     </MenuItem>
          //                                 ))}
          //                             </Select>
          //                         </FormControl>
          //                     </div>

          //                 </div>
          //             </div>

          //         </div>

          //         <div className='form-group with-icon label-floating is-empty border rounded m-1'>

          //             <div className=''>
          //                 <textarea
          //                     className={`${textColor!=null ? 'form-controlss '+textColor:'form-control'} `}
          //                     placeholder=' Share what you are thinking here...'
          //                     // defaultValue={""}
          //                     style={{ border: "none", minHeight: "135px" }}
          //                     value={content}
          //                     onChange={handleContentChange}
          //                 />
          //             </div>

          //             {/* Display uploaded files in a single grid */}
          //             <div className='grid-container'>
          //                 {files.length > 0 &&
          //                     files.map((file, index) => (
          //                         <div key={`file-${index}`} className='grid-item '>
          //                             <span className="cross-icon-post-image-video-item" onClick={() => {

          //                                 const filess = [...files];
          //                                 filess.splice(index, 1);
          //                                 setFiles(filess)
          //                             }}>  X </span>

          //                             {
          //                                 file.type.startsWith("image/") ? (
          //                                     <img
          //                                         src={URL.createObjectURL(file)}
          //                                         alt={`Uploaded Image ${index}`}
          //                                     // width="200"
          //                                     // height="200"
          //                                     />
          //                                 ) : file.type.startsWith("video/") ? (
          //                                     // <video width="200" height="200" controls>
          //                                     <video controls>
          //                                         <source
          //                                             src={URL.createObjectURL(file)}
          //                                             type={file.type}
          //                                         />
          //                                         Your browser does not support the video tag.
          //                                     </video>
          //                                 ) : null
          //                             }
          //                         </div>
          //                     ))}
          //             </div>
          //         </div>

          //         <div className='post-back-color-full-div'>
          //             <div
          //                 className='post-back-color-div'
          //                 onClick={() => {
          //                     setShowColors(!showColors);
          //                     handleBackgroundColors(null);
          //                 }
          //                 }>
          //                 <img
          //                     className='post-back-color-img'
          //                     src='/colorselect.png'
          //                     alt=''
          //                 />
          //             </div>

          //             {showColors && (
          //                 <div className='colors-div' ref={colorsRef}>
          //                     <div className='color-div color-one' onClick={(e) => { handleBackgroundColors('color-one') }} />
          //                     <div className='color-div color-two' onClick={(e) => { handleBackgroundColors('color-two') }} />
          //                     <div className='color-div color-three' onClick={(e) => { handleBackgroundColors('color-three') }} />

          //                     <div className='color-div color-four' onClick={(e) => { handleBackgroundColors('color-four') }} />
          //                     <div className='color-div color-five' onClick={(e) => { handleBackgroundColors('color-five') }} />
          //                     <div className='color-div color-six' onClick={(e) => { handleBackgroundColors('color-six') }} />
          //                     <div className='color-div color-seven' onClick={(e) => { handleBackgroundColors('color-seven') }} />
          //                     <div className='color-div color-nine' onClick={(e) => { handleBackgroundColors('color-nine') }} />
          //                     <div className='color-div color-ten' onClick={(e) => { handleBackgroundColors('color-ten') }} />
          //                     <div className='color-div color-nine' onClick={(e) => { handleBackgroundColors('color-nine') }} />
          //                     <div className='color-div color-ten' onClick={(e) => { handleBackgroundColors('color-ten') }} />
          //                     <div className='color-div color-eleven' onClick={(e) => { handleBackgroundColors('color-eleven') }} />
          //                     <div className='color-div color-twelve' onClick={(e) => { handleBackgroundColors('color-twelve') }} />
          //                     <div className='color-div color-thirteen' onClick={(e) => { handleBackgroundColors('color-thirteen') }} />
          //                     <div className='color-div color-fortheen' onClick={(e) => { handleBackgroundColors('color-fortheen') }} />
          //                     <div className='color-div color-fivteen' onClick={(e) => { handleBackgroundColors('color-fivteen') }} />
          //                 </div>
          //             )}

          //             {showColors && (
          //                 <>
          //                     {colorsRef.current &&
          //                         colorsRef.current.scrollLeft > 0 && (
          //                             <div
          //                                 className='arrow'
          //                                 onClick={() => scroll("left")}>
          //                                 {"<"}
          //                             </div>
          //                         )}
          //                     {colorsRef.current &&
          //                         colorsRef.current.scrollLeft <
          //                         colorsRef.current.scrollWidth -
          //                         colorsRef.current.clientWidth && (
          //                             <div
          //                                 className='arrow'
          //                                 style={{ right: 0 }}
          //                                 onClick={() => scroll("right")}>
          //                                 {">"}
          //                             </div>
          //                         )}
          //                 </>
          //             )}
          //         </div>

          //         <div className='post-field-icons'>
          //             <div className='row'>
          //                 <div className='col-lg-9 col-md-9 col-sm-9 col-6 '>
          //                     <span className='p-text-add text-black'>
          //                         Add to your post
          //                     </span>
          //                 </div>
          //                 <div className='post-field-single-icon  col-lg-3 col-md-3 col-sm-3 col-6 d-flex align-items-center '>
          //                     {/* <Image src={photoSvg.src} width="20" height="20" onClick={handlePostImageUpload} /> */}
          //                     {/* <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} /> */}

          //                     <div className='post-media-icon '>
          //                         <Image
          //                             src={photoSvg.src}
          //                             width='20'
          //                             height='20'
          //                             className=''
          //                             name='media'
          //                             onClick={handlePostImageUpload}
          //                         />
          //                         <input
          //                             id='fileInput'
          //                             type='file'
          //                             className='media-file'
          //                             name='media'
          //                             accept='image/*,video/*'
          //                             multiple
          //                             onChange={handleFileUpload}
          //                         />
          //                     </div>

          //                     <div>
          //                         <Image
          //                             src={locationSvg.src}
          //                             width='20'
          //                             height='20'
          //                             onClick={openModal}
          //                         />
          //                     </div>
          //                     <div>
          //                         <Image
          //                             src={addfriendSvg.src}
          //                             width='20'
          //                             height='20'
          //                         />
          //                     </div>
          //                     <div>
          //                         <Image
          //                             src={gallerySvg.src}
          //                             width='20'
          //                             height='20'
          //                         />
          //                     </div>
          //                     <div className=''>
          //                         <span onClick={setFeelingModal}>
          //                             <svg
          //                                 xmlns='http://www.w3.org/2000/svg'
          //                                 width='16'
          //                                 height='16'
          //                                 fill='black'
          //                                 className='bi bi-three-dots'
          //                                 viewBox='0 0 16 16'>
          //                                 <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
          //                             </svg>
          //                         </span>
          //                     </div>
          //                 </div>
          //             </div>
          //         </div>
          //         <div className='post-btton-div'>
          //             <button className='post-btton' type='submit'>
          //                 {loading ? <Loader /> : <>Post</>}
          //             </button>
          //         </div>
          //     </form>
          // </>

          //   <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
          //     <div className="newsfeed_story__wrapper">
          //       <ProfileTextField />

          //       <hr />

          //       {/* Navigation  */}
          //       {/* <UploadNavigation /> */}
          //       <hr />
          //     </div>
          //     <div className="prof-ful-timeline-div">
          //       {/* <ProfilePostList /> */}
          //       <PagePostList />
          //     </div>
          //   </div>
          <div>
            <div className="newsfeed_story__wrapper">
              <PageTextField
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                pageDetails={pageDetails}
              />
              <hr />

              {/* Navigation  */}
              <UploadNavigation
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
              />
              <hr />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
}


export default CreatePagePost;