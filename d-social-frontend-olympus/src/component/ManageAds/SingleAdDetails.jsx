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
import { Autocomplete, Box, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CapitalizeFirstLetter from "@/utils/CapitalizeFirstLetter";
import CloseIcon from '@mui/icons-material/Close';
import { AutoCompleteWrapper } from "@/component/Reuseable";
import useToaster from "@/hooks/useToaster";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaginatedTable from "@/component/Reuseable/PaginatedTable";

const ITEM_HEIGHT = 48;
const campaignStatusList = ['active', 'inactive', 'draft', 'compleated']

const headCells = [
    {
        name: 'date',
        numeric: false,
        label: 'Date',
    },
    {
        name: 'react',
        numeric: true,
        label: 'Reach',
    },
    {
        name: 'impression',
        numeric: true,
        disablePadding: false,
        label: 'Impression',
    },
    {
        name: 'click',
        numeric: true,
        disablePadding: false,
        label: 'Click',
    },
    {
        name: 'cpc',
        numeric: true,
        label: 'CPC',
    },
    {
        name: 'spent',
        numeric: true,
        label: 'Spent',
    },
    {
        name: 'gender',
        numeric: false,
        label: 'Gender',
    },
    {
        name: 'age_Group',
        numeric: false,
        label: 'Age Group',
    },
    {
        name: 'location',
        numeric: false,
        label: 'Location',
    },
    // {
    //     name: 'btn',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Button',

    // }
];
const handleSelectedItemActions = (e) => {
    console.log(e);
}
const SingleAdDetails = ({ id }) => {
    const [campaignPerformanceSummary, setCampaignPerformanceSummary] = useState(null)

    const [campaignPerformanceList, setCampaignPerformanceList] = useState([])


    const [statDate, setStatDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const fetchSingleCampaignSummary = () => {
        axiosInstance.get(`/api/campaign/get-campaign-performance/${id}`)
            .then(res => {
                setCampaignPerformanceSummary(res.data?.campaignPerformanceSummary[0])
            })
            .catch(err => console.log(err))
    }
    const fetchSingleCampaignList = () => {
        axiosInstance.get(`/api/campaign/get-campaign-performance-list/${id}`)
            .then(res => {
                setCampaignPerformanceList(res.data?.campaignPerformanceList?.map((i, index) => ({
                    id: index + 1,
                    date: i?.creation_date,
                    react: i?.total_reached,
                    impression: i?.total_impressed,
                    click: i?.total_clicked,
                    cpc: i?.cpc,
                    spent: i?.total_spend,
                    gender: i?.campaign?.gender,
                    age_Group: `${[i?.campaign?.from_age, i?.campaign?.to_age].join(' - ')}`,
                    location: i?.campaign?.locations?.join(','),
                })))
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchSingleCampaignSummary()
        fetchSingleCampaignList()
    }, [])


    return (
        <div>
            <div className="ui-block" style={{ backgroundColor: "#FAFAFA" }}>
                <p className="campaign-title p-4">Campaigns Performance overview</p>
                {/* d-flex justify-content-between align-items-center */}
                <Grid display={'flex'} justifyContent={'space-between'} px={4}>
                    <Grid sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        gap: 4,
                        width: '50%',
                    }}>
                        <Grid >
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
                        </Grid>

                        <Chip
                            style={{ width: "30%" }}
                            className=" payment-history-btn focus-btn py-3"
                            label={CapitalizeFirstLetter(campaignPerformanceSummary?.campaign.campaign_name)} variant='filled'
                        />



                    </Grid>

                    <Box sx={{ cursor: 'pointer' }}>
                        <DownloadIcon />
                    </Box>
                </Grid>

                {/* Cards */}
                <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2, pl: 4, pt: 3, pr: 1 }}>


                    {/* Card Sections */}

                    {/* Reach */}
                    <Box className="w-8 p-3" sx={{ backgroundColor: '#FFFFFF', borderRadius: '14px' }}>
                        <Box display={'flex'} justifyContent={'space-between'} >
                            <div>
                                <p className="campaign-title" style={{ color: '#8e8e8e' }}>Reach</p>
                                <h4 className="pt-2">{campaignPerformanceSummary?.total_reached}</h4>
                            </div>
                            <span>
                                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.21" fill-rule="evenodd" clip-rule="evenodd" d="M0 27.5V32C0 44.7025 10.2975 55 23 55H27.5H32C44.7025 55 55 44.7025 55 32V27.5V23C55 10.2975 44.7025 0 32 0H27.5H23C10.2975 0 0 10.2975 0 23V27.5Z" fill="#8280FF" />
                                    <path opacity="0.587821" fill-rule="evenodd" clip-rule="evenodd" d="M18.9444 21.3889C18.9444 24.0889 21.1332 26.2778 23.8333 26.2778C26.5334 26.2778 28.7222 24.0889 28.7222 21.3889C28.7222 18.6888 26.5334 16.5 23.8333 16.5C21.1332 16.5 18.9444 18.6888 18.9444 21.3889ZM31.1666 26.2778C31.1666 28.3028 32.8082 29.9444 34.8333 29.9444C36.8583 29.9444 38.4999 28.3028 38.4999 26.2778C38.4999 24.2527 36.8583 22.6111 34.8333 22.6111C32.8082 22.6111 31.1666 24.2527 31.1666 26.2778Z" fill="#8280FF" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8129 28.7222C18.0423 28.7222 13.3078 31.688 12.8341 37.5212C12.8083 37.839 13.4159 38.5 13.7225 38.5H33.9126C34.8307 38.5 34.845 37.7611 34.8307 37.5222C34.4726 31.525 29.6648 28.7222 23.8129 28.7222ZM41.5017 38.5H36.7888C36.7888 35.7489 35.8798 33.2101 34.3458 31.1675C38.5094 31.213 41.9089 33.318 42.1648 37.7667C42.1751 37.9459 42.1648 38.5 41.5017 38.5Z" fill="#8280FF" />
                                </svg>
                            </span>
                        </Box>
                        <br />
                        <Box display={'flex'}>
                            <span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="#00B69B" />
                                </svg>
                            </span>
                            <h6 style={{ color: '#8e8e8e' }}> <span style={{ color: "#00B69B" }}>&nbsp; {campaignPerformanceSummary?.total_reached}</span>  Up from yesterday</h6>
                        </Box>
                    </Box>
                    {/* Click  */}
                    <Box className="w-8 p-3" sx={{ backgroundColor: '#FFFFFF', borderRadius: '14px' }}>
                        <Box display={'flex'} justifyContent={'space-between'} >
                            <div>
                                <p className="campaign-title" style={{ color: '#8e8e8e' }}>Click</p>
                                <h4 className="pt-2">{campaignPerformanceSummary?.total_clicked}</h4>
                            </div>
                            <span>
                                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.21" fill-rule="evenodd" clip-rule="evenodd" d="M0 27.5V32C0 44.7025 10.2975 55 23 55H27.5H32C44.7025 55 55 44.7025 55 32V27.5V23C55 10.2975 44.7025 0 32 0H27.5H23C10.2975 0 0 10.2975 0 23V27.5Z" fill="#4AD991" />
                                    <path d="M17.5185 37.4815H38.9074C39.6949 37.4815 40.3333 38.1199 40.3333 38.9074C40.3333 39.6949 39.6949 40.3333 38.9074 40.3333H16.0926C15.3051 40.3333 14.6667 39.6949 14.6667 38.9074V16.0926C14.6667 15.3051 15.3051 14.6667 16.0926 14.6667C16.8801 14.6667 17.5185 15.3051 17.5185 16.0926V37.4815Z" fill="#4AD991" />
                                    <path opacity="0.5" d="M22.8366 31.3271C22.2979 31.9016 21.3956 31.9307 20.821 31.3921C20.2465 30.8535 20.2174 29.9511 20.756 29.3766L26.1032 23.6729C26.6242 23.1173 27.4898 23.0691 28.0691 23.5635L32.2895 27.1648L37.7882 20.1998C38.2762 19.5817 39.1729 19.4762 39.791 19.9641C40.4091 20.4521 40.5146 21.3488 40.0266 21.9669L33.6099 30.0947C33.1087 30.7295 32.1804 30.8208 31.5651 30.2958L27.2531 26.6162L22.8366 31.3271Z" fill="#4AD991" />
                                </svg>
                            </span>
                        </Box>
                        <br />
                        <Box display={'flex'}>
                            <span>

                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="#00B69B" />
                                </svg>

                            </span>
                            <h6 style={{ color: '#8e8e8e' }}> <span style={{ color: "#00B69B" }}>&nbsp; {campaignPerformanceSummary?.total_clicked}</span>  Up from yesterday</h6>
                        </Box>
                    </Box>

                    {/* CPC  */}
                    <Box className="w-8 p-3" sx={{ backgroundColor: '#FFFFFF', borderRadius: '14px' }}>
                        <Box display={'flex'} justifyContent={'space-between'} >
                            <div>
                                <p className="campaign-title" style={{ color: '#8e8e8e' }}>CPC</p>
                                <h4 className="pt-2">{campaignPerformanceSummary?.cpc}</h4>
                            </div>
                            <span>
                                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M0 27.5V32C0 44.7025 10.2975 55 23 55H27.5H32C44.7025 55 55 44.7025 55 32V27.5V23C55 10.2975 44.7025 0 32 0H27.5H23C10.2975 0 0 10.2975 0 23V27.5Z" fill="#FF9066" />
                                    <path opacity="0.78" fill-rule="evenodd" clip-rule="evenodd" d="M26.2423 21.8632C26.2624 21.6027 26.4796 21.4016 26.7409 21.4016H27.0476C27.3044 21.4016 27.5195 21.5962 27.5451 21.8518L28.1112 27.5127L32.137 29.8131C32.2928 29.9022 32.3889 30.0678 32.3889 30.2473V30.5247C32.3889 30.8544 32.0755 31.0938 31.7574 31.0071L26.0654 29.4547C25.834 29.3916 25.68 29.1731 25.6984 28.934L26.2423 21.8632Z" fill="#FF9066" />
                                    <path opacity="0.901274" fill-rule="evenodd" clip-rule="evenodd" d="M20.8816 13.799C20.6175 13.4843 20.1075 13.6048 20.0122 14.0044L18.547 20.1469C18.4694 20.4725 18.7274 20.781 19.0617 20.7621L25.3805 20.404C25.7914 20.3807 25.9998 19.8987 25.7353 19.5834L24.1374 17.6792C25.2052 17.3143 26.3374 17.1237 27.5 17.1237C33.2377 17.1237 37.8889 21.775 37.8889 27.5126C37.8889 33.2502 33.2377 37.9015 27.5 37.9015C21.7624 37.9015 17.1112 33.2502 17.1112 27.5126C17.1112 26.5494 17.2416 25.606 17.4959 24.6993L15.1423 24.0391C14.8324 25.1439 14.6667 26.3089 14.6667 27.5126C14.6667 34.6003 20.4124 40.346 27.5 40.346C34.5877 40.346 40.3334 34.6003 40.3334 27.5126C40.3334 20.425 34.5877 14.6793 27.5 14.6793C25.7173 14.6793 24.0194 15.0428 22.4765 15.6998L20.8816 13.799Z" fill="#FF9066" />
                                </svg>
                            </span>
                        </Box>
                        <br />
                        <Box display={'flex'}>
                            <span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="#00B69B" />
                                </svg>

                            </span>
                            <h6 style={{ color: '#8e8e8e' }}> <span style={{ color: "#00B69B" }}>&nbsp; {campaignPerformanceSummary?.cpc}</span> Up from yesterday</h6>
                        </Box>
                    </Box>

                    {/* Spend Amount  */}
                    <Box className="w-8 p-3" sx={{ backgroundColor: '#FFFFFF', borderRadius: '14px' }}>
                        <Box display={'flex'} justifyContent={'space-between'} >
                            <div>
                                <p className="campaign-title" style={{ color: '#8e8e8e' }}>Spend Amount</p>
                                <h4 className="pt-2">{campaignPerformanceSummary?.total_spend}</h4>
                            </div>
                            <span>
                                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.21" fill-rule="evenodd" clip-rule="evenodd" d="M0 27.5V32C0 44.7025 10.2975 55 23 55H27.5H32C44.7025 55 55 44.7025 55 32V27.5V23C55 10.2975 44.7025 0 32 0H27.5H23C10.2975 0 0 10.2975 0 23V27.5Z" fill="#4AD991" />
                                    <path d="M27.5 11.3125C18.5607 11.3125 11.3125 18.5607 11.3125 27.5C11.3125 36.4393 18.5607 43.6875 27.5 43.6875C36.4393 43.6875 43.6875 36.4393 43.6875 27.5C43.6875 18.5607 36.4393 11.3125 27.5 11.3125ZM27.5 40.9414C20.0783 40.9414 14.0586 34.9217 14.0586 27.5C14.0586 20.0783 20.0783 14.0586 27.5 14.0586C34.9217 14.0586 40.9414 20.0783 40.9414 27.5C40.9414 34.9217 34.9217 40.9414 27.5 40.9414ZM29.2235 26.6617L28.3058 26.4485V21.5959C29.6788 21.7838 30.5279 22.6437 30.6725 23.6988C30.6905 23.8434 30.8134 23.9481 30.9579 23.9481H32.5803C32.7501 23.9481 32.8838 23.8 32.8693 23.6302C32.6489 21.3791 30.7953 19.9338 28.3202 19.6845V18.5029C28.3202 18.3439 28.1901 18.2139 28.0312 18.2139H27.0158C26.8568 18.2139 26.7268 18.3439 26.7268 18.5029V19.6953C24.1686 19.9446 22.1668 21.3574 22.1668 23.9951C22.1668 26.4377 23.9662 27.6156 25.856 28.0673L26.7484 28.2949V33.4511C25.1514 33.2379 24.2553 32.3852 24.071 31.2361C24.0493 31.0988 23.9265 30.9977 23.7855 30.9977H22.1162C21.9464 30.9977 21.8127 31.1422 21.8271 31.312C21.9897 33.2993 23.4965 35.1276 26.7123 35.3625V36.4971C26.7123 36.6561 26.8424 36.7861 27.0014 36.7861H28.0275C28.1865 36.7861 28.3166 36.6561 28.3166 36.4935L28.3094 35.348C31.1386 35.0987 33.162 33.5848 33.162 30.8676C33.1584 28.36 31.5649 27.2398 29.2235 26.6617ZM26.7448 26.0764C26.5425 26.0186 26.3727 25.9644 26.2028 25.8957C24.9815 25.4549 24.4143 24.7431 24.4143 23.8253C24.4143 22.5137 25.4079 21.7657 26.7448 21.5959V26.0764ZM28.3058 33.4619V28.631C28.4178 28.6635 28.5189 28.6888 28.6237 28.7104C30.3328 29.2308 30.9073 29.9534 30.9073 31.0627C30.9073 32.4755 29.845 33.3246 28.3058 33.4619Z" fill="#4AD991" />
                                </svg>
                            </span>
                        </Box>
                        <br />
                        <Box display={'flex'}>
                            <span>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 15.75L16.0038 13.7463L11.7337 9.47625L8.23375 12.9762L1.75 6.48375L2.98375 5.25L8.23375 10.5L11.7337 7L17.2462 12.5037L19.25 10.5V15.75H14Z" fill="#F93C65" />
                                </svg>
                            </span>
                            <h6 style={{ color: '#8e8e8e' }}> <span style={{ color: '#F93C65' }}>&nbsp; {campaignPerformanceSummary?.total_spend}</span>  Down from yesterday</h6>
                        </Box>
                    </Box>

                </Grid>

                {/* Payment History */}
                <p className="campaign-title p-4" style={{ color: '#8e8e8e' }}>Campaigns Detail Performance overview</p>


                <Grid sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1.5fr',
                    gap: 4,
                    px: 4,
                    width: '75%'
                }}>
                    {/* Gender */}
                    <AutoCompleteWrapper
                        options={[]}

                        // value={}
                        required={true}
                        placeholder={'Gender...'}
                        label={'Gender'}

                        Tsx={{
                            [`& fieldset`]: {
                                borderRadius: 5,
                            },
                        }}
                    />
                    {/* Age Group */}
                    <AutoCompleteWrapper
                        options={[]}
                        // value={}
                        required={true}
                        placeholder={'Age Group...'}
                        label={'Age Group'}

                        Tsx={{
                            [`& fieldset`]: {
                                borderRadius: 5,
                            },
                        }}
                    />
                    {/* Locations */}
                    <AutoCompleteWrapper
                        options={[]}
                        // value={}
                        required={true}
                        placeholder={'Locations...'}
                        label={'Locations'}
                        // handleChange={(e, v) => {
                        //     dispatch(
                        //         insertPostData({
                        //             ['event_sub_type']: v,
                        //         }),
                        //     );
                        // }}
                        Tsx={{
                            [`& fieldset`]: {
                                borderRadius: 5,
                            },
                        }}
                    />




                    <DatePicker
                        placeholderText="Date range here,,,,"
                        className="datepicker-input payment-history-btn py-2"

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

                </Grid>




                <div className="mx-3">
                    <PaginatedTable
                        rows={campaignPerformanceList}
                        headCells={headCells}
                        handleSelectedItemActions={handleSelectedItemActions}
                        actionIcon={<DeleteIcon />}
                        disableRowSpacing={false}
                    />
                    {/* <AdsDataTable columns={columns} rows={data} setSelectedRowsId={setSelectedRowsId} /> */}
                </div>
            </div>
        </div>
    );
};

export default SingleAdDetails;
