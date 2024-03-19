import React from "react";
import img1 from "../../../public/imgl1.jpg";
import img2 from "../../../public/imgl2.jpg";
import img3 from "../../../public/imgl3.jpg";
import img4 from "../../../public/imgp3.jpg";
import Image from "next/image";

const PageGalleryAlbum = () => {
  return (
    <div>
      <div className='page-album-single-img-full-div'>
        <div className='page-album-img-div'>
          <div id='page-album-single-img'>
            <div className='album-single-img-div'>
              <img className='album-single-img' src={img1.src} alt='' />
            </div>
            <div className='album-single-img-div'>
              <img className='album-single-img-lg' src={img2.src} alt='' />
            </div>

            <div className='album-single-img-div'>
              <img className='album-single-img' src={img1.src} alt='' />
            </div>
            <div className='album-single-img-div'>
              <img className='album-single-img' src={img1.src} alt='' />
            </div>
            <div className='album-single-img-div'>
              <img className='album-single-img' src={img1.src} alt='' />
            </div>
          </div>

          <div className='page-album-texts'>
            <h6 className='album-tag'>A day with game play</h6>
            <p className='album-tag-text'>40 items | 39 images | 1 Videos</p>
          </div>
        </div>
        <div>
          <div id='page-album-single-img'>
            <div className='album-single-img-div'>
              <img className='album-single-img' src={img1.src} alt='' />
            </div>
            <div className='album-single-img-div'>
              <img className='album-single-img-lg' src={img2.src} alt='' />
            </div>

            <div className='album-single-img-div'>
              <img className='album-single-img' src={img1.src} alt='' />
            </div>
            <div className='album-single-img-div'>
              <img className='album-single-img' src={img1.src} alt='' />
            </div>
            <div className='album-single-img-div'>
              <img className='album-single-img' src={img1.src} alt='' />
            </div>
          </div>

          <div className='page-album-texts'>
            <h6 className='album-tag'>A day with game play</h6>
            <p className='album-tag-text'>40 items | 39 images | 1 Videos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageGalleryAlbum;
