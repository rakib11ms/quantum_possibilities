"use client";
import React, { useState } from "react";
import Navbar from "../../component/navbar/page";
import Cover from "../../../public/profile-cover.png";
import ProfileAuthor from "../../../public/connectionsone.png";
import Image from "next/image";
import prfworkabt1 from "../../../public/prfworkabt1.png";
import prfworkabt2 from "../../../public/prfworkabt2.png";
import prfworkabt3 from "../../../public/prfworkabt3.png";
import prfworkabt4 from "../../../public/prfworkabt4.png";
import prfworkabt5 from "../../../public/linkdinIcon.png";
import connectionsOne from "../../../public/connectionsone.png";
import connectionsTwo from "../../../public/connectionstwo.png";
import connectionsThree from "../../../public/connectionsthree.png";

const page = () => {
  const [activeDiv, setActiveDiv] = useState(1);

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };

    const connectionsData = [
      {
        id: 1,
        name: "Michel jordan",
        image: connectionsTwo.src,
      },
      {
        id: 2,
        name: "Kristina catthy",
        image: connectionsOne.src,
      },
      {
        id: 3,
        name: "Steav Jonson",
        image: connectionsThree.src,
      },
      {
        id: 4,
        name: "Kristina catthy",
        image: connectionsTwo.src,
      },
      {
        id: 5,
        name: "Steav Jonson",
        image: connectionsOne.src,
      },
      {
        id: 6,
        name: "Kristina catthy",
        image: connectionsThree.src,
      },
      // Add more fake data as needed
    ];
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div>
          <div className='Profi-Cov-div'>
            <img className='Profi-Cov' src={Cover.src} alt='' />

            <div className='Upload-Cove-hoto-text-div'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 39 33'
                  fill='none'>
                  <path
                    d='M14.7463 17.5558C14.7463 15.0477 16.8743 13.0146 19.4994 13.0146C22.1246 13.0146 24.2526 15.0477 24.2526 17.5558C24.2526 20.0638 22.1246 22.097 19.4994 22.097C16.8743 22.097 14.7463 20.0638 14.7463 17.5558Z'
                    fill='white'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M9.93744 6.74258C9.93744 3.23975 12.9096 0.400146 16.5759 0.400146H22.4228C26.0892 0.400146 29.0613 3.23975 29.0613 6.74258C29.0613 6.77253 29.0854 6.79746 29.1167 6.79989L33.8267 7.16535C35.9366 7.32905 37.6717 8.81966 38.0655 10.8067C39.0704 15.8773 39.1453 21.0762 38.287 26.1713L38.0815 27.3908C37.6943 29.6895 35.714 31.4383 33.2851 31.6268L29.1819 31.9451C22.7375 32.4452 16.2613 32.4452 9.81688 31.9451L5.71367 31.6268C3.28473 31.4383 1.30452 29.6895 0.917256 27.3908L0.711812 26.1713C-0.146571 21.0762 -0.0716413 15.8773 0.933258 10.8067C1.32706 8.81966 3.06221 7.32905 5.17204 7.16535L9.88213 6.79989C9.91337 6.79746 9.93744 6.77253 9.93744 6.74258ZM19.4994 9.98711C15.1243 9.98711 11.5775 13.3757 11.5775 17.5558C11.5775 21.7358 15.1243 25.1244 19.4994 25.1244C23.8746 25.1244 27.4214 21.7358 27.4214 17.5558C27.4214 13.3757 23.8746 9.98711 19.4994 9.98711Z'
                    fill='white'
                  />
                </svg>
              </span>
              <p>Upload Cover Photo</p>
            </div>
          </div>

          <div className=''>
            <div className='container'>
              <div className='body-part'>
                <div className='row'>
                  <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 '>
                    <div className='prof-auth-name-img-div'>
                      <div className='profilesss-container'>
                        <div className='profile-img-div'>
                          <img
                            className='profile-img'
                            src={ProfileAuthor.src}
                            alt=''
                          />

                          <div className='svg-overlay'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='28'
                              height='28'
                              viewBox='0 0 28 28'
                              fill='none'>
                              <rect
                                opacity='0.7'
                                width='27.6923'
                                height='27.6923'
                                rx='7'
                                fill='#BCBCBC'
                              />
                              <path
                                d='M11.5366 13.8732C11.5366 12.6547 12.5705 11.6669 13.8458 11.6669C15.1212 11.6669 16.1551 12.6547 16.1551 13.8732C16.1551 15.0916 15.1212 16.0794 13.8458 16.0794C12.5705 16.0794 11.5366 15.0916 11.5366 13.8732Z'
                                fill='black'
                              />
                              <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M9.20033 8.61979C9.20033 6.91802 10.6443 5.53845 12.4255 5.53845H15.2661C17.0473 5.53845 18.4913 6.91802 18.4913 8.61979C18.4913 8.63435 18.503 8.64646 18.5182 8.64764L20.8065 8.82519C21.8315 8.90472 22.6745 9.6289 22.8658 10.5943C23.354 13.0577 23.3904 15.5835 22.9734 18.0589L22.8736 18.6513C22.6854 19.7681 21.7234 20.6177 20.5433 20.7093L18.5499 20.8639C15.419 21.1069 12.2726 21.1069 9.14175 20.8639L7.14829 20.7093C5.96824 20.6177 5.00619 19.7681 4.81805 18.6513L4.71824 18.0589C4.30121 15.5835 4.33761 13.0577 4.82582 10.5943C5.01714 9.6289 5.86013 8.90472 6.88515 8.82519L9.17345 8.64764C9.18863 8.64646 9.20033 8.63435 9.20033 8.61979ZM13.8458 10.1961C11.7202 10.1961 9.99711 11.8424 9.99711 13.8732C9.99711 15.904 11.7202 17.5502 13.8458 17.5502C15.9714 17.5502 17.6946 15.904 17.6946 13.8732C17.6946 11.8424 15.9714 10.1961 13.8458 10.1961Z'
                                fill='black'
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className='prof-info-texts-div'>
                        <h3 className='prof-info-texts-h'>Tasluf Morshed</h3>
                        <p className='prof-info-texts-p'>
                          Information Technology and Services San Francisco,
                          California 42,835 followers
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 '>
                    <div className='post-follower-following-div'>
                      <div>
                        <p>129</p>
                        <p>Posts</p>
                      </div>
                      <div>
                        <p>129</p>
                        <p>Posts</p>
                      </div>
                      <div>
                        <p>129</p>
                        <p>Posts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='prof-timelines-divs'>
                <div className='row'>
                  <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-lx-3'>
                    <div className='prof-edi-btn-div'>
                      {" "}
                      <button className='prof-edi-btn'>Edit Profile</button>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-9 col-lg-9 col-lx-9'>
                    <ul className='profile-menu'>
                      <li>
                        <a href='12-FavouritePage.html' className='active'>
                          Timeline
                        </a>
                      </li>
                      <li>
                        <a href='13-FavouritePage-About.html'>About</a>
                      </li>
                      <li>
                        <a href='07-ProfilePage-Photos.html'>Photos</a>
                      </li>
                      <li>
                        <a href='09-ProfilePage-Videos.html'>Videos</a>
                      </li>
                      <li>
                        <a href='14-FavouritePage-Statistics.html'>
                          Statistics
                        </a>
                      </li>
                      <li>
                        <a href='15-FavouritePage-Events.html'>Events</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className='control-block-button'>
                  <a href='#' className='btn btn-control bg-primary'>
                    <svg className='olymp-star-icon'>
                      <use xlinkHref='../svg-icons/sprites/icons.svg#olymp-star-icon' />
                    </svg>
                  </a>
                  <a href='#' className='btn btn-control bg-purple'>
                    <svg className='olymp-chat---messages-icon'>
                      <use xlinkHref='../svg-icons/sprites/icons.svg#olymp-chat---messages-icon' />
                    </svg>
                  </a>
                </div> */}
              </div>

              <div>
                <div className='row'>
                  <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                    <div style={{ background: "white" }}>
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
                                        <rect
                                          width='24'
                                          height='24'
                                          fill='white'
                                        />
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
                                        <rect
                                          width='24'
                                          height='24'
                                          fill='white'
                                        />
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
                      <div>
                        <div className='connections-div container-fluid'>
                          <div className='connec-mob-texts-div '>
                            <h5>Connennections</h5>
                            <h6 className='connec-101-text-h6'>
                              See all connections
                            </h6>
                          </div>
                          <p className='connec-101-text'>101 Connections</p>

                          <div className='connections-map '>
                            {connectionsData.map((item) => (
                              <div key={item.id} className='indi-card-div'>
                                <img
                                  className='connections-map-image'
                                  src={item.image}
                                  alt={item.name}
                                />
                                <p className='indi-card-prof-text'>
                                  <strong>{item.name}</strong>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className='connections-div container-fluid'>
                          <div className='photos-mob-texts-div '>
                            <h5>Photos</h5>
                            <h6 className='connec-101-text-h6'>See all</h6>
                          </div>
                          <p className='connec-101-text'>101 Connections</p>

                          <div className='connections-map '>
                            {connectionsData.map((item) => (
                              <div key={item.id} className='indi-card-div'>
                                <img
                                  className='connections-map-image'
                                  src={item.image}
                                  alt={item.name}
                                />
                                <p className='indi-card-prof-text'>
                                  <strong>{item.name}</strong>
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                    <div className='prof-ful-work-edu-div'>
                      <div>Comming</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
