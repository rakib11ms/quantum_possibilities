"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useState } from "react";
import Image from "next/image";
import CreateGroup from "./createGroup";
import DiscoverGroup from "./discoverGroup";
import GroupFeed from "./groupFeed";
import MyGroup from "./myGroup";
import "./grouppage.modules.css";
import Leftsidebar from "@/component/leftsidebar/page";
import { Card, Grid } from "@mui/material";
import FeatureUser from "@/component/NewsFeed/FeatureUser";

const page = () => {
  const [activeDiv, setActiveDiv] = useState(3);

  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };
  return (
    <Masterdashboardlayout headerName="Group">
      {/* <div className=" container-fluid "> */}
      <Grid
        // className="row"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            md: "0.61fr 2.5fr 0.7fr",
            sm: "1fr",
          },
        }}
      >
        {/* Left Sidebar */}

        <aside
          // className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-right-menu"
          // style={{ border: '1px solid red' }}
          className="d-none d-md-block"
        >
          <Leftsidebar />
        </aside>
        {/* Main Content */}
        <Grid className="pl-3" sx={{
          pt:{
            sm: '20px',
            xs:'15px',
            md: '1px',
            xl:'1px',
          }
        }}>
          <Card
            sx={{
              //  border: '1px solid red',
              py: 1,
              // position: 'fixed',
              // zIndex: 1,
              width: "100%",
              // width: "70%",
              borderRadius: '13px',
              display: 'flex',
              justifyContent: 'space-around', gap: 4, height: '52px',
              mb: 1
            }}>

            <li style={{ cursor: 'pointer', }}
              onClick={() => handleTextClick(1)}
              className={`prof-side-bar-li ${activeDiv === 1 ? "active" : ""
                }`}>
              <Image
                src={'/groupSide_1.png'}
                width={17}
                height={10}
                alt='page-nav'
              />
              <div className='prof-side-text-div'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='13'
                  height='13'
                  fill='white'
                  className='bi bi-plus-lg'
                  viewBox='0 0 16 16'>
                  <path
                    fillRule='evenodd'
                    d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'
                  />
                </svg>
                <p className='py-3'>Create group</p>
              </div>
            </li>
            <li style={{ cursor: 'pointer' }}
              onClick={() => handleTextClick(2)}
              className={`py-2 prof-side-bar-li-sec ${activeDiv === 2 ? "active" : ""
                }`} >
              <Image
                src={'/groupSide_3.png'}
                width={17}
                height={10}
                alt='page-nav'

              />
              <div className='prof-side-text-div' >
                <p>Group feed</p>
              </div>
            </li>
            <li style={{ cursor: 'pointer' }}
              onClick={() => handleTextClick(3)}
              className={`py-2 prof-side-bar-li-sec ${activeDiv === 3 ? "active" : ""
                }`}>
              <Image
                src={'/pageSide_3.png'}
                width={17}
                height={10}
                alt='page-nav'
              />
              <div className='prof-side-text-div'>
                <p >Discover</p>
              </div>
            </li>
            <li style={{ cursor: 'pointer' }}
              onClick={() => handleTextClick(4)}
              className={`py-2 prof-side-bar-li-sec ${activeDiv === 4 ? "active" : ""
                }`}>
              <Image
                src={'/groupSide_2.png'}
                width={17}
                height={10}
                alt='page-nav'
              />
              <div className='prof-side-text-div'>
                <p >My groups</p>
              </div>
            </li>

          </Card>

          {activeDiv === 1 && (
            <div>
              <CreateGroup />
            </div>
          )}
          {activeDiv === 2 && (
            <div className="group-feed">
              <GroupFeed />
            </div>
          )}
          {activeDiv === 3 && (
            <div>
              <DiscoverGroup />
            </div>
          )}
          {activeDiv === 4 && (
            <div>
              <MyGroup />
            </div>
          )}


          {/* <a
              id="load-more-button"
              href="#"
              className="btn btn-control btn-more"
              data-load-link="items-to-load.html"
              data-container="newsfeed-items-grid"
            >
              <svg className="olymp-three-dots-icon">
                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
              </svg>
            </a> */}

        </Grid>
        {/* Right Sidebar */}

        <aside className="col col-xl-2 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12 first-left-menu">
          <div className="scrollable_div ">
            <div className="ui-block">
              <FeatureUser />
            </div>
          </div>
        </aside>
      </Grid>
      {/* </div> */}
    </Masterdashboardlayout>
  );
};

export default page;
