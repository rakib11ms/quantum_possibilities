import React from "react";

export default function CrossIcon({ className, onClick }) {
   return (
      <div
         style={{
            cursor: "pointer",
         }}
         className={`${className}`}
         onClick={onClick}
      >
         <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <circle cx="22" cy="22" r="21.75" fill="#7E869E" fill-opacity="0.25" />
            <path
               d="M31.6663 12.3335L12.333 31.6668"
               stroke="#222222"
               stroke-width="1.2"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
            <path
               d="M12.3337 12.3335L31.667 31.6668"
               stroke="#222222"
               stroke-width="1.2"
               stroke-linecap="round"
               stroke-linejoin="round"
            />
         </svg>
      </div>
   );
}
