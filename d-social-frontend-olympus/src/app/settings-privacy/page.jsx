"use client";

import AllCampaigns from "@/component/ManageAds/AllCampaigns";
import PersonalDetails from "@/component/Setting&Privacy/PersonalDetails";
import Navbar from "@/component/navbar/page";
import Leftsidebar from "@/component/leftsidebar/page";
import SettingsSidebar from "@/component/Setting&Privacy/SettingsSidebar";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PasswordSecurity from "@/component/Setting&Privacy/PasswordSecurity";
import PostPrivacy from "@/component/Setting&Privacy/PostPrivacy";
import StoriesPrivacy from "@/component/Setting&Privacy/StoriesPrivacy";
import BlockList from "@/component/Setting&Privacy/BlockList";
import axiosInstance from "../../../utils/axios";
const page = () => {

  const [activeDiv, setActiveDiv] = useState(1)


  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Grid sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 4fr',
        gap: 1
      }}>
        <div >
          <div className="header-spacer"></div>
          <Leftsidebar />
        </div>
        <div >
          <div className="header-spacer"></div>
          <div className="ui-block">
            <SettingsSidebar activeDiv={activeDiv} setActiveDiv={setActiveDiv} />
          </div>
        </div>
        <div >
          <div className="header-spacer"></div>
          <div>
            {
              activeDiv == 1 && <PersonalDetails />
            }
            {
              activeDiv == 2 && <PasswordSecurity />
            }
            {
              activeDiv == 3 && <PostPrivacy />
            }
            {
              activeDiv == 4 && <StoriesPrivacy />
            }
            {
              activeDiv == 5 && <BlockList />
            }
          </div>
        </div>
      </Grid>
    </div>
  );

};

export default page;
