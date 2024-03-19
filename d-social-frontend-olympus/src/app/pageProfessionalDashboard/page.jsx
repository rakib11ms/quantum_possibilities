"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useState } from "react";
import Sidenav1 from "../../../public/pageDash1.svg";
import Sidenav2 from "../../../public/pageDash2.svg";
import Sidenav3 from "../../../public/pageDash3.svg";
import Sidenav4 from "../../../public/pageDash4.svg";
import Sidenav5 from "../../../public/pageDash5.svg";
import Sidenav6 from "../../../public/pageDash6.svg";
import Image from "next/image";
import DashboardOverview from "@/component/pageProfessionalDashboardAll/DashboardOverview";

const page = () => {
  const [activeDiv, setActiveDiv] = useState(1);

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };

  return (
    <div>
      <Masterdashboardlayout>
        <div className='mob-create-pagediv'>
          <div className='row no-gutters'>
            <div className='col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3'>
              <div className='prof-side-bar'>
                <h3 className='profess-text-page'>
                  <strong className='profess-text-page-strong'>
                    Professional
                  </strong>{" "}
                  Dashboard
                </h3>
                <div className='container-fluid'>
                  <ul>
                    <li
                      onClick={() => handleTextClick(1)}
                      className={`dashboard-side-bar-li ${
                        activeDiv === 1 ? "active-dash-sidebar" : ""
                      }`}>
                      <Image
                        className='page-dashboardSvg'
                        src={Sidenav1}
                        width={25}
                        height={10}
                        alt='page-nav'
                      />
                      <div className='dashboard-side-text-div'>
                        <p className='dashboard-side-text'>Overview</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='dash-side-bar-sec'>
                <div className='container-fluid'>
                  <ul className='dashboard-mob-sidebar-div'>
                    <li
                      onClick={() => handleTextClick(2)}
                      className={`dashboard-side-bar-li-sec ${
                        activeDiv === 2 ? "active-dash-sidebar" : ""
                      }`}>
                      <Image
                        className='page-dashboardSvg'
                        src={Sidenav2}
                        width={17}
                        height={10}
                        alt='page-nav'
                      />
                      <div className='dashboard-side-text-div'>
                        <p className='dashboard-side-text'>Your page</p>
                      </div>
                    </li>
                    <li
                      onClick={() => handleTextClick(3)}
                      className={`dashboard-side-bar-li-sec ${
                        activeDiv === 3 ? "active-dash-sidebar" : ""
                      }`}>
                      <Image
                        className='page-dashboardSvg'
                        src={Sidenav3}
                        width={17}
                        height={10}
                        alt='page-nav'
                      />
                      <div className='dashboard-side-text-div'>
                        <p className='dashboard-side-text'>Contents</p>
                      </div>
                    </li>
                    <li
                      onClick={() => handleTextClick(4)}
                      className={`dashboard-side-bar-li-sec ${
                        activeDiv === 4 ? "active-dash-sidebar" : ""
                      }`}>
                      <Image
                        className='page-dashboardSvg'
                        src={Sidenav4}
                        width={17}
                        height={10}
                        alt='page-nav'
                      />
                      <div className='dashboard-side-text-div'>
                        <p className='dashboard-side-text'>Audience</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='dash-side-bar-sec'>
                <div className='container-fluid'>
                  <ul className='dashboard-mob-sidebar-div'>
                    <li
                      onClick={() => handleTextClick(5)}
                      className={`dashboard-side-bar-li-sec ${
                        activeDiv === 5 ? "active-dash-sidebar" : ""
                      }`}>
                      <Image
                        className='page-dashboardSvg'
                        src={Sidenav5}
                        width={17}
                        height={10}
                        alt='page-nav'
                      />
                      <div className='dashboard-side-text-div'>
                        <p className='dashboard-side-text'>Ad Center</p>
                      </div>
                    </li>
                    <li
                      onClick={() => handleTextClick(6)}
                      className={`dashboard-side-bar-li-sec ${
                        activeDiv === 6 ? "active-dash-sidebar" : ""
                      }`}>
                      <Image
                        className='page-dashboardSvg'
                        src={Sidenav6}
                        width={17}
                        height={10}
                        alt='page-nav'
                      />
                      <div className='dashboard-side-text-div'>
                        <p className='dashboard-side-text'>
                          Invite connection to follow
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='dash-side-bar-sec'>
                <div className='dash-side-bar-sec-mo-tools'>
                  <h6>More tools</h6>
                  <p>More menu items will add here</p>
                </div>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-9 col-lg-9 col-xl-9'>
              <div className='all-page-dash-actives'>
                {activeDiv === 1 && (
                  <div>
                    <DashboardOverview />
                  </div>
                )}

                {activeDiv === 2 && <div>Comming Soon</div>}
                {activeDiv === 3 && <div></div>}
                {activeDiv === 4 && <div></div>}
                {activeDiv === 5 && <div></div>}
                {activeDiv === 6 && <div></div>}
              </div>
            </div>
          </div>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default page;
