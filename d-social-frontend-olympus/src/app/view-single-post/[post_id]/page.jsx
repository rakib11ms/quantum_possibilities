"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useEffect, useState } from "react";
import TopNewsCaro from "../../newsfeed/TopNewsCaro";
import feedauththree from "../../../assets/img/avatar10-sm.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Leftsidebar from "@/component/leftsidebar/page";
import Link from "next/link";
import FeatureUser from "@/component/NewsFeed/FeatureUser";

import SinglePost from "@/component/NewsFeed/SinglePost";

const ViewSinglePost = () => {
    
    return (
        <div>
            {" "}
            <Masterdashboardlayout>
                <div className=" container-fluid ">

                    <div className="row">
                        {/* Main Content */}
                        <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">


                            <div className="ui-block web-post-status">
                                {/* News Feed Form */}
                               {/* <SinglePost /> */}
                               <SinglePost />
                            </div>


                        </main>


                        <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
                            <Leftsidebar />
                        </aside>
                        <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12 first-left-menu">
                            <div className="ui-block-news ">
                                {/* W-Weather */}
                                <TopNewsCaro />
                            </div>

                            <div className="ui-block">
                                <div className="ui-block-title">
                                    <h6 className="title">Pages You May Like</h6>
                                </div>
                                {/* W-Friend-Pages-Added */}
                                <ul className="">
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="people-added-img-text">
                                                <div className="author-thumb">
                                                    <img src={feedauththree.src} alt="author" />
                                                </div>
                                                <div className="texts">
                                                    <h6>Zara</h6>
                                                    <p>Fashion Brand</p>
                                                </div>
                                            </div>

                                            <div className="follow-btn-div">
                                                <button className="follow-btn">Follow</button>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="people-added-img-text">
                                                <div className="author-thumb">
                                                    <img src={feedauththree.src} alt="author" />
                                                </div>
                                                <div className="texts">
                                                    <h6>Zara</h6>
                                                    <p>Fashion Brand</p>
                                                </div>
                                            </div>

                                            <div className="follow-btn-div">
                                                <button className="follow-btn">Follow</button>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="people-added-img-text">
                                                <div className="author-thumb">
                                                    <img src={feedauththree.src} alt="author" />
                                                </div>
                                                <div className="texts">
                                                    <h6>Zara</h6>
                                                    <p>Fashion Brand</p>
                                                </div>
                                            </div>

                                            <div className="follow-btn-div">
                                                <button className="follow-btn">Follow</button>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="people-added-img-text">
                                                <div className="author-thumb">
                                                    <img src={feedauththree.src} alt="author" />
                                                </div>
                                                <div className="texts">
                                                    <h6>Zara</h6>
                                                    <p>Fashion Brand</p>
                                                </div>
                                            </div>

                                            <div className="follow-btn-div">
                                                <button className="follow-btn">Follow</button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                {/* .. end W-Friend-Pages-Added */}
                            </div>
                        </aside>
                        {/* ... end Left Sidebar */}
                        {/* Right Sidebar */}

                        <aside className="col col-xl-2 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12 first-left-menu">
                            <div className="ui-block">
                                {/* ... end W-Birthsday-Alert */}
                                <div className="trending-div">
                                    <h6 className="trending-tag">Trending Topic</h6>
                                    <ul className="tag-cloud">
                                        <li className="tag-small">#organization</li>
                                        <li className="tag-medium">#indigo</li>
                                        <li className="tag-large">#verma_traders</li>
                                        <li className="tag-medium">#alignments</li>
                                        <li className="tag-small">#cloud</li>
                                        <li className="tag-small">#technology</li>
                                        <br />
                                        <li className="tag-small">#company</li>
                                        <li className="tag-small">#doller</li>
                                        <br /> <li className="tag-small">#information</li>
                                        <li className="tag-small">#media</li>
                                        <li className="tag-small">#content</li>
                                        <li className="tag-small">#mouthguard</li>
                                        <li className="tag-small">#donation</li>
                                        <li className="tag-small">#zoom</li>
                                        <li className="tag-small">#flavour</li>
                                        <li className="tag-small">#cream</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="ui-block">
                                <FeatureUser />
                            </div>

                            <div className="ui-block">
                                <div className="ui-block-title">
                                    <h6 className="title">Top Post</h6>
                                    {/* <a href="#" className="more">
                  <svg className="olymp-three-dots-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                  </svg>
                </a> */}
                                </div>
                                {/* W-Activity-Feed */}
                                <ul className="">
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="author-thumb">
                                                <img src={feedauththree.src} alt="author" />
                                            </div>
                                            <div className="top-text-div">
                                                <h5 className="top-text">
                                                    <strong>Marina Polson</strong> Captured a stunning
                                                    sunset over the horizon Photo
                                                </h5>
                                                <p>2 min ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="author-thumb">
                                                <img src={feedauththree.src} alt="author" />
                                            </div>
                                            <div className="top-text-div">
                                                <h5 className="top-text">
                                                    <strong>Marina Polson</strong> Captured a stunning
                                                    sunset over the horizon Photo
                                                </h5>
                                                <p>2 min ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="author-thumb">
                                                <img src={feedauththree.src} alt="author" />
                                            </div>
                                            <div className="top-text-div">
                                                <h5 className="top-text">
                                                    <strong>Marina Polson</strong> Captured a stunning
                                                    sunset over the horizon Photo
                                                </h5>
                                                <p>2 min ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="author-thumb">
                                                <img src={feedauththree.src} alt="author" />
                                            </div>
                                            <div className="top-text-div">
                                                <h5 className="top-text">
                                                    <strong>Marina Polson</strong> Captured a stunning
                                                    sunset over the horizon Photo
                                                </h5>
                                                <p>2 min ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="author-thumb">
                                                <img src={feedauththree.src} alt="author" />
                                            </div>
                                            <div className="top-text-div">
                                                <h5 className="top-text">
                                                    <strong>Marina Polson</strong> Captured a stunning
                                                    sunset over the horizon Photo
                                                </h5>
                                                <p>2 min ago</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="inline-items">
                                        <div className="people-added-div">
                                            <div className="author-thumb">
                                                <img src={feedauththree.src} alt="author" />
                                            </div>
                                            <div className="top-text-div">
                                                <h5 className="top-text">
                                                    <strong>Marina Polson</strong> Captured a stunning
                                                    sunset over the horizon Photo
                                                </h5>
                                                <p>2 min ago</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                {/* .. end W-Activity-Feed */}
                            </div>
                            <div className="ui-block">
                                {/* W-Action */}
                                <div className="widget w-action">
                                    {/* <img src="/QP_logo.png" alt="Olympus" /> */}
                                    <div className="content">
                                        <h4 className="title">Quntum Possibilities</h4>
                                        <span>WORLD BIGGEST DECENTRALIZED SOCIAL NETWORK</span>
                                        <Link href="/register" className="newsfeed-register-btn">
                                            <p className="register-btn"> Register Now!</p>
                                        </Link>
                                    </div>
                                </div>
                                {/* ... end W-Action */}
                            </div>
                        </aside>
                    </div>
                </div>
            </Masterdashboardlayout>
        </div>
    );
};

export default ViewSinglePost;
