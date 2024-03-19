import React from "react";

function CrossIcon({ width = 20, height = 20, onClick }) {
   return (
      <svg
         style={{
            cursor: "pointer",
         }}
         onClick={onClick}
         xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
         viewBox="0 0 20 20"
         fill="none"
      >
         <path d="M15 5L5 15" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
         <path d="M5 5L15 15" stroke="#222222" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
   );
}

export default CrossIcon;
