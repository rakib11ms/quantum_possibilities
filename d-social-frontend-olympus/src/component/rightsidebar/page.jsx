import React from "react";

import chatUserone from "../../../public/img/avatar67-sm.jpg";
import chatUsertwo from "../../../public/img/avatar62-sm.jpg";
import chatUserthree from "../../../public/img/avatar68-sm.jpg";
import chatUserfour from "../../../public/img/avatar69-sm.jpg";
import chatUserfive from "../../../public/img/avatar70-sm.jpg";
import chatUsersix from "../../../public/img/avatar64-sm.jpg";
import chatUserseven from "../../../public/img/avatar71-sm.jpg";
import chatUsereight from "../../../public/img/avatar72-sm.jpg";
import chatUsernine from "../../../public/img/avatar63-sm.jpg";
import chatUserten from "../../../public/img/avatar72-sm.jpg";

const page = () => {
  return (
    <div>
      {/* Fixed Sidebar Right */}
      <div className="fixed-sidebar right">
        <div className="fixed-sidebar-right sidebar--small" id="sidebar-right">
          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <ul className="chat-users">
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserone.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsertwo.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUserthree.src}
                    className="avatar"
                  />
                  <span className="icon-status online" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfour.src} className="avatar" />
                  <span className="icon-status away" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfive.src} className="avatar" />
                  <span className="icon-status disconected" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsersix.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUserseven.src}
                    className="avatar"
                  />
                  <span className="icon-status online" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUsereight.src}
                    className="avatar"
                  />
                  <span className="icon-status away" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsernine.src} className="avatar" />
                  <span className="icon-status status-invisible" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfour.src} className="avatar" />
                  <span className="icon-status away" />
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserten.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
              </li>
            </ul>
          </div>
          <div className="search-friend inline-items">
            <a href="#" className="js-sidebar-open">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-menu-button"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z" />
                <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
              </svg>
            </a>
          </div>
          <a href="#" className="olympus-chat inline-items js-chat-open">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="White"
              className="bi bi-chat-left-text olymp-chat---messages-icon"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            </svg>
          </a>
        </div>
        <div
          className="fixed-sidebar-right sidebar--large"
          id="sidebar-right-1"
        >
          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <div className="ui-block-title ui-block-title-small">
              <a href="#" className="title">
                Close Friends
              </a>
              <a href="#">Settings</a>
            </div>

            <ul className="chat-users">
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserone.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Carol Summers
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsertwo.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Mathilda Brinker
                  </a>
                  <span className="status">AT WORK!</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUserthree.src}
                    className="avatar"
                  />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Carol Summers
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfour.src} className="avatar" />
                  <span className="icon-status away" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Michael Maximoff
                  </a>
                  <span className="status">AWAY</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfive.src} className="avatar" />
                  <span className="icon-status disconected" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Rachel Howlett
                  </a>
                  <span className="status">OFFLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            {/* <div className="ui-block-title ui-block-title-small">
              <a href="#" className="title">
                MY FAMILY
              </a>
              <a href="#">Settings</a>
            </div>
            <ul class Name="chat-users">
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsersix.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Sarah Hetfield
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
            </ul> */}
            <div className="ui-block-title ui-block-title-small">
              <a href="#" className="title">
                UNCATEGORIZED
              </a>
              <a href="#">Settings</a>
            </div>
            <ul className="chat-users">
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUserseven.src}
                    className="avatar"
                  />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Bruce Peterson
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUsereight.src}
                    className="avatar"
                  />
                  <span className="icon-status away" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Chris Greyson
                  </a>
                  <span className="status">AWAY</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsernine.src} className="avatar" />
                  <span className="icon-status status-invisible" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Nicholas Grisom
                  </a>
                  <span className="status">INVISIBLE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserten.src} className="avatar" />
                  <span className="icon-status away" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Chris Greyson
                  </a>
                  <span className="status">AWAY</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsertwo.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Bruce Peterson
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="search-friend inline-items">
            <form className="form-group">
              <input
                className="form-control"
                placeholder="Search Friends..."
                defaultValue
                type="text"
              />
            </form>
            <a href="29-YourAccount-AccountSettings.html" className="settings">
              <svg className="olymp-settings-icon">
                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-settings-icon" />
              </svg>
            </a>
            <a href="#" className="js-sidebar-open">
              <svg className="olymp-close-icon">
                <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
              </svg>
            </a>
          </div>
          <a href="#" className="olympus-chat inline-items js-chat-open">
            <h6 className="olympus-chat-title">QUANTUM CHAT</h6>
            <svg className="olymp-chat---messages-icon">
              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-chat---messages-icon" />
            </svg>
          </a>
        </div>
      </div>
      {/* ... end Fixed Sidebar Right */}
      {/* Fixed Sidebar Right-Responsive */}
      <div
        className="fixed-sidebar right fixed-sidebar-responsive"
        id="sidebar-right-responsive"
      >
        <div className="fixed-sidebar-right sidebar--small">
          <a href="#" className="js-sidebar-open">
            <svg className="olymp-menu-icon">
              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-menu-icon" />
            </svg>
            <svg className="olymp-close-icon">
              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
            </svg>
          </a>
        </div>
        <div className="fixed-sidebar-right sidebar--large">
          <div className="mCustomScrollbar" data-mcs-theme="dark">
            <div className="ui-block-title ui-block-title-small">
              <a href="#" className="title">
                Close Friends
              </a>
              <a href="#">Settings</a>
            </div>
            <ul className="chat-users">
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src="img/avatar67-sm.jpg"
                    className="avatar"
                  />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Carol Summers
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfive.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Mathilda Brinker
                  </a>
                  <span className="status">AT WORK!</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUserseven.src}
                    className="avatar"
                  />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Carol Summers
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUserthree.src}
                    className="avatar"
                  />
                  <span className="icon-status away" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Michael Maximoff
                  </a>
                  <span className="status">AWAY</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsertwo.src} className="avatar" />
                  <span className="icon-status disconected" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Rachel Howlett
                  </a>
                  <span className="status">OFFLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className="ui-block-title ui-block-title-small">
              <a href="#" className="title">
                MY FAMILY
              </a>
              <a href="#">Settings</a>
            </div>
            <ul className="chat-users">
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUsersix.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Sarah Hetfield
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className="ui-block-title ui-block-title-small">
              <a href="#" className="title">
                UNCATEGORIZED
              </a>
              <a href="#">Settings</a>
            </div>
            <ul className="chat-users">
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserone.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Bruce Peterson
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img
                    alt="author"
                    src={chatUserseven.src}
                    className="avatar"
                  />
                  <span className="icon-status away" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Chris Greyson
                  </a>
                  <span className="status">AWAY</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfour.src} className="avatar" />
                  <span className="icon-status status-invisible" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Nicholas Grisom
                  </a>
                  <span className="status">INVISIBLE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfive.src} className="avatar" />
                  <span className="icon-status away" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Chris Greyson
                  </a>
                  <span className="status">AWAY</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="inline-items js-chat-open">
                <div className="author-thumb">
                  <img alt="author" src={chatUserfive.src} className="avatar" />
                  <span className="icon-status online" />
                </div>
                <div className="author-status">
                  <a href="#" className="h6 author-name">
                    Bruce Peterson
                  </a>
                  <span className="status">ONLINE</span>
                </div>
                <div className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                  <ul className="more-icons">
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="START CONVERSATION"
                        className="olymp-comments-post-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-comments-post-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="ADD TO CONVERSATION"
                        className="olymp-add-to-conversation-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="BLOCK FROM CHAT"
                        className="olymp-block-from-chat-icon"
                      >
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-block-from-chat-icon" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="search-friend inline-items">
            <form className="form-group">
              <input
                className="form-control"
                placeholder="Search Friends..."
                defaultValue
                type="text"
              />
            </form>
            <a href="/accountsettings" className="settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-sliders2-vertical"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 10.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H3V1.5a.5.5 0 0 0-1 0V10H.5a.5.5 0 0 0-.5.5ZM2.5 12a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5Zm3-6.5A.5.5 0 0 0 6 6h1.5v8.5a.5.5 0 0 0 1 0V6H10a.5.5 0 0 0 0-1H6a.5.5 0 0 0-.5.5ZM8 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2A.5.5 0 0 0 8 1Zm3 9.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H14V1.5a.5.5 0 0 0-1 0V10h-1.5a.5.5 0 0 0-.5.5Zm2.5 1.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5Z"
                />
              </svg>
            </a>
            <a href="#" className="js-sidebar-open">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </a>
          </div>
          <a href="#" className="olympus-chat inline-items js-chat-open">
            <h6 className="olympus-chat-title">QUANTUM CHAT</h6>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat-left-dots"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
