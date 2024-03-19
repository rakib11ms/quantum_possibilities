import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userInfo } from "@/redux/features/Profile/profileSlice";
import { host } from "@/environment";
import axiosInstance from "../../../../utils/axios";
import "./ProfileComponent.css";
import AddFriendIcon from "./_ui/Icons/AddFriendIcon";
import MessageIcon from "./_ui/Icons/MessageIcon";
import DownArrowIcon from "./_ui/Icons/DownArrowIcon";
import BlackAddFriendIcon from "./_ui/Icons/BlackAddFriendIcon";
import { useParams } from "next/navigation";
import MessengerPopupFixedMessage from "@/component/AllMessengers/MessengerPopupFixedMessage";
import { AutoCompleteWrapper } from "@/component/Reuseable";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useToaster from "@/hooks/useToaster";

export default function ProfileComponent() {
   const params = useParams();
   const userInfoData = useSelector(userInfo);
   const [authUserName, setAuthUserName] = React.useState("");
   const [friendRequestStatus, setFriendRequestStatus] = React.useState("");
   const [messageReceiverId, setMessageReceiverId] = React.useState("");
   const [secondMessageReceiverId, setSecondMessageReceiverId] = React.useState("");

   const handleImageClick = (e) => {
      if (userInfoData.username == authUserName) {
         e.stopPropagation(); // Stop event propagation to prevent double triggering
         const fileInput = document.getElementById("fileInput");
         if (fileInput) {
            fileInput.click();
         }
      }
   };
   console.log(userInfoData._id, "receiver");
   useEffect(() => {
      if (typeof window !== "undefined") {
         const localStorageUsername = localStorage.getItem("username");

         if (params.username == localStorageUsername) {
            const userData = {
               id: userInfoData._id,
            };
            axiosInstance.post("/api/is-request-or-friend", userData).then((res) => {
               if (res.data.status == 200) {
                  setFriendRequestStatus(res.data.results);
               }
            });
         }

         if (localStorageUsername != "") {
            setAuthUserName(localStorageUsername);
         }
      }
   }, []);

   console.log("userInfoData__", userInfoData._id);
   return (
      <>
         <div>
            <div className="body-part">
               <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                     <div className="prof-auth-name-img-div">
                        <div className="profilesss-container">
                           <div className="profile-img-div">
                              {userInfoData.profile != null ? (
                                 <img className="profile-img" src={`${host}/uploads/${userInfoData.profile}`} alt="" />
                              ) : (
                                 <img className="profile-img" src={`${host}/uploads/noimg.jpg`} alt="" />
                              )}
                              {/* <img
                                        className='profile-img'
                                        src={ProfileAuthor.src}
                                        alt=''
                                    /> */}

                              <div className="svg-overlay" onClick={handleImageClick}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <rect opacity="0.7" width="27.6923" height="27.6923" rx="7" fill="#BCBCBC" />
                                    <path
                                       d="M11.5366 13.8732C11.5366 12.6547 12.5705 11.6669 13.8458 11.6669C15.1212 11.6669 16.1551 12.6547 16.1551 13.8732C16.1551 15.0916 15.1212 16.0794 13.8458 16.0794C12.5705 16.0794 11.5366 15.0916 11.5366 13.8732Z"
                                       fill="black"
                                    />
                                    <path
                                       fill-rule="evenodd"
                                       clip-rule="evenodd"
                                       d="M9.20033 8.61979C9.20033 6.91802 10.6443 5.53845 12.4255 5.53845H15.2661C17.0473 5.53845 18.4913 6.91802 18.4913 8.61979C18.4913 8.63435 18.503 8.64646 18.5182 8.64764L20.8065 8.82519C21.8315 8.90472 22.6745 9.6289 22.8658 10.5943C23.354 13.0577 23.3904 15.5835 22.9734 18.0589L22.8736 18.6513C22.6854 19.7681 21.7234 20.6177 20.5433 20.7093L18.5499 20.8639C15.419 21.1069 12.2726 21.1069 9.14175 20.8639L7.14829 20.7093C5.96824 20.6177 5.00619 19.7681 4.81805 18.6513L4.71824 18.0589C4.30121 15.5835 4.33761 13.0577 4.82582 10.5943C5.01714 9.6289 5.86013 8.90472 6.88515 8.82519L9.17345 8.64764C9.18863 8.64646 9.20033 8.63435 9.20033 8.61979ZM13.8458 10.1961C11.7202 10.1961 9.99711 11.8424 9.99711 13.8732C9.99711 15.904 11.7202 17.5502 13.8458 17.5502C15.9714 17.5502 17.6946 15.904 17.6946 13.8732C17.6946 11.8424 15.9714 10.1961 13.8458 10.1961Z"
                                       fill="black"
                                    />
                                 </svg>
                              </div>
                           </div>
                        </div>

                        <div className="prof-info-texts-div">
                           <h3 className="prof-info-texts-h">{userInfoData?.fullname ? userInfoData.fullname : " "} </h3>
                           <p className="prof-info-texts-p">{userInfoData.bio}</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                     {params.username == authUserName ? (
                        <div className="post-follower-following-div">
                           <div>
                              <p> {userInfoData.postsCount}</p>
                              <p>Posts</p>
                           </div>
                           <div>
                              <p> {userInfoData.followersCount}</p>
                              <p>Followers</p>
                           </div>
                           <div>
                              <p> {userInfoData.followingCount}</p>
                              <p>Following</p>
                           </div>
                        </div>
                     ) : (
                        <div className="tas_post_follower_following_container">
                           {friendRequestStatus == 1 ? (
                              <button title="add_friend" className="tas_post_follower_following_add_friend_btn">
                                 <AddFriendIcon />
                                 <p>Add Friend</p>
                              </button>
                           ) : (
                              <button title="add_friend" className="tas_post_follower_following_add_friend_btn">
                                 <AddFriendIcon />
                                 <p>Friends</p>
                              </button>
                           )}

                           <button
                              title="Messenger"
                              onClick={() => {
                                 setMessageReceiverId(userInfoData._id), setSecondMessageReceiverId(userInfoData._id);
                              }}
                              className="tas_post_follower_following_message_btn"
                           >
                              <MessageIcon />
                              <p>Message</p>
                           </button>
                           {/* <button title='Arrow Icon' className='tas_post_follower_following_dropdown_btn' > */}
                           {/* <AutoCompleteWrapper
                                                options={['Block']}
                                                // value={post_pricay_optionlist.find(i => i.value == values?.who_can_see)}
                                                required={true} // should change to true
                                                // disableClearable={true}
                                                handleChange={(e, v) => {
                                                    setFieldValue('who_can_see', v?.value)
                                                }}
                                                InputProps={(rnParams) => (
                                                    <DownArrowIcon />  
                                                )}
                                            /> */}
                           <Actions />

                           {/* </button> */}
                        </div>
                     )}
                  </div>

                  {/* <div className="prof-info-texts-div">
                     <h3 className="prof-info-texts-h">{userInfoData?.fullname ? userInfoData.fullname : " "} </h3>
                     <p className="prof-info-texts-p">{userInfoData.bio}</p>
                  </div> */}
               </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
               {params.username == authUserName ? (
                  <></>
               ) : (
                  <div className="tas_post_follower_following_container">
                     {friendRequestStatus == 1 ? (
                        <button title="add_friend" className="tas_post_follower_following_add_friend_btn">
                           <AddFriendIcon />
                           <p>Add Friend</p>
                        </button>
                     ) : // <button title="add_friend" className="tas_post_follower_following_add_friend_btn">
                     //    <AddFriendIcon />
                     //    <p>Friends</p>
                     // </button>
                     null}

                     {/* <button
                        title="Messenger"
                        onClick={() => {
                           setMessageReceiverId(userInfoData._id), setSecondMessageReceiverId(userInfoData._id);
                        }}
                        className="tas_post_follower_following_message_btn"
                     >
                        <MessageIcon />
                        <p>Message</p>
                     </button>
                     <button title="Arrow Icon" className="tas_post_follower_following_dropdown_btn">
                        <DownArrowIcon />
                     </button> */}
                  </div>
               )}
            </div>

            <form encType="multipart/form-data">
               <input
                  id="fileInput"
                  type="file"
                  name="profile_pic"
                  accept="image/*"
                  onChange={(e) => {
                     const formData = new FormData();
                     formData.append("profile_pic", e.target.files[0]);
                     axiosInstance
                        .post(`/api/change-only-profile-pic`, formData, {
                           headers: {
                              "Content-Type": "multipart/form-data",
                              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                           },
                        })
                        .then((res) => {
                           // setprofileImage(res.data.user_info.profile_pic);
                           if (res.data.status == 200) {
                              localStorage.removeItem("userInfo");
                              localStorage.setItem("userInfo", JSON.stringify(res.data.user_info));
                              // router.refresh();

                              window.location.reload();
                           }
                        });
                  }}
                  // onChange={handleFileChange}
                  style={{ display: "none" }}
               />
            </form>
         </div>

         <MessengerPopupFixedMessage messageReceiverId={messageReceiverId} setMessageReceiverId={setMessageReceiverId} secondMessageReceiverId={secondMessageReceiverId} />
      </>
   );
}

