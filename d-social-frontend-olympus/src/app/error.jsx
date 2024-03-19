"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
         }}
      >
         <h2>Something went wrong!</h2>
         <button
            style={{
               width: "100px",
               height: "40px",
               borderRadius: "10px",
               backgroundColor: "#F0F2F5",
               border: "0.5px solid rgba(112, 112, 112, 0.50)",
               margin: "10px",
               cursor: "pointer",
            }}
            onClick={() => reset()}
         >
            Try again
         </button>
      </div>
   );
}
