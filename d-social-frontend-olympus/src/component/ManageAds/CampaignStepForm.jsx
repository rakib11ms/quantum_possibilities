"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";

import CreatePageOne from "@/component/ManageAds/ui/CampaignFormParts/CreatePageOne";
import CreatePageTwo from "@/component/ManageAds/ui/CampaignFormParts/CreatePageTwo";
import CreatePageThree from "@/component/ManageAds/ui/CampaignFormParts/CreatePageThree";
import CreatePageFour from "@/component/ManageAds/ui/CampaignFormParts/CreatePageFour";
import CreatePageFive from "@/component/ManageAds/ui/CampaignFormParts/CreatePageFive";
import { host } from "@/environment";

export const categories = ["Technology", "Fashion", "Health", "Education", "Entertainment", "Sports", "Travel", "Food", "Other"];
export const locations = ["Home", "Office", "Other"];
export const keywords = ["PSL", "PakizaSoftwareLimited", "PTVL", "Pakiza", "BlockChain" ];
export const call_to_action_options = ["Learn More", "Book now", "Call us", "See More", "Shop Now", "Sign Up", "Download"];
export const campaignPlacementList = ["Left Side","Right Side", "Newsfeed Ads"];

const CampaignStepForm = ({ pageData, setPageData, step, setStep }) => {

  const [pages, setPages] = useState(null)
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    axiosInstance
      .post("/api/friend-list", { username: username })
      .then((res) => {
        setUserList(
          res.data?.results
            ?.filter((j) => j?.connected_user_id?._id && j?.user_id?._id)
            ?.map((i) => {
              if (i.connected_user_id.username !== username) {
                return {
                  label: [
                    i?.connected_user_id?.first_name,
                    i?.connected_user_id?.last_name,
                  ].join(" "),
                  value: i?.connected_user_id?._id,
                };
              } else {
                return {
                  label: [i?.user_id?.first_name, i?.user_id?.last_name].join(
                    " "
                  ),
                  value: i?.user_id?._id,
                };
              }
            })
        );
      })
      .catch((err) => console.log(err));

  
      axiosInstance.get(`/api/get-my-pages`)
        .then(res => {
          setPages(res.data.myPages?.map(i => ({
            label: i?.page_name,
            id: i?._id
          })))
        })
        .catch(err => console.log(err))

 

  }, []);

  return (
    <div>
      {step == 1 && (
        <CreatePageOne
          setStep={setStep}
          pageData={pageData}
          setPageData={setPageData}
          userList={userList}
          pages={pages}
        />
      )}

      {step == 2 && (
        <CreatePageTwo
          setStep={setStep}
          pageData={pageData}
          setPageData={setPageData}
        />
      )}
      {step == 3 && (
        <CreatePageThree
          setStep={setStep}
          pageData={pageData}
          setPageData={setPageData}
        />
      )}
      {step == 4 && (
        <CreatePageFour
          setStep={setStep}
          pageData={pageData}
          setPageData={setPageData}
        />
      )}
      {step == 5 && (
        <CreatePageFive
          setStep={setStep}
          pageData={pageData}
          setPageData={setPageData}
        />
      )}
    </div>
  );
};

export default CampaignStepForm;
