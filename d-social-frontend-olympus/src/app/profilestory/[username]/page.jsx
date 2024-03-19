"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import ProfileHeader from "@/component/ProfileHeader";
import React, { useEffect, useState } from "react";
import "../../../assets/css/profile.css";
import { useParams } from "next/navigation";
import axiosInstance from "../../../../utils/axios";
import imgl3 from "../../../../public/imgl3.jpg";
import imgl2 from "../../../../public/imgl2.jpg";
import { host } from "@/environment";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex === activeTab ? null : tabIndex);
  };

  const [storyList, setStoryList] = useState([]);

  useEffect(() => {
    const formData = {
      username: params.username,
    };
    axiosInstance.post("/api/get-users-latest-story", formData).then((res) => {
      if (res.data.status == 200) {
        setStoryList(res.data.storylist);
      }
    });
  }, []);
  function formatDate(timestamp) {
    const now = moment();
    const postTime = moment(timestamp);
    const diffMinutes = now.diff(postTime, "minutes");

    if (diffMinutes < 1) {
      return "a few seconds ago";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (now.isSame(postTime, "day")) {
      return `${Math.round(diffMinutes / 60)} hours ago`;
    } else {
      return postTime.format("LLL");
    }
  }


  console.log("storyList", storyList);
  return (
    <div>
      <Masterdashboardlayout headerName='Photos'>
        <div>
          <div className='profile-phot-header-div'>
            <ProfileHeader active={"profilestory"} />
          </div>

          <div className='profile-all-photos-div'>
            <div>
              <div className='photos-text-one-div'>
                <h6>My Story</h6>
                {/* <button className='photos-add-div'>Add photos/videos</button> */}
              </div>

              <div>
                <div className='photos'>
                  <div className='tab-pro-photo-header'>
                    <div
                      className={`tab-pro-photo ${activeTab === 1 ? "active-tab-pro-photo" : ""
                        }`}
                      onClick={() => handleTabClick(1)}>
                      My Archive Stories
                    </div>
                    <div></div>
                  </div>

                  <div className='tab-pro-photo-content'>
                    {activeTab === 1 && (
                      <div>

                        <div className='pho-grd-div'>
                          {storyList.map((src, index) => (
                            <Link href={`/profilestory/singlestory/${src._id}`}>
                              <div className='archive-stories-div p-2' style={{
                                backgroundColor: src.color
                                  ? src.color
                                  : "black",
                              }}>
                                <div className='archive-stories-text-div'>
                                  <span className='date-text-arch'>{formatDate(src.createdAt)}</span>
                                  <div className='arch-active-color' />
                                </div>
                                {
                                  src.media != null && src.media != "" ?
                                    <div className='date-img-arch-div'>
                                      <img
                                        src={`${host}/uploads/story/${src.media}`}
                                        className='archived-pic'
                                        alt=''
                                      />
                                    </div>


                                    :
                                    <>
                                      {
                                        src.title != null && src.title != "" ?

                                          <div className={`date-text-arch-div  ${src.text_alignment == "center" ? 'justify-content-center' : ''} `}>
                                            <p className={`${src.text_position}  ${src.text_alignment}`}>{src.title}</p>
                                          </div>

                                          :
                                          <></>
                                      }

                                    </>
                                }

                              </div>
                            </Link>
                          ))}

                          {/* <div className='archive-stories-div p-2'>
                            <div className='archive-stories-text-div'>
                              <span className='date-text-arch'>Dec 21</span>
                              <div className='arch-active-color' />
                            </div>
                            <div className='date-text-arch-div'>
                              <p>Ek din Sudin asbe, R dekhben ami nai</p>
                            </div>
                          </div>
                          <div className='archive-stories-div '>
                            <div className='archive-stories-text-div p-2'>
                              <span className='date-text-arch'>Dec 21</span>
                              <div className='arch-active-color' />
                            </div>
                            <div className='date-img-arch-div'>
                              <img
                                src={imgl3.src}
                                className='archived-pic'
                                alt=''
                              />
                            </div>
                          </div>
                          <div className='archive-stories-div p-2'>
                            <div className='archive-stories-text-div'>
                              <span className='date-text-arch'>Dec 21</span>
                              <div className='arch-active-color' />
                            </div>
                            <div className='date-text-arch-div'>
                              <p>Ek din Sudin asbe, R dekhben ami nai</p>
                            </div>
                          </div>
                          <div className='archive-stories-div p-2'>
                            <div className='archive-stories-text-div'>
                              <span className='date-text-arch'>Dec 21</span>
                              <div className='arch-active-color' />
                            </div>
                            <div className='date-text-arch-div'>
                              <p>Ek din Sudin asbe, R dekhben ami nai</p>
                            </div>
                          </div>
                          <div className='archive-stories-div p-2'>
                            <div className='archive-stories-text-div'>
                              <span className='date-text-arch'>Dec 21</span>
                              <div className='arch-active-color' />
                            </div>
                            <div className='date-text-arch-div'>
                              <p>Ek din Sudin asbe, R dekhben ami nai</p>
                            </div>
                          </div>
                          <div className='archive-stories-div p-2'>
                            <div className='archive-stories-text-div'>
                              <span className='date-text-arch'>Dec 21</span>
                              <div className='arch-active-color' />
                            </div>
                            <div className='date-text-arch-div'>
                              <p>Ek din Sudin asbe, R dekhben ami nai</p>
                            </div>
                          </div> */}
                        </div>
                        {/* {storyList.map((src, index) => (
                          <div key={index} className='phto-itm-div'>
                            <img
                              src={`${host}/uploads/posts/${src.media}`}
                              className='prof-phtos-imge'
                              alt={`Photo ${index + 1}`}
                            />

                            <div className='moress'>
                              <div className='dots-threess-div'>
                                {" "}
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  fill='currentColor'
                                  className='bi bi-three-dots dots-threess'
                                  viewBox='0 0 16 16'>
                                  <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                                </svg>
                              </div>
                            </div>

                            <ul className='m-d'>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      className='bi bi-person-square'
                                      viewBox='0 0 16 16'>
                                      <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                      <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z' />
                                    </svg>
                                  </span>
                                  Make as profile picture
                                </p>
                              </li>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      class='bi bi-image-fill'
                                      viewBox='0 0 16 16'>
                                      <path d='M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z' />
                                    </svg>
                                  </span>
                                  Make as Cover photo
                                </p>
                              </li>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      class='bi bi-download'
                                      viewBox='0 0 16 16'>
                                      <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
                                      <path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
                                    </svg>
                                  </span>
                                  Download
                                </p>
                              </li>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      class='bi bi-exclamation-octagon'
                                      viewBox='0 0 16 16'>
                                      <path d='M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z' />
                                      <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
                                    </svg>
                                  </span>
                                  Report
                                </p>
                              </li>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      class='bi bi-trash3'
                                      viewBox='0 0 16 16'>
                                      <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
                                    </svg>
                                  </span>
                                  Delete
                                </p>
                              </li>
                            </ul>
                          </div>
                        ))} */}
                      </div>
                    )}

                    {/* {activeTab === 2 && (
                      <div className='photo-grid'>
                        {imageSourcesalbum.map((src, index) => (
                          <div key={index} className='photo-item'>
                            <img src={src} alt={`Photo ${index + 1}`} />

                            <div className=' moress'>
                              <div className='dots-threess-div'>
                                {" "}
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  fill='currentColor'
                                  className='bi bi-three-dots dots-threess'
                                  viewBox='0 0 16 16'>
                                  <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                                </svg>
                              </div>
                            </div>

                            <ul className='m-d'>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      className='bi bi-person-square'
                                      viewBox='0 0 16 16'>
                                      <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                      <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z' />
                                    </svg>
                                  </span>
                                  Make as profile picture
                                </p>
                              </li>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      class='bi bi-image-fill'
                                      viewBox='0 0 16 16'>
                                      <path d='M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z' />
                                    </svg>
                                  </span>
                                  Make as Cover photo
                                </p>
                              </li>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      class='bi bi-download'
                                      viewBox='0 0 16 16'>
                                      <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
                                      <path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
                                    </svg>
                                  </span>
                                  Download
                                </p>
                              </li>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      class='bi bi-exclamation-octagon'
                                      viewBox='0 0 16 16'>
                                      <path d='M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z' />
                                      <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
                                    </svg>
                                  </span>
                                  Report
                                </p>
                              </li>
                              <li>
                                <p className='more-text-div'>
                                  <span>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      fill='currentColor'
                                      class='bi bi-trash3'
                                      viewBox='0 0 16 16'>
                                      <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
                                    </svg>
                                  </span>
                                  Delete
                                </p>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default Page;
