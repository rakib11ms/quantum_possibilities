"use client";
import React, { useEffect, useState } from "react";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import Link from "next/link";

import { useParams } from "next/navigation";
import axiosInstance from "../../../../../utils/axios";
import { host } from "@/environment";
import { toast } from "react-toastify";
import ReviewModal from "@/component/Pages/Reviews/ReviewModal";
import PageReview from "@/component/Pages/PageReview";
import PageHeader from "@/component/Pages/PageHeader";
import PageGallery from "@/component/Pages/PageGallery";

import NoImage from "../../../../assets/img/no_image_available.svg";
const draftPage = () => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [userId, setUserId] = useState(null);
  const [pageDetails, setPageDetails] = useState({});
  const [lastestImage, setLastestImage] = useState([]);

  const [followerList, setFollowerList] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      const formData = new FormData();
      formData.append("profile_pic", e.target.files[0]);
      formData.append("page_id", pageDetails._id);
      axiosInstance
        .post(`/api/change-pages-profile-pic`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            toast(res.data.message, {
              type: "success",
              position: "top-right",
            });
            window.location.reload();
          }
        });
    }
  };

  const handleCoverFileChange = (e) => {
    const formData = new FormData();
    formData.append("cover_pic", e.target.files[0]);
    formData.append("page_id", pageDetails._id);
    axiosInstance
      .post(`/api/change-pages-cover-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status == 200) {
          toast(res.data.message, {
            type: "success",
            position: "top-right",
          });
          window.location.reload();
        }
      });
  };

  const handleMouseEnter = () => {
    if (userId == pageDetails.user_id) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleCoverImageClick = (e) => {
    if (userId == pageDetails.user_id) {
      e.stopPropagation(); // Stop event propagation to prevent double triggering
      const fileInput = document.getElementById("fileCoverInput");
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const locaStorageUserId = localStorage.getItem("userId");
      setUserId(locaStorageUserId);
    }

    getPageDetails();
  }, []);

  const getPageDetails = () => {
    const formData = {
      page_user_name: params.username,
    };
    axiosInstance.post("/api/get-page-details", formData).then((res) => {
      if (res.data.status == 200) {
        setPageDetails(res.data.pageDetails);
        const followerForm = {
          page_id: res.data.pageDetails._id,
        };
        axiosInstance
          .post("/api/get-all-followers", followerForm)
          .then((res) => {
            if (res.data.status == 200) {
              setFollowerList(res.data.data);
            }
          });
      }
    });
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Masterdashboardlayout>
      <div>
        <PageHeader
          pageDetails={pageDetails}
          handleCoverImageClick={handleCoverImageClick}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          hovered={hovered}
          handleImageChange={handleImageChange}
          handleCoverFileChange={handleCoverFileChange}
        />

        <div className="container-fluid">
          {userId == pageDetails.user_id ? (
            <div className=" switch-text-full-div">
              <div className="switch-text-div">
                <div className="switch-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-nintendo-switch"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.34 8.005c0-4.38.01-7.972.023-7.982C9.373.01 10.036 0 10.831 0c1.153 0 1.51.01 1.743.05 1.73.298 3.045 1.6 3.373 3.326.046.242.053.809.053 4.61 0 4.06.005 4.537-.123 4.976-.022.076-.048.15-.08.242a4.136 4.136 0 0 1-3.426 2.767c-.317.033-2.889.046-2.978.013-.05-.02-.053-.752-.053-7.979Zm4.675.269a1.621 1.621 0 0 0-1.113-1.034 1.609 1.609 0 0 0-1.938 1.073 1.9 1.9 0 0 0-.014.935 1.632 1.632 0 0 0 1.952 1.107c.51-.136.908-.504 1.11-1.028.11-.285.113-.742.003-1.053ZM3.71 3.317c-.208.04-.526.199-.695.348-.348.301-.52.729-.494 1.232.013.262.03.332.136.544.155.321.39.556.712.715.222.11.278.123.567.133.261.01.354 0 .53-.06.719-.242 1.153-.94 1.03-1.656-.142-.852-.95-1.422-1.786-1.256Z" />
                    <path d="M3.425.053a4.136 4.136 0 0 0-3.28 3.015C0 3.628-.01 3.956.005 8.3c.01 3.99.014 4.082.08 4.39.368 1.66 1.548 2.844 3.224 3.235.22.05.497.06 2.29.07 1.856.012 2.048.009 2.097-.04.05-.05.053-.69.053-7.94 0-5.374-.01-7.906-.033-7.952-.033-.06-.09-.063-2.03-.06-1.578.004-2.052.014-2.26.05Zm3 14.665-1.35-.016c-1.242-.013-1.375-.02-1.623-.083a2.81 2.81 0 0 1-2.08-2.167c-.074-.335-.074-8.579-.004-8.907a2.845 2.845 0 0 1 1.716-2.05c.438-.176.64-.196 2.058-.2l1.282-.003v13.426Z" />
                  </svg>

                  <p>
                    Switch to {pageDetails.page_name} page as admin to start
                    managing it
                  </p>
                </div>
                <Link
                  className="switch-btn"
                  href={`/manage-page/${pageDetails.page_user_name}`}
                >
                  Switch Now
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className=" ">
            <div className="row ">
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                <div className="page-sidebar-div">
                  <div className="page-sidebar-intro">
                    <h5>Intro</h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="gray"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="page-bio">{pageDetails.bio}</p>
                  </div>
                </div>
                <div className="page-sidebar-div">
                  <ul>
                    <li className="page-li-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-info-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                      <strong>Page:</strong> {pageDetails.category}
                    </li>
                    <li className="page-li-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-geo-alt-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                      </svg>
                      {pageDetails.address + ", " + pageDetails.city}
                    </li>
                    <li className="page-li-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-telephone-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                        />
                      </svg>
                      {pageDetails.phone_number}
                    </li>
                    <li className="page-li-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-envelope-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                      </svg>
                      {pageDetails.email}
                    </li>
                    <li className="page-li-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      Not yet rated
                    </li>
                    <li className="page-li-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-symmetry-horizontal"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.5 7a.5.5 0 0 0 .24-.939l-11-6A.5.5 0 0 0 2 .5v6a.5.5 0 0 0 .5.5h11zm.485 2.376a.5.5 0 0 1-.246.563l-11 6A.5.5 0 0 1 2 15.5v-6a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .485.376zM11.539 10H3v4.658L11.54 10z" />
                      </svg>
                      Offers free stickers
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                <div className="">
                  <div className=" setting-about-div container-fluid">
                    <div className="row container-fluid bg-white ">
                      {followerList.length > 0 ? (
                        followerList.map((item) => (
                          <div className="col col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12">
                            <div
                              className="ui-block"
                              style={{ marginTop: "10px" }}
                            >
                              <div className="friend-item ">
                                <div className="friend-header-thumb">
                                  <img
                                    src={
                                      item.user_id?.profile_pic == "" ||
                                      item.user_id?.profile_pic == null
                                        ? NoImage.src
                                        : `${host}/uploads/${item.user_id?.profile_pic}`
                                    }
                                    alt="author"
                                  />
                                </div>
                                <div className="friend-item-content">
                                  <div className="more">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="black"
                                      class="bi bi-three-dots-vertical"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                    <ul className="more-dropdown">
                                      <li>
                                        {/* <a href="javascript:void(0)" onClick={(e) => {
                                                                                        unFollowUser(item._id);
                                                                                    }}>Cancel Follow</a> */}
                                        Find Support
                                      </li>
                                    </ul>
                                  </div>

                                  <div
                                    className="swiper-container mt-2"
                                    data-slide="fade"
                                  >
                                    <div
                                      className="swiper-container"
                                      data-slide="fade"
                                    >
                                      <div className="author-content">
                                        <Link
                                          href={`/profile/${item.user_id?.username}`}
                                          className="h5 author-name"
                                        >
                                          {" "}
                                          {item.user_id?.first_name +
                                            " " +
                                            item.user_id?.last_name}
                                        </Link>
                                        <div className="country">
                                          @{item.user_id?.username}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>No Follower Found</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal
        isOpen={modal}
        onRequestClose={closeModal}
        // username={userName}
        page_id={pageDetails._id}
        pageDetails={pageDetails}
        getPageDetails={getPageDetails}
        type={type}
      />
    </Masterdashboardlayout>
  );
};

export default draftPage;
