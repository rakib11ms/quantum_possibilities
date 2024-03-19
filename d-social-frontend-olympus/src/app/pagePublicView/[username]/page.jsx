"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import AboutPage from "../component/AboutPage";
import Timeline from "../component/Timeline";
import { useGetPageInfoMutation } from "@/redux/features/Page/pageApiSlice";

function page(props) {
  const params = useParams();
  const [getPageInfo, { data, isloading, error, isError, isSuccess }] =
    useGetPageInfoMutation();
  useEffect(() => {
    (async function () {
      await getPageInfo({
        page_user_name: params.username,
      });
    })();
  }, [params.username]);
  return (
    <div>
      <div>
        <div className="row">
          <AboutPage pageInfo={props.pageInfo} />
          <div className="col-lg-8 col-xl-8">
            <Timeline pageDetails={data?.pageDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
