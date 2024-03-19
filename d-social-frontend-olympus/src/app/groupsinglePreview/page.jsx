"use client";
import React, { useState } from "react";
import authImage from "../../../public/img/author-page.jpg";
import gM1 from "../../../public/gM1.png";
import gM2 from "../../../public/gM2.png";
import gM3 from "../../../public/gM3.png";
import gM4 from "../../../public/gM4.png";
import groupPostImg from "../../../public/groupPostImg.png";
import PicFile from "../../../public/picFile.svg";
import LocationFile from "../../../public/locationFile.svg";
import GCmntIcon from "../../../public/gcmnticon.svg";
import GShareIcon from "../../../public/gshareicon.svg";
import GAuth from "../../../public/gAuth.svg";
import GLove from "../../../public/gLove.svg";

import GroupRules from "../../../public/groupRules.svg";
import Pending from "../../../public/pending.svg";
import Schaduale from "../../../public/schaduale.svg";
import Activity from "../../../public/activity.svg";
import Community from "../../../public/community.svg";
import Moderation from "../../../public/moderation.svg";
import Groupstatus from "../../../public/groupstatus.svg";
import GSettings from "../../../public/gSettings.svg";
import Growth from "../../../public/Growth.svg";
import Engagements from "../../../public/engagements.svg";
import Admin from "../../../public/admin.svg";
import Participant from "../../../public/participant.svg";
import HelpCenter from "../../../public/helpCenter.svg";
import Commsupport from "../../../public/commsupport.svg";

import Event from "../../component/AllGroups/Events";
import { host } from "@/environment";
import { useParams } from "next/navigation";
import Image from "next/image";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import GroupPeople from "@/component/AllGroups/GroupPeople";
import GroupMedia from "@/component/AllGroups/GroupMedia";

