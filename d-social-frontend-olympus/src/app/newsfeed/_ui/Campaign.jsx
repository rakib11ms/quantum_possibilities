import React from 'react';
import './Campaign.css';
import axiosInstance from '../../../../utils/axios';
import { host } from '@/environment';
import ThreedotIcon from './Icons/ThreedotIcon';
import WorldIcon from './Icons/WorldIcon';

function Campaign(props) {
   const [campaigns, setCampaigns] = React.useState([]);

   console.log(campaigns, '__Campaigns__');

   React.useEffect(() => {
      axiosInstance
         .get(`${host}/api/campaign/get-center-side-ads`)
         .then((res) => setCampaigns(res.data.campaign))
         .catch((error) => console.log(error));
   }, []);
   return (
      <div className="tas_campaign_container">
         <p className="tas_campaign_sponsored">Sponsored</p>
         <div className="tas_campaign_all_item_container">
            {campaigns?.map((item) => {
               return (
                  <div className="tas_campaign_item_container border border-1">
                     <div className="tas_campaign_item_container_top">
                        <img
                           className="tas_campaign_item_img"
                           src={`${host}/uploads/adsStorage/${item?.campaign_cover_pic}`}
                        ></img>
                        <div className="tas_campaign_item_page_name_container">
                           <p className="tas_campaign_item_page_name">{item.page_name}</p>
                           <div className="tas_campaign_item_sponsors_container">
                              <p className="tas_campaign_item_sponsors">Sponsored</p>
                              <WorldIcon />
                           </div>
                        </div>
                        <span className="threesdotContainer">{/* <ThreedotIcon /> */}</span>
                     </div>
                     <div className="tas_campaign_item_details_container">
                        <p className="tas_campaign_item_details">
                           {item.description.length > 30
                              ? item.description.slice(0, 30) + '...'
                              : item.description}
                        </p>

                        <div className="tas_campaign_item_keywords_container">
                           {item.keywords.map((item) => {
                              return <p className="tas_campaign_item_keywords">#{item}</p>;
                           })}
                        </div>
                     </div>

                     <img
                        className="tas_campaign_item_details_img"
                        src={`${host}/uploads/adsStorage/${item.campaign_cover_pic}`}
                     ></img>

                     <div className="tas_campaign_item_container_bottom">
                        <div>
                           <p className="tas_campaign_item_container_bottom_website">
                              {item.website_url ? item.website_url.slice(0, 21) : 'www.example.com'}
                           </p>
                           <p className="tas_campaign_item_container_bottom_heading">
                              {item.headline.slice(0, 15)}...
                           </p>
                        </div>
                        <button
                           className="tas_campaign_item_container_bottom_button"
                           onClick={() => {
                              const websiteUrl = item?.website_url;
                              if (websiteUrl) {
                                 window.open(websiteUrl, '_blank');
                              } else {
                                 console.error('Website URL is not available.');
                              }
                           }}
                        >
                           {item?.call_to_action}
                        </button>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Campaign;
