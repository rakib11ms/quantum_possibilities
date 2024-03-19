"use client";
import React, { useState } from 'react'
import "./about.css"
import { useSelector } from 'react-redux';
import { userInfo } from '@/redux/features/Profile/profileSlice'
import { host } from '@/environment';
import axiosInstance from '../../../../utils/axios';
import { toast } from "react-toastify";
import Modal from "react-modal";
import { customStyles } from "../../../../utils/customeStyle";
import WorkPlaceItem from './_ui/WorkPlaceItem';
import WorkPlaceModal from './_ui/WorkPlaceModal';
import EducationModal from './_ui/EducationModal';
import PlusIcon from './_ui/Icons/PlusIcon';
import EditIcon from './_ui/Icons/EditIcon';
import EducationItem from './_ui/EducationItem';
import WebsiteModal from './_ui/WebsiteModal';
import DeleteIcon from './_ui/Icons/DeleteIcon';
import ThreedotIcon from './_ui/Icons/ThreedotIcon';
import GenderModal from './_ui/GenderModal';
import BirthdayModal from './_ui/BirthdayModal';
import ReactionModal from './_ui/ReactionModal';
import RelationshipModal from './_ui/RelationshipModal';
import NicknameModal from './_ui/NicknameModal';
import WebsiteIcon from './_ui/Icons/WebsiteIcon';
import BirthdayIcon2 from './_ui/Icons/BirthdayIcon2';
import AboutModal from './_ui/AboutModal';
import PlaceModal from './_ui/PlaceModal';
import LocationIcon2 from './_ui/Icons/LocationIcon2';
import CustomeDetailsView from './_ui/CustomeDetailsView';
import PhoneIcon2 from './_ui/Icons/PhoneIcon2';
import EmailIcon2 from './_ui/Icons/EmailIcon2';
import GenderIcon from './_ui/Icons/GenderIcon';
import LoveIcon from './_ui/Icons/LoveIcon';
import { useParams } from 'next/navigation';
import Leftsidebar from '../_ui/Leftsidebar';
import PublicSmallIcon from './_ui/Icons/PublicSmallIcon';
import PrivacyModal from './_ui/PrivacyModal';
import FriendSmallIcon from './_ui/Icons/FriendSmallIcon';
import OnlymeSmallIcon from './_ui/Icons/OnlymeSmallIcon';
import CapitalizeFirstLetter from '@/utils/CapitalizeFirstLetter';

