"use client";
import "../../assets/css/main.css";
import React, { useState } from "react";
import Navbar from "@/component/navbar/page";
import Leftsidebar from "@/component/leftsidebar/page";
import "@/component/ManageAds/style.css";
import { Grid } from "@mui/material";
import WalletSidebar from "@/component/Wallet/WalletSidebar";

export default function layout({ children }) {

  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>

        <Grid display={'grid'} gridTemplateColumns={'1fr 1fr 5fr'} gap={1}>
          <div>
            <div className="header-spacer"></div>
            <Leftsidebar />
          </div>
          <div>
            <div className="header-spacer"></div>
            <div className="ui-block">
              <WalletSidebar />
            </div>
          </div>
          <div>
            <div className="header-spacer"></div>
            <div>{children}</div>
          </div>
        </Grid>
      </div>

      {/* <div>
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
              <WalletSidebar />
            </div>
          </div>
          <div className="col-lg-8 col-xl-8">
            <div className="header-spacer"></div>
            <div>{children}</div>
          </div>
        </div>
      </div> */}

    </div>
  );
}
