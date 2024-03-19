import Leftsidebar from "@/component/leftsidebar/page";
import React from "react";
import Bookmarkpic from "../../../public/bookmarkpic.png";
import BookmarkAuth from "../../../public/img/author-page.jpg";

const bookMarkAdd = () => {
  return (
    <div>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'>
          <Leftsidebar />
        </div>
        <div className='col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10'>
          <div>
            <div className='bookmark-full-div'>
              <div>
                <h5 className='book-ad-tag-text'>Game play</h5>
                <p className=''>
                  {" "}
                  <spam>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      class='bi bi-lock-fill'
                      viewBox='0 0 16 16'>
                      <path d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z' />
                    </svg>
                  </spam>{" "}
                  only myself
                  <span>3 connections are able to see</span>
                </p>
              </div>
            </div>

            <div>
              <div className='book-add-single-full-div'>
                <div className='book-addsingle-div'>
                  <div className='book-add-single'>
                    <div>
                      <img
                        className='add-bookmark-img'
                        src={Bookmarkpic.src}
                        alt=''
                      />
                    </div>
                    <div>
                      <h6># Presenting the HLD of a game</h6>
                      <p>Reel</p>

                      <div className='book-add-img-tex-div'>
                        <img
                          src={BookmarkAuth.src}
                          className='add-author-img'
                          alt=''
                        />
                        <p>
                          Added by <strong>HUDSON RAYI</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
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
                          <li className='more-remove-li'>
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-x-circle'
                                viewBox='0 0 16 16'>
                                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                              </svg>
                            </span>
                            <p className='more-remove-text'>
                              Remove from collection
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='book-addsingle-div'>
                  <div className='book-add-single'>
                    <div>
                      <img src={Bookmarkpic.src} alt='' />
                    </div>
                    <div>
                      <h6># Presenting the HLD of a game</h6>
                      <p>Reel</p>

                      <div className='book-add-img-tex-div'>
                        <img
                          src={BookmarkAuth.src}
                          className='add-author-img'
                          alt=''
                        />
                        <p>
                          Added by <strong>HUDSON RAYI</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
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
                          <li className='more-remove-li'>
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-x-circle'
                                viewBox='0 0 16 16'>
                                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                              </svg>
                            </span>
                            <p className='more-remove-text'>
                              Remove from collection
                            </p>
                          </li>
                        </ul>
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

export default bookMarkAdd;
