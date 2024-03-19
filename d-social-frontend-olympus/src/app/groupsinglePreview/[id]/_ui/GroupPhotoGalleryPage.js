import React, { useEffect, useState } from "react";
import { host } from "@/environment";

import axiosInstance from "../../../../../utils/axios";
import "./GroupPhotoGalleryPage.css"

const GroupPhotoGalleryPage = ({ groupId }) => {
  const [groupImages, setGroupImages] = useState([]);
  console.log("🚀 ~ PhotoGalleryPage ~ lastestImage:", groupImages);

  const getGroupImages = (groupId) => {
    axiosInstance
      .get(`/api/get-group-resource/${groupId}?type=media&variety=photo`)
      .then((res) => {
        if (res.data.status == 200) {
          setGroupImages(res.data.groupMedia)
        }
      });
  };

  useEffect(() => {
    if (groupId !== null) {
      getGroupImages(groupId);
    }
  }, []);

  return (
    <div className="tas_group_image_container">
      {groupImages
        .length > 0 ? (
        groupImages.map((item, i) => (
          <>
            
            <div className="tas_group_single_image_container" style={{
              position:'relative'
            }}>
              <div className="event-btn" style={{
                position:'absolute',
                top:3,
                right:3,
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.71)"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="23" viewBox="0 0 15 4" fill="none">
                  <path d="M1.85185 2.30303e-08C0.833333 1.03636e-08 1.3028e-08 0.9 2.89512e-08 2C4.48743e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 3.5697e-08 1.85185 2.30303e-08ZM12.963 1.61212e-07C11.9444 1.48546e-07 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 1.73879e-07 12.963 1.61212e-07ZM7.40741 9.21213e-08C6.38889 7.94547e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 1.04788e-07 7.40741 9.21213e-08Z" fill="#307777" />
                </svg>
              </div>
              <img
                src={`${host}${item.src}`}
                className="tas_group_image"
                alt=""
              />
            </div>

          </>
        ))
      ) : (
        <></>
      )}


    </div>
  );
};

export default GroupPhotoGalleryPage;
