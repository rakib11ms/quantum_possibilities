"use client";
import ProfileHeader from "@/component/ProfileHeader";
import React, { useState } from "react";
import prfworkabt1 from "../../../public/prfworkabt1.png";
import prfworkabt2 from "../../../public/prfworkabt2.png";
import prfworkabt3 from "../../../public/prfworkabt3.png";
import prfworkabt4 from "../../../public/prfworkabt4.png";
import prfworkabt5 from "../../../public/linkdinIcon.png";
import Image from "next/image";

const page = () => {
  const [activeDiv, setActiveDiv] = useState(1);

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };
  return (
    <div>
      <div className='about-header-div'>
        <ProfileHeader />
      </div>

      <div>
        <div className='row no-gutters'>
          <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'></div>
          <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
            <div className='about-me-div'>
              <span className='abt-me-tags'>About me</span>
              <div>
                <ul>
                  <li>
                    <div className='abou-li-div'>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'>
                          <g clip-path='url(#clip0_1729_567)'>
                            <path
                              d='M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z'
                              fill='#307777'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_1729_567'>
                              <rect width='24' height='24' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <p>Male</p>
                    </div>
                  </li>
                  <li>
                    <div className='abou-li-div'>
                      {" "}
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 24 24'
                          fill='none'>
                          <g clip-path='url(#clip0_1729_556)'>
                            <path
                              d='M12 6C13.11 6 14 5.1 14 4C14 3.62 13.9 3.27 13.71 2.97L12 0L10.29 2.97C10.1 3.27 10 3.62 10 4C10 5.1 10.9 6 12 6ZM16.6 15.99L15.53 14.92L14.45 15.99C13.15 17.29 10.87 17.3 9.56 15.99L8.49 14.92L7.4 15.99C6.75 16.64 5.88 17 4.96 17C4.23 17 3.56 16.77 3 16.39V21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21V16.39C20.44 16.77 19.77 17 19.04 17C18.12 17 17.25 16.64 16.6 15.99ZM18 9H13V7H11V9H6C4.34 9 3 10.34 3 12V13.54C3 14.62 3.88 15.5 4.96 15.5C5.48 15.5 5.98 15.3 6.34 14.93L8.48 12.8L10.61 14.93C11.35 15.67 12.64 15.67 13.38 14.93L15.52 12.8L17.65 14.93C18.02 15.3 18.51 15.5 19.03 15.5C20.11 15.5 20.99 14.62 20.99 13.54V12C21 10.34 19.66 9 18 9Z'
                              fill='#307777'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_1729_556'>
                              <rect width='24' height='24' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <p>Born June 26, 1980</p>
                    </div>
                  </li>
                  <li>
                    <div className='abou-li-div'>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='17'
                          height='17'
                          viewBox='0 0 14 17'
                          fill='none'>
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M0 7.07009C0 3.16021 3.16555 0 6.9946 0C10.8344 0 14 3.16021 14 7.07009C14 9.04034 13.3058 10.8695 12.1631 12.4198C10.9025 14.13 9.34883 15.62 7.59998 16.7896C7.19972 17.0599 6.83848 17.0803 6.39919 16.7896C4.64037 15.62 3.08666 14.13 1.83688 12.4198C0.693398 10.8695 0 9.04034 0 7.07009ZM4.68945 7.29019C4.68945 8.6 5.72498 9.63017 6.99469 9.63017C8.26523 9.63017 9.31072 8.6 9.31072 7.29019C9.31072 5.99058 8.26523 4.91026 6.99469 4.91026C5.72498 4.91026 4.68945 5.99058 4.68945 7.29019Z'
                            fill='#307777'
                          />
                        </svg>
                      </span>
                      <p>2239 Hog Camp Road Schaumburg</p>
                    </div>
                  </li>
                  <li>
                    <div className='abou-li-div'>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 16 15'
                          fill='none'>
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M11.9512 0C13.024 0 14.056 0.441667 14.8152 1.23417C15.5752 2.025 16 3.09167 16 4.20833V10.7917C16 13.1167 14.184 15 11.9512 15H4.048C1.8152 15 0 13.1167 0 10.7917V4.20833C0 1.88333 1.8072 0 4.048 0H11.9512ZM13.224 5.44987L13.288 5.3832C13.4792 5.14153 13.4792 4.79153 13.2792 4.54987C13.168 4.4257 13.0152 4.34987 12.856 4.3332C12.688 4.32403 12.528 4.3832 12.4072 4.49987L8.79999 7.49987C8.33599 7.9007 7.67119 7.9007 7.19999 7.49987L3.59999 4.49987C3.35119 4.3082 3.00719 4.3332 2.79999 4.5582C2.58399 4.7832 2.55999 5.14153 2.74319 5.39153L2.84799 5.49987L6.48799 8.4582C6.93599 8.82487 7.47919 9.02487 8.04799 9.02487C8.61519 9.02487 9.16799 8.82487 9.61519 8.4582L13.224 5.44987Z'
                            fill='#307777'
                          />
                        </svg>
                      </span>

                      <p>charles5182@ummoh.com</p>
                    </div>
                  </li>
                  <li>
                    <div className='abou-li-div'>
                      {" "}
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'>
                          <path
                            d='M12.9335 9.90336C12.3961 9.78777 11.971 10.0373 11.5946 10.2551C11.2091 10.4797 10.4761 11.0743 10.056 10.9221C7.90487 10.0364 5.88171 8.15363 5.00591 5.9939C4.85155 5.56478 5.4434 4.82713 5.66626 4.4371C5.88253 4.05954 6.12686 3.63042 6.01543 3.08904C5.91472 2.60254 4.61217 0.94511 4.15158 0.491875C3.84781 0.19249 3.53662 0.0278285 3.21718 0.00121652C2.01616 -0.0503442 0.674813 1.5522 0.439562 1.93557C-0.149804 2.75306 -0.146502 3.84082 0.449467 5.15978C1.88574 8.7025 7.31798 14.049 10.874 15.5393C11.5302 15.8462 12.1303 16 12.6693 16C13.1968 16 13.6665 15.8528 14.0701 15.5609C14.3747 15.3854 16.0429 13.9775 15.9992 12.7442C15.9727 12.4298 15.8085 12.1155 15.513 11.8111C15.0631 11.3462 13.4163 10.0048 12.9335 9.90336Z'
                            fill='#307777'
                          />
                        </svg>
                      </span>
                      <span>33757005467</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <div className='prof-ful-work-edu-div'>
              <div className='prof-work-edu-div'>
                <div
                  onClick={() => handleTextClick(1)}
                  className={`prof-about-side-bar-li ${
                    activeDiv === 1 ? "active-prof-about" : ""
                  }`}>
                  <h6 className='about-profile-bartext'>Work and Education </h6>
                </div>
                <div
                  onClick={() => handleTextClick(2)}
                  className={`prof-about-side-bar-li ${
                    activeDiv === 2 ? "active-prof-about" : ""
                  }`}>
                  <h6 className='about-profile-bartext'>
                    Contact and Basic info
                  </h6>
                </div>
                <div
                  onClick={() => handleTextClick(3)}
                  className={`prof-about-side-bar-li ${
                    activeDiv === 3 ? "active-prof-about" : ""
                  }`}>
                  <h6 className='about-profile-bartext'>Details About you </h6>
                </div>
              </div>

              <div>
                {activeDiv === 1 && (
                  <div className=''>
                    <div className='ab-prf-full-div'>
                      <div className='abot-edu-work-tag-div'>
                        <h6 className='abt-add-tags'>Add Workplace </h6>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span>
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <Image
                                  className='prfworkabt-img'
                                  src={prfworkabt2}
                                  width={40}
                                  height={40}
                                  alt=''
                                />
                              </div>
                              <div>
                                {/* className='wr-statsn-tags'
                                className='wr-stasn-texts' */}
                                <h5 className='wr-statsn-tags'>
                                  Former UX UI Designer & Researcher at Kinoyee
                                  IT.
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Dhaka, Bangladesh
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <Image
                                  className='prfworkabt-img'
                                  src={prfworkabt1}
                                  width={40}
                                  height={40}
                                  alt=''
                                />
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  Former UX UI Designer & Researcher at Kinoyee
                                  IT.
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Dhaka, Bangladesh
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <Image
                                  className='prfworkabt-img'
                                  src={prfworkabt1}
                                  width={40}
                                  height={40}
                                  alt=''
                                />
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  UX Engineer at Pakiza Software Ltd.
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Dhaka, Bangladesh
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='ab-prf-full-div'>
                      <div className='abot-edu-work-tag-div'>
                        <h6 className='abt-add-tags'>Add Education </h6>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span>
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <Image
                                  className='prfworkabt-img'
                                  src={prfworkabt3}
                                  width={40}
                                  height={40}
                                  alt=''
                                />
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  UX Engineer at Pakiza Software Ltd.
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Dhaka, Bangladesh
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <Image
                                  className='prfworkabt-img'
                                  src={prfworkabt4}
                                  width={40}
                                  height={40}
                                  alt=''
                                />
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  UX Engineer at Pakiza Software Ltd.
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Dhaka, Bangladesh
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <Image
                                  className='prfworkabt-img'
                                  src={prfworkabt1}
                                  width={40}
                                  height={40}
                                  alt=''
                                />
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  UX Engineer at Pakiza Software Ltd.
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Dhaka, Bangladesh
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
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
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span>
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='31'
                                  height='24'
                                  viewBox='0 0 31 24'
                                  fill='none'>
                                  <path
                                    d='M17.8487 13.7072L20.4968 16.3553C20.8529 16.7114 20.8529 17.2887 20.4968 17.6448C18.5716 19.57 15.5237 19.7867 13.3456 18.1531L11.7702 16.9715C10.0266 15.6638 8.47782 14.115 7.17017 12.3715L5.98861 10.7961C4.35501 8.61794 4.57162 5.57005 6.49683 3.64483C6.85293 3.28873 7.43027 3.28873 7.78637 3.64483L10.4345 6.29295C10.825 6.68348 10.825 7.31664 10.4345 7.70717L9.41335 8.72832C9.25106 8.8906 9.21083 9.13852 9.31347 9.34379C10.5001 11.7171 12.4245 13.6415 14.7979 14.8282C15.0031 14.9308 15.2511 14.8906 15.4133 14.7283L16.4345 13.7072C16.825 13.3166 17.4582 13.3166 17.8487 13.7072Z'
                                    stroke='#222222'
                                    stroke-width='1.5'
                                  />
                                </svg>
                              </div>
                              <div>
                                {/* className='wr-statsn-tags'
                                className='wr-stasn-texts' */}
                                <h5 className='wr-statsn-tags'>01518-88888</h5>
                                <span className='wr-stasn-texts'>Mobile</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='31'
                                  height='24'
                                  viewBox='0 0 31 24'
                                  fill='none'>
                                  <path
                                    d='M17.8487 13.7072L20.4968 16.3553C20.8529 16.7114 20.8529 17.2887 20.4968 17.6448C18.5716 19.57 15.5237 19.7867 13.3456 18.1531L11.7702 16.9715C10.0266 15.6638 8.47782 14.115 7.17017 12.3715L5.98861 10.7961C4.35501 8.61794 4.57162 5.57005 6.49683 3.64483C6.85293 3.28873 7.43027 3.28873 7.78637 3.64483L10.4345 6.29295C10.825 6.68348 10.825 7.31664 10.4345 7.70717L9.41335 8.72832C9.25106 8.8906 9.21083 9.13852 9.31347 9.34379C10.5001 11.7171 12.4245 13.6415 14.7979 14.8282C15.0031 14.9308 15.2511 14.8906 15.4133 14.7283L16.4345 13.7072C16.825 13.3166 17.4582 13.3166 17.8487 13.7072Z'
                                    stroke='#222222'
                                    stroke-width='1.5'
                                  />
                                </svg>
                              </div>
                              <div>
                                {/* className='wr-statsn-tags'
                                className='wr-stasn-texts' */}
                                <h5 className='wr-statsn-tags'>01518-88888</h5>
                                <span className='wr-stasn-texts'>Mobile</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='31'
                                  height='24'
                                  viewBox='0 0 31 24'
                                  fill='none'>
                                  <path
                                    d='M5.16992 10.7139C5.16992 9.39965 5.16992 8.74255 5.51488 8.2341C5.85984 7.72565 6.47042 7.48279 7.69159 6.99708L13.7483 4.58806C14.4784 4.29766 14.8435 4.15246 15.2266 4.15246C15.6098 4.15246 15.9748 4.29766 16.705 4.58806L22.7617 6.99708C23.9828 7.48279 24.5934 7.72565 24.9384 8.2341C25.2833 8.74255 25.2833 9.39965 25.2833 10.7139V16.0001C25.2833 17.8857 25.2833 18.8285 24.6976 19.4143C24.1118 20.0001 23.169 20.0001 21.2833 20.0001H9.16992C7.2843 20.0001 6.34149 20.0001 5.75571 19.4143C5.16992 18.8285 5.16992 17.8857 5.16992 16.0001V10.7139Z'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M5.16992 10.0001L8.39458 12.5652C8.7485 12.8468 9.1874 13.0001 9.63966 13.0001H20.8136C21.2659 13.0001 21.7048 12.8468 22.0587 12.5652L25.2833 10.0001'
                                    stroke='#222222'
                                    stroke-linecap='round'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  shantoshah1921@gmail.com
                                </h5>
                                <span className='wr-stasn-texts'>Email</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='ab-prf-full-div'>
                      <div className='abot-edu-work-tag-div'>
                        <h6 className='abt-add-tags'>
                          Websites and Others links{" "}
                        </h6>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span>
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='31'
                                  height='24'
                                  viewBox='0 0 31 24'
                                  fill='none'>
                                  <circle
                                    cx='12.1416'
                                    cy='12.0001'
                                    r='8'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M18.3491 6.78491C17.6163 7.46094 16.696 8.00918 15.6522 8.3915C14.6084 8.77382 13.466 8.98106 12.3046 8.99882C11.1432 9.01657 9.99054 8.8444 8.9268 8.49429C7.86306 8.14418 6.91375 7.62453 6.14485 6.97145'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M18.4638 17.3236C17.7242 16.6081 16.7783 16.0275 15.6969 15.6251C14.6156 15.2228 13.4269 15.0092 12.2199 15.0003C11.0129 14.9915 9.81883 15.1876 8.72722 15.574C7.6356 15.9604 6.67472 16.527 5.91655 17.2315'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M12.1416 4.00006V20.0001'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M20.1416 12.0001H4.1416'
                                    stroke='#222222'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  www.shantoshah.info
                                </h5>
                                <span className='wr-stasn-texts'>Website</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt5-img-div'>
                                <Image
                                  className='prfworkabt-img'
                                  src={prfworkabt5}
                                  width={30}
                                  height={25}
                                  alt=''
                                />
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  www.linkedin.com/shanto
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Dhaka, Bangladesh
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='ab-prf-full-div'>
                      <div className='abot-edu-work-tag-div'>
                        <h6 className='abt-add-tags'>Basic information </h6>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span>
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'>
                                  <circle
                                    cx='12'
                                    cy='10'
                                    r='3'
                                    stroke='#222222'
                                    stroke-linecap='round'
                                  />
                                  <circle
                                    cx='12'
                                    cy='12'
                                    r='9'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M18 18.7059C17.6461 17.6427 16.8662 16.7033 15.7814 16.0332C14.6966 15.3632 13.3674 15 12 15C10.6326 15 9.30341 15.3632 8.21858 16.0332C7.13375 16.7033 6.35391 17.6427 6 18.7059'
                                    stroke='#222222'
                                    stroke-linecap='round'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>Male</h5>
                                <span className='wr-stasn-texts'>Gender</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'>
                                  <path
                                    d='M3 10C3 9.05719 3 8.58579 3.29289 8.29289C3.58579 8 4.05719 8 5 8H19C19.9428 8 20.4142 8 20.7071 8.29289C21 8.58579 21 9.05719 21 10V11.5C21 11.9659 21 12.1989 20.9239 12.3827C20.8224 12.6277 20.6277 12.8224 20.3827 12.9239C20.1989 13 19.9659 13 19.5 13V13C19.0341 13 18.8011 13 18.6173 13.0761C18.3723 13.1776 18.1776 13.3723 18.0761 13.6173C18 13.8011 18 14.0341 18 14.5V18C18 18.9428 18 19.4142 17.7071 19.7071C17.4142 20 16.9428 20 16 20H8C7.05719 20 6.58579 20 6.29289 19.7071C6 19.4142 6 18.9428 6 18V14.5C6 14.0341 6 13.8011 5.92388 13.6173C5.82239 13.3723 5.62771 13.1776 5.38268 13.0761C5.19891 13 4.96594 13 4.5 13V13C4.03406 13 3.80109 13 3.61732 12.9239C3.37229 12.8224 3.17761 12.6277 3.07612 12.3827C3 12.1989 3 11.9659 3 11.5V10Z'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M5 13H19'
                                    stroke='#222222'
                                    stroke-linecap='round'
                                  />
                                  <path
                                    d='M12 7L12 20'
                                    stroke='#222222'
                                    stroke-linecap='round'
                                  />
                                  <path
                                    d='M12 7L11.1214 6.12144C10.0551 5.05514 8.75521 4.25174 7.3246 3.77487V3.77487C6.18099 3.39366 5 4.24487 5 5.45035V5.63246C5 6.44914 5.52259 7.1742 6.29737 7.43246L8 8'
                                    stroke='#222222'
                                    stroke-linecap='round'
                                  />
                                  <path
                                    d='M12 7L12.8786 6.12144C13.9449 5.05514 15.2448 4.25174 16.6754 3.77487V3.77487C17.819 3.39366 19 4.24487 19 5.45035V5.63246C19 6.44914 18.4774 7.1742 17.7026 7.43246L16 8'
                                    stroke='#222222'
                                    stroke-linecap='round'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  1999 August 25
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Birth date
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='ab-prf-full-div'>
                      <div className='abot-edu-work-tag-div'>
                        <h6 className='abt-add-tags'>Language </h6>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span>
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='31'
                                  height='24'
                                  viewBox='0 0 31 24'
                                  fill='none'>
                                  <path
                                    d='M5.91276 17H12.2266C13.8834 17 15.2266 18.3431 15.2266 20V10C15.2266 7.17157 15.2266 5.75736 14.3479 4.87868C13.4692 4 12.055 4 9.22657 4H5.91276C4.96995 4 4.49855 4 4.20566 4.29289C3.91276 4.58579 3.91276 5.05719 3.91276 6V15C3.91276 15.9428 3.91276 16.4142 4.20566 16.7071C4.49855 17 4.96995 17 5.91276 17Z'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M24.5404 17H18.2266C16.5697 17 15.2266 18.3431 15.2266 20V10C15.2266 7.17157 15.2266 5.75736 16.1052 4.87868C16.9839 4 18.3981 4 21.2266 4H24.5404C25.4832 4 25.9546 4 26.2475 4.29289C26.5404 4.58579 26.5404 5.05719 26.5404 6V15C26.5404 15.9428 26.5404 16.4142 26.2475 16.7071C25.9546 17 25.4832 17 24.5404 17Z'
                                    stroke='#222222'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>English</h5>
                                <span className='wr-stasn-texts'>Language</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='31'
                                  height='24'
                                  viewBox='0 0 31 24'
                                  fill='none'>
                                  <path
                                    d='M5.91276 17H12.2266C13.8834 17 15.2266 18.3431 15.2266 20V10C15.2266 7.17157 15.2266 5.75736 14.3479 4.87868C13.4692 4 12.055 4 9.22657 4H5.91276C4.96995 4 4.49855 4 4.20566 4.29289C3.91276 4.58579 3.91276 5.05719 3.91276 6V15C3.91276 15.9428 3.91276 16.4142 4.20566 16.7071C4.49855 17 4.96995 17 5.91276 17Z'
                                    stroke='#222222'
                                  />
                                  <path
                                    d='M24.5404 17H18.2266C16.5697 17 15.2266 18.3431 15.2266 20V10C15.2266 7.17157 15.2266 5.75736 16.1052 4.87868C16.9839 4 18.3981 4 21.2266 4H24.5404C25.4832 4 25.9546 4 26.2475 4.29289C26.5404 4.58579 26.5404 5.05719 26.5404 6V15C26.5404 15.9428 26.5404 16.4142 26.2475 16.7071C25.9546 17 25.4832 17 24.5404 17Z'
                                    stroke='#222222'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>Bangla</h5>
                                <span className='wr-stasn-texts'>Language</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          {/* <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <Image
                                  className='prfworkabt-img'
                                  src={prfworkabt2}
                                  width={40}
                                  height={40}
                                  alt=''
                                />
                              </div>
                              <div>
                                <h5>UX Engineer at Pakiza Software Ltd.</h5>
                                <span>Dhaka, Bangladesh</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div> */}
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
                        {/* <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span> */}
                      </div>
                      <div>
                        <div className='abt-add-textp-div'>
                          <p className='abt-add-textp'>
                            I am a highly skilled UX/UI designer with a passion
                            for creating exceptional user experiences. With 2
                            years of experience in the field, I specialize in
                            crafting intuitive interfaces that seamlessly blend
                            user needs with business objectives. My goal is to
                            empathize with users, understand their pain points,
                            and translate those insights into impactful design
                            solutions.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='ab-prf-full-div'>
                      <div className='abot-edu-work-tag-div'>
                        <h6 className='abt-add-tags'>Places lived </h6>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span>
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='39'
                                  height='24'
                                  viewBox='0 0 39 24'
                                  fill='none'>
                                  <path
                                    d='M17.8487 13.7071L20.4968 16.3552C20.8529 16.7113 20.8529 17.2887 20.4968 17.6448C18.5716 19.57 15.5237 19.7866 13.3456 18.153L11.7702 16.9714C10.0266 15.6638 8.47782 14.115 7.17017 12.3714L5.98861 10.796C4.35501 8.61788 4.57162 5.56999 6.49683 3.64477C6.85293 3.28867 7.43027 3.28867 7.78637 3.64477L10.4345 6.29289C10.825 6.68342 10.825 7.31658 10.4345 7.70711L9.41335 8.72825C9.25106 8.89054 9.21083 9.13846 9.31347 9.34373C10.5001 11.7171 12.4245 13.6415 14.7979 14.8281C15.0031 14.9308 15.2511 14.8905 15.4133 14.7283L16.4345 13.7071C16.825 13.3166 17.4582 13.3166 17.8487 13.7071Z'
                                    stroke='#222222'
                                    stroke-width='1.5'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  Dhaka, Bangladesh
                                </h5>
                                <span className='wr-stasn-texts'>
                                  Current city
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='39'
                                  height='24'
                                  viewBox='0 0 39 24'
                                  fill='none'>
                                  <path
                                    d='M17.8487 13.7071L20.4968 16.3552C20.8529 16.7113 20.8529 17.2887 20.4968 17.6448C18.5716 19.57 15.5237 19.7866 13.3456 18.153L11.7702 16.9714C10.0266 15.6638 8.47782 14.115 7.17017 12.3714L5.98861 10.796C4.35501 8.61788 4.57162 5.56999 6.49683 3.64477C6.85293 3.28867 7.43027 3.28867 7.78637 3.64477L10.4345 6.29289C10.825 6.68342 10.825 7.31658 10.4345 7.70711L9.41335 8.72825C9.25106 8.89054 9.21083 9.13846 9.31347 9.34373C10.5001 11.7171 12.4245 13.6415 14.7979 14.8281C15.0031 14.9308 15.2511 14.8905 15.4133 14.7283L16.4345 13.7071C16.825 13.3166 17.4582 13.3166 17.8487 13.7071Z'
                                    stroke='#222222'
                                    stroke-width='1.5'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>
                                  Mirpur, Dhaka, Bangladesh
                                </h5>
                                <span className='wr-stasn-texts'>Hometown</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='ab-prf-full-div'>
                      <div className='abot-edu-work-tag-div'>
                        <h6 className='abt-add-tags'>Relationship </h6>
                        {/* <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span> */}
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='31'
                                  height='24'
                                  viewBox='0 0 31 24'
                                  fill='none'>
                                  <path
                                    d='M6.77731 14.6858L14.7413 20.6371C14.9196 20.7703 15.0087 20.8369 15.107 20.8612C15.1857 20.8807 15.2681 20.8807 15.3468 20.8612C15.4451 20.8369 15.5343 20.7703 15.7125 20.6371L23.6765 14.6858C26.5257 12.5566 26.8504 8.40641 24.3669 5.86008C21.9711 3.40371 17.8993 3.87922 16.1339 6.82153L15.8357 7.31867C15.5599 7.77826 14.8939 7.77826 14.6181 7.31867L14.3199 6.82153C12.5546 3.87922 8.48269 3.40371 6.08692 5.86008C3.60342 8.40641 3.92807 12.5566 6.77731 14.6858Z'
                                    fill='#7E869E'
                                    fill-opacity='0.25'
                                    stroke='#222222'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>Single</h5>
                                <span className='wr-stasn-texts'>
                                  Relationship
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='ab-prf-full-div'>
                      <div className='abot-edu-work-tag-div'>
                        <h6 className='abt-add-tags'>Nickname </h6>
                        {/* <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'>
                            <circle cx='10' cy='10' r='7.5' fill='#307777' />
                            <path
                              d='M10 6.66669L10 13.3334'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                            <path
                              d='M13.3333 10L6.66659 10'
                              stroke='white'
                              stroke-width='1.2'
                              stroke-linecap='round'
                            />
                          </svg>
                        </span> */}
                      </div>
                      <div>
                        <div className='row'>
                          <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                            <div className='prfworkabt-full-img-div'>
                              <div className='prfworkabt-img-div'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='39'
                                  height='24'
                                  viewBox='0 0 39 24'
                                  fill='none'>
                                  <path
                                    d='M9.71037 15.4156L18.7123 20.7667C18.845 20.8456 18.9114 20.8851 18.9815 20.9029C19.0623 20.9235 19.147 20.9235 19.2279 20.9029C19.298 20.8851 19.3643 20.8456 19.4971 20.7667L28.499 15.4155C32.3794 13.1088 32.784 7.64591 29.2858 4.7927C26.7466 2.72177 22.9953 3.17488 21.0223 5.79082L19.8657 7.32427C19.4844 7.82993 18.725 7.82993 18.3436 7.32427L17.1871 5.79082C15.2141 3.17488 11.4627 2.72177 8.92359 4.7927C5.42535 7.64591 5.82995 13.1088 9.71037 15.4156Z'
                                    fill='#7E869E'
                                    fill-opacity='0.25'
                                    stroke='#222222'
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5 className='wr-statsn-tags'>Shanto</h5>
                                <span className='wr-stasn-texts'>Nickname</span>
                              </div>
                            </div>
                          </div>
                          <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                            <span
                              className='abt-three-dots'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='15'
                                height='4'
                                viewBox='0 0 15 4'
                                fill='none'>
                                <path
                                  d='M1.85185 6.47576e-09C0.833333 2.91409e-09 2.91409e-09 0.9 6.47576e-09 2C1.00374e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 1.00374e-08 1.85185 6.47576e-09ZM12.963 4.53303e-08C11.9444 4.17687e-08 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 4.8892e-08 12.963 4.53303e-08ZM7.40741 2.5903e-08C6.38889 2.23414e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 2.94647e-08 7.40741 2.5903e-08Z'
                                  fill='#307777'
                                />
                              </svg>
                            </span>

                            <ul class='dropdown-menu abt-wr-drops'>
                              <span className='abt-wr-ed-tag'>
                                Edit options
                              </span>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M4.5 3C3.67157 3 3 3.67157 3 4.5V6H17V4.5C17 3.67157 16.3284 3 15.5 3H4.5Z'
                                        fill='#2C6ECB'
                                      />
                                      <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M4 15.5C4 16.3284 4.67157 17 5.5 17H14.5C15.3284 17 16 16.3284 16 15.5V8H4V15.5ZM7 11H13V13H7V11Z'
                                        fill='#2C6ECB'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr'>Edit</span>
                                </div>
                              </li>
                              <li>
                                <div className='share-popup'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'>
                                      <path
                                        d='M8 3.99388C8 2.89269 8.89543 2 10 2C11.1046 2 12 2.89269 12 3.99388H16C16.5523 3.99388 17 4.44023 17 4.99082C17 5.54142 16.5523 5.98776 16 5.98776H4C3.44772 5.98776 3 5.54142 3 4.99082C3 4.44023 3.44772 3.99388 4 3.99388H8Z'
                                        fill='#D72C0D'
                                      />
                                      <path
                                        d='M5 14.5076V8H7V14.5076C7 14.7829 7.22386 15.0061 7.5 15.0061H9V8H11L11 15.0061H12.5C12.7761 15.0061 13 14.7829 13 14.5076V8H15V14.5076C15 15.8841 13.8807 17 12.5 17H7.5C6.11929 17 5 15.8841 5 14.5076Z'
                                        fill='#D72C0D'
                                      />
                                    </svg>
                                  </span>
                                  <span className='share-text-wr-dlt'>
                                    Delete
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'></div>
        </div>
      </div>
    </div>
  );
};

export default page;
