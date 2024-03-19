"use client";

import React, { useEffect, useState } from "react";
import "../../../app/check/sty.css";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import {
  useGetPageInfoMutation,
  useGetPagePostMutation,
} from "@/redux/features/Page/pageApiSlice";
import { setAllPostData } from "@/redux/features/Page/pageSlice";
import PagePostWrapper from "./PagePostWrapper";

const PagePostList = ({ pageDetails }) => {
  const params = useParams();
  const [
    getPagePost,
    { data, isLoading: isGetAllPostLoading, isSuccess, error },
  ] = useGetPagePostMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAllPostData(data?.posts));
    }
  }, [isGetAllPostLoading, isSuccess, data]);

  useEffect(() => {
    (async function () {
      await getPagePost({
        page_id: pageDetails?._id,
      });
    })();
  }, [pageDetails?._id]);

  console.log(data?.posts, "postDataList");
  return (
    <div>
      {isGetAllPostLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            fontSize: "20px",
          }}
        >
          <div className="spinner-border text-secondary" role="status" />
        </div>
      )}
      {data?.posts && data?.posts.length > 0 ? (
        data?.posts?.map((item, i) => {
          console.log(item, "...item");
          return <PagePostWrapper post={item} />;
        })
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            fontSize: "20px",
          }}
        >
          <p>No post found</p>
        </div>
      )}

      {/* {data?.posts?.map((item, i) => {
        return <PagePostWrapper post={item} />;
      })} */}
    </div>
  );
};

export default PagePostList;
