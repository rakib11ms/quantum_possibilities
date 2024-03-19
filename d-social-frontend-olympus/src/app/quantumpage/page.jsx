"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useState } from "react";
import Sidenav1 from "../../../public/pageSide_1.png";
import Sidenav2 from "../../../public/pageSide_2.png";
import Sidenav3 from "../../../public/pageSide_3.png";
import Sidenav4 from "../../../public/pageSide_4.png";
import Sidenav5 from "../../../public/pageSide_5.png";
import Sidenav6 from "../../../public/pageSide_6.png";
import Image from "next/image";
import CreatePage from "./createPageOne";
import Discover from "./discover";
import FollowedPage from "./followedPage";
import Invite from "./Invite";
import MyPage from "./myPage";
import "../../assets/css/main.css";
import FeatureUser from "@/component/NewsFeed/FeatureUser";
import Leftsidebar from "@/component/leftsidebar/page";
const Page = () => {
  const [activeDiv, setActiveDiv] = useState(3);

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };

  return (
    // <div className="header-spacer">
    //   <div className="row">
    //     <div className="col-md-12 col-lg-10 col-xl-10">
    //       <Masterdashboardlayout>
    //         <div className="mob-create-pagediv">
    //           <div className="row">
    //             <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"></div>
    //             <Leftsidebar />
    //             <div className="col-12 col-sm-6 col-md-8 col-lg-9 col-xl-9">
    //               <div className="prof-side-top-bar-sec">
    //                 <div className="container-fluid px-3">
    //                   <ul className="page-top-menu-bar">
    //                     <li
    //                       onClick={() => handleTextClick(1)}
    //                       className={`prof-side-top-bar-li ${
    //                         activeDiv === 1 ? "active" : ""
    //                       }`}
    //                     >
    //                       <Image
    //                         src={Sidenav5}
    //                         width={17}
    //                         height={10}
    //                         alt="page-nav"
    //                       />
    //                       <div className="prof-side-text-div">
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           width="16"
    //                           height="16"
    //                           fill="white"
    //                           className="bi bi-plus-lg"
    //                           viewBox="0 0 16 16"
    //                         >
    //                           <path
    //                             fillRule="evenodd"
    //                             d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
    //                           />
    //                         </svg>
    //                         <span className="prof-side-text">Create page</span>
    //                       </div>
    //                     </li>
    //                     {/* <li
    //                       onClick={() => handleTextClick(2)}
    //                       className={`prof-side-bar-li-sec ${
    //                         activeDiv === 2 ? "active" : ""
    //                       }`}
    //                     >
    //                       <Image
    //                         src={Sidenav4}
    //                         width={17}
    //                         height={10}
    //                         alt="page-nav"
    //                       />
    //                       <div className="prof-side-text-div">
    //                         <p className="prof-side-text">
    //                           Quantum Market suite
    //                         </p>
    //                       </div>
    //                     </li> */}
    //                     <li
    //                       onClick={() => handleTextClick(3)}
    //                       className={`prof-side-bar-li-sec ${
    //                         activeDiv === 3 ? "active" : ""
    //                       }`}
    //                     >
    //                       <Image
    //                         src={Sidenav3}
    //                         width={17}
    //                         height={10}
    //                         alt="page-nav"
    //                       />
    //                       <div className="prof-side-text-div">
    //                         <span className="prof-side-text">Discover</span>
    //                       </div>
    //                     </li>
    //                     <li
    //                       onClick={() => handleTextClick(4)}
    //                       className={`prof-side-bar-li-sec ${
    //                         activeDiv === 4 ? "active" : ""
    //                       }`}
    //                     >
    //                       <Image
    //                         src={Sidenav2}
    //                         width={17}
    //                         height={10}
    //                         alt="page-nav"
    //                       />
    //                       <div className="prof-side-text-div">
    //                         <span className="prof-side-text">
    //                           Followed page
    //                         </span>
    //                       </div>
    //                     </li>
    //                     <li
    //                       onClick={() => handleTextClick(5)}
    //                       className={`prof-side-bar-li-sec ${
    //                         activeDiv === 5 ? "active" : ""
    //                       }`}
    //                     >
    //                       <Image
    //                         src={Sidenav1}
    //                         width={17}
    //                         height={10}
    //                         alt="page-nav"
    //                       />
    //                       <div className="prof-side-text-div">
    //                         <span className="prof-side-text">Invites</span>
    //                       </div>
    //                     </li>
    //                     {/* </ul>
    //               <ul className="create-mob-sidebar-div"> */}
    //                     <li
    //                       onClick={() => handleTextClick(6)}
    //                       className={`prof-side-bar-li-sec ${
    //                         activeDiv === 6 ? "active" : ""
    //                       }`}
    //                     >
    //                       <Image
    //                         src={Sidenav6}
    //                         width={17}
    //                         height={10}
    //                         alt="page-nav"
    //                       />
    //                       <div className="prof-side-text-div">
    //                         <span className="prof-side-text">My Pages</span>
    //                       </div>
    //                     </li>
    //                   </ul>
    //                 </div>
    //               </div>
    //               <div className="mt-3">
    //                 {activeDiv === 1 && (
    //                   <div>
    //                     <CreatePage />
    //                   </div>
    //                 )}
    //                 {activeDiv === 2 && <div>Comming Soon</div>}
    //                 {activeDiv === 3 && (
    //                   <div>
    //                     <Discover />
    //                   </div>
    //                 )}
    //                 {activeDiv === 4 && (
    //                   <div>
    //                     <FollowedPage />
    //                   </div>
    //                 )}
    //                 {activeDiv === 5 && (
    //                   <div>
    //                     <Invite />
    //                   </div>
    //                 )}
    //                 {activeDiv === 6 && (
    //                   <div>
    //                     <MyPage />
    //                   </div>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </Masterdashboardlayout>
    //     </div>
    //     <div className="ui-block col-lg-2">
    //       <div className="header-spacer" />
    //       <FeatureUser />
    //     </div>
    //   </div>
    // </div>

    <Masterdashboardlayout headerName="FriendRequest">
      <div className="container-fluid ">
        <div className="row">


          <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
            <Leftsidebar />
          </aside>

          <main className="col col-xl-8 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
            <div className="col-12 col-sm-6 col-md-8 col-lg-12 col-xl-12">
              <div className="prof-side-top-bar-sec">
                <div className="container-fluid px-3">
                  <ul className="page-top-menu-bar">
                    <li
                      onClick={() => handleTextClick(1)}
                      className={`prof-side-top-bar-li ${activeDiv === 1 ? "active" : ""
                        }`}
                    >
                      <Image
                        src={Sidenav5}
                        width={17}
                        height={10}
                        alt="page-nav"
                      />
                      <div className="prof-side-text-div">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="white"
                          className="bi bi-plus-lg"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                          />
                        </svg>
                        <span className="prof-side-text">Create page</span>
                      </div>
                    </li>
                    {/* <li
                          onClick={() => handleTextClick(2)}
                          className={`prof-side-bar-li-sec ${
                            activeDiv === 2 ? "active" : ""
                          }`}
                        >
                          <Image
                            src={Sidenav4}
                            width={17}
                            height={10}
                            alt="page-nav"
                          />
                          <div className="prof-side-text-div">
                            <p className="prof-side-text">
                              Quantum Market suite
                            </p>
                          </div>
                        </li> */}
                    <li
                      onClick={() => handleTextClick(3)}
                      className={`prof-side-bar-li-sec ${activeDiv === 3 ? "active" : ""
                        }`}
                    >
                      <Image
                        src={Sidenav3}
                        width={17}
                        height={10}
                        alt="page-nav"
                      />
                      <div className="prof-side-text-div">
                        <span className="prof-side-text">Discover</span>
                      </div>
                    </li>
                    <li
                      onClick={() => handleTextClick(4)}
                      className={`prof-side-bar-li-sec ${activeDiv === 4 ? "active" : ""
                        }`}
                    >
                      <Image
                        src={Sidenav2}
                        width={17}
                        height={10}
                        alt="page-nav"
                      />
                      <div className="prof-side-text-div">
                        <span className="prof-side-text">Followed page</span>
                      </div>
                    </li>
                    <li
                      onClick={() => handleTextClick(5)}
                      className={`prof-side-bar-li-sec ${activeDiv === 5 ? "active" : ""
                        }`}
                    >
                      <Image
                        src={Sidenav1}
                        width={17}
                        height={10}
                        alt="page-nav"
                      />
                      <div className="prof-side-text-div">
                        <span className="prof-side-text">Invites</span>
                      </div>
                    </li>
                    {/* </ul>
                  <ul className="create-mob-sidebar-div"> */}
                    <li
                      onClick={() => handleTextClick(6)}
                      className={`prof-side-bar-li-sec ${activeDiv === 6 ? "active" : ""
                        }`}
                    >
                      <Image
                        src={Sidenav6}
                        width={17}
                        height={10}
                        alt="page-nav"
                      />
                      <div className="prof-side-text-div">
                        <span className="prof-side-text">My Pages</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-3">
                {activeDiv === 1 && (
                  <div>
                    <CreatePage setActiveDiv={setActiveDiv} />
                  </div>
                )}
                {activeDiv === 2 && <div>Comming Soon</div>}
                {activeDiv === 3 && (
                  <div>
                    <Discover />
                  </div>
                )}
                {activeDiv === 4 && (
                  <div>
                    <FollowedPage />
                  </div>
                )}
                {activeDiv === 5 && (
                  <div>
                    <Invite />
                  </div>
                )}
                {activeDiv === 6 && (
                  <div>
                    <MyPage />
                  </div>
                )}
              </div>
            </div>
          </main>

          <aside className="col col-xl-2 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12 first-left-menu">
            <div className="ui-block">
              <FeatureUser />
            </div>
          </aside>
        </div>
      </div>
    </Masterdashboardlayout>
  );
};

export default Page;
