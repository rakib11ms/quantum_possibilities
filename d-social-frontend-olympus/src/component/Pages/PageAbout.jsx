"use client";
import React, { useState } from "react";
import Sidenav6 from "../../../public/categories.svg";
import Sidenav7 from "../../../public/contact.svg";
import Sidenav8 from "../../../public/socialLinks.svg";
import Sidenav9 from "../../../public/language.svg";
import Image from "next/image";
import PrivacyandLegalInfo from "./PrivacyandLegalInfo";
import DetailsAboutYou from "./DetailsAboutYou";
import PageTransparency from "./PageTransparency";

const PageAbout = ({ pageDetails, pageSocialMedia }) => {
  const [activeAboutDiv, setActiveAboutDiv] = useState(1);

  const handleAboutTextClick = (divId) => {
    setActiveAboutDiv(divId);
  };

  return (
    <div>
      {" "}
      <div className=''>
        <div className='row setting-about-div container-fluid'>
          <div className=' container-fluid'>
            <div>
              <div className='page-settings-about-tabs-full-div'>
                <h5 className='mb-3'> About</h5>
                <div className='settings-about-tabs-div'>
                  <p
                    className={
                      activeAboutDiv === 1
                        ? "active-tab-pagsetting tab"
                        : "tab-pagsetting"
                    }
                    onClick={() => handleAboutTextClick(1)}>
                    Contact and basic info
                  </p>
                  <p
                    className={
                      activeAboutDiv === 2
                        ? "active-tab-pagsetting tab"
                        : "tab-pagsetting"
                    }
                    onClick={() => handleAboutTextClick(2)}>
                    Privacy and legal info
                  </p>
                  <p
                    className={
                      activeAboutDiv === 3
                        ? "active-tab-pagsetting tab"
                        : "tab-pagsetting"
                    }
                    onClick={() => handleAboutTextClick(3)}>
                    Details about you
                  </p>
                  <p
                    className={
                      activeAboutDiv === 4
                        ? "active-tab-pagsetting tab"
                        : "tab-pagsetting"
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
                        <span className='contactInfo-tag'>Categories</span>
                        <ul className='container contactInfo-ul'>
                          <li>{pageDetails.bio}</li>
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
                        <span className='contactInfo-tag'>Contact info</span>
                        <ul className='container contactInfo-ul'>
                          <li>
                            {pageDetails.city +
                              "," +
                              pageDetails.address +
                              "," +
                              pageDetails.zip_code}
                          </li>
                          <li>{pageDetails.service_area}</li>
                          <li>
                            ownership goes to {pageDetails.user_id?.first_name}
                          </li>
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
                        <span className='contactInfo-tag'>Social Link</span>
                        <ul className='container contactInfo-ul'>
                          {pageSocialMedia.map((item, index) => (
                            <li>
                              <a href={item.url}>
                                {item.social_media_id.media_name}
                              </a>
                            </li>
                          ))}
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
                        <span className='contactInfo-tag'>Offers</span>
                        <ul className='container contactInfo-ul'>
                          <li>{pageDetails.offer}</li>
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
                        <span className='contactInfo-tag'>Languages</span>
                        <ul className='container contactInfo-ul'>
                          <li>{pageDetails.language}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                {activeAboutDiv === 2 && (
                  <div>
                    <div>
                      <PrivacyandLegalInfo />
                    </div>
                  </div>
                )}
                {activeAboutDiv === 3 && (
                  <div>
                    <div>
                      <DetailsAboutYou />
                    </div>
                  </div>
                )}
                {activeAboutDiv === 4 && (
                  <div>
                    <PageTransparency />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
