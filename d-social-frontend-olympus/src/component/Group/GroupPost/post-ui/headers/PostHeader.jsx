import React from "react";
import GlobSvg from "./svg/GlobSvg";
import ThreeDotSvg from "./svg/threeDotSvg";
import CrossSvg from "./svg/CrossSvg";
import "./PostHeader.modules.css";
import {host} from "@/environment";
import DemoAvater from "./demo_profile.jpg";
import Image from "next/image";
import Link from "next/link";
import {formatDate} from "../../utils";

export default function PostHeader({user, createdAt, postInformation}) {
  return (
    <div className="main__postHeader__wrapper">
      <div className="right__profile__area">
        <div className="profile_pic">
          {user?.profile_pic != null ? (
            <Link href={`${user?.username}/timeline`}>
              <img src={`${host}/uploads/${user?.profile_pic}`} className="avatar" />
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
            <Link href={`${user?.username}/timeline`}>
              <p>
                {user?.first_name} {user?.last_name}
              </p>
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

              {postInformation?.location && <p>at {postInformation?.location?.location_name} </p>}
            </div>
          </div>

          <div className="time__glob">
            <span>{formatDate(createdAt)}</span>
            <span className="point"></span>
            {/* <GlobSvg /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
