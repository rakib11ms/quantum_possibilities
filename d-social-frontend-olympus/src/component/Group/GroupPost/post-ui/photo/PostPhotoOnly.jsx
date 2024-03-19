import {host} from "@/environment";
import React from "react";
import PlusIcon from "./PlusIcon";

export default function PostPhotoOnly({postInformation, setPostState, setSelectedImageIndex}) {
   const allImgageType = ["jpg", "jpeg", "jfif", "pjpeg", "pjp", "gif", "png", "svg", "bmp"];
   const allVideoType = ["ogg", "webm", "mp4", "avi", "mov", "wmv", "mkv"];
   let renderMedia = [];
   if (postInformation?.media.length >= 5) {
      renderMedia = postInformation?.media.slice(0, 4);
   }
   return (
      <div>
         <div className="rows_wrap">
            {postInformation.media.length > 1 ? (
               <div>
                  {postInformation.media.length === 2 ? (
                     <div
                        style={{
                           display: "flex",
                           gap: "10px",
                        }}
                     >
                        {postInformation?.media?.map((media, index) => {
                           const fileType = media.media.split(".").pop().toLowerCase();

                           if (allImgageType.includes(fileType)) {
                              return (
                                 <img
                                    onClick={() => {
                                       setPostState((prev) => ({
                                          sharedPost: {
                                             post_id: postInformation.post_id,
                                             isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                          },
                                       }));

                                       setSelectedImageIndex(index);
                                    }}
                                    style={{
                                       width: "50%",
                                       height: "350px",
                                       objectFit: "cover",
                                       objectPosition: "top",
                                       cursor: "pointer",
                                    }}
                                    key={index}
                                    src={`${host}/uploads/groupPost/${media.media}`}
                                    className="post-photo"
                                    alt={media.caption}
                                 />
                              );
                           } else if (allVideoType.includes(fileType)) {
                              return (
                                 <video
                                    onClick={() => {
                                       setPostState((prev) => ({
                                          sharedPost: {
                                             post_id: postInformation.post_id,
                                             isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                          },
                                       }));

                                       setSelectedImageIndex(index);
                                    }}
                                    style={{
                                       width: "50%",
                                       height: "350px",
                                       objectPosition: "top",
                                       cursor: "pointer",
                                    }}
                                    key={index}
                                    controls
                                 >
                                    <source src={`${host}/uploads/groupPost/${media.media}`} type={`video/${fileType}`} />
                                    Your browser does not support the video tag.
                                 </video>
                              );
                           }
                        })}
                     </div>
                  ) : postInformation.media.length === 3 ? (
                     <div>
                        {postInformation?.media?.map((media, index) => {
                           const fileType = media.media.split(".").pop().toLowerCase();
                           if (allImgageType.includes(fileType)) {
                              return (
                                 <img
                                    onClick={() => {
                                       setPostState((prev) => ({
                                          sharedPost: {
                                             post_id: postInformation.post_id,
                                             isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                          },
                                       }));

                                       setSelectedImageIndex(index);
                                    }}
                                    style={{
                                       width: index === 0 ? "100%" : "50%", // Set full width for the first image
                                       height: "350px",
                                       objectFit: "cover",
                                       objectPosition: "top",
                                       cursor: "pointer",
                                    }}
                                    key={index}
                                    src={`${host}/uploads/groupPost/${media.media}`}
                                    className="post-photo"
                                    alt={media.caption}
                                 />
                              );
                           } else if (allVideoType.includes(fileType)) {
                              return (
                                 <video
                                    onClick={() => {
                                       setPostState((prev) => ({
                                          sharedPost: {
                                             post_id: postInformation.post_id,
                                             isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                          },
                                       }));

                                       setSelectedImageIndex(index);
                                    }}
                                    style={{
                                       width: index === 0 ? "100%" : "50%", // Set full width for the first image
                                       height: "350px",
                                       objectFit: "cover",
                                       objectPosition: "top",
                                       cursor: "pointer",
                                    }}
                                    key={index}
                                    controls
                                 >
                                    <source src={`${host}/uploads/groupPost/${media.media}`} type={`video/${fileType}`} />
                                    Your browser does not support the video tag.
                                 </video>
                              );
                           }
                        })}
                     </div>
                  ) : postInformation.media.length === 4 ? (
                     <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5px"}}>
                        {postInformation?.media?.map((media, index) => {
                           const fileType = media.media.split(".").pop().toLowerCase();
                           if (allImgageType.includes(fileType)) {
                              return (
                                 <img
                                    onClick={() => {
                                       setPostState((prev) => ({
                                          sharedPost: {
                                             post_id: postInformation.post_id,
                                             isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                          },
                                       }));

                                       setSelectedImageIndex(index);
                                    }}
                                    style={{
                                       width: postInformation.media.length === 4 ? "49%" : "100%",
                                       height: "350px",
                                       objectFit: "cover",
                                       objectPosition: "top",
                                       cursor: "pointer",
                                    }}
                                    key={index}
                                    src={`${host}/uploads/posts/${media.media}`}
                                    className="post-photo"
                                    alt={media.caption}
                                 />
                              );
                           } else if (allVideoType.includes(fileType)) {
                              return (
                                 <video
                                    onClick={() => {
                                       setPostState((prev) => ({
                                          sharedPost: {
                                             post_id: postInformation.post_id,
                                             isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                          },
                                       }));

                                       setSelectedImageIndex(index);
                                    }}
                                    style={{
                                       width: postInformation.media.length === 4 ? "49%" : "100%",
                                       height: "350px",
                                       objectPosition: "top",
                                       cursor: "pointer",
                                    }}
                                    key={index}
                                    controls
                                 >
                                    <source src={`${host}/uploads/groupPost/${media.media}`} type={`video/${fileType}`} />
                                    Your browser does not support the video tag.
                                 </video>
                              );
                           }
                        })}
                     </div>
                  ) : postInformation.media.length >= 5 ? (
                     <div
                        style={{
                           position: "relative",
                        }}
                     >
                        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5px"}}>
                           {renderMedia?.map((media, index) => {
                              const fileType = media.media.split(".").pop().toLowerCase();
                              if (allImgageType.includes(fileType)) {
                                 return (
                                    <img
                                       onClick={() => {
                                          setPostState((prev) => ({
                                             sharedPost: {
                                                post_id: postInformation.post_id,
                                                isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                             },
                                          }));

                                          setSelectedImageIndex(index);
                                       }}
                                       style={{
                                          width: postInformation.media.length >= 5 ? "49%" : "100%",
                                          height: "350px",
                                          objectFit: "cover",
                                          objectPosition: "top",
                                          cursor: "pointer",
                                       }}
                                       key={index}
                                       src={`${host}/uploads/posts/${media.media}`}
                                       className="post-photo"
                                       alt={media.caption}
                                    />
                                 );
                              } else if (allVideoType.includes(fileType)) {
                                 return (
                                    <video
                                       onClick={() => {
                                          setPostState((prev) => ({
                                             sharedPost: {
                                                post_id: postInformation.post_id,
                                                isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                             },
                                          }));

                                          setSelectedImageIndex(index);
                                       }}
                                       style={{
                                          width: postInformation.media.length >= 5 ? "49%" : "100%",
                                          height: "350px",
                                          objectPosition: "top",
                                          cursor: "pointer",
                                       }}
                                       key={index}
                                       controls
                                    >
                                       <source
                                          src={`${host}/uploads/groupPost/${media.media}`}
                                          type={`video/${fileType}`}
                                       />
                                       Your browser does not support the video tag.
                                    </video>
                                 );
                              }
                           })}
                        </div>

                        <div
                           onClick={() => {
                              setPostState((prev) => ({
                                 sharedPost: {
                                    post_id: postInformation.post_id,
                                    isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                 },
                              }));

                              setSelectedImageIndex(3);
                           }}
                           style={{
                              position: "absolute",
                              bottom: 0,
                              right: 4,
                              backgroundColor: "#0000003a",
                              width: "49%",
                              height: "350px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                           }}
                        >
                           <div
                              style={{
                                 fontSize: "45px",
                                 color: "#ffffff",
                                 display: "flex",
                                 alignItems: "center",
                                 gap: "10px",
                              }}
                           >
                              <p>{postInformation.media.length - 4}</p>
                              <PlusIcon />
                           </div>
                        </div>
                     </div>
                  ) : null}
               </div>
            ) : (
               postInformation.media.map((media, index) => {
                  const fileType = media.media.split(".").pop().toLowerCase();

                  return (
                     <div
                        style={{
                           cursor: "pointer",
                        }}
                        className="single__img"
                        key={index}
                     >
                        {allImgageType.includes(fileType) && (
                           <img
                              onClick={() => {
                                 setPostState((prev) => ({
                                    sharedPost: {
                                       post_id: postInformation.post_id,
                                       isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                    },
                                 }));

                                 setSelectedImageIndex(index);
                              }}
                              src={`${host}/uploads/groupPost/${media.media}`}
                              className="post-photo"
                              alt={media.caption}
                           />
                        )}

                        {allVideoType.includes(fileType) && (
                           <video
                              onClick={() => {
                                 setPostState((prev) => ({
                                    sharedPost: {
                                       post_id: postInformation.post_id,
                                       isPostModalOpen: !prev?.sharedPost.isPostModalOpen,
                                    },
                                 }));

                                 setSelectedImageIndex(index);
                              }}
                              style={{
                                 maxWidth: "auto",
                                 height: "450px",
                                 objectPosition: "top",
                                 cursor: "pointer",
                              }}
                              key={index}
                              controls
                           >
                              <source src={`${host}/uploads/groupPost/${media.media}`} type={`video/${fileType}`} />
                              Your browser does not support the video tag.
                           </video>
                        )}
                     </div>
                  );
               })
            )}
         </div>
      </div>
   );
}
