import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React from "react";

const Page = () => {
  return (
    <div>
      <Masterdashboardlayout headerName="All Notification">
        <div>
          <div className="main-header">
            <div className="content-bg-wrap bg-account" />
            <div className="container">
              <div className="row">
                <div className="col col-lg-8 m-auto col-md-8 col-sm-12 col-12">
                  <div className="main-header-content">
                    <h1>Your Account Dashboard</h1>
                    <p>
                      Welcome to your account dashboard! Here you’ll find
                      everything you need to change your profile information,
                      settings, read notifications and requests, view your
                      latest messages, change your pasword and much more! Also
                      you can create or manage your own favourite page, have
                      fun!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="img-bottom"
              src="img/account-bottom.png"
              alt="friends"
            />
          </div>
          {/* ... end Main Header Account */}
          {/* Your Account Personal Information */}
          <div className="container">
            <div className="row">
              <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Notifications</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  {/* Notification List */}
                  <ul className="notification-list">
                    <li>
                      <div className="author-thumb">
                        <img src="img/avatar1-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        <a href="#" className="h6 notification-friend">
                          Mathilda Brinker
                        </a>{" "}
                        commented on your new{" "}
                        <a href="#" className="notification-link">
                          profile status
                        </a>
                        .
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            4 hours ago
                          </time>
                        </span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-comments-post-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                        </svg>
                      </span>
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                        </svg>
                        <svg className="olymp-little-delete">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                        </svg>
                      </div>
                    </li>
                    <li className="un-read">
                      <div className="author-thumb">
                        <img src="img/avatar2-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        You and{" "}
                        <a href="#" className="h6 notification-friend">
                          Nicholas Grissom
                        </a>{" "}
                        just became friends. Write on{" "}
                        <a href="#" className="notification-link">
                          his wall
                        </a>
                        .
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            9 hours ago
                          </time>
                        </span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-happy-face-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-happy-face-icon" />
                        </svg>
                      </span>
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                        </svg>
                        <svg className="olymp-little-delete">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                        </svg>
                      </div>
                    </li>
                    <li className="with-comment-photo">
                      <div className="author-thumb">
                        <img src="img/avatar3-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        <a href="#" className="h6 notification-friend">
                          Sarah Hetfield
                        </a>{" "}
                        commented on your{" "}
                        <a href="#" className="notification-link">
                          photo
                        </a>
                        .
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            Yesterday at 5:32am
                          </time>
                        </span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-comments-post-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                        </svg>
                      </span>
                      <div className="comment-photo">
                        <img src="img/comment-photo.jpg" alt="photo" />
                        <span>
                          “She looks incredible in that outfit! We should see
                          each...”
                        </span>
                      </div>
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                        </svg>
                        <svg className="olymp-little-delete">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className="author-thumb">
                        <img src="img/avatar4-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        <a href="#" className="h6 notification-friend">
                          Chris Greyson
                        </a>{" "}
                        liked your{" "}
                        <a href="#" className="notification-link">
                          profile status
                        </a>
                        .
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            March 18th at 8:22pm
                          </time>
                        </span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-heart-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-heart-icon" />
                        </svg>
                      </span>
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                        </svg>
                        <svg className="olymp-little-delete">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className="author-thumb">
                        <img src="img/avatar5-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        <a href="#" className="h6 notification-friend">
                          Green Goo Rock
                        </a>{" "}
                        invited you to attend to his event Goo in{" "}
                        <a href="#" className="notification-link">
                          Gotham Bar
                        </a>
                        .
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            March 5th at 6:43pm
                          </time>
                        </span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-calendar-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-calendar-icon" />
                        </svg>
                      </span>
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                        </svg>
                        <svg className="olymp-little-delete">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className="author-thumb">
                        <img src="img/avatar6-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        <a href="#" className="h6 notification-friend">
                          James Summers
                        </a>{" "}
                        commented on your new{" "}
                        <a href="#" className="notification-link">
                          profile status
                        </a>
                        .
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            March 2nd at 8:29pm
                          </time>
                        </span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-comments-post-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                        </svg>
                      </span>
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                        </svg>
                        <svg className="olymp-little-delete">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                        </svg>
                      </div>
                    </li>
                    <li>
                      <div className="author-thumb">
                        <img src="img/avatar7-sm.jpg" alt="author" />
                      </div>
                      <div className="notification-event">
                        <a href="#" className="h6 notification-friend">
                          Marina Valentine
                        </a>{" "}
                        commented on your new{" "}
                        <a href="#" className="notification-link">
                          profile status
                        </a>
                        .
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            March 2nd at 10:07am
                          </time>
                        </span>
                      </div>
                      <span className="notification-icon">
                        <svg className="olymp-comments-post-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                        </svg>
                      </span>
                      <div className="more">
                        <svg className="olymp-three-dots-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                        </svg>
                        <svg className="olymp-little-delete">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                        </svg>
                      </div>
                    </li>
                  </ul>
                  {/* ... end Notification List */}
                </div>
                {/* Pagination */}
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1}>
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                        <div className="ripple-container">
                          <div
                            className="ripple ripple-on ripple-out"
                            style={{
                              left: "-10.3833px",
                              top: "-16.8333px",
                              "background-color": "rgb(255, 255, 255)",
                              "-webkit-transform": "scale(16.7857)",
                              "-ms-transform": "scale(16.7857)",
                              transform: "scale(16.7857)",
                            }}
                          />
                        </div>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        ...
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        12
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
                {/* ... end Pagination */}
              </div>
              <div className="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12 responsive-display-none">
                <div className="ui-block">
                  {/* Your Profile  */}
                  <div className="your-profile">
                    <div className="ui-block-title ui-block-title-small">
                      <h6 className="title">Your PROFILE</h6>
                    </div>
                    <div
                      id="accordion"
                      role="tablist"
                      aria-multiselectable="true"
                    >
                      <div className="card">
                        <div className="card-header" role="tab" id="headingOne">
                          <h6 className="mb-0">
                            <a
                              data-toggle="collapse"
                              data-parent="#accordion"
                              href="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Profile Settings
                              <svg className="olymp-dropdown-arrow-icon">
                                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon" />
                              </svg>
                            </a>
                          </h6>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          role="tabpanel"
                          aria-labelledby="headingOne"
                        >
                          <ul className="your-profile-menu">
                            <li>
                              <a href="28-YourAccount-PersonalInformation.html">
                                Personal Information
                              </a>
                            </li>
                            <li>
                              <a href="29-YourAccount-AccountSettings.html">
                                Account Settings
                              </a>
                            </li>
                            <li>
                              <a href="30-YourAccount-ChangePassword.html">
                                Change Password
                              </a>
                            </li>
                            <li>
                              <a href="31-YourAccount-HobbiesAndInterests.html">
                                Hobbies and Interests
                              </a>
                            </li>
                            <li>
                              <a href="32-YourAccount-EducationAndEmployement.html">
                                Education and Employement
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="ui-block-title">
                      <a
                        href="33-YourAccount-Notifications.html"
                        className="h6 title"
                      >
                        Notifications
                      </a>
                      <a href="#" className="items-round-little bg-primary">
                        8
                      </a>
                    </div>
                    <div className="ui-block-title">
                      <a
                        href="34-YourAccount-ChatMessages.html"
                        className="h6 title"
                      >
                        Chat / Messages
                      </a>
                    </div>
                    <div className="ui-block-title">
                      <a
                        href="35-YourAccount-FriendsRequests.html"
                        className="h6 title"
                      >
                        Friend Requests
                      </a>
                      <a href="#" className="items-round-little bg-blue">
                        4
                      </a>
                    </div>
                    <div className="ui-block-title ui-block-title-small">
                      <h6 className="title">FAVOURITE PAGE</h6>
                    </div>
                    <div className="ui-block-title">
                      <a
                        href="36-FavPage-SettingsAndCreatePopup.html"
                        className="h6 title"
                      >
                        Create Fav Page
                      </a>
                    </div>
                    <div className="ui-block-title">
                      <a
                        href="36-FavPage-SettingsAndCreatePopup.html"
                        className="h6 title"
                      >
                        Fav Page Settings
                      </a>
                    </div>
                  </div>
                  {/* ... end Your Profile  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default Page;
