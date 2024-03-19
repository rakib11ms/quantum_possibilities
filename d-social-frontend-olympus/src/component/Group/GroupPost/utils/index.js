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
