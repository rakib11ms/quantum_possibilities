import React from "react";

export default function ActionAbleImageSvg({className, onClick}) {
  return (
    <div className={className} onClick={onClick}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.30413 3.98761L17.1353 3.1005C18.8494 2.9601 20.3305 4.28664 20.379 6.00584L20.6465 15.4856C20.6836 16.7982 19.8627 17.9824 18.6205 18.4082L9.95534 21.3784C8.25012 21.9629 6.41813 20.9223 6.04688 19.1583L3.61333 7.59545C3.24136 5.82804 4.50403 4.13505 6.30413 3.98761Z"
          stroke="#A8ABAF"
        />
        <path d="M20.691 12.0041C16.5968 14.4811 15.1494 16.3562 13.3709 20.161" stroke="#A8ABAF" />
        <path d="M8.17627 13.9429C9.82635 16.2711 11.0186 16.5718 13.3561 16.3949" stroke="#A8ABAF" />
        <rect
          x="7.78125"
          y="8.54614"
          width="1.29849"
          height="1.23632"
          rx="0.618158"
          transform="rotate(9.68749 7.78125 8.54614)"
          fill="#A0A3A7"
        />
        <rect
          x="14.8638"
          y="7.55994"
          width="1.29849"
          height="1.23632"
          rx="0.618158"
          transform="rotate(9.68749 14.8638 7.55994)"
          fill="#A0A3A7"
        />
      </svg>
    </div>
  );
}
