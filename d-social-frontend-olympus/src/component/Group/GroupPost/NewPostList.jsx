"use client";

import React from "react";
// import "../../app/check/sty.css";
import "@/app/check/sty.css";
// import PostWrapper from "./Post/PostWrapper";
import { useGetAllGroupPostQuery } from "@/redux/features/GroupPost/groupPostApi";
import {useDispatch} from "react-redux";
import {setAllPostData} from "@/redux/features/GroupPost/groupPostSlice";

import Loading from "@/component/loader";
import PostWrapper from "./PostWrapper";

const NewGroupPostList = ({group_id}) => {
  const dispatch = useDispatch();
  const { data, isLoading: isGetAllPostLoading, isSuccess, error } = useGetAllGroupPostQuery({ group_id });

  if (isGetAllPostLoading) return <Loading windowHeight={"0vh"} />;
  if (isSuccess) {
    dispatch(setAllPostData(data?.posts));
  }
  if (error) {
    return (
      <div className="">
        <p
          style={{
            color: "red",
          }}
        >
          {error.message || "Something Went Wrong!"}
        </p>
      </div>
    );
  }
  if (data?.posts.length === 0) {
    return (
      <p
        style={{
          color: "red",
        }}
      >
        No Post Found!
      </p>
    );
  }
  return (
    <div>
      {
      data?.posts?.map((item, i) => {
        return <PostWrapper post={item} />;
      })
      }
    </div>
  );
};

export default NewGroupPostList;