const pagePreview = () => {
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [isCoverHovered, setIsCoverHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [activeDiv, setActiveDiv] = useState(1);
  const [activeDivs, setActiveDivs] = useState(1);

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };

  const handleTextClicks = (divId) => {
    setActiveDivs(divId);
  };

  const params = useParams();
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // /mbSliderthree.png"

  const handleCoverImageClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent double triggering
    const fileInput = document.getElementById("fileCoverInput");
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleImageClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent double triggering
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleCoverFileChange = (e) => {
    const formData = new FormData();
    formData.append("cover_pic", e.target.files[0]);
    axiosInstance
      .post(`/api/change-only-cover-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res pro pic", res);
        // setprofileImage(res.data.user_info.profile_pic);
        if (res.data.status == 200) {
          setCoverImage(res.data.user_info[0].cover_pic);
          localStorage.removeItem("userInfo");
          localStorage.setItem("userInfo", JSON.stringify(res.data.user_info));
          // router.refresh();
          toast(res.data.message, {
            type: "success",
            position: "top-right",
          });
          window.location.reload();
        }
      });
  };

  return (
    <Masterdashboardlayout>
      <div className='row no-gutters'>
        <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 '>
          <div className='group-left-side-div '>
            <div className='demo-text-tag-div'>
              <h4 className='demo-text'> Demo Group</h4>
              <p className='demo-textp'>Public group | 13.7K Members</p>
              <div className='left-btn-btn'>
                <button className='left-invite-btn'>Invite</button>
                <button className='left-dots-btn'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-three-dots'
                    viewBox='0 0 16 16'>
                    <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='demo-actives-div'>
              <div
                onClick={() => handleTextClick(1)}
                className={`dashboard-side-bar-li ${activeDiv === 1 ? "active-das" : ""
                  }`}>
                <div className='dashboard-side-text-div'>
                  <h6>Community Home</h6>
                </div>
              </div>
              <div
                onClick={() => handleTextClick(2)}
                className={`dashboard-side-bar-li ${activeDiv === 2 ? "active-das" : ""
                  }`}>
                <div className='dashboard-side-text-div'>
                  <h6>Group overview</h6>
                </div>
              </div>
            </div>

            <div className='demo-Management-tools-div'>
              <h6>Management tools</h6>
              <ul className='management-tools-ul'>
                <li className='side-nav'>
                  <Image src={GroupRules.src} height={20} width={20} alt='' />
                  <span> Group rules</span>
                </li>
                <li className='side-nav'>
                  <Image src={Pending.src} height={20} width={20} alt='' />
                  <span> Pending approvals</span>
                </li>
                <li className='side-nav'>
                  <Image src={Schaduale.src} height={20} width={20} alt='' />
                  <span> Scheduled post</span>
                </li>
                <li className='side-nav'>
                  <Image src={Activity.src} height={20} width={20} alt='' />
                  <span> Activity log</span>
                </li>
                <li className='side-nav'>
                  <Image src={Community.src} height={20} width={20} alt='' />
                  <span> Community roles</span>
                </li>
                <li className='side-nav'>
                  <Image src={Moderation.src} height={20} width={20} alt='' />
                  <span> Moderation alerts</span>
                </li>
                <li className='side-nav'>
                  <Image src={Groupstatus.src} height={20} width={20} alt='' />
                  <span> Group status</span>
                </li>
              </ul>
            </div>

            <div className='group-side-comp-div'>
              <h6>Settings</h6>
              <ul className='management-tools-ul'>
                <li className='side-nav'>
                  <Image src={GSettings.src} height={20} width={20} alt='' />
                  <span>Group settings</span>
                </li>
              </ul>
            </div>

            <div className='group-side-comp-div'>
              <h6>Insights</h6>
              <ul className='management-tools-ul'>
                <li className='side-nav'>
                  <Image src={Growth.src} height={20} width={20} alt='' />
                  <span>Growth</span>
                </li>
                <li className='side-nav'>
                  <Image src={Engagements.src} height={20} width={20} alt='' />
                  <span>Engagements</span>
                </li>
                <li className='side-nav'>
                  <Image src={Admin.src} height={20} width={20} alt='' />
                  <span>Admin & Moderators</span>
                </li>
                <li className='side-nav'>
                  <Image src={Participant.src} height={20} width={20} alt='' />
                  <span>Participant</span>
                </li>
              </ul>
            </div>

            <div className='support-side-comp-div'>
              <h6>Support</h6>
              <ul className='management-tools-ul'>
                <li className='side-nav'>
                  <Image src={HelpCenter.src} height={20} width={20} alt='' />
                  <span>Help center</span>
                </li>
                <li className='side-nav'>
                  <Image src={Commsupport.src} height={20} width={20} alt='' />
                  <span>Community support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10'>
          {activeDiv === 1 && (
            <div>
              <div className='group-pagePreview'>
                <div>
                  <div
                    className='top-header-thumb'
                    onMouseEnter={() => setIsCoverHovered(true)}
                    onMouseLeave={() => setIsCoverHovered(false)}
                    onClick={handleCoverImageClick}
                    style={{ cursor: "pointer" }}>
                    <img
                      className='cover-pic'
                      src={
                        coverImage == "" || coverImage == null
                          ? `${host}/uploads/cover_pic.png`
                          : `${host}/uploads/${coverImage}`
                      }
                      alt='nature'
                    />
                    {isCoverHovered && (
                      <div className='cover-camera-icon'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-camera camera-icon-i'
                          viewBox='0 0 16 16'>
                          <path d='M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z' />
                          <path d='M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z' />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className='preview-group-demo-text-div'>
                      <h5 className='group-demo-text-h5'>Demo Group </h5>
                      <div className='group-demo-btn-div'>
                        <div className='gr-input-search-div'>
                          <span>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              class='bi bi-search'
                              viewBox='0 0 16 16'>
                              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                            </svg>
                          </span>
                          <input
                            className='gr-input-search'
                            type='search'
                            placeholder='Search Here'
                          />
                        </div>

                        <div className="pt-5">
                          <button className='group-demo-invite-btn'>
                            + Invite{" "}
                          </button>
                        </div>

                        <button className='group-demo-dots-btn'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            class='bi bi-reply-fill'
                            viewBox='0 0 16 16'>
                            <path d='M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z' />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='group-right-nav-full-div'>
                    <div className='group-right-nav-div'>
                      <div
                        onClick={() => handleTextClicks(1)}
                        className={`dashboard-side-bar-lis ${activeDivs === 1 ? "active-dass" : ""
                          }`}>
                        Discussion
                      </div>
                      <div
                        onClick={() => handleTextClicks(2)}
                        className={`dashboard-side-bar-lis ${activeDivs === 2 ? "active-dass" : ""
                          }`}>
                        Events
                      </div>
                      <div
                        onClick={() => handleTextClicks(3)}
                        className={`dashboard-side-bar-lis ${activeDivs === 3 ? "active-dass" : ""
                          }`}>
                        Media
                      </div>
                      <div
                        onClick={() => handleTextClicks(4)}
                        className={`dashboard-side-bar-lis ${activeDivs === 4 ? "active-dass" : ""
                          }`}>
                        People
                      </div>
                    </div>
                  </div>

                  <div>
                    {activeDivs === 1 && (
                      <div>
                        <div className='group-post-inputs-div '>
                          <div className='row mt-2 '>
                            <div className='col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 '>
                              <div className='g-cmnt-auth-img-full-div '>
                                <div className='g-cmnt-auth-img-div'>
                                  <div>
                                    <img
                                      className='g-cmnt-auth-img'
                                      src={authImage.src}
                                      alt=''
                                    />
                                  </div>
                                  <div className='group-demo-input-div'>
                                    <input
                                      className='group-demo-input'
                                      type='text'
                                      placeholder='Share what you are thinking'
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className='g-photo-vid-loc-post-div'>
                                    <div>
                                      <Image
                                        src={PicFile}
                                        width={20}
                                        height={20}
                                        alt=''
                                      />
                                      <span>Photos</span>
                                    </div>
                                    <div>
                                      <Image
                                        src={PicFile}
                                        width={20}
                                        height={20}
                                        alt=''
                                      />
                                      <span>Photos</span>
                                    </div>
                                    <div>
                                      <Image
                                        src={LocationFile}
                                        width={20}
                                        height={20}
                                        alt=''
                                      />
                                      <span>Photos</span>
                                    </div>
                                  </div>

                                  <div>
                                    <button className='g-photo-vid-loc-post-btn'>
                                      Post
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className='group-feed-post-full-div '>
                                <div className='group-feed-post-div'>
                                  <div>
                                    <img
                                      className='g-cmnt-auth-img'
                                      src={authImage.src}
                                      alt=''
                                    />
                                  </div>
                                  <div>
                                    <h6>James Rodrigue </h6>
                                    <span className='g-post-tag-head'>
                                      Shared a link
                                    </span>
                                    <p className='g-post-tag-head'>
                                      September 3 at 2.06 | 3425 QPoints
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <p className='g-cmnt-text'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Vestibulum interdum
                                    ullamcorper lorem, vel tincidunt tortor
                                    luctus vel. Curabitur aliquam leo vel urna
                                    faucibus aliquet. Nulla convallis enim
                                    tellus. Interdum et malesuada fames ac ante
                                    ipsum primis in faucibus. Cras lacinia neque
                                    sed luctus vehicula. Fusce iaculis nunc
                                  </p>
                                </div>

                                <div className='grou-post-img-div'>
                                  <img
                                    className='group-post-img'
                                    src={groupPostImg.src}
                                    alt=''
                                  />
                                </div>

                                <div>
                                  <div className='g-post-bottom-content-div'>
                                    <div className='g-post-bottom-content-one'>
                                      <Image
                                        src={GLove}
                                        width={20}
                                        height={20}
                                        alt=''
                                      />
                                      <Image
                                        src={GAuth}
                                        width={20}
                                        height={20}
                                        alt=''
                                      />
                                      <p className='text-reaction-number'>
                                        <strong>Jenny, Robert</strong> and 18
                                        more liked this
                                      </p>
                                    </div>

                                    <div className='g-post-bottom-content-one'>
                                      <div className='g-post-bottom-single-content'>
                                        <Image
                                          src={GCmntIcon}
                                          width={20}
                                          height={20}
                                          alt=''
                                        />
                                        <p className='text-reaction-number'>
                                          0 Comments
                                        </p>
                                      </div>
                                      <div className='g-post-bottom-single-content'>
                                        <Image
                                          src={GShareIcon}
                                          width={20}
                                          height={20}
                                          alt=''
                                        />
                                        <p className='text-reaction-number'>
                                          15 Shares
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 '>
                              <div className='g-rit-div'>
                                <div className='g-right-full-div'>
                                  <div className='g-right-input-icon-div'>
                                    <span>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='gray'
                                        className='bi bi-search'
                                        viewBox='0 0 16 16'>
                                        <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                                      </svg>
                                    </span>
                                    <input
                                      className='g-right-input'
                                      type='search'
                                      placeholder='search here'
                                    />
                                  </div>
                                </div>

                                <div className='group-feed-div'>
                                  <div className='g-right-feed'>Feed</div>
                                  <div className='g-right-feed'>Photos</div>
                                  <div className='g-right-feed'> Videos</div>
                                  <div className='g-right-feed'> Featured</div>
                                  <div className='g-right-feed'>Members</div>
                                  <div className='g-right-feed'>Your Posts</div>
                                </div>

                                <div className='bio-full-div'>
                                  <h6>Bio</h6>
                                  <div className='halfBorder' />
                                  <p>
                                    There are many variations of passages of
                                    Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by
                                    injected humour, or randomised words which
                                    don't look even slightly believable. If you
                                    are going to use a passage of Lorem Ipsum,
                                    you need to be sure there isn't anything
                                    embarrassing hidden humour, or randomised
                                    words which don't look even slightly
                                    believable. If you are going to use a
                                    passage of Lorem Ipsum.
                                  </p>
                                  <div className='halfBorder' />

                                  <div className='mt-3'>
                                    <div className='group-bio-public-div'>
                                      <span>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='16'
                                          fill='currentColor'
                                          class='bi bi-globe-americas'
                                          viewBox='0 0 16 16'>
                                          <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z' />
                                        </svg>
                                      </span>
                                      <div>
                                        <p className='group-bio-public-text'>
                                          Public
                                        </p>
                                        <p className='group-bio-public-textsec'>
                                          Anyone can see who's in the group and
                                          what they post
                                        </p>
                                      </div>
                                    </div>
                                    <div className='group-bio-public-div'>
                                      <span>
                                        {/* <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='16'
                                          fill='currentColor'
                                          class='bi bi-globe-americas'
                                          viewBox='0 0 16 16'>
                                          <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z' />
                                        </svg> */}
                                      </span>
                                      <div>
                                        <p className='ml-3 group-bio-public-text'>
                                          Dhaka, Bangladesh
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className='group-media-full-div'>
                                  <h5>Media</h5>
                                  <div className='group-media-div'>
                                    <img
                                      className='group-media-img'
                                      src={gM1.src}
                                      alt=''
                                    />
                                    <img
                                      className='group-media-img'
                                      src={gM2.src}
                                      alt=''
                                    />
                                    <img
                                      className='group-media-img'
                                      src={gM3.src}
                                      alt=''
                                    />
                                    <img
                                      className='group-media-img'
                                      src={gM4.src}
                                      alt=''
                                    />
                                    <img
                                      className='group-media-img'
                                      src={gM3.src}
                                      alt=''
                                    />
                                    <img
                                      className='group-media-img'
                                      src={gM2.src}
                                      alt=''
                                    />
                                    <img
                                      className='group-media-img'
                                      src={gM1.src}
                                      alt=''
                                    />
                                    <img
                                      className='group-media-img'
                                      src={gM4.src}
                                      alt=''
                                    />
                                    <img
                                      className='group-media-img'
                                      src={gM1.src}
                                      alt=''
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {activeDivs === 2 && (
                      <div>
                        <Event />
                      </div>
                    )}
                  </div>
                  <div>
                    {activeDivs === 3 && (
                      <div>
                        <GroupMedia />
                      </div>
                    )}
                  </div>
                  <div>
                    {activeDivs === 4 && (
                      <div>
                        <GroupPeople />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDiv === 2 && (
            <div>
              <div className='m-4'>
                <h3>Comming Soon</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </Masterdashboardlayout>
  );
};

export default pagePreview;
