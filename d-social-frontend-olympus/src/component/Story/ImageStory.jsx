import React, {useEffect, useRef, useState, createRef} from "react";
import StoryCSS from "../../app/stories/textstory/textstory.module.css";
import {host} from "@/environment";
// import '../../assets'
import "../../assets/css/textstory.css";
import axiosInstance from "../../../utils/axios";
import {useRouter} from "next/navigation";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import WarningModal from "./WarningModal";
import Cropper from "react-easy-crop";
import "react-image-crop/dist/ReactCrop.css";
import getCroppedImg from "./cropImage";

import {useScreenshot, createFileName} from "use-react-screenshot";
import ImageContainer from "./_ui/ImageScroll";
import Draggable from "react-draggable";
import {Resizable} from "react-resizable";
import "react-resizable/css/styles.css";

function ImageStory({files}) {
  const router = useRouter();
  const [content, setContent] = React.useState("");
  const [color, setColor] = useState("#FFFFF");
  const [fontFamily, setFontFamily] = useState("");

  const [profileImage, setprofileImage] = useState("");
  const [storyImagePath, setStoryImagePath] = useState("");
  const [fullName, setFullName] = React.useState("");
  const [position, setPosition] = useState("middle");
  const [alignment, setAlignment] = useState("center");
  const [fontSize, setFontSize] = useState(12);
  const [discardModal, setDiscardModal] = useState(false);
  // const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const imageRef = useRef(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // setStoryImagePath = async()=>{
  //     const croppedImage = await getCroppedImg(storyImagePath, croppedAreaPixels, rotation);
  //   setCroppedImage(croppedImage);
  // })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageFullName = localStorage.getItem("fullname");
      const localStorageUserInfo = localStorage.getItem("userInfo");
      const data = JSON.parse(localStorageUserInfo);
      setFullName(localStorageFullName);
      if (localStorageUserInfo !== null) {
        setprofileImage(data[0].profile_pic);
      }
    }
  }, []);

  useEffect(() => {
    files.length > 0 &&
      files.map((file, index) => {
        if (file.type.startsWith("image/")) {
          setStoryImagePath(URL.createObjectURL(file));
        }
      });
  }, [files]);

  const handleStory = async (image, {name = "img", extension = "jpg"} = {}) => {
    try {
      const formData = new FormData();
      const result = await download(image, {name, extension});

      if (result) {
        formData.append("files", result);

        console.log(croppedImage, "croppedImage");
        console.log("formData", formData.get("files"));

        const res = await axiosInstance.post("/api/save-story", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle the response appropriately
        if (res.data.status === 200) {
          // Perform actions after successful save
          router.push("/newsfeed");
        }
      }
    } catch (error) {
      console.error("Error in handleStory:", error);
      // Handle errors appropriately
    }
  };

  const openDiscardModal = () => {
    setDiscardModal(true);
  };
  const closeModal = () => {
    setDiscardModal(false);
  };
  async function blobURLtoFile(blobURL, fileName, fileType) {
    try {
      const response = await fetch(blobURL);
      const blobData = await response.blob();
      return new File([blobData], fileName, {type: fileType});
    } catch (error) {
      console.error("Error converting Blob URL to File:", error);
      throw error; // You may choose to handle the error differently based on your application's needs
    }
  }

  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  function blobURLtoBlob(blobURL) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = () => reject(new Error("Error converting Blob URL to Blob"));
      xhr.open("GET", blobURL);
      xhr.send();
    });
  }

  // Function to convert Blob to File
  function blobToFile(blob, fileName, fileType) {
    return new File([blob], fileName, {type: fileType});
  }

  // ==>
  const SnapShotRef = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = async (image, {name = "img", extension = "jpg"} = {}) => {
    try {
      const croppedImage2 = await getCroppedImg(storyImagePath, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage2);

      const divElement = document.getElementById("snapShotRef");

      if (divElement) {
        // Modify the content or style of the element with the specified id
        // divElement.innerText = "New Text";
        divElement.style.backgroundImage = `url(${croppedImage2})`;
      }

      // Wait for any asynchronous operations to complete
      await new Promise((resolve) => setTimeout(resolve, 0));

      const data = await takeScreenShot(SnapShotRef.current);

      // Assuming `blobURLtoFile` is a function that converts a data URL to a Blob
      console.log(name, extension, "exte  ");
      const blobFile = await blobURLtoFile(data, `${name}.${extension}`);

      console.log(blobFile, "blobFile");
      return blobFile;
    } catch (error) {
      console.error("Error in download:", error);
      return null;
    }
  };

  const [positions, setPositions] = React.useState({x: 40, y: 50});
  const [size, setSize] = React.useState({width: 200, height: 100});
  const [fontSizes, setFontSizes] = React.useState(16);

  const handleDrag = (e, ui) => {
    const {x, y} = position;
    setPosition({x: x + ui.deltaX, y: y + ui.deltaY});
  };

  const handleResize = (e, {size}) => {
    setSize({width: size.width, height: size.height});
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 10;
    if (e.deltaY > 0) {
      setFontSizes((prevFontSize) => Math.max(1, prevFontSize - zoomFactor));
    } else {
      setFontSizes((prevFontSize) => prevFontSize + zoomFactor);
    }
  };
  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
        <div className="prof-side-bar ">
          <div className="row">
            <div className="col-md-6">
              <h4 className="container-fluid">Your Story</h4>
            </div>
            <div className="col-md-6">
              <span className="float-right mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-gear-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
              </span>
            </div>
          </div>

          <hr />

          <div className="container-fluid">
            <ul>
              <li className="">
                <div className="d-flex align-items-center mt-4 m-1">
                  {profileImage !== null ? (
                    <div className="author-thumbs">
                      <img src={`${host}/uploads/${profileImage}`} alt="" className="avatar " />
                    </div>
                  ) : (
                    <div className="author-thumbs">
                      <img
                        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                        className="avatar "
                      />
                    </div>
                  )}

                  <div className="mx-2">{fullName}</div>
                </div>
                <hr />
                <div className="col-12">
                  <textarea
                    name=""
                    className="form-control"
                    id=""
                    cols="10"
                    rows="10"
                    placeholder="Start Typing"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-12">
                  <label htmlFor="">Colors</label>
                  <div className="color-palette">
                    <div className="color-swatch light-blue" onClick={(e) => setColor("#3498db")}></div>
                    <div className="color-swatch red" onClick={(e) => setColor("#ff0000")}></div>
                    <div className="color-swatch green" onClick={(e) => setColor("#00ff00")}></div>
                    <div className="color-swatch blue" onClick={(e) => setColor("#0000ff")}></div>
                    <div className="color-swatch yellow" onClick={(e) => setColor("#fffb00")}></div>
                    <div className="color-swatch black" onClick={(e) => setColor("#0c0c0b")}></div>
                    <div className="color-swatch bleu" onClick={(e) => setColor("#14744f")}></div>
                    <div className="color-swatch white" onClick={(e) => setColor("#ffff")}></div>
                  </div>
                </div>

                {/* <div className="row p-2">
                  <div className="col-6 mt-4">
                    <label htmlFor="">Choose Text Position</label>
                    <div className="color-palette">
                      <select className="from-control" onChange={(e) => setPosition(e.target.value)}>
                        <option value="">Select One</option>
                        <option value="top">Top</option>
                        <option value="middle">Middle</option>
                        <option value="bottom">Bottom</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-6 mt-4">
                    <label htmlFor="">Choose Text Aligment</label>
                    <div className="color-palette">
                      <select className="from-control" onChange={(e) => setAlignment(e.target.value)}>
                        <option value="">Select One</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="center">Center</option>
                      </select>
                    </div>
                  </div>
                </div> */}

                <div className="col-12">
                  <label htmlFor="">Fonts</label>
                  <div className="color-palette">
                    <select name="" id="" onChange={(e) => setFontFamily(e.target.value)}>
                      <option value="serif">Heading</option>
                      <option value="system-ui">Casual</option>
                      <option value="cursive">Fancy</option>
                      <option value="sans-serif">Simple</option>
                      <option value="math">Clean</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <label htmlFor="">Adjust Font Size</label>
                  <input
                    type="range"
                    class="form-range"
                    min="0"
                    max="90"
                    id="customRange2"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseFloat(e.target.value))}
                  />
                </div>
                <div className="row">
                  <div className="col-5 mt-4 pr-0">
                    <button
                      onClick={() => {
                        setDiscardModal(true);
                      }}
                      className={StoryCSS.discardBtton}
                    >
                      Discard Story
                    </button>
                  </div>
                  <div className="col-7 mt-4 pl-1">
                    <button onClick={handleStory} className=" post-btton">
                      Share Story
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-9 col-lg-9 col-xl-9">
        <div className="container-fluid ">
          <div className={`${StoryCSS.storyContainer} newClass`}>
            <>
              <div className={StoryCSS.storyBox} style={{position: "relative", height: "100%", width: "100%"}}>
                <div>
                  <Cropper
                    image={storyImagePath}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    ref={imageRef}
                    aspect={3 / 4}
                  />
                  <Resizable
                    width={size.width}
                    height={size.height}
                    onResize={handleResize}
                    minConstraints={[100, 50]}
                    maxConstraints={[800, 800]}
                  >
                    <div
                      ref={SnapShotRef}
                      id="snapShotRef"
                      style={{
                        minHeight: "689px",
                        minWidth: "512px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}
                    >
                      <Draggable onDrag={handleDrag}>
                        <p
                          onWheel={handleWheel}
                          style={{
                            color,
                            fontFamily,
                            fontSize: `${fontSizes}px`,
                            position: "absolute",
                            top: position.y,
                            left: position.x,
                            cursor: "pointer",
                          }}
                        >
                          {content}
                        </p>
                      </Draggable>
                    </div>
                  </Resizable>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>

      <WarningModal isOpen={discardModal} onRequestClose={closeModal} />
    </div>
  );
}

export default ImageStory;
