"use client";
import React from "react";
import "../photo/photo.css";
import { host } from "@/environment";
import axiosInstance from "../../../../utils/axios";
import "./videos.css";

function page(props) {
  const [allVideos, setAllVideos] = React.useState([]);
  const [username, setUsername] = React.useState("");

  const getAllPhotos = (username) => {
    axiosInstance
      .post("/api/get-users-latest-image-video", {
        username: username,
      })
      .then((res) => {
        if (res.data.status == 200) {
          setAllVideos(res.data.videos);
        }
      });
  };
  React.useEffect(() => {
    const localStorageUserName = localStorage.getItem("username");
    setUsername(localStorageUserName);
    getAllPhotos(localStorageUserName);
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
  return (
    <div className="tas_photo_wrapper">
      <p className="tas_all_photo_grid_title">My videos</p>
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
    </div>
  );
}

export default page;
