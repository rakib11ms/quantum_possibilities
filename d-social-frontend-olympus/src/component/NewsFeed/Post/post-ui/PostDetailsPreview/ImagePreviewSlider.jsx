import { host } from "@/environment";
import React, { useState } from "react";
import NextSvg from "./svg/NextSvg";
import PreviewSvg from "./svg/PreviewSvg";

const ImageSlider = ({ images, selectedImageIndex }) => {
   const [currentIndex, setCurrentIndex] = useState(selectedImageIndex || 0);
   const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
   };

   const handlePrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
   };
   const allImgageType = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "gif", "png", "svg", "bmp"];
   const allVideoType = ["ogg", "webm", "mp4", "avi", "mov", "wmv", "mkv"];

   const fileType = `${host}/uploads/posts/${images[currentIndex]?.media}`.split(".").pop().toLowerCase();

   return (
      <div
         style={{
            position: "relative",
            height: "80vh",
         }}
      >
         {/* Previous button */}
         <div
            style={{
               position: "absolute",
               top: 0,
               left: 0,
               height: "80vh",
               width: "50px",
               cursor: "pointer",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               zIndex: 20, // Set higher zIndex for previous button
            }}
            onClick={handlePrevious}
         >
            <PreviewSvg />
         </div>

         {/* Next button */}
         <div
            style={{
               position: "absolute",
               top: 0,
               right: 0,
               height: "80vh",
               width: "50px",
               cursor: "pointer",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               zIndex: 20, // Set higher zIndex for next button
            }}
            onClick={handleNext}
         >
            <div>
               <NextSvg />
            </div>
         </div>

         {/* Media display */}
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "80vh",
               zIndex: 10, // Set lower zIndex for media display
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
                     src={`${host}/uploads/posts/${images[currentIndex]?.media}`}
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
                     <source src={`${host}/uploads/posts/${images[currentIndex]?.media}`} />
                     Your browser does not support the video tag.
                  </video>
               </div>
            )}
         </div>
      </div>
   );
};

export default ImageSlider;
