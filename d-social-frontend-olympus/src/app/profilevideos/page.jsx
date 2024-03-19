import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React from "react";

const Page = () => {
  return (
    <div>
      <Masterdashboardlayout headerName="Videos">
        <div>
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="top-header">
                    <div className="top-header-thumb">
                      <img src="img/top-header1.jpg" alt="nature" />
                    </div>
                    <div className="profile-section">
                      <div className="row">
                        <div className="col col-lg-5 col-md-5 col-sm-12 col-12">
                          <ul className="profile-menu">
                            <li>
                              <a href="/newsfeed">Timeline</a>
                            </li>
                            <li>
                              <a href="/about">About</a>
                            </li>
                            <li>
                              <a href="06-ProfilePage.html">Friends</a>
                            </li>
                          </ul>
                        </div>
                        <div className="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
                          <ul className="profile-menu">
                            <li>
                              <a href="/profilephotos">Photos</a>
                            </li>
                            <li>
                              <a href="/profilevideos" className="active">
                                Videos
                              </a>
                            </li>
                            <li>
                              <div className="more">
                                <svg className="olymp-three-dots-icon">
                                  <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                                </svg>
                                <ul className="more-dropdown more-with-triangle">
                                  <li>
                                    <a href="#">Report Profile</a>
                                  </li>
                                  <li>
                                    <a href="#">Block Profile</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="control-block-button">
                        <a
                          href="35-YourAccount-FriendsRequests.html"
                          className="btn btn-control bg-blue"
                        >
                          <svg className="olymp-happy-face-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control bg-purple">
                          <svg className="olymp-chat---messages-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
                          </svg>
                        </a>
                        <div className="btn btn-control bg-primary more">
                          <svg className="olymp-settings-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-settings-icon" />
                          </svg>
                          <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                            <li>
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#update-header-photo"
                              >
                                Update Profile Photo
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#update-header-photo"
                              >
                                Update Header Photo
                              </a>
                            </li>
                            <li>
                              <a href="29-YourAccount-AccountSettings.html">
                                Account Settings
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="top-header-author">
                      <a href="02-ProfilePage.html" className="author-thumb">
                        <img src="img/author-main1.jpg" alt="author" />
                      </a>
                      <div className="author-content">
                        <a
                          href="02-ProfilePage.html"
                          className="h4 author-name"
                        >
                          James Spiegel
                        </a>
                        <div className="country">San Francisco, CA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ... end Top Header-Profile */}
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="ui-block-title inline-items">
                    <div className="btn btn-control btn-control-small bg-yellow">
                      <svg className="olymp-trophy-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-trophy-icon" />
                      </svg>
                    </div>
                    <h6 className="title">James’s Featured Video</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                {/* Features Video */}
                <div className="ui-block features-video">
                  <div className="video-player">
                    <img src="img/video9.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="video-content">
                      <div className="h4 title">
                        Rock Garden Festival - Day 3
                      </div>
                      <time className="published" dateTime="2017-03-24T18:18">
                        12:06
                      </time>
                    </div>
                    <div className="overlay" />
                  </div>
                  <div className="features-video-content">
                    <article className="hentry post">
                      <div className="post__author author vcard inline-items">
                        <img src="img/author-page.jpg" alt="author" />
                        <div className="author-date">
                          <a
                            className="h6 post__author-name fn"
                            href="02-ProfilePage.html"
                          >
                            James Spiegel
                          </a>
                          <div className="post__date">
                            <time
                              className="published"
                              dateTime="2017-03-24T18:18"
                            >
                              2 hours ago
                            </time>
                          </div>
                        </div>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                          </svg>
                          <ul className="more-dropdown">
                            <li>
                              <a href="#">Edit Post</a>
                            </li>
                            <li>
                              <a href="#">Delete Post</a>
                            </li>
                            <li>
                              <a href="#">Turn Off Notifications</a>
                            </li>
                            <li>
                              <a href="#">Select as Featured</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p>
                        Last Saturday we went with{" "}
                        <a href="#"> Mathilda Brinker</a> to the “Rock Garden
                        Festival” and had a blast! Here’s a small video of one
                        of us in the crowd.
                      </p>
                      <div className="post-additional-info inline-items">
                        <a href="#" className="post-add-icon inline-items">
                          <svg className="olymp-heart-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-heart-icon" />
                          </svg>
                          <span>14</span>
                        </a>
                        <div className="comments-shared">
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-speech-balloon-icon">
                              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-speech-balloon-icon" />
                            </svg>
                            <span>19</span>
                          </a>
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-share-icon">
                              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-share-icon" />
                            </svg>
                            <span>27</span>
                          </a>
                        </div>
                      </div>
                      <div className="control-block-button post-control-button">
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-like-post-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-like-post-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-comments-post-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-share-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-share-icon" />
                          </svg>
                        </a>
                      </div>
                    </article>
                    <div className="mCustomScrollbar" data-mcs-theme="dark">
                      <ul className="comments-list">
                        <li className="comment-item">
                          <div className="post__author author vcard inline-items">
                            <img src="img/avatar48-sm.jpg" alt="author" />
                            <div className="author-date">
                              <a className="h6 post__author-name fn" href="#">
                                Marina Valentine
                              </a>
                              <div className="post__date">
                                <time
                                  className="published"
                                  dateTime="2017-03-24T18:18"
                                >
                                  46 mins ago
                                </time>
                              </div>
                            </div>
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                              </svg>
                            </a>
                          </div>
                          <p>I had a great time too!! We should do it again!</p>
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-heart-icon">
                              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-heart-icon" />
                            </svg>
                            <span>8</span>
                          </a>
                          <a href="#" className="reply">
                            Reply
                          </a>
                        </li>
                        <li className="comment-item">
                          <div className="post__author author vcard inline-items">
                            <img src="img/avatar4-sm.jpg" alt="author" />
                            <div className="author-date">
                              <a className="h6 post__author-name fn" href="#">
                                Chris Greyson
                              </a>
                              <div className="post__date">
                                <time
                                  className="published"
                                  dateTime="2017-03-24T18:18"
                                >
                                  1 hour ago
                                </time>
                              </div>
                            </div>
                            <a href="#" className="more">
                              <svg className="olymp-three-dots-icon">
                                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                              </svg>
                            </a>
                          </div>
                          <p>
                            Dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit.
                          </p>
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-heart-icon">
                              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-heart-icon" />
                            </svg>
                            <span>7</span>
                          </a>
                          <a href="#" className="reply">
                            Reply
                          </a>
                        </li>
                      </ul>
                    </div>
                    <form className="comment-form inline-items">
                      <div className="post__author author vcard inline-items">
                        <img src="img/avatar73-sm.jpg" alt="author" />
                        <div className="form-group with-icon-right ">
                          <textarea
                            className="form-control"
                            placeholder="Press Enter to post..."
                            defaultValue={""}
                          />
                          <div className="add-options-message">
                            <a
                              href="#"
                              className="options-message"
                              data-toggle="modal"
                              data-target="#update-header-photo"
                            >
                              <svg className="olymp-camera-icon">
                                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-camera-icon" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* ... end Features Video */}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="ui-block-title">
                    <div className="h6 title">James’s Videos</div>
                    <div className="align-right">
                      <a
                        href="#"
                        className="btn btn-primary btn-md-2"
                        data-toggle="modal"
                        data-target="#update-header-photo"
                      >
                        Upload Video +
                      </a>
                    </div>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="ui-block video-item">
                  <div className="video-player">
                    <img src="img/video10.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="overlay overlay-dark" />
                    <div className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </div>
                  </div>
                  <div className="ui-block-content video-content">
                    <a href="#" className="h6 title">
                      Rock Garden Festival - Day 3
                    </a>
                    <time className="published" dateTime="2017-03-24T18:18">
                      18:44
                    </time>
                  </div>
                </div>
              </div>
              <div className="col col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="ui-block video-item">
                  <div className="video-player">
                    <img src="img/video11.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video play-video--small"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="overlay overlay-dark" />
                    <div className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </div>
                  </div>
                  <div className="ui-block-content video-content">
                    <a href="#" className="h6 title">
                      Rock Garden Festival - Day 2
                    </a>
                    <time className="published" dateTime="2017-03-24T18:18">
                      13:19
                    </time>
                  </div>
                </div>
              </div>
              <div className="col col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="ui-block video-item">
                  <div className="video-player">
                    <img src="img/video12.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="overlay overlay-dark" />
                    <div className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </div>
                  </div>
                  <div className="ui-block-content video-content">
                    <a href="#" className="h6 title">
                      Rock Garden Festival - Day 1
                    </a>
                    <time className="published" dateTime="2017-03-24T18:18">
                      15:47
                    </time>
                  </div>
                </div>
              </div>
              <div className="col col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="ui-block video-item">
                  <div className="video-player">
                    <img src="img/video13.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video play-video--small"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="overlay overlay-dark" />
                    <div className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </div>
                  </div>
                  <div className="ui-block-content video-content">
                    <a href="#" className="h6 title">
                      The Best Burgers in the State!
                    </a>
                    <time className="published" dateTime="2017-03-24T18:18">
                      0:23
                    </time>
                  </div>
                </div>
              </div>
              <div className="col col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="ui-block video-item">
                  <div className="video-player">
                    <img src="img/video14.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video play-video--small"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="overlay overlay-dark" />
                    <div className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </div>
                  </div>
                  <div className="ui-block-content video-content">
                    <a href="#" className="h6 title">
                      Touring Manhattan Parks
                    </a>
                    <time className="published" dateTime="2017-03-24T18:18">
                      12:08
                    </time>
                  </div>
                </div>
              </div>
              <div className="col col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="ui-block video-item">
                  <div className="video-player">
                    <img src="img/video15.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video play-video--small"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="overlay overlay-dark" />
                    <div className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </div>
                  </div>
                  <div className="ui-block-content video-content">
                    <a href="#" className="h6 title">
                      Sandwich from Mario’s
                    </a>
                    <time className="published" dateTime="2017-03-24T18:18">
                      5:54
                    </time>
                  </div>
                </div>
              </div>
              <div className="col col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="ui-block video-item">
                  <div className="video-player">
                    <img src="img/video16.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video play-video--small"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="overlay overlay-dark" />
                    <div className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </div>
                  </div>
                  <div className="ui-block-content video-content">
                    <a href="#" className="h6 title">
                      Into the Amazon Jungle
                    </a>
                    <time className="published" dateTime="2017-03-24T18:18">
                      24:36
                    </time>
                  </div>
                </div>
              </div>
              <div className="col col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="ui-block video-item">
                  <div className="video-player">
                    <img src="img/video17.jpg" alt="photo" />
                    <a
                      href="https://youtube.com/watch?v=excVFQ2TWig"
                      className="play-video play-video--small"
                    >
                      <svg className="olymp-play-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-play-icon" />
                      </svg>
                    </a>
                    <div className="overlay overlay-dark" />
                    <div className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </div>
                  </div>
                  <div className="ui-block-content video-content">
                    <a href="#" className="h6 title">
                      Record Store Day 2016
                    </a>
                    <time className="published" dateTime="2017-03-24T18:18">
                      7:52
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Window-popup Update Header Photo */}
          <div
            className="modal fade"
            id="update-header-photo"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="update-header-photo"
            aria-hidden="true"
          >
            <div
              className="modal-dialog window-popup update-header-photo"
              role="document"
            >
              <div className="modal-content">
                <a
                  href="#"
                  className="close icon-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <svg className="olymp-close-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                  </svg>
                </a>
                <div className="modal-header">
                  <h6 className="title">Update Header Photo</h6>
                </div>
                <div className="modal-body">
                  <a href="#" className="upload-photo-item">
                    <svg className="olymp-computer-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-computer-icon" />
                    </svg>
                    <h6>Upload Photo</h6>
                    <span>Browse your computer.</span>
                  </a>
                  <a
                    href="#"
                    className="upload-photo-item"
                    data-toggle="modal"
                    data-target="#choose-from-my-photo"
                  >
                    <svg className="olymp-photos-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-photos-icon" />
                    </svg>
                    <h6>Choose from My Photos</h6>
                    <span>Choose from your uploaded photos</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* ... end Window-popup Update Header Photo */}
          {/* Window-popup Choose from my Photo */}
          <div
            className="modal fade"
            id="choose-from-my-photo"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="choose-from-my-photo"
            aria-hidden="true"
          >
            <div
              className="modal-dialog window-popup choose-from-my-photo"
              role="document"
            >
              <div className="modal-content">
                <a
                  href="#"
                  className="close icon-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <svg className="olymp-close-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                  </svg>
                </a>
                <div className="modal-header">
                  <h6 className="title">Choose from My Photos</h6>
                  {/* Nav tabs */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-expanded="true"
                      >
                        <svg className="olymp-photos-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-photos-icon" />
                        </svg>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-expanded="false"
                      >
                        <svg className="olymp-albums-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-albums-icon" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="modal-body">
                  {/* Tab panes */}
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="home"
                      role="tabpanel"
                      aria-expanded="true"
                    >
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo1.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo2.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo3.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo4.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo5.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo6.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo7.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo8.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo9.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="btn btn-secondary btn-lg btn--half-width"
                      >
                        Cancel
                      </a>
                      <a
                        href="#"
                        className="btn btn-primary btn-lg btn--half-width"
                      >
                        Confirm Photo
                      </a>
                    </div>
                    <div
                      className="tab-pane"
                      id="profile"
                      role="tabpanel"
                      aria-expanded="false"
                    >
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo10.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">South America Vacations</a>
                            <span>Last Added: 2 hours ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo11.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">Photoshoot Summer 2016</a>
                            <span>Last Added: 5 weeks ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo12.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">Amazing Street Food</a>
                            <span>Last Added: 6 mins ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo13.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">Graffity &amp; Street Art</a>
                            <span>Last Added: 16 hours ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo14.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">Amazing Landscapes</a>
                            <span>Last Added: 13 mins ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo15.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">The Majestic Canyon</a>
                            <span>Last Added: 57 mins ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <a
                        href="#"
                        className="btn btn-secondary btn-lg btn--half-width"
                      >
                        Cancel
                      </a>
                      <a
                        href="#"
                        className="btn btn-primary btn-lg disabled btn--half-width"
                      >
                        Confirm Photo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ... end Window-popup Choose from my Photo */}
          <a className="back-to-top" href="#">
            <img
              src="svg-icons/back-to-top.svg"
              alt="arrow"
              className="back-icon"
            />
          </a>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default Page;
