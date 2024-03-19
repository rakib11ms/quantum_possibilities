"use client";

import React, { useEffect, useState } from "react";
import "../../app/check/sty.css";
import PostWrapper from "./Post/PostWrapper";
import { useDispatch } from "react-redux";
import { setAllPostData } from "@/redux/features/NewsFeed/newsFeedSlice";
import { useGetUserPostMutation } from "@/redux/features/Profile/profileApiSlice";
import { useParams } from "next/navigation";

const ProfilePostList = () => {
    const params = useParams();
    const [getUserPost, { data, isLoading: isGetAllPostLoading, isSuccess, error }] = useGetUserPostMutation();

    const dispatch = useDispatch();

 
    // get-all-users-post-individual

    useEffect(() => {
        if (isSuccess) {
            dispatch(setAllPostData(data?.posts));
        }
    }, [isGetAllPostLoading, isSuccess, data]);

    useEffect(() => {

        (async function () {
            await getUserPost({
                username: params.username
            })
        }())

    }, [])


    return (
        <div>
            {data?.posts?.map((item, i) => {
                return <PostWrapper post={item} />;
            })}
        </div>
    );
};

export default ProfilePostList;
