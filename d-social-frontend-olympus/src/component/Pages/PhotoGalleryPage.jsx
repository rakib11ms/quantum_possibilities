import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "../../../public/imgl1.jpg";
import img2 from "../../../public/imgl2.jpg";
import img3 from "../../../public/imgl3.jpg";
import img4 from "../../../public/imgp3.jpg";

import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";

const PhotoGalleryPage = ({ pageDetails }) => {
  const [lastestImage, setLastestImage] = useState([]);
  console.log("🚀 ~ PhotoGalleryPage ~ lastestImage:", lastestImage);
  useEffect(() => {
    if (pageDetails?._id !== null) {
      getUserPhotos(pageDetails?.page_user_name);
    }
  }, [pageDetails]);
  const getUserPhotos = (username) => {
    const formdata = {
      username: username,
      limit: 0,
    };
    axiosInstance
      .post("/api/get-pages-latest-image-video", formdata)
      .then((res) => {
        if (res.data.status == 200) {
          setLastestImage(res.data.posts);
        }
      });
  };
  return (
    <div className="">
      <div className="row page-settings-gallery-div">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="row no-gutters">
            {lastestImage.length > 0 ? (
              lastestImage.map((item, i) => (
                <div className="col-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 imag-galle-div">
                  <img
                    src={`${host}/uploads/posts/${item.media}`}
                    className="gallery-img"
                    // height={"100%"}
                    alt=""
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryPage;
