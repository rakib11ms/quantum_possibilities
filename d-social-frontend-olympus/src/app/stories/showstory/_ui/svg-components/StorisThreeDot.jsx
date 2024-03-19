import React from "react";

export default function StorisThreeDot({ className, onClick }) {
   return (
      <div
         style={{
            cursor: "pointer",
         }}
         className={`${className}`}
         onClick={onClick}
      >
         <svg
            width="27"
            height="6"
            viewBox="0 0 27 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M2.77456 0.341309C1.34145 0.341309 0.179688 1.41498 0.179688 2.73941C0.179688 4.06385 1.34145 5.13752 2.77456 5.13752C4.20767 5.13752 5.36943 4.06385 5.36943 2.73941C5.36943 1.41498 4.20767 0.341309 2.77456 0.341309Z"
               fill="white"
            />
            <path
               d="M10.5592 2.73941C10.5592 1.41498 11.7209 0.341309 13.154 0.341309C14.5872 0.341309 15.7489 1.41498 15.7489 2.73941C15.7489 4.06385 14.5872 5.13752 13.154 5.13752C11.7209 5.13752 10.5592 4.06385 10.5592 2.73941Z"
               fill="white"
            />
            <path
               d="M20.9387 2.73941C20.9387 1.41498 22.1004 0.341309 23.5335 0.341309C24.9666 0.341309 26.1284 1.41498 26.1284 2.73941C26.1284 4.06385 24.9666 5.13752 23.5335 5.13752C22.1004 5.13752 20.9387 4.06385 20.9387 2.73941Z"
               fill="white"
            />
         </svg>
      </div>
   );
}