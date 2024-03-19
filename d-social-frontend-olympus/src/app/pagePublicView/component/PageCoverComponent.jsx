import { host } from "@/environment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../utils/axios";
import { pageInfo } from "@/redux/features/Page/pageSlice";

export default function PageCoverComponent() {
  const pageData = useSelector(pageInfo);
  console.log(pageData, "pageDataFromPageCoverComponent");
  const [authUserId, setAuthUserId] = React.useState("");

  const handleCoverFileChange = (e) => {
    const formData = new FormData();
    formData.append("page_id", pageData?.page_id);
    formData.append("username", pageData?.page_name);
    formData.append("cover_pic", e.target.files[0]);
    axiosInstance
      .post(`/api/change-pages-cover-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res pro pic", res);
        if (res.data.status == 200) {
          localStorage.removeItem("pageInfo");
          localStorage.setItem("pageInfo", JSON.stringify(res.data.pageInfo));
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageUsername = localStorage.getItem("userId");

      if (localStorageUsername != "") {
        setAuthUserId(localStorageUsername);
      }
    }
  }, []);

  const handleCoverImageClick = (e) => {
    if (pageData.user_id == authUserId) {
      e.stopPropagation();
      const fileInput = document.getElementById("fileCoverInput");
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div className="Profi-Cov-div">
        {pageData?.coverPhoto != null ? (
          <img
            className="Profi-Cov"
            src={`${host}/uploads/pages/${pageData?.coverPhoto}`}
            alt=""
          />
        ) : (
          <img
            className="Profi-Cov"
            src={`${host}/uploads/cover_pic.png`}
            alt=""
          />
        )}
        {/* <img className='Profi-Cov' src={Cover.src} alt='' /> */}

        <form encType="multipart/form-data">
          <input
            id="fileCoverInput"
            type="file"
            name="cover_pic"
            accept="image/*"
            onChange={handleCoverFileChange}
            style={{ display: "none" }}
          />
        </form>
      </div>

      {pageData.user_id == authUserId && (
        <div
          className="Upload-Cover-photo-text-div"
          onClick={handleCoverImageClick}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 39 33"
              fill="none"
            >
              <path
                d="M14.7463 17.5558C14.7463 15.0477 16.8743 13.0146 19.4994 13.0146C22.1246 13.0146 24.2526 15.0477 24.2526 17.5558C24.2526 20.0638 22.1246 22.097 19.4994 22.097C16.8743 22.097 14.7463 20.0638 14.7463 17.5558Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.93744 6.74258C9.93744 3.23975 12.9096 0.400146 16.5759 0.400146H22.4228C26.0892 0.400146 29.0613 3.23975 29.0613 6.74258C29.0613 6.77253 29.0854 6.79746 29.1167 6.79989L33.8267 7.16535C35.9366 7.32905 37.6717 8.81966 38.0655 10.8067C39.0704 15.8773 39.1453 21.0762 38.287 26.1713L38.0815 27.3908C37.6943 29.6895 35.714 31.4383 33.2851 31.6268L29.1819 31.9451C22.7375 32.4452 16.2613 32.4452 9.81688 31.9451L5.71367 31.6268C3.28473 31.4383 1.30452 29.6895 0.917256 27.3908L0.711812 26.1713C-0.146571 21.0762 -0.0716413 15.8773 0.933258 10.8067C1.32706 8.81966 3.06221 7.32905 5.17204 7.16535L9.88213 6.79989C9.91337 6.79746 9.93744 6.77253 9.93744 6.74258ZM19.4994 9.98711C15.1243 9.98711 11.5775 13.3757 11.5775 17.5558C11.5775 21.7358 15.1243 25.1244 19.4994 25.1244C23.8746 25.1244 27.4214 21.7358 27.4214 17.5558C27.4214 13.3757 23.8746 9.98711 19.4994 9.98711Z"
                fill="white"
              />
            </svg>
          </span>
          <p>Upload Cover Photo</p>
        </div>
      )}
    </div>
  );
}
