import { host } from "@/environment";
import React from "react";
import Link from "next/link";
import PageHeaderProfile from "./PageHeaderProfile";
export default function PageHeader({
  pageDetails,
  handleCoverImageClick,
  handleMouseEnter,
  handleMouseLeave,
  hovered,
  handleImageChange,
  handleCoverFileChange,
}) {
  return (
    <>
      <div className="dp-cover-div">
        <div className="page-cover-div">
          <div
            className="cover-pic"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCoverImageClick}
          >
            <div
              className="cover-image"
              style={{
                backgroundImage: `url(${host}/uploads/pages/${pageDetails.cover_pic})`,
              }}
            ></div>
            {hovered && (
              <div className="cover-hover-container">
                <label
                  htmlFor="cover-image-upload"
                  className="cover-upload-icon"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-image-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                  </svg>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="page-dp-div">
          <div
            className=""
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="profile-pic-container">
              <img
                className="page-profile-pic"
                src={`${host}/uploads/pages/${pageDetails.profile_pic}`}
                alt=""
              />
              {hovered && (
                <label
                  htmlFor="profile-image-upload"
                  className="dp-upload-icon"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-image-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
                  </svg>
                </label>
              )}
              <input
                type="file"
                id="profile-image-upload"
                accept="image/*"
                onChange={handleImageChange}
              />

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
          </div>

          <div>
            <p className="text-name">
              {/* <span className='text-abc'>sadfasdfasdf</span> gaming */}
              <span className="text-abc">{pageDetails.page_name} </span>
            </p>
            <p className="text-like-follo">
              {/* <span>242 Likes</span>|  */}
              <span>{pageDetails.followerCount} Followers</span>
            </p>
          </div>
        </div>
      </div>

      <div className="dp-edit-div">
        <div className="row">
          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            {/* <h1>h</h1> */}
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 page-svg-div">
            <div className="page-chat-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chat-left"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              </svg>
            </div>
            <div className="page-chat-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-hand-thumbs-up"
                viewBox="0 0 16 16"
              >
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
              </svg>
            </div>
            <div className="page-chat-svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <button className="edit-page-btn">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="currentColor"
                  className="bi bi-pencil-square mt-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </span>
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="dp-edit-div">
        <div>
          <ul className="profile-menu ">
            <li>
              <Link
                className=""
                href={`/pagePublicView/${pageDetails.page_user_name}`}
              >
                Post
              </Link>
            </li>
            <li>
              <Link
                className=""
                href={`/pagePublicView/${pageDetails.page_user_name}/about`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className=""
                href={`/pagePublicView/${pageDetails.page_user_name}/reviews`}
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link className="" href="/">
                Mentions
              </Link>
            </li>
            <li>
              <Link
                className=""
                href={`/pagePublicView/${pageDetails.page_user_name}/followers`}
              >
                Followers
              </Link>
            </li>
            <li>
              <Link
                className=""
                href={`/pagePublicView/${pageDetails.page_user_name}/gallery`}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link className="" href="/">
                Live
              </Link>
            </li>
            <li>
              <Link className="" href="/">
                Checks-ins
              </Link>
            </li>
            <li>
              <div className="more">
                More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <ul className="more-dropdown more-with-triangle">
                  <>
                    <li>
                      <Link href={"/"}>Edit Profile</Link>
                    </li>
                    <li>
                      <Link href="#">UnLock Profile</Link>
                    </li>
                  </>

                  <li>
                    <a href="#">Block Profile</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
