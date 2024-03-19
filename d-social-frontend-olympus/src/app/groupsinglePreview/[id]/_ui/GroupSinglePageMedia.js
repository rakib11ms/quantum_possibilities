"use client";
import React, { useState } from "react";
import VideoGallery from "@/component/Pages/VideoGallery";
import PageGalleryAlbum from "@/component/Pages/PageGalleryAlbum";
import GroupPhotoGalleryPage from "./GroupPhotoGalleryPage";
import GroupVideoGalleryPage from "./GroupVideoGalleryPage";

import "./GroupSinglePageMedia.css"

const GroupSinglePageMedia = ({ groupMedia, groupId }) => {
  const [activeText, setActiveText] = useState(1);

  const handleTextClick = (text) => {
    setActiveText(text);
  };
  return (

    <div className="my-2 pl-2 bg-white px-4">
      <div className="d-flex justify-content-between py-4">
        <h5 className="group-demo-text-h5">Group Media</h5>
        <button style={{
          backgroundColor: '#EDEDED',
          border:'0px',
          borderRadius:'30px',
          color:'#307777',
          padding: '10px'
        }}>Add photos/videos</button>
      </div>

      <div className="Gallery-links" >
        <div
          onClick={() => handleTextClick(1)}
          className={activeText === 1 ? "active-gallery-nav" : ""}
        >
          <p> Photos</p>
        </div>
        <div
          onClick={() => handleTextClick(2)}
          className={activeText === 2 ? "active-gallery-nav" : ""}
        >
          <p> Videos</p>
        </div>
        {/* <div
              onClick={() => handleTextClick(3)}
              className={activeText === 3 ? "active-gallery-nav" : ""}
            >
              <p>Albums</p>
            </div> */}
      </div>

      <div className="my-2" >
        {activeText === 1 && (
          <div className="tas_group_photo_media_container">
            <GroupPhotoGalleryPage groupId={groupId} />
          </div>
        )}
        {activeText === 2 && (
          <div className="tas_group_photo_media_container">
            <div>
              <GroupVideoGalleryPage groupId={groupId} />
              {/* <VideoGallery/> */}
            </div>
          </div>
        )}
        {activeText === 3 && (
          <div className="active-div">
            <PageGalleryAlbum />
          </div>
        )}
      </div>

    </div>

  );
};

export default GroupSinglePageMedia;
