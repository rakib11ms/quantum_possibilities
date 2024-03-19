"use client";

import React, { useEffect, useRef, useState } from "react";
import "./PhotoUpload.modules.css";
import { imageUpload } from "@/assets/MarketPlace";
import Image from "next/image";
import PhotoUploadSvg from "../_svg-components/photoUpload";
import { useDispatch } from "react-redux";
import { addPostData, insertPostData, setLocalPostInfo } from "@/redux/features/NewsFeed/newsFeedSlice";
import useUserInfo from "@/hooks/useUserInfo";
import { isImage, isVideo } from "@/utils/utlity";
import { host } from "@/environment";
import { useSelector } from "react-redux";

export default function PhotoUpload({ postData = {} }) {

  const { userInfo } = useUserInfo()
  const handleTextareaResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [removeableImage, setRemoveableImage] = useState([]);
  const addTextData = useSelector(addPostData);
  
  const fileInputRef = useRef(null);

  const onImageChange = (event) => {
    event.preventDefault();
    const uploadedFiles = event.target.files;
    const newFilesArray = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      newFilesArray.push(file);
    }

    dispatch(
      insertPostData({
        files: [...image, ...newFilesArray],
      })
    );
    setImage([...image, ...newFilesArray]);
  };

  const onIconClick = (e) => {
    fileInputRef.current.click();
  };
  console.log("image__", image);

  useEffect(() => {
    if (postData?.media) {
      setRemoveableImage(postData?.media)
    }

  }, [postData])

  

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
        defaultValue={postData?.description || addTextData?.description || ""}
        onChange={(e) => {
          dispatch(
            insertPostData({
              [e.target.name]: e.target.value,
            })
          );
        }}
        id="photo_status"
        placeholder={`What's on your mind, ${userInfo?.first_name}?`}
      />

      {/* Image upload section */}

      <div className="uploading__main__wrappers">
        <input type="file" multiple ref={fileInputRef} onChange={onImageChange} accept="/*" style={{ display: "none" }} />

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
          {image.length > 0 || removeableImage ? (
            <div
              style={{
                // position: "relative",
              }}

            >
              <div className="Add_more_video__file" onClick={onIconClick} style={{ cursor: 'pointer', position: 'relative', width: 'fit-content', marginBottom: "20px" }}>
                <PhotoUploadSvg width={20} height={21} />
                <p>Add Photos/Videos</p>
              </div>

              <div >
                {
                  removeableImage?.map((file, index) => (
                    <div key={index} style={{
                      // border: '1px solid blue',
                      position: 'relative'
                    }}>
                      <span style={{ position: 'absolute', top: 4, right: 4, cursor: 'pointer', zIndex: 1 }} onClick={() => {
                        setRemoveableImage(p => p.filter((i) => i !== file))
                        const removable_file_ids = postData?.media?.filter(i => i == file)?.map(j => j?._id)
                        // console.log(postData?.media?.map(j => j?._id),"removable_file_ids__",removable_file_ids);
                        dispatch(
                          insertPostData({
                            removable_file_ids: [...addTextData.removable_file_ids, ...removable_file_ids],
                          })
                        );
                      }}>
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="19" cy="19" r="14.25" fill="#7E869E" fill-opacity="0.25" />
                          <path d="M25.3337 12.6667L12.667 25.3334" stroke="#222222" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round" />
                          <path d="M12.6663 12.6667L25.333 25.3334" stroke="#222222" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round" />
                        </svg>
                      </span>

                      {isImage(file.media) && (
                        <img
                          style={{
                            width: "449px",
                            height: "auto",
                            cursor: 'pointer'
                          }}
                          src={`${host}/uploads/posts/${file?.media}`}
                          alt="upload-image"
                        />
                      )}
                      {isVideo(file.media) && (
                        // <video width="200" height="200" controls>
                        <video
                          style={{
                            width: "449px",
                            height: "auto",
                          }}
                          controls
                        >
                          <source src={`${host}/uploads/posts/${file?.media}`} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))
                }
                {image.map((file, index) => (
                  <div key={index} style={{
                    // border: '1px solid blue',
                    position: 'relative'
                  }}>
                    <span style={{ position: 'absolute', top: 4, right: 4, cursor: 'pointer', zIndex: 1 }} onClick={() => {
                      setImage(p => p.filter((i) => i !== file))
                    }}>
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="19" cy="19" r="14.25" fill="#7E869E" fill-opacity="0.25" />
                        <path d="M25.3337 12.6667L12.667 25.3334" stroke="#222222" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round" />
                        <path d="M12.6663 12.6667L25.333 25.3334" stroke="#222222" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round" />
                      </svg>
                    </span>

                    {file.type.startsWith("image/") ? (
                      <img
                        style={{
                          width: "449px",
                          height: "auto",
                          cursor: 'pointer'
                        }}
                        src={URL.createObjectURL(file)}
                        alt="upload-image"
                      />
                    ) : file.type.startsWith("video/") ? (
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
                ))}
              </div>

            </div>
          ) : (
            <div onClick={onIconClick} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
              <PhotoUploadSvg />
              <div >
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
