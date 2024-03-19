"use client"
import React, { useState, useEffect } from 'react'
import LeftSidebarMessenger from './LeftSidebarMessenger';
import RightSidebarMessenger from './RightSidebarMessenger';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import io from "socket.io-client"
import { host } from '@/environment';
import GroupRightSidebarMessenger from './GroupRightSidebarMessenger';


const socket = io(host, { transports: ["websocket"] });

const MessengerMasterLayout = ({ children }) => {
  const params = useParams()

  if (params.userId) {
    return <>
      <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
        <main className='content'>{children}</main>
      </div>
      <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
        <RightSidebarMessenger />
      </div>
    </>
  } else if (params.groupId) {
    return <>
      <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
        <main className='content'>{children}</main>
      </div>
      <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
        <GroupRightSidebarMessenger />
      </div>
    </>
  }
  else {
    return <div className='col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'>
      <main className='content'>{children}</main>
    </div>
  }
};

export default MessengerMasterLayout