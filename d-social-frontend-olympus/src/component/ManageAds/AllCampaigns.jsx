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
import PaginatedTable from "@/component/Reuseable/PaginatedTable";
import DeleteModal from "@/component/Reuseable/deleteModal";

const ITEM_HEIGHT = 48;
const campaignStatusList = ['active', 'inactive', 'draft', 'compleated']

const headCells = [
  {
    name: 'status',
    numeric: false,
    label: 'STATUS',
  },
  {
    name: 'campaign_name',
    numeric: false,
    label: 'NAME',
  },
  {
    name: 'total_budget',
    numeric: true,
    label: 'TOTAL BUDGET',
  },
  {
    name: 'daily_budget',
    numeric: true,
    label: 'DAILY BUDGET',
  },
  {
    name: 'start_date',
    numeric: false,
    label: 'START DATE',
  },
  {
    name: 'end_date',
    numeric: false,
    label: 'END DATE',
  },
  {
    name: 'end_date',
    numeric: false,
    label: 'END DATE',
  },
  {
    name: 'action',
    numeric: false,
    label: 'Action',
  },



];
const AllCampaigns = () => {
  const [data, setData] = useState([])
  const [deleteModalOpen, setDeleteModalOpen] = useState(null)
  const { showNotification } = useToaster()

  const handledelteClose = () => {
    setDeleteModalOpen(null)
  };

  const handleDelete = () => {
    axiosInstance.patch(`/api/campaign/delete/${deleteModalOpen}`, {
      status: status
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        if (res.data.status == 200) {
          showNotification(res.data.message, "success");
          fetchCampaign()
          handledelteClose()
        }
      })
      .catch(err => {
        fetchCampaign()
        console.log(err);
        showNotification("There was an error, try again later", "error")
      })
  }

  const fetchCampaign = () => {
    axiosInstance.post('/api/campaign/list')
      .then(res => setData(res.data?.campaign?.map(i => {
        const { status } = i
        let color = '', backGround = ''
        if (status == 'active') {
          backGround = '#e1f2e8'
          color = '#27AE60'
        }
        else if (status == 'inactive') {
          backGround = '#f0ece5'
          color = '#EFBB02'
        }
        else if (status == 'compleated') {
          backGround = '#e3eeee'
          color = '#307777'
        }

        return ({
          id: i?._id,
          status: < Chip label={CapitalizeFirstLetter(status)} variant="outlined" sx={{
            backgroundColor: backGround,
            color: color,
            fontSize: '12px',
            fontWeight: 400
          }
          } />,
          campaign_name: <Link Link href={`/manage-ads/single-ad/${i?._id}`}
            style={{
              color: 'black'
            }
            }>
            {i?.campaign_name}
          </Link>,
          total_budget: i?.total_budget,
          daily_budget: i?.daily_budget,
          start_date: moment(i?.start_date).format('l'),
          end_date: moment(i?.end_date).format('l'),
          action: <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, py: 0.5 }}>
            <Link href={`/manage-ads/${i?._id}`} className="ads-btn-sm">
              <PenIcon />
            </Link>
            <span className="ads-btn-sm" onClick={() => setDeleteModalOpen(i?._id)}>
              <DeleteIcon />
            </span>
            {/* <span className="ads-btn-sm"> */}
            <LongMenu className="ads-btn-sm" row={{
              status: i?.status,
              id: i?._id
            }} fetchCampaign={fetchCampaign} />
            {/* </span> */}

          </Grid>
        })
      }
      )))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchCampaign()
  }, [])


  return (
    <div>
      <div className="ui-block">
        <div className="d-flex justify-content-between align-items-center p-4">
          <p className="campaign-title">All Campaigns</p>
          <Link href={'/manage-ads/CampaignForm'}>
            <div className="campaign-btn">
              <p>
                {" "}
                <span>+</span> Create Campaign
              </p>
            </div>
          </Link>
        </div>
        <div className="ads-nav-bar-main">
          <div className="col-lg-9 d-flex">
            <input
              type="text"
              placeholder="Search"
              className="ads-input-search"
            />
            <select className="ads-input-select">
              <option>Status</option>
            </select>
            <select className="ads-input-select">
              <option>Location</option>
            </select>
            <input type="date" className="ads-input-select" />
          </div>
          <div className="col-lg-2 d-flex justify-content-between align-items-center">
            {/* <span className="ads-btn-sm">
              <PenIcon />
            </span> */}
           
            <span className="ads-btn-sm">
              <DownloadIcon />
            </span>
          </div>
        </div>
        <div className="mx-3">
          {/* <AdsDataTable columns={columns} rows={data} setSelectedRowsId={setSelectedRowsId} /> */}
          <PaginatedTable headCells={headCells} rows={data} disableRowSpacing />
        </div>
      </div>
      {/* Delete  */}
      <DeleteModal open={deleteModalOpen ? true : false} handleClose={handledelteClose} handleDelete={handleDelete} />
    </div>
  );
};

export default AllCampaigns;

function LongMenu({ row, fetchCampaign, ...params }) {
  console.log(row);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { showNotification } = useToaster()
  const [modalOpen, setModalOpen] = useState(false)
  const [status, setStatus] = useState(null)



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
    setModalOpen(false)
  };


  const handleEdit = () => {
    setModalOpen(true)
  }
  useEffect(() => {
    setStatus(row?.status)

  }, [row])

  const handleStatusChange = () => {
    axiosInstance.patch(`/api/campaign/edit/${row?.id}`, {
      status: status
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        if (res.data.status == 200) {
          showNotification(res.data.message, "success");
          fetchCampaign()
          handleClose()
        }
      })
      .catch(err => {
        fetchCampaign()
        console.log(err);
        showNotification("There was an error, try again later", "error")
      })
  }

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        {...params}
      >
        <svg width="20" height="4" viewBox="0 0 23 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="2.65383" cy="3.125" rx="2.5" ry="2.65385" transform="rotate(90 2.65383 3.125)" fill="#242634" />
          <ellipse cx="11.5" cy="3.125" rx="2.5" ry="2.65385" transform="rotate(90 11.5 3.125)" fill="#242634" />
          <ellipse cx="20.3462" cy="3.125" rx="2.5" ry="2.65385" transform="rotate(90 20.3462 3.125)" fill="#242634" />
        </svg>

      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >

        <MenuItem onClick={handleEdit}>
          Status change
        </MenuItem>


      </Menu>

      <Dialog
        fullWidth
        maxWidth='sm'
        open={modalOpen}
        onClose={handleClose}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change Status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'lightgray',
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Typography gutterBottom>
            <AutoCompleteWrapper
              options={campaignStatusList}
              value={campaignStatusList?.find(i => i === status)}
              required={true}
              disableClearable={true}
              handleChange={(e, v) =>
                setStatus(v)
              }
            />
          </Typography>


        </DialogContent>
        <DialogActions>
          <div className='single-frend-rqest-btn-div py-2'>
            <button className='single-delete-btn' onClick={() => {
              handleClose()
            }}>Cancel</button>
            <button className='single-conferm-btn' onClick={() => {
              handleStatusChange()
            }}>Confirm</button>
          </div>
        </DialogActions>
      </Dialog>


    </>
  );
}