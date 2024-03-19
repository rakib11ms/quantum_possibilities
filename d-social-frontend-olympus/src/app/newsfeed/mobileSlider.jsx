import React from 'react';
import Slider from "react-slick";
// import sliderTop1 from "../../../public/mbSliderOne.png";
// import sliderTop2 from "../../../public/mbSlidertwo.png";
// import sliderTop3 from "../../../public/mbSliderthree.png";
import Link from "next/link";
import mobileSliderCss from "./mobileSlider.module.css";

const MobileSlider = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2500,
    cssEase: "linear",
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

  return (
    <div>
      <Slider {...settings}>
        <div>
          <div className={mobileSliderCss.slide}>
            <div>
              <img className={mobileSliderCss.mobile_slider_img} src={'/mbSliderOne.png'} alt="" />
              <div className={mobileSliderCss.overlay}>
                {/* <p className={mobileSliderCss.description}>
                  Impressionism is the newspaper of the soul.
                </p> */}

                <Link href="https://getbootstrap.com/">
                  <p className={mobileSliderCss.seeMoreLink}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={mobileSliderCss.slide}>
            <div>
              <img className={mobileSliderCss.mobile_slider_img} src={'/mbSlidertwo.png'} alt="" />
              <div className={mobileSliderCss.overlay}>
                {/* <p className={mobileSliderCss.description}>
                  {" "}
                  the media is splintered into a thousand fragments
                </p> */}
                {/* See More Link */}
                <Link href="https://getbootstrap.com/">
                  <p className={mobileSliderCss.seeMoreLink}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={mobileSliderCss.slide}>
            <div>
              <img className={mobileSliderCss.mobile_slider_img} src={'/mbSliderthree.png'} alt="" />
              <div className={mobileSliderCss.overlay}>
                {/* <p className={mobileSliderCss.description}>
                  Violence Protest
                  Violence Protest
                  Violence Protest

                </p> */}
                {/* See More Link */}
                <Link href="https://getbootstrap.com/">
                  <p className={mobileSliderCss.seeMoreLink}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default MobileSlider;
