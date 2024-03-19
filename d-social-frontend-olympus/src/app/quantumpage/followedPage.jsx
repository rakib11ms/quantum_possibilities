import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import Link from "next/link";
import InviteForPage from "@/component/Pages/InviteForPage";

const FollowedPage = () => {
  const [pageList, setPageList] = useState([]);
  const [settingModal, setSettingModal] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(false);
  useEffect(() => {
    getFollowedPage();
  }, []);

  const getFollowedPage = () => {
    axiosInstance.get("/api/get-followed-pages").then((res) => {
      if (res.data.status == 200) setPageList(res.data.data);
    });
  };
  const closeSettingModal = () => {
    setSettingModal(false);
  };

  const handleUnFollow = (event, page_id) => {
    event.preventDefault();
    const formData = {
      page_id: page_id,
    };
    axiosInstance
      .post("/api/unfollow-page", formData)
      .then((res) => {
        if (res.data.status === 200) {
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
        getFollowedPage();
      })
      .catch((error) => {
        toast.error("An error occurred while processing your request", {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });
      });
  };

  const bookMarkPage = (page_id, bookmark_status) => {
    const formData = {
      page_id: page_id,
      bookmark_status: bookmark_status,
    };
    axiosInstance.post("/api/bookmark-page", formData).then((res) => {
      if (res.data.status == 200) {
        toast.success(res.data.message, {
          position: "top-right",
          style: {
            background: "white",
            color: "black",
          },
        });

        getFollowedPage();
      }
    });
  };

  return (
    <div>
      <h4 className="page-header-text">Your followed Pages</h4>
      <p>The pages you followed before</p>
      <hr />

      <div>
        <div className="followed-pages-div">
          {pageList.length > 0 ? (
            pageList.map((item, index) => (
              <div className="followed-text-img">
                <div className="follo-pag-logo-div">
                  <img
                    className="follo-pag-logo"
                    src={`${host}/uploads/pages/${item.profile_pic}`}
                    alt="File Upload"
                    width={"100%"}
                    height={"100%"}
                  />

                  <div className="follo-pag-text">
                    <Link href={`/pagePublicView/${item.page_user_name}`}>
                      <h5>{item.page_name}</h5>
                    </Link>
                    <span className=""> {item.category}</span>
                    <p>
                      {item.bio && item.bio.length > 10
                        ? `${item.bio.slice(0, 25)}...`
                        : item.bio}
                    </p>
                    <p className="followed-heade-text">
                      {item.followerCount} people follow this Page Like
                    </p>
                  </div>
                </div>

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
                    {/* <Link href={"/"}>Follow settings</Link> */}
                    <Link
                      href="#"
                      onClick={(event) => handleUnFollow(event, item._id)}
                    >
                      UnFollow Page
                    </Link>
                    {item.userPageSettings.length > 0 ? (
                      item.userPageSettings[0].bookmark_status == 1 ? (
                        <Link
                          href="#"
                          onClick={() => {
                            bookMarkPage(item._id, 0);
                          }}
                        >
                          Remove From BookMark
                        </Link>
                      ) : (
                        <Link
                          href="#"
                          onClick={() => {
                            bookMarkPage(item._id, 1);
                          }}
                        >
                          Save
                        </Link>
                      )
                    ) : (
                      <Link
                        href="#"
                        onClick={() => {
                          bookMarkPage(item._id, 1);
                        }}
                      >
                        Save
                      </Link>
                    )}

                    {/* <Link href="/">Share</Link> */}
                    <Link
                      href="#"
                      onClick={() => {
                        setSettingModal(true);
                        setSelectedPageId(item._id);
                      }}
                    >
                      Invite connections
                    </Link>
                    {/* <Link href="/">Report</Link> */}
                    {/* <Link href="/">Block</Link> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>No Page Found</>
          )}
        </div>
      </div>
      <InviteForPage
        isOpen={settingModal}
        onRequestClose={closeSettingModal}
        selectedPageId={selectedPageId}
      />
    </div>
  );
};

export default FollowedPage;