export default function page() {

    const [userName, setUserName] = React.useState(useParams().username);
    const [ownerUserName, setOwnerUserName] = React.useState();
    const [allWorkPlace, setAllWorkPlace] = React.useState([])
    const [allEducation, setAllEducation] = React.useState([])
    const [userInfo, setUserInfo] = React.useState();
    const [activeDiv, setActiveDiv] = useState(1);
    const [websiteModalInfo, setWebsiteModalInfo] = useState({})
    const [privacyModalInfo, setPrivacyModalInfo] = useState({})

    const [isOpenModal, setIsOpenModal] = React.useState({
        post: false,
        workplace: false,
        education: false,
        gender: false,
        birthday: false,
        relationship: false,
        nickname: false,
        website: false,
        about: false,
        place: false,
        privacy: false,
    });



    const getAllWorkPlace = () => {
        axiosInstance.post(`${host}/api/get-workplace-list`, {
            username: userName
        }).then((res) => {
            if (res.data.status == 200) {
                setAllWorkPlace(res.data.data)
            }
        });
    }

    const getAllEducation = () => {
        axiosInstance.post(`${host}/api/get-user-education-info`, {
            username: userName
        }).then((res) => {
            if (res.data.status == 200) {
                setAllEducation(res.data.userEducation)
            }
        });
    }

    const getUserInfo = () => {
        axiosInstance.post(`${host}/api/get-user-info`, {
            username: userName
        }).then((res) => {
            if (res.data.status == 200) {
                setUserInfo(res.data.userInfo[0])
            }
        });
    }

    React.useEffect(() => {
        setOwnerUserName(localStorage.getItem("username"))
        getUserInfo()
        getAllWorkPlace()
        getAllEducation()
    }, [])



    const handleTextClick = (divId) => {
        setActiveDiv(divId);
    };

    const handleAddWorkPlace = () => {
        setIsOpenModal({ workplace: true })
    }

    const handleAddEducation = () => {
        setIsOpenModal({ education: true })
    }

    const handleGenderEdit = () => {
        setIsOpenModal({ gender: true })
    }

    const handleRelationshipEdit = () => {
        setIsOpenModal({ relationship: true })
    }

    const handlePrivacyEdit = (field_Name, privacy) => {
        setIsOpenModal({ privacy: true })
        setPrivacyModalInfo({
            field_Name,
            privacy
        })
    }

    const handleRelationshipDelete = () => {
        axiosInstance.delete(`${host}/api/delete-user-relStatus/`).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                getUserInfo()
            }
        });
    }

    const handleNicknameEdit = () => {
        setIsOpenModal({ nickname: true })
    }

    const handleNicknameDelete = () => {
        axiosInstance.delete(`${host}/api/delete-user-nickname/`).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                getUserInfo()
            }
        });
    }



    const handleBirthdayEdit = () => {
        setIsOpenModal({ birthday: true })
    }

    const handleWebsiteEdit = (item) => {
        setIsOpenModal({ website: true })
        setWebsiteModalInfo(item)
    }

    const handleWebsiteDelete = (id) => {
        axiosInstance.delete(`${host}/api/delete-user-website/${id}`).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                getUserInfo()
            }
        });
    }

    const handleAboutEdit = () => {
        setIsOpenModal({ about: true })
    }

    const handleAboutDelete = () => {
        axiosInstance.delete(`${host}/api/delete-user-about/`).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                getUserInfo()
            }
        });
    }

    const handlePlaceEdit = () => {
        setIsOpenModal({ place: true })
    }

    const handlePlaceDelete = (name) => {
        axiosInstance.delete(`${host}/api/delete-user-location/${name}`,).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                getUserInfo()
            }
        });
    }

    const getBirthday = (birthday) => {
        const d = new Date(birthday)
        const monthName = d.toLocaleString('default', { month: 'long' });
        return `Born ${monthName} ${d.getDate()}, ${d.getFullYear()}`
    }

    // const userInfoData = useSelector(userInfo)

    return (
        <div>
            <div className='row'>
                <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                    <div className='about-me-div'>
                        <Leftsidebar userInfo={userInfo} />
                    </div>
                </div>
                <div className='col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                    <div className='prof-ful-work-edu-div'>
                        <div className='prof-work-edu-div'>
                            <div
                                onClick={() => handleTextClick(1)}
                                className={`prof-about-side-bar-li ${activeDiv === 1 ? "active-prof-about" : ""
                                    }`}>
                                <h6 className='about-profile-bartext'>
                                    Work and Education{" "}
                                </h6>
                            </div>
                            <div
                                onClick={() => handleTextClick(2)}
                                className={`prof-about-side-bar-li ${activeDiv === 2 ? "active-prof-about" : ""
                                    }`}>
                                <h6 className='about-profile-bartext'>
                                    Contact and Basic info
                                </h6>
                            </div>
                            <div
                                onClick={() => handleTextClick(3)}
                                className={`prof-about-side-bar-li ${activeDiv === 3 ? "active-prof-about" : ""
                                    }`}>
                                <h6 className='about-profile-bartext'>
                                    Details About you{" "}
                                </h6>
                            </div>
                        </div>

                        <Modal isOpen={isOpenModal.privacy} onRequestClose={() => setIsOpenModal({ privacy: false })} style={customStyles}>
                            {isOpenModal.privacy && <PrivacyModal privacyModalInfo={privacyModalInfo} getUserInfo={getUserInfo} setIsOpenModal={setIsOpenModal} />}
                        </Modal>
                        <div>
                            {activeDiv === 1 && (
                                <div className=''>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>Add Workplace </h6>
                                            {userName === ownerUserName ? <span onClick={handleAddWorkPlace}>
                                                <PlusIcon />
                                            </span> : null}
                                            <Modal isOpen={isOpenModal.workplace} onRequestClose={() => setIsOpenModal({ workplace: false })} style={customStyles}>
                                                {isOpenModal.workplace && <WorkPlaceModal userName={userName} getAllWorkPlace={getAllWorkPlace} setIsOpenModal={setIsOpenModal} />}
                                            </Modal>
                                        </div>
                                        <div>
                                            <div className='row'>
                                                {allWorkPlace.map(item => {
                                                    return <WorkPlaceItem editOption={userName === ownerUserName} getAllWorkPlace={getAllWorkPlace} setAllWorkPlace={setAllWorkPlace} workplace={item} />
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>Add Education </h6>
                                            {userName === ownerUserName ? <span onClick={handleAddEducation}>
                                                <PlusIcon />
                                            </span> : null}
                                            <Modal isOpen={isOpenModal.education} onRequestClose={() => setIsOpenModal({ education: false })} style={customStyles}>
                                                {isOpenModal.education && <EducationModal userName={userName} getAllEducation={getAllEducation} setIsOpenModal={setIsOpenModal} />}
                                            </Modal>
                                        </div>
                                        <div>
                                            <div className='row'>
                                                {allEducation.map(item => {
                                                    return <EducationItem editOption={userName === ownerUserName} getAllEducation={getAllEducation} setAllEducation={setAllEducation} education={item} />
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeDiv === 2 && (
                                <div className=''>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>Contact info </h6>
                                        </div>
                                        <div>
                                            <div className='row'>
                                                <CustomeDetailsView icon={<PhoneIcon2 />} title={"Mobile"} data={userInfo?.phone} />
                                                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                    <div className='d-flex tas_privacy_Edit_container'>
                                                        <span onClick={() => handlePrivacyEdit("phone", userInfo?.privacy?.phone)} className='tas_workplace_three_dots tas_privacy_container '>
                                                            {userInfo?.privacy?.phone === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.phone === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                        </span>
                                                    </div>
                                                </div>
                                                <CustomeDetailsView icon={<EmailIcon2 />} title={"Email"} data={userInfo?.email} />
                                                <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                    <div className='d-flex tas_privacy_Edit_container'>
                                                        <span onClick={() => handlePrivacyEdit("email", userInfo?.privacy?.email)} className='tas_workplace_three_dots tas_privacy_container '>
                                                            {userInfo?.privacy?.email === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.email === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>
                                                Websites and Others links{" "}
                                            </h6>
                                            {userName === ownerUserName ? <span onClick={handleWebsiteEdit}>
                                                <PlusIcon />
                                            </span> : null}
                                            <Modal isOpen={isOpenModal.website} onRequestClose={() => setIsOpenModal({ website: false })} style={customStyles}>
                                                {isOpenModal.website && <WebsiteModal item={websiteModalInfo} setIsOpenModal={setIsOpenModal} getUserInfo={getUserInfo} />}
                                            </Modal>
                                        </div>
                                        <div>
                                            {userInfo?.websites.map((item, index) => {
                                                return <div className='row'>
                                                    <CustomeDetailsView icon={<WebsiteIcon />} title={item?.socialMedia.media_name} data={item?.website_url} />
                                                    {userName === ownerUserName ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                        <div className='d-flex tas_privacy_Edit_container'>
                                                            <span className='tas_privacy_container '>
                                                                {item?.privacy === "public" ? <PublicSmallIcon /> : item?.privacy === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                            </span>
                                                            <span
                                                                className='abt-three-dots tas_workplace_three_dots'
                                                                data-bs-toggle='dropdown'
                                                                aria-expanded='false'>
                                                                <ThreedotIcon />
                                                            </span>
                                                            <ul class='dropdown-menu abt-wr-drops'>
                                                                <span className='abt-wr-ed-tag'>
                                                                    Edit options
                                                                </span>
                                                                <li>
                                                                    <div className='share-popup'>
                                                                        <span>
                                                                            <EditIcon />
                                                                        </span>
                                                                        <span onClick={() => handleWebsiteEdit(item)} className='share-text-wr tas_workplace_delete_btn'>
                                                                            Edit
                                                                        </span>

                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='share-popup'>
                                                                        <span>
                                                                            <DeleteIcon />
                                                                        </span>
                                                                        <span onClick={() => { handleWebsiteDelete(item._id) }} className='share-text-wr-dlt tas_workplace_delete_btn'>
                                                                            Delete
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>


                                                    </div> : null}
                                                </div>
                                            })}



                                        </div>
                                    </div>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>
                                                Basic information{" "}
                                            </h6>
                                            <span>
                                                {/* <PlusIcon /> */}
                                            </span>
                                        </div>
                                        <div>
                                            <div className='row'>
                                                <CustomeDetailsView icon={<GenderIcon />} title={"Gender"} data={CapitalizeFirstLetter(userInfo?.gender?.gender_name)} />
                                                {userName === ownerUserName ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                    <div className='d-flex tas_privacy_Edit_container'>
                                                        <span className='tas_privacy_container '>
                                                            {userInfo?.privacy?.gender === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.gender === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                        </span>
                                                        <span
                                                            className='abt-three-dots tas_workplace_three_dots'
                                                            data-bs-toggle='dropdown'
                                                            aria-expanded='false'>
                                                            <ThreedotIcon />
                                                        </span>

                                                        <ul class='dropdown-menu abt-wr-drops'>
                                                            <span className='abt-wr-ed-tag'>
                                                                Edit options
                                                            </span>
                                                            <li>
                                                                <div className='share-popup'>
                                                                    <span>
                                                                        <EditIcon />
                                                                    </span>
                                                                    <span onClick={handleGenderEdit} className='share-text-wr tas_workplace_delete_btn'>
                                                                        Edit
                                                                    </span>
                                                                    <Modal isOpen={isOpenModal.gender} onRequestClose={() => setIsOpenModal({ gender: false })} style={customStyles}>
                                                                        {isOpenModal.gender && <GenderModal setIsOpenModal={setIsOpenModal} getUserInfo={getUserInfo} userInfo={userInfo} />}
                                                                    </Modal>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> : null}

                                                <CustomeDetailsView icon={<BirthdayIcon2 />} title={"Birth date"} data={userInfo?.date_of_birth ? getBirthday(userInfo.date_of_birth) : null} />

                                                {userName === ownerUserName ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                    <div className='d-flex tas_privacy_Edit_container'>
                                                        <span onClick={() => handlePrivacyEdit("dob", userInfo?.privacy?.dob)} className='tas_privacy_container '>
                                                            {userInfo?.privacy?.dob === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.dob === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                        </span>
                                                        <span
                                                            className='abt-three-dots tas_workplace_three_dots'
                                                            data-bs-toggle='dropdown'
                                                            aria-expanded='false'>
                                                            <ThreedotIcon />
                                                        </span>

                                                        <ul class='dropdown-menu abt-wr-drops'>
                                                            <span className='abt-wr-ed-tag'>
                                                                Edit options
                                                            </span>
                                                            <li>
                                                                <div className='share-popup'>
                                                                    <span >
                                                                        <EditIcon />
                                                                    </span>
                                                                    <span onClick={handleBirthdayEdit} className='share-text-wr tas_workplace_delete_btn'>
                                                                        Edit
                                                                    </span>
                                                                    <Modal isOpen={isOpenModal.birthday} onRequestClose={() => setIsOpenModal({ birthday: false })} style={customStyles}>
                                                                        {isOpenModal.birthday && <BirthdayModal birthday={userInfo.date_of_birth} setIsOpenModal={setIsOpenModal} getUserInfo={getUserInfo} />}
                                                                    </Modal>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeDiv === 3 && (
                                <div className=''>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>About you</h6>

                                            {userName === ownerUserName && userInfo?.user_about === null ? <span className='tas_workplace_three_dots' onClick={handleAboutEdit}>
                                                <PlusIcon />
                                            </span> : null}
                                            <Modal isOpen={isOpenModal.about} onRequestClose={() => setIsOpenModal({ about: false })} style={customStyles}>
                                                {isOpenModal.about && <AboutModal about={""} setIsOpenModal={setIsOpenModal} getUserInfo={getUserInfo} />}
                                            </Modal>
                                        </div>
                                        <div>
                                            {userInfo?.user_about ? <div className='row'>
                                                <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                                                    <div className='abt-add-textp-div'>
                                                        <p className='abt-add-textp'>
                                                            {userInfo?.user_about ? userInfo.user_about : "About bio..."}
                                                        </p>
                                                    </div>
                                                </div>
                                                {userName === ownerUserName ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                    <div className='d-flex tas_privacy_Edit_container'>
                                                        <span className='tas_privacy_container '>
                                                            {userInfo?.privacy?.about === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.about === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                        </span>
                                                        <span
                                                            className='abt-three-dots tas_workplace_three_dots'
                                                            data-bs-toggle='dropdown'
                                                            aria-expanded='false'>
                                                            <ThreedotIcon />
                                                        </span>

                                                        <ul class='dropdown-menu abt-wr-drops'>
                                                            <span className='abt-wr-ed-tag'>
                                                                Edit options
                                                            </span>
                                                            <li>
                                                                <div className='share-popup'>
                                                                    <span>
                                                                        <EditIcon />
                                                                    </span>
                                                                    <span onClick={handleAboutEdit} className='share-text-wr tas_workplace_delete_btn'>
                                                                        Edit
                                                                    </span>
                                                                    <Modal isOpen={isOpenModal.about} onRequestClose={() => setIsOpenModal({ about: false })} style={customStyles}>
                                                                        {isOpenModal.about && <AboutModal userInfo={userInfo} setIsOpenModal={setIsOpenModal} getUserInfo={getUserInfo} />}
                                                                    </Modal>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='share-popup'>
                                                                    <span>
                                                                        <DeleteIcon />
                                                                    </span>
                                                                    <span onClick={handleAboutDelete} className='share-text-wr-dlt tas_workplace_delete_btn'>
                                                                        Delete
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> : null}
                                            </div> : null}

                                        </div>
                                    </div>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>Places lived </h6>
                                            {userName === ownerUserName ? <span onClick={handlePlaceEdit}>
                                                <PlusIcon />
                                            </span> : null}
                                            <Modal isOpen={isOpenModal.place} onRequestClose={() => setIsOpenModal({ place: false })} style={customStyles}>
                                                {isOpenModal.place && <PlaceModal getUserInfo={getUserInfo} setIsOpenModal={setIsOpenModal} />}
                                            </Modal>
                                        </div>
                                        <div>
                                            <div className='row'>
                                                {userInfo?.home_town ?
                                                    <>
                                                        <CustomeDetailsView icon={<LocationIcon2 />} title={"Hometown"} data={userInfo?.home_town} />
                                                        {userName === ownerUserName ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                            <div className='d-flex tas_privacy_Edit_container'>
                                                                <span className='tas_privacy_container '>
                                                                    {userInfo?.privacy?.home_town === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.home_town === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                                </span>
                                                                <span
                                                                    className='abt-three-dots tas_workplace_three_dots'
                                                                    data-bs-toggle='dropdown'
                                                                    aria-expanded='false'>
                                                                    <ThreedotIcon />
                                                                </span>

                                                                <ul class='dropdown-menu abt-wr-drops'>
                                                                    <span className='abt-wr-ed-tag'>
                                                                        Edit options
                                                                    </span>
                                                                    <li>
                                                                        <div className='share-popup'>
                                                                            <span>
                                                                                <EditIcon />
                                                                            </span>
                                                                            <span onClick={handlePlaceEdit} className='share-text-wr tas_workplace_delete_btn'>
                                                                                Edit
                                                                            </span>
                                                                            <Modal isOpen={isOpenModal.place} onRequestClose={() => setIsOpenModal({ place: false })} style={customStyles}>
                                                                                {isOpenModal.place && <PlaceModal userInfo={userInfo} getUserInfo={getUserInfo} setIsOpenModal={setIsOpenModal} />}
                                                                            </Modal>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className='share-popup'>
                                                                            <span>
                                                                                <DeleteIcon />
                                                                            </span>
                                                                            <span onClick={() => handlePlaceDelete("home_town")} className='share-text-wr-dlt tas_workplace_delete_btn'>
                                                                                Delete
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div> : null}

                                                    </> : null}
                                                {userInfo?.present_town ?
                                                    <>
                                                        <CustomeDetailsView icon={<LocationIcon2 />} title={"Current city"} data={userInfo?.present_town} />
                                                        {userName === ownerUserName ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                            <div className='d-flex tas_privacy_Edit_container'>
                                                                <span className='tas_privacy_container '>
                                                                    {userInfo?.privacy?.present_town === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.present_town === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                                </span>
                                                                <span
                                                                    className='abt-three-dots tas_workplace_three_dots'
                                                                    data-bs-toggle='dropdown'
                                                                    aria-expanded='false'>
                                                                    <ThreedotIcon />
                                                                </span>

                                                                <ul class='dropdown-menu abt-wr-drops'>
                                                                    <span className='abt-wr-ed-tag'>
                                                                        Edit options
                                                                    </span>
                                                                    <li>
                                                                        <div className='share-popup'>
                                                                            <span>
                                                                                <EditIcon />
                                                                            </span>
                                                                            <span onClick={handlePlaceEdit} className='share-text-wr tas_workplace_delete_btn'>
                                                                                Edit
                                                                            </span>
                                                                            <Modal isOpen={isOpenModal.place} onRequestClose={() => setIsOpenModal({ place: false })} style={customStyles}>
                                                                                {isOpenModal.place && <PlaceModal userInfo={userInfo} getUserInfo={getUserInfo} setIsOpenModal={setIsOpenModal} />}
                                                                            </Modal>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className='share-popup'>
                                                                            <span>
                                                                                <DeleteIcon />
                                                                            </span>
                                                                            <span onClick={() => handlePlaceDelete("present_town")} className='share-text-wr-dlt tas_workplace_delete_btn'>
                                                                                Delete
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div> : null}

                                                    </> : null}

                                            </div>
                                        </div>
                                    </div>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>Relationship </h6>
                                        </div>
                                        <div>
                                            <div className='row'>
                                                <CustomeDetailsView icon={<LoveIcon />} title={"Relationship"} data={userInfo?.relation_status ? userInfo.relation_status : "No Relationship"} />
                                                {userName === ownerUserName ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                    <div className='d-flex tas_privacy_Edit_container'>
                                                        <span className='tas_privacy_container '>
                                                            {userInfo?.privacy?.relationship === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.relationship === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                        </span>
                                                        <span
                                                            className='abt-three-dots tas_workplace_three_dots'
                                                            data-bs-toggle='dropdown'
                                                            aria-expanded='false'>
                                                            <ThreedotIcon />
                                                        </span>

                                                        <ul class='dropdown-menu abt-wr-drops'>
                                                            <span className='abt-wr-ed-tag'>
                                                                Edit options
                                                            </span>
                                                            <li>
                                                                <div className='share-popup'>
                                                                    <span>
                                                                        <EditIcon />
                                                                    </span>
                                                                    <span onClick={handleRelationshipEdit} className='share-text-wr tas_workplace_delete_btn'>
                                                                        Edit
                                                                    </span>
                                                                    <Modal isOpen={isOpenModal.relationship} onRequestClose={() => setIsOpenModal({ relationship: false })} style={customStyles}>
                                                                        {isOpenModal.relationship && <RelationshipModal userInfo={userInfo} setIsOpenModal={setIsOpenModal} getUserInfo={getUserInfo} />}
                                                                    </Modal>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='share-popup'>
                                                                    <span>
                                                                        <DeleteIcon />
                                                                    </span>
                                                                    <span onClick={handleRelationshipDelete} className='share-text-wr-dlt tas_workplace_delete_btn'>
                                                                        Delete
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ab-prf-full-div'>
                                        <div className='abot-edu-work-tag-div'>
                                            <h6 className='abt-add-tags'>Nickname </h6>
                                        </div>
                                        <div>
                                            <div className='row'>
                                                <CustomeDetailsView icon={<LoveIcon />} title={"Nickname"} data={userInfo?.user_nickname ? userInfo.user_nickname : "No nickname"} />
                                                {userName === ownerUserName ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                                    <div className='d-flex tas_privacy_Edit_container'>
                                                        <span className='tas_privacy_container '>
                                                            {userInfo?.privacy?.nickname === "public" ? <PublicSmallIcon /> : userInfo?.privacy?.nickname === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                                                        </span>
                                                        <span
                                                            className='abt-three-dots tas_workplace_three_dots'
                                                            data-bs-toggle='dropdown'
                                                            aria-expanded='false'>
                                                            <ThreedotIcon />
                                                        </span>

                                                        <ul class='dropdown-menu abt-wr-drops'>
                                                            <span className='abt-wr-ed-tag'>
                                                                Edit options
                                                            </span>
                                                            <li>
                                                                <div className='share-popup'>
                                                                    <span>
                                                                        <EditIcon />
                                                                    </span>
                                                                    <span onClick={handleNicknameEdit} className='share-text-wr tas_workplace_delete_btn'>
                                                                        Edit
                                                                    </span>
                                                                    <Modal isOpen={isOpenModal.nickname} onRequestClose={() => setIsOpenModal({ nickname: false })} style={customStyles}>
                                                                        {isOpenModal.nickname && <NicknameModal userInfo={userInfo} setIsOpenModal={setIsOpenModal} getUserInfo={getUserInfo} />}
                                                                    </Modal>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='share-popup'>
                                                                    <span>
                                                                        <DeleteIcon />
                                                                    </span>
                                                                    <span onClick={handleNicknameDelete} className='share-text-wr-dlt tas_workplace_delete_btn'>
                                                                        Delete
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
