import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NewsfeedReelsCss from "./newsfeedReels.module.css";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { host } from "@/environment";
import axiosInstance from "../../../utils/axios";
import "./newsfeed.css";

const NewsfeedReels = () => {
  const [fullName, setFullName] = React.useState("");
  const [profileImage, setprofileImage] = useState("");
  const [story, setStory] = useState([]);
  const [divWidth, setDivWidth] = React.useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageFullName = localStorage.getItem("fullname");
      const localStorageUserInfo = localStorage.getItem("userInfo");
      const data = JSON.parse(localStorageUserInfo);
      setFullName(localStorageFullName);
      if (localStorageUserInfo !== null) {
        setprofileImage(data[0].profile_pic);
      }
    }
  }, []);

  var settingsone = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    swipeToSlide: true,

    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          padding: 1,
        },
      },
    ],
  };

  const customPrevArrow = (
    <div
      className={`${NewsfeedReelsCss.customArrow} ${NewsfeedReelsCss.leftArrow}`}
      onClick={() => {
        slider.slickPrev();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrow-left-circle"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
        />
      </svg>
    </div>
  );

  useEffect(() => {
    axiosInstance.post("/api/get-story").then((res) => {
      if (res.data.status == 200) {
        setStory(res.data.results);
        setDivWidth(Math.min(res.data.results.length + 1, 4));
      }
    });
  }, []);
  const renderItems = () => {
    const itemElements = [];

    for (let i = 0; i < 4 - story.length; i++) {
      itemElements.push(<div key={i}></div>);
    }

    return itemElements;
  };

  const customNextArrow = (
    <div
      className={`${NewsfeedReelsCss.customArrow} ${NewsfeedReelsCss.rightArrow}`}
      onClick={() => {
        slider.slickNext();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="currentColor"
        className="bi bi-arrow-right-short"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
        />
      </svg>
    </div>
  );

  let slider;

  return (
    <div className={NewsfeedReelsCss.sliderContainer}>
      {customPrevArrow}
      <Slider
        {...settingsone}
        ref={(c) => {
          slider = c;
        }}
      >
        <div style={{ width: `${100 / 4}%` }}>
          <div className={NewsfeedReelsCss.slide}>
            <div>
              {profileImage !== null ? (
                <img className={NewsfeedReelsCss.single_image_create} src={`${host}/uploads/${profileImage}`} alt="" />
              ) : (
                <img
                  className={NewsfeedReelsCss.single_image_create}
                  src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                />
              )}

              <div className={NewsfeedReelsCss.overlay}>
                <div className={NewsfeedReelsCss.overlay_Picon_name_create}>
                  <Link href="/stories/create">
                    <div className="create-svg-div">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        width="56"
                        height="46"
                        className="bi bi-plus create-svg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                    </div>
                    <br /> <p className={NewsfeedReelsCss.createStory}>Create Story</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {story.length > 0 &&
          story.map((item, i) => {
            return (
              // <div
              //   style={{
              //     overflow: "hidden",
              //   }}
              // >
              //   <div className={NewsfeedReelsCss.slide}>
              //     <Link href={`/stories/showstory/${item._id}`} style={{cursor: "pointer"}}>
              //       {item.media != null ? (
              //         <img
              //           className={NewsfeedReelsCss.single_image}
              //           src={`${host}/uploads/story/${item.media}`}
              //           alt=""
              //         />
              //       ) : (
              //         <></>
              //       )}

              //       <div className={NewsfeedReelsCss.overlay} style={{backgroundColor: item.color}}>
              //         <div
              //           className="mx-auto "
              //           style={{
              //             display: "flex",
              //             flexDirection: "column",
              //             justifyContent: "center",
              //             alignItems: "center",
              //             height: "100%",
              //             overflow: "hidden",
              //           }}
              //         >
              //           <p
              //             style={{
              //               color: item.text_color ? item.text_color : "white",
              //               fontSize: item.font_size != null ? `${item.font_size}px` : "14px",
              //               fontWeight: 700,
              //               margin: 0,
              //               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              //               overflow: "hidden",
              //             }}
              //             className={`${item.text_position}  ${item.text_alignment}`}
              //           >
              //             {item.title}
              //           </p>
              //         </div>
              //         <div className={NewsfeedReelsCss.overlay_Picon_name}>
              //           <svg
              //             xmlns="http://www.w3.org/2000/svg"
              //             width="16"
              //             height="16"
              //             fill="currentColor"
              //             className="bi bi-play-fill"
              //             viewBox="0 0 16 16"
              //           >
              //             <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              //           </svg>

              //           <Link href="#">
              //             {" "}
              //             <p className={NewsfeedReelsCss.seeMoreLink}>
              //               {item.user_id.first_name + " " + item.user_id.last_name}
              //             </p>
              //           </Link>
              //         </div>
              //       </div>
              //     </Link>
              //   </div>
              // </div>

              <>
                <div
                  className="story-div"
                >
                  <Link href={`/stories/showstory/${item._id}`}>
                    <img
                      style={{
                        objectFit: "cover",
                      }}
                      src={`${host}/uploads/story/${item.media}`}
                      alt=""
                    />
                  </Link>
                </div>
              </>
            );
          })}

        {renderItems()}
      </Slider>
      {customNextArrow}
    </div>
  );
};

export default NewsfeedReels;