function Actions() {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const { showNotification } = useToaster();
   const [modalOpen, setModalOpen] = useState(false);
   const userInfoData = useSelector(userInfo);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setModalOpen(false);
   };

   const handleEdit = () => {
      setModalOpen(true);
      setAnchorEl(null);
   };

   const handleStatusChange = () => {
      axiosInstance
         .post(`/api/settings-privacy/block-user/${userInfoData?._id}`)
         .then((res) => {
            if (res.data.status == 200) {
               showNotification(res.data.message, "success");
               handleClose();
            }
         })
         .catch((err) => {
            console.log(err);
            showNotification("User block failed", "error");
         });
   };

   return (
      <div>
         <button onClick={handleClick} title="Arrow Icon" className="tas_post_follower_following_dropdown_btn">
            <DownArrowIcon />
         </button>
         <Menu
            id="long-menu"
            MenuListProps={{
               "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
               style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
               },
            }}
         >
            <MenuItem onClick={handleEdit}>Block</MenuItem>
         </Menu>

         <Dialog fullWidth maxWidth="xs" open={modalOpen} onClose={handleClose}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
               Do You really Want to Block this person ?
            </DialogTitle>

            <DialogActions>
               <div className="single-frend-rqest-btn-div pt-4">
                  <button
                     className="single-delete-btn"
                     onClick={() => {
                        handleClose();
                     }}
                  >
                     Cancel
                  </button>
                  <button
                     className="single-conferm-btn"
                     onClick={() => {
                        handleStatusChange();
                     }}
                  >
                     Confirm
                  </button>
               </div>
            </DialogActions>
         </Dialog>
      </div>
   );
}
