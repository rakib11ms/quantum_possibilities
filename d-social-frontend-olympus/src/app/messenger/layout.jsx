'use client'
import React, { useState, useEffect } from 'react';
import Navbar from "../../component/navbar/page";
import LeftSidebarMessenger from '@/component/AllMessengers/MessengerMasterLayout/LeftSidebarMessenger';

import { socket } from '@/app/layout';
export default function MessengerLayout({ children }) {
    const [authUserId, setAuthUserId] = useState("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUserInfo = localStorage.getItem("userInfo");

            if (localUserInfo) {
                setAuthUserId(JSON.parse(localUserInfo)[0]._id);
            }
        }
    }, [])


    socket.emit("addUser", authUserId)

    return (
        <div className='Messenger-full-div'>
            <div>
                <Navbar />
            </div>
            <div style={{ width: "100%", height: "80px" }}>
            </div>
            <div className='container-fluid'>
                <div className='row no-gutters'>
                    <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                        <LeftSidebarMessenger />
                    </div>
                    {children}
                </div>
            </div>

        </div>
    );
}