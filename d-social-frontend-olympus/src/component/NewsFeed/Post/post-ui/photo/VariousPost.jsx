import React, { useState } from "react";
import "./EventPost.modules.css";
import BirthDaySubIcon, { EndRelationship, InRelationship, NewJob, Education, BirthDay } from "./LoveRelationship";
import { formatDate } from "../../utils";
import { Grid, Typography } from "@mui/material";
import ReactPlayer from 'react-player';
import { host } from "@/environment";
import { getFile } from "@/utils/utlity";
import Link from "next/link";
import GlobSvg from "../headers/svg/GlobSvg";
import "@/app/reel/reelsStyle.css";
export function EventPost({ postInformation }) {
   const workPlace = postInformation?.work_place?.org_name
   return (
      <div className="main__event__wrapper">
         <div className="event__wrapper">
            {
               postInformation?.event_type == 'work' && <NewJob />
            }
            {
               postInformation?.event_type == 'education' && <Education />
            }
            {
               postInformation?.event_type == 'relationship' && <InRelationship />
            }
            {/* <EndRelationship /> */}
            <p className="tittle">{postInformation?.event_sub_type} of {postInformation?.event_type} {workPlace ? ` at ${workPlace}` : ""}</p>
            <p>{formatDate(postInformation?.createdAt)}</p>
         </div>
      </div>
   );
}
export function ReelsPost({ postInformation }) {
   const [seeMore, setSeeMore] = useState(false)
   return (

      <div className="event__wrapper">
         <Grid className=' rounded event__wrapper' sx={{
            height: '513px',
            width: '642px',
            py: 1,
            // border: '1px solid red',
            backgroundColor: '#B3B3B3',
            position: 'relative'
         }}

         >

            <Grid className="event__wrapper">
               <Link href={`/reel/${postInformation?.share_reels?._id}`}>
                  <ReactPlayer
                     height={'513px'}
                     width={'288px'}
                     url={`${host}/${getFile(postInformation?.share_reels?.video)}`}
                     // className="custom-video-player"
                     // width='100%'
                     // height='auto'
                     playing={true}
                     // ref={playerRef}
                     // onDuration={handleDuration}
                     controls
                  />
               </Link>
            </Grid>
            <div style={{
               position: 'absolute',
               // bottom: {
               //     xl: '82px',
               //     md: '53px'
               // },
               bottom: '53px',

               left: '19px'
            }}>
               <div className="reels-top-navbar-sec ">
                  <div className="reels-top-navbar-image-name-privacy-wrapper">
                     <Link
                        href={`/${postInformation?.share_reels?.user_id?.username}/timeline`}
                        style={{ color: "white" }}
                     >
                        <div className="reels-top-navbar-image-name">
                           <div className="reels-top-navbar-image">
                              {postInformation?.share_reels?.user_id?.profile_pic !== null ? (
                                 <img
                                    src={`${host}/uploads/${postInformation?.share_reels?.user_id?.profile_pic}`}
                                    alt=""
                                 />
                              ) : (
                                 <img
                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                    alt="Default Profile Pic"
                                 />
                              )}
                           </div>
                           <div className="mx-2">
                              <strong>
                                 {" "}
                                 {postInformation?.share_reels?.user_id?.first_name}{" "}
                                 {postInformation?.share_reels?.user_id?.last_name}
                              </strong>

                              <span className="d-flex">
                                 {postInformation?.share_reels?.reels_privacy}&nbsp;
                                 <span>
                                    <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M4.5 0C5.29839 0 6.06048 0.217742 6.75 0.616935C7.43952 1.01613 7.98387 1.56048 8.38306 2.25C8.78226 2.93952 9 3.70161 9 4.5C9 5.31653 8.78226 6.06048 8.38306 6.75C7.98387 7.43952 7.43952 8.00202 6.75 8.40121C6.06048 8.8004 5.29839 9 4.5 9C3.68347 9 2.93952 8.8004 2.25 8.40121C1.56048 8.00202 0.997984 7.43952 0.59879 6.75C0.199597 6.06048 0 5.31653 0 4.5C0 3.70161 0.199597 2.93952 0.59879 2.25C0.997984 1.56048 1.56048 1.01613 2.25 0.616935C2.93952 0.217742 3.68347 0 4.5 0ZM4.5 8.12903C5.15323 8.12903 5.75202 7.96573 6.31452 7.63911C6.85887 7.3125 7.3125 6.87702 7.63911 6.31452C7.96573 5.77016 8.12903 5.15323 8.12903 4.5C8.12903 4.20968 8.09274 3.91935 8.02016 3.62903H7.69355C7.60282 3.62903 7.53024 3.66532 7.47581 3.71976C7.42137 3.77419 7.40323 3.82863 7.40323 3.90121V4.02823C7.40323 4.15524 7.34879 4.24597 7.23992 4.28226L6.96774 4.42742C6.85887 4.48185 6.76815 4.48185 6.69556 4.40927L6.35081 4.19153C6.27823 4.15524 6.1875 4.1371 6.11492 4.15524L6.06048 4.17339C5.96976 4.20968 5.91532 4.26411 5.87903 4.35484C5.84274 4.44556 5.86089 4.51815 5.91532 4.59073L6.15121 4.95363C6.20565 5.04435 6.27823 5.08065 6.3871 5.08065H6.5504C6.62298 5.08065 6.67742 5.11694 6.73185 5.17137C6.78629 5.22581 6.82258 5.28024 6.82258 5.35282V5.57056C6.82258 5.64315 6.80444 5.69758 6.76815 5.73387L6.42339 6.1875C6.3871 6.22379 6.36895 6.27823 6.36895 6.31452L6.29637 6.71371C6.27823 6.78629 6.24194 6.84073 6.20565 6.87702C6.02419 7.04032 5.87903 7.22177 5.75202 7.40323L5.51613 7.76613C5.40726 7.91129 5.28024 7.98387 5.09879 7.98387C4.98992 7.98387 4.89919 7.96573 4.82661 7.91129C4.75403 7.875 4.68145 7.80242 4.64516 7.71169C4.53629 7.5121 4.5 7.29435 4.5 7.05847V6.51411C4.5 6.44153 4.46371 6.3871 4.40927 6.33266C4.35484 6.27823 4.3004 6.24194 4.22782 6.24194H3.75605C3.46573 6.24194 3.22984 6.15121 3.04839 5.95161C2.84879 5.77016 2.75806 5.53427 2.75806 5.24395V4.98992C2.75806 4.84476 2.79435 4.6996 2.86694 4.55444C2.93952 4.40927 3.03024 4.3004 3.15726 4.20968L3.64718 3.82863C3.82863 3.70161 4.02823 3.62903 4.24597 3.62903H4.26411C4.40927 3.62903 4.57258 3.66532 4.71774 3.7379L4.97177 3.86492C5.04435 3.90121 5.11694 3.91935 5.18952 3.88306L6.04234 3.59274C6.09677 3.59274 6.15121 3.55645 6.1875 3.50202C6.22379 3.46573 6.24194 3.39315 6.24194 3.32056C6.24194 3.24798 6.20565 3.19355 6.15121 3.13911C6.09677 3.08468 6.04234 3.04839 5.96976 3.04839H5.77016C5.69758 3.04839 5.625 3.03024 5.57056 2.95766L5.46169 2.84879C5.38911 2.79435 5.33468 2.75806 5.2621 2.75806H3.61089C3.53831 2.75806 3.46573 2.73992 3.41129 2.68548C3.35685 2.63105 3.33871 2.55847 3.33871 2.48589V2.39516C3.33871 2.34073 3.35685 2.28629 3.39315 2.23185C3.42944 2.17742 3.48387 2.14113 3.55645 2.12298L3.81048 2.0504C3.88306 2.0504 3.9375 2.01411 3.97379 1.94153L4.11895 1.72379C4.17339 1.65121 4.24597 1.59677 4.35484 1.59677H4.79032C4.8629 1.59677 4.93548 1.57863 4.98992 1.52419C5.04435 1.46976 5.08065 1.39718 5.08065 1.3246V0.925403C4.8629 0.889113 4.68145 0.870968 4.5 0.870968C3.84677 0.870968 3.22984 1.03427 2.68548 1.36089C2.12298 1.6875 1.6875 2.14113 1.36089 2.68548C1.03427 3.24798 0.870968 3.84677 0.870968 4.5C0.870968 5.15323 1.03427 5.77016 1.36089 6.31452C1.6875 6.87702 2.12298 7.3125 2.68548 7.63911C3.22984 7.96573 3.84677 8.12903 4.5 8.12903Z" fill="white" />
                                    </svg>
                                 </span>

                              </span>
                           </div>
                        </div>
                     </Link>
                  </div>
               </div>
               <p
                  className="p-1"
                  style={{
                     color: 'white'
                  }}

               >
                  {seeMore ? <> {postInformation?.share_reels?.description} </> : <>{postInformation?.share_reels?.description?.slice(0,10)},,,,</>}
                  &nbsp;<span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setSeeMore(p => !p)} >{seeMore ? "see less" : "see more"}</span>
               </p>

            </div>
         </Grid>
      </div>

   )
}
export function BirthdayPost({ postInformation }) {
   const [seeMore, setSeeMore] = useState(false)
   return (
      <>
         <Grid className="main__event__wrapper" sx={{
            borderBottom: '1px solid lightGray',
            // border:'1px solid red'
         }}>
            <Grid className="event__wrapper">

               <Grid className="event__wrapper" gap={1} pb={2}>
                  <BirthDay />
                  <Typography variant='h4' sx={{ fontWeight: 600 }}>Happy birthday, {postInformation?.to_user?.first_name}!</Typography>
                  <Typography variant='h6' sx={{ fontWeight: 400 }}>Today</Typography>
               </Grid>
               <Grid sx={{
                  mb: '-30px'
               }}>
                  <BirthDaySubIcon />
               </Grid>
            </Grid>
         </Grid>
         <Typography sx={{
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            pl: 4,
            py: 4,
         }}>
            {seeMore ? <> {postInformation?.description} </> : <>{postInformation?.description?.slice(0,10)},,,,</>}
            &nbsp;<span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setSeeMore(p => !p)} >{seeMore ? "see less" : "see more"}</span>
         </Typography>
      </>
   )
}