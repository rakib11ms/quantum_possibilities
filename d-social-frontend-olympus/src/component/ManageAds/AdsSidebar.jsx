import React from "react";
import AllCampaigns from "./AllCampaigns";
import Billing from "./Billing";
import PaymentSettings from "./PaymentSettings";
import "./style.css";
import BagIcon from "@/component/ManageAds/ui/icons/BagIcon";
import Link from "next/link";
const AdsSidebar = () => {
  return (
    <div>
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Ads Manager</h6>
        </div>
        <div className="ads-select-bar">
          <select>
            <option>Ads Account 1</option>
            <option>Ads Account 2</option>
            <option>Ads Account 3</option>
          </select>
        </div>
        <div className="ui-block-content">
          <Link href={'/manage-ads'}>
            <div className="d-flex align-items-center">
              <BagIcon />
              <p
                tabIndex="0"
                className="ads-sidebar-btn"

              >
                All Campaigns
              </p>
            </div>
          </Link>
          <Link href={'/manage-ads/billing'}>
            <div className="d-flex align-items-center">
              <BagIcon />
              <p
                tabIndex="0"
                className="ads-sidebar-btn"

              >
                Billing
              </p>
            </div>
          </Link>
          <div className="d-flex align-items-center">
            <BagIcon />
            <p
              tabIndex="0"
              className="ads-sidebar-btn"

            >
              Payment Settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsSidebar;
