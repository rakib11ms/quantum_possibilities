"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useEffect, useRef, useState } from "react";
import Sidenav1 from "../../../../public/settingsprivecy.svg";
import Sidenav2 from "../../../../public/settingsnotification.svg";
import Sidenav3 from "../../../../public/settingsblocking.svg";
import Sidenav4 from "../../../../public/settingslinkedacc.svg";
import Sidenav5 from "../../../../public/settingscontributer.svg";
import Sidenav6 from "../../../../public/categories.svg";
import Sidenav7 from "../../../../public/contact.svg";
import Sidenav8 from "../../../../public/socialLinks.svg";
import Sidenav9 from "../../../../public/language.svg";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import qubee from "../../../../public/qubee.png";
import { toast } from "react-toastify";

import PriveacySetting from "@/component/AllPageSettings/PriveacySetting";
import NotificationSettings from "@/component/AllPageSettings/NotificationSettings";
import Blocking from "@/component/AllPageSettings/Blocking";
import LinkedAccount from "@/component/AllPageSettings/LinkedAccount";
import ManageContributers from "@/component/AllPageSettings/ManageContributers";
import axiosInstance from "../../../../utils/axios";
import { host } from "@/environment";
import PageAddressModal from "@/component/Pages/PageAddressModal";
import SocialMediaModal from "@/component/Pages/SocialMediaModal";

