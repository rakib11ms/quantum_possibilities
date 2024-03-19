import React from "react";

export default function LeftArrowSvgIcon({ className, onClick }) {
   return (
      <svg
         className={className}
         onClick={onClick}
         width="9"
         height="14"
         viewBox="0 0 9 14"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M7.86881 1.57869C8.24199 1.21755 8.24199 0.632009 7.86881 0.270861C7.49564 -0.090287 6.89061 -0.090287 6.51743 0.270861L0.387546 6.20323C0.0143728 6.56437 0.0143728 7.14991 0.387546 7.51106L6.51743 13.4434C6.89061 13.8046 7.49564 13.8046 7.86881 13.4434C8.24199 13.0823 8.24199 12.4967 7.86881 12.1356L2.41461 6.85714L7.86881 1.57869Z"
            fill="black"
         />
      </svg>
   );
}
