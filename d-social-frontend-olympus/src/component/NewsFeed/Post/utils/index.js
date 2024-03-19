export function isImage(filename) {
  if (!filename) {
    return false;
  }
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
  const fileExtension = filename.split(".").pop().toLowerCase();
  return imageExtensions.includes(fileExtension);
}

export function isVideo(filename) {
  if (!filename) {
    return false;
  }
  const videoExtensions = ["mp4", "avi", "mov", "wmv", "mkv"];
  const fileExtension = filename.split(".").pop().toLowerCase();
  return videoExtensions.includes(fileExtension);
}

export function formatDate(timestamp) {
  const now = moment();
  const postTime = moment(timestamp);
  const diffMinutes = now.diff(postTime, "minutes");

  if (diffMinutes < 1) {
    return "a few seconds ago";
  } else if (diffMinutes < 30) {
    return `${diffMinutes} minutes ago`;
  } else if (now.isSame(postTime, "day")) {
    return `Today at ${postTime.format("LT")}`;
  } else {
    return postTime.format("LLL");
  }
}

import React, {useState, useEffect} from "react";

export const CommentTimeFormat = ({timestamp}) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const providedTime = new Date(timestamp);
      const timeDifference = currentTime - providedTime;
      const secondsDifference = timeDifference / 1000;
      const minutesDifference = secondsDifference / 60;
      const hoursDifference = minutesDifference / 60;
      const daysDifference = hoursDifference / 24;

      if (daysDifference >= 1) {
        setTimeAgo(`${Math.floor(daysDifference)} d`);
      } else if (hoursDifference >= 1) {
        setTimeAgo(`${Math.floor(hoursDifference)} h`);
      } else if (minutesDifference >= 1) {
        setTimeAgo(`${Math.round(minutesDifference)} m`);
      } else {
        setTimeAgo(`${Math.round(secondsDifference)} s`);
      }
    };

    calculateTimeAgo();

    // Update every minute
    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <p>{timeAgo}</p>;
};

// likeShareActions.js
import {setHovered} from "@/redux/features/Reaction/reactionSlice";
import moment from "moment";

export const handleMouseEnter = (postId, dispatch) => {
  dispatch(setHovered({postId, isHovered: true}));
};

export const handleMouseLeave = (postId, dispatch) => {
  dispatch(setHovered({postId, isHovered: false}));
};

export const handleTouchStart = (postId, dispatch) => {
  dispatch(setHovered({postId, isHovered: true}));
};

export const handleTouchEnd = (postId, dispatch) => {
  dispatch(setHovered({postId, isHovered: false}));
};
