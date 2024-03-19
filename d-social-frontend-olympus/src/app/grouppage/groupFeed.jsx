import React, { useEffect, useState } from "react";
import GroupPageAllPostList from "@/component/Group/GroupPageAllPostlist";
import PostWrapper from "@/component/Group/GroupPost/PostWrapper";
import useToaster from "@/hooks/useToaster";
import axiosInstance from "../../../utils/axios";

const GroupFeed = () => {
  const [allPosts, setAllposts] = useState([]);
  const { showNotification } = useToaster()

  async function allPostss() {
    axiosInstance
      .get("/api/get-all-groups-post")
      .then((res) => {
        if (res.data.status == 200) {
          setAllposts(res.data.posts);
        }
      })
      .catch((err) => {
        showNotification(err?.response?.data?.message, 'error');
      });
  }
  useEffect(() => {
    allPostss()
  }, [])
  return (

    <div className='page-header-textsss-div mt-2'>
      <h4 className='page-header-text'>Recent Activity</h4>
      {/* <p>Suggested for you</p> */}
      <hr />
      <div id="newsfeed-items-grid">
        {
          allPosts?.map(item => <PostWrapper post={item} />)
        }
      </div>


      {/* <GroupPageAllPostList /> */}
    </div>

  );
};

export default GroupFeed;
