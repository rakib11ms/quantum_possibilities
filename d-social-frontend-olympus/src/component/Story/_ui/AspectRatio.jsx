import React from "react";

const AspectRatioDiv = ({children, ref}) => {
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "green",
        position: "relative",
        width: "100%",
        paddingBottom: "133.33%", // 4/3 aspect ratio (4/3 * 100)
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AspectRatioDiv;
