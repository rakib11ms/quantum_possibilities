import Link from "next/link";
import React, { useState, useEffect } from "react";
import companyName from "../../../public/company_name.jpg";
import Image from "next/image";
import DisCard from "../../../public/disCard.png";
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import { toast } from "react-toastify";

const Invite = () => {
  const [invitedPageList, setInvitedPageList] = useState([]);
  const [pageList, setPageList] = useState([]);
  const [buttonStates, setButtonStates] = useState([]);

  const [settingModal, setSettingModal] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(false);
  useEffect(() => {
    getInvitedPage();
    getALlPages();
  }, []);

  const getInvitedPage = () => {
    axiosInstance.post("/api/invited-page").then((res) => {
      if (res.data.status == 200) setInvitedPageList(res.data.result);
    });
  };

  const isLoadingEnable = (index) => {
    const updatedButtonStates = [...buttonStates];
    updatedButtonStates[index].isLoading = true;
    setButtonStates(updatedButtonStates);
    setTimeout(() => {}, 3000);
  };

  const handleFollowPage = (page_id, index) => {
    const updatedButtonStates = [...buttonStates];

    const formData = {
      page_id: page_id,
      follow_unfollow_status: 1,
    };

    axiosInstance
      .post("/api/follow-page", formData)
      .then((res) => {
        if (res.data.status === 200) {
          updatedButtonStates[index].buttonText = "Followed";
          toast.success(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });
        }

        updatedButtonStates[index].isLoading = false;

        setButtonStates(updatedButtonStates);
      })
      .catch((error) => {
        updatedButtonStates[index].isLoading = false;
        toast.error("An error occurred while processing your request", {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });
        setButtonStates(updatedButtonStates);
        getInvitedPage();
      });
  };

  const getALlPages = () => {
    axiosInstance.get("/api/get-all-pages").then((res) => {
      if (res.data.status == 200) {
        setPageList(res.data.data);
        const initialButtonStates = res.data.data.map(() => ({
          buttonText: "Follow",
          isLoading: false,
        }));

        setButtonStates(initialButtonStates);
      }
    });
  };

  const handleAcceptRequest = (invitation_id, page_id) => {
    const formData = {
      invitation_id: invitation_id,
      page_id: page_id,
    };
    axiosInstance.post("/api/accept-invitation", formData).then((res) => {
      if (res.data.status == 200) {
        toast.success(res.data.message, {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });
      }
    });
  };

  return (
    <div>
      <h4 className="page-header-text">Invites</h4>
      <p>Page & Profile invites</p>
      <hr />

      <div>
        <div className="followed-pages-div">
          {invitedPageList.map((item, index) => (
            <div className="followed-text-img">
              <div className="follo-pag-logo-div">
                <img
                  className="follo-pag-logo"
                  src={`${host}/uploads/pages/${item.page_id?.profile_pic}`}
                  alt="File Upload"
                  width={0}
                  height={0}
                />

                <div className="follo-pag-text">
                  <h5>{item.page_id?.page_name}</h5>
                  <span className="followed-heade-text">
                    {item.page_id?.category}
                  </span>
                  <p> {item.page_id?.bio}</p>
                  <p className="followed-heade-text">
                    {item.created_by?.first_name} {item.created_by?.last_name}{" "}
                    invited you
                  </p>
                </div>
              </div>

              <div className="btn-dots-div">
                <button
                  className="btn-dots"
                  onClick={(e) => {
                    handleAcceptRequest(item._id, item.page_id, 1);
                  }}
                >
                  Accept
                </button>
                <div className="followed-three-dots more">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                  <div className="more-dropdown more-with-triangle">
                    <Link href="/">Send Message</Link>
                    <Link href="/">Invite Connections</Link>
                    <Link href="/">Decline</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <h5>Suggested for you</h5>
        <p>Based on your interest and page popularity</p>

        <div className="discov-page-full-div container-fluid">
          {pageList.map((item, index) => (
            <div className="discov-page-div">
              <div className="card-heade-img">
                <img
                  className="card-img-head"
                  src={`${host}/uploads/pages/${item.cover_pic}`}
                  alt="File Upload"
                  width={"100%"}
                  height={"100%"}
                />
                <div className="close-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </div>

                <p className="card-heade-text">
                  {item.followerCount} people like this Page Like
                </p>
              </div>
              <div className="card-text-img">
                <img
                  className="pag-logo"
                  src={`${host}/uploads/pages/${item.profile_pic}`}
                  alt="File Upload"
                  width={0}
                  height={0}
                />

                <div className="card-pag-text">
                  <h5> {item.page_name}</h5>
                  <span className="followed-heade-beauty">{item.category}</span>
                  <p>
                    {item.bio && item.bio.length > 45
                      ? `${item.bio.slice(0,45)}...`
                      : item.bio}
                  </p>
                </div>
              </div>

              <div className="card-pag-button-div">
                <button
                  className="card-pag-button"
                  onClick={() => {
                    isLoadingEnable(index);
                    handleFollowPage(item._id, index);
                  }}
                >
                  <span>
                    {buttonStates[index].isLoading == true ? (
                      <div className="loading-spinner">Loading...</div>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="17"
                        fill="currentColor"
                        className="bi bi-hand-thumbs-up "
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                    )}
                  </span>{" "}
                  {buttonStates[index].isLoading != false
                    ? ""
                    : buttonStates[index].buttonText}
                </button>
                <button className="page-bookmark-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    className="bi bi-bookmark-fill page-bookmark"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invite;
