"use client";
import "./style.css";

import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import ProfileHeader from "@/component/ProfileHeader";
import axiosInstance from "../../../../../../../utils/axios";
import { host } from "@/environment";
import { useParams } from "next/navigation";

import Comment from "@/component/Comment/Comment";

const Page = () => {
  const router = useRouter();
  const params = useParams();

  const [postItem, setPostItem] = useState("");
  const [mediaType, setMediaType] = useState("");

  console.log("post item", postItem);

  const pathname = usePathname();

  useEffect(() => {
    const url = pathname; // Get the pathname from props

    const parts = url.split("/");

    // Get the last two parts (post_id and media_id)
    const media_id = parts.pop();
    const post_id = parts.pop();

    setMediaType(params.media_type);

    axiosInstance
      .get(`/api/view-post-single-item/${post_id}/${media_id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setPostItem(res.data.post[0]);
        }
      });
  }, [pathname]);

  const backToPreviousRoute = () => {
    const scrollPosition = window.scrollY;

    router.back();

    window.scrollTo(scrollPosition, 0);
  };

  return (
    <div>
      <Masterdashboardlayout headerName='About'>
        <div className='main-single-item-container bg-white'>
          <div className='container-fluid '>
            <div className='row'>
              <div className='col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 post-single-item-view '>
                <div className='post-single-item-view-left '>
                  <div className='px-3 post-single-item-view-left-div '>
                    {/* <h1>Helllllllllllllo</h1> */}
                    <button
                      className='btn btn-light btn-cross  '
                      onClick={() => backToPreviousRoute()}>
                      <p className='fs-1'> Back </p>
                    </button>
                    {mediaType == "videos" ? (
                      <>
                        <video
                          controls
                          // poster={`${host}/uploads/posts/${imageItem.image}`}
                          src={`${host}/uploads/posts/${postItem.media}`}
                          // onClick={() => handleVideoClick(postItem)}
                          className='one-more-videos '
                          lazy
                          controlsList='nodownload'
                          onClick={(e) =>
                            console.log("clicked video", postItem.media)
                          }>
                          <source
                            src={`${host}/uploads/posts/${postItem.media}`}
                            type='video/mp4'
                            onClick={(e) =>
                              console.log("clicked video", postItem.media)
                            }
                          />
                          Your browser does not support the video tag.
                        </video>
                      </>
                    ) : (
                      <img
                        className=''
                        src={`${host}/uploads/posts/${postItem.media}`}
                        alt='nature'
                      />
                    )}
                  </div>
                </div>
                <div className='post-single-item-view-right'>
                  <Comment />
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
