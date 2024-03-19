import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import CampaignCarouselModule from "./CampaignCarousel.module.css";
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";

const CampaignCarousel = ({ postInformation }) => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 900,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1500,
      autoplaySpeed: 2000,
      cssEase: "linear",
      arrows: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
               arrows: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               initialSlide: 1,
               arrows: true,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };

   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   const user_id = userInfo[0]?._id;

   let timer;
   const handleHover = () => {
      timer = setTimeout(() => {
         axiosInstance
            .post(`/api/campaign/save-campaign-performance`, {
               campaign_id: postInformation?.campaign_id,
               campaign_name: postInformation?.title,
               campaign_location: postInformation?.location,
               is_impressed: true,
               is_reached: true,
               is_clicked: false,
               user_id: user_id,
               created_by: user_id,
               createdAt: new Date(),
            })
            .then((response) => {
               console.log(response.data);
            })
            .catch((error) => {
               console.error(error);
            });
      }, 1);
   };

   const handleMouseLeave = () => {
      clearTimeout(timer);
   };

   return (
      <div className="slider-container" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
         <Slider {...settings}>
            {postInformation?.media.length > 0 &&
               postInformation?.media.map((item) => (
                  <div className={CampaignCarouselModule.slide}>
                     <div>
                        {item?.media && item?.media.includes(".mp4") ? (
                           <video autoPlay muted controls>
                              <source src={`${host}/uploads/posts/${item?.media}`} type="video/mp4" />
                           </video>
                        ) : (
                           <img src={`${host}/uploads/posts/${item?.media}`} alt="" />
                        )}
                     </div>
                  </div>
               ))}
         </Slider>
      </div>
   );
};

export default CampaignCarousel;
