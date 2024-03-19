import React from "react";
import { host } from "@/environment";
import "../../pagePublicView/[username]/page.modules.css";
import DemoAvater from "../../../component/NewsFeed/Post/post-ui/headers/demo_profile.jpg";
import Image from "next/image";
import Link from "next/link";
// import { formatDate } from "../../utils";
import GlobSvg from "@/component/Group/GroupPost/post-ui/headers/svg/GlobSvg";
import { formatDate } from "@/component/NewsFeed/Post/utils";

export default function PagePostHeader({ user, createdAt, postInformation }) {
  return (
    <div className="main__postHeader__wrapper">
      <div className="right__profile__area">
        <div className="profile_pic">
          {user?.profile_pic != null ? (
            <Link href={`${user?.page_user_name}`}>
              <img
                src={`${host}/uploads/pages/${user?.profile_pic}`}
                className="avatar"
              />
            </Link>
          ) : (
            <Image src={DemoAvater} alt="avater" />
          )}
        </div>

        <div className="name_time_wrapper">
          <div
            style={{
              fontWeight: "600",
              display: "flex",
              flexWrap: "wrap",
              columnGap: "5px",
              alignItems: "center",
            }}
          >
            <Link href={`${user?.page_user_name}`}>
              <p>{user?.page_name}</p>
            </Link>

            <div
              style={{
                fontWeight: "600",
                display: "flex",
                flexWrap: "wrap",
                columnGap: "5px",
                alignItems: "center",
              }}
            >
              {postInformation?.feelings && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    columnGap: "4px",
                  }}
                >
                  <p>... is feelings</p>
                  <img
                    style={{
                      width: "15px",
                    }}
                    src={`${host}/assets/logo/${postInformation?.feelings?.logo}`}
                    alt="feelings_icon"
                  />
                  <p> {postInformation?.feelings?.feeling_name}!</p>
                </div>
              )}

              {postInformation?.location && (
                <p>at {postInformation?.location?.location_name} </p>
              )}
            </div>
          </div>

          <div className="time__glob">
            <span>{formatDate(createdAt)}</span>
            <span className="point"></span>
            <GlobSvg />
          </div>
        </div>
      </div>
    </div>
  );
}
