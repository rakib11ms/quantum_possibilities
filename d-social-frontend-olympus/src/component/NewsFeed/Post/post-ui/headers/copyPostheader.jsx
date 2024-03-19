"use client";

import React, { useRef } from "react";
import GlobSvg from "./svg/GlobSvg";
import ThreeDotSvg from "./svg/threeDotSvg";
import CrossSvg from "./svg/CrossSvg";
import "./PostHeader.modules.css";
import { host } from "@/environment";
import DemoAvater from "./demo_profile.jpg";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../utils";
import { useDeleteSinglePostMutation } from "@/redux/features/NewsFeed/newsFeedApi";
import useUserInfo from "@/hooks/useUserInfo";
import useOutsideClick from "@/hooks/useOutsideClick";
import DeleteModal from "@/component/DeleteModal";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { customStyles } from "../../../../../../utils/customeStyle";
import toast from "react-hot-toast";
import { Radio } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  height: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  pt: 2,
  // px: 4,
  pb: 3,
};
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  Width: 600,
  height: 200,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  pt: 2,
  // px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className='back-btn' onClick={handleClose}>
        Back
      </button>
      <button className='continue-btn' onClick={handleOpen}>
        Continue
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'>
        <Box sx={{ ...style, width: 600 }}>
          <div>
            <div className='row'>
              <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4'></div>
              <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4'>
                <div className='report_texts'>
                  <p>Report</p>
                </div>
              </div>
              <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4 '>
                <div className='report_cross'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-x-circle'
                    viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                    <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
                  </svg>
                </div>
              </div>
            </div>
            <hr />
            <div className='p-4'>
              <p className='description'>Description</p>
              <textarea
                className='report_modal_descriptions'
                typeof='text'
                placeholder='Enter a description about your Report...'
              />
            </div>
          </div>
          <hr />
          <div className='buttons_divs'>
            <button className='back-btn' onClick={handleClose}>
              Back
            </button>
            <button className='continue-btn' onClick={handleOpen}>
              Report
            </button>
          </div>
          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function PostHeader({
  user,
  createdAt,
  postInformation,
  postState,
  setPostState,
  onHidePost,
}) {
  const [deleteSinglePost, { isSuccess }] = useDeleteSinglePostMutation();
  const loggedUserInfo = useUserInfo();
  //  const [open, setOpen] = React.useState(false);

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setPostState((prev) => ({
      sharedPost: {
        isPostAction: false,
      },
    }));
  });

  const handleHideClick = () => {
    onHidePost(); // Call the onHidePost function passed from the parent component
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [opens, setOpens] = React.useState(false);
  const handleOpens = () => setOpens(true);
  const handleCloses = () => setOpens(false);

  return (
    <div className='main__postHeader__wrapper'>
      <div className='right__profile__area'>
        <div className='profile_pic'>
          {postInformation?.page_info?._id != null ? (
            postInformation?.page_info?.profile_pic != null ? (
              <Link
                href={`/pagePublicView/${postInformation?.page_info?.page_user_name}`}>
                <img
                  src={`${host}/uploads/pages/${postInformation?.page_info?.profile_pic}`}
                  className='avatar'
                />
              </Link>
            ) : (
              <Image src={DemoAvater} alt='avater' />
            )
          ) : user?.profile_pic != null ? (
            <Link href={`${user?.username}/timeline`}>
              <img
                src={`${host}/uploads/${user?.profile_pic}`}
                className='avatar'
              />
            </Link>
          ) : (
            <Image src={DemoAvater} alt='avater' />
          )}
        </div>

        <div className='name_time_wrapper'>
          <div
            style={{
              fontWeight: "600",
              display: "flex",
              flexWrap: "wrap",
              columnGap: "5px",
              alignItems: "center",
            }}>
            {postInformation?.page_info?._id != null ? (
              <Link
                href={`/pagePublicView/${postInformation?.page_info?.page_user_name}`}>
                <p>{postInformation?.page_info?.page_name}</p>
              </Link>
            ) : postInformation?.to_user?._id ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 4,
                }}>
                <Link href={`${user?.username}/timeline`}>
                  <p>
                    {user?.first_name} {user?.last_name}
                  </p>
                </Link>

                <div>
                  <span>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M5.68328 9.36656L5.80279 9.60557C6.02224 10.0445 6.13197 10.2639 6.13197 10.5C6.13197 10.7361 6.02224 10.9555 5.80279 11.3944L5.68328 11.6334C4.57397 13.8521 4.01931 14.9614 4.52896 15.471C5.03861 15.9807 6.14793 15.426 8.36656 14.3167L12.4223 12.2889C13.9834 11.5083 14.7639 11.118 14.7639 10.5C14.7639 9.88197 13.9834 9.49169 12.4223 8.71115L8.36656 6.68328C6.14793 5.57397 5.03861 5.01931 4.52896 5.52896C4.01931 6.03861 4.57397 7.14793 5.68328 9.36656Z'
                        fill='#333333'
                        stroke='#333333'
                      />
                    </svg>
                  </span>
                </div>
                <Link href={`${postInformation?.to_user?.username}/timeline`}>
                  <p>
                    {postInformation?.to_user?.first_name}{" "}
                    {postInformation?.to_user?.last_name}
                  </p>
                </Link>
              </div>
            ) : (
              <Link href={`${user?.username}/timeline`}>
                <p>
                  {user?.first_name} {user?.last_name}
                </p>
              </Link>
            )}
            <div
              style={{
                fontWeight: "600",
                display: "flex",
                flexWrap: "wrap",
                columnGap: "5px",
                alignItems: "center",
              }}>
              {postInformation?.feelings && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    columnGap: "4px",
                  }}>
                  <p>... is feelings</p>
                  <img
                    style={{
                      width: "15px",
                    }}
                    src={`${host}/assets/logo/${postInformation?.feelings?.logo}`}
                    alt='feelings_icon'
                  />
                  <p> {postInformation?.feelings?.feeling_name}!</p>
                </div>
              )}

              {postInformation?.location && (
                <p>at {postInformation?.location?.location_name} </p>
              )}
            </div>
          </div>

          <div className='time__glob'>
            <span>{formatDate(createdAt)}</span>
            <span className='point'></span>
            <GlobSvg />
          </div>
        </div>
      </div>

      {/* Wrapper for post action */}

      <div
        style={{
          position: "relative",
        }}>
        <div
          onClick={() =>
            setPostState((prev) => ({
              sharedPost: {
                post_id: postInformation.post_id,
                isPostAction: !prev?.sharedPost.isPostAction,
              },
            }))
          }>
          <ThreeDotSvg />
        </div>
        {postState?.sharedPost?.post_id === postInformation?.post_id &&
          postState?.sharedPost?.isPostAction === true && (
            <div
              ref={ref}
              style={{
                position: "absolute",
                top: "25px",
                right: 0,
                backgroundColor: "white",
                width: "100px",
                padding: "5px",
                zIndex: "400",
                borderRadius: "8px",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              className='button__Comment__action'>
              <p
                onClick={handleOpen}
                //   onClick={() => toast.success("Working on it......")}
                style={{
                  cursor: "pointer",
                  paddingBottom: "10px",
                }}>
                Report
              </p>
              <p
                onClick={handleOpens}
                // onClick={handleHideClick}

                style={{
                  cursor: "pointer",
                  paddingBottom: "10px",
                }}>
                Hide
              </p>
              {loggedUserInfo?.userInfo?._id === postInformation?.user?._id && (
                <p
                  onClick={() => {
                    // setOpen(true);
                    setPostState((prev) => ({
                      sharedPost: {
                        isPostAction: false,
                      },
                    }));
                  }}
                  style={{
                    cursor: "pointer",
                    paddingBottom: "10px",
                  }}>
                  Delete
                </p>
              )}
            </div>
          )}
      </div>

      <Modal
        open={opens}
        onClose={handleCloses}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={styles}>
          <div className='hide_div'>
            <div className='hide_text'>
              <p className='are_u_text'>
                Are you sure you want to hide this post?
              </p>
              <p className='are_u_text'>
                Hiding the post will remove it from your view.
              </p>
            </div>
            <div className='hide_btn'>
              <button className='hide_btn_cancel'>Cancel</button>
              <button className='hide_btn_hide'>Hide</button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* 
       <Modal style={customStyles} isOpen={open}>
         <div
           style={{
             maxWidth: "450px",
             padding: "20px",
             display: "flex",
             flexDirection: "column",
             justifyContent: "end",
             alignItems: "end",
             gap: "14px",
           }}>
           <p
             style={{
               fontSize: "16px",
               fontWeight: "400",
               color: "#000000",
               marginBottom: "10px",
             }}>
             If you delete the this post. it will be gone forever.
             <span
               style={{
                 fontWeight: "500",
               }}>
               are you sure want to delete it?
             </span>
           </p>
           <div>
             <button
               onClick={() => setOpen(false)}
               style={{
                 border: "none",
                 marginRight: "10px",
                 padding: "7px 14px",
                 borderRadius: "4px",
                 cursor: "pointer",
                 fontWeight: "500",
                 color: "#000000",
               }}>
               Close
             </button>
             <button
               onClick={() => {
                 deleteSinglePost({ postId: postInformation.post_id });
                 setOpen(false);
               }}
               style={{
                 backgroundColor: "red",
                 border: "none",
                 padding: "7px 14px",
                 borderRadius: "4px",
                 cursor: "pointer",
                 fontWeight: "500",
                 color: "#FFFFFF",
               }}>
               Agree
             </button>
           </div>
         </div>
       </Modal> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'>
        <Box sx={{ ...style, width: 600, height: 430 }}>
          <div>
            <div className='row'>
              <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4'></div>
              <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4'>
                <div className='report_texts'>
                  <p>Report</p>
                </div>
              </div>
              <div className='col-4 col-md-4 col-sm-4 col-lg-4 col-xl-4 '>
                <div className='report_cross'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-x-circle'
                    viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                    <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
                  </svg>
                </div>
              </div>
            </div>
            <hr />

            <div>
              <div className='radio_text_divss'>
                <div>
                  <Radio
                    checked={selectedValue === "a"}
                    onChange={handleChange}
                    value='a'
                    name='radio-buttons'
                    inputProps={{ "aria-label": "A" }}
                  />
                </div>
                <div>
                  <h6>Spam</h6>
                  <p>It’s spam or violent</p>
                </div>
              </div>
              <div className='radio_text_divss'>
                <div>
                  <Radio
                    checked={selectedValue === ""}
                    onChange={handleChange}
                    value='a'
                    name='radio-buttons'
                    inputProps={{ "aria-label": "A" }}
                  />
                </div>
                <div>
                  <h6>False information</h6>
                  <p>If someone is in immediate danger</p>
                </div>
              </div>
              <div className='radio_text_divss'>
                <div>
                  <Radio
                    checked={selectedValue === ""}
                    onChange={handleChange}
                    value='a'
                    name='radio-buttons'
                    inputProps={{ "aria-label": "A" }}
                  />
                </div>
                <div>
                  <h6>Nudity</h6>
                  <p>It’s Sexual activity or nudity showing genitals</p>
                </div>
              </div>
              <div className='radio_text_divss'>
                <div>
                  <Radio
                    checked={selectedValue === "a"}
                    onChange={handleChange}
                    value='a'
                    name='radio-buttons'
                    inputProps={{ "aria-label": "A" }}
                  />
                </div>
                <div>
                  <h6>Harassment</h6>
                  <p>If any post harassment for you and your friend</p>
                </div>
              </div>
              <div className='radio_text_divss'>
                <div>
                  <Radio
                    checked={selectedValue === ""}
                    onChange={handleChange}
                    value='a'
                    name='radio-buttons'
                    inputProps={{ "aria-label": "A" }}
                  />
                </div>
                <div>
                  <h6>Something Else</h6>
                  <p>Fraud, scam, violence, hate speech etc</p>
                </div>
              </div>
            </div>
          </div>

          <div className='buttons_divs'>
            <ChildModal />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
