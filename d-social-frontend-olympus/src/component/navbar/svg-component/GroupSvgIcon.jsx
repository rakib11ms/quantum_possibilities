"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function GroupSvgIcon({ each }) {
   const path = usePathname();
   return (
      <div>
         <svg
            width="32"
            height="32"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <circle
               cx="16.5"
               cy="12.375"
               r="2"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="1.5"
               stroke-linecap="round"
            />
            <path
               d="M21.6429 11.375C21.9082 10.9156 22.345 10.5804 22.8574 10.4431C23.3697 10.3059 23.9156 10.3777 24.375 10.6429C24.8344 10.9082 25.1696 11.345 25.3069 11.8574C25.4441 12.3697 25.3723 12.9156 25.1071 13.375C24.8418 13.8344 24.405 14.1696 23.8926 14.3069C23.3803 14.4441 22.8344 14.3723 22.375 14.1071C21.9156 13.8418 21.5804 13.405 21.4431 12.8926C21.3059 12.3803 21.3777 11.8344 21.6429 11.375L21.6429 11.375Z"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="1.5"
            />
            <path
               d="M7.89295 11.375C8.15817 10.9156 8.595 10.5804 9.10736 10.4431C9.61972 10.3059 10.1656 10.3777 10.625 10.6429C11.0844 10.9082 11.4196 11.345 11.5569 11.8574C11.6941 12.3697 11.6223 12.9156 11.3571 13.375C11.0918 13.8344 10.655 14.1696 10.1426 14.3069C9.63028 14.4441 9.08437 14.3723 8.625 14.1071C8.16563 13.8418 7.83043 13.405 7.69315 12.8926C7.55586 12.3803 7.62773 11.8344 7.89295 11.375L7.89295 11.375Z"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="1.5"
            />
            <path
               d="M28.0785 21.6964L29.0617 21.5138L29.0617 21.5138L28.0785 21.6964ZM19.3877 18.1299L18.8064 17.3162L17.7416 18.0769L18.7552 18.9045L19.3877 18.1299ZM21.2169 21.6947L22.2039 21.5342L22.2039 21.5342L21.2169 21.6947ZM27.1876 21.6875H20.3127V23.6875H27.1876V21.6875ZM27.0953 21.8789C27.0916 21.859 27.0913 21.8274 27.102 21.792C27.1121 21.7582 27.1286 21.7331 27.1436 21.7168C27.1723 21.6858 27.1934 21.6875 27.1876 21.6875V23.6875C28.2537 23.6875 29.2961 22.7768 29.0617 21.5138L27.0953 21.8789ZM22.6877 18.1875C24.4152 18.1875 25.4105 18.8019 26.023 19.5049C26.6684 20.2458 26.9649 21.1765 27.0953 21.8789L29.0617 21.5138C28.8981 20.6324 28.5046 19.3087 27.5309 18.1911C26.5242 17.0356 24.971 16.1875 22.6877 16.1875V18.1875ZM19.969 18.9436C20.5676 18.516 21.4258 18.1875 22.6877 18.1875V16.1875C21.0545 16.1875 19.7795 16.621 18.8064 17.3162L19.969 18.9436ZM18.7552 18.9045C19.6829 19.6619 20.077 20.9152 20.2299 21.8552L22.2039 21.5342C22.0276 20.4496 21.5265 18.5852 20.0201 17.3553L18.7552 18.9045ZM20.2299 21.8552C20.227 21.8376 20.2273 21.8097 20.2371 21.7786C20.2465 21.749 20.261 21.7272 20.2742 21.7131C20.2994 21.686 20.318 21.6875 20.3127 21.6875V23.6875C21.3843 23.6875 22.4065 22.7797 22.2039 21.5342L20.2299 21.8552Z"
               fill="#AFB2B7"
            />
            <path
               d="M13.6125 18.1299L14.245 18.9045L15.2586 18.0769L14.1938 17.3162L13.6125 18.1299ZM4.9217 21.6963L5.90491 21.8789L5.90491 21.8789L4.9217 21.6963ZM11.7833 21.6947L10.7962 21.5342L10.7962 21.5342L11.7833 21.6947ZM10.3125 18.1875C11.5744 18.1875 12.4326 18.516 13.0312 18.9436L14.1938 17.3162C13.2207 16.621 11.9457 16.1875 10.3125 16.1875V18.1875ZM5.90491 21.8789C6.03529 21.1765 6.33176 20.2458 6.97727 19.5049C7.58971 18.8019 8.585 18.1875 10.3125 18.1875V16.1875C8.02919 16.1875 6.47606 17.0356 5.46932 18.1911C4.49562 19.3087 4.10212 20.6324 3.9385 21.5138L5.90491 21.8789ZM5.81255 21.6875C5.8068 21.6875 5.8279 21.6858 5.85661 21.7168C5.87162 21.7331 5.88807 21.7582 5.89824 21.792C5.9089 21.8274 5.90859 21.859 5.90491 21.8789L3.9385 21.5138C3.70405 22.7768 4.74649 23.6875 5.81255 23.6875V21.6875ZM12.6875 21.6875H5.81255V23.6875H12.6875V21.6875ZM12.6875 21.6875C12.6822 21.6875 12.7007 21.686 12.726 21.7131C12.7391 21.7272 12.7537 21.749 12.7631 21.7786C12.7729 21.8097 12.7732 21.8376 12.7703 21.8552L10.7962 21.5342C10.5937 22.7797 11.6159 23.6875 12.6875 23.6875V21.6875ZM12.7703 21.8552C12.9232 20.9152 13.3173 19.6619 14.245 18.9045L12.9801 17.3553C11.4737 18.5852 10.9726 20.4496 10.7962 21.5342L12.7703 21.8552Z"
               fill="#AFB2B7"
            />
            <path
               d="M16.5 17.1875C20.0083 17.1875 20.9591 20.1105 21.2167 21.6947C21.3054 22.2398 20.8648 22.6875 20.3125 22.6875H12.6875C12.1352 22.6875 11.6946 22.2398 11.7833 21.6947C12.0409 20.1105 12.9917 17.1875 16.5 17.1875Z"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
               stroke-linecap="round"
            />
            <path
               d="M25.4375 29.5625H28.0625C28.8909 29.5625 29.5625 28.8909 29.5625 28.0625V25.4375"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
               stroke-linecap="round"
            />
            <path
               d="M25.4375 3.4375H28.0625C28.8909 3.4375 29.5625 4.10907 29.5625 4.9375V7.5625"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
               stroke-linecap="round"
            />
            <path
               d="M7.5625 29.5625H4.9375C4.10907 29.5625 3.4375 28.8909 3.4375 28.0625V25.4375"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
               stroke-linecap="round"
            />
            <path
               d="M7.5625 3.4375H4.9375C4.10907 3.4375 3.4375 4.10907 3.4375 4.9375V7.5625"
               stroke={each.href === path ? "#307777" : "#AFB2B7"}
               stroke-width="2"
               stroke-linecap="round"
            />
         </svg>
      </div>
   );
}
