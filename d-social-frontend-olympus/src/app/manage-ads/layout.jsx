"use client";
import "../../assets/css/main.css";
import React, { useState } from "react";
import Navbar from "@/component/navbar/page";
import Leftsidebar from "@/component/leftsidebar/page";
import AdsSidebar from "@/component/ManageAds/AdsSidebar";
import { Grid } from "@mui/material";

export default function layout({ children }) {

  return (
    <div>
      {/* <div>
        <div>
          <Navbar />
        </div>

        <Grid display={'grid'} gridTemplateColumns={'1fr 1fr 4fr'} gap={1}>
          <div>
            <div className="header-spacer"></div>
            <Leftsidebar />
          </div>
          <div>
            <div className="header-spacer"></div>
            <div className="ui-block">
              <AdsSidebar />
            </div>
          </div>
          <div>
            <div className="header-spacer"></div>
            <div>{children}</div>
          </div>
        </Grid>
      </div> */}

      <div>
        <div>
          <Navbar />
        </div>
        <div className="row">
          <div className="col-lg-2 col-xl-2">
            <div className="header-spacer"></div>
            <Leftsidebar />
          </div>
          <div className="col-lg-2 col-xl-2">
            <div className="header-spacer"></div>
            <div className="ui-block">
              <AdsSidebar />
            </div>
          </div>
          <div className="col-lg-8 col-xl-8">
            <div className="header-spacer"></div>
            <div>{children}</div>
          </div>
        </div>
      </div>

    </div>
  );
}
