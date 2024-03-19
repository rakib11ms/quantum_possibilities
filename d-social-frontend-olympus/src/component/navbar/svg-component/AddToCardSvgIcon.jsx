"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function AddToCardSvgIcon({ each }) {
   const path = usePathname();
   return (
      <div>
         <svg
            width="32"
            height="32"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M22.4839 17C23.6085 17 24.5981 16.385 25.1079 15.455L30.4759 5.72C31.0307 4.73 30.311 3.5 29.1714 3.5H6.97965L5.57017 0.5H0.666992V3.5H3.66588L9.06387 14.885L7.03963 18.545C5.94503 20.555 7.3845 23 9.66365 23H27.657V20H9.66365L11.313 17H22.4839ZM8.40412 6.5H26.6224L22.4839 14H11.9578L8.40412 6.5ZM9.66365 24.5C8.01426 24.5 6.67976 25.85 6.67976 27.5C6.67976 29.15 8.01426 30.5 9.66365 30.5C11.313 30.5 12.6625 29.15 12.6625 27.5C12.6625 25.85 11.313 24.5 9.66365 24.5ZM24.6581 24.5C23.0087 24.5 21.6742 25.85 21.6742 27.5C21.6742 29.15 23.0087 30.5 24.6581 30.5C26.3075 30.5 27.657 29.15 27.657 27.5C27.657 25.85 26.3075 24.5 24.6581 24.5Z"
               fill={each.href === path ? "#307777" : "#AFB2B7"}
            />
         </svg>
      </div>
   );
}