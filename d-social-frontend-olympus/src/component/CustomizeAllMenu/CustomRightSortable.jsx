"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import GroupSvg1 from "../../../public/custom-svg-icon/groups.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Sponserdone from "../../../public/sponserdone.png";
import Sponserdtwo from "../../../public/sponserdtwo.png";
import DndScroll from "../../../public/svg-icons/dndScroll.svg";
import axiosInstance from "../../../utils/axios";
import useToaster from "@/hooks/useToaster";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";

const DragAndDropExample = ({
  sortableListRight,
  setSortableListRight,
  setMainItemsRight,
  mainItemsRight,
  mainItems,
}) => {
  const { showNotification } = useToaster();
  const router = useRouter();
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [birthDayFriendList, setBirthDayFriendList] = useState([]);
  const [friendlist, setFriendList] = useState([]);

  const acceptRequest = (request_id, accept_reject_ind) => {
    const formData = {
      request_id: request_id,
      accept_reject_ind: accept_reject_ind,
    };
    axiosInstance
      .post("/api/friend-accept-friend-request", formData)
      .then((res) => {
        if (res.data.status == 200) {
          setFriendList((prevFriends) =>
            prevFriends.filter((friend) => friend._id !== request_id)
          );
          if (accept_reject_ind == 1) {
            toast.success("Request Accepted successfully", {
              position: "top-right",
              style: {
                background: "white",
                color: "black",
              },
            });
          } else {
            toast.success("Request Declined successfully", {
              position: "top-right",
              style: {
                background: "white",
                color: "black",
              },
            });
          }
        }
      });
  };

  function formatDate(timestamp) {
    const now = moment();
    const postTime = moment(timestamp);
    const diffMinutes = now.diff(postTime, "minutes");

    if (diffMinutes < 1) {
      return "a few seconds ago";
    } else if (diffMinutes < 30) {
      return `${diffMinutes} min ago`;
    } else if (now.isSame(postTime, "day")) {
      return `Today at ${postTime.format("LT")}`;
    } else {
      return postTime.format("LL");
    }
  }

  const handleSaveMenu = () => {
    const formdata = {
      rightMenuContent: mainItemsRight.map((i) => ({
        id: i.id,
        title: i.title,
      })),
      leftMenuContent: mainItems.map((i) => ({ id: i.id, title: i.title })),
    };

    if (mainItems?.length) {
      axiosInstance
        .post("/api/save-customize-menu", formdata)
        .then((res) => {
          showNotification(res.data?.message);
          router.push("/newsfeed");
        })
        .catch((err) => {
          console.log(err);
          showNotification("Menu Customization failed !", "error");
        });
    }
  };

  return (
    <div>
      <div className="customize-header-tag-div">
        <h4 className="customize-header-tag">Customize Menu</h4>
      </div>
      <ul>
        {sortableListRight.map((element, index) => (
          <li>
            <Grid
              className="customize-svg-icons"
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Image src={element?.img_url} height={120} width={220} />

              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMainItemsRight((prev) => {
                    const temp = prev.find((i) => i.id === element?.id);
                    if (temp) return prev;
                    sortableListRight.splice(index, 1);
                    return [...prev, element];
                  });
                }}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12.3159"
                    cy="12"
                    r="9"
                    stroke="#307777"
                    stroke-width="2"
                  />
                  <path
                    d="M12.3159 15L12.3159 9"
                    stroke="#307777"
                    stroke-width="2"
                    stroke-linecap="square"
                  />
                  <path
                    d="M15.3159 12L9.31592 12"
                    stroke="#307777"
                    stroke-width="2"
                    stroke-linecap="square"
                  />
                </svg>
              </span>
            </Grid>
          </li>
        ))}
      </ul>
      <button className="card-pag-button py-2" onClick={handleSaveMenu}>
        Save This Setting
      </button>
    </div>
  );
};

export default DragAndDropExample;
