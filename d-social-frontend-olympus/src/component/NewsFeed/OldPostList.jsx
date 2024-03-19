"use client";

import React, { useEffect, useState } from "react";
import "../../app/check/sty.css";
import PostWrapper from "./Post/PostWrapper";
import { setAllPostData } from "@/redux/features/NewsFeed/newsFeedSlice";
import Loading from "../loader";
import useAxiosGet from "@/hooks/useAxiosGet";
import { toast } from "react-toastify";
import { useGetAllPostQuery } from "@/redux/features/NewsFeed/newsFeedApi";

const PostList = () => {
   const [pageNo, setPageNo] = useState(1);
   const [pageSize, setPageSize] = useState(5);
   const [isLoading, setIsLoading] = useState(false);
   const [postList, setPostList] = useState([]);

   const { data } = useGetAllPostQuery(
      { pageNo, pageSize },
      {
         refetchOnMountOrArgChange: true,
      },
   );

   useEffect(() => {
      const handleScroll = () => {
         if (!isLoading && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
            setIsLoading(true);
            setPageNo((prev) => prev + 1);
            // setPageSize((prev) => (prev + 5));
            setPageSize(20);
         }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [isLoading, pageNo, pageSize]);

   useEffect(() => {
      setIsLoading(true);
      if (data) {
         setIsLoading(false);
         if (data.posts && data.posts.length === 0) {
            setPageNo(1);
            setPageSize(20);
         }
         setPostList((pre) => [...pre, ...(data.posts || [])]);
      }
   }, [data]);

   return (
      <div>
         {postList.length > 0 ? (
            <>
               {postList?.map((item, i) => {
                  return <PostWrapper post={item} />;
               })}
            </>
         ) : (
            <>
               {postList?.map((item, i) => {
                  return <PostWrapper post={item} />;
               })}
            </>
         )}
         {isLoading && <Loading windowHeight={"0vh"} />}
      </div>
   );
};

export default PostList;
