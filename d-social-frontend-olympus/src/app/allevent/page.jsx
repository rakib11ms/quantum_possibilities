import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React from "react";
import topHeader from "../../../public/img/top-header2.jpg";
import authorMain from "../../../public/img/author-main2.jpg";
import avatar66 from "../../../public/img/avatar66-sm.jpg";
import harmonic5 from "../../../public/img/friend-harmonic5.jpg";
import harmonic10 from "../../../public/img/friend-harmonic10.jpg";
import harmonic7 from "../../../public/img/friend-harmonic7.jpg";
import harmonic8 from "../../../public/img/friend-harmonic8.jpg";
import harmonic2 from "../../../public/img/friend-harmonic2.jpg";
import backToTop from "../../../public/svg-icons/back-to-top.svg";
const Page = () => {
  return (
    <div>
      <Masterdashboardlayout headerName="Events">
        <div>
          {/* <div className="header-spacer" /> */}
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="top-header top-header-favorit">
                    <div className="top-header-thumb">
                      <img src={topHeader.src} alt="nature" />
                      <div className="top-header-author">
                        <div className="author-thumb">
                          <img src={authorMain.src} alt="author" />
                        </div>
                        <div className="author-content">
                          <a href="#" className="h3 author-name">
                            Green Goo Rock
                          </a>
                          <div className="country">
                            Rock Band | San Francisco, CA
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile-section">
                      <div className="row">
                        <div className="col col-xl-8 m-auto col-lg-8 col-md-12">
                          <ul className="profile-menu">
                            <li>
                              <a
                                href="12-FavouritePage.html"
                                className="active"
                              >
                                Timeline
                              </a>
                            </li>
                            <li>
                              <a href="13-FavouritePage-About.html">About</a>
                            </li>
                            <li>
                              <a href="07-ProfilePage-Photos.html">Photos</a>
                            </li>
                            <li>
                              <a href="09-ProfilePage-Videos.html">Videos</a>
                            </li>
                            <li>
                              <a href="14-FavouritePage-Statistics.html">
                                Statistics
                              </a>
                            </li>
                            <li>
                              <a href="15-FavouritePage-Events.html">Events</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="control-block-button">
                        <a href="#" className="btn btn-control bg-primary">
                          <svg className="olymp-star-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-star-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control bg-purple">
                          <svg className="olymp-chat---messages-icon">
                            <use xlinkHref="svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="ui-block-title">
                    <div className="h6 title">Green Goo’s Events</div>
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
                <div className="ui-block">
                  <div className="ui-block-title ui-block-title-small">
                    <h6 className="title">UPCOMING EVENTS 2016</h6>
                  </div>
                  <table className="event-item-table">
                    <tbody>
                      <tr className="event-item">
                        <td className="upcoming">
                          <div className="date-event">
                            <svg className="olymp-small-calendar-icon">
                              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-small-calendar-icon" />
                            </svg>
                            <span className="day">28</span>
                            <span className="month">may</span>
                          </div>
                        </td>
                        <td className="author">
                          <div className="event-author inline-items">
                            <div className="author-thumb">
                              <img src={avatar66.src} alt="author" />
                            </div>
                            <div className="author-date">
                              <a href="#" className="author-name h6">
                                Green Goo in Gotham
                              </a>
                              <time
                                className="published"
                                dateTime="2017-03-24T18:18"
                              >
                                Saturday at 9:00pm
                              </time>
                            </div>
                          </div>
                        </td>
                        <td className="location">
                          <div className="place inline-items">
                            <svg className="olymp-add-a-place-icon">
                              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-a-place-icon" />
                            </svg>
                            <span>Gotham Bar</span>
                          </div>
                        </td>
                        <td className="description">
                          <p className="description">
                            We’ll be playing in the Gotham Bar in May. Come and
                            have a great time with us! Entry: $12
                          </p>
                        </td>
                        <td className="users">
                          <ul className="friends-harmonic">
                            <li>
                              <a href="#">
                                <img src={harmonic5.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={harmonic10.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={harmonic7.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={harmonic8.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={harmonic2.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="all-users bg-breez">
                                +24
                              </a>
                            </li>
                            <li className="with-text">Will Assist</li>
                          </ul>
                        </td>
                        <td className="add-event">
                          <a
                            href="20-CalendarAndEvents-MonthlyCalendar.html"
                            className="btn btn-breez btn-sm"
                          >
                            Add to Calendar
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="ui-block-title ui-block-title-small">
                    <h6 className="title">PAST EVENTS</h6>
                  </div>
                  <div className="no-past-events">
                    <svg className="olymp-month-calendar-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-month-calendar-icon" />
                    </svg>
                    <span>
                      There are no past events <br />
                      to show
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a className="back-to-top" href="#">
            <img src={backToTop.src} alt="arrow" className="back-icon" />
          </a>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default Page;
