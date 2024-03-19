import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React from "react";

const Page = () => {
  return (
    <div>
      <Masterdashboardlayout headerName="Account Settings">
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
          <div className="container">
            <div className="row">
              <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Account Settings</h6>
                  </div>
                  <div className="ui-block-content">
                    {/* Personal Account Settings Form */}
                    <form>
                      <div className="row">
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group label-floating is-select">
                            <label className="control-label">
                              Who Can Friend You?
                            </label>
                            <select className="selectpicker form-control">
                              <option value="EO">Everyone</option>
                              <option value="NO">No One</option>
                            </select>
                          </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group label-floating is-select">
                            <label className="control-label">
                              Who Can View Your Posts
                            </label>
                            <select className="selectpicker form-control">
                              <option value="US">Friends Only</option>
                              <option value="EO">Everyone</option>
                            </select>
                          </div>
                        </div>
                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="description-toggle">
                            <div className="description-toggle-content">
                              <div className="h6">Notifications Sound</div>
                              <p>
                                A sound will be played each time you receive a
                                new activity notification
                              </p>
                            </div>
                            <div className="togglebutton">
                              <label>
                                <input type="checkbox" defaultChecked />
                              </label>
                            </div>
                          </div>
                          <div className="description-toggle">
                            <div className="description-toggle-content">
                              <div className="h6">Notifications Email</div>
                              <p>
                                We’ll send you an email to your account each
                                time you receive a new activity notification
                              </p>
                            </div>
                            <div className="togglebutton">
                              <label>
                                <input type="checkbox" defaultChecked />
                              </label>
                            </div>
                          </div>
                          <div className="description-toggle">
                            <div className="description-toggle-content">
                              <div className="h6">Friend’s Birthdays</div>
                              <p>
                                Choose wheather or not receive notifications
                                about your friend’s birthdays on your newsfeed
                              </p>
                            </div>
                            <div className="togglebutton">
                              <label>
                                <input type="checkbox" defaultChecked />
                              </label>
                            </div>
                          </div>
                          <div className="description-toggle">
                            <div className="description-toggle-content">
                              <div className="h6">Chat Message Sound</div>
                              <p>
                                A sound will be played each time you receive a
                                new message on an inactive chat window
                              </p>
                            </div>
                            <div className="togglebutton">
                              <label>
                                <input type="checkbox" defaultChecked />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                          <button className="btn btn-secondary btn-lg full-width">
                            Restore all Attributes
                          </button>
                        </div>
                        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                          <button className="btn btn-primary btn-lg full-width">
                            Save all Changes
                          </button>
                        </div>
                      </div>
                    </form>
                    {/* ... end Personal Account Settings Form  */}
                  </div>
                </div>
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
                              <p>Personal Information</p>
                            </li>
                            <li>
                              <p>Account Settings</p>
                            </li>
                            <li>
                              <p>Change Password</p>
                            </li>
                            <li>
                              <p href="31-YourAccount-HobbiesAndInterests.html">
                                Hobbies and Interests
                              </p>
                            </li>
                            <li>
                              <p href="32-YourAccount-EducationAndEmployement.html">
                                Education and Employement
                              </p>
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
          {/* ... end Your Account Personal Information */}
          {/* Window-popup-CHAT for responsive min-width: 768px */}
          <div
            className="ui-block popup-chat popup-chat-responsive"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="popup-chat-responsive"
            aria-hidden="true"
          >
            <div className="modal-content">
              <div className="modal-header">
                <span className="icon-status online" />
                <h6 className="title">Chat</h6>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <svg className="olymp-little-delete js-chat-open">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-little-delete" />
                  </svg>
                </div>
              </div>
              <div className="modal-body">
                <div className="mCustomScrollbar">
                  <ul className="notification-list chat-message chat-message-field">
                    <li>
                      <div className="author-thumb">
                        <img
                          src="img/avatar14-sm.jpg"
                          alt="author"
                          className="mCS_img_loaded"
                        />
                      </div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Hi James! Please remember to buy the food for
                          tomorrow! I’m gonna be handling the gifts and Jake’s
                          gonna get the drinks
                        </span>
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            Yesterday at 8:10pm
                          </time>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="author-thumb">
                        <img
                          src="img/author-page.jpg"
                          alt="author"
                          className="mCS_img_loaded"
                        />
                      </div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Don’t worry Mathilda!
                        </span>
                        <span className="chat-message-item">
                          I already bought everything
                        </span>
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            Yesterday at 8:29pm
                          </time>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="author-thumb">
                        <img
                          src="img/avatar14-sm.jpg"
                          alt="author"
                          className="mCS_img_loaded"
                        />
                      </div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Hi James! Please remember to buy the food for
                          tomorrow! I’m gonna be handling the gifts and Jake’s
                          gonna get the drinks
                        </span>
                        <span className="notification-date">
                          <time
                            className="entry-date updated"
                            dateTime="2004-07-24T18:18"
                          >
                            Yesterday at 8:10pm
                          </time>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <form className="need-validation">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Press enter to post..."
                      defaultValue={""}
                    />
                    <div className="add-options-message">
                      <a href="#" className="options-message">
                        <svg className="olymp-computer-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-computer-icon" />
                        </svg>
                      </a>
                      <div className="options-message smile-block">
                        <svg className="olymp-happy-sticker-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-happy-sticker-icon" />
                        </svg>
                        <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                          <li>
                            <a href="#">
                              <img src="img/icon-chat1.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat2.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat3.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat4.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat5.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat6.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat7.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat8.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat9.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat10.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat11.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat12.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat13.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat14.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat15.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat16.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat17.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat18.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat19.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat20.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat21.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat22.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat23.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat24.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat25.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat26.png" alt="icon" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon-chat27.png" alt="icon" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default Page;
