"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/page";
import CoverComponent from "./component/CoverComponent";
import ProfileComponent from "./component/ProfileComponent";
import ProfileNavComponent from "./component/ProfileNavComponent";
import { useGetUserInfoMutation } from "@/redux/features/Profile/profileApiSlice";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { object } from "yup";
import { setGetUser } from "@/redux/features/Profile/profileSlice";
import Loading from "@/component/loader"

export default function layout({ children }) {
  const params = useParams();
  const [getUserInfo, { data, isloading, error, isError, isSuccess }] = useGetUserInfoMutation();

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  const userObject = {
    _id: data?.userInfo[0]._id,
    username: data?.userInfo[0].username,
    fullname: data?.userInfo[0].first_name + " " + data?.userInfo[0].last_name,
    coverphoto: data?.userInfo[0].cover_pic,
    profile: data?.userInfo[0].profile_pic,
    bio: data?.userInfo[0].user_bio,
    postsCount: data?.userInfo[0].postsCount,
    followersCount: data?.userInfo[0].followersCount,
    followingCount: data?.userInfo[0].followingCount,
  };

  dispatch(setGetUser(userObject));

  useEffect(() => {
    (async function () {
      await getUserInfo({
        username: params.username,
      });
      setLoading(false)
    })();
  }, []);

  if (loading) {
    return <Loading windowHeight={"100vh"} />
  }

  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>

        <div>
          <div>
            <CoverComponent />

            <div className="">
              <div className="container">
                <ProfileComponent />

                <ProfileNavComponent />

                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
