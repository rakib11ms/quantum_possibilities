"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import Leftsidebar from "@/component/leftsidebar/page";
import BookmarkIcon from "../../../public/bookmark.svg";
import Bookmarkpic from "../../../public/bookmarkpic.png";
import Image from "next/image";
import React, { useState } from "react";
import BookMarkAdd from "./bookMarkAdd";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";

// MOdal
const style = {
  position: "absolute",
  top: "40%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const page = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPagePreview, setShowPagePreview] = useState(false);

  const handleOpenPagePreview = () => {
    setShowPagePreview(true);
  };

  const handleClosePagePreview = () => {
    setShowPagePreview(false);
  };

  return (
    <div>
      <Masterdashboardlayout>
        {showPagePreview ? (
          <BookMarkAdd onClose={handleClosePagePreview} />
        ) : null}

        {showPagePreview ? null : (
          <div className='row'>
            <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
              <Leftsidebar />
            </div>
            <div className='col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10'>
              <div>
                <div className='bookmark-full-div'>
                  <div>
                    <h5>Bookmarks</h5>
                    <p className='bokmrk-ptext'> My bookmarks</p>
                    <hr />
                  </div>

                  <div className='bookmark-icon-text-div'>
                    <Image src={BookmarkIcon} width={100} height={100} alt='' />
                    <p>No bookmark or saved item found! Want to add ? </p>
                    <button
                      onClick={handleOpen}
                      className='review-add-Collect-btn'>
                      + Add Collection
                    </button>

                    <Modal
                      open={open}
                      aria-labelledby='modal-modal-title'
                      aria-describedby='modal-modal-description'>
                      <Box sx={style}>
                        <div>
                          <div className='row no-gutters modal-head-tag-div'>
                            <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 '>
                              {/* Create Collection */}
                            </div>
                            <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 '>
                              <h5 className='modal-head-tag'>
                                {" "}
                                Create Collection
                              </h5>
                            </div>
                            <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 '>
                              <span
                                onClick={handleClose}
                                className='modal-head-close-svg'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='16'
                                  height='16'
                                  fill='currentColor'
                                  class='bi bi-x-lg'
                                  viewBox='0 0 16 16'>
                                  <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
                                </svg>
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className='bookmark-modal-input-btn'>
                              <input
                                className='bookmark-modal-input'
                                type='search'
                                placeholder='Collection name'
                              />
                              <div className='bookmark-modal-btn'>
                                {" "}
                                <button className='modal-cancel-btn'>
                                  Cancel
                                </button>
                                <button className='modal-create-btn'>
                                  Create
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </div>

                <div
                  className='bookmark-full-div'
                  onClick={handleOpenPagePreview}>
                  <div className='bookmark-tag-second-div'>
                    <div>
                      <h5>Bookmarks</h5>
                      <p className='bokmrk-ptext'> My bookmarks</p>
                    </div>
                    <div>
                      <button className='review-add-Collect-btn'>
                        + Add Collection
                      </button>
                    </div>
                  </div>
                  <hr />

                  <div>
                    <div className='bookmark-third-full-div'>
                      <div className='bookmark-third-div'>
                        <div>
                          <img
                            src={Bookmarkpic.src}
                            className='bookmark-post-img'
                            alt=''
                          />
                        </div>
                        <div className='book-more-div'>
                          <div className='more'>
                            <div>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-three-dots threedotsvg'
                                viewBox='0 0 16 16'>
                                <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                              </svg>
                              <ul className='more-dropdown'>
                                <>
                                  <li className='bookmark-drop-invite'>
                                    + Invite
                                  </li>
                                  <li>
                                    <a href='#' type='button'>
                                      <span className='bookmark-drop-svgs'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='16'
                                          fill='currentColor'
                                          className='bi bi-people'
                                          viewBox='0 0 16 16'>
                                          <path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
                                        </svg>
                                      </span>
                                      View members
                                    </a>
                                  </li>
                                </>

                                <li>
                                  <a href='#'>
                                    <span className='bookmark-drop-svgs'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        class='bi bi-input-cursor-text'
                                        viewBox='0 0 16 16'>
                                        <path
                                          fill-rule='evenodd'
                                          d='M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2z'
                                        />
                                        <path d='M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4v1zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4z' />
                                      </svg>
                                    </span>
                                    Rename collection
                                  </a>
                                </li>
                                <li>
                                  <a href='#'>
                                    <span className='bookmark-drop-svgs'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        class='bi bi-trash'
                                        viewBox='0 0 16 16'>
                                        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                                        <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                                      </svg>
                                    </span>
                                    Delete collection
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <h5>Game play</h5>
                      </div>
                      <div className='bookmark-third-div'>
                        <div>
                          <img
                            src={Bookmarkpic.src}
                            className='bookmark-post-img'
                            alt=''
                          />
                        </div>
                        <div className='book-more-div'>
                          <div className='more'>
                            <div>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-three-dots threedotsvg'
                                viewBox='0 0 16 16'>
                                <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                              </svg>
                              <ul className='more-dropdown'>
                                <>
                                  <li className='bookmark-drop-invite'>
                                    + Invite
                                  </li>
                                  <li>
                                    <a href='#' type='button'>
                                      <span className='bookmark-drop-svgs'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='16'
                                          height='16'
                                          fill='currentColor'
                                          className='bi bi-people'
                                          viewBox='0 0 16 16'>
                                          <path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
                                        </svg>
                                      </span>
                                      View members
                                    </a>
                                  </li>
                                </>

                                <li>
                                  <a href='#'>
                                    <span className='bookmark-drop-svgs'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        class='bi bi-input-cursor-text'
                                        viewBox='0 0 16 16'>
                                        <path
                                          fill-rule='evenodd'
                                          d='M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2z'
                                        />
                                        <path d='M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4v1zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4z' />
                                      </svg>
                                    </span>
                                    Rename collection
                                  </a>
                                </li>
                                <li>
                                  <a href='#'>
                                    <span className='bookmark-drop-svgs'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='currentColor'
                                        class='bi bi-trash'
                                        viewBox='0 0 16 16'>
                                        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                                        <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                                      </svg>
                                    </span>
                                    Delete collection
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <h5>Game play</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Masterdashboardlayout>
    </div>
  );
};

export default page;
