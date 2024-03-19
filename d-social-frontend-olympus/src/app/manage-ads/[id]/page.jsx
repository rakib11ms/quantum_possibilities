"use client";
import CampaignForm from "@/component/ManageAds/CampaignForm";
import { redirect, useParams, useRouter } from "next/navigation";
import axiosInstance from "../../../../utils/axios";
import { host } from "@/environment";
import { useEffect, useState } from "react";


const page = () => {
    const params = useParams()
    const router = useRouter()
    const [pageData, setPageData] = useState({})

    console.log("pageData__", pageData);
    const getSingleCampaign = async () => {
        try {
            if (!params?.id) throw new Error('Id not found')
            const res = await axiosInstance.get(`/api/campaign/show/${params?.id}`)
            const tempData = res.data.data

            if (!tempData && typeof (tempData) !== 'object') {
                throw new Error('Data not found')
            }
            tempData['campaign_id'] = tempData?._id
            tempData['url'] = host + "/uploads/adsStorage/" + tempData?.campaign_cover_pic
            setPageData({ ...tempData, prevImages: tempData?.campaign_cover_pic })
        }
        catch (err) {
            console.log('main_err__', err);
            router.back()
        }
    }
    useEffect(() => {
        getSingleCampaign()
    }, [])

    return (
        <div>
            <CampaignForm pageData={pageData} setPageData={setPageData} />
        </div>
    );
};
// const page = async ({ params }) => {
//     console.log("eeeeeeeeeeeeee         params___", params);
//     let data = null
//     try {
//         if (!params?.id) throw new Error('Id not found')
//         const res = await axiosInstance.get(`${host}/api/campaign/show/${params?.id}`)
//         data = res.data.data
//         if (!data && !typeof (data)) {
//             throw new Error('Data not found')
//         }

//         data['pages'] = []
//         try{
//             const pageRes = await axiosInstance.get(`${host}/api/get-my-pages`)
//             console.log('rrrrrrrrrrrrrrrrrr_______________', pageRes.data);
//             data['pages'] = pageRes.data.myPages?.map(i => ({
//                 label: i?.page_name,
//                 id: i?._id
//             }));
//         }
//         catch(er){
//             console.log('page getting error____',er);
//         }

//     }
//     catch (err) {
//         console.log('main_err__',err);
//         redirect('/manage-ads')
//     }

//     return (
//         <div>
//             <CampaignForm data={data ? { ...data, campaign_id: data?._id } : null} />
//         </div>
//     );
// };

export default page;
