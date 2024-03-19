import React, { useEffect, useState } from "react";
import "./style.css";
import DownloadIcon from "@/component/ManageAds/ui/icons/DownloadIcon";
import PenIcon from "@/component/ManageAds/ui/icons/PenIcon";
import DeleteIcon from "@/app/[username]/about/_ui/Icons/DeleteIcon";
import AdsDataTable from "@/component/ManageAds/AdsDataTable";
import axiosInstance from "../../../utils/axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CapitalizeFirstLetter from "@/utils/CapitalizeFirstLetter";
import CloseIcon from '@mui/icons-material/Close';
import { AutoCompleteWrapper } from "@/component/Reuseable";
import useToaster from "@/hooks/useToaster";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaginatedTable from "../Reuseable/PaginatedTable";
const ITEM_HEIGHT = 48;
const campaignStatusList = ['active', 'inactive', 'draft', 'compleated']
const Billing = () => {
  const [data, setData] = useState([])
  const [selectedRowsId, setSelectedRowsId] = useState([])

  const [statDate, setStatDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const fetchCampaign = () => {
    axiosInstance.post('/api/campaign/list')
      .then(res => setData(res.data?.campaign?.map(i => ({
        id: i?._id,
        status: i?.status,
        campaign_name: i?.campaign_name,
        total_budget: i?.total_budget,
        daily_budget: i?.daily_budget,
        start_date: moment(i?.start_date).format('ll'),
        end_date: moment(i?.end_date).format('ll'),
      }))))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchCampaign()
  }, [])


  const headCells = [
    {
      name: 'name',
      numeric: false,
      disablePadding: true,
      label: 'TRANSACTION ID',
    },
    {
      name: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'BILLING DATE',
    },
    {
      name: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'PAID AMOUNT ',
    },
    {
      name: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'PAYMENT METHOD',
    },
    {
      name: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'STATUS',
    },
  ];
  const rows = [
    createData(1, '64JHD94BC04BF', 305, 3.7, 67, 4.3),
    createData(2, '64JHD94BC04BF', 452, 25.0, 51, 4.9),
    createData(3, '64JHD94BC04BF', 262, 16.0, 24, 6.0),
    createData(4, '64JHD94BC04BF', 159, 6.0, 24, 4.0),
    createData(5, '64JHD94BC04BF', 356, 16.0, 49, 3.9),
    createData(6, '64JHD94BC04BF', 408, 3.2, 87, 6.5),
    createData(7, '64JHD94BC04BF', 237, 9.0, 37, 4.3),
    createData(8, '64JHD94BC04BF', 375, 0.0, 94, 0.0),
    createData(9, '64JHD94BC04BF', 518, 26.0, 65, 7.0),
    createData(10, '64JHD94BC04BF', 392, 0.2, 98, 0.0),
    createData(11, 'Marshmallow', 318, 0, 81, 2.0),
    createData(12, 'Nougat', 360, 19.0, 9, 37.0),
    createData(13, 'Oreo', 437, 18.0, 63, 4.0),
  ];
  function createData(id, name, calories, fat, carbs, protein) {
    return {
      id,
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }
  return (
    <div>
      <div className="ui-block">
        <p className="campaign-title p-4">Billing</p>
        {/* d-flex justify-content-between align-items-center */}

        {/* Cards */}
        <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, px: 4 }}>


          {/* Total Spend */}
          <div className="w-8 txt-white total-spend-card">
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', left: '12px' }}>
                <p>Total Spend</p>
                <h4 className="txt-white">$24,500</h4>
              </div>
              <span>
                <svg viewBox="0 0 264 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M319.5 53.5C319.5 85.7495 301.701 114.988 272.841 136.182C243.981 157.376 204.087 170.5 160 170.5C115.913 170.5 76.0188 157.376 47.1589 136.182C18.2987 114.988 0.5 85.7495 0.5 53.5C0.5 21.2505 18.2987 -7.98785 47.1589 -29.182C76.0188 -50.376 115.913 -63.5 160 -63.5C204.087 -63.5 243.981 -50.376 272.841 -29.182C301.701 -7.98785 319.5 21.2505 319.5 53.5Z" stroke="url(#paint0_linear_1550_25390)" stroke-opacity="0.3" />
                  <path d="M319.5 12.5C319.5 33.3971 306.323 52.385 284.875 66.1731C263.433 79.9577 233.78 88.5 201 88.5C168.22 88.5 138.567 79.9577 117.125 66.1731C95.6766 52.385 82.5 33.3971 82.5 12.5C82.5 -8.39709 95.6766 -27.385 117.125 -41.1731C138.567 -54.9577 168.22 -63.5 201 -63.5C233.78 -63.5 263.433 -54.9577 284.875 -41.1731C306.323 -27.385 319.5 -8.39709 319.5 12.5Z" stroke="url(#paint1_linear_1550_25390)" stroke-opacity="0.3" />
                  <path d="M319.5 -16C319.5 -3.02116 309.573 8.84675 293.259 17.4994C276.967 26.1403 254.426 31.5 229.5 31.5C204.574 31.5 182.033 26.1403 165.741 17.4994C149.427 8.84675 139.5 -3.02116 139.5 -16C139.5 -28.9788 149.427 -40.8467 165.741 -49.4994C182.033 -58.1403 204.574 -63.5 229.5 -63.5C254.426 -63.5 276.967 -58.1403 293.259 -49.4994C309.573 -40.8467 319.5 -28.9788 319.5 -16Z" stroke="url(#paint2_linear_1550_25390)" stroke-opacity="0.3" />
                  <defs>
                    <linearGradient id="paint0_linear_1550_25390" x1="160" y1="-64" x2="160" y2="171" gradientUnits="userSpaceOnUse">
                      <stop stop-color="white" stop-opacity="0.5" />
                      <stop offset="1" stop-color="white" stop-opacity="0.25" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_1550_25390" x1="201" y1="-64" x2="201" y2="89" gradientUnits="userSpaceOnUse">
                      <stop stop-color="white" stop-opacity="0.5" />
                      <stop offset="1" stop-color="white" stop-opacity="0.25" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_1550_25390" x1="229.5" y1="-64" x2="229.5" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stop-color="white" stop-opacity="0.5" />
                      <stop offset="1" stop-color="white" stop-opacity="0.25" />
                    </linearGradient>
                  </defs>
                </svg>

              </span>
            </div>
          </div>
          {/* Pending balance */}
          <div className="w-8 txt-white qp-balance-card">
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', left: '12px' }}>
                <p>Pending balance</p>
                <h4 className="txt-white ">$24,500</h4>
              </div>
              <button className="fund-btn px-2 py-1">Add Fund</button>
              <span>
                <svg viewBox="0 0 264 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M319.5 53.5C319.5 85.7495 301.701 114.988 272.841 136.182C243.981 157.376 204.087 170.5 160 170.5C115.913 170.5 76.0188 157.376 47.1589 136.182C18.2987 114.988 0.5 85.7495 0.5 53.5C0.5 21.2505 18.2987 -7.98785 47.1589 -29.182C76.0188 -50.376 115.913 -63.5 160 -63.5C204.087 -63.5 243.981 -50.376 272.841 -29.182C301.701 -7.98785 319.5 21.2505 319.5 53.5Z" stroke="url(#paint0_linear_1550_25406)" stroke-opacity="0.3" />
                  <path d="M319.5 12.5C319.5 33.3971 306.323 52.385 284.875 66.1731C263.433 79.9577 233.78 88.5 201 88.5C168.22 88.5 138.567 79.9577 117.125 66.1731C95.6766 52.385 82.5 33.3971 82.5 12.5C82.5 -8.39709 95.6766 -27.385 117.125 -41.1731C138.567 -54.9577 168.22 -63.5 201 -63.5C233.78 -63.5 263.433 -54.9577 284.875 -41.1731C306.323 -27.385 319.5 -8.39709 319.5 12.5Z" stroke="url(#paint1_linear_1550_25406)" stroke-opacity="0.3" />
                  <path d="M319.5 -16C319.5 -3.02116 309.573 8.84675 293.259 17.4994C276.967 26.1403 254.426 31.5 229.5 31.5C204.574 31.5 182.033 26.1403 165.741 17.4994C149.427 8.84675 139.5 -3.02116 139.5 -16C139.5 -28.9788 149.427 -40.8467 165.741 -49.4994C182.033 -58.1403 204.574 -63.5 229.5 -63.5C254.426 -63.5 276.967 -58.1403 293.259 -49.4994C309.573 -40.8467 319.5 -28.9788 319.5 -16Z" stroke="url(#paint2_linear_1550_25406)" stroke-opacity="0.3" />
                  <defs>
                    <linearGradient id="paint0_linear_1550_25406" x1="160" y1="-64" x2="160" y2="171" gradientUnits="userSpaceOnUse">
                      <stop stop-color="white" stop-opacity="0.5" />
                      <stop offset="1" stop-color="white" stop-opacity="0.25" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_1550_25406" x1="201" y1="-64" x2="201" y2="89" gradientUnits="userSpaceOnUse">
                      <stop stop-color="white" stop-opacity="0.5" />
                      <stop offset="1" stop-color="white" stop-opacity="0.25" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_1550_25406" x1="229.5" y1="-64" x2="229.5" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stop-color="white" stop-opacity="0.5" />
                      <stop offset="1" stop-color="white" stop-opacity="0.25" />
                    </linearGradient>
                  </defs>
                </svg>


              </span>
            </div>
          </div>
          {/* QP Balance */}
          <div className="w-8 txt-white qp-balance-card" style={{ position: 'relative', borderRadius: "12px" }}>
            <div style={{ position: 'absolute', top: '24px', left: '12px' }}>
              <p>QP Balance</p>
              <h4 className="txt-white ">$24,500</h4>
            </div>

            <span style={{ overflow: 'hidden' }}>
              <svg viewBox="0 0 264 104" fill="none" xmlns="http://www.w3.org/2000/svg">

                {/* <text x="20%" y="20%" dominant-baseline="middle" text-anchor="middle" font-size="15" fill="white">QP Balance</text> */}
                <path d="M319.5 53.5C319.5 85.7495 301.701 114.988 272.841 136.182C243.981 157.376 204.087 170.5 160 170.5C115.913 170.5 76.0188 157.376 47.1589 136.182C18.2987 114.988 0.5 85.7495 0.5 53.5C0.5 21.2505 18.2987 -7.98785 47.1589 -29.182C76.0188 -50.376 115.913 -63.5 160 -63.5C204.087 -63.5 243.981 -50.376 272.841 -29.182C301.701 -7.98785 319.5 21.2505 319.5 53.5Z" stroke="url(#paint0_linear_959_2043)" stroke-opacity="0.3" />
                <path d="M319.5 12.5C319.5 33.3971 306.323 52.385 284.875 66.1731C263.433 79.9577 233.78 88.5 201 88.5C168.22 88.5 138.567 79.9577 117.125 66.1731C95.6766 52.385 82.5 33.3971 82.5 12.5C82.5 -8.39709 95.6766 -27.385 117.125 -41.1731C138.567 -54.9577 168.22 -63.5 201 -63.5C233.78 -63.5 263.433 -54.9577 284.875 -41.1731C306.323 -27.385 319.5 -8.39709 319.5 12.5Z" stroke="url(#paint1_linear_959_2043)" stroke-opacity="0.3" />
                <path d="M319.5 -16C319.5 -3.02116 309.573 8.84675 293.259 17.4994C276.967 26.1403 254.426 31.5 229.5 31.5C204.574 31.5 182.033 26.1403 165.741 17.4994C149.427 8.84675 139.5 -3.02116 139.5 -16C139.5 -28.9788 149.427 -40.8467 165.741 -49.4994C182.033 -58.1403 204.574 -63.5 229.5 -63.5C254.426 -63.5 276.967 -58.1403 293.259 -49.4994C309.573 -40.8467 319.5 -28.9788 319.5 -16Z" stroke="url(#paint2_linear_959_2043)" stroke-opacity="0.3" />
                <path d="M268 -52.5C309.517 -41.3754 307.865 -14.8305 296.699 26.8415C285.533 68.5134 245.53 100.626 204.013 89.5016C162.495 78.377 161.264 29.4195 172.43 -12.2525C183.596 -53.9245 226.483 -63.6246 268 -52.5Z" fill="#22CAAD" />
                <defs>
                  <linearGradient id="paint0_linear_959_2043" x1="160" y1="-64" x2="160" y2="171" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white" stop-opacity="0.5" />
                    <stop offset="1" stop-color="white" stop-opacity="0.25" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_959_2043" x1="201" y1="-64" x2="201" y2="89" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white" stop-opacity="0.5" />
                    <stop offset="1" stop-color="white" stop-opacity="0.25" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_959_2043" x1="229.5" y1="-64" x2="229.5" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white" stop-opacity="0.5" />
                    <stop offset="1" stop-color="white" stop-opacity="0.25" />
                  </linearGradient>
                </defs>
              </svg>

            </span>

          </div>
        </Grid>

        {/* Payment History */}
        <p className="campaign-title p-4" style={{ color: '#8e8e8e' }}>Payment History</p>
        <Grid className="px-4" sx={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 2fr',
          gap: 8,
          height: '45px',
          pb: 1
        }}>

          <Grid sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,

          }}>
            <button className="payment-history-btn focus-btn">All</button>
            <button className="payment-history-btn focus-btn">Paid</button>
            <button className="payment-history-btn focus-btn">Rejected</button>

          </Grid>

          <Grid sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 4,
          }}>
            <button className="payment-history-btn focus-btn">
              <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 10V12.6667C14.5 13.0203 14.3595 13.3594 14.1095 13.6095C13.8594 13.8595 13.5203 14 13.1667 14H3.83333C3.47971 14 3.14057 13.8595 2.89052 13.6095C2.64048 13.3594 2.5 13.0203 2.5 12.6667V10" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M5.16675 6.66666L8.50008 10L11.8334 6.66666" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.5 10V2" stroke="#191D23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </span>
              {" "}
              Download PDF Report
            </button>

            <DatePicker
              placeholderText="Date range here,,,,"
              className="datepicker-input payment-history-btn focus-btn py-2"
            
              selectsRange
              startDate={statDate}
              endDate={endDate}
              onChange={(date) => {
                console.log(date);
                setStatDate(date[0]);
                setEndDate(date[1])
              }}
               minDate={statDate} // Ensures that the end date cannot be before the start date
              dateFormat="MMM dd, yyyy"
            />
            {/* <button className="payment-history-btn focus-btn">Rejected</button> */}
          </Grid>
        </Grid>

        <div className="mx-3">
          <PaginatedTable rows={rows} headCells={headCells}/>
          {/* <AdsDataTable columns={columns} rows={data} setSelectedRowsId={setSelectedRowsId} /> */}
        </div>
      </div>
    </div>
  );
};

export default Billing;
