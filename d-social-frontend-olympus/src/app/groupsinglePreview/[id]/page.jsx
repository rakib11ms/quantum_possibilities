"use client";
import React, { useState, useEffect, useRef } from "react";
// import "@/app/newsfeed/_ui/NewsfeedStory.modules.css";
import "../../newsfeed/_ui/NewsfeedStory.modules.css";
import Event from "@/component/AllGroups/Events";
import { host } from "@/environment";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import GroupPeople from "@/component/AllGroups/GroupPeople";
import GroupSinglePageMedia from "./_ui/GroupSinglePageMedia";
import axiosInstance from "../../../../utils/axios";
import { Card, Grid, Modal } from "@mui/material";
import LocationModal from "@/component/NewsFeed/LocationModal";
import FeelingAndActivity from "@/component/NewsFeed/FeelingAndActivity";
import InviteForGroup from "@/component/Pages/InviteForGroup";
import GroupPagePostList from "@/component/Pages/GroupPagePostList";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Loader from "@/component/Loader/Loading";
import PrivateGroupPageBlockView from "./_ui/PrivateGroupPageBlockView";
import PrivateGroupPageBlockRightView from "./_ui/PrivateGroupPageBlockRightView";
import { handleJoinRequest } from "@/app/grouppage/discoverGroup";
import { camelizeName } from "@/utils/utlity";
import "./pagePreview.css";
import CreateGroup from "../../grouppage/createGroup";
import DiscoverGroup from "../../grouppage/discoverGroup";
import GroupFeed from "../../grouppage/groupFeed";
import MyGroup from "../../grouppage/myGroup";
import ProfileTextField from "./_ui/ProfileTextField";
import useToaster from "@/hooks/useToaster";
import { addPostData, insertPostData } from "@/redux/features/GroupPost/groupPostSlice";
import { useDispatch } from "react-redux";
import ShareModal from "@/component/Group/ShareModal";
import FeatureUser from "@/component/NewsFeed/FeatureUser";
import Leftsidebar from "@/component/leftsidebar/page";
import Abouts from "@/component/AllGroups/About";
import UploadNavigation from "./_ui/UploadNavigation";
import NewGroupPostList from "@/component/Group/GroupPost/NewPostList";
import GroupSetting from "@/component/AllGroups/GroupSetting";

