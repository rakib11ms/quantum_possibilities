"use client";
import CampaignForm from "@/component/ManageAds/CampaignForm";
import { useParams } from "next/navigation";
import axiosInstance from "../../../../utils/axios";
import { host } from "@/environment";
import { useState } from "react";


const page = () => {
    const [pageData, setPageData] = useState({ removable_file: [] })
    return (
        <div>
            <CampaignForm pageData={pageData} setPageData={setPageData} />
        </div>
    );
};

export default page;
