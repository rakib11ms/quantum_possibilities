"use client";
import React, { useState } from "react";
import PhotoGalleryPage from "./PhotoGalleryPage";
import VideoGallery from "./VideoGallery";
import PageGalleryAlbum from "./PageGalleryAlbum";

const PageGallery = ({ pageDetails }) => {
  const [activeText, setActiveText] = useState(1);

  const handleTextClick = (text) => {
    setActiveText(text);
  };

  return (
    <div className="mt-2">
      <div className='Gallery-div'>
        <div className='Gallery-links'>
          <div
            onClick={() => handleTextClick(1)}
            className={activeText === 1 ? "active-gallery-nav" : ""}>
            <p> Photos</p>
          </div>
          <div
            onClick={() => handleTextClick(2)}
            className={activeText === 2 ? "active-gallery-nav" : ""}>
            <p> Videos</p>
          </div>
          <div
            onClick={() => handleTextClick(3)}
            className={activeText === 3 ? "active-gallery-nav" : ""}>
            <p>Albums</p>
          </div>
        </div>

        <div className=''>
          {activeText === 1 && (
            <div className='active-full-divs'>
              <PhotoGalleryPage pageDetails={pageDetails} />
            </div>
          )}
          {activeText === 2 && (
            <div className='active-div'>
              <div>
                <VideoGallery />
              </div>
            </div>
          )}
          {activeText === 3 && (
            <div className='active-div'>
              <PageGalleryAlbum />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageGallery;