const pagePreview = () => {
  const [showColors, setShowColors] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [isCoverHovered, setIsCoverHovered] = useState(false);
  const colorsRef = useRef(null);
  const [activeDiv, setActiveDiv] = useState(1);
  const [activeDivs, setActiveDivs] = useState(1);

  const [shareModal, setShareModal] = useState(false);

  const [groupDetails, setGroupDetails] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [groupMedia, setGroupMedia] = useState([]);
  const [groupMembers, setGroupMembers] = useState(null);

  const [groupInvitationModal, setGroupInvitationModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [openFeelingModal, setOpenFeelingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useToaster()


  const [content, setContent] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const closeShareModal = () => {
    setShareModal(false);
  };
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
  const handleFeelingChildData = (data) => {
    setActivityData((prev) => ({ ...prev, ...data }));
  };

  const closeSettingModal = () => {
    setSelectedGroupId(null);
    setGroupInvitationModal(false);
  };

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };

  const handleTextClicks = (divId) => {
    setActiveDivs(divId);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfoJSON = localStorage.getItem("userInfo");
      setUserName(localStorage.getItem('username'))

      if (userInfoJSON) {
        const userInfo = JSON.parse(userInfoJSON);

        // Now you can access properties from userInfo
        const profile_image = userInfo[0].profile_pic;
        console.log("profile_pic__", profile_image);
        setprofileImage(profile_image);
      }
    }
    fetchGroupDetails()
      .then(res => {
        setIsMember(res?.data?.isMember);
        setIsOwner(res?.data?.groupOwner_id == localStorage.getItem("userId") ? true : false);
        setGroupMedia(res?.data?.groupMedia);
        setGroupMembers(res?.data?.groupMembers);
      })
      .catch(err => console.log(err))

    dispatch(
      insertPostData({
        ["groupId"]: params?.id,
      })
    );
  }, []);

  const fetchGroupDetails = () => new Promise((resolve, reject) => {
    axiosInstance
      .post("/api/get-group-details-by-id", { group_id: params?.id, })
      .then((res) => {
        setGroupDetails(res?.data?.groupDetails?.group_id);
        resolve(res)
      })
      .catch((err) => reject(err));
  })

  const fetchMember = () => {
    axiosInstance
      .get(`/api/get-group-resource/${params?.id}?type=member`)
      .then((res) => setGroupMembers(res?.data?.groupMembers))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (activeDivs == 4 || activeDivs === 2) {
      fetchMember();
    }
    else if (activeDivs == 3) {
      axiosInstance
        .get(`/api/get-group-resource/${params?.id}?type=media`)
        .then((res) => setGroupMedia(res?.data?.groupMedia))
        .catch((err) => console.log(err));
    }
  }, [activeDivs]);


  // /mbSliderthree.png"

  const handleCoverImageClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent double triggering
    const fileInput = document.getElementById("fileCoverInput");
    if (fileInput) {
      fileInput.click();
    }
  };


  //Post




  // const input = React.useRef(null);
  // const [height, setHeight] = useState(10);

  // const handleInputChange = () => {
  //   const scrollHeight = input.current.scrollHeight;
  //   setHeight(scrollHeight);
  // };

  //upload post functionality codes end
  const [textColor, setTextColor] = useState(null);
  function handleBackgroundColors(tempColor) {
    setTextColor(tempColor);
  }

  const [fullName, setFullName] = React.useState("");
  //   const [profileImage, setprofileImage] = useState("");

  const [activityData, setActivityData] = useState({
    activity_name: "",
    activity_type: "",
    logo: "",
    activity_id: "",
    sub_activity_id: "",
    feeling_id: "",
  });
  console.log({ activityData });
  const handlePostImageUpload = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent double triggering
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const [locationChildData, setlocationChildData] = useState(null);

  // Callback function to receive data from the child component
  const handlelocationChildData = (data) => {
    setlocationChildData(data);
  };

  const [selectedOption, setSelectedOption] = useState("friends");
  // console.log("sona", selectedOption)

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    const newFilesArray = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      newFilesArray.push(file);
    }

    setFiles([...files, ...newFilesArray]);
  };
  const [isOpenModal, setIsOpenModal] = useState({
    post: false,
    tag: false,
    event: false,
    gif: false,
    location: false,
    photoUpload: false,
  });
  return (
    <Masterdashboardlayout>
      <Grid
        sx={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 2fr 0.5fr',

        }}
      // className="row no-gutters"
      >
        {/* old sidebar concept  */}
       
        {
          //   <div
          // // className="d-none d-md-block col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 "
          // >
          //   {isOwner ? (
          //     <div className="group-left-side-div ">
          //       <div className="demo-text-tag-div">
          //         <h4 className="demo-text"> {groupDetails?.group_name}</h4>
          //         <p className="demo-textp">
          //           {groupDetails?.group_privacy} group | {groupMembers?.count} Members
          //         </p>
          //         <div className="left-btn-btn">
          //           {/* <button className="left-invite-btn">Invite</button> */}
          //           {/* <button className="left-dots-btn">
          //           <svg
          //             xmlns="http://www.w3.org/2000/svg"
          //             width="16"
          //             height="16"
          //             fill="currentColor"
          //             class="bi bi-three-dots"
          //             viewBox="0 0 16 16"
          //           >
          //             <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          //           </svg>
          //         </button> */}
          //         </div>
          //       </div>

          //       <div className="demo-actives-div">
          //         <div
          //           onClick={() => handleTextClick(1)}
          //           className={`dashboard-side-bar-li ${activeDiv === 1 ? "active-das" : ""}`}
          //         >
          //           <div className="dashboard-side-text-div">
          //             <h6>Community Home</h6>
          //           </div>
          //         </div>
          //         <div
          //           onClick={() => handleTextClick(2)}
          //           className={`dashboard-side-bar-li ${activeDiv === 2 ? "active-das" : ""}`}
          //         >
          //           <div className="dashboard-side-text-div">
          //             <h6>Group overview</h6>
          //           </div>
          //         </div>
          //       </div>

          //       <div className="demo-Management-tools-div">
          //         <h6>Management tools</h6>
          //         <ul className="management-tools-ul">
          //           <li className="side-nav">
          //             <Image src={"/groupRules.svg"} height={20} width={20} alt="" />
          //             <span> Group rules</span>
          //           </li>
          //           <li className="side-nav">
          //             <Image src={"/pending.svg"} height={20} width={20} alt="" />
          //             <span> Pending approvals</span>
          //           </li>
          //           {/* <li className="side-nav">
          //               <Image src={"/schaduale.svg"} height={20} width={20} alt="" />
          //               <span> Scheduled post</span>
          //             </li> */}
          //           <li className="side-nav">
          //             <Image src={"/activity.svg"} height={20} width={20} alt="" />
          //             <span> Activity log</span>
          //           </li>
          //           {/* <li className="side-nav">
          //               <Image src={"/community.svg"} height={20} width={20} alt="" />
          //               <span> Community roles</span>
          //             </li>
          //             <li className="side-nav">
          //               <Image
          //                 src={"/moderation.svg"}
          //                 height={20}
          //                 width={20}
          //                 alt=""
          //               />
          //               <span> Moderation alerts</span>
          //             </li>
          //             <li className="side-nav">
          //               <Image
          //                 src={"/groupstatus.svg"}
          //                 height={20}
          //                 width={20}
          //                 alt=""
          //               />
          //               <span> Group status:{groupDetails?.status}</span>
          //             </li> */}
          //         </ul>
          //       </div>

          //       <div className="group-side-comp-div">
          //         <h6>Settings</h6>
          //         <ul className="management-tools-ul">
          //           <li className="side-nav">
          //             <Image src={"/gSettings.svg"} height={20} width={20} alt="" />
          //             <span>Group settings</span>
          //           </li>
          //         </ul>
          //       </div>

          //       {/* <div className="group-side-comp-div">
          //           <h6>Insights</h6>
          //           <ul className="management-tools-ul">
          //             <li className="side-nav">
          //               <Image src={"/Growth.svg"} height={20} width={20} alt="" />
          //               <span>Growth</span>
          //             </li>
          //             <li className="side-nav">
          //               <Image
          //                 src={"/engagements.svg"}
          //                 height={20}
          //                 width={20}
          //                 alt=""
          //               />
          //               <span>Engagements</span>
          //             </li>
          //             <li className="side-nav">
          //               <Image src={"/admin.svg"} height={20} width={20} alt="" />
          //               <span>Admin & Moderators</span>
          //             </li>
          //             <li className="side-nav">
          //               <Image
          //                 src={"/participant.svg"}
          //                 height={20}
          //                 width={20}
          //                 alt=""
          //               />
          //               <span>Participant</span>
          //             </li>
          //           </ul>
          //         </div> */}

          //       <div className="support-side-comp-div">
          //         <h6>Support</h6>
          //         <ul className="management-tools-ul">
          //           <li className="side-nav">
          //             <Image src={"/helpCenter.svg"} height={20} width={20} alt="" />
          //             <span>Help center</span>
          //           </li>
          //           <li className="side-nav">
          //             <Image src={"/commsupport.svg"} height={20} width={20} alt="" />
          //             <span>Community support</span>
          //           </li>
          //         </ul>
          //       </div>
          //     </div>
          //   ) : (
          //     <div className="px-1">
          //       <div className="prof-side-bar">
          //         <h3 className="text-page">Groups </h3>
          //         <div className="container-fluid">
          //           <ul>
          //             <li
          //               onClick={() => handleTextClick(3)}
          //               style={{ cursor: "pointer" }}
          //               className={`prof-side-bar-li ${activeDiv === 3 ? "active" : ""}`}
          //             >
          //               <Image src={"/groupSide_1.png"} width={17} height={10} alt="page-nav" />
          //               <div className="prof-side-text-div">
          //                 <svg
          //                   xmlns="http://www.w3.org/2000/svg"
          //                   width="16"
          //                   height="16"
          //                   fill="white"
          //                   className="bi bi-plus-lg"
          //                   viewBox="0 0 16 16"
          //                 >
          //                   <path
          //                     fillRule="evenodd"
          //                     d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          //                   />
          //                 </svg>
          //                 <p className="py-3">Create group</p>
          //               </div>
          //             </li>
          //           </ul>
          //         </div>
          //       </div>

          //       <div className="prof-side-bar-sec">
          //         <div className="container-fluid">
          //           <ul style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          //             <li
          //               onClick={() => handleTextClick(4)}
          //               className={`py-2 prof-side-bar-li-sec ${activeDiv === 4 ? "active" : ""}`}
          //             >
          //               <Image src={"/groupSide_3.png"} width={17} height={10} alt="page-nav" />
          //               <div className="prof-side-text-div">
          //                 <p>Group feed</p>
          //               </div>
          //             </li>
          //             <li
          //               onClick={() => handleTextClick(5)}
          //               className={`py-2 prof-side-bar-li-sec ${activeDiv === 5 ? "active" : ""}`}
          //             >
          //               <Image src={"/pageSide_3.png"} width={17} height={10} alt="page-nav" />
          //               <div className="prof-side-text-div">
          //                 <p>Discover</p>
          //               </div>
          //             </li>
          //             <li
          //               onClick={() => handleTextClick(6)}
          //               className={`py-2 prof-side-bar-li-sec ${activeDiv === 6 ? "active" : ""}`}
          //             >
          //               <Image src={"/groupSide_2.png"} width={17} height={10} alt="page-nav" />
          //               <div className="prof-side-text-div">
          //                 <p>My groups</p>
          //               </div>
          //             </li>
          //           </ul>
          //         </div>
          //       </div>
          //     </div>
          //   )}
          // </div>
        }
        

        <aside
          // className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-right-menu"
          // style={{ border: '1px solid red' }}
          className="d-none d-md-block"
        >
          <Leftsidebar />
        </aside>
        <div //style={{border:'1px solid red'}}
        // className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10"
        >
          {activeDiv === 1 && (

            <div style={{ position: 'relative', marginLeft: '10px' }}>

              <Grid sx={{
                cursor: "pointer",
                position: 'absolute',
                width: '100%',
                borderRadius: '7px',
                overflow: 'hidden'
              }}
                className="top-header-thumb"
                onMouseEnter={() => setIsCoverHovered(true)}
                onMouseLeave={() => setIsCoverHovered(false)}
                onClick={handleCoverImageClick}
              >
                <img
                  className="cover-pic"
                  style={{
                    objectFit: 'cover'
                  }}
                  // src={
                  //     coverImage == "" || coverImage == null
                  //         ? `${host}/uploads/cover_pic.png`
                  //         : `${host}/uploads/${coverImage}`
                  // }
                  src={`${host}/uploads/group/${groupDetails?.group_cover_pic}`}
                  alt="nature"
                />
                {isCoverHovered && (
                  <div className="cover-camera-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-camera camera-icon-i"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                      <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                  </div>
                )}
              </Grid>

              <Grid sx={{
                pl: 2,
                top: 265,
                position: 'absolute',
                width: '98%',
                margin: '0 auto',
                // zIndex: 1,
                // border:'1px solid'
                // marginTop: '-20px'
              }}>



                <Card sx={{ mb: 1, px: 2, pt: 3 }}>
                  <div className="preview-group-demo-text-div">
                    <div>
                      <h5 className="group-demo-text-h5">{camelizeName(groupDetails?.group_name || " ")}</h5>
                      <h6 className="private_group_page_block_right_view_about">{camelizeName(groupDetails?.group_privacy)} group .
                        <span className="demo-textp">
                          {" "}<b> {groupMembers?.count} Members</b>
                        </span>
                      </h6>
                    </div>
                    {isMember ? (
                      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}>

                          {
                            isOwner ?

                              <button
                                className="group-demo-invite-btn"
                                onClick={() => handleTextClicks(5)}
                              >
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 11.2059C8.9665 11.2059 9.75 10.2183 9.75 9.00001C9.75 7.78174 8.9665 6.79413 8 6.79413C7.0335 6.79413 6.25 7.78174 6.25 9.00001C6.25 10.2183 7.0335 11.2059 8 11.2059Z" stroke="white" stroke-width="2" />
                                  <path d="M9.31073 1.61418C9.03781 1.5 8.6919 1.5 8.00001 1.5C7.30811 1.5 6.96221 1.5 6.68928 1.61418C6.32546 1.76642 6.03638 2.05844 5.88567 2.42597C5.81688 2.59376 5.78995 2.78888 5.77941 3.07349C5.76393 3.49176 5.55159 3.87892 5.19275 4.0882C4.83392 4.29747 4.39584 4.28965 4.02951 4.09407C3.78024 3.96097 3.5995 3.88697 3.42126 3.86327C3.0308 3.81134 2.63592 3.91822 2.32348 4.1604C2.08915 4.34204 1.91618 4.64467 1.57024 5.24995C1.2243 5.85523 1.05133 6.15786 1.01278 6.45368C0.961378 6.8481 1.06718 7.24699 1.30693 7.56262C1.41635 7.7067 1.57014 7.82775 1.80884 7.97925C2.15973 8.202 2.3855 8.58143 2.38548 9C2.38545 9.41857 2.15969 9.79792 1.80883 10.0206C1.57011 10.1722 1.41629 10.2933 1.30686 10.4374C1.06711 10.753 0.961303 11.1518 1.01271 11.5463C1.05126 11.8421 1.22423 12.1448 1.57017 12.75C1.91611 13.3552 2.08908 13.6579 2.32341 13.8395C2.63585 14.0817 3.03073 14.1886 3.42118 14.1367C3.59941 14.113 3.78014 14.039 4.0294 13.9059C4.39575 13.7103 4.83386 13.7025 5.19272 13.9117C5.55158 14.1211 5.76393 14.5082 5.77941 14.9266C5.78996 15.2111 5.81688 15.4063 5.88567 15.574C6.03638 15.9415 6.32546 16.2336 6.68928 16.3858C6.96221 16.5 7.30811 16.5 8.00001 16.5C8.6919 16.5 9.03781 16.5 9.31073 16.3858C9.67453 16.2336 9.96364 15.9415 10.1143 15.574C10.1831 15.4063 10.2101 15.2111 10.2206 14.9265C10.2361 14.5082 10.4484 14.1211 10.8072 13.9117C11.166 13.7024 11.6042 13.7103 11.9706 13.9059C12.2198 14.039 12.4005 14.1129 12.5787 14.1366C12.9692 14.1886 13.3641 14.0817 13.6765 13.8395C13.9108 13.6579 14.0838 13.3553 14.4297 12.7499C14.7757 12.1447 14.9487 11.8421 14.9872 11.5463C15.0386 11.1518 14.9328 10.7529 14.6931 10.4373C14.5836 10.2932 14.4298 10.1721 14.1911 10.0206C13.8403 9.79792 13.6145 9.4185 13.6145 8.99992C13.6145 8.58135 13.8403 8.20208 14.1911 7.9794C14.4299 7.82783 14.5837 7.70677 14.6931 7.56262C14.9329 7.24705 15.0387 6.84815 14.9873 6.45373C14.9488 6.15791 14.7758 5.85527 14.4298 5.25C14.0839 4.64473 13.9109 4.34209 13.6766 4.16045C13.3642 3.91827 12.9692 3.81139 12.5788 3.86332C12.4006 3.88702 12.2199 3.96102 11.9706 4.0941C11.6042 4.28969 11.1661 4.29752 10.8073 4.08822C10.4484 3.87893 10.2361 3.49174 10.2206 3.07345C10.2101 2.78886 10.1831 2.59375 10.1143 2.42597C9.96364 2.05844 9.67453 1.76642 9.31073 1.61418Z" stroke="white" stroke-width="2" />
                                </svg>



                                Group Setting
                              </button>
                              :
                              <div
                                className="group-demo-invite-btn"

                              >
                                <svg width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.04769 9.28981C3.98719 9.22425 3.93134 9.15468 3.88053 9.08158C3.75781 8.91499 3.64144 8.74216 3.53141 8.56933L2.97494 7.70516C2.79316 7.47563 2.68226 7.19952 2.65544 6.90971C2.6496 6.78831 2.68259 6.66816 2.74978 6.56618C2.81696 6.4642 2.91495 6.38553 3.02995 6.34123C3.01091 6.01431 2.99821 5.68321 2.99821 5.35421C2.99821 5.16055 2.99821 4.96273 3.00879 4.77115C3.01741 4.64825 3.04013 4.52671 3.0765 4.40883C3.2313 3.9142 3.56772 3.49403 4.02018 3.23023C4.18262 3.13799 4.35331 3.06062 4.53011 2.99909C4.85384 2.88248 4.69727 2.39521 5.05273 2.38688C5.88216 2.36606 7.24691 3.06572 7.77799 3.63628C8.12586 3.99986 8.32026 4.48 8.32178 4.97939L8.28792 6.40995C8.36039 6.4274 8.42665 6.46395 8.47959 6.51569C8.53253 6.56742 8.57014 6.63237 8.58838 6.70356C8.61969 6.96485 8.5648 7.22912 8.4318 7.45736C8.4318 7.46985 8.42122 7.46986 8.42122 7.48027L7.78646 8.50686C7.64258 8.738 7.49447 8.97538 7.32731 9.19194C7.13053 9.45224 6.96761 9.40018 7.13688 9.65422C7.21648 9.7548 7.30654 9.84693 7.4056 9.92909C6.19108 10.4601 5.23682 11.3659 5.23682 13.5003H0C0 10.2414 2.89242 11.2784 4.10059 9.63965C4.24023 9.43141 4.20426 9.45432 4.04769 9.28981ZM11.4258 8.98371C11.0428 8.65054 10.5625 8.35901 10.499 7.66559H10.4567C10.3617 7.66578 10.2683 7.64137 10.1859 7.59479C10.05 7.51093 9.94529 7.386 9.88753 7.23872C9.75 6.92637 9.63997 6.10801 9.98698 5.87271L9.92139 5.83106V5.73944C9.90869 5.57493 9.90446 5.37503 9.90023 5.16471C9.88753 4.39425 9.87272 3.46137 9.24219 3.27396L8.97347 3.19275L9.15121 2.98451C9.61612 2.40359 10.1448 1.87495 10.7275 1.40819C11.245 0.968491 11.8675 0.6654 12.5366 0.52736C12.8509 0.477727 13.1723 0.495775 13.4788 0.580258C13.7853 0.664741 14.0695 0.813648 14.3118 1.01671C14.4871 1.15648 14.6467 1.31424 14.7879 1.48731C15.0701 1.51768 15.3425 1.60625 15.5875 1.74727C15.8325 1.88828 16.0446 2.07855 16.2098 2.30567C16.4202 2.58123 16.5772 2.89251 16.6732 3.22398C16.7727 3.56192 16.8148 3.9137 16.798 4.26515C16.7794 4.9007 16.5153 5.50537 16.0596 5.956C16.1398 5.95902 16.2184 5.9789 16.2902 6.01431C16.5526 6.15174 16.561 6.45368 16.5018 6.70564C16.4341 6.91387 16.3473 7.15959 16.2648 7.36366C16.1654 7.64061 16.0215 7.69267 15.7401 7.66351C15.7274 8.34027 15.2238 8.61722 14.7943 9.01078C15.8522 10.939 19.9613 9.66672 19.9613 13.5003H6.23763C6.23763 9.66672 10.2578 11.0015 11.4215 8.98579L11.4258 8.98371ZM19.0916 9.43766C19.0346 9.37522 18.9809 9.30988 18.9308 9.24192C18.8145 9.08158 18.7002 8.91499 18.5944 8.74632L18.0591 7.91339C17.8822 7.69219 17.7742 7.42532 17.748 7.14501C17.7427 7.02771 17.775 6.91172 17.8403 6.81345C17.9056 6.71517 18.0006 6.63958 18.112 6.59736C18.0929 6.28293 18.0802 5.96225 18.0802 5.64573C18.0802 5.45624 18.0802 5.26675 18.0802 5.08142C18.0875 4.96345 18.1088 4.84673 18.1437 4.73367C18.2926 4.25644 18.617 3.85103 19.0535 3.59672C19.2104 3.50321 19.3763 3.4251 19.5487 3.3635C19.8597 3.25105 19.7095 2.78044 20.0522 2.7742C20.8521 2.75337 22.1681 3.42805 22.6823 3.9757C23.0179 4.32623 23.2055 4.78927 23.207 5.27091L23.1732 6.6515C23.2434 6.66765 23.3077 6.70268 23.3589 6.75268C23.4101 6.80269 23.4461 6.8657 23.4631 6.9347C23.494 7.18655 23.4413 7.44151 23.3128 7.66143C23.3128 7.66143 23.3022 7.66143 23.3022 7.68225L22.6929 8.67344C22.5532 8.89625 22.4115 9.12531 22.2507 9.33562C22.0581 9.5855 21.9015 9.54386 22.0645 9.78124C23.2324 11.3617 26 10.3643 26 13.5065H20.9473C20.9473 11.4804 20.0671 10.5517 18.9308 10.0061C19.0032 9.93656 19.0697 9.86135 19.1297 9.78124C19.263 9.58759 19.2292 9.60216 19.0768 9.44391L19.0916 9.43766Z" fill="white" />
                                </svg>

                                Joined
                              </div>
                          }

                          <button
                            className="group-demo-invite-btn"
                            onClick={() => {
                              setShareModal(true)
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-reply-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                            </svg>
                            Share
                          </button>

                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}>

                          <button
                            className="group-demo-invite-btn"
                            onClick={() => {
                              handleJoinRequest({ group_id: params?.id })
                                .then((res) => showNotification(res?.message))
                                .catch((err) => showNotification(err?.message, "error"));
                            }}
                          >
                            Join
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>


                <Grid sx={{
                  px: 2,
                  mb: 1
                  // border: "1px solid red"
                }} className="group-right-nav-full-div" >
                  {(isMember || groupDetails?.group_privacy === "public") && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <div className="group-right-nav-div" >
                        <div
                          onClick={() => handleTextClicks(1)}
                          className={`dashboard-side-bar-lis ${activeDivs === 1 ? "active-dass" : ""}`}
                        >
                          Discussion
                        </div>
                        <div
                          onClick={() => handleTextClicks(2)}
                          className={`dashboard-side-bar-lis ${activeDivs === 2 ? "active-dass" : ""
                            }`}
                        >
                          Events
                        </div>
                        <div
                          onClick={() => handleTextClicks(3)}
                          className={`dashboard-side-bar-lis ${activeDivs === 3 ? "active-dass" : ""}`}
                        >
                          Media
                        </div>
                        {/* <div
                          onClick={() => handleTextClicks(5)}
                          className={`dashboard-side-bar-lis ${activeDivs === 5 ? "active-dass" : ""}`}
                        >
                          Files
                        </div> */}
                        <div
                          onClick={() => handleTextClicks(4)}
                          className={`dashboard-side-bar-lis ${activeDivs === 4 ? "active-dass" : ""}`}
                        >
                          Members
                        </div>
                      </div>

                      <div className="preview-group-demo-text-div" style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        gap: 7,
                        pt: 5
                        // border:'1px solid red'
                      }}>
                        <button
                          className="group-demo-invite-btn"
                          onClick={() => {
                            console.log("clicked");
                            setGroupInvitationModal(true);
                            setSelectedGroupId(params?.id);
                          }}
                        >
                          + Invite{" "}
                        </button>
                        <div
                          className="group-demo-search-btn"

                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 10.875C10.0355 10.875 10.875 10.0355 10.875 9C10.875 7.96447 10.0355 7.125 9 7.125C7.96447 7.125 7.125 7.96447 7.125 9C7.125 10.0355 7.96447 10.875 9 10.875Z" fill="#050505" />
                            <path d="M14.625 10.875C15.6605 10.875 16.5 10.0355 16.5 9C16.5 7.96447 15.6605 7.125 14.625 7.125C13.5895 7.125 12.75 7.96447 12.75 9C12.75 10.0355 13.5895 10.875 14.625 10.875Z" fill="#050505" />
                            <path d="M3.375 10.875C4.41053 10.875 5.25 10.0355 5.25 9C5.25 7.96447 4.41053 7.125 3.375 7.125C2.33947 7.125 1.5 7.96447 1.5 9C1.5 10.0355 2.33947 10.875 3.375 10.875Z" fill="#050505" />
                          </svg>


                        </div>
                        <div className="group-demo-search-btn">

                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <g clip-path="url(#clip0_475_4134)">
                                <path d="M10.7429 2.25703C11.8682 3.38221 12.5005 4.90834 12.5006 6.49968C12.5006 8.09102 11.8686 9.61722 10.7434 10.7425C9.61822 11.8678 8.09209 12.5001 6.50075 12.5002C4.90941 12.5003 3.38321 11.8682 2.2579 10.743C1.13259 9.61785 0.500338 8.09173 0.500244 6.50039C0.50015 4.90905 1.13222 3.38285 2.2574 2.25753C3.38258 1.13222 4.90871 0.499972 6.50005 0.499878C8.09139 0.499784 9.61759 1.13185 10.7429 2.25703ZM9.6829 3.31703C8.83898 2.47298 7.69433 1.99875 6.50075 1.99865C5.30718 1.99856 4.16245 2.47261 3.3184 3.31653C2.47435 4.16045 2.00011 5.3051 2.00002 6.49868C1.99992 7.69225 2.47398 8.83698 3.3179 9.68103C4.16513 10.5082 5.30426 10.9682 6.48833 10.9612C7.6724 10.9541 8.80599 10.4807 9.64333 9.64346C10.4807 8.80625 10.9543 7.67274 10.9615 6.48867C10.9687 5.3046 10.509 4.16539 9.6819 3.31803L9.6829 3.31703Z" fill="#050505" />
                                <path d="M10.3898 8.75C10.3119 8.88838 10.2454 9.03286 10.1908 9.182C10.0358 9.599 9.96083 10.031 10.0188 10.466C10.0738 10.881 10.2508 11.26 10.5588 11.569C10.6947 11.7054 10.8779 11.7843 11.0703 11.7894C11.2628 11.7944 11.4498 11.7253 11.5927 11.5963C11.7356 11.4673 11.8234 11.2882 11.838 11.0963C11.8525 10.9043 11.7927 10.7141 11.6708 10.565L11.6198 10.508C11.5549 10.4438 11.5146 10.3589 11.5058 10.268C11.4848 10.113 11.5198 9.912 11.5958 9.705C11.6268 9.624 11.6558 9.56 11.6758 9.523L11.6878 9.501C11.7372 9.4157 11.7693 9.32152 11.7823 9.22382C11.7953 9.12612 11.7889 9.02683 11.7635 8.9316C11.7381 8.83638 11.6942 8.74708 11.6343 8.66882C11.5744 8.59057 11.4996 8.52487 11.4143 8.4755C11.329 8.42612 11.2348 8.39402 11.1372 8.38105C11.0395 8.36807 10.9402 8.37446 10.8449 8.39986C10.7497 8.42525 10.6604 8.46916 10.5822 8.52906C10.5039 8.58897 10.4382 8.6637 10.3888 8.749L10.3898 8.75Z" fill="#050505" />
                                <path d="M9.557 11.659C9.595 11.641 9.647 11.619 9.707 11.595C9.914 11.518 10.115 11.483 10.269 11.503C10.349 11.513 10.412 11.537 10.467 11.58L10.508 11.616C10.6502 11.7485 10.8382 11.8206 11.0325 11.8172C11.2268 11.8137 11.4122 11.735 11.5496 11.5976C11.687 11.4602 11.7657 11.2748 11.7692 11.0805C11.7726 10.8862 11.7005 10.6982 11.568 10.556C11.2711 10.2577 10.8827 10.0675 10.465 10.016C10.03 9.95799 9.598 10.034 9.181 10.191C8.992 10.261 8.845 10.334 8.748 10.391C8.58743 10.4851 8.46759 10.6355 8.41175 10.813C8.35591 10.9906 8.36808 11.1825 8.44588 11.3516C8.52367 11.5207 8.66155 11.6548 8.83271 11.7278C9.00387 11.8009 9.19609 11.8077 9.372 11.747L9.438 11.72L9.558 11.659H9.557Z" fill="#050505" />
                                <path d="M13.463 15.142L13.423 15.098L9.84897 10.906C9.24997 10.203 10.204 9.24997 10.907 9.84897L15.098 13.423L15.142 13.463C15.2 13.522 15.264 13.6 15.324 13.703C15.573 14.128 15.573 14.663 15.17 15.113L15.113 15.17C14.663 15.573 14.127 15.573 13.702 15.324C13.6145 15.2738 13.5349 15.2126 13.463 15.142Z" fill="#050505" />
                              </g>
                              <defs>
                                <clipPath id="clip0_475_4134">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                          </span>
                          {/* <input className="gr-input-search" type="search" placeholder="Search Here" /> */}
                        </div>

                      </div>
                    </div>
                  )}
                </Grid>

                <div>
                  {activeDivs === 1 && (
                    <div>
                      <div className="group-post-inputs-div ">

                        <div className="row mt-2 ">

                          <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
                            <div className="g-cmnt-auth-img-full-div ">
                              {/* Implement the logic. If group is private then this PrivateGroupPageBlockView will show and form will be disabled*/}
                              {!isMember && groupDetails?.group_privacy === "private" ? (
                                <PrivateGroupPageBlockView />
                              ) : (
                                <div className="newsfeed_story__wrapper">
                                  {/* old post filed */}
                                  <div>
                                    {
                                      //              <form onSubmit={handleSubmit}>
                                      //                 <div className="d-flex align-items-center mt-4 m-1">
                                      //                   <div className="author-thumbs">
                                      //                     <img
                                      //                       src={
                                      //                         `${host}/uploads/${profileImage}` ||
                                      //                         "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                      //                       }
                                      //                       alt=""
                                      //                       className="avatar "
                                      //                     />
                                      //                   </div>
                                      //                   <div className="name-and-privacy ">
                                      //                     <div className="mx-2">
                                      //                       {/* activityData.activity_name  */}
                                      //                       <h6 className="my-0">
                                      //                         {`${fullName} `}
                                      //                         {` ${activityData.activity_name != ""
                                      //                           ? "is"
                                      //                           : ""
                                      //                           } `}
                                      //                         {activityData.logo != "" ? (
                                      //                           <img
                                      //                             src={`${host}/assets/${activityData.logo}`}
                                      //                             className="feeling-icon"
                                      //                           />
                                      //                         ) : (
                                      //                           ""
                                      //                         )}
                                      //                         {` ${activityData.activity_type != ""
                                      //                           ? activityData.activity_type
                                      //                           : ""
                                      //                           } `}
                                      //                         {` ${activityData.activity_name != ""
                                      //                           ? activityData.activity_name
                                      //                           : ""
                                      //                           } `}
                                      //                         {`${locationChildData !== null
                                      //                           ? `is at ${locationChildData.location_name}`
                                      //                           : ""
                                      //                           }`}
                                      //                       </h6>
                                      //                     </div>
                                      //                     <div className="">
                                      //                       <div className="my-0"></div>
                                      //                     </div>
                                      //                   </div>
                                      //                 </div>
                                      //                 <div className="form-group with-icon label-floating is-empty border rounded m-1">
                                      //                   <div className="">
                                      //                     <textarea
                                      //                       className={`${textColor != null
                                      //                         ? "form-controlss " + textColor
                                      //                         : "form-control"
                                      //                         } `}
                                      //                       placeholder=" Share what you are thinking here..."
                                      //                       // defaultValue={""}
                                      //                       style={{
                                      //                         border: "none",
                                      //                         minHeight: "135px",
                                      //                       }}
                                      //                       value={content}
                                      //                       onChange={handleContentChange}
                                      //                     />
                                      //                   </div>
                                      //                   {/* Display uploaded files in a single grid */}
                                      //                   <div className="grid-container">
                                      //                     {files.length > 0 &&
                                      //                       files.map((file, index) => (
                                      //                         <div
                                      //                           key={`file-${index}`}
                                      //                           className="grid-item "
                                      //                         >
                                      //                           <span
                                      //                             className="cross-icon-post-image-video-item"
                                      //                             onClick={() => {
                                      //                               const filess = [...files];
                                      //                               filess.splice(index, 1);
                                      //                               setFiles(filess);
                                      //                             }}
                                      //                           >
                                      //                             {" "}
                                      //                             X{" "}
                                      //                           </span>
                                      //                           {file.type.startsWith("image/") ? (
                                      //                             <img
                                      //                               src={URL.createObjectURL(file)}
                                      //                               alt={`Uploaded Image ${index}`}
                                      //                             // width="200"
                                      //                             // height="200"
                                      //                             />
                                      //                           ) : file.type.startsWith(
                                      //                             "video/"
                                      //                           ) ? (
                                      //                             // <video width="200" height="200" controls>
                                      //                             <video controls>
                                      //                               <source
                                      //                                 src={URL.createObjectURL(
                                      //                                   file
                                      //                                 )}
                                      //                                 type={file.type}
                                      //                               />
                                      //                               Your browser does not support
                                      //                               the video tag.
                                      //                             </video>
                                      //                           ) : null}
                                      //                         </div>
                                      //                       ))}
                                      //                   </div>
                                      //                 </div>
                                      //                 {/* <div>
                                      //   <div className='post-back-color-full-div'>
                                      //     <div className='post-back-color-div'>
                                      //       <img
                                      //         className='post-back-color-img'
                                      //         src={Colorselect.src}
                                      //         alt=''
                                      //       />
                                      //     </div>
                                      //     <div className='colors-div'></div>
                                      //   </div>
                                      // </div> */}
                                      //                 <div className="post-back-color-full-div">
                                      //                   <div
                                      //                     className="post-back-color-div"
                                      //                     onClick={() => {
                                      //                       setShowColors(!showColors);
                                      //                       handleBackgroundColors(null);
                                      //                     }}
                                      //                   >
                                      //                     <img
                                      //                       className="post-back-color-img"
                                      //                       src="/colorselect.png"
                                      //                       alt=""
                                      //                     />
                                      //                   </div>
                                      //                   {showColors && (
                                      //                     <div
                                      //                       className="colors-div"
                                      //                       ref={colorsRef}
                                      //                     >
                                      //                       <div
                                      //                         className="color-div color-one"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors("color-one");
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-two"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors("color-two");
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-three"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-three"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-four"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-four"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-five"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-five"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-six"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors("color-six");
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-seven"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-seven"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-nine"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-nine"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-ten"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors("color-ten");
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-nine"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-nine"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-ten"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors("color-ten");
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-eleven"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-eleven"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-twelve"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-twelve"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-thirteen"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-thirteen"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-fortheen"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-fortheen"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                       <div
                                      //                         className="color-div color-fivteen"
                                      //                         onClick={(e) => {
                                      //                           handleBackgroundColors(
                                      //                             "color-fivteen"
                                      //                           );
                                      //                         }}
                                      //                       />
                                      //                     </div>
                                      //                   )}
                                      //                   {showColors && (
                                      //                     <>
                                      //                       {colorsRef.current &&
                                      //                         colorsRef.current.scrollLeft > 0 && (
                                      //                           <div
                                      //                             className="arrow"
                                      //                             onClick={() => scroll("left")}
                                      //                           >
                                      //                             {"<"}
                                      //                           </div>
                                      //                         )}
                                      //                       {colorsRef.current &&
                                      //                         colorsRef.current.scrollLeft <
                                      //                         colorsRef.current.scrollWidth -
                                      //                         colorsRef.current.clientWidth && (
                                      //                           <div
                                      //                             className="arrow"
                                      //                             style={{ right: 0 }}
                                      //                             onClick={() => scroll("right")}
                                      //                           >
                                      //                             {">"}
                                      //                           </div>
                                      //                         )}
                                      //                     </>
                                      //                   )}
                                      //                 </div>
                                      //                 <div className="post-field-icons">
                                      //                   <div className="row">
                                      //                     <div className="col-lg-9 col-md-9 col-sm-9 col-6 ">
                                      //                       <span className="p-text-add text-black">
                                      //                         Add to your post
                                      //                       </span>
                                      //                     </div>
                                      //                     <div className="post-field-single-icon  col-lg-3 col-md-3 col-sm-3 col-6 d-flex align-items-center ">
                                      //                       {/* <Image src={photoSvg.src} width="20" height="20" onClick={handlePostImageUpload} /> */}
                                      //                       {/* <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} /> */}
                                      //                       <div className="post-media-icon ">
                                      //                         <Image
                                      //                           src="/custom-svg-icon/photo.svg"
                                      //                           width="20"
                                      //                           height="20"
                                      //                           className=""
                                      //                           name="media"
                                      //                           onClick={handlePostImageUpload}
                                      //                         />
                                      //                         <input
                                      //                           id="fileInput"
                                      //                           type="file"
                                      //                           className="media-file"
                                      //                           name="media"
                                      //                           accept="image/*,video/*"
                                      //                           multiple
                                      //                           onChange={handleFileUpload}
                                      //                         />
                                      //                       </div>
                                      //                       <div>
                                      //                         <Image
                                      //                           src="/custom-svg-icon/location.svg"
                                      //                           width="20"
                                      //                           height="20"
                                      //                           onClick={openModal}
                                      //                         />
                                      //                       </div>
                                      //                       <div>
                                      //                         <Image
                                      //                           src="/custom-svg-icon/addfriend.svg"
                                      //                           width="20"
                                      //                           height="20"
                                      //                         />
                                      //                       </div>
                                      //                       <div>
                                      //                         <Image
                                      //                           src="/custom-svg-icon/gallery.svg"
                                      //                           width="20"
                                      //                           height="20"
                                      //                         />
                                      //                       </div>
                                      //                       <div className="">
                                      //                         <span onClick={setFeelingModal}>
                                      //                           <svg
                                      //                             xmlns="http://www.w3.org/2000/svg"
                                      //                             width="16"
                                      //                             height="16"
                                      //                             fill="black"
                                      //                             className="bi bi-three-dots"
                                      //                             viewBox="0 0 16 16"
                                      //                           >
                                      //                             <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                      //                           </svg>
                                      //                         </span>
                                      //                       </div>
                                      //                     </div>
                                      //                   </div>
                                      //                 </div>
                                      //                 <div className="post-btton-div">
                                      //                   <button
                                      //                     className="post-btton"
                                      //                     type="submit"
                                      //                   >
                                      //                     {loading ? <Loader /> : <>Post</>}
                                      //                   </button>
                                      //                 </div>
                                      //               </form>
                                    }
                                  </div>

                                  <ProfileTextField isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
                                  <hr style={{ border: "1.5px solid #edf2f6" }} />
                                  {/* Navigation  */}
                                  <UploadNavigation isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
                                  <hr style={{ border: "1.5px solid #edf2f6" }} />
                                </div>
                              )}
                            </div>

                            {/* Old group post list */}
                            {/* <GroupPagePostList pageDetails={groupDetails} /> */}

                            <div id="newsfeed-items-grid">
                              {
                                params?.id && <NewGroupPostList group_id={params?.id} />
                              }
                            </div>
                          </div>

                          {/* Single group page Discussion tab right side */}
                          <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 ">
                            {!isMember && groupDetails?.group_privacy === "private" ? (
                              <PrivateGroupPageBlockRightView
                                about={groupDetails?.group_description || ""}
                                address={groupDetails?.address || ""}
                              />
                            ) : (
                              <Abouts
                                groupMedia={groupMedia}
                                groupDetails={groupDetails}
                              />
                            )}
                          </div>
                        </div>


                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {activeDivs === 2 && (
                    <div className="row mt-2 ">
                      <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 ">
                        <Event
                          group_id={params?.id}
                          groupMembers={groupMembers?.data?.map(i => ({
                            label: [i?.group_member_user_id?.first_name, i?.group_member_user_id?.last_name].join(' '),
                            id: i?.group_member_user_id?._id
                          })) || []}
                        />
                      </div>
                      {/* Single group page Discussion tab right side */}
                      <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 ">
                        {!isMember && groupDetails?.group_privacy === "private" ? (
                          <PrivateGroupPageBlockRightView
                            about={groupDetails?.group_description || ""}
                            address={groupDetails?.address || ""}
                          />
                        ) : (
                          <Abouts
                            groupMedia={groupMedia}
                            groupDetails={groupDetails}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {activeDivs === 3 && (
                    <div>
                      <GroupSinglePageMedia groupMedia={groupMedia} groupId={params?.id} />
                    </div>
                  )}
                </div>
                <div>
                  {activeDivs === 4 && (
                    <div>
                      <GroupPeople
                        groupMembers={groupMembers?.data || []}
                        memberCount={groupMembers?.count}
                        fetchMember={fetchMember}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {activeDivs === 5 && (
                    <div>
                      <GroupSetting groupDetails={groupDetails} fetchGroupDetails={fetchGroupDetails} />
                    </div>
                  )}
                </div>

              </Grid>

            </div>

          )}

          {activeDiv === 2 && (
            <div>
              <div className="m-4">
                <h3>Comming Soon</h3>
              </div>
            </div>
          )}

          {activeDiv === 3 && (
            <div>
              <CreateGroup />
            </div>
          )}
          {activeDiv === 4 && (
            <div className="group-feed">
              <GroupFeed />
            </div>
          )}
          {activeDiv === 5 && (
            <div>
              <DiscoverGroup />
            </div>
          )}
          {activeDiv === 6 && (
            <div>
              <MyGroup />
            </div>
          )}
        </div>

        <div>
          <aside className="col col-xl-2 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12 first-left-menu">
            <div className="scrollable_div ">
              <div className="ui-block">
                <FeatureUser />
              </div>
            </div>
          </aside>
        </div>
      </Grid>


      <LocationModal
        isOpen={openLocationModal}
        onRequestClose={closeModal}
        sendDataToParent={handlelocationChildData}
      />
      <FeelingAndActivity
        isFeelingOpen={openFeelingModal}
        onRequestClose={closeFeelingModal}
        sendDataToParent={handleFeelingChildData}
      />
      <InviteForGroup
        isOpen={groupInvitationModal}
        onRequestClose={closeSettingModal}
        selectedGroupId={selectedGroupId}
      />

      <ShareModal
        isOpen={shareModal}
        onRequestClose={closeShareModal}
        group_id={params?.id}
      />
    </Masterdashboardlayout>
  );
};

export default pagePreview;
