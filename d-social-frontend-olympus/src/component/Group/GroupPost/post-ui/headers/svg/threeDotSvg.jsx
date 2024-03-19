import React from "react";

/**
 *
 * @param {onclick} onclick is Call Back function ()=>{}
 * @returns SVG JSX element
 */

export default function ThreeDotSvg({onclick}) {
  return (
    <div
      onclick={onclick}
      style={{
        marginTop: "-8px",
        cursor: "pointer",
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="5" viewBox="0 0 25 5" fill="none">
        <path
          d="M2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0Z"
          fill="#333333"
        />
        <path
          d="M10 2.5C10 1.11929 11.1193 0 12.5 0C13.8807 0 15 1.11929 15 2.5C15 3.88071 13.8807 5 12.5 5C11.1193 5 10 3.88071 10 2.5Z"
          fill="#333333"
        />
        <path
          d="M20 2.5C20 1.11929 21.1193 0 22.5 0C23.8807 0 25 1.11929 25 2.5C25 3.88071 23.8807 5 22.5 5C21.1193 5 20 3.88071 20 2.5Z"
          fill="#333333"
        />
      </svg>
    </div>
  );
}
