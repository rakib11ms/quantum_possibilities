"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { host } from "@/environment";
import Image from "next/image";
import axiosInstance from "../../../utils/axios";
import { navContainer } from "@/utils/nav";
import useUserInfo from "@/hooks/useUserInfo";
const Leftsidebar = () => {
   const [mainItems, setMainItems] = useState([]);

  const { userInfo } = useUserInfo()

  const getCustomizeMenu = () => {
    axiosInstance
      .get(`/api/get-customize-menu`)
      .then((res) => {
        if (res.data.status == 200) {
          const data = res.data.menu.find(i => i.type == 'leftMenu')?.content || navContainer
          const con = []
          for (const i of data) {
            const temp = navContainer.find(j => j.id === i.id)
            if (temp) {
              con.push(temp)
            }
          }
          setMainItems(con)
        }
      });
  }
  
  useEffect(() => {
    getCustomizeMenu()
  }, []);

  return (
    <React.Fragment className="scrollable_div ">
      <ul className="left-menu ui-block">
        <li>
          <Link href={`/${userInfo?.userName}/timeline`} className="user-info ">
            {userInfo?.profile_pic !== null ? (
              <img
                alt="author"
                src={`${host}/uploads/${userInfo?.profile_pic}`}
                className="avatar "
              />
            ) : (
              <img
                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                className="bi bi-wallet2 olymp-explore-icon left-menu-icon"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            )}

            <span className="author-tag-b">
              <b>{[userInfo?.first_name,
              userInfo?.last_name].join(' ')}</b>
            </span>
          </Link>
        </li>
        {
          mainItems?.map(element => <Link href={element?.url} className='shortable-link'>
            <Image
              src={element.icon_url}
              width='25'
              className='bi bi-wallet2 olymp-explore-icon left-menu-icon'
              height='25'
            />
            <span className='left-menu-title'>{element.title} </span>
          </Link>)
        }
      </ul>
    </React.Fragment>
  );
};

export default Leftsidebar;
