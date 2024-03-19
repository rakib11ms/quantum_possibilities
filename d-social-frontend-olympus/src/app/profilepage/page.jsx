import React from "react";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import topHeader from "../../../public/img/top-header2.jpg";
import authorMain from "../../../public/img/author-main2.jpg";
import harmonic1 from "../../../public/img/friend-harmonic1.jpg";
import harmonic2 from "../../../public/img/friend-harmonic2.jpg";
import harmonic3 from "../../../public/img/friend-harmonic3.jpg";
import harmonic4 from "../../../public/img/friend-harmonic4.jpg";
import harmonic5 from "../../../public/img/friend-harmonic5.jpg";
import harmonic6 from "../../../public/img/friend-harmonic6.jpg";
import harmonic10 from "../../../public/img/friend-harmonic10.jpg";
import harmonic11 from "../../../public/img/friend-harmonic11.jpg";
import harmonic7 from "../../../public/img/friend-harmonic7.jpg";
import harmonic8 from "../../../public/img/friend-harmonic8.jpg";
import group3 from "../../../public/img/friend-group3.jpg";
import group4 from "../../../public/img/friend-group4.jpg";
import group1 from "../../../public/img/friend-group1.png";
import group2 from "../../../public/img/friend-group2.jpg";
import harmonic9 from "../../../public/img/friend-harmonic9.jpg";
import avatar30 from "../../../public/img/avatar30-sm.jpg";
import avatar5 from "../../../public/img/avatar5-sm.jpg";
import avatar2 from "../../../public/img/avatar2-sm.jpg";
import avatar19 from "../../../public/img/avatar19-sm.jpg";
import authorPage from "../../../public/img/author-page.jpg";
import post__thumb1 from "../../../public/img/post__thumb1.jpg";
import youtubeLogo from "../../../public/img/video-youtube.jpg";
import page1 from "../../../public/img/faved-page1.jpg";
import page2 from "../../../public/img/faved-page2.jpg";
import page3 from "../../../public/img/faved-page3.jpg";
import page4 from "../../../public/img/faved-page4.jpg";
import page5 from "../../../public/img/faved-page5.jpg";
import page6 from "../../../public/img/faved-page6.jpg";
import page7 from "../../../public/img/faved-page7.jpg";
import page8 from "../../../public/img/faved-page8.jpg";
import page9 from "../../../public/img/faved-page9.jpg";
import page10 from "../../../public/img/faved-page10.jpg";
import page11 from "../../../public/img/faved-page11.jpg";
import page12 from "../../../public/img/faved-page12.jpg";
import photo15 from "../../../public/img/choose-photo15.jpg";
import photo14 from "../../../public/img/choose-photo14.jpg";
import photo13 from "../../../public/img/choose-photo13.jpg";
import photo12 from "../../../public/img/choose-photo12.jpg";
import photo11 from "../../../public/img/choose-photo11.jpg";
import photo10 from "../../../public/img/choose-photo10.jpg";
import photo9 from "../../../public/img/choose-photo9.jpg";
import photo8 from "../../../public/img/choose-photo8.jpg";
import photo7 from "../../../public/img/choose-photo7.jpg";
import photo6 from "../../../public/img/choose-photo6.jpg";
import photo5 from "../../../public/img/choose-photo5.jpg";
import photo4 from "../../../public/img/choose-photo4.jpg";
import photo3 from "../../../public/img/choose-photo3.jpg";
import photo2 from "../../../public/img/choose-photo2.jpg";
import photo1 from "../../../public/img/choose-photo1.jpg";
import playlist6 from "../../../public/img/playlist6.jpg";
import playlist7 from "../../../public/img/playlist7.jpg";
import playlist8 from "../../../public/img/playlist8.jpg";
import playlist9 from "../../../public/img/playlist9.jpg";
import playlist10 from "../../../public/img/playlist10.jpg";
import lastphoto1 from "../../../public/img/last-photo1-large.jpg";
import lastphoto2 from "../../../public/img/last-photo2-large.jpg";
import lastphoto3 from "../../../public/img/last-photo3-large.jpg";
import lastphoto4 from "../../../public/img/last-photo4-large.jpg";
import twitteravater from "../../../public/img/twitter-avatar.png";

