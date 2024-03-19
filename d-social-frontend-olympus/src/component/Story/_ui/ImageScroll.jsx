import React, {useRef, useState} from "react";

const ImageContainer = ({storyImagePath, SnapShotRef}) => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);

  const handleMouseWheel = (e) => {
    // Adjust the zoom level based on the mouse wheel delta
    const newZoom = zoom + e.deltaY * 0.01;
    setZoom(Math.max(1, newZoom));
  };

  const handleMouseMove = (e) => {
    // Update the position based on mouse movement
    if (e.buttons === 1) {
      const newX = position.x + e.movementX;
      const newY = position.y + e.movementY;
      setPosition({x: newX, y: newY});
    }
  };

  return (
    <div
      ref={SnapShotRef}
      style={{
        height: "400px",
        width: "300px",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "red",
      }}
    >
      <div
        onWheel={handleMouseWheel}
        onMouseMove={handleMouseMove}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
          transform: `scale(${zoom})`,
          backgroundImage: `url(${storyImagePath})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p onWheel={handleMouseWheel} onMouseMove={handleMouseMove} style={{color: "red", backgroundColor: "green"}}>
          Happy coding .....
        </p>
      </div>
    </div>
  );
};

export default ImageContainer;
