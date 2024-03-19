"use client";
import React, { useState } from "react";
import PostOverViewIcon1 from "../../../public/postOvervie1.svg";
import PostOverViewIcon2 from "../../../public/postOvervie2.svg";
import PostOverViewIcon3 from "../../../public/postOvervie3.svg";
import PostOverViewIcon4 from "../../../public/postOvervie4.svg";
import PostOverViewIcon5 from "../../../public/postOvervie5.svg";
import checkdash from "../../../public/checkdash.svg";
import "../../assets/css/profile.css";
import Image from "next/image";

const DashboardOverview = () => {
  const [activeAccordion, setActiveAccordion] = useState("");
  const [activeAccordion2, setActiveAccordion2] = useState("");
  const [activeAccordion3, setActiveAccordion3] = useState("");

  const handleAccordionClick = (accordionId) => {
    setActiveAccordion((prevAccordion) =>
      prevAccordion === accordionId ? "" : accordionId
    );
  };

  const isAccordionExpanded = (accordionId) => {
    return activeAccordion === accordionId;
  };

  const toggleAccordion = (accordionId) => {
    if (isAccordionExpanded(accordionId)) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(accordionId);
    }
  };

  const handleAccordionClicks = (accordionId) => {
    setActiveAccordion2((prevAccordions) =>
      prevAccordions === accordionId ? "" : accordionId
    );
  };

  const isAccordionExpanded2 = (accordionId) => {
    return activeAccordion2 === accordionId;
  };

  const toggleAccordion2 = (accordionId) => {
    if (isAccordionExpanded2(accordionId)) {
      setActiveAccordion2("");
    } else {
      setActiveAccordion2(accordionId);
    }
  };

  const handleAccordionClick3 = (accordionId) => {
    setActiveAccordion3((prevAccordion3) =>
      prevAccordion3 === accordionId ? "" : accordionId
    );
  };

  const isAccordionExpanded3 = (accordionId) => {
    return activeAccordion3 === accordionId;
  };

  const toggleAccordion3 = (accordionId) => {
    if (isAccordionExpanded3(accordionId)) {
      setActiveAccordion3("");
    } else {
      setActiveAccordion3(accordionId);
    }
  };

  return (
    <div>
      <div className=''>
        <div>
          <div className='page-dashboard-header-div'>
            <h5 className='page-dashboard-header-tag'>
              Welcome to professional dashboard
            </h5>
            <p className='page-dashboard-header-text'>
              Insights, management tools and ad creation - all in one place.
            </p>
          </div>

          <div className='post-overview-full-div'>
            <div>
              <h4>Page Overview</h4>
              <h6>Followers: 1.50k</h6>
              <p>Last 28 days</p>
            </div>

            <div className=' post-overview-chart-full-div'>
              <div className='post-overview-chart-div'>
                <div className='post-overview-chart'>
                  <Image
                    src={PostOverViewIcon1}
                    width={24}
                    height={24}
                    alt=''
                  />
                  <p className='post-overview-chart-textp1'>Post Reach</p>

                  <Image
                    src={PostOverViewIcon5}
                    width={24}
                    height={24}
                    alt=''
                  />
                </div>
                <div className='post-overview-chart-textp2'>
                  {" "}
                  <p>1.20 k</p>
                </div>
              </div>
              <div className='post-overview-chart-div'>
                <div className='post-overview-chart'>
                  <Image
                    src={PostOverViewIcon2}
                    width={24}
                    height={24}
                    alt=''
                  />
                  <p className='post-overview-chart-textp1'>Post Engagement</p>

                  <Image
                    src={PostOverViewIcon5}
                    width={24}
                    height={24}
                    alt=''
                  />
                </div>
                <div className='post-overview-chart-textp2'>
                  {" "}
                  <p>1.20 k</p>
                </div>
              </div>
              <div className='post-overview-chart-div'>
                <div className='post-overview-chart'>
                  <Image
                    src={PostOverViewIcon3}
                    width={24}
                    height={24}
                    alt=''
                  />
                  <p className='post-overview-chart-textp1'>New page likes</p>

                  <Image
                    src={PostOverViewIcon5}
                    width={24}
                    height={24}
                    alt=''
                  />
                </div>
                <div className='post-overview-chart-textp2'>
                  {" "}
                  <p>1.20 k</p>
                </div>
              </div>
              <div className='post-overview-chart-div'>
                <div className='post-overview-chart'>
                  <Image
                    src={PostOverViewIcon4}
                    width={24}
                    height={24}
                    alt=''
                  />
                  <p className='post-overview-chart-textp1'>New Followers</p>

                  <Image
                    src={PostOverViewIcon5}
                    width={24}
                    height={24}
                    alt=''
                  />
                </div>
                <div className='post-overview-chart-textp2'>
                  {" "}
                  <p>1.20 k</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='row'>
              <div className='col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                <div className='das-sec-side-div'>
                  <div className='das-sec-side-tag-div'>
                    <p>
                      <strong>To grow your audience,</strong> finish setting up
                      your Page
                    </p>
                    <p>
                      Adding more details can help more people connect with you.
                    </p>
                    <p>8 of 13 steps completed</p>
                  </div>

                  <div>
                    <div className='accordion' id='accordionExample'>
                      <div className='accordion-item'>
                        <p>Completed</p>
                        <div className='accor-tag-div'>
                          <h6 className='accordion-header'>
                            <div
                              className={`accordion-button ${
                                isAccordionExpanded("collapseOne")
                                  ? ""
                                  : "collapsed"
                              }`}
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#collapseOne'
                              aria-expanded={isAccordionExpanded("collapseOne")}
                              aria-controls='collapseOne'
                              onClick={() =>
                                handleAccordionClick("collapseOne")
                              }>
                              Establish your page’s identity
                            </div>
                          </h6>

                          <div>
                            {isAccordionExpanded("collapseOne") ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-chevron-up'
                                viewBox='0 0 16 16'
                                onClick={() => toggleAccordion("collapseOne")}>
                                <path
                                  fill-rule='evenodd'
                                  d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-chevron-down'
                                viewBox='0 0 16 16'
                                onClick={() => toggleAccordion("collapseOne")}>
                                <path
                                  fill-rule='evenodd'
                                  d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div
                          id='collapseOne'
                          className={`accordion-collapse collapse ${
                            isAccordionExpanded("collapseOne") ? "show" : ""
                          }`}
                          data-bs-parent='#accordionExample'>
                          <div className='accordion-body'>
                            <ul>
                              <li className='accor-Establish'>
                                <h6 className='accor-Establish-h6'>
                                  {" "}
                                  <span>
                                    <Image
                                      src={checkdash}
                                      width={20}
                                      height={20}
                                      alt=''
                                    />
                                  </span>
                                  Add a profile picture
                                </h6>
                                <p className='completed-text'>completed</p>
                              </li>
                              <li className='accor-Establish'>
                                <h6 className='accor-Establish-h6'>
                                  {" "}
                                  <span>
                                    <Image
                                      src={checkdash}
                                      width={20}
                                      height={20}
                                      alt=''
                                    />
                                  </span>
                                  Add a profile picture
                                </h6>
                                <p className='completed-text'>completed</p>
                              </li>
                              <li className='accor-Establish'>
                                <h6 className='accor-Establish-h6'>
                                  {" "}
                                  <span>
                                    <Image
                                      src={checkdash}
                                      width={20}
                                      height={20}
                                      alt=''
                                    />
                                  </span>
                                  Add a profile picture
                                </h6>
                                <p className='completed-text'>completed</p>
                              </li>
                              <li className='accor-Establish'>
                                <h6 className='accor-Establish-h6'>
                                  {" "}
                                  <span>
                                    <Image
                                      src={checkdash}
                                      width={20}
                                      height={20}
                                      alt=''
                                    />
                                  </span>
                                  Add a profile picture
                                </h6>
                                <p className='completed-text'>completed</p>
                              </li>
                              <li className='accor-Establish'>
                                <h6 className='accor-Establish-h6'>
                                  {" "}
                                  <span>
                                    <Image
                                      src={checkdash}
                                      width={20}
                                      height={20}
                                      alt=''
                                    />
                                  </span>
                                  Add a profile picture
                                </h6>
                                <p className='completed-text'>completed</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className='accordion-item'>
                        <p>4 steps left</p>
                        <div className='accor-tag-div'>
                          <h6 className='accordion-header'>
                            <div
                              className={`accordion-button ${
                                isAccordionExpanded2("collapseTwo")
                                  ? ""
                                  : "collapsed"
                              }`}
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#collapseTwo'
                              aria-expanded={isAccordionExpanded2(
                                "collapseTwo"
                              )}
                              aria-controls='collapseTwo'
                              onClick={() =>
                                handleAccordionClicks("collapseTwo")
                              }>
                              Provide info and preferences
                            </div>
                          </h6>

                          <div>
                            {isAccordionExpanded2("collapseTwo") ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-chevron-up'
                                viewBox='0 0 16 16'
                                onClick={() => toggleAccordion2("collapseTwo")}>
                                <path
                                  fill-rule='evenodd'
                                  d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-chevron-down'
                                viewBox='0 0 16 16'
                                onClick={() => toggleAccordion2("collapseTwo")}>
                                <path
                                  fill-rule='evenodd'
                                  d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div
                          id='collapseTwo'
                          className={`accordion-collapse collapse ${
                            isAccordionExpanded2("collapseTwo") ? "show" : ""
                          }`}
                          data-bs-parent='#accordionExample'>
                          <div className='accordion-body'>
                            <ul>
                              <li className='provide-li-div'>
                                <h6 className='accor-Establish-h6'>
                                  Location info
                                </h6>
                                <p className='completed-text'>
                                  Do you want your Page to display a business
                                  address or service area?
                                </p>

                                <div className='Provide-btn-div'>
                                  <button className='Provide-btn'>
                                    Add location info
                                  </button>
                                  <p>
                                    More
                                    <span>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-chevron-down'
                                        viewBox='0 0 16 16'
                                        onClick={() =>
                                          toggleAccordion2("collapseTwo")
                                        }>
                                        <path
                                          fill-rule='evenodd'
                                          d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                        />
                                      </svg>
                                    </span>
                                  </p>
                                </div>
                              </li>
                              <li className='provide-li-div'>
                                <h6 className='accor-Establish-h6'>
                                  Location info
                                </h6>
                                <p className='completed-text'>
                                  Do you want your Page to display a business
                                  address or service area?
                                </p>

                                <div className='Provide-btn-div'>
                                  <button className='Provide-btn'>
                                    Add location info
                                  </button>
                                  <p>
                                    More
                                    <span>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-chevron-down'
                                        viewBox='0 0 16 16'
                                        onClick={() =>
                                          toggleAccordion2("collapseTwo")
                                        }>
                                        <path
                                          fill-rule='evenodd'
                                          d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                        />
                                      </svg>
                                    </span>
                                  </p>
                                </div>
                              </li>
                              <li className='provide-li-div'>
                                <h6 className='accor-Establish-h6'>
                                  Location info
                                </h6>
                                <p className='completed-text'>
                                  Do you want your Page to display a business
                                  address or service area?
                                </p>

                                <div className='Provide-btn-div'>
                                  <button className='Provide-btn'>
                                    Add location info
                                  </button>
                                  <p>
                                    More
                                    <span>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-chevron-down'
                                        viewBox='0 0 16 16'
                                        onClick={() =>
                                          toggleAccordion2("collapseTwo")
                                        }>
                                        <path
                                          fill-rule='evenodd'
                                          d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                        />
                                      </svg>
                                    </span>
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className='accordion-item'>
                        <p>1 steps left</p>
                        <div className='accor-tag-div'>
                          <h6 className='accordion-header'>
                            <div
                              className={`accordion-button ${
                                isAccordionExpanded2("collapsethree")
                                  ? ""
                                  : "collapsed"
                              }`}
                              type='button'
                              data-bs-toggle='collapse'
                              data-bs-target='#collapsethree'
                              aria-expanded={isAccordionExpanded3(
                                "collapsethree"
                              )}
                              aria-controls='collapsethree'
                              onClick={() =>
                                handleAccordionClick3("collapsethree")
                              }>
                              Introduce your Page
                            </div>
                          </h6>

                          <div>
                            {isAccordionExpanded3("collapsethree") ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-chevron-up'
                                viewBox='0 0 16 16'
                                onClick={() =>
                                  toggleAccordion3("collapsethree")
                                }>
                                <path
                                  fill-rule='evenodd'
                                  d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-chevron-down'
                                viewBox='0 0 16 16'
                                onClick={() =>
                                  toggleAccordion3("collapsethree")
                                }>
                                <path
                                  fill-rule='evenodd'
                                  d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div
                          id='collapsethree'
                          className={`accordion-collapse collapse ${
                            isAccordionExpanded3("collapsethree") ? "show" : ""
                          }`}
                          data-bs-parent='#accordionExample'>
                          <div className='accordion-body'>
                            <ul>
                              <li className='provide-li-div'>
                                <h6 className='accor-Establish-h6'>
                                  Invite your connections to like your page
                                </h6>
                                <p className='completed-text'>
                                  Make ie easy for people to do things like call
                                  or book with you. This button appears at the
                                  top.
                                </p>

                                <div className='Provide-btn-div'>
                                  <button className='Provide-btn'>
                                    Invite connections
                                  </button>
                                  <p>
                                    More
                                    <span>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        className='bi bi-chevron-down'
                                        viewBox='0 0 16 16'
                                        onClick={() =>
                                          toggleAccordion3("collapsethree")
                                        }>
                                        <path
                                          fill-rule='evenodd'
                                          d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                        />
                                      </svg>
                                    </span>
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                <div>
                  <div className='page-dashss-full-div'>
                    <div className='page-dashss-div'>
                      <div>
                        <h6>Recent Contents </h6>
                      </div>

                      <div>
                        <select
                          className='form-select form-select-sm dash-select'
                          aria-label='Small select example'>
                          <option selected>Last 28 days</option>

                          <option value='1'>Last 20 weeks</option>

                          <option value='2'>Last 10 days</option>
                        </select>
                      </div>
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

export default DashboardOverview;
