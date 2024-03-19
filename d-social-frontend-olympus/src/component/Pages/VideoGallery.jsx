import React, { Component } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import settingaddreaction from "../../../public/add-reaction.svg";
import settingReply from "../../../public/reply.svg";
import Connectionsone from "../../../public/connectionsone.png";
import Connectionstwo from "../../../public/connectionstwo.png";
import Connectionsthree from "../../../public/connectionsthree.png";
import Care from "../../../public/care.png";
import Like from "../../../public/like.png";
import Love from "../../../public/love.png";
import Image from "next/image";

const VideoGallery = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className='gallery-page-video'>
        <h6>Pinned</h6>
        <div className='Gallery-slider-div'>
          <Slider {...settings}>
            <div>
              <div className='gallery-video-single-slider'>
                <div>
                  <ReactPlayer
                    // url={singleReelData.video}
                    url={"https://www.youtube.com/watch?v=b-9Hw03yzTs"}
                    className='rounded-3 reels-video-custom'
                    width='100%'
                    height='40vh'
                    controls
                  />
                </div>
                <div>
                  <h6>What is Lorem Ipsum?</h6>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                  </p>
                </div>

                <div className='row video-comment-Share-full-div'>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='video-reacts-div'>
                      <Image
                        src={settingaddreaction.src}
                        width={20}
                        height={20}
                        alt=''
                      />
                      <p className='video-reacts-text'>
                        Aleya Asma and 44K others
                      </p>
                    </div>
                  </div>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='video-comment-Share-div'>
                      <p className='video-reacts-text'>2.4K comments</p>
                      <p className='video-reacts-text'>20 shares</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='gallery-cmment-shar-cmment-shar-full-div'>
                    <div className='gallery-cmment-shar-full'>
                      {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                      {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                      <div
                        className='single-cmment-shar '
                        onMouseEnter={() => {
                          setIsHovered(true);
                        }}
                        onMouseLeave={() => setIsHovered(false)}>
                        <Image
                          src={settingaddreaction.src}
                          width={30}
                          height={30}
                          alt=''
                        />
                        Reaction
                      </div>
                      <div className='single-cmment-shar'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-chat'
                          viewBox='0 0 16 16'>
                          <path d='M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z' />
                        </svg>
                        Comments
                      </div>
                      <div className='single-cmment-shar'>
                        <Image
                          src={settingReply.src}
                          width={30}
                          height={30}
                          alt=''
                        />
                        Reaction
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className='See-More-btn-div'>
                  <button className='See-More-btn'>See More</button>
                </div>
              </div>
            </div>

            <div>
              <div className='gallery-video-single-slider'>
                <div>
                  <ReactPlayer
                    // url={singleReelData.video}
                    url={"https://www.youtube.com/watch?v=b-9Hw03yzTs"}
                    className='rounded-3 reels-video-custom'
                    width='100%'
                    height='40vh'
                    controls
                  />
                </div>
                <div>
                  <h6>What is Lorem Ipsum?</h6>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                  </p>
                </div>

                <div className='row video-comment-Share-full-div'>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='video-reacts-div'>
                      <Image
                        src={settingaddreaction.src}
                        width={20}
                        height={20}
                        alt=''
                      />
                      <p className='video-reacts-text'>
                        Aleya Asma and 44K others
                      </p>
                    </div>
                  </div>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='video-comment-Share-div'>
                      <p className='video-reacts-text'>2.4K comments</p>
                      <p className='video-reacts-text'>20 shares</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='gallery-cmment-shar-cmment-shar-full-div'>
                    <div className='gallery-cmment-shar-full'>
                      {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                      {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                      <div
                        className='single-cmment-shar '
                        onMouseEnter={() => {
                          setIsHovered(true);
                        }}
                        onMouseLeave={() => setIsHovered(false)}>
                        <Image
                          src={settingaddreaction.src}
                          width={30}
                          height={30}
                          alt=''
                        />
                        Reaction
                      </div>
                      <div className='single-cmment-shar'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-chat'
                          viewBox='0 0 16 16'>
                          <path d='M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z' />
                        </svg>
                        Comments
                      </div>
                      <div className='single-cmment-shar'>
                        <Image
                          src={settingReply.src}
                          width={30}
                          height={30}
                          alt=''
                        />
                        Reaction
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className='See-More-btn-div'>
                  <button className='See-More-btn'>See More</button>
                </div>
              </div>
            </div>

            <div>
              <div className='gallery-video-single-slider'>
                <div>
                  <ReactPlayer
                    // url={singleReelData.video}
                    url={"https://www.youtube.com/watch?v=b-9Hw03yzTs"}
                    className='rounded-3 reels-video-custom'
                    width='100%'
                    height='40vh'
                    controls
                  />
                </div>
                <div>
                  <h6>What is Lorem Ipsum?</h6>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                  </p>
                </div>

                <div className='row video-comment-Share-full-div'>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='video-reacts-div'>
                      <Image
                        src={settingaddreaction.src}
                        width={20}
                        height={20}
                        alt=''
                      />
                      <p className='video-reacts-text'>
                        Aleya Asma and 44K others
                      </p>
                    </div>
                  </div>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='video-comment-Share-div'>
                      <p className='video-reacts-text'>2.4K comments</p>
                      <p className='video-reacts-text'>20 shares</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='gallery-cmment-shar-cmment-shar-full-div'>
                    <div className='gallery-cmment-shar-full'>
                      {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                      {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                      <div
                        className='single-cmment-shar '
                        onMouseEnter={() => {
                          setIsHovered(true);
                        }}
                        onMouseLeave={() => setIsHovered(false)}>
                        <Image
                          src={settingaddreaction.src}
                          width={30}
                          height={30}
                          alt=''
                        />
                        Reaction
                      </div>
                      <div className='single-cmment-shar'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-chat'
                          viewBox='0 0 16 16'>
                          <path d='M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z' />
                        </svg>
                        Comments
                      </div>
                      <div className='single-cmment-shar'>
                        <Image
                          src={settingReply.src}
                          width={30}
                          height={30}
                          alt=''
                        />
                        Reaction
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className='See-More-btn-div'>
                  <button className='See-More-btn'>See More</button>
                </div>
              </div>
            </div>

            <div>
              <div className='gallery-video-single-slider'>
                <div>
                  <ReactPlayer
                    // url={singleReelData.video}
                    url={"https://www.youtube.com/watch?v=b-9Hw03yzTs"}
                    className='rounded-3 reels-video-custom'
                    width='100%'
                    height='40vh'
                    controls
                  />
                </div>
                <div>
                  <h6>What is Lorem Ipsum?</h6>
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                  </p>
                </div>

                <div className='row video-comment-Share-full-div'>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='video-reacts-div'>
                      <Image
                        src={settingaddreaction.src}
                        width={20}
                        height={20}
                        alt=''
                      />
                      <p className='video-reacts-text'>
                        Aleya Asma and 44K others
                      </p>
                    </div>
                  </div>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='video-comment-Share-div'>
                      <p className='video-reacts-text'>2.4K comments</p>
                      <p className='video-reacts-text'>20 shares</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='gallery-cmment-shar-cmment-shar-full-div'>
                    <div className='gallery-cmment-shar-full'>
                      {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                      {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                      <div
                        className='single-cmment-shar '
                        onMouseEnter={() => {
                          setIsHovered(true);
                        }}
                        onMouseLeave={() => setIsHovered(false)}>
                        <Image
                          src={settingaddreaction.src}
                          width={30}
                          height={30}
                          alt=''
                        />
                        Reaction
                      </div>
                      <div className='single-cmment-shar'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-chat'
                          viewBox='0 0 16 16'>
                          <path d='M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z' />
                        </svg>
                        Comments
                      </div>
                      <div className='single-cmment-shar'>
                        <Image
                          src={settingReply.src}
                          width={30}
                          height={30}
                          alt=''
                        />
                        Reaction
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className='See-More-btn-div'>
                  <button className='See-More-btn'>See More</button>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>

      <div className='gallery-most-popular-video-div'>
        <p className='Most-tag'>Most Popular</p>
        <div className='most-popular-video-div'>
          <ReactPlayer
            // url={singleReelData.video}
            url={
              "https://www.youtube.com/watch?v=tswgT59R5Q8&pp=ygUSQkFuZ2xhZGVzaCBjcmlja2V0"
            }
            className='rounded-3 reels-video-custom'
            width='80%'
            height='45vh'
            controls
          />
        </div>

        <div className='container-fluid'>
          <div className='pop-cap-div'>
            <p>
              <strong>
                17 years of Shakib Al Hasan ft. Lonely (Akon) ★ Only Bangladeshi
                player to continue 17 years in cricket without retiring from any
                format #ShakibAlHasan #SAH75
              </strong>
            </p>
            <p className='pop-cap'>
              17 years of Shakib Al Hasan ft. Lonely (Akon) ★ Only Bangladeshi
              player to continue 17 years in cricket without retiring from any
              format #ShakibAlHasan #SAH75
            </p>
          </div>

          <div className='row video-comment-Share-full-div'>
            <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
              <div className='video-reacts-div'>
                {/* <Image
                src={settingaddreaction.src}
                width={20}
                height={20}
                alt=''
              /> */}
                <p className='video-reacts-text'>Aleya Asma and 44K others</p>
              </div>
            </div>
            <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
              <div className='video-comment-Share-div'>
                <p className='video-reacts-text'>2.4K comments</p>
                <p className='video-reacts-text'>20 shares</p>
              </div>
            </div>
          </div>

          <div>
            <div className='gallery-cmment-shar-cmment-shar-full-div'>
              <div className='gallery-most-cmment-shar-full'>
                {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                {/* onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => setIsHovered(false)} */}
                <div
                  className='single-cmment-shar '
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}>
                  <Image
                    src={settingaddreaction.src}
                    width={30}
                    height={30}
                    alt=''
                  />
                  Reaction
                </div>
                <div className='single-cmment-shar'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-chat'
                    viewBox='0 0 16 16'>
                    <path d='M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z' />
                  </svg>
                  Comments
                </div>
                <div className='single-cmment-shar'>
                  <Image src={settingReply.src} width={30} height={30} alt='' />
                  Reaction
                </div>
              </div>
            </div>
            <hr />

            <div className='popular-coment-div'>
              <div>
                <Image
                  className='most-pop-vid-cmmnt-auth'
                  src={Connectionsone}
                  width={""}
                  height={""}
                  alt=''
                />
              </div>

              <div>
                <div className='popular-cmnt-tag-div'>
                  <p className='popular-tag'>K.H.M Zahid</p>
                  <p className='popular-tagp'>
                    Bad Player Bad Player Bad Player
                  </p>
                </div>

                <div className='pop-like-reply-div'>
                  <button className='pop-like-reply'>Like</button>
                  <button className='pop-like-reply'>Reply</button>
                  <p className='mt-3'>9w</p>
                </div>
              </div>

              <div className='mt-4'>
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
                </div>
              </div>
            </div>

            <div className='popular-coment-div'>
              <div>
                <Image
                  className='most-pop-vid-cmmnt-auth'
                  src={Connectionstwo}
                  width={""}
                  height={""}
                  alt=''
                />
              </div>

              <div>
                <div className='popular-cmnt-tag-div'>
                  <p className='popular-tag'>Shane Watson</p>
                  <p className='popular-tagp'>
                    Bad Player Bad Player Bad Player
                  </p>
                </div>

                <div className='pop-like-reply-div'>
                  <button className='pop-like-reply'>Like</button>
                  <button className='pop-like-reply'>Reply</button>
                  <p className='mt-3'>12w</p>
                </div>
              </div>

              <div className='mt-4'>
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
                </div>
              </div>
            </div>

            <div className='popular-coment-div'>
              <div>
                <Image
                  className='most-pop-vid-cmmnt-auth'
                  src={Connectionsthree}
                  width={""}
                  height={""}
                  alt=''
                />
              </div>

              <div>
                <div className='popular-cmnt-tag-div'>
                  <p className='popular-tag'>Sakib-Al-hasan</p>
                  <p className='popular-tagp'>
                    Bad Player Bad Player Bad Player
                  </p>
                </div>

                <div className='pop-like-reply-div'>
                  <button className='pop-like-reply'>Like</button>
                  <button className='pop-like-reply'>Reply</button>
                  <p className='mt-3'>4w</p>
                </div>
              </div>

              <div className='mt-4'>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='popular-video-full-div'>
        <h6>Videos</h6>

        <div className='pop-video-divs'>
          <div className='pop-video-full-div'>
            <ReactPlayer
              // url={singleReelData.video}
              url={
                "https://www.youtube.com/watch?v=tswgT59R5Q8&pp=ygUSQkFuZ2xhZGVzaCBjcmlja2V0"
              }
              className='rounded-3 pop-video-custom'
              width='100%'
              height='25vh'
              controls
            />
            <div className='pop-img-text-div'>
              <p>
                <strong>
                  {" "}
                  শহীদ আফ্রিদির বিশ্লেষণ কোহলি-রাহুলরা যা করছেন, বাবর তা পারছেন
                  না
                </strong>
              </p>
              <p className='pop-img-text'>19 hours ago 1k views</p>
            </div>
            <div className='pop-react'>
              <Image src={Love} width={30} height={30} alt='' />
              <Image src={Like} width={30} height={30} alt='' />
              <Image src={Care} width={30} height={30} alt='' />
            </div>
          </div>
          <div className='pop-video-full-div'>
            <ReactPlayer
              // url={singleReelData.video}
              url={
                "https://www.youtube.com/watch?v=3CuJW2vAbrQ&pp=ygUSQkFuZ2xhZGVzaCBjcmlja2V0"
              }
              className='rounded-3 pop-video-custom'
              width='100%'
              height='25vh'
              controls
            />
            <div className='pop-img-text-div'>
              <p>
                <strong>
                  {" "}
                  শহীদ আফ্রিদির বিশ্লেষণ কোহলি-রাহুলরা যা করছেন, বাবর তা পারছেন
                  না
                </strong>
              </p>
              <p className='pop-img-text'>19 hours ago 1k views</p>
            </div>
            <div className='pop-react'>
              <Image src={Love} width={30} height={30} alt='' />
              <Image src={Like} width={30} height={30} alt='' />
              <Image src={Care} width={30} height={30} alt='' />
            </div>
          </div>
          <div className='pop-video-full-div'>
            <ReactPlayer
              // url={singleReelData.video}
              url={"https://www.youtube.com/shorts/Py_3YnX_QEM"}
              className='rounded-3 pop-video-custom'
              width='100%'
              height='25vh'
              controls
            />
            <div className='pop-img-text-div'>
              <p>
                <strong>
                  {" "}
                  শহীদ আফ্রিদির বিশ্লেষণ কোহলি-রাহুলরা যা করছেন, বাবর তা পারছেন
                  না
                </strong>
              </p>
              <p className='pop-img-text'>19 hours ago 1k views</p>
            </div>
            <div className='pop-react'>
              <Image src={Love} width={30} height={30} alt='' />
              <Image src={Like} width={30} height={30} alt='' />
              <Image src={Care} width={30} height={30} alt='' />
            </div>
          </div>
          <div className='pop-video-full-div'>
            <ReactPlayer
              // url={singleReelData.video}
              url={
                "https://www.youtube.com/watch?v=p88yZpXiMzY&pp=ygUSQkFuZ2xhZGVzaCBjcmlja2V0"
              }
              className='rounded-3 pop-video-custom'
              width='100%'
              height='25vh'
              controls
            />
            <div className='pop-img-text-div'>
              <p>
                <strong>
                  {" "}
                  শহীদ আফ্রিদির বিশ্লেষণ কোহলি-রাহুলরা যা করছেন, বাবর তা পারছেন
                  না
                </strong>
              </p>
              <p className='pop-img-text'>19 hours ago 1k views</p>
            </div>
            <div className='pop-react'>
              <Image src={Love} width={30} height={30} alt='' />
              <Image src={Like} width={30} height={30} alt='' />
              <Image src={Care} width={30} height={30} alt='' />
            </div>
          </div>
          <div className='pop-video-full-div'>
            <ReactPlayer
              // url={singleReelData.video}
              url={
                "https://www.youtube.com/watch?v=8iPCKfkXmew&t=798s&pp=ygUSQkFuZ2xhZGVzaCBjcmlja2V0"
              }
              className='rounded-3 pop-video-custom'
              width='100%'
              height='25vh'
              controls
            />
            <div className='pop-img-text-div'>
              <p>
                <strong>
                  {" "}
                  শহীদ আফ্রিদির বিশ্লেষণ কোহলি-রাহুলরা যা করছেন, বাবর তা পারছেন
                  না
                </strong>
              </p>
              <p className='pop-img-text'>19 hours ago 1k views</p>
            </div>
            <div className='pop-react'>
              <Image src={Love} width={30} height={30} alt='' />
              <Image src={Like} width={30} height={30} alt='' />
              <Image src={Care} width={30} height={30} alt='' />
            </div>
          </div>
          <div className='pop-video-full-div'>
            <ReactPlayer
              // url={singleReelData.video}
              url={
                "https://www.youtube.com/watch?v=tswgT59R5Q8&pp=ygUSQkFuZ2xhZGVzaCBjcmlja2V0"
              }
              className='rounded-3 pop-video-custom'
              width='100%'
              height='25vh'
              controls
            />
            <div className='pop-img-text-div'>
              <p>
                <strong>
                  {" "}
                  শহীদ আফ্রিদির বিশ্লেষণ কোহলি-রাহুলরা যা করছেন, বাবর তা পারছেন
                  না
                </strong>
              </p>
              <p className='pop-img-text'>19 hours ago 1k views</p>
            </div>
            <div className='pop-react'>
              <Image src={Love} width={30} height={30} alt='' />
              <Image src={Like} width={30} height={30} alt='' />
              <Image src={Care} width={30} height={30} alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
