import React from 'react';
import axiosInstance from '../../../utils/axios';
import { host } from '@/environment';
import Link from 'next/link';

export default function Sponsored({ left }) {
   const [sponsers, setSponsers] = React.useState([]);
   console.log('🚀 ~ Sponsored ~ sponsers:', sponsers);

   const handleOnClickCampaignReached = ({ campaign_id, campaign_name, locations }) => {

      axiosInstance
         .post(`/api/campaign/save-campaign-performance`, {
            campaign_id: campaign_id,
            campaign_name: campaign_name,
            campaign_location: locations?.join(','),
            is_impressed: false,
            is_reached: false,
            is_clicked: true,
            createdAt: new Date(),
         })
         .then((response) => {
            console.log(response.data);
         })
         .catch((error) => {
            console.error(error);
         });
   };
   React.useEffect(() => {
      const url = left ? '/api/campaign/get-left-side-ads' : '/api/campaign/get-right-side-ads';
      axiosInstance
         .get(url)
         .then((response) => {
            setSponsers(response.data.campaign);
         })
         .catch((error) => {
            console.error('Error:', error);
         });

   }, []);
   console.log(left ? "left sponsers____" : "Right sponsers____", sponsers);
   return (
      <div className="sponserd-full-div">
         <h6>Sponsored</h6>
         {sponsers.map((item) => {
            console.log(item);
            return (
               <Link target='_blank' href={item?.website_url || ''} onClick={() => handleOnClickCampaignReached({
                  campaign_id: item?._id,
                  campaign_name: item?.campaign_name,
                  locations: item?.locations,
               })}>
                  <div className="sponserd-div">
                     <img
                        className="sponserd-img"
                        src={`${host}/uploads/adsStorage/${item?.campaign_cover_pic}`}
                        alt=""
                     />
                     <div>
                        <span className="sponserd-tags">{item?.campaign_name}</span>
                        <p className="sponserd-tagsp">{item?.description}</p>
                     </div>
                  </div>
               </Link>
            );
         })}
      </div>
   );
}