const page = () => {
  return (
    <div>
      <Masterdashboardlayout headerName="Profile Page">
        <div>
          {/* ... end Responsive Header-BP */}
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
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-star-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control bg-purple">
                          <svg className="olymp-chat---messages-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
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
              <div className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-sm-12 col-12">
                <div id="newsfeed-items-grid">
                  <div className="ui-block">
                    {/* Post */}
                    <article className="hentry post">
                      <div className="post__author author vcard inline-items">
                        <img src={avatar5.src} alt="author" />
                        <div className="author-date">
                          <a className="h6 post__author-name fn" href="#">
                            Green Goo Rock
                          </a>
                          <div className="post__date">
                            <time
                              className="published"
                              dateTime="2017-03-24T18:18"
                            >
                              4 hours ago
                            </time>
                          </div>
                        </div>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
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
                        Hi guys! We just wanted to let everyone know that we are
                        currently recording our new album “News of the Goo”.
                        We’ll be playing one of our new songs this Friday at 8pm
                        in our Fake Street 320 recording studio, come and join
                        us!
                      </p>
                      <div className="post-additional-info inline-items">
                        <a href="#" className="post-add-icon inline-items">
                          <svg className="olymp-heart-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-heart-icon" />
                          </svg>
                          <span>36</span>
                        </a>
                        <ul className="friends-harmonic">
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
                              <img src={harmonic9.src} alt="friend" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src={harmonic10.src} alt="friend" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src={harmonic11.src} alt="friend" />
                            </a>
                          </li>
                        </ul>
                        <div className="names-people-likes">
                          <a href="#">You</a>, <a href="#">Elaine</a> and
                          <br />
                          34 more liked this
                        </div>
                        <div className="comments-shared">
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-speech-balloon-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-speech-balloon-icon" />
                            </svg>
                            <span>17</span>
                          </a>
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-share-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-share-icon" />
                            </svg>
                            <span>24</span>
                          </a>
                        </div>
                      </div>
                      <div className="control-block-button post-control-button">
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-like-post-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-like-post-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-comments-post-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-share-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-share-icon" />
                          </svg>
                        </a>
                      </div>
                    </article>
                    {/* ... end Post */}
                    {/* Comments */}
                    <ul className="comments-list">
                      <li className="comment-item">
                        <div className="post__author author vcard inline-items">
                          <img src={avatar2.src} alt="author" />
                          <div className="author-date">
                            <a className="h6 post__author-name fn" href="#">
                              Nicholas Grissom
                            </a>
                            <div className="post__date">
                              <time
                                className="published"
                                dateTime="2017-03-24T18:18"
                              >
                                28 mins ago
                              </time>
                            </div>
                          </div>
                          <a href="#" className="more">
                            <svg className="olymp-three-dots-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
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
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-heart-icon" />
                          </svg>
                          <span>6</span>
                        </a>
                        <a href="#" className="reply">
                          Reply
                        </a>
                      </li>
                      <li className="comment-item">
                        <div className="post__author author vcard inline-items">
                          <img src={avatar19.src} alt="author" />
                          <div className="author-date">
                            <a className="h6 post__author-name fn" href="#">
                              Jimmy Elricson
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
                          <a href="#" className="more">
                            <svg className="olymp-three-dots-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                            </svg>
                          </a>
                        </div>
                        <p>
                          Ratione voluptatem sequi en lod nesciunt. Neque porro
                          quisquam est, quinder dolorem ipsum quia dolor sit
                          amet, consectetur adipisci velit en lorem ipsum duis
                          aute irure dolor in reprehenderit in voluptate velit
                          esse cillum.
                        </p>
                        <a href="#" className="post-add-icon inline-items">
                          <svg className="olymp-heart-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-heart-icon" />
                          </svg>
                          <span>8</span>
                        </a>
                        <a href="#" className="reply">
                          Reply
                        </a>
                      </li>
                    </ul>
                    {/* ... end Comments */}
                    <a href="#" className="more-comments">
                      View more comments <span>+</span>
                    </a>
                    {/* Comment Form  */}
                    <form className="comment-form inline-items">
                      <div className="post__author author vcard inline-items">
                        <img src={authorPage.src} alt="author" />
                        <div className="form-group with-icon-right ">
                          <textarea
                            className="form-control"
                            placeholder
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
                                <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-camera-icon" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-md-2 btn-primary">
                        Post Comment
                      </button>
                      <button className="btn btn-md-2 btn-border-think c-grey btn-transparent custom-color">
                        Cancel
                      </button>
                    </form>
                    {/* ... end Comment Form  */}
                  </div>
                  <div className="ui-block">
                    {/* Post */}
                    <article className="hentry post has-post-thumbnail">
                      <div className="post__author author vcard inline-items">
                        <img src={avatar5.src} alt="author" />
                        <div className="author-date">
                          <a className="h6 post__author-name fn" href="#">
                            Green Goo Rock
                          </a>
                          <div className="post__date">
                            <time
                              className="published"
                              dateTime="2017-03-24T18:18"
                            >
                              March 8 at 6:42pm
                            </time>
                          </div>
                        </div>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
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
                        Hey guys! We are gona be playing this Saturday of{" "}
                        <a href="#">The Marina Bar</a> for their new Mystic Deer
                        Party. If you wanna hang out and have a really good
                        time, come and join us. We’l be waiting for you!
                      </p>
                      <div className="post-thumb">
                        <img src={post__thumb1.src} alt="photo" />
                      </div>
                      <div className="post-additional-info inline-items">
                        <a href="#" className="post-add-icon inline-items">
                          <svg className="olymp-heart-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-heart-icon" />
                          </svg>
                          <span>49</span>
                        </a>
                        <ul className="friends-harmonic">
                          <li>
                            <a href="#">
                              <img src={harmonic9.src} alt="friend" />
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
                              <img src={harmonic11.src} alt="friend" />
                            </a>
                          </li>
                        </ul>
                        <div className="names-people-likes">
                          <a href="#">Jimmy</a>, <a href="#">Andrea</a> and
                          <br />
                          47 more liked this
                        </div>
                        <div className="comments-shared">
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-speech-balloon-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-speech-balloon-icon" />
                            </svg>
                            <span>264</span>
                          </a>
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-share-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-share-icon" />
                            </svg>
                            <span>37</span>
                          </a>
                        </div>
                      </div>
                      <div className="control-block-button post-control-button">
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-like-post-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-like-post-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-comments-post-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-share-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-share-icon" />
                          </svg>
                        </a>
                      </div>
                    </article>
                    {/* ... end Post */}
                  </div>
                  <div className="ui-block">
                    {/* Post */}
                    <article className="hentry post video">
                      <div className="post__author author vcard inline-items">
                        <img src={avatar5.src} alt="author" />
                        <div className="author-date">
                          <a className="h6 post__author-name fn" href="#">
                            Gren Goo Rock
                          </a>{" "}
                          shared a <a href="#">link</a>
                          <div className="post__date">
                            <time
                              className="published"
                              dateTime="2017-03-24T18:18"
                            >
                              March 4 at 2:05pm
                            </time>
                          </div>
                        </div>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
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
                        Hey <a href="#">Cindi</a>, you should really check out
                        this new song by Iron Maid. The next time they come to
                        the city we should totally go!
                      </p>
                      <div className="post-video">
                        <div className="video-thumb">
                          <img src={youtubeLogo.src} alt="photo" />
                          <a
                            href="https://youtube.com/watch?v=excVFQ2TWig"
                            className="play-video"
                          >
                            <svg className="olymp-play-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-play-icon" />
                            </svg>
                          </a>
                        </div>
                        <div className="video-content">
                          <a href="#" className="h4 title">
                            Killer Queen - Archiduke
                          </a>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur ipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua...
                          </p>
                          <a href="#" className="link-site">
                            YOUTUBE.COM
                          </a>
                        </div>
                      </div>
                      <div className="post-additional-info inline-items">
                        <a href="#" className="post-add-icon inline-items">
                          <svg className="olymp-heart-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-heart-icon" />
                          </svg>
                          <span>18</span>
                        </a>
                        <ul className="friends-harmonic">
                          <li>
                            <a href="#">
                              <img src={harmonic9.src} alt="friend" />
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
                              <img src={harmonic11.src} alt="friend" />
                            </a>
                          </li>
                        </ul>
                        <div className="names-people-likes">
                          <a href="#">Jenny</a>, <a href="#">Robert</a> and
                          <br />
                          18 more liked this
                        </div>
                        <div className="comments-shared">
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-speech-balloon-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-speech-balloon-icon" />
                            </svg>
                            <span>0</span>
                          </a>
                          <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-share-icon">
                              <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-share-icon" />
                            </svg>
                            <span>16</span>
                          </a>
                        </div>
                      </div>
                      <div className="control-block-button post-control-button">
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-like-post-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-like-post-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-comments-post-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                          </svg>
                        </a>
                        <a href="#" className="btn btn-control">
                          <svg className="olymp-share-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-share-icon" />
                          </svg>
                        </a>
                      </div>
                    </article>
                    {/* ... end Post */}{" "}
                  </div>
                </div>
                <a
                  id="load-more-button"
                  href="#"
                  className="btn btn-control btn-more"
                  data-load-link="items-to-load.html"
                  data-container="newsfeed-items-grid"
                >
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                </a>
              </div>
              <div className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Page Intro</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  <div className="ui-block-content">
                    {/* W-Personal-Info */}
                    <ul className="widget w-personal-info item-block">
                      <li>
                        <span className="text">
                          We are Rock Band from Los Angeles, now based in San
                          Francisco, come and listen to us play!
                        </span>
                      </li>
                      <li>
                        <span className="title">Created:</span>
                        <span className="text">September 17th, 2013</span>
                      </li>
                      <li>
                        <span className="title">Based in:</span>
                        <span className="text">San Francisco, California</span>
                      </li>
                      <li>
                        <span className="title">Contact:</span>
                        <a href="#" className="text">
                          greengoo_gigs@youmail.com
                        </a>
                      </li>
                      <li>
                        <span className="title">Website:</span>
                        <a href="#" className="text">
                          www.ggrock.com
                        </a>
                      </li>
                      <li>
                        <span className="title">Favourites:</span>
                        <a href="#" className="text">
                          5630{" "}
                        </a>
                      </li>
                    </ul>
                    {/* ... end W-Personal-Info */}
                    {/* W-Socials */}
                    <div className="widget w-socials">
                      <h6 className="title">Other Social Networks:</h6>
                      <a href="#" className="social-item bg-facebook">
                        <i className="fab fa-facebook-f" aria-hidden="true" />
                        Facebook
                      </a>
                      <a href="#" className="social-item bg-twitter">
                        <i className="fab fa-twitter" aria-hidden="true" />
                        Twitter
                      </a>
                      <a href="#" className="social-item bg-dribbble">
                        <i className="fab fa-dribbble" aria-hidden="true" />
                        Dribbble
                      </a>
                    </div>
                    {/* ... end W-Socials */}{" "}
                  </div>
                </div>
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Location</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  {/* Contacts */}
                  <div className="widget w-contacts">
                    {/* Leaflet map */}
                    <div className="section">
                      <div id="map" />
                    </div>
                    {/* End Leaflet map */}
                    <ul>
                      <li>
                        <span className="title">Address:</span>
                        <span className="text">
                          Fake Street 320, San Francisco California, USA.
                        </span>
                      </li>
                      <li>
                        <span className="title">Working Hours:</span>
                        <span className="text">
                          Mon-Fri 9:00am to 6:00pm Weekends 10:00am to 8:00pm
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* ... end Contacts */}{" "}
                </div>
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Faved this Page</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  <div className="ui-block-content">
                    {/* W-Faved-Page */}
                    <ul className="widget w-faved-page">
                      <li>
                        <a href="#">
                          <img src={page1.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page2.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page3.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page4.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page5.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page6.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page7.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page8.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page9.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page10.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page10.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page11.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page7.src} alt="user" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={page12.src} alt="user" />
                        </a>
                      </li>
                      <li className="all-users">
                        <a href="#">+5k</a>
                      </li>
                    </ul>
                    {/* ... end W-Faved-Page */}{" "}
                  </div>
                </div>
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Twitter Feed</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  {/* W-Twitter */}
                  <ul className="widget w-twitter">
                    <li className="twitter-item">
                      <div className="author-folder">
                        <img src={twitteravater.src} alt="avatar" />
                        <div className="author">
                          <a href="#" className="author-name">
                            Green Goo Rock
                          </a>
                          <a href="#" className="group">
                            @greengoo_rock
                          </a>
                          <span className="verified">
                            <i className="fa fa-check" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                      <p>
                        This Friday at 8pm we’ll be playing a song of our new
                        album, come and join us!{" "}
                        <a href="#" className="link-post">
                          #NewsoftheGoo
                        </a>
                      </p>
                      <span className="post__date">
                        <time className="published" dateTime="2017-03-24T18:18">
                          4 hours ago
                        </time>
                      </span>
                    </li>
                    <li className="twitter-item">
                      <div className="author-folder">
                        <img src={twitteravater.src} alt="avatar" />
                        <div className="author">
                          <a href="#" className="author-name">
                            Green Goo Rock
                          </a>
                          <a href="#" className="group">
                            @greengoo_rock
                          </a>
                          <span className="verified">
                            <i className="fa fa-check" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                      <p>
                        Tickets for the Marina Party are now available on{" "}
                        <a href="#" className="link-post">
                          www.ggrock.com
                        </a>
                      </p>
                      <span className="post__date">
                        <time className="published" dateTime="2017-03-24T18:18">
                          Yesterday
                        </time>
                      </span>
                    </li>
                    <li className="twitter-item">
                      <div className="author-folder">
                        <img src={twitteravater.src} alt="avatar" />
                        <div className="author">
                          <a href="#" className="author-name">
                            Green Goo Rock
                          </a>
                          <a href="#" className="group">
                            @greengoo_rock
                          </a>
                          <span className="verified">
                            <i className="fa fa-check" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                      <p>
                        We had a great time playing in Italy. Thanks a lot to
                        the incredible fans!{" "}
                        <a href="#" className="link-post">
                          #GGinRome #PisaArena{" "}
                        </a>
                      </p>
                      <span className="post__date">
                        <time className="published" dateTime="2017-03-24T18:18">
                          5 days ago
                        </time>
                      </span>
                    </li>
                  </ul>
                  {/* ... end W-Twitter */}{" "}
                </div>
              </div>
              <div className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Last Photos</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  <div className="ui-block-content">
                    {/* W-Latest-Photo */}
                    <ul className="widget w-last-photo js-zoom-gallery">
                      <li>
                        <a href="img/last-photo1-large.jpg">
                          <img src={lastphoto1.src} alt="photo" />
                        </a>
                      </li>
                      <li>
                        <a href="img/last-photo2-large.jpg">
                          <img src={lastphoto2.src} alt="photo" />
                        </a>
                      </li>
                      <li>
                        <a href="img/last-photo3-large.jpg">
                          <img src={lastphoto3.src} alt="photo" />
                        </a>
                      </li>
                      <li>
                        <a href="img/last-photo4-large.jpg">
                          <img src={lastphoto4.src} alt="photo" />
                        </a>
                      </li>
                      <li>
                        <a href="img/last-phot11-large.jpg">
                          <img src={lastphoto4.src} alt="photo" />
                        </a>
                      </li>
                      <li>
                        <a href="img/last-phot12-large.jpg">
                          <img src={lastphoto4.src} alt="photo" />
                        </a>
                      </li>
                      <li>
                        <a href="img/last-photo7-large.jpg">
                          <img src={lastphoto4.src} alt="photo" />
                        </a>
                      </li>
                      <li>
                        <a href="img/last-photo8-large.jpg">
                          <img src={lastphoto4.src} alt="photo" />
                        </a>
                      </li>
                      <li>
                        <a href="img/last-photo9-large.jpg">
                          <img src={lastphoto4.src} alt="photo" />
                        </a>
                      </li>
                    </ul>
                    {/* ... end W-Latest-Photo */}{" "}
                  </div>
                </div>
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Green Goo’s Playlist</h6>
                    <a href="#" className="more">
                      <span className="c-green">
                        <svg className="olymp-remove-playlist-icon">
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-remove-playlist-icon" />
                        </svg>
                      </span>
                    </a>
                  </div>
                  {/* W-Playlist */}
                  <ol className="widget w-playlist">
                    <li
                      className="js-open-popup"
                      data-popup-target=".playlist-popup"
                    >
                      <div className="playlist-thumb">
                        <img src="img/playlist6.jpg" alt="thumb-composition" />
                        <div className="overlay" />
                        <a href="#" className="play-icon">
                          <svg className="olymp-music-play-icon-big">
                            <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                          </svg>
                        </a>
                      </div>
                      <div className="composition">
                        <a href="#" className="composition-name">
                          The Past Starts Slow...
                        </a>
                        <a href="#" className="composition-author">
                          System of a Revenge
                        </a>
                      </div>
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          3:22
                        </time>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                          </svg>
                          <ul className="more-dropdown">
                            <li>
                              <a href="#">Add Song to Player</a>
                            </li>
                            <li>
                              <a href="#">Add Playlist to Player</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li
                      className="js-open-popup"
                      data-popup-target=".playlist-popup"
                    >
                      <div className="playlist-thumb">
                        <img src="img/playlist7.jpg" alt="thumb-composition" />
                        <div className="overlay" />
                        <a href="#" className="play-icon">
                          <svg className="olymp-music-play-icon-big">
                            <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                          </svg>
                        </a>
                      </div>
                      <div className="composition">
                        <a href="#" className="composition-name">
                          The Pretender
                        </a>
                        <a href="#" className="composition-author">
                          Kung Fighters
                        </a>
                      </div>
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          5:48
                        </time>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                          </svg>
                          <ul className="more-dropdown">
                            <li>
                              <a href="#">Add Song to Player</a>
                            </li>
                            <li>
                              <a href="#">Add Playlist to Player</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li
                      className="js-open-popup"
                      data-popup-target=".playlist-popup"
                    >
                      <div className="playlist-thumb">
                        <img src="img/playlist8.jpg" alt="thumb-composition" />
                        <div className="overlay" />
                        <a href="#" className="play-icon">
                          <svg className="olymp-music-play-icon-big">
                            <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                          </svg>
                        </a>
                      </div>
                      <div className="composition">
                        <a href="#" className="composition-name">
                          Blood Brothers
                        </a>
                        <a href="#" className="composition-author">
                          Iron Maid
                        </a>
                      </div>
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          3:06
                        </time>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                          </svg>
                          <ul className="more-dropdown">
                            <li>
                              <a href="#">Add Song to Player</a>
                            </li>
                            <li>
                              <a href="#">Add Playlist to Player</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li
                      className="js-open-popup"
                      data-popup-target=".playlist-popup"
                    >
                      <div className="playlist-thumb">
                        <img src="img/playlist9.jpg" alt="thumb-composition" />
                        <div className="overlay" />
                        <a href="#" className="play-icon">
                          <svg className="olymp-music-play-icon-big">
                            <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                          </svg>
                        </a>
                      </div>
                      <div className="composition">
                        <a href="#" className="composition-name">
                          Seven Nation Army
                        </a>
                        <a href="#" className="composition-author">
                          The Black Stripes
                        </a>
                      </div>
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          6:17
                        </time>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                          </svg>
                          <ul className="more-dropdown">
                            <li>
                              <a href="#">Add Song to Player</a>
                            </li>
                            <li>
                              <a href="#">Add Playlist to Player</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li
                      className="js-open-popup"
                      data-popup-target=".playlist-popup"
                    >
                      <div className="playlist-thumb">
                        <img src="img/playlist10.jpg" alt="thumb-composition" />
                        <div className="overlay" />
                        <a href="#" className="play-icon">
                          <svg className="olymp-music-play-icon-big">
                            <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                          </svg>
                        </a>
                      </div>
                      <div className="composition">
                        <a href="#" className="composition-name">
                          Killer Queen
                        </a>
                        <a href="#" className="composition-author">
                          Archiduke
                        </a>
                      </div>
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          5:40
                        </time>
                        <div className="more">
                          <svg className="olymp-three-dots-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                          </svg>
                          <ul className="more-dropdown">
                            <li>
                              <a href="#">Add Song to Player</a>
                            </li>
                            <li>
                              <a href="#">Add Playlist to Player</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ol>
                  {/* .. end W-Playlist */}
                </div>
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Green Goo's Poll</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  <div className="ui-block-content">
                    {/* W-Pool */}
                    <ul className="widget w-pool">
                      <li>
                        <p>
                          If you had to choose, which actor do you prefer to be
                          the next Darkman?{" "}
                        </p>
                      </li>
                      <li>
                        <div className="skills-item">
                          <div className="skills-item-info">
                            <span className="skills-item-title">
                              <span className="radio">
                                <label>
                                  <input type="radio" name="optionsRadios" />
                                  Thomas Bale
                                </label>
                              </span>
                            </span>
                            <span className="skills-item-count">
                              <span
                                className="count-animate"
                                data-speed={1000}
                                data-refresh-interval={50}
                                data-to={62}
                                data-from={0}
                              />
                              <span className="units">62%</span>
                            </span>
                          </div>
                          <div className="skills-item-meter">
                            <span
                              className="skills-item-meter-active bg-primary"
                              style={{ width: "62%" }}
                            />
                          </div>
                          <div className="counter-friends">
                            12 friends voted for this
                          </div>
                          <ul className="friends-harmonic">
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic1.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic2.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic3.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic4.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic5.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic6.jpg"
                                  alt="friend"
                                />
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
                                <img src={harmonic9.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#" className="all-users">
                                +3
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="skills-item">
                          <div className="skills-item-info">
                            <span className="skills-item-title">
                              <span className="radio">
                                <label>
                                  <input type="radio" name="optionsRadios" />
                                  Ben Robertson
                                </label>
                              </span>
                            </span>
                            <span className="skills-item-count">
                              <span
                                className="count-animate"
                                data-speed={1000}
                                data-refresh-interval={50}
                                data-to={27}
                                data-from={0}
                              />
                              <span className="units">27%</span>
                            </span>
                          </div>
                          <div className="skills-item-meter">
                            <span
                              className="skills-item-meter-active bg-primary"
                              style={{ width: "27%" }}
                            />
                          </div>
                          <div className="counter-friends">
                            7 friends voted for this
                          </div>
                          <ul className="friends-harmonic">
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
                                <img src={harmonic9.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={harmonic10.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src={harmonic11.src} alt="friend" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic12.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic13.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <div className="skills-item">
                          <div className="skills-item-info">
                            <span className="skills-item-title">
                              <span className="radio">
                                <label>
                                  <input type="radio" name="optionsRadios" />
                                  Michael Streiton
                                </label>
                              </span>
                            </span>
                            <span className="skills-item-count">
                              <span
                                className="count-animate"
                                data-speed={1000}
                                data-refresh-interval={50}
                                data-to={11}
                                data-from={0}
                              />
                              <span className="units">11%</span>
                            </span>
                          </div>
                          <div className="skills-item-meter">
                            <span
                              className="skills-item-meter-active bg-primary"
                              style={{ width: "11%" }}
                            />
                          </div>
                          <div className="counter-friends">
                            2 people voted for this
                          </div>
                          <ul className="friends-harmonic">
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic14.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img
                                  src="img/friend-harmonic15.jpg"
                                  alt="friend"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                    {/* .. end W-Pool */}
                    <a
                      href="#"
                      className="btn btn-md-2 btn-border-think custom-color c-grey full-width"
                    >
                      Vote Now!
                    </a>
                  </div>
                </div>
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Last Videos</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  <div className="ui-block-content">
                    {/* W-Latest-Video */}
                    <ul className="widget w-last-video">
                      <li>
                        <a
                          href="https://vimeo.com/ondemand/viewfromabluemoon4k/147865858"
                          className="play-video play-video--small"
                        >
                          <svg className="olymp-play-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-play-icon" />
                          </svg>
                        </a>
                        <img src="img/video8.jpg" alt="video" />
                        <div className="video-content">
                          <div className="title">
                            System of a Revenge - Hypnotize...
                          </div>
                          <time
                            className="published"
                            dateTime="2017-03-24T18:18"
                          >
                            3:25
                          </time>
                        </div>
                        <div className="overlay" />
                      </li>
                      <li>
                        <a
                          href="https://youtube.com/watch?v=excVFQ2TWig"
                          className="play-video play-video--small"
                        >
                          <svg className="olymp-play-icon">
                            <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-play-icon" />
                          </svg>
                        </a>
                        <img src="img/video7.jpg" alt="video" />
                        <div className="video-content">
                          <div className="title">
                            Green Goo - Live at Dan’s Arena
                          </div>
                          <time
                            className="published"
                            dateTime="2017-03-24T18:18"
                          >
                            5:48
                          </time>
                        </div>
                        <div className="overlay" />
                      </li>
                    </ul>
                    {/* .. end W-Latest-Video */}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Playlist Popup */}
          <div
            className="window-popup playlist-popup"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="playlist-popup"
            aria-hidden="true"
          >
            <a href className="icon-close js-close-popup">
              <svg className="olymp-close-icon">
                <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
              </svg>
            </a>
            <div className="mCustomScrollbar">
              <table className="playlist-popup-table">
                <thead>
                  <tr>
                    <th className="play">PLAY</th>
                    <th className="cover">COVER</th>
                    <th className="song-artist">SONG AND ARTIST</th>
                    <th className="album">ALBUM</th>
                    <th className="released">RELEASED</th>
                    <th className="duration">DURATION</th>
                    <th className="spotify">GET IT ON SPOTIFY</th>
                    <th className="remove">REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="play">
                      <a href="#" className="play-icon">
                        <svg className="olymp-music-play-icon-big">
                          <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                        </svg>
                      </a>
                    </td>
                    <td className="cover">
                      <div className="playlist-thumb">
                        <img src="img/playlist19.jpg" alt="thumb-composition" />
                      </div>
                    </td>
                    <td className="song-artist">
                      <div className="composition">
                        <a href="#" className="composition-name">
                          We Can Be Heroes
                        </a>
                        <a href="#" className="composition-author">
                          Jason Bowie
                        </a>
                      </div>
                    </td>
                    <td className="album">
                      <a href="#" className="album-composition">
                        Ziggy Firedust
                      </a>
                    </td>
                    <td className="released">
                      <div className="release-year">2014</div>
                    </td>
                    <td className="duration">
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          6:17
                        </time>
                      </div>
                    </td>
                    <td className="spotify">
                      <i
                        className="fab fa-spotify composition-icon"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="remove">
                      <a href="#" className="remove-icon">
                        <svg className="olymp-close-icon">
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="play">
                      <a href="#" className="play-icon">
                        <svg className="olymp-music-play-icon-big">
                          <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                        </svg>
                      </a>
                    </td>
                    <td className="cover">
                      <div className="playlist-thumb">
                        <img src={playlist6.src} alt="thumb-composition" />
                      </div>
                    </td>
                    <td className="song-artist">
                      <div className="composition">
                        <a href="#" className="composition-name">
                          The Past Starts Slow and Ends
                        </a>
                        <a href="#" className="composition-author">
                          System of a Revenge
                        </a>
                      </div>
                    </td>
                    <td className="album">
                      <a href="#" className="album-composition">
                        Wonderize
                      </a>
                    </td>
                    <td className="released">
                      <div className="release-year">2014</div>
                    </td>
                    <td className="duration">
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          6:17
                        </time>
                      </div>
                    </td>
                    <td className="spotify">
                      <i
                        className="fab fa-spotify composition-icon"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="remove">
                      <a href="#" className="remove-icon">
                        <svg className="olymp-close-icon">
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="play">
                      <a href="#" className="play-icon">
                        <svg className="olymp-music-play-icon-big">
                          <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                        </svg>
                      </a>
                    </td>
                    <td className="cover">
                      <div className="playlist-thumb">
                        <img src={playlist7.src} alt="thumb-composition" />
                      </div>
                    </td>
                    <td className="song-artist">
                      <div className="composition">
                        <a href="#" className="composition-name">
                          The Pretender
                        </a>
                        <a href="#" className="composition-author">
                          Kung Fighters
                        </a>
                      </div>
                    </td>
                    <td className="album">
                      <a href="#" className="album-composition">
                        Warping Lights
                      </a>
                    </td>
                    <td className="released">
                      <div className="release-year">2014</div>
                    </td>
                    <td className="duration">
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          6:17
                        </time>
                      </div>
                    </td>
                    <td className="spotify">
                      <i
                        className="fab fa-spotify composition-icon"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="remove">
                      <a href="#" className="remove-icon">
                        <svg className="olymp-close-icon">
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="play">
                      <a href="#" className="play-icon">
                        <svg className="olymp-music-play-icon-big">
                          <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                        </svg>
                      </a>
                    </td>
                    <td className="cover">
                      <div className="playlist-thumb">
                        <img src={playlist8.src} alt="thumb-composition" />
                      </div>
                    </td>
                    <td className="song-artist">
                      <div className="composition">
                        <a href="#" className="composition-name">
                          Seven Nation Army
                        </a>
                        <a href="#" className="composition-author">
                          The Black Stripes
                        </a>
                      </div>
                    </td>
                    <td className="album">
                      <a href="#" className="album-composition ">
                        Icky Strung (LIVE at Cube Garden)
                      </a>
                    </td>
                    <td className="released">
                      <div className="release-year">2014</div>
                    </td>
                    <td className="duration">
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          6:17
                        </time>
                      </div>
                    </td>
                    <td className="spotify">
                      <i
                        className="fab fa-spotify composition-icon"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="remove">
                      <a href="#" className="remove-icon">
                        <svg className="olymp-close-icon">
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="play">
                      <a href="#" className="play-icon">
                        <svg className="olymp-music-play-icon-big">
                          <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                        </svg>
                      </a>
                    </td>
                    <td className="cover">
                      <div className="playlist-thumb">
                        <img src={playlist9.src} alt="thumb-composition" />
                      </div>
                    </td>
                    <td className="song-artist">
                      <div className="composition">
                        <a href="#" className="composition-name">
                          Leap of Faith
                        </a>
                        <a href="#" className="composition-author">
                          Eden Artifact
                        </a>
                      </div>
                    </td>
                    <td className="album">
                      <a href="#" className="album-composition">
                        The Assassins’s Soundtrack
                      </a>
                    </td>
                    <td className="released">
                      <div className="release-year">2014</div>
                    </td>
                    <td className="duration">
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          6:17
                        </time>
                      </div>
                    </td>
                    <td className="spotify">
                      <i
                        className="fab fa-spotify composition-icon"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="remove">
                      <a href="#" className="remove-icon">
                        <svg className="olymp-close-icon">
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="play">
                      <a href="#" className="play-icon">
                        <svg className="olymp-music-play-icon-big">
                          <use xlinkHref="../svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big" />
                        </svg>
                      </a>
                    </td>
                    <td className="cover">
                      <div className="playlist-thumb">
                        <img src={playlist10.src} alt="thumb-composition" />
                      </div>
                    </td>
                    <td className="song-artist">
                      <div className="composition">
                        <a href="#" className="composition-name">
                          Killer Queen
                        </a>
                        <a href="#" className="composition-author">
                          Archiduke
                        </a>
                      </div>
                    </td>
                    <td className="album">
                      <a href="#" className="album-composition ">
                        News of the Universe
                      </a>
                    </td>
                    <td className="released">
                      <div className="release-year">2014</div>
                    </td>
                    <td className="duration">
                      <div className="composition-time">
                        <time className="published" dateTime="2017-03-24T18:18">
                          6:17
                        </time>
                      </div>
                    </td>
                    <td className="spotify">
                      <i
                        className="fab fa-spotify composition-icon"
                        aria-hidden="true"
                      />
                    </td>
                    <td className="remove">
                      <a href="#" className="remove-icon">
                        <svg className="olymp-close-icon">
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <audio id="mediaplayer" data-showplaylist="true">
              <source
                src="mp3/Twice.mp3"
                title="Track 1"
                data-poster="track1.png"
                type="audio/mpeg"
              />
              <source
                src="mp3/Twice.mp3"
                title="Track 2"
                data-poster="track2.png"
                type="audio/mpeg"
              />
              <source
                src="mp3/Twice.mp3"
                title="Track 3"
                data-poster="track3.png"
                type="audio/mpeg"
              />
              <source
                src="mp3/Twice.mp3"
                title="Track 4"
                data-poster="track4.png"
                type="audio/mpeg"
              />
            </audio>
          </div>
          {/* ... end Playlist Popup */}
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
                    <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
                  </svg>
                </a>
                <div className="modal-header">
                  <h6 className="title">Update Header Photo</h6>
                </div>
                <div className="modal-body">
                  <a href="#" className="upload-photo-item">
                    <svg className="olymp-computer-icon">
                      <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-computer-icon" />
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
                      <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-photos-icon" />
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
                    <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-close-icon" />
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
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-photos-icon" />
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
                          <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-albums-icon" />
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
                            <img src={photo1.src} alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src={photo2.src} alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src={photo3.src} alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src={photo4.src} alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src={photo5.src} alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src={photo6.src} alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src={photo7.src} alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src={photo8.src} alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src={photo9.src} alt="photo" />
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
                          <img src={photo10.src} alt="photo" />
                          <figcaption>
                            <a href="#">South America Vacations</a>
                            <span>Last Added: 2 hours ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src={photo11.src} alt="photo" />
                          <figcaption>
                            <a href="#">Photoshoot Summer 2016</a>
                            <span>Last Added: 5 weeks ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src={photo12.src} alt="photo" />
                          <figcaption>
                            <a href="#">Amazing Street Food</a>
                            <span>Last Added: 6 mins ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src={photo13.src} alt="photo" />
                          <figcaption>
                            <a href="#">Graffity &amp; Street Art</a>
                            <span>Last Added: 16 hours ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src={photo14.src} alt="photo" />
                          <figcaption>
                            <a href="#">Amazing Landscapes</a>
                            <span>Last Added: 13 mins ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src={photo15.src} alt="photo" />
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
              src="../../svg-icons/back-to-top.svg"
              alt="arrow"
              className="back-icon"
            />
          </a>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default page;
