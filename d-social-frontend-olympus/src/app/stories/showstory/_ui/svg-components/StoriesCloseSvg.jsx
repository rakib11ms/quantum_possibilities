import React from "react";

export default function StoriesCloseSvg({ className, onClick }) {
   return (
      <div
         style={{
            cursor: "pointer",
         }}
         className={`${className}`}
         onClick={onClick}
      >
         <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M12.719 2.65431C13.1623 2.27084 13.1623 1.64911 12.719 1.26563C12.2756 0.882159 11.5568 0.882159 11.1134 1.26563L6.56433 5.20022L2.01525 1.26563C1.57188 0.88216 0.853049 0.882159 0.409685 1.26563C-0.0336783 1.64911 -0.033678 2.27084 0.409685 2.65431L4.95877 6.58891L0.409671 10.5235C-0.0336921 10.907 -0.0336926 11.5287 0.409671 11.9122C0.853034 12.2957 1.57187 12.2957 2.01523 11.9122L6.56433 7.97759L11.1134 11.9122C11.5568 12.2957 12.2756 12.2957 12.719 11.9122C13.1623 11.5287 13.1623 10.907 12.719 10.5235L8.16989 6.58891L12.719 2.65431Z"
               fill="white"
            />
         </svg>
      </div>
   );
}