const page = () => {
  const params = useParams();
  const [activeDiv, setActiveDiv] = useState(1);
  const [activeAboutDiv, setActiveAboutDiv] = useState(1);
  const [pageDetails, setPageDetails] = useState({});
  const [pageSocialMedia, setPageSocialMedia] = useState([]);
  const [addressModal, setAddressModal] = useState(false)
  const [socialMedia, setSocialMedia] = useState(false)
  const [isAddingServiceArea, setIsAddingServiceArea] = useState(false);
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [isLanguages, setIsLanguages] = useState(false);
  const inputRef = useRef(null);

  const [isEditing, setIsEditing] = useState({
    pageName: false,
    pageUserName: false,
    email: false,
    website: false,
    service_area: false,
    offer: false,
    language: false
  });

  const [editedValue, setEditedValue] = useState({
    pageName: pageDetails.page_name,
    pageUserName: pageDetails.page_user_name,
    email: pageDetails.email,
    website: pageDetails.website,
    service_area: pageDetails.service_area,
    offer: pageDetails.offer,
    language: pageDetails.language,
  });
  console.log(editedValue)
  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = (field) => {

    setIsEditing({ ...isEditing, [field]: false });

  };

  const handleInputChange = (field, e) => {
    setEditedValue({ ...editedValue, [field]: e.target.value });
  };

  const handleOutsideClick = () => {
    Object.keys(isEditing).forEach((field) => {
      if (isEditing[field]) {
        handleSaveClick(field);
      }
    });
  };

  const handleServiceAreaClick = () => {
    setIsAddingServiceArea(true);
  };

  const handleOfferClick = () => {
    setIsAddingOffer(true);
  };
  const handleLanguageClick = () => {
    setIsLanguages(true);
  };

  const handleServiceAreaChange = (e) => {
    setServiceArea(e.target.value);
  };

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };
  const handleAboutTextClick = (divId) => {
    setActiveAboutDiv(divId);
  };
  useEffect(() => {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab, index) => {
      if (activeAboutDiv - 1 === index) {
        tab.style.transform = "scale(1.1)";
      } else {
        tab.style.transform = "scale(1)";
      }
    });
  }, [activeAboutDiv]);



  const closeAddressModal = () => {
    setAddressModal(false)
  }
  const closeSocialMediaModal = () => {
    setSocialMedia(false)
  }

  useEffect(() => {
    setIsAddingServiceArea(false);
    if (typeof window !== "undefined") {
      const locaStorageUserId = localStorage.getItem("userId");
    }
    const formData = {
      page_user_name: params.username
    };
    axiosInstance.post('/api/get-page-details', formData).then((res) => {
      if (res.data.status == 200) {
        setPageDetails(res.data.pageDetails);
        setPageSocialMedia(res.data.pagesMedaiaArr);
        setEditedValue({
          _id: res.data.pageDetails._id,
          pageName: res.data.pageDetails.page_name,
          pageUserName: res.data.pageDetails.page_user_name,
          email: res.data.pageDetails.email,
          website: res.data.pageDetails.website,
          service_area: res.data.pageDetails.service_area,
          offer: res.data.pageDetails.offer,
          language: res.data.pageDetails.language,
        })
      }
    })

  }, [])
  console.log(editedValue);
  const updatePageInfo = () => {
    axiosInstance.post('/api/update-page-info', editedValue).then((res) => {
      if (res.data.status == 200) {
        setPageDetails(res.data.pageDetails)

        toast(res.data.message, {
          type: "success",
          position: "top-right",
        });
      }
    })
  }




  return (
    <div>
      <Masterdashboardlayout>
        <div className='mob-create-pagediv'>
          <div className='row'>
            <div className='col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3'>
              <div className='prof-side-bar'>
                <h3 className='text-page'>Settings</h3>
                <div className='container-fluid'>
                  <ul className='create-mob-sidebar-div'>
                    <li
                      onClick={() => handleTextClick(1)}
                      className={`settings-side-bar-li-sec ${activeDiv === 1 ? "sideNaveactive" : ""
                        }`}>
                      <img
                        className='settings-authIcon'
                        src={`${host}/uploads/pages/${pageDetails.profile_pic}`}
                        alt=''
                        height={"14"}
                        width={"14"}
                      />
                      <div className='settings-side-text-div'>
                        <p className='settings-side-text'>
                          <strong>{pageDetails.page_name}</strong>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='prof-side-bar-sec'>
                <div className='container-fluid'>
                  <ul className='create-mob-sidebar-div'>
                    <li
                      onClick={() => handleTextClick(2)}
                      className={`settings-side-bar-li-sec ${activeDiv === 2 ? "sideNaveactive" : ""
                        }`}>
                      <Image
                        src={Sidenav1}
                        width={30}
                        height={30}
                        alt='page-nav'
                      />
                      <div className='settings-side-text-div'>
                        <p className='settings-side-text'>
                          <strong>Privacy</strong>
                        </p>
                      </div>
                    </li>
                    <li
                      onClick={() => handleTextClick(3)}
                      className={`settings-side-bar-li-sec ${activeDiv === 3 ? "sideNaveactive" : ""
                        }`}>
                      <Image
                        src={Sidenav2}
                        width={30}
                        height={30}
                        alt='page-nav'
                      />
                      <div className='settings-side-text-div'>
                        <p className='settings-side-text'>
                          <strong>Notifications</strong>
                        </p>
                      </div>
                    </li>
                    <li
                      onClick={() => handleTextClick(4)}
                      className={`settings-side-bar-li-sec ${activeDiv === 4 ? "sideNaveactive" : ""
                        }`}>
                      <Image
                        src={Sidenav3}
                        width={30}
                        height={30}
                        alt='page-nav'
                      />
                      <div className='settings-side-text-div'>
                        <p className='settings-side-text'>
                          {" "}
                          <strong>Blocking</strong>
                        </p>
                      </div>
                    </li>
                    <li
                      onClick={() => handleTextClick(5)}
                      className={`settings-side-bar-li-sec ${activeDiv === 5 ? "sideNaveactive" : ""
                        }`}>
                      <Image
                        src={Sidenav4}
                        width={30}
                        height={30}
                        alt='page-nav'
                      />
                      <div className='settings-side-text-div'>
                        <p className='settings-side-text'>
                          <strong>Linked </strong>Accounts
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <ul className='setting-mob-sidebar-div'>
                <li
                  onClick={() => handleTextClick(6)}
                  className={`settings-side-bar-li-sec ${activeDiv === 6 ? "sideNaveactive" : ""
                    }`}>
                  <Image src={Sidenav5} width={30} height={30} alt='page-nav' />
                  <div className='settings-side-text-div'>
                    <p className='settings-side-text'>
                      <strong>Manage </strong>Contributors
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className='col-12 col-sm-6 col-md-9 col-lg-9 col-xl-9'>
              {activeDiv === 1 && (
                <div className='mt-3'>
                  <div>
                    <h5>General Settings</h5>

                    <div className='row general-setti-div container-fluid'>
                      <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                        <div>
                          <ul className='general-sett-li'>
                            <li>Name</li>
                            <li>Username</li>
                            <li>Email</li>
                            <li>Website</li>
                          </ul>
                        </div>
                      </div>
                      {/* onClick={handleOutsideClick} */}
                      <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4' >
                        <div>
                          <ul className='general-sett-li'>
                            <li onClick={() => handleEditClick('pageName')}>
                              {isEditing.pageName ? (
                                <input
                                  type="text"
                                  className="form-control editable-field" value={editedValue.pageName}
                                  onChange={(e) => handleInputChange('pageName', e)}
                                />
                              ) : (
                                pageDetails.page_name
                              )}
                            </li>
                            <li onClick={() => handleEditClick('pageUserName')}>
                              {isEditing.pageUserName ? (
                                <input
                                  type="text"
                                  className="form-control editable-field" value={editedValue.pageUserName}
                                  onChange={(e) => handleInputChange('pageUserName', e)}
                                />
                              ) : (
                                pageDetails.page_user_name
                              )}
                            </li>
                            <li onClick={() => handleEditClick('email')}>
                              {isEditing.email ? (
                                <input
                                  type="text"
                                  className="form-control editable-field" value={editedValue.email}
                                  onChange={(e) => handleInputChange('email', e)}
                                />
                              ) : (
                                pageDetails.email
                              )}
                            </li>
                            <li onClick={() => handleEditClick('website')}>
                              {isEditing.website ? (
                                <input
                                  type="text"
                                  className="form-control editable-field " value={editedValue.website}
                                  onChange={(e) => handleInputChange('website', e)}
                                />
                              ) : (
                                pageDetails.website
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                        <div className='edit-btn'>
                          <ul className='general-sett-li'>
                            <li onClick={() => {
                              handleSaveClick('pageName')
                              updatePageInfo()
                            }}>
                              {isEditing.pageName ? 'Save' : 'Edit'}
                            </li>
                            <li onClick={() => {
                              handleSaveClick('pageUserName')
                              updatePageInfo()
                            }}>
                              {isEditing.pageUserName ? 'Save' : 'Edit'}
                            </li>
                            <li onClick={() => {
                              handleSaveClick('email')
                              updatePageInfo()
                            }}>
                              {isEditing.email ? 'Save' : 'Edit'}
                            </li>
                            <li onClick={() => {
                              handleSaveClick('website')
                              updatePageInfo()
                            }}>
                              {isEditing.website ? 'Save' : 'Edit'}
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className='mt-4'>
                    <h5>About</h5>

                    <div className='row setting-about-div container-fluid'>
                      <div className=' container-fluid'>
                        <div>
                          <div className='settings-about-tabs-full-div'>
                            <div className='settings-about-tabs-div'>
                              <p
                                className={
                                  activeAboutDiv === 1
                                    ? "active-tab tab"
                                    : "tab"
                                }
                                onClick={() => handleAboutTextClick(1)}>
                                Contact and basic info
                              </p>
                              <p
                                className={
                                  activeAboutDiv === 2
                                    ? "active-tab tab"
                                    : "tab"
                                }
                                onClick={() => handleAboutTextClick(2)}>
                                Privacy and legal info
                              </p>
                              <p
                                className={
                                  activeAboutDiv === 3
                                    ? "active-tab tab"
                                    : "tab"
                                }
                                onClick={() => handleAboutTextClick(3)}>
                                Details about you
                              </p>
                              <p
                                className={
                                  activeAboutDiv === 4
                                    ? "active-tab tab"
                                    : "tab"
                                }
                                onClick={() => handleAboutTextClick(4)}>
                                Page transparency
                              </p>
                            </div>
                          </div>

                          <div className='seetings-single-activeAboutDiv'>
                            {activeAboutDiv === 1 && (
                              <div className='container-fluid'>
                                <div>
                                  <div className='contactInfo-div'>
                                    <Image
                                      className='contactInfo-icon'
                                      src={Sidenav6}
                                      width={25}
                                      height={25}
                                      alt=''
                                    />
                                    <span className='contactInfo-tag'>
                                      Categories
                                    </span>
                                    <ul className='container contactInfo-ul'>
                                      <li>
                                        {pageDetails.bio}
                                      </li>
                                    </ul>
                                  </div>

                                  <div className='contactInfo-div'>
                                    <Image
                                      className='contactInfo-icon'
                                      src={Sidenav7}
                                      width={25}
                                      height={25}
                                      alt=''
                                    />
                                    <span className='contactInfo-tag'>
                                      Contact info
                                    </span>
                                    <ul className='container contactInfo-ul'>
                                      <li>

                                        {pageDetails.city + ',' + pageDetails.address + ',' + pageDetails.zip_code}
                                      </li>
                                      <li onClick={() => {
                                        setAddressModal(true)
                                      }}>
                                        <span>+</span> Change your address
                                      </li>
                                      {isAddingServiceArea && (
                                        <div ref={inputRef}>
                                          <input
                                            type="text"
                                            className="form-control editable-field"
                                            placeholder="Enter Service Area"
                                            value={editedValue.service_area}
                                            onChange={(e) => handleInputChange('service_area', e)}
                                          />
                                          <button className="page-setting-save-btn"
                                            onClick={() => {
                                              // Save the service area or perform any other action
                                              updatePageInfo();
                                              setIsAddingServiceArea(false);
                                            }}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      )}
                                      {isAddingServiceArea == false ?
                                        <li>
                                          {editedValue.service_area}
                                        </li>
                                        : <></>
                                      }
                                      <li onClick={handleServiceAreaClick}>
                                        <span>+</span>Change Service area
                                      </li>
                                      {/* <li>
                                        <span>+</span> Add ownership
                                      </li> */}
                                    </ul>
                                  </div>

                                  <div className='contactInfo-div'>
                                    <Image
                                      className='contactInfo-icon'
                                      src={Sidenav8}
                                      width={25}
                                      height={25}
                                      alt=''
                                    />
                                    <span className='contactInfo-tag'>
                                      Social Links
                                    </span>
                                    <ul className='container contactInfo-ul'>

                                      {pageSocialMedia.map((item, index) => (
                                        <li>
                                          <a href={item.url}>{item.social_media_id.media_name}</a>
                                        </li>
                                      ))}

                                      <li onClick={() => {
                                        setSocialMedia(true)
                                      }}>


                                        <span>+</span>Add social links
                                      </li>

                                    </ul>
                                  </div>

                                  <div className='contactInfo-div'>
                                    <Image
                                      className='contactInfo-icon'
                                      src={Sidenav9}
                                      width={25}
                                      height={25}
                                      alt=''
                                    />
                                    <span className='contactInfo-tag'>
                                      Offers
                                    </span>
                                    <ul className='container contactInfo-ul'>
                                      {isAddingOffer && (
                                        <div ref={inputRef}>
                                          <input
                                            type="text"
                                            className="form-control editable-field"
                                            placeholder="Enter Offer"
                                            value={editedValue.offer}
                                            onChange={(e) => handleInputChange('offer', e)}
                                          />
                                          <button className="page-setting-save-btn"
                                            onClick={() => {
                                              // Save the service area or perform any other action
                                              updatePageInfo();
                                              setIsAddingOffer(false);
                                            }}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      )}
                                      {isAddingOffer == false ?
                                        <li>
                                          {editedValue.offer}
                                        </li>
                                        : <></>
                                      }
                                      <li onClick={handleOfferClick}>
                                        <span>+</span>{editedValue.offer == "" ? 'Add' : 'Change'} offers
                                      </li>

                                    </ul>
                                  </div>

                                  <div className='contactInfo-div'>
                                    <Image
                                      className='contactInfo-icon'
                                      src={Sidenav9}
                                      width={25}
                                      height={25}
                                      alt=''
                                    />
                                    <span className='contactInfo-tag'>
                                      Languages
                                    </span>
                                    <ul className='container contactInfo-ul'>
                                      {isLanguages && (
                                        <div ref={inputRef}>
                                          <input
                                            type="text"
                                            className="form-control editable-field"
                                            placeholder="Enter Offer"
                                            value={editedValue.language}
                                            onChange={(e) => handleInputChange('language', e)}
                                          />
                                          <button className="page-setting-save-btn"
                                            onClick={() => {
                                              // Save the service area or perform any other action
                                              updatePageInfo();
                                              setIsLanguages(false);
                                            }}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      )}
                                      {isLanguages == false ?
                                        <li>
                                          {editedValue.language}
                                        </li>
                                        : <></>
                                      }
                                      <li onClick={handleLanguageClick}>
                                        <span>+</span>{editedValue.language == "" ? 'Add' : 'Change'} languages
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )}
                            {activeAboutDiv === 2 && (
                              <div>Content for Div 2</div>
                            )}
                            {activeAboutDiv === 3 && (
                              <div>Content for Div 1</div>
                            )}
                            {activeAboutDiv === 4 && (
                              <div>Content for Div 2</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='setting-about-full-div'></div>
                </div>
              )}

              {activeDiv === 2 && (
                <div>
                  <div>
                    <h5 className='Privacy-settings-text-tag'>
                      Privacy Settings
                    </h5>
                    <div className='container-fluid'>
                      <PriveacySetting />
                    </div>
                  </div>
                </div>
              )}
              {activeDiv === 3 && (
                <div>
                  <div>
                    <h5 className='notification-settings-text-tag'>
                      Notification Setting
                    </h5>
                    <div className='container-fluid'>
                      <NotificationSettings />
                    </div>
                  </div>
                </div>
              )}
              {activeDiv === 4 && (
                <div>
                  <h5 className='Privacy-settings-text-tag'>Blocking</h5>
                  <div>
                    <Blocking />
                  </div>
                </div>
              )}
              {activeDiv === 5 && (
                <div>
                  {" "}
                  <div>
                    <h5 className='Privacy-settings-text-tag'>Linking</h5>
                    <div>
                      <LinkedAccount />
                    </div>
                  </div>
                </div>
              )}
              {activeDiv === 6 && (
                <div>
                  <div>
                    <ManageContributers />
                  </div>
                </div>
              )}
            </div>
          </div >
        </div >
      </Masterdashboardlayout >
      <PageAddressModal
        isOpen={addressModal}
        onRequestClose={closeAddressModal}
        // username={userName}
        page_id={pageDetails._id}
        pageDetails={pageDetails}
        backToParent={setPageDetails}
      />
      <SocialMediaModal
        isOpen={socialMedia}
        onRequestClose={closeSocialMediaModal}
        // username={userName}
        page_id={pageDetails._id}
        pageDetails={pageDetails}
        backToParent={setPageSocialMedia}
        pageSocialMedia={pageSocialMedia}
      />
    </div >
  );
};

export default page;
