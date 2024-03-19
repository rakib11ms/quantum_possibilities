import React from "react";

export default function MessageIconSvg({ className, onClick }) {
   return (
      <svg
         className={className}
         onClick={onClick}
         width="15"
         height="13"
         viewBox="0 0 15 13"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M1.5 5L10.5 5C10.7761 5 11 5.22386 11 5.5L11 10.2778C11 10.5539 10.7761 10.7778 10.5 10.7778L2.83704 10.7778C2.67513 10.7778 2.52324 10.8562 2.42945 10.9882L1.90759 11.7227C1.62548 12.1197 0.999999 11.9201 0.999999 11.433L0.999998 5.5C0.999998 5.22386 1.22386 5 1.5 5Z"
            fill="white"
            stroke="#454B54"
         />
         <path
            d="M14 1H5.5C5.22386 1 5 1.22386 5 1.5V7C5 7.27614 5.22386 7.5 5.5 7.5H12.7169C12.8925 7.5 13.0553 7.59215 13.1457 7.74275L13.5713 8.45209C13.8322 8.88693 14.5 8.70195 14.5 8.19484V1.5C14.5 1.22386 14.2761 1 14 1Z"
            fill="white"
            stroke="#454B54"
         />
      </svg>
   );
}
