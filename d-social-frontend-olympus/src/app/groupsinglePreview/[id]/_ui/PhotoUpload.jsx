"use client";

import React, { useRef, useState } from "react";
import "@/app/newsfeed/_ui/PhotoUpload.modules.css";
import { imageUpload } from "@/assets/MarketPlace";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addPostData, insertPostData } from "@/redux/features/GroupPost/groupPostSlice";
import PhotoUploadSvg from "@/app/newsfeed/_svg-components/photoUpload";

export default function PhotoUpload() {
  const handleTextareaResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  const addTextData = useSelector(addPostData);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const fileInputRef = useRef(null);

  const onImageChange = (event) => {
    event.preventDefault();
    const uploadedFiles = event.target.files;
    // console.log(typeof (uploadedFiles), Array.isArray(uploadedFiles), "uploadedFiles__", uploadedFiles);
    const newFilesArray = [];

    for (const i in uploadedFiles) {
      if (typeof (uploadedFiles[i]) == 'object') {
        newFilesArray.push(uploadedFiles[i]);
      }
    }

    dispatch(
      insertPostData({
        files: [...image, ...newFilesArray],
      })
    );
    setImage([...image, ...newFilesArray]);
  };

  const onIconClick = (e) => {
    // e.preventDefault();

    fileInputRef.current.click();
  };
  return (
    <div
      style={{
        maxHeight: "50vh",
        overflowY: "auto",
      }}
    >
      <textarea
        onInput={handleTextareaResize}
        name="description"
        onChange={(e) => {
          dispatch(
            insertPostData({
              [e.target.name]: e.target.value,
            })
          );
        }}
        id="photo_status"
        value={addTextData?.description}
        placeholder={`What's on your mind, ${localStorage.getItem('fullname')}?`}
      />

      {/* Image upload section */}

      <div onClick={onIconClick} style={{ cursor: "pointer" }} className="uploading__main__wrappers">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            border: "1px solid #ECF3F3",
            borderRadius: "8px",
            padding: "5px",
            minHeight: "207px",
            backgroundColor: "#EAEBED",
          }}
        >
          {addTextData?.files?.length > 0 ? (
            <div
              style={{
                position: "relative",
              }}
            >
              <div className="Add_more_video__file">
                <PhotoUploadSvg width={20} height={21} />
                <p>Add Photos/Videos</p>
              </div>
              {addTextData?.files?.map((file, index) => {
                console.log("file__", file?.type);
                return (
                  <div key={index}>
                    {file?.type?.startsWith("image/") ? (
                      <img
                        style={{
                          width: "449px",
                          height: "auto",
                        }}
                        src={URL.createObjectURL(file)}
                        alt="upload-image"
                      />
                    ) : file?.type?.startsWith("video/") ? (
                      // <video width="200" height="200" controls>
                      <video
                        style={{
                          width: "449px",
                          height: "auto",
                        }}
                        controls
                      >
                        <source src={URL.createObjectURL(file)} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                  </div>
                )
              }
              )}
            </div>
          ) : (
            <>
              <PhotoUploadSvg />
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Add Photos/Videos
                </p>
                <p
                  style={{
                    textAlign: "center",
                  }}
                >
                  or drag and drop
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
