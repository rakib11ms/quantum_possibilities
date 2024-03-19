import React from "react";
import { NextResponse } from "next/server";
import { useEffect } from "react";
// import { useRouter } from "next/router";

// export default function middleware(request) {
//   const { pathname } = request.nextUrl;

//   if (typeof window !== 'undefined') {
//     const userInfo = window.localStorage.getItem('userInfo');

//     if (userInfo !== null) { // Check if userInfo exists in localStorage
//       return NextResponse.next();
//     }
//   }
//   return NextResponse.redirect(new URL('/login', request.url));
// }

// export const config = {
//   matcher: ['/profile', '/accountsetings', '/accountnotification', '/allevent',
//     '/bookmark', '/explore', '/about', '/friendsrequests', '/grouppage', '/marketplace', '/profilepage', '/profilephotos', '/profilevideos'
//   ],
// };

export default function middleware(request) {
   const { pathname } = request.nextUrl;

   // if (user_access.includes(pathname) && role == 'user') {
   //     return NextResponse.next();
   // }
   if (request.cookies.get("auth") && request.cookies.get("auth").value === "yes") {
      return NextResponse.next();
   }

   return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
   matcher: [
      "/newsfeed",
      "/profile/:path*",
      "/accountsetings",
      "/accountnotification",
      "/allevent",
      "/bookmark",
      "/explore",
      "/about",
      "/friendsrequests",
      "/grouppage",
      "/marketplace",
      "/profilepage",
      "/profilephotos",
      "/profilevideos",
   ],
};
