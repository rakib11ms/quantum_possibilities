"use client"
import { host } from '@/environment';
import React, { useState, useEffect } from 'react'
import io from "socket.io-client"
// const socket = io('http://localhost:9000');
const socket = io(host);

function SocketClient() {
  useEffect(() => {
    // Component did mount
    console.log('Socket connected');

    // Specify cleanup when the component unmounts
    return () => {
      console.log('Socket disconnected');
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <h4 className='text-center'> Socket Client Message </h4>
    </div>
  )
}

export default SocketClient