import { host } from "@/environment";
import React, { useState } from "react";
import NextSvg from "./svg/NextSvg";
import PreviewSvg from "./svg/PreviewSvg";

const ImageSlider = ({ images, selectedImageIndex }) => {
   const [currentIndex, setCurrentIndex] = useState(selectedImageIndex || 0);
   const handleNext = () => {
      console.log("handleNext__trigger", `${host}/uploads/groupPost/${images[currentIndex]?.media}`);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
   };

   const handlePrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
   };
   const allImgageType = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "gif", "png", "svg", "bmp"];
   const allVideoType = ["ogg", "webm", "mp4", "avi", "mov", "wmv", "mkv"];

   const fileType = `${host}/uploads/groupPost/${images[currentIndex]?.media}`.split(".").pop().toLowerCase();

   return (
      <div
         style={{
            position: "relative",
            height: "80vh",
         }}
      >
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "80vh",
            }}
         >
            {allImgageType.includes(fileType) && (
               <div>
                  <img
                     style={{
                        maxWidth: "50vw",
                        maxHeight: "78vh",
                        objectFit: "cover",
                        cursor: "pointer",
                     }}
                     key={currentIndex}
                     src={`${host}/uploads/groupPost/${images[currentIndex]?.media}`}
                     alt={`Slide ${currentIndex}`}
                  />
               </div>
            )}

            {allVideoType.includes(fileType) && (
               <div>
                  <video
                     style={{
                        maxWidth: "50vw",
                        maxHeight: "78vh",
                        objectFit: "cover",
                        cursor: "pointer",
                     }}
                     controls
                     autoPlay
                  >
                     <source src={`${host}/uploads/groupPost/${images[currentIndex]?.media}`} />
                     Your browser does not support the video tag.
                  </video>
               </div>
            )}
         </div>

         <div
            style={{
               position: "absolute",
               top: 0,
               left: 0,
               backgroundColor: "rgba(0, 0, 0, 0.075)",
               height: "80vh",
               width: "50px",
               cursor: "pointer",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
            onClick={handlePrevious}
         >
            <PreviewSvg />
         </div>
         <div
            style={{
               position: "absolute",
               top: 0,
               right: 0,
               backgroundColor: "rgba(0, 0, 0, 0.075)",
               height: "80vh",
               width: "50px",
               cursor: "pointer",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
            onClick={handleNext}
         >
            <div>
               <NextSvg />
            </div>
         </div>
      </div>
   );
};

export default ImageSlider;
