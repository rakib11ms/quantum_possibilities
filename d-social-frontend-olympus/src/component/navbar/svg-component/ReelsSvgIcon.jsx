"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function ReelsSvgIcon({ each }) {
   const path = usePathname();
   return (
      <div>
         <svg
            width="32"
            height="32"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M8.5 3.50673C10.7063 2.23046 13.2679 1.5 16 1.5C24.2842 1.5 31 8.21572 31 16.5C31 24.7842 24.2842 31.5 16 31.5C7.71572 31.5 1 24.7842 1 16.5C1 13.7679 1.73046 11.2063 3.00673 9"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
               stroke-linecap="round"
            />
            <path
               d="M16 31.5H31"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="1.5"
               stroke-linecap="round"
            />
            <path
               d="M18 10C18 10.8284 17.1045 11.5 16 11.5C14.8955 11.5 14 10.8284 14 10C14 9.17157 14.8955 8.5 16 8.5C17.1045 8.5 18 9.17157 18 10Z"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
            />
            <path
               d="M18 23C18 23.8284 17.1045 24.5 16 24.5C14.8955 24.5 14 23.8284 14 23C14 22.1716 14.8955 21.5 16 21.5C17.1045 21.5 18 22.1716 18 23Z"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
            />
            <path
               d="M9.5 14.5C10.3284 14.5 11 15.3955 11 16.5C11 17.6045 10.3284 18.5 9.5 18.5C8.67157 18.5 8 17.6045 8 16.5C8 15.3955 8.67157 14.5 9.5 14.5Z"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
            />
            <path
               d="M22.5 14.5C23.3284 14.5 24 15.3955 24 16.5C24 17.6045 23.3284 18.5 22.5 18.5C21.6716 18.5 21 17.6045 21 16.5C21 15.3955 21.6716 14.5 22.5 14.5Z"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
            />
         </svg>
      </div>
   );
}
