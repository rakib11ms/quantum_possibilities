"use client";

import React, { useEffect, useState } from "react";
import "../../app/check/sty.css";
import PostWrapper from "./Post/PostWrapper";
import { useDispatch } from "react-redux";
import { setAllPostData } from "@/redux/features/NewsFeed/newsFeedSlice";
import { useGetPagePostMutation } from "@/redux/features/Page/pageApiSlice";
import { useParams } from "next/navigation";

const PagePostList = () => {
  const params = useParams();
  const [
    getPagePost,
    { data, isLoading: isGetAllPostLoading, isSuccess, error },
  ] = useGetPagePostMutation();

  const dispatch = useDispatch();

  // get-all-users-post-individual

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAllPostData(data?.posts));
    }
  }, [isGetAllPostLoading, isSuccess, data]);

  useEffect(() => {
    (async function () {
      await getPagePost({
        username: params.username,
      });
    })();
  }, []);

  return (
    <div>
      {data?.posts?.map((item, i) => {
        return <PostWrapper post={item} />;
      })}
    </div>
  );
};

export default PagePostList;
