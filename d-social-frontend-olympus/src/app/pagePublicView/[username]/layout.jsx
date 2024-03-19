"use client";
import "../../../assets/css/main.css";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import PageHeaderProfile from "@/component/Pages/PageHeaderProfile";
import Navbar from "../../../component/navbar/page";
import Leftsidebar from "@/component/leftsidebar/page";
import FeatureUser from "@/component/NewsFeed/FeatureUser";
import PageNavComponent from "../component/PageNavComponent";
import { useGetPageInfoMutation } from "@/redux/features/Page/pageApiSlice";
import { setPageInfo } from "@/redux/features/Page/pageSlice";
import { useDispatch } from "react-redux";
import PageCoverComponent from "../component/PageCoverComponent";
export default function layout({ children }) {
  const params = useParams();
  const [getPageInfo, { data, isloading, error, isError, isSuccess }] =
    useGetPageInfoMutation();

  const dispatch = useDispatch();
  console.log(data, "..pageAtPageInfo");

  const pageObject = {
    page_id: data?.pageDetails?._id,
    user_id: data?.pageDetails?.user_id,
    page_name: data?.pageDetails?.page_name,
    page_user_name: data?.pageDetails?.page_user_name,
    description: data?.pageDetails?.description,
    coverPhoto: data?.pageDetails?.cover_pic,
    profile: data?.pageDetails?.profile_pic,
    phone_number: data?.pageDetails?.phone_number,
    post_type: "page_post",
    post_privacy: "public",
    post_background_color: "",
    files: [],
  };

  dispatch(setPageInfo(pageObject));

  useEffect(() => {
    (async function () {
      await getPageInfo({
        page_user_name: params.username,
      });
    })();
  }, []);

  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="row">
          <div className="col-lg-2 col-xl-2">
            <div className="header-spacer"></div>
            <Leftsidebar />
          </div>
          <div className="col-lg-8 col-xl-8">
            <div>
              <PageCoverComponent />
              <div className="container">
                <PageHeaderProfile />
                {/* <PageNavComponent /> */}
                <div>{children}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-xl-2">
            <div className="header-spacer"></div>
            <div className="ui-block">
              <FeatureUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
