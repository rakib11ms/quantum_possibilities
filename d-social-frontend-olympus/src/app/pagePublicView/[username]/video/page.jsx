"use client";
import React, { useEffect } from "react";
import "./photo.css";
// import "../video/videos.css";
import { host } from "@/environment";
import axiosInstance from "../../../../../utils/axios";
import { useParams } from "next/navigation";
import { useGetPageInfoMutation } from "@/redux/features/Page/pageApiSlice";
function page(props) {
  const [allVideos, setAllVideos] = React.useState([]);
  const [username, setUsername] = React.useState("");

  const getAllVideos = (username) => {
    axiosInstance
      .post("/api/get-pages-latest-image-video", {
        username: username,
      })
      .then((res) => {
        if (res.data.status == 200) {
          setAllVideos(res.data.videos);
        }
      });
  };
  React.useEffect(() => {
    getAllVideos(params.username);
  }, []);

  const params = useParams();
  const [getPageInfo, { data, isloading, error, isError, isSuccess }] =
    useGetPageInfoMutation();

  console.log(data, "data at pageInfo");

  useEffect(() => {
    (async function () {
      await getPageInfo({
        page_user_name: params.username,
      });
    })();
  }, []);

  const PhotoItem = ({ video }) => {
    return (
      <div className="tas_profile_photo_item">
        <video controls width="400">
          <source src={`${host}/uploads/posts/${video}`} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
    );
  };

  const [activeDiv, setActiveDiv] = React.useState(1);
  const handleTextClick = (divId) => {
    setActiveDiv(divId);
  };
  return (
    <div className="tas_photo_wrapper">
      <div className="d-flex justify-content-between align-items-center">
        <p className="tas_all_photo_grid_title">Page Videos</p>
        <span className="mrak_add_button">Add photos/videos</span>
      </div>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="prof-ful-work-edu-div">
          <div className="prof-work-edu-div">
            <div
              onClick={() => handleTextClick(1)}
              className={`prof-about-side-bar-li ${
                activeDiv === 1 ? "active-prof-about" : ""
              }`}
            >
              <h6 className="about-profile-bartext">Page Videos</h6>
            </div>
            <div
              onClick={() => handleTextClick(2)}
              className={`prof-about-side-bar-li ${
                activeDiv === 2 ? "active-prof-about" : ""
              }`}
            >
              <h6 className="about-profile-bartext">Albums</h6>
            </div>
          </div>

          <div>
            {activeDiv === 1 && (
              <div className="tas_video_grid_container">
                {allVideos.length > 0 ? (
                  allVideos.map((item) => {
                    return <PhotoItem video={item.media} />;
                  })
                ) : (
                  <div className="tas_profile_no_video">
                    <p>No Videos found</p>
                  </div>
                )}
              </div>
            )}

            {activeDiv === 2 && (
              <div className="tas_profile_no_video">
                <p>No Videos found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
