"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React, { useEffect, useState } from "react";
import StoryCSS from "./stories.module.css";
import Image from "next/image";
import { host } from "@/environment";
import Link from "next/link";
import ImageStory from "@/component/Story/ImageStory";
import CrossIcon from "../showstory/_ui/svg-components/CrossIcon";
import { useRouter } from "next/navigation";

const Page = () => {
   const [activeDiv, setActiveDiv] = useState(1);
   const [profileImage, setprofileImage] = useState("");
   const [fullName, setFullName] = React.useState("");
   const [imagePreview, setImagePreview] = React.useState(0);
   const [files, setFiles] = useState([]);

   const handleTextClick = (divId) => {
      setActiveDiv(divId);
   };
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

   const handleImageClick = (e) => {
      e.stopPropagation(); // Stop event propagation to prevent double triggering
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
         fileInput.click();
      }
   };

   const handleFileUpload = (e) => {
      const uploadedFiles = e.target.files;
      const newFilesArray = [];

      for (let i = 0; i < uploadedFiles.length; i++) {
         const file = uploadedFiles[i];
         newFilesArray.push(file);
      }
      setImagePreview(1);
      setFiles([...files, ...newFilesArray]);
   };

   const router = useRouter();

   return (
      <div>
         <Masterdashboardlayout>
            {imagePreview === 0 && (
               <div>
                  <div className="row">
                     <div className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                        <div className={StoryCSS.profSideBar}>
                           <div
                              style={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 width: "100%",
                                 gap: "12px",
                                 padding: "12px",
                              }}
                              className=""
                           >
                              <div
                                 style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    gap: "12px",
                                 }}
                              >
                                 <CrossIcon onClick={() => router.push("/newsfeed")} />
                                 <h4
                                    style={{
                                       padding: "0px",
                                       margin: "0px",
                                    }}
                                 >
                                    Your Story
                                 </h4>
                              </div>
                              <span className="float-right mr-3">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                 </svg>
                              </span>
                           </div>
                           <hr />

                           <div className="container-fluid">
                              <ul>
                                 <li onClick={() => handleTextClick(1)} className="">
                                    <div className="d-flex align-items-center mt-4 m-1">
                                       {profileImage !== null ? (
                                          <div className="author-thumbs">
                                             <img src={`${host}/uploads/${profileImage}`} alt="" className="avatar " />
                                          </div>
                                       ) : (
                                          <div className="author-thumbs">
                                             <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" className="avatar " />
                                          </div>
                                       )}

                                       <div className="mx-2">{fullName}</div>
                                    </div>
                                 </li>
                              </ul>
                           </div>
                           <hr />
                        </div>
                     </div>

                     <div className="col-12 col-sm-6 col-md-9 col-lg-9 col-xl-9">
                        <div className="container-fluid ">
                           <div className={StoryCSS.storyContainer}>
                              <div className={StoryCSS.storyBox} style={{ cursor: "pointer" }} onClick={handleImageClick}>
                                 <Link href="#" className="text-white text-center">
                                    <span className={StoryCSS.stroyIconSpan}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0b3243" class="bi bi-file-earmark-image-fill mt-3" viewBox="0 0 16 16">
                                          <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                                          <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z" />
                                       </svg>
                                    </span>
                                    <p>Create a Photo Story</p>
                                 </Link>
                              </div>
                              <div className={StoryCSS.storyBox2}>
                                 <Link href="/stories/textstory" style={{ cursor: "pointer" }} className="text-white text-center ">
                                    <span className={StoryCSS.stroyIconSpan}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0b3243" class="bi bi-file-earmark-font-fill mt-3" viewBox="0 0 16 16">
                                          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.057 6h5.886L11 8h-.5c-.18-1.096-.356-1.192-1.694-1.235l-.298-.01v5.09c0 .47.1.582.903.655v.5H6.59v-.5c.799-.073.898-.184.898-.654V6.755l-.293.01C5.856 6.808 5.68 6.905 5.5 8H5l.057-2z" />
                                       </svg>
                                    </span>
                                    <p>Create a text Story</p>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <form encType="multipart/form-data">
                     <input id="fileInput" type="file" name="profile_pic" accept="image/*" onChange={handleFileUpload} />
                  </form>
               </div>
            )}
            {imagePreview === 1 && <ImageStory files={files} />}
         </Masterdashboardlayout>
      </div>
   );
};

export default Page;
