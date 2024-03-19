import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { host } from "@/environment";
import axiosInstance from "../../../utils/axios";
import { pageInfo } from "@/redux/features/Page/pageSlice";
import useUserInfo from "@/hooks/useUserInfo";
import Link from "next/link";
import PageNavComponent from "@/app/pagePublicView/component/PageNavComponent";
import { useParams, useRouter } from "next/navigation";
import useToaster from "@/hooks/useToaster";

export default function PageHeaderProfile() {
  const router = useRouter();
  const [authUserId, setAuthUserId] = useState(0);
  const [likedUnLiked, setLikedUnLiked] = useState(0);
  const { showNotification } = useToaster();
  const pageInfoData = useSelector(pageInfo);
  console.log(pageInfoData, "pageInfoData__");
  const [pageData, setPageData] = useState({});
  console.log(pageData, "pageData__");
  const params = useParams();
  console.log(params, "params__");

  useEffect(() => {
    const formdata = { page_user_name: params.username };
    axiosInstance
      .post("/api/get-page-details", formdata)
      .then((res) => {
        if (res?.status === 200) {
          setPageData(res?.data?.pageDetails);
        }
      })
      .catch((error) => {
        if (error.response) {
          showNotification(error.response.data.message, "error");
        }
      });
  }, [pageInfoData?.page_id]);

  useEffect(() => {
    const formdata = { page_id: pageInfoData?.page_id };
    axiosInstance
      .post("/api/get-followers-by-Id", formdata)
      .then((res) => {
        if (res?.status === 200) {
          console.log(
            res?.data?.data?.like_unlike_status,
            "likedUnLiked======"
          );
          setLikedUnLiked(res?.data?.data?.like_unlike_status);
        }
      })
      .catch((error) => {
        if (error.response) {
          showNotification(error.response.data.message, "error");
        }
      });
  }, [pageInfoData?.page_id]);

  const handleImageClick = (e) => {
    if (pageInfoData.user_id == authUserId) {
      e.stopPropagation();
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.click();
      }
    }
  };
  const handleManagePage = () => {
    router.push(`/pagePublicView/${pageInfoData?.page_user_name}/settings`);
  };

  const { userInfo } = useUserInfo();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageUsername = localStorage.getItem("userId");

      if (localStorageUsername != "") {
        setAuthUserId(localStorageUsername);
      }
    }
  }, [authUserId]);

  const handleFollowPage = (page_id) => {
    const formData = {
      page_id: page_id,
      follow_unfollow_status: 0,
    };

    axiosInstance
      .post("/api/update-follow-page-status", formData)
      .then((res) => {
        if (res.data.status === 200) {
          showNotification("Follow Status Updated", "success");
          router.push("/quantumpage");
        } else {
          showNotification("There was an error", "error");
        }
      })
      .catch((error) => {
        if (error.response) {
          showNotification(error.response.data.message, "error");
        }
      });
  };

  console.log(likedUnLiked, "likedUnLiked");
  const handleLikeUnlikePage = (page_id) => {
    const formData = {
      page_id: page_id,
      like_unlike_status: likedUnLiked == 1 ? 0 : 1,
    };

    axiosInstance
      .post("/api/unlike-page", formData)
      .then((res) => {
        if (res.data.status === 200) {
          showNotification("Page Like Status Updated", "success");
        } else {
          showNotification("There was an error", "error");
        }
      })
      .catch((error) => {
        if (error.response) {
          showNotification(error.response.data.message, "error");
        }
      });
  };

  return (
    <div>
      <div className="body-part">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 ">
            <div className="prof-auth-name-img-div">
              <div className="profilesss-container">
                <div className="profile-img-div">
                  {pageInfoData?.profile != null ? (
                    <img
                      className="profile-img"
                      src={`${host}/uploads/pages/${pageInfoData?.profile}`}
                      alt=""
                    />
                  ) : (
                    <img
                      className="profile-img"
                      src={`${host}/uploads/cover_pic.png`}
                      alt=""
                    />
                  )}
                  {pageInfoData.user_id == authUserId && (
                    <div className="svg-overlay" onClick={handleImageClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <rect
                          opacity="0.7"
                          width="27.6923"
                          height="27.6923"
                          rx="7"
                          fill="#BCBCBC"
                        />
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
                  )}
                </div>
              </div>

              <div className="prof-info-texts-div">
                <div className="d-flex justify-content-center align-items-center">
                  <p className="prof-info-texts-h">{pageInfoData?.page_name}</p>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="7" cy="7.5" r="7" fill="#1B74E4" />
                    <path
                      d="M5.71715 10.3822L3.11715 7.76721C2.96095 7.61011 2.96095 7.35539 3.11715 7.19827L3.68282 6.62933C3.83903 6.47221 4.09231 6.47221 4.24851 6.62933L6 8.39087L9.75149 4.61783C9.90769 4.46072 10.161 4.46072 10.3172 4.61783L10.8828 5.18677C11.0391 5.34387 11.0391 5.59859 10.8828 5.75571L6.28284 10.3822C6.12662 10.5393 5.87336 10.5393 5.71715 10.3822Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="page-info-texts-p">
                    {"@"}
                    {pageInfoData?.page_user_name?.slice(0, 15)}
                  </span>
                  <span className="page-info-texts-p">
                    <svg
                      width="4"
                      height="4"
                      viewBox="0 0 4 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2" cy="2" r="1.5" fill="#65676B" />
                    </svg>
                  </span>
                  <span>
                    <span className=" page-info-texts-p">
                      {pageData?.likedCount} Likes
                    </span>
                  </span>
                  <span className="page-info-texts-p">
                    <svg
                      width="4"
                      height="4"
                      viewBox="0 0 4 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2" cy="2" r="1.5" fill="#65676B" />
                    </svg>
                  </span>
                  <span className="page-info-texts-p">
                    {pageData?.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
            <div className="post-follower-following-div">
              {userInfo?._id == pageInfoData?.user_id ? (
                <div className="page-btn-layout page-btn-layout-design">
                  <p
                    onClick={() => {
                      handleManagePage();
                    }}
                  >
                    Manage Page
                  </p>
                </div>
              ) : (
                <div
                  className="page-btn-layout page-btn-layout-design"
                  onClick={() => {
                    handleFollowPage(pageInfoData?.page_id);
                  }}
                >
                  <p>Unfollow</p>
                </div>
              )}
              <div
                className="page-btn-layout-second page-btn-layout-design"
                onClick={() => {
                  handleLikeUnlikePage(pageInfoData?.page_id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="34"
                  viewBox="0 0 35 34"
                  fill="none"
                >
                  <path
                    d="M27.4154 15.2292C27.4154 14.2376 26.6362 13.4584 25.6445 13.4584H20.332C20.0487 13.4584 19.057 13.0334 19.8362 11.8292C20.332 10.9084 20.332 7.43758 20.332 7.43758C20.332 6.44591 19.5529 5.66675 18.5612 5.66675C17.5695 5.66675 16.7904 6.44591 16.7904 7.43758C16.7904 12.6084 11.832 14.1667 11.832 14.1667V23.3751C14.0987 24.1542 14.6654 25.5001 17.4987 25.5001H22.8112C23.8029 25.5001 24.582 24.7209 24.582 23.7292C24.582 23.3042 24.4404 22.9501 24.2279 22.6667C25.2195 22.6667 25.9987 21.8876 25.9987 20.8959C25.9987 20.4709 25.857 20.0459 25.5737 19.6917C26.282 19.4084 26.707 18.7709 26.707 18.0626C26.707 17.6376 26.5654 17.2126 26.282 16.8584C26.9195 16.6459 27.4154 16.0084 27.4154 15.2292Z"
                    fill="#C0D6D6"
                  />
                  <path
                    d="M9.70768 12.75H6.16602V24.7917H9.70768C10.9118 24.7917 11.8327 23.8 11.8327 22.6667V14.875C11.8327 13.6708 10.9118 12.75 9.70768 12.75Z"
                    fill="#C0D6D6"
                  />
                </svg>
                {likedUnLiked == 1 ? <p>Liked</p> : <p>Like</p>}
              </div>
              {/* {pageInfoData?.user_id != authUserId ? (
                <div
                  className="page-btn-layout-second page-btn-layout-design"
                  onClick={() => {
                    handleLikeUnlikePage(pageInfoData?.page_id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="34"
                    viewBox="0 0 35 34"
                    fill="none"
                  >
                    <path
                      d="M27.4154 15.2292C27.4154 14.2376 26.6362 13.4584 25.6445 13.4584H20.332C20.0487 13.4584 19.057 13.0334 19.8362 11.8292C20.332 10.9084 20.332 7.43758 20.332 7.43758C20.332 6.44591 19.5529 5.66675 18.5612 5.66675C17.5695 5.66675 16.7904 6.44591 16.7904 7.43758C16.7904 12.6084 11.832 14.1667 11.832 14.1667V23.3751C14.0987 24.1542 14.6654 25.5001 17.4987 25.5001H22.8112C23.8029 25.5001 24.582 24.7209 24.582 23.7292C24.582 23.3042 24.4404 22.9501 24.2279 22.6667C25.2195 22.6667 25.9987 21.8876 25.9987 20.8959C25.9987 20.4709 25.857 20.0459 25.5737 19.6917C26.282 19.4084 26.707 18.7709 26.707 18.0626C26.707 17.6376 26.5654 17.2126 26.282 16.8584C26.9195 16.6459 27.4154 16.0084 27.4154 15.2292Z"
                      fill="#C0D6D6"
                    />
                    <path
                      d="M9.70768 12.75H6.16602V24.7917H9.70768C10.9118 24.7917 11.8327 23.8 11.8327 22.6667V14.875C11.8327 13.6708 10.9118 12.75 9.70768 12.75Z"
                      fill="#C0D6D6"
                    />
                  </svg>
                  <p>Like</p>
                </div>
              ) : (
                <div className="page-btn-layout-second page-btn-layout-design">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="34"
                    viewBox="0 0 35 34"
                    fill="none"
                  >
                    <path
                      d="M27.4154 15.2292C27.4154 14.2376 26.6362 13.4584 25.6445 13.4584H20.332C20.0487 13.4584 19.057 13.0334 19.8362 11.8292C20.332 10.9084 20.332 7.43758 20.332 7.43758C20.332 6.44591 19.5529 5.66675 18.5612 5.66675C17.5695 5.66675 16.7904 6.44591 16.7904 7.43758C16.7904 12.6084 11.832 14.1667 11.832 14.1667V23.3751C14.0987 24.1542 14.6654 25.5001 17.4987 25.5001H22.8112C23.8029 25.5001 24.582 24.7209 24.582 23.7292C24.582 23.3042 24.4404 22.9501 24.2279 22.6667C25.2195 22.6667 25.9987 21.8876 25.9987 20.8959C25.9987 20.4709 25.857 20.0459 25.5737 19.6917C26.282 19.4084 26.707 18.7709 26.707 18.0626C26.707 17.6376 26.5654 17.2126 26.282 16.8584C26.9195 16.6459 27.4154 16.0084 27.4154 15.2292Z"
                      fill="#C0D6D6"
                    />
                    <path
                      d="M9.70768 12.75H6.16602V24.7917H9.70768C10.9118 24.7917 11.8327 23.8 11.8327 22.6667V14.875C11.8327 13.6708 10.9118 12.75 9.70768 12.75Z"
                      fill="#C0D6D6"
                    />
                  </svg>
                  <p>Liked</p>
                </div>
              )} */}
            </div>
          </div>

          <form encType="multipart/form-data">
            <input
              id="fileInput"
              type="file"
              name="profile_pic"
              accept="image/*"
              onChange={(e) => {
                const formData = new FormData();
                formData.append("page_id", pageInfoData?.page_id);
                formData.append("profile_pic", e.target.files[0]);
                axiosInstance
                  .post(`/api/change-pages-profile-pic`, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${localStorage.getItem(
                        "refreshToken"
                      )}`,
                    },
                  })
                  .then((res) => {
                    if (res.data.status == 200) {
                      window.location.reload();
                    }
                  });
              }}
              style={{ display: "none" }}
            />
          </form>
        </div>
      </div>
      <PageNavComponent />
    </div>
  );
}
