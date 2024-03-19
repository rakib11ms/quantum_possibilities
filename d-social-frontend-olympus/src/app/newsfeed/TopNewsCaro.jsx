import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import sliderTop1 from "../../../public/newsSlider1.png";
import sliderTop2 from "../../../public/newsSlider2.png";
import sliderTop3 from "../../../public/newsSlider3.png";
import Link from "next/link";
import TopNewsCaroCss from "./TopNewsCaro.module.css";
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";

const TopNewsCaro = () => {
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1500,
      autoplaySpeed: 4000,
      cssEase: "linear",
      arrows: false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               initialSlide: 1,
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

   const [news, setNews] = useState([]);

   useEffect(() => {
      axiosInstance.get(`${host}/api/get-latest-news`).then((res) => {
         console.log(res.data.status, "status");
         if (res.data.status == 200) {
            console.log(res.data.data, "data");
            setNews(res.data.data);
         }
      });
   }, []);

   return (
      <div>
         <Slider {...settings}>
            {news.length > 0 &&
               news.map((item) => (
                  <div>
                     <div className={TopNewsCaroCss.slide}>
                        <div className={TopNewsCaroCss.topNewsCaroCssimgdiv}>
                           <img
                              style={{
                                 objectFit: "cover",
                              }}
                              className={TopNewsCaroCss.topNewsCaroCssimg}
                              src={item.image}
                              alt=""
                           />
                           <div className={TopNewsCaroCss.overlay}>
                              <p className={TopNewsCaroCss.description}>{item.title}</p>

                              <Link href={item.url} target="_blank">
                                 <p className={TopNewsCaroCss.seeMoreLink}>See More</p>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
         </Slider>
      </div>
   );
};

export default TopNewsCaro;
