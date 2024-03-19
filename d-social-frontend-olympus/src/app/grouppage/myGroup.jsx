"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import { Grid } from "@mui/material"
import { camelizeName } from "@/utils/utlity";
import './grouppage.modules.css';
import InviteForGroup from "@/component/Pages/InviteForGroup";
import useToaster from "@/hooks/useToaster";
// import PagePreview from "../groupsinglePreview/page";

const myGroup = () => {
  const [showPagePreview, setShowPagePreview] = useState(false);
  const [myGroups, setMyGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)

  const { showNotification } = useToaster()
  const handleOpenPagePreview = () => {
    setShowPagePreview(true);
  };
  const closeSettingModal = () => {
    setSelectedGroupId(null)
  };
  const handleClosePagePreview = () => {
    setShowPagePreview(false);
  };


  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      fetchGroup()
    }
    return () => {
      isApiSubscribed = false
    }
  }, [])

  const fetchGroup = () => {
    axiosInstance.get('/api/get-my-groups')
      .then(res => {
        setMyGroups(res?.data?.myGroups?.map(i => i.group_id))
      })
      .catch(err => console.log(err))
  }
  return (
    <div>
      {/* {showPagePreview ? (
        <PagePreview onClose={handleClosePagePreview} />
      ) : null} */}

      {/* {showPagePreview ? null : ( */}
      <div>
        <div className='page-header-textsss-div'>
          <h4 className='page-header-text'>My Groups</h4>
          <p>Suggested for you</p>
          <hr />
        </div>
        <Grid sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 1,
          padding: 2
        }}>

          {/* <div className='followed-text-img'>
            <div className='follo-pag-logo-div'>
              <Image
                className='follo-pag-logo'
                src={companyName}
                alt='File Upload'
                width={0}
                height={0}
              />

              <div className='follo-pag-text'>
                <h5 onClick={handleOpenPagePreview}>Silvia’s Fable</h5>

                <span className=''>Beauty, cosmetic & personal care</span>
                <p>Shopping, retail</p>
                <p className='followed-heade-text'>
                  414 people like this Page Like
                </p>
              </div>
            </div>

            <div className='followed-three-dots more'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-three-dots'
                viewBox='0 0 16 16'>
                <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
              </svg>
              <div className='more-dropdown more-with-triangle'>
                <Link href={"/"}>Follow settings</Link>

                <Link href='/'>Save</Link>

                <Link href='/'>Share</Link>
                <Link href='/'>Invite connections</Link>
                <Link href='/'>Report</Link>
                <Link href='/'>Block</Link>
              </div>
            </div>
          </div> */}
          {
            myGroups?.map(group =>
              <div className='followed-text-img'>
                <div className='follo-pag-logo-div'>
                  <img
                    className='follo-pag-logo'
                    src={`${host}/uploads/group/${group?.group_cover_pic}`}
                    alt='File Upload'
                   
                  />
                  <div className='group-pag-text'>
                    <Link href={`/groupsinglePreview/${group?._id}`}><h6> {camelizeName(group?.group_name || '')}</h6></Link>
                    <span>{camelizeName(group?.group_privacy)}</span>
                    <p>{group?.status}</p>
                    <p className='group-heade-text' style={{whiteSpace:'pre-line',overflowWrap:'break-word'}}>
                      {group?.group_description?.slice(0, 24)}...
                    </p>
                  </div>
                </div>

                <div className='followed-three-dots more'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-three-dots'
                    viewBox='0 0 16 16'>
                    <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                  </svg>
                  <div className='more-dropdown more-with-triangle'>
                    {/* <Link href={"/"}>Follow settings</Link>

                    <Link href='/'>Save</Link>

                    <Link href='/'>Share</Link> */}
                    <Link href='#' type='button' onClick={() => {
                      setSelectedGroupId(group?._id)
                    }}>Invite connections</Link>
                    {/* <Link href='/'>Report</Link> */}
                    <Link href='#' type='button' onClick={() => {
                      // member?.group_member_user_id?._id
                      axiosInstance.patch(`/api/group-member-status-change?group_id=${group?._id}&user_id=${localStorage.getItem("userId")}&status=left`)
                        .then(res => {
                          showNotification(res.data.message)
                          fetchGroup()
                        })
                        .catch(err => {
                          showNotification(err?.message, 'error')
                          console.log(err)
                        })

                    }}>Leave Group</Link>
                  </div>
                </div>
              </div>
            )
          }

          <InviteForGroup
            isOpen={selectedGroupId ? true : false}
            onRequestClose={closeSettingModal}
            selectedGroupId={selectedGroupId}
          />
        </Grid>
      </div>
      {/* // )} */}
    </div>
  );
};

export default myGroup;
