import React, { useState } from "react";
import PagePostList from "./PagePostList";
import UploadNavigation from "@/app/newsfeed/_ui/UploadNavigation";
import PageTextField from "./PageTextField";
import useUserInfo from "@/hooks/useUserInfo";

const Timeline = ({ pageDetails }) => {
  const [isOpenModal, setIsOpenModal] = useState({
    post: false,
    tag: false,
    event: false,
    gif: false,
    location: false,
    photoUpload: false,
  });
  console.log("pageDetailsH", pageDetails);
  // const userId = localStorage.getItem("userId");
  const { userInfo } = useUserInfo();
  const userId = userInfo?._id;
  return (
    <>
      {userId === pageDetails?.user_id ? (
        <div className="newsfeed_story__wrapper">
          <PageTextField
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            pageDetails={pageDetails}
          />
          <hr />
          {/* Navigation  */}
          <UploadNavigation
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
          <hr />
        </div>
      ) : null}
      {/* <div className="newsfeed_story__wrapper">
        <PageTextField
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          pageDetails={pageDetails}
        />
        <hr />
        <UploadNavigation
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
        <hr />
      </div> */}
      <PagePostList pageDetails={pageDetails} />
    </>
  );
};

export default Timeline;
