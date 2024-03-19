import React, { useEffect, useState } from "react";
import "../../../assets/css/main.css";
import ".././[username]/page.modules.css";
import InfoIcon from "@/app/[username]/about/_ui/Icons/InfoIcon";
import LikeIcon from "@/app/[username]/about/_ui/Icons/LikeIcon";
import CheckIcon from "@/app/[username]/about/_ui/Icons/CheckIcon";
import GlobeIcon from "@/app/[username]/about/_ui/Icons/GlobeIcon";
import PageEmailIcon from "@/app/[username]/about/_ui/Icons/PageEmailIcon";
import PagePhoneIcon from "@/app/[username]/about/_ui/Icons/PagePhoneIcon";
import { host } from "@/environment";
import { useParams } from "next/navigation";
import { useGetPageInfoMutation } from "@/redux/features/Page/pageApiSlice";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axios";

export default function AboutPage({ username }) {
  let pageInfo = {};
  const params = useParams();
  const [getPageInfo, { data, isloading, error, isError, isSuccess }] =
    useGetPageInfoMutation();
  const [allPhotos, setAllPhotos] = useState([]);
  console.log(allPhotos, "__allPhotos");
  if (data) {
    pageInfo = data?.pageDetails;
  }
  console.log(pageInfo, "..pageInfo");

  useEffect(() => {
    (async function () {
      await getPageInfo({
        page_user_name: params.username,
      });
    })();
  }, [params.username]);

  const getAllPhotos = (username) => {
    axiosInstance
      .post("/api/get-pages-latest-image-video", {
        username: username,
      })
      .then((res) => {
        if (res.data.status == 200) {
          setAllPhotos(res.data.posts);
        }
      });
  };
  useEffect(() => {
    getAllPhotos(params.username);
  }, [params.username]);

  // useEffect(() => {
  //   (async function () {
  //     await getPageInfo({
  //       page_user_name: params.username,
  //     });
  //   })();
  // }, [params.username]);

  return (
    <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4">
      <div className="about-page-div">
        <p className="about-page-tags">About Page</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d456.5327641626369!2d90.37808873161997!3d23.738030688160517!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b93acb46113d%3A0xd6e9844905f40dd!2sPakiza%20Technovation%20Limited!5e0!3m2!1sen!2sbd!4v1706602643058!5m2!1sen!2sbd"
          width="400"
          height="300"
          className="about-page-map"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
        <div>
          <ul>
            <li>
              <div className="about-page-li-div">
                <span>
                  <InfoIcon />
                </span>
                <p>{pageInfo?.bio}</p>
              </div>
            </li>
            <li>
              <div className="about-page-li-div">
                {" "}
                <span>
                  <LikeIcon />
                </span>
                <p>1163 peoples like this *s</p>
              </div>
            </li>
            <li>
              <div className="about-page-li-div">
                <span>
                  <CheckIcon />
                </span>
                <p>{pageInfo?.followerCount} people follow this</p>
              </div>
            </li>
            <li>
              <div className="about-page-li-div">
                <span>
                  <GlobeIcon />
                </span>
                <a>{pageInfo?.website?.slice(0, 25)}</a>
              </div>
            </li>
            <li>
              <div className="about-page-li-div">
                <span>
                  <PageEmailIcon />
                </span>

                <p>{pageInfo?.email}</p>
              </div>
            </li>
            <li>
              <div className="about-page-li-div">
                {" "}
                <span>
                  <PagePhoneIcon />
                </span>
                <span>
                  {pageInfo?.phone_number ? pageInfo.phone_number : 9786567657}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="about-page-div">
        <div className="mrak_my_photo_container">
          <div className="mrak_my_photo_title_container">
            <p className="mrak_my_photo_title_text">My Photo</p>

            {/* <Link href={`/anik.ba/photo`} className="mrak_my_photo_see_all_btn">
              See all
            </Link> */}
            <span className="mrak_my_photo_see_all_btn">See all</span>
          </div>
          <div className="mrak_my_photo_grid_wrapper">
            {/* {allPhotos.map((item) => {
              return (
             <div>
               <img
                 className="mrak_my_photo_grid_photo"
                 src={`${host}/uploads/posts/`}
               />
            )} */}

            {allPhotos && allPhotos.length > 0 ? (
              allPhotos?.map((item) => {
                console.log(item, "...item");
                <img
                  className="mrak_my_photo_grid_photo"
                  src={`${host}/uploads/pages/${item.media}`}
                />;
              })
            ) : (
              <div>
                <img
                  className="mrak_my_photo_grid_photo"
                  src={`${host}/uploads/posts/`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
