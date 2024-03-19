"use client";
import React, { useEffect, useState } from "react";
// import { isAuthenticated } from "../../middleware/middleware";
import Masterdashboardlayout from "../../../component/Masterdashboardlayout/Masterdashboardlayout";
import TopNewsCaro from "../../newsfeed/TopNewsCaro";
import { toast } from "react-toastify";
import { host } from "@/environment";
import axiosInstance from "../../../../utils/axios";
import feedauthone from "../../../assets/img/author-page.jpg";
import feedauththree from "../../../assets/img/avatar10-sm.jpg";
import fileupSVG from "../../../../public/fileup.svg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Leftsidebar from "@/component/leftsidebar/page";
import statusSvg from "../../../../public/custom-svg-icon/status.svg";
import reelsSvg from "../../../../public/custom-svg-icon/reels.svg";
import storySvg from "../../../../public/custom-svg-icon/story.svg";
import gallerySvg from "../../../../public/custom-svg-icon/gallery.svg";
import locationSvg from "../../../../public/custom-svg-icon/location.svg";
import addfriendSvg from "../../../../public/custom-svg-icon/addfriend.svg";
import photoSvg from "../../../../public/custom-svg-icon/photo.svg";
import dpProfile from "../../../assets/img/author-page.jpg";
import Image from "next/image";
import Link from "next/link";
import LocationModal from "@/component/NewsFeed/LocationModal";
import FeatureUser from "@/component/NewsFeed/FeatureUser";
import FeelingAndActivity from "@/component/NewsFeed/FeelingAndActivity";
import MobileSlider from "../../newsfeed/mobileSlider";
import MobileStorieReels from "../../newsfeed/mobileStorieReels";
import { useParams, useRouter } from "next/navigation";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
const Newsfeed = () => {
  const params = useParams();
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openFeelingModal, setOpenFeelingModal] = useState(false);
  const [postDetails, setPostDetails] = useState({});

  const router = useRouter();

  const openModal = () => {
    setOpenLocationModal(true);
  };

  const closeModal = () => {
    setOpenLocationModal(false);
  };

  const setFeelingModal = () => {
    setOpenFeelingModal(true);
  };

  const closeFeelingModal = () => {
    setOpenFeelingModal(false);
  };

  const handlePostImageUpload = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent double triggering
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  //upload post functionality codes start
  const [selectedOption, setSelectedOption] = useState('public');
  // console.log("sona", selectedOption)

  const options = [
    { value: 'public', label: 'Public', icon: <FontAwesomeIcon icon={faEarthAmericas} /> },
    { value: 'friends', label: 'Friends', icon: <FontAwesomeIcon icon={faUsers} /> },
    { value: 'only_me', label: 'Only me', icon: <FontAwesomeIcon icon={faLock} /> },
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [content, setContent] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  const [files, setFiles] = useState([]);
  const [dbFiles, setDbFiles] = useState([]);

  const handleFileUpload = (e) => {
    console.log("anik");
    const uploadedFiles = e.target.files;
    const newFilesArray = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      console.log("anik");
      const file = uploadedFiles[i];
      newFilesArray.push(file);
    }

    setFiles([...files, ...newFilesArray]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);

    const newText = e.target.value.replace(/\n/g, "<br>");
    setUpdateContent(newText);
  };



  const [activityData, setActivityData] = useState({
    activity_name: "",
    activity_type: "",
    logo: "",
    activity_id: "",
    sub_activity_id: "",
    feeling_id: ""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to prepare files for upload
    const formData = new FormData();
    formData.append("post_id", params.id);
    formData.append("description", updateContent);
    formData.append("post_type", 'timeline_post');
    formData.append("post_privacy", selectedOption)

    if (activityData.feeling_id !== undefined || activityData.feeling_id !== null) {
      formData.append("feeling_id", activityData.feeling_id);
    }

    if (activityData && activityData.activity_id && activityData.activity_id._id) {
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


    axiosInstance
      .post("api/edit-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          router.push('/newsfeed');
          setTimeout(() => {
            window.location.reload();
          }, 2500)


          toast.success(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });

          singlePostDetails(params.id);
        }
      });
  };

  function isImage(filename) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const fileExtension = filename.split('.').pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  }

  function isVideo(filename) {
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'mkv'];
    const fileExtension = filename.split('.').pop().toLowerCase();
    return videoExtensions.includes(fileExtension);
  }


  const [fullName, setFullName] = React.useState('');
  const [profileImage, setprofileImage] = useState('');
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfoJSON = localStorage.getItem('userInfo');

      if (userInfoJSON) {
        const userInfo = JSON.parse(userInfoJSON);

        // Now you can access properties from userInfo
        const profile_image = userInfo[0].profile_pic;
        setprofileImage(profile_image)

      }
      const localStorageFullName = localStorage.getItem('fullname');
      const localStorageUsername = localStorage.getItem('username');
      setFullName(localStorageFullName);
    }
    singlePostDetails(params.id);
  }, [])

  const [locationChildData, setlocationChildData] = useState(null);

  const handlelocationChildData = (data) => {
    setlocationChildData(data);
  };

  const handleFeelingChildData = (data) => {
    setActivityData(data);

  };

  // Mobile 
  const [activediv, setactivediv] = useState('Status'); // State to manage active tab

  const handleTabClick = (tab) => {
    setactivediv(tab); // Set the active tab when clicked
  };

  const singlePostDetails = (id) => {
    const postData = {
      postid: id
    }
    axiosInstance.post('/api/get-post-details-by-id', postData).then((res) => {
      if (res.data.status == 200) {
        const postData = res.data.result;

        setPostDetails(res.data.result);
        setContent(postData.description.replace(/<br>/g, '\n'));
        setUpdateContent(postData.description.replace(/<br>/g, '\n'));
        setSelectedOption(res.data.result.post_privacy)
        if (postData.feeling_id != null) {
          setActivityData({
            activity_name: postData.feeling_id.feeling_name,
            activity_type: "",
            logo: postData.feeling_id.logo,
            activity_id: "",
            sub_activity_id: "",
            feeling_id: postData.feeling_id._id
          })
        }
        if (postData.location_id != null) {
          setlocationChildData({
            location_name: postData.location_id.location_name,
            location_id: postData.location_id._id
          })
        }
        setDbFiles(res.data.media)

      }

    })
  }

  const deleteImage = (id, media) => {
    const mediaData = {
      media_id: id,
      media: media
    }
    axiosInstance.post('/api/delete-post-media-by-id', mediaData).then((res) => {
      if (res.data.status == 200) {
        singlePostDetails(params.id);
      }
    });
  }


  const deleteFilesFormLocal = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  }

  return (
    <Masterdashboardlayout headerName="Newsfeed">
      <div className=" container-fluid ">
        <div className="mobile-posts-input-div container-fluid">
          <div className="mobile-tabs">
            <span
              className={`tab ${activediv === 'Status' ? 'active-mobile' : ''}`}
              onClick={() => handleTabClick('Status')}
            >
              Status
            </span>
            <span
              className={`tab ${activediv === 'Story' ? 'active-mobile' : ''}`}
              onClick={() => handleTabClick('Story')}
            >
              Story
            </span>
            <span
              className={`tab ${activediv === 'Reels' ? 'active-mobile' : ''}`}
              onClick={() => handleTabClick('Reels')}
            >
              Reels
            </span>
          </div>

          <div className="content ">
            {activediv === 'Status' && (
              <div className="status-content row">
                <div className=" col-10 ">
                  <div className=" post-input-div ">
                    <img className="post-author-img" src={dpProfile.src} alt="" />

                    <input type="text" className="post-author-input" placeholder="Share what you are thinking" />
                  </div>
                </div>


                <div className=" col-2 filesUp-div">
                  <Image src={fileupSVG.src} width={140} height={250} alt="" />

                </div>
              </div>
            )}
            {activediv === 'Story' && (
              <div className="status-content row">
                <div className=" col-9 ">
                  <div className=" post-input-div ">
                    <img className="post-author-img" src={dpProfile.src} alt="" />

                    <input type="text" className="post-author-input" placeholder="Share what you are thinking" />
                  </div>
                </div>


                <div className=" col-2 filesUp-div">
                  <Image src={fileupSVG.src} width={100} height={50} alt="" />

                </div>
              </div>
            )}
            {activediv === 'Reels' && (
              <div className="status-content row">
                <div className=" col-10 ">
                  <div className=" post-input-div ">
                    <img className="post-author-img" src={dpProfile.src} alt="" />

                    <input type="text" className="post-author-input" placeholder="Share what you are thinking" />
                  </div>
                </div>


                <div className=" col-2 filesUp-div">
                  <Image src={fileupSVG.src} width={140} height={250} alt="" />

                </div>
              </div>
            )}


          </div>
        </div>
        <div className="row">
          {/* Main Content */}
          <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">

            <div className="mob-slider-reels-div">
              <MobileSlider />

              <div className="stories-reels-div">
                <MobileStorieReels />
              </div>
            </div>

            <div className="ui-block web-post-status">
              {/* News Feed Form */}
              <div className="news-feed-form">
                {/* Nav tabs */}
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active inline-items"
                      data-toggle="tab"
                      href="#home-1"
                      role="tab"
                      aria-expanded="true"
                    >
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-newspaper"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
                        <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
                      </svg> */}
                      <Image
                        src={statusSvg.src}
                        width="16"
                        height="16"
                        className="mr-1"
                      />
                      <span>Status</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link inline-items"
                      data-toggle="tab"
                      href="#profile-1"
                      role="tab"
                      aria-expanded="false"
                    >
                      <Image
                        src={storySvg.src}
                        width="16"
                        height="16"
                        className="mr-1"
                      />
                      <span>Story</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link inline-items"
                      data-toggle="tab"
                      href="#blog"
                      role="tab"
                      aria-expanded="false"
                    >
                      <Image
                        src={reelsSvg.src}
                        width="16"
                        height="16"
                        className="mr-1"
                      />
                      <span>Reels</span>
                    </a>
                  </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="home-1"
                    role="tabpanel"
                    aria-expanded="true"
                  >
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mt-4 m-1">
                        {/* <div className=""> */}
                        {/* <div className="author-thumbs" >
                          <img src={feedauthone.src} alt="author" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'contain' }} />


                        </div> */}

                        {
                          profileImage !== null ?
                            <div className="author-thumbs" >

                              <img
                                src={`${host}/uploads/${profileImage}`} alt="" className="avatar "
                              />
                            </div>
                            :
                            <div className="author-thumbs" >

                              <img src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png' className="avatar " />
                            </div>

                        }

                        <div className="mx-2">
                          {/* activityData.activity_name  */}
                          <h6>{`${fullName} `}
                            {` ${activityData.activity_name != "" ? "is" : ''} `}
                            {activityData.logo != "" ? <img src={`${host}/assets/logo/${activityData.logo}`} className="post-feeling-icon" /> : ''}
                            {` ${activityData.activity_type != "" ? activityData.activity_type : ''} `}
                            {` ${activityData.activity_name != "" ? activityData.activity_name : ''} `}
                            {`${locationChildData !== null ? `is at ${locationChildData.location_name}` : ''}`}
                          </h6>
                          <FormControl size="small" fullWidth
                          >
                            {/* <InputLabel id="privacy-label">Privacy</InputLabel> */}
                            <Select
                              labelId="privacy-label"
                              id="privacy-select"
                              value={selectedOption}
                              // label="Privacy"
                              onChange={handleChange}
                              sx={{
                                fontSize: '12px',
                                backgroundColor: 'white',
                                '& .MuiSelect-select': {
                                  border: 'none',
                                },
                                '& .MuiFilledInput-root': {
                                  borderBottom: 'none',
                                },
                                "& fieldset": { border: 'none' },
                              }}

                            >
                              {options.map((option) => (
                                <MenuItem key={option.value} value={option.value} sx={{ fontSize: '12px', '& .MuiSelect-select': { border: 'none', backgroundColor: "white", outline: "0" } }}>
                                  <span class=""> {option.icon}</span>
                                  <span class="mx-1"> {option.label}</span>
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          {/* {
                            locationChildData !== null && locationChildData.location_name
                          } */}
                        </div>
                      </div>

                      <div className="form-group with-icon label-floating is-empty border rounded m-1">
                        <div className="">
                          <textarea
                            className="form-control "
                            placeholder=" Share what you are thinking here..."
                            // defaultValue={""}
                            style={{ border: "none", minHeight: "135px" }}
                            value={content}
                            onChange={handleContentChange}
                          />
                        </div>

                        {/* Display uploaded files in a single grid */}
                        <div className="grid-container">
                          {/*Start db image */}
                          {dbFiles.length > 0 &&
                            dbFiles.map((dbfile, index) => (
                              <div key={`file-${index}`} className="grid-item">
                                {(isImage(dbfile.media)) ? (
                                  <>
                                    <div style={{ position: 'relative' }}>
                                      <Image
                                        src={`${host}/uploads/posts/${dbfile.media}`}
                                        width="400"
                                        height="400"
                                        className="img1"
                                        loading="lazy"
                                        onClick={(e) => console.log('clicked image', dbfile.media)}
                                      />
                                      <span className="cursor-pointer fw-bold" onClick={(e) => {
                                        deleteImage(dbfile._id, dbfile.media)
                                      }} style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'black', padding: '5px', margin: '0', color: 'white' }}>X</span>
                                    </div>
                                  </>



                                ) :
                                  <div style={{ position: 'relative' }}><video
                                    controls
                                    // poster={`${host}/uploads/posts/${imageItem.image}`}
                                    src={`${host}/uploads/posts/${dbfile.media}`}

                                    key={dbfile._id}
                                    // onClick={() => handleVideoClick(imageItem)}
                                    className="one-more-videos "
                                    lazy
                                    controlsList="nodownload"
                                    onClick={(e) => console.log('clicked video', dbfile.media)}


                                  >
                                    <source
                                      src={`${host}/uploads/posts/${dbfile.media}`}
                                      type="video/mp4"
                                      onClick={(e) => console.log('clicked video', dbfile.media)}

                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                    <span className="cursor-pointer fw-bold" onClick={(e) => {
                                      deleteImage(dbfile._id)
                                    }} style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'black', padding: '5px', margin: '0', color: 'white' }}>X</span>
                                  </div>
                                }
                              </div>
                            ))}

                          {/*end db image */}
                          {files.length > 0 &&
                            files.map((file, index) => (
                              <div key={`file-${index}`} className="grid-item">
                                <div style={{ position: 'relative' }}>
                                  {file.type.startsWith("image/") ? (
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={`Uploaded Image ${index}`}
                                    />
                                  ) : file.type.startsWith("video/") ? (
                                    <video controls>
                                      <source
                                        src={URL.createObjectURL(file)}
                                        type={file.type}
                                      />
                                      Your browser does not support the video tag.
                                    </video>
                                  ) : null}
                                  <span onClick={(e) => {
                                    deleteFilesFormLocal(index)
                                  }} className="cursor-pointer fw-bold" style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'black', padding: '5px', margin: '0', color: 'white' }}>X</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="post-field-icons">
                        <div className="row">
                          <div className="col-lg-9 col-md-9 col-sm-9 col-6 ">
                            <span className="p-text-add text-black">
                              Add to your post
                            </span>
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
                                onClick={handlePostImageUpload}
                              />

                            </div>

                            <div>
                              <Image
                                src={locationSvg.src}
                                width="20"
                                height="20"
                                onClick={openModal}
                              />
                            </div>
                            <div>
                              <Image
                                src={addfriendSvg.src}
                                width="20"
                                height="20"
                              />
                            </div>
                            <div>
                              <Image
                                src={gallerySvg.src}
                                width="20"
                                height="20"
                              />
                            </div>
                            <div className="">
                              <span onClick={setFeelingModal}>
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
                          Update Post
                        </button>
                      </div>
                    </form>
                  </div>

                  <div
                    className="tab-pane bg-dark"
                    id="profile-1"
                    role="tabpanel"
                    aria-expanded="true"
                  >
                    <form>
                      <div className="author-thumb">
                        <img src={feedauthone.src} alt="author" />
                      </div>
                      <div className="form-group with-icon label-floating is-empty">
                        <label className="control-label">
                          Share what you are thinking here...
                        </label>
                        <textarea
                          className="form-control"
                          placeholder
                          defaultValue={""}
                        />
                      </div>

                    </form>
                  </div>

                  <div
                    className="tab-pane"
                    id="blog"
                    role="tabpanel"
                    aria-expanded="true"
                  >
                    <form>
                      <div className="author-thumb">
                        <img src={feedauthone.src} alt="author" />
                      </div>
                      <div className="form-group with-icon label-floating is-empty">
                        <label className="control-label">
                          Share what you are thinking here...
                        </label>
                        <textarea
                          className="form-control"
                          placeholder
                          defaultValue={""}
                        />
                      </div>
                      <div className="add-options-message">
                        <a
                          href="#"
                          className="options-message"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-original-title="ADD PHOTOS"
                        >
                          <svg
                            className="olymp-camera-icon"
                            data-toggle="modal"
                            data-target="#update-header-photo"
                          >
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-camera-icon" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="options-message"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-original-title="TAG YOUR FRIENDS"
                        >
                          <svg className="olymp-computer-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-computer-icon" />
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="options-message"
                          data-toggle="tooltip"
                          data-placement="top"
                          data-original-title="ADD LOCATION"
                        >
                          <svg className="olymp-small-pin-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-small-pin-icon" />
                          </svg>
                        </a>
                        <button className="btn btn-primary btn-md-2">
                          Post Status
                        </button>
                        <button className="btn btn-md-2 btn-border-think btn-transparent c-grey">
                          Preview
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>


          </main>


          <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
            <Leftsidebar />
          </aside>
          <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
            <div className="ui-block-news ">
              {/* W-Weather */}
              <TopNewsCaro />
            </div>

            <div className="ui-block">
              <div className="ui-block-title">
                <h6 className="title">Pages You May Like</h6>
              </div>
              {/* W-Friend-Pages-Added */}
              <ul className="">
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="people-added-img-text">
                      <div className="author-thumb">
                        <img src={feedauththree.src} alt="author" />
                      </div>
                      <div className="texts">
                        <h6>Zara</h6>
                        <p>Fashion Brand</p>
                      </div>
                    </div>

                    <div className="follow-btn-div">
                      <button className="follow-btn">Follow</button>
                    </div>
                  </div>
                </li>
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="people-added-img-text">
                      <div className="author-thumb">
                        <img src={feedauththree.src} alt="author" />
                      </div>
                      <div className="texts">
                        <h6>Zara</h6>
                        <p>Fashion Brand</p>
                      </div>
                    </div>

                    <div className="follow-btn-div">
                      <button className="follow-btn">Follow</button>
                    </div>
                  </div>
                </li>
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="people-added-img-text">
                      <div className="author-thumb">
                        <img src={feedauththree.src} alt="author" />
                      </div>
                      <div className="texts">
                        <h6>Zara</h6>
                        <p>Fashion Brand</p>
                      </div>
                    </div>

                    <div className="follow-btn-div">
                      <button className="follow-btn">Follow</button>
                    </div>
                  </div>
                </li>
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="people-added-img-text">
                      <div className="author-thumb">
                        <img src={feedauththree.src} alt="author" />
                      </div>
                      <div className="texts">
                        <h6>Zara</h6>
                        <p>Fashion Brand</p>
                      </div>
                    </div>

                    <div className="follow-btn-div">
                      <button className="follow-btn">Follow</button>
                    </div>
                  </div>
                </li>
              </ul>
              {/* .. end W-Friend-Pages-Added */}
            </div>
          </aside>
          {/* ... end Left Sidebar */}
          {/* Right Sidebar */}

          <aside className="col col-xl-2 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12 first-left-menu">
            <div className="ui-block">
              {/* ... end W-Birthsday-Alert */}
              <div className="trending-div">
                <h6 className="trending-tag">Trending Topic</h6>
                <ul className="tag-cloud">
                  <li className="tag-small">#organization</li>
                  <li className="tag-medium">#indigo</li>
                  <li className="tag-large">#verma_traders</li>
                  <li className="tag-medium">#alignments</li>
                  <li className="tag-small">#cloud</li>
                  <li className="tag-small">#technology</li>
                  <br />
                  <li className="tag-small">#company</li>
                  <li className="tag-small">#doller</li>
                  <br /> <li className="tag-small">#information</li>
                  <li className="tag-small">#media</li>
                  <li className="tag-small">#content</li>
                  <li className="tag-small">#mouthguard</li>
                  <li className="tag-small">#donation</li>
                  <li className="tag-small">#zoom</li>
                  <li className="tag-small">#flavour</li>
                  <li className="tag-small">#cream</li>
                </ul>
              </div>
            </div>

            <div className="ui-block">
              <FeatureUser />
            </div>

            <div className="ui-block">
              <div className="ui-block-title">
                <h6 className="title">Top Post</h6>
                {/* <a href="#" className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                </a> */}
              </div>
              {/* W-Activity-Feed */}
              <ul className="">
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="author-thumb">
                      <img src={feedauththree.src} alt="author" />
                    </div>
                    <div className="top-text-div">
                      <h5 className="top-text">
                        <strong>Marina Polson</strong> Captured a stunning
                        sunset over the horizon Photo
                      </h5>
                      <p>2 min ago</p>
                    </div>
                  </div>
                </li>
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="author-thumb">
                      <img src={feedauththree.src} alt="author" />
                    </div>
                    <div className="top-text-div">
                      <h5 className="top-text">
                        <strong>Marina Polson</strong> Captured a stunning
                        sunset over the horizon Photo
                      </h5>
                      <p>2 min ago</p>
                    </div>
                  </div>
                </li>
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="author-thumb">
                      <img src={feedauththree.src} alt="author" />
                    </div>
                    <div className="top-text-div">
                      <h5 className="top-text">
                        <strong>Marina Polson</strong> Captured a stunning
                        sunset over the horizon Photo
                      </h5>
                      <p>2 min ago</p>
                    </div>
                  </div>
                </li>
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="author-thumb">
                      <img src={feedauththree.src} alt="author" />
                    </div>
                    <div className="top-text-div">
                      <h5 className="top-text">
                        <strong>Marina Polson</strong> Captured a stunning
                        sunset over the horizon Photo
                      </h5>
                      <p>2 min ago</p>
                    </div>
                  </div>
                </li>
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="author-thumb">
                      <img src={feedauththree.src} alt="author" />
                    </div>
                    <div className="top-text-div">
                      <h5 className="top-text">
                        <strong>Marina Polson</strong> Captured a stunning
                        sunset over the horizon Photo
                      </h5>
                      <p>2 min ago</p>
                    </div>
                  </div>
                </li>
                <li className="inline-items">
                  <div className="people-added-div">
                    <div className="author-thumb">
                      <img src={feedauththree.src} alt="author" />
                    </div>
                    <div className="top-text-div">
                      <h5 className="top-text">
                        <strong>Marina Polson</strong> Captured a stunning
                        sunset over the horizon Photo
                      </h5>
                      <p>2 min ago</p>
                    </div>
                  </div>
                </li>
              </ul>
              {/* .. end W-Activity-Feed */}
            </div>
            <div className="ui-block">
              {/* W-Action */}
              <div className="widget w-action">
                {/* <img src="/QP_logo.png" alt="Olympus" /> */}
                <div className="content">
                  <h4 className="title">Quntum Possibilities</h4>
                  <span>WORLD BIGGEST DECENTRALIZED SOCIAL NETWORK</span>
                  <Link href="/register" className="newsfeed-register-btn">
                    <p className="register-btn"> Register Now!</p>
                  </Link>
                </div>
              </div>
              {/* ... end W-Action */}
            </div>
          </aside>
        </div>
      </div>


      {/* Hidden file input */}
      <form encType="multipart/form-data">
        <input
          id="fileInput"
          type="file"
          name="post_pic"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </form >
      <LocationModal isOpen={openLocationModal} onRequestClose={closeModal} sendDataToParent={handlelocationChildData} />
      <FeelingAndActivity
        isFeelingOpen={openFeelingModal}
        onRequestClose={closeFeelingModal}
        sendDataToParent={handleFeelingChildData}
      />
    </Masterdashboardlayout >
  );
};

export default Newsfeed;
