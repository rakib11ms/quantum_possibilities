import React, { useEffect, useState } from "react";
import feedauththree from "../../assets/img/avatar10-sm.jpg";
import Sponserdone from "../../../public/sponserdone.png";
import Sponserdtwo from "../../../public/sponserdtwo.png";
import NoImage from '../../assets/img/no_image_available.svg';
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import { toast } from "react-toastify";
import Link from "next/link";
import addFriend from "../../../public/addFriend.png";
import "./FeatureUser.css"
import Image from "next/image";
// import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessengerPopupFixedMessage from "../AllMessengers/MessengerPopupFixedMessage";
import moment from "moment";
import Modal from "react-modal";
import { socket } from "@/app/layout"
import { customStyles } from "../../../utils/customeStyle";
import FriendsBrithdayModal from "./FriendsBrithdayModal";
import BirthdayIcon from "./_ui/Icons/BirthdayIcon";
import SearchIcon from "./_ui/Icons/SearchIcon";
import ThreedotIcon from "./_ui/Icons/ThreedotIcon";
import AddIcon from "./_ui/Icons/AddIcon";
import CreateGroupPopup from "./CreateGroupPopup";
import GroupMessengerPopupFixedMessage from "../AllMessengers/GroupMessengerPopupFixedMessage";
import Sponsored from "../SideBar/Sponsored";
import FriendRequestList from "../Friends/FriendRequestList";
import BirthDay from "../BirthDay";
import FriendList from "../Friends/FriendList";
import GroupConversations from "./GroupConversations";
import { rightSidebarContainer } from "@/utils/nav";

function FeatureUser() {

  const [friendRequestList, setFriendRequestList] = useState([]);
  const [groupChatList, setGroupChatList] = useState([]);
  const [friendlist, setFriendList] = useState([]);
  const [birthDayFriendList, setBirthDayFriendList] = useState([]);
  const [username, setUsername] = useState([]);
  const [messageSenderId, setMessageSenderId] = useState("");
  const [isOpenModal, setIsOpenModal] = React.useState({
    friendsBirthday: false,
  });

  const [mainItemsRight, setMainItemsRight] = useState([]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const localUserInfo = localStorage.getItem("userInfo");

      if (localUserInfo) {
        setMessageSenderId(JSON.parse(localUserInfo)[0]._id);
      }
    }
  }, []);

  useEffect(() => {
    const localStorageUserName = localStorage.getItem("username");
    setUsername(localStorageUserName);

    // getFriendRequests();
    // getGroupChatList();
    // getBirthDayFriendList();
    getFriendList(localStorageUserName);
    axiosInstance
      .get(`/api/get-customize-menu`)
      .then((res) => {
        if (res.data.status == 200) {

          console.log("res.data.menu___", res.data.menu);
          const rightMenuData = res.data.menu.find(i => i.type == 'rightMenu')?.content || rightSidebarContainer


          const conRightMenu = []


          for (const i of rightMenuData) {
            const temp = rightSidebarContainer.find(j => j.id === i.id)
            if (temp) {
              conRightMenu.push(temp)
            }
          }
          setMainItemsRight(conRightMenu)
        }
      });


  }, [])


  const getFriendRequests = () => {
    axiosInstance.post("/api/friend-request-list").then((res) => {
      if (res.data.status == 200) {
        setFriendRequestList(res.data.results);
      }
    });
  };

  const getGroupChatList = () => {
    axiosInstance.get("/api/get-all-group-chat-info").then((res) => {
      if (res.data.status == 200) {
        setGroupChatList(res.data.all_group);
      }
    });
  };


  const getBirthDayFriendList = () => {
    axiosInstance.get("/api/get-todays-birthday-friends").then((res) => {
      if (res.data.status == 200) {
        setBirthDayFriendList(res.data.results);
      }
    });
  };


  const getFriendList = (localStorageUserName) => {
    const formData = {
      username: localStorageUserName
    }
    axiosInstance.post("/api/friend-list", formData).then((res) => {
      if (res.data.status == 200) {
        setFriendList(res.data.results);
      }
    });
  };



  const [connectedUsers, setConnectedUsers] = useState([]);
  useEffect(() => {

    const handleGetUsers = users => {
      if (connectedUsers.length !== users.length) {
        setConnectedUsers(users);
      }
    };

    socket.on("getUsers", handleGetUsers);
    return () => {
      socket.off("getUsers", handleGetUsers);
    };
  }, [connectedUsers]);

  console.log("mainItemsRight__", mainItemsRight);

  return (
    <>
      {
        mainItemsRight.map(i => {
          if (i.title === 'friendrequestlist') return <FriendRequestList setFriendList={setFriendList} />
          if (i.title === 'groupConversations') return <GroupConversations friendlist={friendlist} connectedUsers={connectedUsers} />

          return i?.content
        })
      }
    </>
  );
}

export default FeatureUser;