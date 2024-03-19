import React, { useEffect, useState } from "react";
import { host } from "@/environment";

import axiosInstance from "../../../../../utils/axios";
import "./GroupVideoGalleryPage.css"

const GroupVideoGalleryPage = ({ groupId }) => {
  const [groupVideos, setGroupVideos] = useState([]);
  console.log("🚀 ~ GroupVideoGalleryPage ~ groupVideos:", groupVideos)

  const getGroupImages = (groupId) => {
    axiosInstance
      .get(`/api/get-group-resource/${groupId}?type=media&variety=video`)
      .then((res) => {
        if (res.data.status == 200) {
          setGroupVideos(res.data.groupMedia)
        }
      });
  };

  useEffect(() => {
    if (groupId !== null) {
      getGroupImages(groupId);
    }
  }, []);

  return (
    <div className="tas_group_video_container">
            {groupVideos
            .length > 0 ? (
              groupVideos.map((item, i) => (
                <>
                  <div className="tas_group_single_video_container">
                    <video width="320" height="240" controls>
                        <source src={`${host}${item.src}`} type="video/mp4"/>
                    </video>
                    </div>
                    
                </>
              ))
            ) : (
              <></>
            )}
            
            
    </div>
  );
};

export default GroupVideoGalleryPage;
